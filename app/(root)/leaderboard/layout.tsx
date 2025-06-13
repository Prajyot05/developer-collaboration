"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const LeaderboardLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  return (
    <div className="ms-[10%] mt-6">
      <p className="text-5xl font-dmsans mb-6 ">Leaderboard</p>

      <div className="w-[95%] flex justify-between  border-r border-t border-l overflow-auto">
        <Link href="/leaderboard/s">
          <div
            className={`py-4 text-[#F6C852] ${
              pathname === "/leaderboard/s"
                ? "bg-[#fcecb63f] border-b-black border-b-2"
                : "bg-white"
            } text-xl font-dmsans border-[#DADCE0] px-12`}
          >
            S Rank
          </div>
        </Link>
        <Link href="/leaderboard/a+">
          <div
            className={`py-4 text-[#A50000] ${
              pathname === "/leaderboard/a+"
                ? "bg-[#FEE9E8] border-b-black border-b-2"
                : "bg-white"
            } text-xl font-dmsans border-[#DADCE0] px-12 `}
          >
            A+ Rank
          </div>
        </Link>
        <Link href="/leaderboard/a">
          <div
            className={`py-4 text-[#A50000] ${
              pathname === "/leaderboard/a"
                ? "bg-[#FEE9E8] border-b-black border-b-2"
                : "bg-white"
            } text-xl font-dmsans border-[#DADCE0] px-12 `}
          >
            A Rank
          </div>
        </Link>
        <Link href="/leaderboard/b+">
          <div
            className={`py-4 text-[#004AAD] ${
              pathname === "/leaderboard/b+"
                ? "bg-[#E8F0FE] border-b-black border-b-2"
                : "bg-white"
            } text-xl font-dmsans border-[#DADCE0] px-12 `}
          >
            B+ Rank
          </div>
        </Link>
        <Link href="/leaderboard/b">
          <div
            className={`py-4 text-[#004AAD] ${
              pathname === "/leaderboard/b"
                ? "bg-[#E8F0FE] border-b-black border-b-2"
                : "bg-white"
            } text-xl font-dmsans border-[#DADCE0] px-12 `}
          >
            B Rank
          </div>
        </Link>
        <Link href="/leaderboard/c">
          <div
            className={`py-4 text-[#B85BD7] ${
              pathname === "/leaderboard/c"
                ? "bg-[#F7E8FE] border-b-black border-b-2"
                : "bg-white"
            } text-xl font-dmsans border-[#DADCE0] px-12 `}
          >
            C Rank
          </div>
        </Link>
        <Link href="/leaderboard/d">
          <div
            className={`py-4 text-[#02B902] ${
              pathname === "/leaderboard/d"
                ? "bg-[#E8FEE9] border-b-black border-b-2"
                : "bg-white"
            } text-xl font-dmsans border-[#DADCE0] px-12 `}
          >
            D Rank
          </div>
        </Link>
        <Link href="/leaderboard/e">
          <div
            className={`py-4 text-[#848484] ${
              pathname === "/leaderboard/e"
                ? "bg-[#EAEAEA] border-b-black border-b-2"
                : "bg-white"
            } text-xl font-dmsans border-[#DADCE0] px-12 `}
          >
            E Rank
          </div>
        </Link>
      </div>
      <div className="overflow-x-auto">{children}</div>
    </div>
  );
};

export default LeaderboardLayout;
