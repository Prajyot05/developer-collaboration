"use client";
import { Share2, Bookmark, MapPin, ExternalLink } from "lucide-react";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { Project } from "@/app/types/projects";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

const domainColors: Record<string, string> = {
  "web-dev": "bg-blue-500/10 text-blue-500 dark:text-blue-400 border-blue-500/20",
  "app-dev": "bg-green-500/10 text-green-500 dark:text-green-400 border-green-500/20",
  "data science": "bg-purple-500/10 text-purple-500 dark:text-purple-400 border-purple-500/20",
  "machine learning": "bg-amber-500/10 text-amber-500 dark:text-amber-400 border-amber-500/20",
  "ai": "bg-pink-500/10 text-pink-500 dark:text-pink-400 border-pink-500/20",
  "iot": "bg-cyan-500/10 text-cyan-500 dark:text-cyan-400 border-cyan-500/20",
  "cyber security": "bg-red-500/10 text-red-500 dark:text-red-400 border-red-500/20",
  default: "bg-gray-500/10 text-gray-500 dark:text-gray-400 border-gray-500/20",
};

function getDomainColor(domain: string) {
  return domainColors[domain.toLowerCase()] || domainColors.default;
}

const SkeletonCard = () => (
  <div className="w-full py-6 mb-4 rounded-xl px-8 bg-theme-card border border-theme-primary animate-pulse">
    <div className="flex items-center gap-4 mb-4">
      <div className="w-14 h-14 rounded-xl skeleton" />
      <div className="flex-1">
        <div className="h-6 w-48 skeleton mb-2" />
        <div className="h-4 w-32 skeleton" />
      </div>
    </div>
    <div className="h-4 w-full skeleton mb-2" />
    <div className="h-4 w-3/4 skeleton" />
  </div>
);

const ProjectList = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/home");
    }

    const getData = async () => {
      if (status === "authenticated") {
        try {
          const url = new URL(`${process.env.NEXT_PUBLIC_CLIENT_URL}/api/list/all`);
          
          const domain = searchParams.get("domain");
          const institute = searchParams.get("institute");
          const search = searchParams.get("search");
          
          if (domain) url.searchParams.set("domains", domain);
          if (institute) url.searchParams.set("institute", institute);
          if (search) url.searchParams.set("search", search);

          const response = await axios.get(url.toString());
          setProjects(response.data);
        } catch (error) {
          console.error("Error fetching projects:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    getData();
  }, [session, status, router, searchParams]);

  if (status === "loading" || loading) {
    return (
      <div className="lg:ms-[22rem] p-6 min-h-screen w-full bg-theme-secondary">
        {[1, 2, 3].map((i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="lg:ms-[22rem] p-6 min-h-screen w-full bg-theme-secondary">
      {/* Results header */}
      <div className="flex items-center justify-between mb-6 lg:hidden">
        <p className="text-sm text-theme-secondary">
          <span className="text-brand-500 font-semibold">{projects.length}</span> projects found
        </p>
      </div>

      {projects.length === 0 && !loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-20 h-20 rounded-2xl bg-theme-tertiary flex items-center justify-center mb-4">
            <ExternalLink size={32} className="text-theme-tertiary" />
          </div>
          <h3 className="text-xl font-semibold text-theme-primary mb-2">No projects found</h3>
          <p className="text-theme-secondary">Try adjusting your filters or create a new project!</p>
        </div>
      ) : (
        projects.map((project, index) => (
          <motion.div
            key={project._id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="w-full py-5 mb-4 rounded-xl shadow-sm px-8 bg-theme-card border border-theme-primary hover:border-brand-500/30 hover:shadow-md transition-all duration-200"
          >
            <div className="flex justify-between items-start gap-4">
              <div className="flex items-start gap-4 flex-1">
                {/* Rank badge */}
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 border bg-theme-tertiary/30 border-theme-primary`}>
                  <span className="text-2xl font-bold text-theme-primary">
                    {project.title.charAt(0).toUpperCase()}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-semibold text-theme-primary truncate">
                    {project.title}
                  </h3>
                  {project.link && (
                    <p className="text-sm text-brand-500 dark:text-brand-400 truncate">{project.link}</p>
                  )}
                  <div className="flex flex-wrap items-center gap-3 mt-2">
                    {/* Domain badges */}
                    {project.domains && (
                      <div className="flex flex-wrap gap-1.5">
                        {(Array.isArray(project.domains) ? project.domains : [project.domains]).map((d, i) => (
                          <span
                            key={i}
                            className={`text-xs px-2.5 py-1 rounded-full border font-medium ${getDomainColor(String(d))}`}
                          >
                            {String(d)}
                          </span>
                        ))}
                      </div>
                    )}
                    {project.hackathon && (
                      <span className="text-xs px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-500 border border-purple-500/20 font-medium flex items-center gap-1">
                        Hackathon Project
                      </span>
                    )}
                    {project.location && (
                      <span className="flex items-center gap-1 text-xs text-theme-tertiary">
                        <MapPin size={12} />
                        {project.location}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex gap-2 flex-shrink-0">
                <button className="p-2 rounded-lg hover:bg-theme-tertiary text-theme-tertiary hover:text-theme-primary transition-colors">
                  <Share2 size={16} />
                </button>
                <button className="p-2 rounded-lg hover:bg-theme-tertiary text-theme-tertiary hover:text-theme-primary transition-colors">
                  <Bookmark size={16} />
                </button>
              </div>
            </div>

            <hr className="my-3 border-theme-primary" />

            <div>
              <p className="text-sm font-medium text-theme-secondary mb-1">Description</p>
              <p className="text-sm text-theme-tertiary line-clamp-3 leading-relaxed">
                {project.description}
              </p>
              <Link
                href={`/project/${project._id}`}
                className="inline-flex items-center gap-1.5 mt-3 text-sm font-medium text-brand-500 dark:text-brand-400 hover:text-brand-600 dark:hover:text-brand-300 transition-colors"
              >
                Learn More
                <ExternalLink size={14} />
              </Link>
            </div>
          </motion.div>
        ))
      )}
    </div>
  );
};

export default ProjectList;
