"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Inter } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";

const inter = Inter({
  subsets: ["latin"],
  weight: "500",
  variable: "--font-inter",
});

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <motion.main
      className={`w-1/5 pt-8 bg-white min-h-screen fixed ${inter.className}`}
      initial={{ x: -100, opacity: 0 }}
      animate={{
        x: 0,
        opacity: 1,
        transition: { duration: 0.5, ease: "easeOut" },
      }}
    >
      <div className="flex flex-col">
        {/* Logo Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1, transition: { duration: 0.4 } }}
        >
          <Image
            src="https://placehold.co/600x350"
            alt="logo"
            width={400}
            height={300}
            className="px-6 pb-2"
          />
        </motion.div>

        {/* Sidebar Links */}
        {[
          { href: "/profile", icon: "/profileIcon.png", label: "Profile" },
          { href: "/projects", icon: "/projectsIcon.png", label: "Projects" },
          { href: "/qna", icon: "/QnAIcon.png", label: "QnA" },
          { href: "/settings", icon: "/settingsIcon.png", label: "Settings" },
        ].map(({ href, icon, label }) => {
          const isActive = pathname === href;

          return (
            <Link href={href} key={href} className="relative rounded-2xl">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex flex-row mt-3 mx-6 pl-3 h-12 items-center gap-3 rounded-2xl overflow-hidden relative"
              >
                {/* Background Fade Animation */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 bg-black rounded-2xl"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1, transition: { duration: 0.3 } }}
                      exit={{ opacity: 0, transition: { duration: 0.3 } }}
                    />
                  )}
                </AnimatePresence>

                {/* Icon & Label */}
                <div className="flex flex-row items-center gap-3 relative z-10">
                  <Image
                    src={icon}
                    alt={`${label} Logo`}
                    width={30}
                    height={30}
                    className={isActive ? "invert" : ""}
                  />
                  <p
                    className={`text-xl font-semibold ${
                      isActive ? "text-white" : "text-black"
                    }`}
                  >
                    {label}
                  </p>
                </div>
              </motion.div>
            </Link>
          );
        })}
      </div>
    </motion.main>
  );
};

export default Sidebar;
