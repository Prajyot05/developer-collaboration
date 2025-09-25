"use client";
import React, { useState, useEffect, useCallback } from "react";
import { IoShareSocialSharp } from "react-icons/io5";
import { FaRegBookmark } from "react-icons/fa";
import axios from "axios";
import { Project } from "@/app/types/projects";
import { useSession } from "next-auth/react";
import Link from "next/link";

type DetailProps = {
  id: string;
};

const Detail = ({ id }: DetailProps) => {
  const { data: session } = useSession();
  const [project, setProject] = useState<Project>();

  const getData = useCallback(async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/project/project_id/${id}`
      );
      setProject(response.data);
    } catch (error) {
      console.error("Error fetching project:", error);
    }
  }, [id]);

  useEffect(() => {
    getData();
  }, [getData]);

  if (!project) {
    return <div>Loading project details...</div>;
  }

  const isOwner = session?.user?.id === project.owner._id;

  return (
    <div className="lg:ms-[22%] xl:ms-[18rem] p-5 min-h-screen w-full bg-[#eaeaea]">
      <div
        key={project._id}
        className="w-full py-5 mb-5 rounded-lg shadow-md px-14 bg-white"
      >
        <div className="flex justify-between items-center">
          <div className="flex justify-center items-center">
            <div className="relative w-[81px] h-[83px] flex items-center justify-center">
              {/* Background Rectangle */}
              <svg
                width="81"
                height="83"
                viewBox="0 0 81 83"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="0.5"
                  y="0.5"
                  width="80"
                  height="82"
                  fill="#FEF9E8"
                  stroke="#F2AF04"
                />
              </svg>

              {/* "S" Character SVG Positioned in Center */}
              <svg
                width="25"
                height="37"
                viewBox="0 0 25 37"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute"
              >
                <path
                  d="M12.9 36.6C10.3333 36.6 8.1 36.1333 6.2 35.2C4.3 34.2667 2.83333 32.9667 1.8 31.3C0.766667 29.6333 0.25 27.7 0.25 25.5H4.65C4.65 26.8667 4.96667 28.1333 5.6 29.3C6.23333 30.4333 7.15 31.35 8.35 32.05C9.58333 32.7167 11.1 33.05 12.9 33.05C14.4667 33.05 15.8 32.8 16.9 32.3C18.0333 31.7667 18.8833 31.05 19.45 30.15C20.05 29.25 20.35 28.2333 20.35 27.1C20.35 25.7333 20.05 24.6333 19.45 23.8C18.8833 22.9333 18.1 22.2333 17.1 21.7C16.1 21.1667 14.9333 20.7 13.6 20.3C12.3 19.8667 10.9333 19.4167 9.5 18.95C6.73333 18.0167 4.7 16.85 3.4 15.45C2.1 14.05 1.45 12.2333 1.45 10C1.45 8.1 1.88333 6.43333 2.75 5C3.65 3.56667 4.91667 2.45 6.55 1.65C8.21667 0.816666 10.1833 0.399999 12.45 0.399999C14.6833 0.399999 16.6167 0.816666 18.25 1.65C19.9167 2.48333 21.2167 3.63333 22.15 5.1C23.0833 6.53333 23.55 8.2 23.55 10.1H19.15C19.15 9.13333 18.9 8.18333 18.4 7.25C17.9 6.31666 17.1333 5.55 16.1 4.95C15.1 4.31666 13.8333 4 12.3 4C11.0333 3.96666 9.9 4.18333 8.9 4.65C7.93333 5.08333 7.16667 5.71667 6.6 6.55C6.06667 7.38333 5.8 8.4 5.8 9.6C5.8 10.7333 6.03333 11.65 6.5 12.35C7 13.05 7.7 13.65 8.6 14.15C9.53333 14.6167 10.6167 15.05 11.85 15.45C13.0833 15.85 14.45 16.3 15.95 16.8C17.65 17.3667 19.15 18.0667 20.45 18.9C21.7833 19.7 22.8167 20.7333 23.55 22C24.3167 23.2667 24.7 24.8833 24.7 26.85C24.7 28.5167 24.25 30.1 23.35 31.6C22.4833 33.0667 21.1833 34.2667 19.45 35.2C17.7167 36.1333 15.5333 36.6 12.9 36.6Z"
                  fill="#F2AF04"
                />
              </svg>
            </div>

            <div className="py-4 px-8">
              <div className="text-3xl">{project.title}</div>
              <div className="flex text-sm py-2 gap-5">
                <div>
                  Domains:
                  <span className="text-[#c0c0c0]">{project.domains.join(", ")}</span>
                </div>
                <div className="text-[#c0c0c0]">{project.location}</div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-5">
            {isOwner && (
              <Link
                href={`/project/${id}/requests`}
                className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md transition-colors duration-300"
              >
                View Requests
              </Link>
            )}
            <IoShareSocialSharp className="text-2xl cursor-pointer" />
            <FaRegBookmark className="text-2xl cursor-pointer" />
          </div>
        </div>
        <hr className="my-2 border-gray-300" />
        <div className="py-2">
          <div className="font-semibold">Description:</div>
          <p className="text-[#7b7a7a] overflow-clip px-4">
            {project.description}
          </p>
        </div>
        <div className="py-2">
          <div className="font-semibold">Minimum Requirements:</div>
          <p className="text-[#7b7a7a] overflow-clip px-4">
            {project.requirements}
          </p>
        </div>
        <div className="py-2">
          <div className="font-semibold">Possible Responsibilities:</div>
          <p className="text-[#7b7a7a] overflow-clip px-4">
            {project.responsibilities}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Detail;
