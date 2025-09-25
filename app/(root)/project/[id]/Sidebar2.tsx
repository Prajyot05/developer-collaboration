"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

type DetailProps = {
  id: string;
};

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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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

    if (id) {
      getData();
    }
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
      if (
        isSidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setIsSidebarOpen(false);
      }
    };

    if (isSidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);

  return (
    <>
      <button
        className={`lg:hidden fixed top-24 z-40 left-4 text-xl bg-gray-800 text-white px-4 py-2 rounded-md transition-opacity duration-300 ${
          !isSidebarOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={() => setIsSidebarOpen(true)}
      >
        &gt;
      </button>

      <div
        className={`fixed z-50 inset-y-0 top-16 left-0 w-[18rem] bg-white text-gray-800 px-4 py-6 border-r-2 shadow-lg transition-transform duration-300
          ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0`}
        ref={sidebarRef}
      >
        <button
          className="lg:hidden absolute top-4 right-4 text-2xl"
          onClick={() => setIsSidebarOpen(false)}
        >
          &lt;
        </button>
        <div className="font-lato text-gray-500 font-medium text-lg">
          <Link
            href="/project"
            className="font-dmsans flex gap-4 items-center text-[14px] text-gray-500 font-medium text-lg hover:text-black"
          >
            <IoMdArrowDropdown className="text-2xl transition-transform rotate-90" />
            <div>Back</div>
          </Link>
        </div>
        <hr className="my-2 border-gray-300" />

        <div
          className="w-full flex items-center justify-between py-2 bg-white cursor-pointer"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <div>Team-mates</div>
          <IoMdArrowDropdown
            className={`text-xl transition-transform ${
              isDropdownOpen ? "rotate-180" : ""
            }`}
          />
        </div>
        {isDropdownOpen && (
          <ul className="w-full flex flex-col flex-wrap mt-1 bg-white p-2 max-h-40 overflow-auto border rounded">
            {project?.team && project.team.length > 0 ? (
              project.team.map((teammate) => (
                <li
                  key={teammate._id}
                  className="flex gap-4 text-base items-center p-1 hover:bg-gray-100 rounded"
                >
                  <FaUser />
                  <div>{`${teammate.firstName} ${teammate.lastName}`}</div>
                </li>
              ))
            ) : (
              <li className="text-gray-500 p-1">No teammates yet</li>
            )}
          </ul>
        )}
        <hr className="my-2 border-gray-300" />

        <div
          className="text-lg flex gap-3 items-center text-[#014aad] cursor-pointer hover:underline"
          onClick={() => setIsModalOpen(true)}
        >
          <div>Apply</div>
          <IoMdArrowDropdown className="text-2xl transition-transform rotate-[270deg]" />
        </div>
        <hr className="my-2 border-gray-300" />
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[35rem]">
            <h2 className="text-3xl font-semibold mb-4">Application Form</h2>
            <hr className="py-2 border-gray-300" />
            <form onSubmit={handleSubmit}>
              <div className="py-2 border rounded-md border-slate-400">
                <textarea
                  placeholder="Tell the project owner why you're a good fit..."
                  value={formData}
                  onChange={(e) => setFormData(e.target.value)}
                  className="w-full h-52 p-2 resize-none focus:outline-none"
                  rows={6}
                  required
                />
              </div>

              <div className="flex items-center gap-4 py-4">
                <input
                  type="checkbox"
                  id="terms"
                  className="size-5"
                  required
                  checked={isChecked}
                  onChange={() => setIsChecked(!isChecked)}
                />
                <label htmlFor="terms" className="text-sm">
                  I have read all the data regarding the project and accept all
                  the terms & conditions.
                </label>
              </div>

              <div className="flex justify-between space-x-4 py-4">
                <button
                  type="submit"
                  className={`px-8 py-2 rounded-xl text-white transition-all duration-300 transform active:scale-95 ${
                    isChecked && !isSubmitting
                      ? "bg-[#004AAD] hover:bg-[#003B8A]"
                      : "bg-[#839DBF] cursor-not-allowed"
                  }`}
                  disabled={!isChecked || isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
                <button
                  type="button"
                  className="px-8 py-2 rounded-xl border-[#839DBF] border-solid border-[1px] hover:bg-gray-100 transition-all duration-300 transform active:scale-95"
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
