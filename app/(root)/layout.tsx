"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      <div
        ref={sidebarRef}
        className={`fixed z-50 h-full w-[20%] text-gray-800 bg-white px-4 py-6 transition-transform duration-300 ease-in-out border-r-2 shadow-lg ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Image
          src="/devlogo.png"
          alt="DEVELOPERS' GUILD LOGO"
          width={200}
          height={200}
          className="pb-6"
        />
        <div className="px-3 py-2">
          <Link
            href="/project"
            className="font-dmsans text-[14px] text-gray-500 font-medium text-lg"
          >
            Home
          </Link>
        </div>
        <div className="px-3 py-2">
          <Link
            href="/profile"
            className="font-dmsans text-[14px] text-gray-500 font-medium text-lg"
          >
            Guild Card
          </Link>
        </div>
        <div className="px-3 py-2">
          <Link
            href="/dashboard"
            className="font-dmsans text-[14px] text-gray-500 font-medium text-lg"
          >
            Dashboard
          </Link>
        </div>
        <div className="px-3 py-2">
          <Link
            href="/application"
            className="font-dmsans text-[14px] text-gray-500 font-medium text-lg"
          >
            Application
          </Link>
        </div>
        <div className="px-3 py-2">
          <Link
            href="/help"
            className="font-dmsans text-[14px] text-gray-500 font-medium text-lg"
          >
            Help
          </Link>
        </div>
        <div className="px-3 py-2">
          <Link
            href="/feedback"
            className="font-dmsans text-[14px] text-gray-500 font-medium text-lg"
          >
            Feedback
          </Link>
        </div>
      </div>

      <div className="flex-1">
        <div className="h-16 bg-white shadow-md flex items-center justify-between">
          <div className="flex items-center justify-start gap-4">
            <button
              onClick={toggleSidebar}
              className="ms-4 px-2 pb-2 text-2xl text-gray-800 bg-white rounded-md"
            >
              ☰
            </button>
            <Image
              src="/devlogo.png"
              alt="DEVELOPERS' GUILD LOGO"
              width={200}
              height={200}
            />
            <div className="font-lato text-gray-500 font-medium text-lg">
              Projects
            </div>
            <div className="font-lato text-gray-500 font-medium text-lg">
              Leaderboard
            </div>
            <div className="font-lato text-gray-500 font-medium text-lg">
              QnA
            </div>
            <div className="font-lato text-gray-500 font-medium text-lg">
              Settings
            </div>
          </div>
          <div className="flex items-center gap-4 me-6">
            <div className="bg-gray-200 px-4 py-2 rounded-md">
              Your Score : 000
            </div>
            <div className="bg-red-700 text-white font-lato px-4 py-2 rounded-md">
              Login
            </div>
          </div>
        </div>

        <main>{children}</main>
      </div>
    </>
  );
}
