"use client";

import { signIn } from "next-auth/react";

export default function SignInButton() {
  return <button className="py-2 px-5 bg-orange-800 rounded-md" onClick={() => signIn("google")}>Sign in with Google</button>;
}