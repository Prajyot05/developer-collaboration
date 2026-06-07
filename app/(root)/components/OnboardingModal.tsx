"use client";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { User } from "@/app/types/user";
import useAuthStore from "@/app/store/useAuthStore";
import { motion } from "framer-motion";
import { Compass, Sparkles } from "lucide-react";

interface OnboardingProps {
  onComplete: (user: User) => void;
}

const OnboardingModal = ({ onComplete }: OnboardingProps) => {
  const { user, setUser } = useAuthStore();
  const [firstName, setFirstName] = useState(user?.name?.split(" ")[0] || "");
  const [lastName, setLastName] = useState(user?.name?.split(" ").slice(1).join(" ") || "");
  const [instituteName, setInstituteName] = useState("");
  const [location, setLocation] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !lastName || !instituteName) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);
    const toastId = toast.loading("Setting up your profile...");

    const updatedProfileData = {
      firstName,
      lastName,
      name: `${firstName} ${lastName}`,
      collegeDetails: { name: instituteName },
      location,
    };

    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/user/${user?.id}`,
        updatedProfileData
      );

      const completeUser = {
        ...user,
        ...updatedProfileData,
        id: user?.id || "",
      } as User;

      setUser(completeUser);
      toast.success("Welcome to DevGuild!", { id: toastId });
      onComplete(completeUser);
    } catch (error) {
      console.error("Error setting up profile:", error);
      toast.error("Failed to complete setup. Please try again.", { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="glass-card w-full max-w-lg p-8 mx-4 border-2 border-brand-500/30"
      >
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center shadow-glow">
            <Compass size={32} className="text-white" />
          </div>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-theme-primary mb-2 flex items-center justify-center gap-2">
            Welcome to DevGuild <Sparkles size={20} className="text-amber-400" />
          </h2>
          <p className="text-sm text-theme-secondary">
            Let&apos;s complete your Guild Card before you explore the platform. 
            This information connects you with the right teams.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="text-xs font-semibold text-theme-secondary mb-1.5 block uppercase tracking-wider">First Name *</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full p-3 text-sm bg-theme-tertiary border border-theme-primary rounded-xl text-theme-primary focus:outline-none focus:ring-2 focus:ring-brand-500/40 transition-all"
                placeholder="John"
                required
              />
            </div>
            <div className="flex-1">
              <label className="text-xs font-semibold text-theme-secondary mb-1.5 block uppercase tracking-wider">Last Name *</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full p-3 text-sm bg-theme-tertiary border border-theme-primary rounded-xl text-theme-primary focus:outline-none focus:ring-2 focus:ring-brand-500/40 transition-all"
                placeholder="Doe"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-theme-secondary mb-1.5 block uppercase tracking-wider">Institute / College *</label>
            <input
              type="text"
              value={instituteName}
              onChange={(e) => setInstituteName(e.target.value)}
              className="w-full p-3 text-sm bg-theme-tertiary border border-theme-primary rounded-xl text-theme-primary focus:outline-none focus:ring-2 focus:ring-brand-500/40 transition-all"
              placeholder="Where do you study/work?"
              required
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-theme-secondary mb-1.5 block uppercase tracking-wider">Location (Optional)</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full p-3 text-sm bg-theme-tertiary border border-theme-primary rounded-xl text-theme-primary focus:outline-none focus:ring-2 focus:ring-brand-500/40 transition-all"
              placeholder="City, Country"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting || !firstName || !lastName || !instituteName}
            className={`w-full py-3.5 mt-4 rounded-xl text-sm font-bold text-white transition-all duration-200 shadow-md ${
              !isSubmitting && firstName && lastName && instituteName
                ? "bg-gradient-to-r from-brand-500 to-purple-600 hover:shadow-glow hover:scale-[1.02]"
                : "bg-gray-500 cursor-not-allowed opacity-50"
            }`}
          >
            {isSubmitting ? "Generating Card..." : "Complete Setup"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default OnboardingModal;
