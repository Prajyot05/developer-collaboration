import { auth } from "@/app/auth";
import Image from "next/image";
import SignInButton from "./SignInButton";

export default async function ProfileButton() {
  const session = await auth();
  const user = session?.user;

  return (
    <>
      {user ? (
        <Image
          src={user.image || ""}
          alt={user.name || "User avatar"}
          width={80}
          height={80}
          className="rounded-full mb-4"
        />
      ) : (
        <SignInButton />
      )}
    </>
  );
}
