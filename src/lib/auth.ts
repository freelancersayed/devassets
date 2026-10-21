import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import client from "./mongodb";

const db = client.db(process.env.DB_NAME || "DevAssets");

export const auth = betterAuth({
  database: mongodbAdapter(db),
  secret: process.env.BETTER_AUTH_SECRET || "devassets-secure-fallback-secret-minimum-32-chars",
  baseURL:
    process.env.BETTER_AUTH_URL ||
    process.env.NEXT_PUBLIC_APP_URL ||
    "http://localhost:3000",
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      enabled: Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET),
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
      enabled: Boolean(process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET),
    },
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // 5 minutes cache
    },
  },
});
