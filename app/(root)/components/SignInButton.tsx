"use client";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function SignInButton() {
  const { status } = useSession();

  if (status === "loading") {
    return (
      <button className="px-4 py-2 rounded-lg text-sm font-medium bg-theme-tertiary text-theme-tertiary cursor-not-allowed animate-pulse">
        Loading...
      </button>
    );
  }

  if (status === "authenticated") {
    return null;
  }

  return (
    <button
      className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-md hover:shadow-lg active:scale-[0.98]"
      onClick={() => signIn("google", { callbackUrl: "/project" })}
    >
      Sign in with Google
    </button>
  );
}
