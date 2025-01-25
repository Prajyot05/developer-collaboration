"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: "500",
  variable: "--font-inter",
});

const Sidebar = () => {
  const [activeLink, setActiveLink] = useState("");

  return (
    <main
      className={`w-1/5 pt-8 bg-white min-h-screen position fixed ${inter.className}`}
    >
      <div className="flex flex-col">
        <Image
          src="https://placehold.co/600x350"
          alt="logo"
          width={400}
          height={300}
          className="px-6 pb-2"
        />
        <Link href="/profile" className="rounded-2xl">
          <div
            className={`flex flex-row mt-3 mx-6 pl-3 h-12 items-center gap-3 rounded-2xl
            ${activeLink === "/profile" ? "bg-black" : "hover:bg-gray-100"}`}
            onClick={() => setActiveLink("/profile")}
          >
            <Image
              src="/profileIcon.png"
              alt="Profile Logo"
              width={30}
              height={30}
              className={`${activeLink === "/profile" ? "invert" : ""}`}
            />
            <p
              className={`text-xl font-semibold text-black ${
                activeLink === "/profile" ? "invert" : ""
              } `}
            >
              Profile
            </p>
          </div>
        </Link>
        <Link href="/projects" className="rounded-2xl">
          <div
            className={`flex flex-row mt-3 mx-6 pl-3 h-12 items-center gap-3 rounded-2xl
            ${activeLink === "/projects" ? "bg-black" : "hover:bg-gray-100"}`}
            onClick={() => setActiveLink("/projects")}
          >
            <Image
              src="/projectsIcon.png"
              alt="Projects Logo"
              width={30}
              height={30}
              className={`${activeLink === "/projects" ? "invert" : ""}`}
            />
            <p
              className={`text-xl font-semibold text-black ${
                activeLink === "/projects" ? "invert" : ""
              }`}
            >
              Projects
            </p>
          </div>
        </Link>
        <Link href="/qna" className="rounded-2">
          <div
            className={`flex flex-row mt-3 mx-6 pl-3 h-12 items-center gap-3 rounded-2xl
            ${activeLink === "/qna" ? "bg-black" : "hover:bg-gray-100"}`}
            onClick={() => setActiveLink("/qna")}
          >
            <Image
              src="/QnAIcon.png"
              alt="qna Logo"
              width={30}
              height={30}
              className={`${activeLink === "/qna" ? "invert" : ""}`}
            />
            <p
              className={`text-xl font-semibold text-black ${
                activeLink === "/qna" ? "invert" : ""
              }`}
            >
              QnA
            </p>
          </div>
        </Link>
        <Link href="settings/" className="rounded-2xl">
          <div
            className={`flex flex-row mt-3 mx-6 pl-3 h-12 items-center gap-3 rounded-2xl
            ${activeLink === "/settings" ? "bg-black" : "hover:bg-gray-100"}`}
            onClick={() => setActiveLink("/settings")}
          >
            <Image
              src="/settingsIcon.png"
              alt="Settings Logo"
              width={30}
              height={30}
              className={`${activeLink === "/settings" ? "invert" : ""}`}
            />
            <p
              className={`text-xl font-semibold text-black ${
                activeLink === "/settings" ? "invert" : ""
              }`}
            >
              Settings
            </p>
          </div>
        </Link>
      </div>
      <Image
        src="/manLogo.png"
        alt="logo"
        width={160}
        height={160}
        className="ml-6 pt-6"
      />
    </main>
  );
};

export default Sidebar;
