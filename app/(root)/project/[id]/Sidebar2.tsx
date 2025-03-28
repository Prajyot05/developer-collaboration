"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaUser } from "react-icons/fa";
type DetailProps = {
  id: string;
};

interface Project {
  owner: string;
  team: string[];
}
interface User {
  _id: string;
  name: string;
}

const Sidebar2 = ({ id }: DetailProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [formData, setFormData] = useState(""); // Form data
  const [isChecked, setIsChecked] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar state
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [currentUser, setCurrentUser] = useState<User>();
  const [teammates, setTeammates] = useState<User[]>([]);
  const items = ["User1", "User2", "User3"];
  const [project, setProject] = useState<Project>()
  const email = "email";
  const dta = ["Rohit" , "Aadrsh"]
  //get current user data
  const getUserData = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/user/${email}`);
      setCurrentUser(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }
  //get project data
  const getData = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/project/project_id/${id}`);
      console.log(response.data);
      setProject(response.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  }
  //get teammate names
  const getTeammates = async () => {
    project?.team.map(async (item) => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/user/${item}`);
        setTeammates(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    });

  }
  useEffect(() => {
    getUserData();
    getData();
    getTeammates();
  }, []);



  //send the request to join the project
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/linkage/join/${currentUser?._id}/${id}`, formData);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
    setIsModalOpen(false);
  };

  // Close sidebar on outside click (only for mobile screens)
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
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSidebarOpen]);

  return (
    <>
      {/* Toggle Sidebar Button for Small Screens */}
      <button
        className={`lg:hidden fixed top-24 z-4 left-7 text-xl bg-gray-500 ${!isSidebarOpen ? "block" : "hidden"
          } text-white px-4 py-2 rounded-md z-50`}
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {!isSidebarOpen ? "Open Sidebar" : "Close Sidebar"}
      </button>

      {/* Sidebar Wrapper */}
      <div
        className={`fixed z-10 inset-y-0 top-16 left-0 w-[10rem] lg:w-[22%] xl:w-[18rem] bg-white text-gray-800 px-4 py-6 border-r-2 transition-transform duration-300
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 lg:block`}
        ref={sidebarRef}
      >
        <div className="font-lato text-gray-500 font-medium text-lg">
          <Link
            href="/project"
            className="font-dmsans flex gap-4 items-center text-[14px] text-gray-500 font-medium text-lg"
          >
            <IoMdArrowDropdown
              className={`text-2xl transition-transform rotate-90`}
            />
            <div>Back</div>
          </Link>
        </div>
        <hr className="my-2 border-gray-300" />

        {/* Team-mates Dropdown */}
        <div
          className="w-full flex items-center justify-between py-2 bg-white"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <div>Team-mates</div>
          <IoMdArrowDropdown
            className={`text-2xl transition-transform ${isDropdownOpen ? "rotate-180" : "rotate-0"
              }`}
          />
        </div>
        {isDropdownOpen && (
          <ul className="w-full flex flex-col flex-wrap mt-1 bg-white p-2 max-h-40 overflow-auto">
            {dta?.length> 0 ? (
              dta.map((teammate, index) => (
                <li
                  key={index}
                  className="flex gap-4 text-base items-center p-1 hover:bg-gray-100"
                >
                  <FaUser />
                  <div>{teammate}</div>
                </li>
              ))
            ) : (
              <li className="text-gray-500 p-1">No results found</li>
            )}
          </ul>
        )}
        <hr className="my-2 border-gray-300" />

        {/* Open Modal Button */}
        <div
          className="text-lg flex gap-3 items-center text-[#014aad] cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        >
          <div>Apply</div>
          <IoMdArrowDropdown
            className={`text-2xl transition-transform rotate-[270deg]`}
          />
        </div>
        <hr className="my-2 border-gray-300" />
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[35rem]">
            <h2 className="text-3xl font-semibold mb-4">Application Form</h2>
            <hr className="py-2 border-gray-300" />
            <form onSubmit={handleSubmit}>
              {/* Input Field */}
              <div className="py-2 border rounded-md border-slate-400">
                <textarea
                  placeholder="Enter details..."
                  value={formData}
                  onChange={(e) => setFormData(e.target.value)}
                  className="w-full h-52 p-2 resize-none focus:outline-none"
                  rows={6}
                  required
                />
              </div>

              {/* Terms & Conditions Checkbox */}
              <div className="flex items-center gap-4 py-4">
                <input
                  type="checkbox"
                  id="terms"
                  required
                  checked={isChecked}
                  onChange={() => setIsChecked(!isChecked)}
                />
                <label htmlFor="terms" className="text-sm">
                  I have read all the data regarding the project and accept all
                  the terms & conditions.
                </label>
              </div>

              {/* Buttons */}
              <div className="flex justify-between space-x-4 py-4">
                <button
                  type="submit"
                  className={`px-8 py-2 rounded-xl transition-colors ${isChecked
                    ? "bg-[#004AAD] text-white"
                    : "bg-[#839DBF] text-gray-200 cursor-not-allowed"
                    }`}
                  disabled={!isChecked}
                >
                  Submit
                </button>
                <button
                  type="button"
                  className="px-8 py-2 rounded-xl border-[#839DBF] border-solid border-[1px]"
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
