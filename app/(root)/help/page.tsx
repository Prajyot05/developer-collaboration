"use client";
import { Search } from "lucide-react";
import { motion } from "framer-motion";
import React, { useState } from "react";

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

const Page = () => {
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);

  return (
    <div className="px-28 py-6 ">
      <div className="text-3xl font-dmsans ">Hello, Rohit!</div>
      <div className="bg-[#FEF9E8] mt-4 mb-10 w-full sm:w-[90%]  rounded-2xl p-6 flex flex-col gap-6 md:flex-row items-center md:justify-between shadow-md">
        <div className="max-w-4xl">
          <h2 className="text-2xl ">Welcome to Help Page.</h2>
          <p className="text-gray-700 mt-2 w-[85%]">
            Have any questions or need assistance? Our Help page is the perfect
            place to reach out. Submit your doubts or concerns, and our admin
            team will be happy to assist you in resolving any issues or
            answering your queries about the website.
          </p>
        </div>
        <div className="w-32 h-32 flex-shrink-0  items-center">
          <img src="/help.png" alt="" className="p-2 rounded-xl bg-white" />
        </div>
      </div>

      <div className="text-4xl mb-3">Help</div>
      <hr className="border-gray-300" />
      <div className=" relative w-full mb-10">
        <Search className="size-6 absolute top-8 left-5" />
        <input
          type="text"
          placeholder="Describe your issues here."
          className="ps-14 px-5 py-3 my-4 border focus:outline-none w-full md:w-[60%] text-xl text-black border-[#545454] rounded-full placeholder:font-dmsans placeholder:text-xl"
        />
        <button className="text-white font-lato bg-[#004AAD] md:ms-5 py-3 px-8 w-[10rem] lg:w-[20%] text-xl rounded-full">
          Search
        </button>
      </div>
      <div className="text-4xl mb-3">FAQs</div>
      <hr className="border-gray-300 mb-3" />

      <div className="space-y-4 w-full">
        {questions.map((q) => (
          <motion.div
            key={q.id}
            className={`w-full border-b pb-2 px-10 ${q.color} p-4 rounded-lg shadow-md`}
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
                className="p-6 text-lg bg-white rounded-md mt-2 text-gray-700 shadow-inner"
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
      <hr className="border-gray-300" />
    </div>
  );
};

export default Page;
