"use client";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import Image from "next/image";
import { Send, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

interface Comment {
  _id: string;
  user: { _id: string; firstName: string; lastName: string; profilePic?: string };
  content: string;
  createdAt: string;
}

interface ProjectUpdate {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
  comments: Comment[];
}

interface ProjectUpdatesProps {
  projectId: string;
  projectOwnerId: string;
}

const ProjectUpdates = ({ projectId, projectOwnerId }: ProjectUpdatesProps) => {
  const { data: session } = useSession();
  const [updates, setUpdates] = useState<ProjectUpdate[]>([]);
  const [newUpdateTitle, setNewUpdateTitle] = useState("");
  const [newUpdateContent, setNewUpdateContent] = useState("");
  const [newComment, setNewComment] = useState<{ [key: string]: string }>({});

  const isOwner = session?.user?.id === projectOwnerId;

  const fetchUpdates = useCallback(async () => {
    try {
      const response = await axios.get(`/api/project/${projectId}/updates`);
      setUpdates(response.data);
    } catch (error) {
      console.error("Failed to fetch updates", error);
    }
  }, [projectId]);

  useEffect(() => {
    if (projectId) fetchUpdates();
  }, [projectId, fetchUpdates]);

  const handlePostUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const toastId = toast.loading("Posting update...");
    try {
      const response = await axios.post(`/api/project/${projectId}/update`, {
        title: newUpdateTitle,
        content: newUpdateContent,
      });
      setUpdates([response.data, ...updates]);
      setNewUpdateTitle("");
      setNewUpdateContent("");
      toast.success("Update posted!", { id: toastId });
    } catch (error) {
      toast.error(`Failed: ${error}`, { id: toastId });
    }
  };

  const handlePostComment = async (updateId: string) => {
    const content = newComment[updateId];
    if (!content) return;
    const toastId = toast.loading("Posting...");
    try {
      const response = await axios.post(`/api/update/${updateId}/comment`, { content });
      setUpdates(updates.map((u) =>
        u._id === updateId ? { ...u, comments: [...u.comments, response.data] } : u
      ));
      setNewComment({ ...newComment, [updateId]: "" });
      toast.success("Comment posted!", { id: toastId });
    } catch (error) {
      toast.error(`Failed: ${error}`, { id: toastId });
    }
  };

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold text-theme-primary mb-4 flex items-center gap-2">
        <MessageCircle size={20} className="text-brand-500" />
        Project Updates
      </h2>

      {isOwner && (
        <form onSubmit={handlePostUpdate} className="mb-6 glass-card p-5 space-y-3">
          <h3 className="text-sm font-semibold text-theme-primary">Post a New Update</h3>
          <input
            type="text"
            value={newUpdateTitle}
            onChange={(e) => setNewUpdateTitle(e.target.value)}
            placeholder="Update Title"
            className="w-full p-2.5 text-sm bg-theme-tertiary border border-theme-primary rounded-lg text-theme-primary placeholder:text-theme-tertiary focus:outline-none focus:ring-2 focus:ring-brand-500/40 transition-all"
            required
          />
          <textarea
            value={newUpdateContent}
            onChange={(e) => setNewUpdateContent(e.target.value)}
            placeholder="What's new?"
            className="w-full p-2.5 text-sm bg-theme-tertiary border border-theme-primary rounded-lg text-theme-primary placeholder:text-theme-tertiary resize-none focus:outline-none focus:ring-2 focus:ring-brand-500/40 transition-all"
            rows={3}
            required
          />
          <button
            type="submit"
            className="flex items-center gap-2 bg-gradient-to-r from-brand-500 to-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all hover:from-brand-600 hover:to-purple-700 active:scale-[0.98]"
          >
            <Send size={14} />
            Post Update
          </button>
        </form>
      )}

      <div className="space-y-4">
        {updates.map((update, i) => (
          <motion.div
            key={update._id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass-card p-5"
          >
            <h3 className="text-base font-bold text-theme-primary">{update.title}</h3>
            <p className="text-xs text-theme-tertiary mb-2">{new Date(update.createdAt).toLocaleString()}</p>
            <p className="text-sm text-theme-secondary whitespace-pre-wrap leading-relaxed">{update.content}</p>

            <div className="mt-4 pt-3 border-t border-theme-primary">
              <h4 className="text-xs font-semibold text-theme-tertiary mb-2">Comments</h4>
              <div className="space-y-2">
                {update.comments.map((comment) => (
                  <div key={comment._id} className="flex items-start gap-2">
                    <Image
                      src={comment.user.profilePic || "/editProfileIcon.png"}
                      alt="User"
                      width={28}
                      height={28}
                      className="rounded-full flex-shrink-0"
                    />
                    <div className="bg-theme-tertiary/50 p-2 rounded-lg flex-1">
                      <p className="text-xs font-semibold text-theme-primary">
                        {comment.user.firstName} {comment.user.lastName}
                      </p>
                      <p className="text-xs text-theme-secondary">{comment.content}</p>
                    </div>
                  </div>
                ))}
              </div>

              {session && (
                <div className="mt-3 flex gap-2">
                  <input
                    type="text"
                    value={newComment[update._id] || ""}
                    onChange={(e) => setNewComment({ ...newComment, [update._id]: e.target.value })}
                    placeholder="Write a comment..."
                    className="flex-1 p-2 text-sm bg-theme-tertiary border border-theme-primary rounded-lg text-theme-primary placeholder:text-theme-tertiary focus:outline-none focus:ring-2 focus:ring-brand-500/40 transition-all"
                    onKeyDown={(e) => e.key === "Enter" && handlePostComment(update._id)}
                  />
                  <button
                    onClick={() => handlePostComment(update._id)}
                    className="px-3 py-2 rounded-lg bg-theme-tertiary hover:bg-brand-500/10 text-theme-secondary hover:text-brand-500 transition-colors"
                  >
                    <Send size={14} />
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProjectUpdates;
