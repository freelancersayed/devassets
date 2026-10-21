import type { Metadata } from "next";
import AuthCard from "@/components/AuthCard";

export const metadata: Metadata = {
  title: "Create an Account — DevAssets",
  description: "Join DevAssets to access 100% private browser tools, curated AI prompts, and enterprise developer kits.",
};

export default function RegisterPage() {
  return <AuthCard mode="register" />;
}
