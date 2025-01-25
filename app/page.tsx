import { redirect } from "next/navigation";
import SignInButton from "./components/SignInButton";
import { auth } from "@/app/auth";
import Image from "next/image";

export default async function Home() {
  const session = await auth();

  // Redirect to profile page if the user is authenticated
  if (session) {
    redirect("/profile");
  }

  // Render the unauthenticated state
  return (
    <div className="flex flex-row justify-center items-center w-screen h-screen">
      <div className="p-10 flex flex-col items-center">
        <h1 className="text-5xl my-4 font-lato font-extrabold text-blue-500 tracking-wide">
          DEVELOPERS'
        </h1>
        <h1 className="text-8xl -mt-5 mb-10 bg-black text-white px-3 pb-1 rounded-lg font-lato font-extrabold tracking-wider">
          GUILD
        </h1>

        <SignInButton />
      </div>
      <Image
        src="/decologo.png"
        width={1000}
        height={600}
        alt="hero image"
        className="size-600 cover"
      />
    </div>
  );
}
