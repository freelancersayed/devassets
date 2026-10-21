import { MongoClient } from "mongodb";

const uri =
  process.env.MONOGO_DB_URI ||
  process.env.MONGODB_URI ||
  "";

if (!uri) {
  console.warn("Warning: MongoDB connection string (MONOGO_DB_URI / MONGODB_URI) is missing in environment variables.");
}

let client: MongoClient;

declare global {
  // eslint-disable-next-line no-var
  var _mongoClient: MongoClient | undefined;
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClient) {
    global._mongoClient = new MongoClient(uri);
  }
  client = global._mongoClient;
} else {
  client = new MongoClient(uri);
}

export default client;
