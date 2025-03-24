"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();

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
          width={220}
          height={220}
          className="pb-6 ps-5"
        />

        <Link
          href="/home"
          className={`font-lato text-[14px] text-lg ${
            pathname === "/home"
              ? `font-bold text-black`
              : "text-[#989898] font-medium"
          }`}
          onClick={() => {
            setIsOpen(false);
          }}
        >
          <div
            className={`px-3 py-2 ${
              pathname === "/home" ? "bg-[#E9E9E9]" : "hover:bg-gray-100"
            }`}
          >
            Home
          </div>
        </Link>

        <Link
          href="/profile"
          className={`font-lato text-[14px]  text-lg ${
            pathname === "/profile"
              ? `font-bold text-black`
              : "text-[#989898] font-medium"
          }`}
          onClick={() => {
            setIsOpen(false);
          }}
        >
          <div
            className={`px-3 py-2 ${
              pathname === "/profile" ? "bg-[#E9E9E9]" : "hover:bg-gray-100"
            }`}
          >
            Guild Card
          </div>
        </Link>
        <Link
          href="/dashboard"
          className={`font-lato text-[14px]  text-lg ${
            pathname === "/dashboard"
              ? `font-bold text-black`
              : "text-[#989898] font-medium"
          }`}
          onClick={() => {
            setIsOpen(false);
          }}
        >
          <div
            className={`px-3 py-2 ${
              pathname === "/dashboard" ? "bg-[#E9E9E9]" : "hover:bg-gray-100"
            }`}
          >
            Dashboard
          </div>
        </Link>
        <Link
          href="/application"
          className={`font-lato text-[14px] text-lg ${
            pathname === "/application"
              ? `font-bold text-black`
              : "text-[#989898] font-medium "
          }`}
          onClick={() => {
            setIsOpen(false);
          }}
        >
          <div
            className={`px-3 py-2 ${
              pathname === "/application" ? "bg-[#E9E9E9]" : "hover:bg-gray-100"
            }`}
          >
            Application
          </div>
        </Link>
        <Link
          href="/help"
          className={`font-lato text-[14px]  text-lg ${
            pathname === "/help"
              ? `font-bold text-black`
              : " font-medium text-[#989898]"
          }`}
          onClick={() => {
            setIsOpen(false);
          }}
        >
          <div
            className={`px-3 py-2 ${
              pathname === "/help" ? "bg-[#E9E9E9]" : "hover:bg-gray-100"
            }`}
          >
            Help
          </div>
        </Link>
        <Link
          href="/feedback"
          className={`font-lato text-[14px]  text-lg ${
            pathname === "/feedback"
              ? `font-bold text-black`
              : "text-[#989898] font-medium"
          }`}
          onClick={() => {
            setIsOpen(false);
          }}
        >
          <div
            className={`px-3 py-2 ${
              pathname === "/feedback" ? "bg-[#E9E9E9]" : "hover:bg-gray-100"
            }`}
          >
            Feedback
          </div>
        </Link>
      </div>

      <div className="flex-1">
        <div className="h-16 z-20 fixed w-full bg-white shadow-md flex items-center justify-between">
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
              <Link
                href="/project"
                className={`font-dmsans font-medium text-lg
                  ${
                    pathname === "/project"
                      ? "text-black border-b-2 border-black"
                      : "text-[#989898]s"
                  }`}
              >
                Projects
              </Link>
            </div>
            <div className="font-lato text-gray-500 font-medium text-lg">
              <Link
                href="/leaderboard"
                className={`font-dmsans font-medium text-lg
                  ${
                    pathname === "/leaderboard"
                      ? "text-black border-b-2 border-black"
                      : "text-[#989898]s"
                  }`}
              >
                Leaderboard
              </Link>
            </div>
            <div className="font-lato text-gray-500 font-medium text-lg">
              <Link
                href="/qna"
                className={`font-dmsans font-medium text-lg
                  ${
                    pathname === "/qna"
                      ? "text-black border-b-2 border-black"
                      : "text-[#989898]s"
                  }`}
              >
                QnA
              </Link>
            </div>
            <div className="font-lato text-gray-500 font-medium text-lg">
              <Link
                href="/settings"
                className={`font-dmsans font-medium text-lg
                  ${
                    pathname === "/settings"
                      ? "text-black border-b-2 border-black"
                      : "text-[#989898]s"
                  }`}
              >
                Settings
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-4 me-6">
            <div className="bg-[#EAEAEA] px-4 py-2 rounded-md">
              Your Score : 000
            </div>
            <div className="bg-[#A50000] text-white font-lato px-4 py-2 rounded-md">
              Login
            </div>
          </div>
        </div>

        <main className=" pt-20 pe-4">{children}</main>
      </div>
    </>
  );
}
