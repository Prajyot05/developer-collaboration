"use client";
import React, { useState } from "react";
import ProfileCard from "../components/ProfileCard";
import AchievementsCard from "../components/AchievementsCard";
import EditProfile from "../components/EditProfile";

const Page = () => {
  const [editProfile, setEditProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Rohit Tare",
    projectsCompleted: "01",
    location: "Maharashtra, India",
    institute: "Pimpri Chinchwad College of Engineering and Research, Ravet",
    skills: "AI/ML, Web Development, DSA",
    github: "",
    linkedin: "",
  });

  const handleProfileUpdate = (data: any) => {
    setProfileData(data);
    setEditProfile(false);
  };

  return (
    <>
      <div className="ms-[10%]">
        <header className="mt-6 ">
          <p className="font-dmsans text-3xl">Hello, {profileData.name}!</p>
          {!editProfile && (
            <p className="font-dmsans text-xl font-light">
              Here's your Guild Card
            </p>
          )}
        </header>
        {!editProfile ? (
          <section className="mt-3 lg:flex lg:justify-start lg:gap-6 ">
            <div className="w-[95%] lg:w-[60%] h-fit flex flex-col items-center gap-14 mb-10 2xl:-ms-[5%]">
              <ProfileCard profileData={profileData} />
              <button
                className="text-xl font-dmsans bg-[#004AAD] text-white px-5 py-3 rounded-md font-light"
                onClick={() => {
                  setEditProfile(true);
                }}
              >
                Edit Guild Profile
              </button>
            </div>

            <div className="w[90%] lg:w-[40%] mb-20 me-10 flex flex-col gap-14 items-center ">
              <AchievementsCard />
              <button className="text-xl w-fit font-dmsans bg-[#004AAD] text-white px-5 py-3 rounded-md font-light">
                Add Achievements
              </button>
            </div>
          </section>
        ) : (
          <div className="mt-4">
            <EditProfile onProfileUpdate={handleProfileUpdate} />
          </div>
        )}
      </div>
    </>
  );
};

export default Page;
