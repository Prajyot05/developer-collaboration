"use client";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function SignInButton() {
  const { status } = useSession();

  if (status === "loading") {
    return (
      <button className="bg-gray-400 text-white font-lato px-4 py-2 rounded-md cursor-not-allowed">
        Loading...
      </button>
    );
  }

  if (status === "authenticated") {
    return null;
  }

  return (
    <button
      className="bg-[#A50000] text-white font-lato px-4 py-2 rounded-md hover:bg-[#840000] transition-colors duration-300 transform active:scale-95"
      onClick={() => signIn("google")}
    >
      Sign in with Google
    </button>
  );
}
