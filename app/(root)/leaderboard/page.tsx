"use client";
import React from "react";
import { motion } from "framer-motion";
import { Medal } from "lucide-react";

const data = [
  { rank: "#1", name: "Pranav Ramane", institute: "Pimpri Chinchwad College of Engineering & Research", points: 3000 },
  { rank: "#2", name: "Adarsh Thakare", institute: "Pimpri Chinchwad College of Engineering & Research", points: 3000 },
  { rank: "#3", name: "Prajyot Tayde", institute: "Pimpri Chinchwad College of Engineering & Research", points: 3000 },
  { rank: "#4", name: "Rohit Tare", institute: "Pimpri Chinchwad College of Engineering & Research", points: 3000 },
  { rank: "#5", name: "Mayur Tummewar", institute: "Pimpri Chinchwad College of Engineering & Research", points: 3000 },
];

const medalColors: Record<string, string> = {
  "#1": "text-amber-400",
  "#2": "text-gray-400",
  "#3": "text-amber-600",
};

const Page = () => {
  return (
    <div className="glass-card overflow-hidden">
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
          {data.map((user, index) => (
            <motion.tr
              key={index}
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
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Page;
