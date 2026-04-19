"use client";
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import useAuthStore from "@/app/store/useAuthStore";
import { FolderOpen, ExternalLink, Plus } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

interface SimpleProject {
  _id: string;
  title: string;
  description?: string;
  domains?: string[];
  location?: string;
}

const UserProject = () => {
  const { user } = useAuthStore();
  const [createdProjects, setCreatedProjects] = useState<SimpleProject[]>([]);
  const [joinedProjects, setJoinedProjects] = useState<SimpleProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<"created" | "joined">("created");

  const fetchProjects = useCallback(async () => {
    if (!user?.id) return;
    setLoading(true);
    try {
      const [createdRes, joinedRes] = await Promise.all([
        axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/api/list/created/${user.id}`),
        axios.get(`${process.env.NEXT_PUBLIC_CLIENT_URL}/api/list/joined/${user.id}`),
      ]);
      setCreatedProjects(createdRes.data);
      setJoinedProjects(joinedRes.data);
    } catch (error) {
      console.error("Error fetching user projects:", error);
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const projects = tab === "created" ? createdProjects : joinedProjects;

  return (
    <div>
      {/* Sub-tabs */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setTab("created")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            tab === "created"
              ? "bg-brand-500/10 text-brand-500 dark:text-brand-400"
              : "text-theme-secondary hover:bg-theme-tertiary"
          }`}
        >
          Created ({createdProjects.length})
        </button>
        <button
          onClick={() => setTab("joined")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            tab === "joined"
              ? "bg-brand-500/10 text-brand-500 dark:text-brand-400"
              : "text-theme-secondary hover:bg-theme-tertiary"
          }`}
        >
          Joined ({joinedProjects.length})
        </button>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2].map((i) => (
            <div key={i} className="h-20 skeleton rounded-xl" />
          ))}
        </div>
      ) : projects.length === 0 ? (
        <div className="glass-card p-8 text-center">
          <FolderOpen size={32} className="text-theme-tertiary mx-auto mb-3" />
          <p className="text-theme-secondary text-sm mb-3">
            {tab === "created" ? "No projects created yet" : "No projects joined yet"}
          </p>
          {tab === "created" && user?.id && (
            <Link
              href={`/project/create/${user.id}`}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-500 dark:text-brand-400 hover:text-brand-600 transition-colors"
            >
              <Plus size={14} />
              Create your first project
            </Link>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {projects.map((project, i) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Link href={`/project/${project._id}`}>
                <div className="glass-card p-4 hover:border-brand-500/30 transition-all duration-200 cursor-pointer">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-theme-primary truncate">{project.title}</h3>
                      {project.description && (
                        <p className="text-xs text-theme-tertiary line-clamp-1 mt-0.5">{project.description}</p>
                      )}
                      {project.domains && project.domains.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {project.domains.map((d, di) => (
                            <span key={di} className="text-[10px] px-2 py-0.5 rounded-full bg-brand-500/10 text-brand-500 dark:text-brand-400 border border-brand-500/20">
                              {d}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <ExternalLink size={14} className="text-theme-tertiary flex-shrink-0 mt-1" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserProject;
