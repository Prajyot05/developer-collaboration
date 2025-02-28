"use client";

import { signOut } from "next-auth/react";
import { motion } from "framer-motion";

export default function SignOutButton() {
  return (
    <motion.button
      className="ml-3 py-3 px-10 bg-red-500 text-xl text-white rounded-md shadow-xl transition-all duration-300"
      whileHover={{ scale: 1.1, backgroundColor: "#b91c1c" }}
      whileTap={{ scale: 0.9 }}
      onClick={() => signOut({ callbackUrl: "/" })}
    >
      Sign out
    </motion.button>
  );
}
