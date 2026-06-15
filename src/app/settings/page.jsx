import React from "react";
import { getUserSession } from "@/lib/core/session";
import { redirect } from "next/navigation";
import SettingsClient from "./SettingsClient";
import { getBillingHistory } from "@/lib/actions/billing";

export const metadata = {
  title: "Settings - Talentist Velo",
  description: "Manage your account settings and preferences.",
};

export default async function SettingsPage() {
  const user = await getUserSession();

  if (!user) {
    redirect("/api/auth/signin"); // Or wherever the login page is
  }

  const billingHistory = await getBillingHistory(user.email);

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6 md:p-12 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10 border-b border-zinc-800 pb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-100">
            Account Settings
          </h1>
          <p className="text-zinc-400 mt-2">
            Manage your profile, security preferences, and workspace settings.
          </p>
        </div>

        {/* Pass the server-fetched user down to the interactive client component */}
        <SettingsClient initialUser={user} billingHistory={billingHistory} />
      </div>
    </div>
  );
}
