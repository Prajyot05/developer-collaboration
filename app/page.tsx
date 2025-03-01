import { redirect } from "next/navigation";
import { auth } from "@/app/auth";
import ClientHome from "./components/ClientHome";

export default async function Page() {
  const session = await auth();

  // Redirect to profile page if the user is authenticated
  if (session) {
    redirect("/profile");
  }

  // Pass session to client component
  return <ClientHome session={session} />;
}
