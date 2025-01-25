"use client";

import { signIn } from "next-auth/react";

export default function SignInButton() {
  return (
    <button
      className="py-3 px-24 border-2 border-gray-400 text-gray-400 text-2xl rounded-lg hover:border-gray-600 hover:bg-gray-100 active:bg-gray-400 active:text-white"
      onClick={() => signIn("google")}
    >
      <div className="flex flex-row items-center gap-2">
        <img src="/google.svg" alt="google icon" className="size-7" />
        <p className="tracking-wider">Google</p>
      </div>
    </button>
  );
}
