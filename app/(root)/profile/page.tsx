"use client";

import EditProfileCard from "@/app/components/EditProfileCard";
import ProfileCard from "@/app/components/ProfileCard";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
    <div className="p-5">
      {/* Animated Heading */}
      <motion.div
        className="flex flex-row justify-between items-center mt-5 w-full"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.p
          key={editSelected ? "edit" : "view"}
          className="text-4xl font-semibold font-lato mx-3"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {editSelected ? "Edit Profile" : "Your Profile"}
        </motion.p>

        {/* Animated Buttons */}
        <div className="flex flex-row items-cente gap-20 me-20">
          <motion.button
            onClick={() => setEditSelected(false)}
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <p
              className={`text-xl font-lato my-5 -me-5 ${
                !editSelected ? "font-bold" : "text-gray-400"
              }`}
            >
              View
            </p>
          </motion.button>

          <motion.button
            onClick={() => setEditSelected(true)}
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <p
              className={`text-xl font-lato my-5 -me-5 ${
                editSelected ? "font-bold" : "text-gray-400"
              }`}
            >
              Edit
            </p>
          </motion.button>
        </div>
      </motion.div>

      {/* Animated Profile Card Switching */}
      <AnimatePresence mode="wait">
        {!editSelected ? (
          <motion.div
            key="viewProfile"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <ProfileCard profileData={profileData} />
          </motion.div>
        ) : (
          <motion.div
            key="editProfile"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <EditProfileCard
              profileData={profileData}
              setProfileData={setProfileData}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default page;
