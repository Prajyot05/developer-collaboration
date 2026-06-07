"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ArrowLeft, Clock } from "lucide-react";
import Link from "next/link";
import axios from "axios";

interface Notification {
  _id: string;
  type: string;
  title: string;
  message: string;
  createdAt: string;
}

const EmailDetailsPage = () => {
  const params = useParams();
  const [notification, setNotification] = useState<Notification | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchNotification = async () => {
      try {
        const response = await axios.get(`/api/notifications/${params.id}`);
        setNotification(response.data);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchNotification();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-theme-primary px-6 md:px-12 lg:px-16 py-8 max-w-4xl">
        <div className="h-4 w-32 skeleton mb-6" />
        <div className="glass-card p-6 md:p-8">
          <div className="h-8 w-64 skeleton mb-3" />
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-theme-primary">
            <div className="w-10 h-10 rounded-full skeleton" />
            <div>
              <div className="h-4 w-32 skeleton mb-1" />
              <div className="h-3 w-24 skeleton" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="h-4 w-full skeleton" />
            <div className="h-4 w-5/6 skeleton" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !notification) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-500 text-lg">Notification not found</p>
        <Link href="/notification" className="text-brand-500 hover:underline text-sm mt-2 inline-block">
          Back to notifications
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-theme-primary px-6 md:px-12 lg:px-16 py-8 max-w-4xl">
      <Link
        href="/notification"
        className="inline-flex items-center gap-2 text-sm text-theme-secondary hover:text-theme-primary transition-colors mb-6"
      >
        <ArrowLeft size={16} />
        Back to notifications
      </Link>

      <div className="glass-card p-6 md:p-8">
        <h1 className="text-2xl font-bold text-theme-primary mb-3">{notification.title}</h1>

        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-theme-primary">
          <div className="w-10 h-10 rounded-full bg-brand-500/10 flex items-center justify-center">
            <span className="text-sm font-bold text-brand-500">
              {notification.type === "system" ? "S" : "U"}
            </span>
          </div>
          <div>
            <p className="text-sm font-semibold text-theme-primary">
              {notification.type === "system" ? "System" : "User"}
            </p>
            <div className="flex items-center gap-1 text-xs text-theme-tertiary">
              <Clock size={12} />
              {new Date(notification.createdAt).toLocaleString()}
            </div>
          </div>
        </div>

        <p className="text-sm text-theme-secondary leading-relaxed whitespace-pre-wrap">{notification.message}</p>
      </div>
    </div>
  );
};

export default EmailDetailsPage;
