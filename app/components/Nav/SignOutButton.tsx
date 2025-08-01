"use client";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <button
      className="bg-[#bd2222] text-white px-4 py-2 rounded-md flex  items-center gap-3 "
      onClick={() => signOut()}
    >
      <LogOut className="w-5 h-5" />
      <span className="text-[17px] tracking-wider font-sans">Logout</span>
    </button>
  );
}
