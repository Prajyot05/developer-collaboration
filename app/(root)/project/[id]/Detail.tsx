"use client";
import React, { useState, useEffect, useCallback } from "react";
import { Bookmark, Share2 } from "lucide-react";
import axios from "axios";
import { Project } from "@/app/types/projects";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import Link from "next/link";
import ProjectUpdates from "./ProjectUpdates";
import { motion } from "framer-motion";

type DetailProps = { id: string };

const Detail = ({ id }: DetailProps) => {
  const { data: session } = useSession();
  const [project, setProject] = useState<Project>();

  const getData = useCallback(async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/project/project_id/${id}`
      );
      setProject(response.data);
    } catch (error) {
      console.error("Error fetching project:", error);
    }
  }, [id]);

  useEffect(() => {
    getData();
  }, [getData]);

  if (!project) {
    return (
      <div className="lg:ms-[18rem] p-6 min-h-screen w-full bg-theme-secondary flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-brand-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-theme-secondary">Loading project...</p>
        </div>
      </div>
    );
  }

  const isOwner = session?.user?.id === project.owner._id;

  return (
    <div className="lg:ms-[18rem] p-6 min-h-screen w-full bg-theme-secondary">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full py-6 mb-5 rounded-xl shadow-sm px-8 bg-theme-card border border-theme-primary"
      >
        <div className="flex justify-between items-start gap-4">
          <div className="flex items-start gap-4 flex-1">
            <div className={`w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0 border bg-theme-tertiary/30 border-theme-primary`}>
              <span className="text-2xl font-bold text-theme-primary">
                {project.title.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-theme-primary">{project.title}</h1>
              <div className="flex flex-wrap items-center gap-3 mt-1">
                {project.domains && (
                  <div className="flex flex-wrap gap-1.5">
                    {project.domains.map((d, i) => (
                      <span key={i} className="text-xs px-2.5 py-1 rounded-full bg-brand-500/10 text-brand-500 dark:text-brand-400 border border-brand-500/20 font-medium">
                        {d}
                      </span>
                    ))}
                  </div>
                )}
                {project.location && (
                  <span className="text-xs text-theme-tertiary">{project.location}</span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            {isOwner && (
              <Link
                href={`/project/${id}/requests`}
                className="flex items-center gap-1.5 bg-gradient-to-r from-brand-500 to-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:from-brand-600 hover:to-purple-700 active:scale-[0.98]"
              >
                View Requests
              </Link>
            )}
            <button 
              className="p-2 rounded-lg hover:bg-theme-tertiary text-theme-tertiary hover:text-theme-primary transition-colors"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                toast.success("Link copied to clipboard!");
              }}
            >
              <Share2 size={18} />
            </button>
            <button 
              className="p-2 rounded-lg hover:bg-theme-tertiary text-theme-tertiary hover:text-theme-primary transition-colors"
              onClick={() => toast.info("Bookmarks feature coming soon!")}
            >
              <Bookmark size={18} />
            </button>
          </div>
        </div>

        <hr className="my-4 border-theme-primary" />

        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-theme-primary mb-1">Description</h3>
            <p className="text-sm text-theme-secondary leading-relaxed pl-4">{project.description}</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-theme-primary mb-1">Minimum Requirements</h3>
            <p className="text-sm text-theme-secondary leading-relaxed pl-4">{project.requirements}</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-theme-primary mb-1">Responsibilities</h3>
            <p className="text-sm text-theme-secondary leading-relaxed pl-4">{project.responsibilities}</p>
          </div>
        </div>
      </motion.div>

      <ProjectUpdates projectId={project._id} projectOwnerId={project.owner._id} />
    </div>
  );
};

export default Detail;
