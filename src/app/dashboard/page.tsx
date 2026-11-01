import type { Metadata } from "next";
import DashboardClient from "./DashboardClient";

export const metadata: Metadata = {
  title: "User Dashboard — DevAssets",
  description:
    "Manage your purchased developer kits, license keys, prompt libraries, and 100% private browser utilities.",
};

export default function DashboardPage() {
  return <DashboardClient />;
}

