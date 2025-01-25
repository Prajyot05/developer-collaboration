import TagButton from "@/app/components/TagButton";
import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="bg-gray-400 ps-8 pe-6 pb-3 pt-8">
      <Link href={"/projects"}>
        <X className="absolute top-8 right-6 bg-white size-10 p-2 rounded-full" />
      </Link>
      <main className={`bg-blue-100 px-8 py-6 my-8 me-10 rounded-xl`}>
        <div className="flex flex-row items-start gap-5">
          <Image
            src="/medal1.svg"
            width={150}
            height={150}
            alt="mail icon"
            className="-mt-10 size-60"
          />
          <div>
            <p className="text-5xl font-extrabold font-lato">Project_Title</p>
            <p className="text-3xl font-extrabold font-lato mt-3">Assigner</p>
            <p className="text-2xl font-lato mt-4 mb-3">Tags:</p>
            <TagButton title="Web/App Development" color="bg-blue-200" />
            <TagButton title="IOT" color="bg-yellow-200" />
            <TagButton title="Data Analytics" color="bg-red-200" />
            <TagButton title="AIML" color="bg-green-200" />
            <p className="text-2xl font-lato mt-4 mb-1">Abstract:</p>
            <p className="font-lato mb-3 text-gray-500">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Lorem ipsum dolor sit amet, consectetur adipiscing
              elit, sed do eiusmod tempor incididunt ut labore et dolore magna
              aliqua.
            </p>
            <p className="text-2xl font-lato mt-4 mb-1">Data:</p>
            <p className="font-lato mb-3 text-gray-500">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Lorem ipsum dolor sit amet, consectetur adipiscing
              elit, sed do eiusmod tempor incididunt ut labore et dolore magna
              aliqua.
            </p>
            <p className="text-2xl font-lato mt-4 mb-1">More Data:</p>
            <p className="font-lato mb-3 text-gray-500">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Lorem ipsum dolor sit amet, consectetur adipiscing
              elit, sed do eiusmod tempor incididunt ut labore et dolore magna
              aliqua.
            </p>
            <div className="flex flex-row gap-5 justify-between items-center">
              <div className="flex flex-row gap-5 items-center">
                <Image src="/eye.svg" width={30} height={30} alt="eye icon" />
                <p className="text-gray-500 text-lg">230</p>
                <Image
                  src="/darkmail.svg"
                  width={30}
                  height={30}
                  alt="eye icon"
                  className="ml-3"
                />
                <p className="text-gray-500 text-lg">520</p>
              </div>
              <Link
                href="/projects/id"
                className="px-5 bg-red-300 rounded-full font-lato font-bold text-white border-2 border-gray-400"
              >
                View
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default page;
