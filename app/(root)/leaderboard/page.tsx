"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Medal, Trophy } from "lucide-react";
import axios from "axios";

interface LeaderboardUser {
  _id: string;
  rank: string;
  name: string;
  institute: string;
  points: number;
  profilePic?: string;
}

const medalColors: Record<string, string> = {
  "#1": "text-amber-400",
  "#2": "text-gray-400",
  "#3": "text-amber-600",
};

const Page = () => {
  const [data, setData] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get("/api/leaderboard");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching leaderboard", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);

  if (loading) {
    return (
      <div className="px-6 md:px-12 lg:px-16 py-8 min-h-screen bg-theme-primary">
        <div className="glass-card overflow-hidden">
          <table className="w-full">
            <tbody>
              {[1, 2, 3, 4, 5].map((i) => (
                <tr key={i} className="border-b border-theme-primary">
                  <td className="px-4 py-4"><div className="h-6 w-8 skeleton rounded" /></td>
                  <td className="px-4 py-4"><div className="h-6 w-32 skeleton rounded" /></td>
                  <td className="px-4 py-4"><div className="h-6 w-48 skeleton rounded" /></td>
                  <td className="px-4 py-4"><div className="h-6 w-16 skeleton rounded" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

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
      
      <div className="glass-card overflow-hidden max-w-4xl">
        <table className="w-full">
          <thead>
            <tr className="bg-theme-tertiary/50">
              <th className="border-b border-theme-primary text-theme-tertiary px-4 py-3 text-left text-sm font-semibold w-20">Rank</th>
              <th className="border-b border-theme-primary text-theme-tertiary px-4 py-3 text-left text-sm font-semibold">User Name</th>
              <th className="border-b border-theme-primary text-theme-tertiary px-4 py-3 text-left text-sm font-semibold hidden md:table-cell">Institute</th>
              <th className="border-b border-theme-primary text-theme-tertiary px-4 py-3 text-left text-sm font-semibold w-28">Points</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-sm text-theme-secondary">
                  No data available for this rank yet.
                </td>
              </tr>
            ) : (
              data.map((user, index) => (
                <motion.tr
                  key={user._id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-theme-tertiary/30 transition-colors border-b border-theme-primary last:border-b-0"
                >
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2">
                      {medalColors[user.rank] && (
                        <Medal size={16} className={medalColors[user.rank]} />
                      )}
                      <span className="text-sm font-semibold text-theme-primary">{user.rank}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-sm font-medium text-theme-primary">{user.name}</td>
                  <td className="px-4 py-3.5 text-sm text-theme-secondary hidden md:table-cell">{user.institute}</td>
                  <td className="px-4 py-3.5">
                    <span className="text-sm font-bold text-brand-500 dark:text-brand-400">{user.points.toLocaleString()}</span>
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
