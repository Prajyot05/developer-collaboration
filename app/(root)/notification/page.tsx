"use client";
import React from "react";
import { Bell, Inbox } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const dummyNotifications = [
  {
    id: "1",
    sender: "Radhika Gupta",
    subject: "New Post for You",
    body: "To every woman who sometimes wonders, can I do it, here is a thought...",
    date: "March 17, 2025",
    read: false,
  },
  {
    id: "2",
    sender: "Nikhil Kamath",
    subject: "Indian Market Insights",
    body: "Digressing from the post, but it's about time we need an Indian answer to...",
    date: "March 14, 2025",
    read: false,
  },
  {
    id: "3",
    sender: "Nikhil Kamath",
    subject: "Indian Market Trends",
    body: "Digressing from the post, but it's about time we need an Indian answer to...",
    date: "March 12, 2025",
    read: true,
  },
];

const Page = () => {
  const router = useRouter();

  return (
    <div className="px-6 md:px-12 lg:px-16 py-8 min-h-screen bg-theme-primary">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3 mb-6"
      >
        <Bell size={28} className="text-brand-500" />
        <h1 className="text-3xl font-bold text-theme-primary">Notifications</h1>
        <span className="text-xs px-2 py-0.5 rounded-full bg-brand-500/10 text-brand-500 font-semibold ml-1">
          {dummyNotifications.filter((n) => !n.read).length} new
        </span>
      </motion.div>

      {dummyNotifications.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 rounded-2xl bg-theme-tertiary flex items-center justify-center mb-4">
            <Inbox size={28} className="text-theme-tertiary" />
          </div>
          <h3 className="text-lg font-semibold text-theme-primary mb-1">No notifications</h3>
          <p className="text-sm text-theme-secondary">You&apos;re all caught up!</p>
        </div>
      ) : (
        <div className="space-y-2 max-w-3xl">
          {dummyNotifications.map((n, i) => (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i }}
              onClick={() => router.push(`/notification/${n.id}`)}
              className={`glass-card p-4 cursor-pointer hover:border-brand-500/30 transition-all duration-200 ${
                !n.read ? "border-l-4 border-l-brand-500" : "opacity-70"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-brand-500/10 flex items-center justify-center">
                    <span className="text-xs font-bold text-brand-500">{n.sender.charAt(0)}</span>
                  </div>
                  <span className="text-sm font-semibold text-theme-primary">{n.sender}</span>
                </div>
                <span className="text-xs text-theme-tertiary">{n.date}</span>
              </div>
              <p className="text-sm font-medium text-theme-primary ml-10">{n.subject}</p>
              <p className="text-xs text-theme-tertiary ml-10 line-clamp-1 mt-0.5">{n.body}</p>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Page;
