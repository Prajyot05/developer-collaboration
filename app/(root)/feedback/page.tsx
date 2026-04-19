"use client";
import React, { useState } from "react";
import useAuthStore from "@/app/store/useAuthStore";
import { motion } from "framer-motion";
import { MessageSquare, Send, Sparkles } from "lucide-react";
import { toast } from "sonner";

const Page = () => {
  const { user } = useAuthStore();
  const [feedback, setFeedback] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Feedback submitted! Thank you for your input.");
    setFeedback("");
    setIsChecked(false);
  };

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
        className="glass-card bg-gradient-to-r from-red-500/5 to-pink-500/5 dark:from-red-500/10 dark:to-pink-500/10 mt-2 mb-8 w-full lg:w-[90%] p-6 flex flex-col gap-4 md:flex-row items-center md:justify-between"
      >
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles size={18} className="text-red-500" />
            <h2 className="text-lg font-semibold text-theme-primary">Share Your Feedback</h2>
          </div>
          <p className="text-sm text-theme-secondary leading-relaxed max-w-xl">
            Your feedback helps us improve! Share your thoughts, suggestions, or ideas
            to make DevGuild better for everyone.
          </p>
        </div>
        <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center flex-shrink-0">
          <MessageSquare size={28} className="text-red-500" />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-2xl font-bold text-theme-primary mb-4">Submit Your Feedback</h2>

        <form onSubmit={handleSubmit} className="max-w-2xl space-y-4">
          <div className="glass-card p-1">
            <textarea
              placeholder="Describe your feedback here..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full h-48 p-4 resize-none text-sm bg-transparent text-theme-primary placeholder:text-theme-tertiary focus:outline-none"
              rows={6}
              required
            />
          </div>

          <p className="text-xs font-semibold text-theme-tertiary">
            **Note: Please don&apos;t include any sensitive information
          </p>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="email-consent"
              checked={isChecked}
              onChange={() => setIsChecked(!isChecked)}
              className="w-4 h-4 accent-brand-500"
              required
            />
            <label htmlFor="email-consent" className="text-sm font-medium text-theme-secondary">
              We may email you for more information or updates
            </label>
          </div>

          <button
            type="submit"
            className={`flex items-center gap-2 px-6 py-3 rounded-xl text-white font-medium transition-all duration-200 active:scale-[0.98] ${
              isChecked
                ? "bg-gradient-to-r from-brand-500 to-purple-600 hover:from-brand-600 hover:to-purple-700 shadow-md hover:shadow-lg"
                : "bg-gray-400 dark:bg-gray-600 cursor-not-allowed"
            }`}
            disabled={!isChecked}
          >
            <Send size={16} />
            Submit Feedback
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Page;
