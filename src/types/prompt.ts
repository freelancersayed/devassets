export type PromptCategory =
  | "Development"
  | "Business"
  | "Marketing"
  | "Image Generation"
  | "Writing"
  | "Productivity";

export type PromptAccessType = "free" | "paid" | "subscription";

export interface Prompt {
  _id?: string;
  title: string;
  slug: string;
  category: PromptCategory | string;
  price: number;
  currency: string;
  description: string;
  image: string;
  viewCount: number;
  likesCount?: number;
  accessType: PromptAccessType;
  preview: string;
  compatibleModels?: string[];
  tags?: string[];
  isPublished: boolean;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface PromptDocument extends Omit<Prompt, "_id"> {
  _id?: any;
  content: string; // PROTECTED: full system prompt / parameters
}

export interface PromptQueryOptions {
  search?: string;
  category?: string;
  page?: number;
  limit?: number;
}

export interface PromptApiResponse {
  prompts: Prompt[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  categories: string[];
}
