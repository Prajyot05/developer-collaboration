"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: "500",
  variable: "--font-inter",
});

const Sidebar = () => {
  const pathname = usePathname();
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
            className={`flex flex-row mt-3 mx-6 pl-3 h-12 items-center gap-3 rounded-2xl  ${
              pathname === "/profile"
                ? "bg-black text-white"
                : "hover:bg-gray-100"
            }
           `}
          >
            <Image
              src="/profileIcon.png"
              alt="Profile Logo"
              width={30}
              height={30}
              className={pathname === "/profile" ? "invert" : ""}
            />
            <p
              className={`text-xl font-semibold text-black ${
                pathname === "/profile" ? "invert" : ""
              }`}
            >
              Profile
            </p>
          </div>
        </Link>
        <Link href="/projects" className="rounded-2xl">
          <div
            className={`flex flex-row mt-3 mx-6 pl-3 h-12 items-center gap-3 rounded-2xl ${
              pathname === "/projects"
                ? "bg-black text-white"
                : "hover:bg-gray-100"
            }
          `}
          >
            <Image
              src="/projectsIcon.png"
              alt="Projects Logo"
              width={30}
              height={30}
              className={pathname === "/projects" ? "invert" : ""}
            />
            <p
              className={`text-xl font-semibold text-black ${
                pathname === "/projects" ? "invert" : ""
              }
               `}
            >
              Projects
            </p>
          </div>
        </Link>
        <Link href="/qna" className="rounded-2">
          <div
            className={`flex flex-row mt-3 mx-6 pl-3 h-12 items-center gap-3 rounded-2xl ${
              pathname === "/qna" ? "bg-black text-white" : "hover:bg-gray-100"
            }
            `}
          >
            <Image
              src="/QnAIcon.png"
              alt="qna Logo"
              width={30}
              height={30}
              className={pathname === "/qna" ? "invert" : ""}
            />
            <p
              className={`text-xl font-semibold text-black ${
                pathname === "/qna" ? "invert" : ""
              }`}
            >
              QnA
            </p>
          </div>
        </Link>
        <Link href="settings/" className="rounded-2xl">
          <div
            className={`flex flex-row mt-3 mx-6 pl-3 h-12 items-center gap-3 rounded-2xl ${
              pathname === "/settings"
                ? "bg-black text-white"
                : "hover:bg-gray-100"
            }
            `}
          >
            <Image
              src="/settingsIcon.png"
              alt="Settings Logo"
              width={30}
              height={30}
              className={pathname === "/settings" ? "invert" : ""}
            />
            <p
              className={`text-xl font-semibold text-black ${
                pathname === "/settings" ? "invert" : ""
              }       
               `}
            >
              Settings
            </p>
          </div>
        </Link>
      </div>
    </main>
  );
};

export default Sidebar;
