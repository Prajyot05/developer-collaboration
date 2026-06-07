"use client";

import { Search, ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

// Stats are currently hidden pending real backend endpoints

const Page = () => {
  const [domain, setDomain] = useState("");
  const [institute, setInstitute] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (domain) params.set("domain", domain);
    if (institute) params.set("institute", institute);
    router.push(`/project?${params.toString()}`);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-theme-primary">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-500/5 dark:bg-brand-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -left-40 w-80 h-80 bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-64 h-64 bg-cyan-500/5 dark:bg-cyan-500/8 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 px-6 md:px-12 lg:px-20 pt-12 pb-20 max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-2 mb-6">
            <Sparkles size={20} className="text-brand-500" />
            <span className="text-sm font-medium text-brand-500 dark:text-brand-400 tracking-wide uppercase">
              Developer Collaboration Platform
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-theme-primary mb-6 leading-tight">
            Find Your{" "}
            <span className="gradient-text">Dream Team</span>
            <br />
            Build Something{" "}
            <span className="gradient-text">Amazing</span>
          </h1>

          <p className="text-lg md:text-xl text-theme-secondary max-w-2xl mb-10 leading-relaxed">
            A platform where developers connect, communicate, and collaborate.
            Browse projects, find teammates, and turn your ideas into reality.
          </p>

          {/* Search Section */}
          <div className="space-y-4 max-w-2xl">
            <div>
              <label className="text-sm font-semibold text-theme-primary mb-2 block">
                Domain
              </label>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-theme-tertiary" size={18} />
                <input
                  type="text"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  placeholder="e.g. Web Development, Machine Learning..."
                  className="w-full pl-12 pr-4 py-3.5 bg-theme-card border border-theme-secondary rounded-xl text-theme-primary placeholder:text-theme-tertiary focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500 transition-all duration-200"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-theme-primary mb-2 block">
                Institute
              </label>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-theme-tertiary" size={18} />
                <input
                  type="text"
                  value={institute}
                  onChange={(e) => setInstitute(e.target.value)}
                  placeholder="e.g. MIT, Stanford, IIT..."
                  className="w-full pl-12 pr-4 py-3.5 bg-theme-card border border-theme-secondary rounded-xl text-theme-primary placeholder:text-theme-tertiary focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:border-brand-500 transition-all duration-200"
                />
              </div>
            </div>

            <button
              onClick={handleSearch}
              className="flex items-center gap-2 bg-gradient-to-r from-brand-500 to-purple-600 hover:from-brand-600 hover:to-purple-700 text-white px-8 py-3.5 rounded-xl text-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl active:scale-[0.98] mt-2"
            >
              Search Projects
              <ArrowRight size={20} />
            </button>
          </div>
        </motion.div>


        {/* Hero visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="absolute top-20 right-0 w-[500px] h-[500px] hidden xl:block"
        >
          <div className="relative w-full h-full">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-500/20 to-purple-500/20 rounded-full blur-3xl" />
            <Image
              src="/devs.png"
              alt="Developers collaborating"
              width={450}
              height={450}
              className="relative z-10 rounded-3xl opacity-80 dark:opacity-60 object-cover animate-float"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Page;
