"use client";

import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { LogOut } from "lucide-react";

export default function SignOutButton() {
  const { status } = useSession();

  if (status === "loading") {
    return (
      <button className="px-3 py-2 rounded-lg text-sm bg-theme-tertiary text-theme-tertiary cursor-not-allowed animate-pulse">
        ...
      </button>
    );
  }

  if (status === "unauthenticated") {
    return null;
  }

  return (
    <button
      className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-theme-secondary hover:bg-red-500/10 hover:text-red-500 dark:hover:text-red-400 transition-all duration-200"
      onClick={() => signOut()}
      title="Sign out"
    >
      <LogOut size={16} />
      <span className="hidden md:inline">Sign out</span>
    </button>
  );
}
