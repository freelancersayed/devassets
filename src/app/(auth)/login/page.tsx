import type { Metadata } from "next";
import AuthCard from "@/components/AuthCard";

export const metadata: Metadata = {
  title: "Sign In — DevAssets",
  description: "Sign in to access your purchased developer toolkits, prompt libraries, and client-side web utilities.",
};

export default function LoginPage() {
  return <AuthCard mode="login" />;
}
