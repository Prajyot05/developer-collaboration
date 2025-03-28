"use client";
import useAuthStore from "@/app/store/useAuthStore";
import Image from "next/image";
import React, { useState } from "react";

const EditProfile = ({ onProfileUpdate }: any) => {
  const { user } = useAuthStore();

  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [instituteName, setInstituteName] = useState(user?.instituteName || "");
  const [location, setLocation] = useState(user?.location || "");
  const [github, setGithub] = useState(user?.github || "");
  const [linkedin, setLinkedin] = useState(user?.linkedin || "");
  const [skills, setSkills] = useState(user?.skills || []);
  const [newSkill, setNewSkill] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  // Add new skill to the skills list
  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill]);
      setNewSkill("");
    }
  };

  // Remove skill from the list
  const removeSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  // Submit profile data
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedProfileData = {
      firstName,
      lastName,
      email,
      instituteName,
      location,
      skills,
      github,
      linkedin,
    };
    onProfileUpdate(updatedProfileData);
  };

  return (
    <section className="-ms-4 flex justify-start gap-10 mb-10">
      {/* Left Section with Profile Image */}
      <aside className="w-[40%] h-fit bg-[#F7E8FE] px-5 py-5 rounded-3xl">
        <p className="font-dmsans text-2xl mb-2 text-[#1E1F21]">
          Welcome to Profile Page.
        </p>
        <p className="font-dmsans text-lg w-[80%] leading-6 pb-3 text-[#1E1F21]">
          Here, you can manage and update your personal information to ensure
          that your account reflects your preferences. This is where you can
          adjust your settings, change your details, and keep your profile
          up-to-date.
        </p>
        <p className="w-[80%] leading-6 pb-8 text-[#1E1F21]">
          For selection purposes, certain data you provide here will be required
          and used in applications submitted to project creators. This may
          include your name, relevant skills or qualifications, and other
          necessary details for selection.
        </p>
        <div className="w-full flex justify-center">
          <Image
            src={user?.image!}
            alt="Profile Icon"
            height={250}
            width={250}
            className="bg-white rounded-full mb-6"
          />
        </div>
      </aside>

      {/* Main Profile Edit Form */}
      <main>
        {/* Full Name */}
        <p className="text-xl font-medium text-gray-600 mb-6">Full Name</p>
        <div className="flex gap-5 mb-8">
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First name*"
            className="px-4 py-4 w-[11rem] text-xl text-gray-600 font-dmsans border rounded-md border-gray-400 placeholder:text-xl placeholder:text-gray-500"
          />
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last name*"
            className="px-4 py-4 w-[11rem] text-xl text-gray-600 font-dmsans border rounded-md border-gray-400 placeholder:text-xl placeholder:text-gray-500"
          />
        </div>

        {/* Email */}
        <p className="text-xl font-medium text-gray-600 mb-6">E-mail Address</p>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
          className="px-4 py-4 w-[40rem] text-xl text-gray-600 font-dmsans border rounded-md border-gray-400 placeholder:text-xl placeholder:text-gray-500"
        />

        {/* Institute */}
        <p className="text-xl font-medium text-gray-600 my-6">Institute Name</p>
        <input
          type="text"
          value={instituteName}
          onChange={(e) => setInstituteName(e.target.value)}
          placeholder="Institute name"
          className="px-4 py-4 w-[40rem] text-xl text-gray-600 font-dmsans border rounded-md border-gray-400 placeholder:text-xl placeholder:text-gray-500"
        />

        {/* Location */}
        <p className="text-xl font-medium text-gray-600 my-6">Location</p>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location (e.g., City, Country)"
          className="px-4 py-4 w-[40rem] text-xl text-gray-600 font-dmsans border rounded-md border-gray-400 placeholder:text-xl placeholder:text-gray-500"
        />

        {/* Skills */}
        <p className="text-xl font-medium text-gray-600 my-6">Skills</p>
        <div className="flex gap-6 mb-6">
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            placeholder="Enter Skill"
            className="px-4 py-4 w-[15rem] text-xl text-gray-600 font-dmsans border rounded-md border-gray-400 placeholder:text-xl placeholder:text-gray-500"
          />
          <button
            onClick={addSkill}
            className="bg-[#A8A8A8] text-white text-lg font-thin w-[8rem] px-5 py-2 rounded-md hover:font-normal"
          >
            Add
          </button>
        </div>

        {/* Display Skills List */}
        <div className="flex flex-wrap gap-3">
          {skills.length > 0 ? (
            skills.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-gray-200 px-4 py-3 rounded-md"
              >
                <span className="text-gray-700 text-xl">{item}</span>
                <button
                  onClick={() => removeSkill(index)}
                  className="rotate-45 bg-white px-2 rounded-full text-gray border border-gray-400 text-2xl text-black"
                >
                  +
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No skills added yet!</p>
          )}
        </div>

        {/* Social Links */}
        <p className="text-xl font-medium text-gray-600 my-6">Social Links</p>
        <input
          type="url"
          value={github}
          onChange={(e) => setGithub(e.target.value)}
          placeholder="Github URL"
          className="px-4 py-4 w-[40rem] text-xl text-gray-600 font-dmsans border rounded-md border-gray-400 placeholder:text-xl placeholder:text-gray-500"
        />
        <input
          type="url"
          value={linkedin}
          onChange={(e) => setLinkedin(e.target.value)}
          placeholder="LinkedIn URL"
          className="px-4 py-4 mt-6 w-[40rem] text-xl text-gray-600 font-dmsans border rounded-md border-gray-400 placeholder:text-xl placeholder:text-gray-500"
        />

        {/* Checkbox Agreement */}
        <div className="flex justify-start items-center gap-3 my-6">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
            className="size-4"
          />
          <p className="text-lg text-gray-500">
            I hereby certify that, to the best of my knowledge, the provided
            information is true and accurate.
          </p>
        </div>

        {/* Submit Button */}
        <button
          className={`text-xl font-dmsans ${
            isChecked ? "bg-[#004AAD]" : "bg-[#65a8ff]"
          } text-white px-5 py-3 rounded-md font-light`}
          onClick={handleSubmit}
          disabled={!isChecked}
        >
          Submit
        </button>
      </main>
    </section>
  );
};

export default EditProfile;
