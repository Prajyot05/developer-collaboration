import Image from "next/image";
import React from "react";
import TagButton from "./TagButton";
import { Lato } from "next/font/google";
import Link from "next/link";

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
  variable: "--font-lato",
});

const ProjectCard = ({ color }: { color: string }) => {
  return (
    <main className={`${color} px-8 py-6 mb-8 me-7 rounded-xl`}>
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
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
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
  );
};

export default ProjectCard;
