import ProfileCard from "@/app/components/ProfileCard";
import React from "react";

const page = () => {
  return (
    <div>
      <div className="flex flex-row justify-between items-center w-full">
        <p className="text-3xl font-semibold font-lato my-5 mx-3">Profile</p>
        <p className="text-xl font-lato my-5 mx-20">Edit</p>
      </div>
      <ProfileCard />
    </div>
  );
};

export default page;
