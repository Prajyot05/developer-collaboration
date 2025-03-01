"use client";

import InputBar from "@/app/components/InputBar";
import ProjectCard from "@/app/components/ProjectCard";
import { motion } from "framer-motion";

const page = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Title & Search Bar */}
      <motion.div
        className="flex flex-row justify-between items-center w-full my-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <p className="text-4xl font-lato font-bold">Current Quests</p>
        <InputBar />
      </motion.div>

      {/* Animated Project Cards */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { staggerChildren: 0.2, duration: 0.5 },
          },
        }}
        className="space-y-4"
      >
        <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
          <ProjectCard color="bg-blue-100" />
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
          <ProjectCard color="bg-green-100" />
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
          <ProjectCard color="bg-pink-100" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default page;
