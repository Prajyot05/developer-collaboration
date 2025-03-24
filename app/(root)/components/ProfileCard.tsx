"use client";
import React from "react";
import Badge from "./Badge";
import Signature from "./Signature";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const ProfileCard = ({ profileData }: any) => {
  return (
    <div className="border border-[#878787] rounded-lg">
      <div className="flex flex-1">
        <div className="w-1/3 border-r-2 border-gray-300">
          <Badge title="S" color="yellow" />
          <Signature />
        </div>
        <section className="w-2/3 px-6 py-4">
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
              {profileData.institute}
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
            <FaGithub size={40} />
            <FaLinkedin size={40} color="#0077B5" />
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProfileCard;
