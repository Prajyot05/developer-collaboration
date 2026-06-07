"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Clock } from "lucide-react";
import Link from "next/link";

interface Notification {
  _id: string;
  type: string;
  title: string;
  message: string;
  link?: string;
  read: boolean;
  createdAt: string;
}

const AnnouncementsList = () => {
  const [announcements, setAnnouncements] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await axios.get("/api/notifications");
        // Filter for announcements (system or project updates)
        const filtered = response.data.filter(
          (n: Notification) => n.type === "system" || n.type === "project_update"
        );
        setAnnouncements(filtered);
      } catch (error) {
        console.error("Error fetching announcements:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  if (loading) {
    return (
      <div className="w-full space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-16 skeleton rounded-xl w-full" />
        ))}
      </div>
    );
  }

  if (announcements.length === 0) {
    return (
      <div className="py-8 text-center text-sm text-theme-secondary">
        No announcements at the moment.
      </div>
    );
  }

  return (
    <div className="w-full space-y-2">
      {announcements.map((item) => (
        <Link
          key={item._id}
          href={item.link || `/notification/${item._id}`}
          className="block glass-card p-4 hover:border-brand-500/30 transition-colors"
        >
          <div className="flex justify-between items-start mb-1">
            <span className="text-sm font-semibold text-theme-primary">{item.title}</span>
            <span className="flex items-center gap-1 text-xs text-theme-tertiary">
              <Clock size={12} />
              {new Date(item.createdAt).toLocaleDateString()}
            </span>
          </div>
          <p className="text-sm text-theme-secondary line-clamp-2">{item.message}</p>
        </Link>
      ))}
    </div>
  );
};

export default AnnouncementsList;
