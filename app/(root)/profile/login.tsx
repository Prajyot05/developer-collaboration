import Image from "next/image";
import { auth } from "@/app/auth";
import SignOutButton from "../../components/SignOutButton";
import SignInButton from "../../components/SignInButton";

export default async function Home() {
  const session = await auth();

  if (session) {
    const profilePic = session.user?.image;

    return (
      <div>
        <p className="my-2">
          Do DSA, <span className="text-xl">{session.user?.name}</span>
        </p>
        <p>Details:</p>
        <div className="mx-5 my-2">
          <p>ID: {session.user?.id}</p>
          <p>Email: {session.user?.email}</p>
          {profilePic && (
            <Image
              layout="fixed"
              width={100}
              height={100}
              alt="profile pic"
              src={profilePic}
            />
          )}
        </div>
        <SignOutButton />
      </div>
    );
  }

  return (
    <div>
      <p>Not signed in</p>
      <SignInButton />
    </div>
  );
}
