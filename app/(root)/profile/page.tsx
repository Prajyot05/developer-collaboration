"use client";
import React, { useState, useEffect } from "react";
import ProfileCard from "../../components/ProfileCard";
import AchievementsCard from "../../components/AchievementsCard";
import EditProfile from "../../components/EditProfile";
import useAuthStore from "@/app/store/useAuthStore";
import { User } from "@/app/types/user";

const Page = () => {
  const { user } = useAuthStore();
  const [editProfile, setEditProfile] = useState(false);
  const [profileData, setProfileData] = useState<User>({
    id: user?.id || "",
    name: user?.name || "",
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    gender: user?.gender || "",
    skills: user?.skills || [],
    profilePic: user?.profilePic || "",
    email: user?.email || "",
    instituteName: user?.instituteName || "",
    github: user?.github || "",
    linkedin: user?.linkedin || "",
    location: user?.location || "Maharashtra, India",
    projectsCompleted: user?.projectsCompleted || 0,
    rank: user?.rank,
    projectIds: user?.projectIds || [],
    image: user?.image || "",
  });

  useEffect(() => {
    if (user) {
      setProfileData((prevData) => ({
        ...prevData,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        gender: user.gender,
        skills: user.skills,
        profilePic: user.profilePic,
        instituteName: user.instituteName,
        github: user.github,
        linkedin: user.linkedin,
        location: user.location,
        projectsCompleted: user.projectsCompleted,
        rank: user.rank,
        projectIds: user.projectIds,
        image: user.image,
      }));
    }
  }, [user]);

  const handleProfileUpdate = (data: User) => {
    setProfileData(data);
    setEditProfile(false);
  };

  return (
    <>
      <div className="ms-[10%]">
        <header className="mt-6  ">
          <p className="font-dmsans text-3xl">
            Hello, {profileData.firstName} {profileData.lastName}!
          </p>
          {!editProfile && (
            <p className="font-dmsans text-xl font-light">
              Here&apos;s your Guild Card
            </p>
          )}
        </header>
        {!editProfile ? (
          <section className="mt-3 lg:flex lg:justify-start lg:gap-3 ">
            <div className=" w-[90%] lg:w-[60%] h-fit flex flex-col items-center gap-14 mb-10 2xl:-ms-[10%] xl:-ms-[10%]">
              {/* Pass dynamic profileData to ProfileCard */}
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
