"use client";

import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return <button className="py-2 px-5 bg-orange-800 rounded-md" onClick={() => signOut()}>Sign out</button>;
}