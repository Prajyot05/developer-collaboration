"use client";

import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <button
      className="bg-[#A50000] text-white font-lato px-4 py-2 rounded-md"
      onClick={() => signOut()}
    >
      Sign out
    </button>
  );
}
