"use client";
import React, { useEffect, useState, useCallback } from "react";
import { Bell, Inbox } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

interface Notification {
  _id: string;
  type: string;
  title: string;
  message: string;
  link?: string;
  read: boolean;
  createdAt: string;
}

const Page = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = useCallback(async () => {
    if (!session) return;
    try {
      const response = await axios.get("/api/notifications");
      setNotifications(response.data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false);
    }
  }, [session]);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const handleNotificationClick = async (n: Notification) => {
    if (!n.read) {
      try {
        await axios.patch("/api/notifications", { notificationIds: [n._id] });
        setNotifications((prev) =>
          prev.map((notif) =>
            notif._id === n._id ? { ...notif, read: true } : notif
          )
        );
      } catch {
        console.error("Error marking read:");
      }
    }
    if (n.link) {
      router.push(n.link);
    } else {
      router.push(`/notification/${n._id}`);
    }
  };

  const markAllRead = async () => {
    try {
      await axios.patch("/api/notifications", {});
      setNotifications((prev) =>
        prev.map((notif) => ({ ...notif, read: true }))
      );
      toast.success("All notifications marked as read");
    } catch {
      toast.error("Failed to mark all as read");
    }
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  if (loading) {
    return (
      <div className="px-6 md:px-12 lg:px-16 py-8 min-h-screen bg-theme-primary">
        <div className="h-8 w-48 skeleton mb-6" />
        <div className="space-y-3 max-w-3xl">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 skeleton rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="px-6 md:px-12 lg:px-16 py-8 min-h-screen bg-theme-primary">
      <div className="flex items-center justify-between mb-6 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3"
        >
          <Bell size={28} className="text-brand-500" />
          <h1 className="text-3xl font-bold text-theme-primary">Notifications</h1>
          <span className="text-xs px-2 py-0.5 rounded-full bg-brand-500/10 text-brand-500 font-semibold ml-1">
            {unreadCount} new
          </span>
        </motion.div>

        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            className="text-sm font-medium text-brand-500 dark:text-brand-400 hover:text-brand-600 transition-colors"
          >
            Mark all read
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 rounded-2xl bg-theme-tertiary flex items-center justify-center mb-4">
            <Inbox size={28} className="text-theme-tertiary" />
          </div>
          <h3 className="text-lg font-semibold text-theme-primary mb-1">No notifications</h3>
          <p className="text-sm text-theme-secondary">You&apos;re all caught up!</p>
        </div>
      ) : (
        <div className="space-y-2 max-w-3xl">
          {notifications.map((n, i) => (
            <motion.div
              key={n._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i }}
              onClick={() => handleNotificationClick(n)}
              className={`glass-card p-4 cursor-pointer hover:border-brand-500/30 transition-all duration-200 ${
                !n.read ? "border-l-4 border-l-brand-500" : "opacity-70"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-brand-500/10 flex items-center justify-center">
                    <span className="text-xs font-bold text-brand-500">
                      {n.type === "system" ? "S" : "U"}
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-theme-primary">{n.title}</span>
                </div>
                <span className="text-xs text-theme-tertiary">
                  {new Date(n.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="text-sm text-theme-tertiary ml-10 line-clamp-2 mt-0.5">{n.message}</p>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Page;
