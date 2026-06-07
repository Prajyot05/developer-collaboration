"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Trophy } from "lucide-react";
import { motion } from "framer-motion";

const ranks = [
  { href: "/leaderboard/s", label: "S", color: "text-amber-500", activeBg: "bg-amber-500/10 dark:bg-amber-500/15", activeBorder: "border-amber-500" },
  { href: "/leaderboard/a+", label: "A+", color: "text-red-500", activeBg: "bg-red-500/10 dark:bg-red-500/15", activeBorder: "border-red-500" },
  { href: "/leaderboard/a", label: "A", color: "text-red-400", activeBg: "bg-red-400/10 dark:bg-red-400/15", activeBorder: "border-red-400" },
  { href: "/leaderboard/b+", label: "B+", color: "text-blue-500", activeBg: "bg-blue-500/10 dark:bg-blue-500/15", activeBorder: "border-blue-500" },
  { href: "/leaderboard/b", label: "B", color: "text-blue-400", activeBg: "bg-blue-400/10 dark:bg-blue-400/15", activeBorder: "border-blue-400" },
  { href: "/leaderboard/c", label: "C", color: "text-purple-500", activeBg: "bg-purple-500/10 dark:bg-purple-500/15", activeBorder: "border-purple-500" },
  { href: "/leaderboard/d", label: "D", color: "text-green-500", activeBg: "bg-green-500/10 dark:bg-green-500/15", activeBorder: "border-green-500" },
  { href: "/leaderboard/e", label: "E", color: "text-gray-500", activeBg: "bg-gray-500/10 dark:bg-gray-500/15", activeBorder: "border-gray-500" },
];

const LeaderboardLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  return (
    <div className="px-6 md:px-12 lg:px-16 py-8 min-h-screen bg-theme-primary">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3 mb-6"
      >
        <Trophy size={28} className="text-amber-500" />
        <h1 className="text-3xl font-bold text-theme-primary">Leaderboard</h1>
      </motion.div>

      {/* Rank tabs */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-wrap gap-2 mb-6 p-1 bg-theme-secondary rounded-xl border border-theme-primary"
      >
        {ranks.map((rank) => {
          const active = pathname === rank.href;
          return (
            <Link key={rank.href} href={rank.href}>
              <div
                className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-all duration-200 ${rank.color} ${
                  active
                    ? `${rank.activeBg} ${rank.activeBorder} border-b-2 shadow-sm`
                    : "border-b-2 border-transparent hover:bg-theme-tertiary"
                }`}
              >
                {rank.label}
              </div>
            </Link>
          );
        })}
      </motion.div>

      <div className="overflow-x-auto">{children}</div>
    </div>
  );
};

export default LeaderboardLayout;
