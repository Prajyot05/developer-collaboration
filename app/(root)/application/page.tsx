"use client";
import React from "react";
import TabsComponent2 from "../TabsComponent2";
import TableComponent from "../TableComponent";
import useAuthStore from "@/app/store/useAuthStore";
import { motion } from "framer-motion";
import { Briefcase, Sparkles } from "lucide-react";

const tabContents = [
  <TableComponent key="submitted" />,
  <TableComponent key="bookmarks" />,
  <TableComponent key="rejected" />,
];

const Page = () => {
  const { user } = useAuthStore();
  const tabTitles = ["Submitted", "Bookmarks", "Rejected"];

  return (
    <div className="px-6 md:px-12 lg:px-16 py-8 min-h-screen bg-theme-primary">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-theme-primary mb-6"
      >
        Hello, {user?.firstName || "Developer"}!
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card bg-gradient-to-r from-blue-500/5 to-indigo-500/5 dark:from-blue-500/10 dark:to-indigo-500/10 mt-2 mb-8 w-full lg:w-[90%] p-6 flex flex-col gap-4 md:flex-row items-center md:justify-between"
      >
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles size={18} className="text-blue-500" />
            <h2 className="text-lg font-semibold text-theme-primary">Application Status</h2>
          </div>
          <p className="text-sm text-theme-secondary leading-relaxed max-w-xl">
            Track and manage your project collaboration applications. View submissions,
            bookmarks, and stay informed about your progress.
          </p>
        </div>
        <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center flex-shrink-0">
          <Briefcase size={28} className="text-blue-500" />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-2xl font-bold text-theme-primary mb-4">Applications</h2>
        <TabsComponent2 tabTitles={tabTitles} tabContents={tabContents} />
      </motion.div>
    </div>
  );
};

export default Page;
