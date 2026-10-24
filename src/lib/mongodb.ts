import { MongoClient } from "mongodb";
import dns from "node:dns";

try {
  dns.setServers(["8.8.8.8", "8.8.4.4"]);
} catch {
  // Ignore in environments where setServers is restricted
}

const uri =
  process.env.MONGODB_URI ||
  process.env.MONOGO_DB_URI ||
  "mongodb://127.0.0.1:27017/DevAssets";

if (!process.env.MONGODB_URI && !process.env.MONOGO_DB_URI) {
  console.warn(
    "Warning: MongoDB connection string (MONGODB_URI) is missing in environment variables. Using placeholder connection string for static build."
  );
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
