import client from "./mongodb";
import { Db, Collection, ObjectId } from "mongodb";

export interface UserDoc {
  _id?: ObjectId | string;
  id?: string;
  email: string;
  name?: string;
  createdAt: Date;
  updatedAt?: Date;
}

export interface UserPurchaseDoc {
  _id?: ObjectId | string;
  userId: string;
  productId: string;
  purchasedAt: Date;
  status: "ACTIVE" | "EXPIRED";
}

export interface UserCreditDoc {
  _id?: ObjectId | string;
  userId: string;
  remainingDownloads: number;
  expiresAt: Date;
  updatedAt?: Date;
}

/**
 * Returns connected MongoDB database instance
 */
export async function getDb(): Promise<Db> {
  const dbName = process.env.DB_NAME || "DevAssets";
  return client.db(dbName);
}

/**
 * Direct typed access to native MongoDB Collections
 */
export async function getCollections() {
  const database = await getDb();
  return {
    db: database,
    users: database.collection<UserDoc>("users"),
    userPurchases: database.collection<UserPurchaseDoc>("user_purchases"),
    userCredits: database.collection<UserCreditDoc>("user_credits"),
  };
}

/**
 * Automatically creates unique compound indexes for MongoDB
 */
export async function ensureMongoIndexes() {
  try {
    const { users, userPurchases, userCredits } = await getCollections();
    await Promise.allSettled([
      users.createIndex({ email: 1 }, { unique: true }),
      userPurchases.createIndex({ userId: 1, productId: 1 }, { unique: true }),
      userPurchases.createIndex({ userId: 1 }),
      userCredits.createIndex({ userId: 1 }, { unique: true }),
    ]);
  } catch (error) {
    console.error("[MongoDB] Index initialization warning:", error);
  }
}

export default getDb;
