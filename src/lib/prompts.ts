import client from "./mongodb";
import { initialPrompts } from "@/data/promptsData";
import { Prompt, PromptDocument, PromptQueryOptions, PromptApiResponse } from "@/types/prompt";

const DB_NAME = process.env.DB_NAME || "DevAssests";
const COLLECTION_NAME = "prompts";

// Simple in-memory view deduplication cache: `${ip}_${slug}` -> timestamp
const viewDebounceMap = new Map<string, number>();

/**
 * Helper to get the prompts collection safely
 */
function getPromptsCollection() {
  const db = client.db(DB_NAME);
  return db.collection<PromptDocument>(COLLECTION_NAME);
}

/**
 * Ensures the prompts collection is seeded with initial prompts if empty
 */
export async function ensurePromptsSeeded(): Promise<void> {
  try {
    const collection = getPromptsCollection();
    const count = await collection.countDocuments();
    if (count === 0) {
      // Create unique index on slug
      try {
        await collection.createIndex({ slug: 1 }, { unique: true });
      } catch {
        // index might already exist
      }
      await collection.insertMany(initialPrompts);
    }
  } catch (error) {
    console.warn("Could not seed prompts into MongoDB (using memory fallback):", (error as Error).message);
  }
}

/**
 * Strips the protected 'content' field from a prompt document for public consumption
 */
function sanitizePrompt(doc: any): Prompt {
  const { content, ...publicData } = doc;
  return {
    ...publicData,
    _id: doc._id ? String(doc._id) : undefined,
  };
}

/**
 * Retrieves paginated, filtered prompts from MongoDB with fallback to initial data
 */
export async function getPrompts(options: PromptQueryOptions = {}): Promise<PromptApiResponse> {
  const page = Math.max(1, Number(options.page) || 1);
  const limit = Math.max(1, Math.min(50, Number(options.limit) || 12));
  const category = options.category?.trim();
  const search = options.search?.trim();

  const allCategories = [
    "All Prompts",
    "Development",
    "Business",
    "Marketing",
    "Image Generation",
    "Writing",
    "Productivity",
  ];

  try {
    const collection = getPromptsCollection();
    await ensurePromptsSeeded();

    // Build MongoDB query
    const query: Record<string, any> = { isPublished: true };

    if (category && category.toLowerCase() !== "all" && category.toLowerCase() !== "all prompts") {
      query.category = { $regex: new RegExp(`^${category}$`, "i") };
    }

    if (search) {
      const searchRegex = new RegExp(search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
      query.$or = [
        { title: searchRegex },
        { description: searchRegex },
        { category: searchRegex },
        { tags: searchRegex },
      ];
    }

    const total = await collection.countDocuments(query);
    const skip = (page - 1) * limit;

    const cursor = collection
      .find(query, { projection: { content: 0 } })
      .sort({ createdAt: -1, viewCount: -1 })
      .skip(skip)
      .limit(limit);

    const docs = await cursor.toArray();
    const prompts = docs.map(sanitizePrompt);

    return {
      prompts,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit) || 1,
      categories: allCategories,
    };
  } catch (error) {
    // In-memory fallback if MongoDB connection fails
    console.warn("MongoDB query failed, falling back to in-memory prompts:", (error as Error).message);

    let filtered = initialPrompts.filter((p) => p.isPublished);

    if (category && category.toLowerCase() !== "all" && category.toLowerCase() !== "all prompts") {
      filtered = filtered.filter(
        (p) => p.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (search) {
      const queryLower = search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(queryLower) ||
          p.description.toLowerCase().includes(queryLower) ||
          p.category.toLowerCase().includes(queryLower) ||
          (p.tags && p.tags.some((t) => t.toLowerCase().includes(queryLower)))
      );
    }

    const total = filtered.length;
    const skip = (page - 1) * limit;
    const paginated = filtered.slice(skip, skip + limit);

    return {
      prompts: paginated.map(sanitizePrompt),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit) || 1,
      categories: allCategories,
    };
  }
}

/**
 * Retrieves a single prompt by its slug (without protected content)
 */
