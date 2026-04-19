"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { ChevronDown, ArrowLeft, Users, Send } from "lucide-react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

type DetailProps = { id: string };

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface Project {
  owner: string;
  team: User[];
}

const Sidebar2 = ({ id }: DetailProps) => {
  const { data: session } = useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [project, setProject] = useState<Project | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/project/project_id/${id}`
        );
        setProject(response.data);
      } catch (error) {
        console.error("Error fetching project:", error);
        toast.error("Failed to load project details.");
      }
    };
    if (id) getData();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user?.id) {
      toast.error("You must be logged in to apply.");
      return;
    }
    setIsSubmitting(true);
    const toastId = toast.loading("Submitting application...");
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/linkage/join/${session.user.id}/${id}`,
        { attachment: formData }
      );
      toast.success("Application submitted successfully!", { id: toastId });
      setIsModalOpen(false);
      setFormData("");
      setIsChecked(false);
    } catch (error) {
      toast.error("Failed to submit application.", { id: toastId });
      console.error("Error sending join request:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isSidebarOpen && sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setIsSidebarOpen(false);
      }
    };
    if (isSidebarOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSidebarOpen]);

  return (
    <>
      <button
        className={`lg:hidden fixed top-20 left-4 z-40 p-2 rounded-lg bg-theme-card border border-theme-primary text-theme-secondary shadow-md transition-opacity duration-300 ${
          !isSidebarOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={() => setIsSidebarOpen(true)}
      >
        <Users size={18} />
      </button>

      <div
        className={`fixed z-50 inset-y-0 top-16 left-0 w-[18rem] bg-theme-sidebar border-r border-theme-primary px-4 py-6 transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
        ref={sidebarRef}
      >
        <button
          className="lg:hidden absolute top-4 right-4 p-1 rounded-lg hover:bg-theme-tertiary text-theme-secondary"
          onClick={() => setIsSidebarOpen(false)}
        >
          ✕
        </button>

        <Link
          href="/project"
          className="flex items-center gap-2 text-sm text-theme-secondary hover:text-theme-primary transition-colors mb-4"
        >
          <ArrowLeft size={16} />
          <span>Back to Projects</span>
        </Link>

        <hr className="border-theme-primary mb-3" />

        {/* Teammates */}
        <button
          className="w-full flex items-center justify-between py-2 text-sm font-semibold text-theme-primary"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <span className="flex items-center gap-2">
            <Users size={16} className="text-theme-tertiary" />
            Team Members
          </span>
          <ChevronDown
            size={16}
            className={`text-theme-tertiary transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
          />
        </button>

        {isDropdownOpen && (
          <ul className="mt-1 space-y-1 max-h-40 overflow-auto">
            {project?.team && project.team.length > 0 ? (
              project.team.map((teammate) => (
                <li
                  key={teammate._id}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-theme-tertiary/50 transition-colors"
                >
                  <div className="w-7 h-7 rounded-full bg-brand-500/10 flex items-center justify-center">
                    <span className="text-xs font-bold text-brand-500">{teammate.firstName.charAt(0)}</span>
                  </div>
                  <span className="text-sm text-theme-primary">{teammate.firstName} {teammate.lastName}</span>
                </li>
              ))
            ) : (
              <li className="text-sm text-theme-tertiary p-2">No teammates yet</li>
            )}
          </ul>
        )}

        <hr className="border-theme-primary my-3" />

        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-brand-500 to-purple-600 text-white py-2.5 rounded-lg text-sm font-medium transition-all duration-200 hover:from-brand-600 hover:to-purple-700 active:scale-[0.98]"
        >
          <Send size={14} />
          Apply to Project
        </button>
      </div>

      {/* Application Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
          <div className="glass-card p-6 w-[90%] max-w-lg mx-4">
            <h2 className="text-xl font-bold text-theme-primary mb-1">Application Form</h2>
            <p className="text-sm text-theme-tertiary mb-4">Tell the project owner why you&apos;re a good fit</p>
            <hr className="border-theme-primary mb-4" />

            <form onSubmit={handleSubmit}>
              <textarea
                placeholder="Share your relevant skills, experience, and motivation..."
                value={formData}
                onChange={(e) => setFormData(e.target.value)}
                className="w-full h-44 p-3 text-sm bg-theme-tertiary border border-theme-primary rounded-xl text-theme-primary placeholder:text-theme-tertiary resize-none focus:outline-none focus:ring-2 focus:ring-brand-500/40 transition-all"
                required
              />

              <div className="flex items-center gap-3 my-4">
                <input
                  type="checkbox"
                  id="modal-terms"
                  className="w-4 h-4 accent-brand-500"
                  required
                  checked={isChecked}
                  onChange={() => setIsChecked(!isChecked)}
                />
                <label htmlFor="modal-terms" className="text-xs text-theme-secondary">
                  I have read all project details and accept the terms & conditions
                </label>
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={!isChecked || isSubmitting}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-medium text-white transition-all active:scale-[0.98] ${
                    isChecked && !isSubmitting
                      ? "bg-gradient-to-r from-brand-500 to-purple-600 hover:from-brand-600 hover:to-purple-700"
                      : "bg-gray-400 dark:bg-gray-600 cursor-not-allowed"
                  }`}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
                <button
                  type="button"
                  className="flex-1 py-2.5 rounded-xl text-sm font-medium border border-theme-secondary text-theme-secondary hover:bg-theme-tertiary transition-all active:scale-[0.98]"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar2;
