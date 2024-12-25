import { redirect } from "next/navigation";
import SignInButton from "./components/SignInButton";
import { auth } from "@/app/auth";

export default async function Home() {
  const session = await auth();

  // Redirect to profile page if the user is authenticated
  if (session) {
    redirect("/profile");
  }

  // Render the unauthenticated state
  return (
    <div className="p-10">
      <h1 className="text-6xl my-5">Developer Collaboration</h1>
      <SignInButton />
    </div>
  );
}