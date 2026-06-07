"use client";
import useAuthStore from "@/app/store/useAuthStore";
import { User } from "@/app/types/user";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { X, Plus } from "lucide-react";

type EditProfileProps = {
  onProfileUpdate: (data: User) => void;
};

const EditProfile = ({ onProfileUpdate }: EditProfileProps) => {
  const { user, setUser } = useAuthStore();

  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [instituteName, setInstituteName] = useState(user?.collegeDetails?.name || "");
  const [location, setLocation] = useState(user?.location || "");
  const [github, setGithub] = useState(user?.github || "");
  const [linkedin, setLinkedin] = useState(user?.linkedin || "");
  const [skills, setSkills] = useState(user?.skills || []);
  const [newSkill, setNewSkill] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const toastId = toast.loading("Saving profile...");

    const updatedProfileData: User = {
      firstName,
      lastName,
      id: user?.id || "",
      name: `${firstName} ${lastName}`,
      email,
      collegeDetails: { name: instituteName },
      location,
      skills,
      github,
      linkedin,
    };

    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/user/${user?.id}`,
        updatedProfileData
      );

      // Update Zustand store
      setUser({
        ...user,
        ...updatedProfileData,
        id: user?.id || "",
      });

      toast.success("Profile updated successfully!", { id: toastId });
      onProfileUpdate(updatedProfileData);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile.", { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="flex flex-col lg:flex-row justify-start gap-8 mb-10">
      {/* Left Panel */}
      <aside className="w-full lg:w-[35%] h-fit bg-gradient-to-br from-purple-500/10 to-brand-500/10 dark:from-purple-500/5 dark:to-brand-500/5 border border-theme-primary px-6 py-6 rounded-2xl">
        <h2 className="font-bold text-xl mb-2 text-theme-primary">
          Edit Your Profile
        </h2>
        <p className="text-sm text-theme-secondary leading-relaxed mb-4">
          Manage and update your personal information. Your profile details are used
          in applications submitted to project creators.
        </p>
        <p className="text-xs text-theme-tertiary leading-relaxed mb-6">
          For selection purposes, certain data like your name, skills, and qualifications
          will be shared with project owners.
        </p>
        <div className="w-full flex justify-center">
          <Image
            src={user?.profilePic || user?.image || "/editProfileIcon.png"}
            alt="Profile"
            height={200}
            width={200}
            className="rounded-2xl ring-4 ring-theme-primary mb-4"
          />
        </div>
      </aside>

      {/* Form */}
      <main className="flex-1 space-y-6">
        {/* Full Name */}
        <div>
          <label className="text-sm font-semibold text-theme-primary mb-2 block">Full Name</label>
          <div className="flex gap-4">
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First name*"
              className="flex-1 px-4 py-3 text-sm bg-theme-card border border-theme-secondary rounded-xl text-theme-primary placeholder:text-theme-tertiary focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500 transition-all"
            />
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last name*"
              className="flex-1 px-4 py-3 text-sm bg-theme-card border border-theme-secondary rounded-xl text-theme-primary placeholder:text-theme-tertiary focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500 transition-all"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="text-sm font-semibold text-theme-primary mb-2 block">E-mail Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail Address"
            className="w-full px-4 py-3 text-sm bg-theme-card border border-theme-secondary rounded-xl text-theme-primary placeholder:text-theme-tertiary focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500 transition-all"
          />
        </div>

        {/* Institute */}
        <div>
          <label className="text-sm font-semibold text-theme-primary mb-2 block">Institute Name</label>
          <input
            type="text"
            value={instituteName}
            onChange={(e) => setInstituteName(e.target.value)}
            placeholder="Institute name"
            className="w-full px-4 py-3 text-sm bg-theme-card border border-theme-secondary rounded-xl text-theme-primary placeholder:text-theme-tertiary focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500 transition-all"
          />
        </div>

        {/* Location */}
        <div>
          <label className="text-sm font-semibold text-theme-primary mb-2 block">Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="City, Country"
            className="w-full px-4 py-3 text-sm bg-theme-card border border-theme-secondary rounded-xl text-theme-primary placeholder:text-theme-tertiary focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500 transition-all"
          />
        </div>

        {/* Skills */}
        <div>
          <label className="text-sm font-semibold text-theme-primary mb-2 block">Skills</label>
          <div className="flex gap-3 mb-3">
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
              placeholder="Enter a skill"
              className="flex-1 px-4 py-3 text-sm bg-theme-card border border-theme-secondary rounded-xl text-theme-primary placeholder:text-theme-tertiary focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500 transition-all"
            />
            <button
              type="button"
              onClick={addSkill}
              className="flex items-center gap-1 bg-theme-tertiary hover:bg-brand-500/20 text-theme-secondary hover:text-brand-500 px-4 py-2 rounded-xl transition-all duration-200"
            >
              <Plus size={16} />
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {skills.length > 0 ? (
              skills.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-1.5 bg-brand-500/10 text-brand-500 dark:text-brand-400 px-3 py-1.5 rounded-full text-sm border border-brand-500/20"
                >
                  <span>{item}</span>
                  <button
                    onClick={() => removeSkill(index)}
                    className="hover:text-red-500 transition-colors"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))
            ) : (
              <p className="text-sm text-theme-tertiary">No skills added yet</p>
            )}
          </div>
        </div>

        {/* Social Links */}
        <div>
          <label className="text-sm font-semibold text-theme-primary mb-2 block">Social Links</label>
          <div className="space-y-3">
            <input
              type="url"
              value={github}
              onChange={(e) => setGithub(e.target.value)}
              placeholder="GitHub URL"
              className="w-full px-4 py-3 text-sm bg-theme-card border border-theme-secondary rounded-xl text-theme-primary placeholder:text-theme-tertiary focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500 transition-all"
            />
            <input
              type="url"
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
              placeholder="LinkedIn URL"
              className="w-full px-4 py-3 text-sm bg-theme-card border border-theme-secondary rounded-xl text-theme-primary placeholder:text-theme-tertiary focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500 transition-all"
            />
          </div>
        </div>

        {/* Checkbox */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
            className="w-4 h-4 rounded accent-brand-500"
          />
          <p className="text-sm text-theme-secondary">
            I hereby certify that the provided information is true and accurate.
          </p>
        </div>

        {/* Submit */}
        <button
          className={`px-8 py-3 rounded-xl text-white font-medium transition-all duration-200 active:scale-[0.98] ${
            isChecked && !isSubmitting
              ? "bg-gradient-to-r from-brand-500 to-purple-600 hover:from-brand-600 hover:to-purple-700 shadow-md hover:shadow-lg"
              : "bg-gray-400 dark:bg-gray-600 cursor-not-allowed"
          }`}
          onClick={handleSubmit}
          disabled={!isChecked || isSubmitting}
        >
          {isSubmitting ? "Saving..." : "Save Profile"}
        </button>
      </main>
    </section>
  );
};

export default EditProfile;
