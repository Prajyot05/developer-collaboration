"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaSearch, FaPlus } from "react-icons/fa";

const questions = [
  {
    id: 1,
    question: "How to contribute to open source projects?",
    answer:
      "You can start by finding beginner-friendly issues on GitHub repositories and making small contributions.",
    color: "bg-blue-100",
  },
  {
    id: 2,
    question: "What is the best way to learn React?",
    answer:
      "The best way is to go through the official documentation, build projects, and follow interactive tutorials.",
    color: "bg-yellow-100",
  },
  {
    id: 3,
    question: "How can I improve my DSA skills?",
    answer:
      "Practice problems on platforms like LeetCode, CodeChef, and GeeksforGeeks regularly.",
    color: "bg-green-100",
  },
  {
    id: 4,
    question: "What are the best resources for learning Next.js?",
    answer:
      "You can explore the official Next.js documentation, freeCodeCamp tutorials, and YouTube playlists for structured learning.",
    color: "bg-purple-100",
  },
  {
    id: 5,
    question: "How do I stay consistent with coding?",
    answer:
      "Setting a schedule, joining coding communities, and working on projects can help build consistency.",
    color: "bg-red-100",
  },
  {
    id: 6,
    question: "What are some good projects for beginners?",
    answer:
      "Todo apps, weather apps, and portfolio websites are great starting projects for beginners.",
    color: "bg-orange-100",
  },
];

export default function QnATab() {
  const [query, setQuery] = useState("");
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-10 bg-gray-50 w-full">
      <motion.div
        className="w-[95%] min-w-4xl"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative flex items-center mb-8 w-full">
          <input
            type="text"
            className="w-full p-4 pl-10 pr-12 border rounded-lg shadow-md focus:ring-2 focus:ring-blue-400 text-lg"
            placeholder="What's your Query today?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <FaPlus className="absolute left-3 text-gray-500 text-lg" />
          <FaSearch className="absolute right-3 text-gray-600 cursor-pointer text-lg" />
        </div>

        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-700">
          General Questions
        </h2>
        <div className="space-y-4 w-full">
          {questions.map((q) => (
            <motion.div
              key={q.id}
              className={`w-full border-b pb-2 ${q.color} p-4 rounded-lg shadow-md`}
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                className="w-full cursor-pointer transition-all duration-300 hover:opacity-80"
                onClick={() =>
                  setOpenQuestion(openQuestion === q.id ? null : q.id)
                }
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex justify-between items-center text-lg font-medium text-gray-900">
                  <span>{q.question}</span>
                  <span>{openQuestion === q.id ? "▲" : "▼"}</span>
                </div>
              </motion.div>
              {openQuestion === q.id && (
                <motion.div
                  className="p-4 bg-white rounded-md mt-2 text-gray-700 shadow-inner"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.3 }}
                >
                  {q.answer}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
