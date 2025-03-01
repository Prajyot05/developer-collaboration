"use client";

import { redirect } from "next/navigation";
import SignInButton from "./SignInButton";
import { auth } from "@/app/auth";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Home({ session }: { session: any }) {
  // The auth logic should remain in a server component and pass session as props
  // This is a client component wrapper for animations

  // Redirect is handled in the server component

  return (
    <div className="flex flex-row justify-center items-center w-screen h-screen bg-slate-50 overflow-hidden">
      {/* Background particles */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-blue-500"
            style={{
              width: Math.random() * 10 + 5,
              height: Math.random() * 10 + 5,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              opacity: [0.1, 0.5, 0.1],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </motion.div>

      <div className="p-10 flex flex-col items-center z-10">
        <motion.h1
          className="text-5xl my-4 font-lato font-extrabold text-blue-500 tracking-wide"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 10,
            delay: 0.2,
          }}
          whileHover={{
            scale: 1.05,
            textShadow: "0 0 8px rgba(59, 130, 246, 0.5)",
          }}
        >
          DEVELOPERS'
        </motion.h1>

        <motion.h1
          className="text-8xl -mt-5 mb-10 bg-black text-white px-3 pb-1 rounded-lg font-lato font-extrabold tracking-wider"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 100,
            delay: 0.4,
          }}
          whileHover={{
            scale: 1.02,
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)",
          }}
        >
          GUILD
        </motion.h1>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, type: "spring" }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <SignInButton />
        </motion.div>
      </div>

      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 50,
          damping: 20,
          delay: 0.5,
        }}
      >
        <Image
          src="/decologo.png"
          width={1000}
          height={600}
          alt="hero image"
          className="h-screen w-screen cover"
          style={{
            filter: "drop-shadow(0 10px 25px rgba(59, 130, 246, 0.4))",
          }}
        />
      </motion.div>
    </div>
  );
}
