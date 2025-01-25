import InputBar from "@/app/components/InputBar";
import Image from "next/image";
import React from "react";
import { Lato } from "next/font/google";
import TagButton from "@/app/components/TagButton";
import ProjectCard from "@/app/components/ProjectCard";

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
  variable: "--font-lato",
});

const page = () => {
  return (
    <>
      <div className="flex flex-row justify-between items-center w-full my-2">
        <p className="text-4xl font-lato font-bold">Current Quests</p>
        <InputBar />
      </div>
      {/* Project Card */}
      <ProjectCard color="bg-blue-100" />
      <ProjectCard color="bg-green-100" />
      <ProjectCard color="bg-pink-100" />
    </>
  );
};

export default page;
