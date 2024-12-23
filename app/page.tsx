"use client";

import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/profile");
    }
  }, [status, router]);

  const handleSignIn = () => {
    signIn("google");
  };

  return (
    <div>
      {status === "loading" && <p>Loading...</p>}
      {status === "unauthenticated" && (
        <div className="p-10">
          <h1 className="text-6xl my-5">Developer Collaboration</h1>
          <button className="bg-gray-500 border-white p-3 rounded-lg hover:bg-gray-600 transition-colors" onClick={handleSignIn}>Sign in with Google</button>
        </div>
      )}
    </div>
  );
}