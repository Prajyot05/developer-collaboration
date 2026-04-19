"use client";
import { Search, HelpCircle, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import useAuthStore from "@/app/store/useAuthStore";

const questions = [
  { id: 1, question: "How to contribute to open source projects?", answer: "You can start by finding beginner-friendly issues on GitHub repositories and making small contributions." },
  { id: 2, question: "What is the best way to learn React?", answer: "The best way is to go through the official documentation, build projects, and follow interactive tutorials." },
  { id: 3, question: "How can I improve my DSA skills?", answer: "Practice problems on platforms like LeetCode, CodeChef, and GeeksforGeeks regularly." },
  { id: 4, question: "What are the best resources for learning Next.js?", answer: "You can explore the official Next.js documentation, freeCodeCamp tutorials, and YouTube playlists." },
  { id: 5, question: "How do I stay consistent with coding?", answer: "Setting a schedule, joining coding communities, and working on projects can help build consistency." },
  { id: 6, question: "What are some good projects for beginners?", answer: "Todo apps, weather apps, and portfolio websites are great starting projects for beginners." },
];

const Page = () => {
  const { user } = useAuthStore();
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

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
        className="glass-card bg-gradient-to-r from-amber-500/5 to-yellow-500/5 dark:from-amber-500/10 dark:to-yellow-500/10 mt-2 mb-8 w-full lg:w-[90%] p-6 flex flex-col gap-4 md:flex-row items-center md:justify-between"
      >
        <div className="flex-1">
          <h2 className="text-lg font-semibold text-theme-primary mb-1">Need Help?</h2>
          <p className="text-sm text-theme-secondary leading-relaxed max-w-xl">
            Submit your questions or issues and our team will help you resolve them.
            Check the FAQs below for common questions.
          </p>
        </div>
        <div className="w-16 h-16 rounded-2xl bg-amber-500/10 flex items-center justify-center flex-shrink-0">
          <HelpCircle size={28} className="text-amber-500" />
        </div>
      </motion.div>

      {/* Search */}
      <h2 className="text-2xl font-bold text-theme-primary mb-3">Help</h2>
      <div className="flex flex-col sm:flex-row gap-3 mb-8 max-w-2xl">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-theme-tertiary" size={16} />
          <input
            type="text"
            placeholder="Describe your issue..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-theme-card border border-theme-secondary rounded-xl text-sm text-theme-primary placeholder:text-theme-tertiary focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500 transition-all"
          />
        </div>
        <button className="bg-gradient-to-r from-brand-500 to-purple-600 text-white px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200 hover:from-brand-600 hover:to-purple-700 active:scale-[0.98]">
          Search
        </button>
      </div>

      {/* FAQs */}
      <h2 className="text-2xl font-bold text-theme-primary mb-3">FAQs</h2>
      <div className="space-y-3 max-w-3xl">
        {questions.map((q, i) => (
          <motion.div
            key={q.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * i }}
            className="glass-card overflow-hidden"
          >
            <button
              className="w-full flex items-center justify-between p-4 text-left hover:bg-theme-tertiary/30 transition-colors"
              onClick={() => setOpenQuestion(openQuestion === q.id ? null : q.id)}
            >
              <span className="text-sm font-medium text-theme-primary pr-4">{q.question}</span>
              {openQuestion === q.id ? (
                <ChevronUp size={18} className="text-theme-tertiary flex-shrink-0" />
              ) : (
                <ChevronDown size={18} className="text-theme-tertiary flex-shrink-0" />
              )}
            </button>
            <AnimatePresence>
              {openQuestion === q.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="border-t border-theme-primary"
                >
                  <p className="p-4 text-sm text-theme-secondary leading-relaxed">{q.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Page;
