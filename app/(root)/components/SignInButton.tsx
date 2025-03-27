"use client";
import { signIn } from "next-auth/react";

export default function SignInButton() {
  return (
    <button
      className="bg-[#A50000] text-white font-lato px-4 py-2 rounded-md"
      onClick={() => signIn("google")}
    >
      Sign in with Google
    </button>
  );
}
