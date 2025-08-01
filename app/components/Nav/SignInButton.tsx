"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";

export default function SignInButton() {
  return (
    <button
      className="px-4 py-2 border flex gap-3 border-slate-700  rounded-lg text-slate-700 hover:border-slate-400 font-mono hover:text-slate-900 hover:bg-gray-100 focus:bg-gray-300 hover:shadow transition duration-150"
      onClick={() => signIn("google")}
    >
      <Image
        className="w-6 h-6"
        src="https://www.svgrepo.com/show/475656/google-color.svg"
        width={24}
        height={24}
        loading="lazy"
        alt="google logo"
      />
      <span>Continue with Google</span>
    </button>
  );
}
