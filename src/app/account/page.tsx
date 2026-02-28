import type { Metadata } from "next";
import { AccountPageClient } from "./AccountPageClient";

export const metadata: Metadata = {
  title: "My Account",
  description: "Manage your LumaWear account, orders, and addresses.",
};

export default function AccountPage() {
  return <AccountPageClient />;
}
