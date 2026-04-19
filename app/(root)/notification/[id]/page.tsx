"use client";

import { useParams } from "next/navigation";
import React from "react";
import { ArrowLeft, Clock } from "lucide-react";
import Link from "next/link";

const dummyEmails = [
  {
    id: "1",
    sender: "Radhika Gupta",
    subject: "New Post for You",
    body: "To every woman who sometimes wonders, can I do it, here is a thought — you've already been doing it. Every challenge you've faced, every setback you've overcome, every morning you showed up even when you didn't feel like it. That's not luck. That's strength. That's you doing it. So yes, you can. You already are.",
    date: "March 17, 2025",
  },
  {
    id: "2",
    sender: "Nikhil Kamath",
    subject: "Indian Market Insights",
    body: "Digressing from the post, but it's about time we need an Indian answer to the global tech ecosystem. The talent is here, the ambition is here, and the market is massive. What we need is the right infrastructure, the right policies, and most importantly, the right belief in ourselves.",
    date: "March 14, 2025",
  },
  {
    id: "3",
    sender: "Nikhil Kamath",
    subject: "Indian Market Trends",
    body: "Digressing from the post, but it's about time we need an Indian answer to the changing market dynamics. Innovation doesn't wait, and neither should we.",
    date: "March 12, 2025",
  },
];

const EmailDetailsPage = () => {
  const params = useParams();
  const email = dummyEmails.find((item) => item.id === params.id);

  if (!email) {
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
        <h1 className="text-2xl font-bold text-theme-primary mb-3">{email.subject}</h1>

        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-theme-primary">
          <div className="w-10 h-10 rounded-full bg-brand-500/10 flex items-center justify-center">
            <span className="text-sm font-bold text-brand-500">{email.sender.charAt(0)}</span>
          </div>
          <div>
            <p className="text-sm font-semibold text-theme-primary">{email.sender}</p>
            <div className="flex items-center gap-1 text-xs text-theme-tertiary">
              <Clock size={12} />
              {email.date}
            </div>
          </div>
        </div>

        <p className="text-sm text-theme-secondary leading-relaxed">{email.body}</p>
      </div>
    </div>
  );
};

export default EmailDetailsPage;
