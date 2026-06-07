"use client";
import React from "react";
import TabsComponent2 from "../TabsComponent2";

import UserProject from "./UserProject";
import useAuthStore from "@/app/store/useAuthStore";
import { motion } from "framer-motion";
import { LayoutDashboard, Sparkles } from "lucide-react";

import AnnouncementsList from "./AnnouncementsList";

const tabContents = [
  <AnnouncementsList key="announcements-tab" />,
  <UserProject key="projects-tab" />,
];

const Page = () => {
  const { user } = useAuthStore();
  const tabTitles = ["Announcements", "Projects"];

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
        className="glass-card bg-gradient-to-r from-green-500/5 to-emerald-500/5 dark:from-green-500/10 dark:to-emerald-500/10 mt-2 mb-8 w-full lg:w-[90%] p-6 flex flex-col gap-4 md:flex-row items-center md:justify-between"
      >
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles size={18} className="text-green-500" />
            <h2 className="text-lg font-semibold text-theme-primary">Welcome to your Dashboard</h2>
          </div>
          <p className="text-sm text-theme-secondary leading-relaxed max-w-xl">
            Stay up-to-date with notifications and announcements for your projects.
            Get real-time updates, important alerts, and never miss key developments.
          </p>
        </div>
        <div className="w-16 h-16 rounded-2xl bg-green-500/10 flex items-center justify-center flex-shrink-0">
          <LayoutDashboard size={28} className="text-green-500" />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-2xl font-bold text-theme-primary mb-4">Dashboard</h2>
        <TabsComponent2 tabTitles={tabTitles} tabContents={tabContents} />
      </motion.div>
    </div>
  );
};

export default Page;
