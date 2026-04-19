"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronDown, ChevronUp, MessageCircleQuestion } from "lucide-react";

const questions = [
  { id: 1, question: "How to contribute to open source projects?", answer: "You can start by finding beginner-friendly issues on GitHub repositories and making small contributions." },
  { id: 2, question: "What is the best way to learn React?", answer: "The best way is to go through the official documentation, build projects, and follow interactive tutorials." },
  { id: 3, question: "How can I improve my DSA skills?", answer: "Practice problems on platforms like LeetCode, CodeChef, and GeeksforGeeks regularly." },
  { id: 4, question: "What are the best resources for learning Next.js?", answer: "You can explore the official Next.js documentation, freeCodeCamp tutorials, and YouTube playlists for structured learning." },
  { id: 5, question: "How do I stay consistent with coding?", answer: "Setting a schedule, joining coding communities, and working on projects can help build consistency." },
  { id: 6, question: "What are some good projects for beginners?", answer: "Todo apps, weather apps, and portfolio websites are great starting projects for beginners." },
];

export default function QnATab() {
  const [query, setQuery] = useState("");
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);

  const filtered = questions.filter((q) =>
    q.question.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen px-6 md:px-12 lg:px-16 py-8 bg-theme-primary">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3 mb-6"
      >
        <MessageCircleQuestion size={28} className="text-brand-500" />
        <h1 className="text-3xl font-bold text-theme-primary">QnA</h1>
      </motion.div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="relative mb-8 max-w-2xl"
      >
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-theme-tertiary" size={18} />
        <input
          type="text"
          className="w-full pl-12 pr-4 py-3.5 bg-theme-card border border-theme-secondary rounded-xl text-theme-primary placeholder:text-theme-tertiary focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500 transition-all"
          placeholder="Search questions..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </motion.div>

      <h2 className="text-lg font-semibold text-theme-primary mb-4">General Questions</h2>

      <div className="space-y-3 max-w-3xl">
        {filtered.map((q, i) => (
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
                  <p className="p-4 text-sm text-theme-secondary leading-relaxed">
                    {q.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
