"use client";
import React from "react";
import Badge from "./Badge";
import Signature from "./Signature";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { User } from "@/app/types/user";
import { MapPin, Building, Code2, Trophy } from "lucide-react";

const ProfileCard = ({ profileData }: { profileData: User }) => {
  return (
    <div className="w-full glass-card overflow-hidden gradient-border">
      <div className="md:flex md:flex-1">
        {/* Left: Badge + Signature */}
        <div className="w-full md:w-1/3 md:border-r border-theme-primary flex flex-col items-center py-6">
          <Badge title="S" color="yellow" />
          <Signature />
        </div>

        {/* Right: Info */}
        <section className="w-full md:w-2/3 px-6 py-6">
          <h2 className="text-2xl font-bold text-theme-primary mb-4">
            {profileData.name || `${profileData.firstName} ${profileData.lastName}`}
          </h2>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Trophy size={16} className="text-amber-500 flex-shrink-0" />
              <div>
                <span className="text-sm font-semibold text-theme-secondary">Projects Completed: </span>
                <span className="text-sm text-theme-primary font-bold">
                  {profileData.projectsCompleted ?? 0}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <MapPin size={16} className="text-brand-500 flex-shrink-0" />
              <div>
                <span className="text-sm font-semibold text-theme-secondary">Location: </span>
                <span className="text-sm text-theme-primary">{profileData.location || "Not set"}</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Building size={16} className="text-purple-500 flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-sm font-semibold text-theme-secondary">Institute: </span>
                <span className="text-sm text-theme-primary">
                  {profileData.collegeDetails?.name || "Not set"}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Code2 size={16} className="text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-sm font-semibold text-theme-secondary">Skills: </span>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {profileData.skills && profileData.skills.length > 0 ? (
                    profileData.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="text-xs px-2 py-0.5 rounded-full bg-brand-500/10 text-brand-500 dark:text-brand-400 border border-brand-500/20"
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-theme-tertiary">No skills added</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3 mt-5 pt-4 border-t border-theme-primary">
            <span className="text-sm font-semibold text-theme-secondary">Socials:</span>
            {profileData.github && (
              <a
                href={profileData.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:bg-theme-tertiary text-theme-secondary hover:text-theme-primary transition-colors"
              >
                <FaGithub size={20} />
              </a>
            )}
            {profileData.linkedin && (
              <a
                href={profileData.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:bg-theme-tertiary text-blue-500 hover:text-blue-400 transition-colors"
              >
                <FaLinkedin size={20} />
              </a>
            )}
            {!profileData.github && !profileData.linkedin && (
              <span className="text-sm text-theme-tertiary">No links added</span>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProfileCard;