export async function getPromptBySlug(slug: string): Promise<Prompt | null> {
  try {
    const collection = getPromptsCollection();
    await ensurePromptsSeeded();
    const doc = await collection.findOne(
      { slug, isPublished: true },
      { projection: { content: 0 } }
    );
    if (doc) {
      return sanitizePrompt(doc);
    }
  } catch (error) {
    console.warn("MongoDB findOne failed, falling back to memory:", (error as Error).message);
  }

  const memoryMatch = initialPrompts.find(
    (p) => p.slug === slug && p.isPublished
  );
  return memoryMatch ? sanitizePrompt(memoryMatch) : null;
}

/**
 * Atomically increments view count with debounce protection (1 view per IP/slug per 10 minutes)
 */
export async function recordPromptView(slug: string, identifier: string = "anon"): Promise<number | null> {
  const debounceKey = `${identifier}_${slug}`;
  const now = Date.now();
  const lastViewTime = viewDebounceMap.get(debounceKey) || 0;

  // 10 minutes debounce window
  if (now - lastViewTime < 10 * 60 * 1000) {
    return null;
  }
  viewDebounceMap.set(debounceKey, now);

  // Clean old entries if map grows
  if (viewDebounceMap.size > 1000) {
    for (const [key, timestamp] of viewDebounceMap.entries()) {
      if (now - timestamp > 15 * 60 * 1000) {
        viewDebounceMap.delete(key);
      }
    }
  }

  try {
    const collection = getPromptsCollection();
    const result = await collection.findOneAndUpdate(
      { slug },
      { $inc: { viewCount: 1 } },
      { returnDocument: "after", projection: { viewCount: 1 } }
    );
    return result?.viewCount ?? null;
  } catch (error) {
    console.warn("Failed to increment viewCount in DB:", (error as Error).message);
    const item = initialPrompts.find((p) => p.slug === slug);
    if (item) {
      item.viewCount += 1;
      return item.viewCount;
    }
    return null;
  }
}

/**
 * Retrieves protected prompt content for verified users or free prompts
 */
export async function getProtectedPromptContent(
  slug: string,
  user?: { id?: string; email?: string; role?: string | null } | null
): Promise<{ success: boolean; content?: string; error?: string }> {
  try {
    const collection = getPromptsCollection();
    const doc = await collection.findOne({ slug, isPublished: true });

    if (!doc) {
      const memoryMatch = initialPrompts.find((p) => p.slug === slug);
      if (!memoryMatch) {
        return { success: false, error: "Prompt not found" };
      }
      return authorizeAndReturn(memoryMatch, user);
    }

    return authorizeAndReturn(doc, user);
  } catch (error) {
    console.warn("MongoDB getProtectedPromptContent error:", (error as Error).message);
    const memoryMatch = initialPrompts.find((p) => p.slug === slug);
    if (memoryMatch) {
      return authorizeAndReturn(memoryMatch, user);
    }
    return { success: false, error: "Database error" };
  }
}

function authorizeAndReturn(
  prompt: PromptDocument,
  user?: { id?: string; email?: string; role?: string | null } | null
): { success: boolean; content?: string; error?: string } {
  // 1. Free prompts are accessible to all visitors
  if (prompt.price === 0 || prompt.accessType === "free") {
    return { success: true, content: prompt.content };
  }

  // 2. Admin users have global bypass
  if (user?.role === "admin") {
    return { success: true, content: prompt.content };
  }

  // 3. Paid prompts require active session and purchase/subscription entitlement
  if (!user) {
    return {
      success: false,
      error: "Authentication required to unlock this premium prompt.",
    };
  }

  // For initial checkout demonstration, registered users can unlock or access preview
  return {
    success: true,
    content: prompt.content,
  };
}

/**
 * Get related prompts from the same category
 */
export async function getRelatedPrompts(slug: string, category: string, limit: number = 4): Promise<Prompt[]> {
  try {
    const collection = getPromptsCollection();
    const docs = await collection
      .find(
        { slug: { $ne: slug }, category, isPublished: true },
        { projection: { content: 0 } }
      )
      .limit(limit)
      .toArray();

    if (docs.length > 0) {
      return docs.map(sanitizePrompt);
    }
  } catch {
    // fallback
  }

  return initialPrompts
    .filter((p) => p.slug !== slug && p.category === category && p.isPublished)
    .slice(0, limit)
    .map(sanitizePrompt);
}
