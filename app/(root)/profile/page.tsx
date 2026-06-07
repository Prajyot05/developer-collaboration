"use client";
import React, { useState, useEffect } from "react";
import ProfileCard from "../components/ProfileCard";
import AchievementsCard from "../components/AchievementsCard";
import EditProfile from "../components/EditProfile";
import useAuthStore from "@/app/store/useAuthStore";
import { User } from "@/app/types/user";
import { motion } from "framer-motion";
import { toast } from "sonner";

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
    collegeDetails: user?.collegeDetails || { name: "" },
    github: user?.github || "",
    linkedin: user?.linkedin || "",
    location: user?.location || "",
    projectsCompleted: user?.projectsCompleted || 0,
    rank: user?.rank,
    projectIds: user?.projectIds || [],
    image: user?.image || "",
  });

  useEffect(() => {
    if (user) {
      setProfileData((prevData) => ({
        ...prevData,
        name: user.name || `${user.firstName} ${user.lastName}`,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        gender: user.gender,
        skills: user.skills,
        profilePic: user.profilePic,
        collegeDetails: user.collegeDetails,
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
    <div className="min-h-screen bg-theme-primary px-6 md:px-12 lg:px-16 py-8">
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-theme-primary">
          Hello, {profileData.firstName || "Developer"} {profileData.lastName}!
        </h1>
        {!editProfile && (
          <p className="text-theme-secondary mt-1">
            Here&apos;s your Guild Card
          </p>
        )}
      </motion.header>

      {!editProfile ? (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:flex lg:justify-start lg:gap-8"
        >
          <div className="lg:w-[55%] flex flex-col items-center gap-6 mb-10">
            <ProfileCard profileData={profileData} />
            <button
              className="bg-gradient-to-r from-brand-500 to-purple-600 hover:from-brand-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl text-base font-medium transition-all duration-200 shadow-md hover:shadow-lg active:scale-[0.98]"
              onClick={() => setEditProfile(true)}
            >
              Edit Guild Profile
            </button>
          </div>

          <div className="lg:w-[40%] mb-20 flex flex-col gap-6 items-center">
            <AchievementsCard />
            <button 
              className="bg-theme-card border border-theme-primary text-theme-primary px-6 py-3 rounded-xl text-base font-medium hover:bg-theme-tertiary transition-all duration-200"
              onClick={() => toast.info("Custom achievements are coming soon!")}
            >
              Add Achievements
            </button>
          </div>
        </motion.section>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4"
        >
          <EditProfile onProfileUpdate={handleProfileUpdate} />
        </motion.div>
      )}
    </div>
  );
};

export default Page;
