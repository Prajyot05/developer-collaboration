"use client";

import EditProfileCard from "@/app/components/EditProfileCard";
import ProfileCard from "@/app/components/ProfileCard";
import React from "react";
import { useState } from "react";

type ProfileData = {
  name: string;
  country: string;
  profession: string;
  institute: string;
  area: string;
  email: string;
  skills: string[];
  github: string;
  linkedin: string;
};

const page = () => {
  const [editSelected, setEditSelected] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    name: "",
    country: "",
    profession: "",
    institute: "",
    area: "",
    email: "",
    skills: [],
    github: "",
    linkedin: "",
  });

  return (
    <div>
      <div className="flex flex-row justify-between items-center mt-5 w-full">
        {!editSelected ? (
          <p className="text-4xl font-semibold font-lato my-5 mx-3">
            Your Profile
          </p>
        ) : (
          <p className="text-4xl font-semibold font-lato my-5 mx-3">
            Edit Profile
          </p>
        )}
        <div className="flex flex-row items-center gap-20 me-20">
          <button onClick={() => setEditSelected(false)}>
            {!editSelected ? (
              <p className="text-xl font-lato my-5 -me-5 font-bold">View</p>
            ) : (
              <p className="text-xl text-gray-400 font-lato my-5 -me-5">View</p>
            )}
          </button>
          <button onClick={() => setEditSelected(true)}>
            {!editSelected ? (
              <p className="text-xl text-gray-400 font-lato my-5 -me-5">Edit</p>
            ) : (
              <p className="text-xl font-lato my-5 -me-5 font-bold">Edit</p>
            )}
          </button>
        </div>
      </div>
      {!editSelected ? (
        <ProfileCard profileData={profileData} />
      ) : (
        <EditProfileCard
          profileData={profileData}
          setProfileData={setProfileData}
        />
      )}
    </div>
  );
};

export default page;
