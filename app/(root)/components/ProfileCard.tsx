"use client";
import React from "react";
import Badge from "./Badge";
import Signature from "./Signature";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { User } from "@/app/types/user";

const ProfileCard = ({ profileData }: { profileData: User }) => {
  return (
    <div className="border border-[#9a8989] rounded-lg">
      <div className="md:flex md:flex-1">
        <div className="w-full md:w-1/3 md:border-r-2 border-gray-300">
          <Badge title="S" color="yellow" />
          <Signature />
        </div>
        <section className="w-full md:w-2/3 px-6 py-4">
          <p className="text-3xl font-dmsans text-[#717171] py-2">
            {profileData.name}
          </p>
          <div className="my-3">
            <span className="text-xl font-dmsans text-[#717171] font-bold pe-2 py-4">
              Projects Completed:
            </span>
            <span className="text-xl text-[#717171] font-dmsans">68</span>
          </div>
          <div className="my-3">
            <span className="text-xl font-dmsans text-[#717171] font-bold pe-2 py-4">
              Location:
            </span>
            <span className="text-xl text-[#717171] font-dmsans">
              {profileData.location}
            </span>
          </div>
          <div className="my-3">
            <span className="text-xl font-dmsans text-[#717171] font-bold pe-2 py-4">
              Institute:
            </span>
            <p className="text-xl text-[#717171] font-dmsans">
              {profileData.instituteName}
            </p>
          </div>
          <div className="my-3">
            <span className="text-xl font-dmsans text-[#717171] font-bold pe-2 py-4">
              Skills:
            </span>
            <span className="text-xl text-[#717171] font-dmsans">
              {profileData.skills}
            </span>
          </div>

          <div className="flex gap-5 items-center">
            <span className="text-xl font-dmsans text-[#717171] font-bold pe-2 py-4">
              Other Accounts:
            </span>
            <a href={profileData.github} target="_blank">
              <FaGithub size={40} />
            </a>
            <a href={profileData.linkedin} target="_blank">
              <FaLinkedin size={40} color="#0077B5" />
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProfileCard;
