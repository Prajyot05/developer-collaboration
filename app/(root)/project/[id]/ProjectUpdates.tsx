"use client";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import Image from "next/image";

interface Comment {
  _id: string;
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    profilePic?: string;
  };
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
      toast.error("Failed to load project updates.");
    }
  }, [projectId]);

  useEffect(() => {
    if (projectId) {
      fetchUpdates();
    }
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
      toast.success("Update posted successfully!", { id: toastId });
    } catch (error) {
      toast.error(`Failed to post update: ${error}`, { id: toastId });
    }
  };

  const handlePostComment = async (updateId: string) => {
    const content = newComment[updateId];
    if (!content) return;

    const toastId = toast.loading("Posting comment...");
    try {
      const response = await axios.post(`/api/update/${updateId}/comment`, {
        content,
      });
      const updatedUpdates = updates.map((update) =>
        update._id === updateId
          ? { ...update, comments: [...update.comments, response.data] }
          : update
      );
      setUpdates(updatedUpdates);
      setNewComment({ ...newComment, [updateId]: "" });
      toast.success("Comment posted successfully!", { id: toastId });
    } catch (error) {
      toast.error(`Failed to post comment.: ${error}`, { id: toastId });
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Project Updates</h2>

      {isOwner && (
        <form
          onSubmit={handlePostUpdate}
          className="mb-8 p-4 border rounded-lg bg-white"
        >
          <h3 className="text-xl font-semibold mb-2">Post a New Update</h3>
          <input
            type="text"
            value={newUpdateTitle}
            onChange={(e) => setNewUpdateTitle(e.target.value)}
            placeholder="Update Title"
            className="w-full p-2 mb-2 border rounded"
            required
          />
          <textarea
            value={newUpdateContent}
            onChange={(e) => setNewUpdateContent(e.target.value)}
            placeholder="What's new with your project?"
            className="w-full p-2 mb-2 border rounded"
            rows={4}
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Post Update
          </button>
        </form>
      )}

      <div className="space-y-6">
        {updates.map((update) => (
          <div key={update._id} className="p-4 border rounded-lg bg-white">
            <h3 className="text-xl font-bold">{update.title}</h3>
            <p className="text-sm text-gray-500 mb-2">
              {new Date(update.createdAt).toLocaleString()}
            </p>
            <p className="text-gray-800 whitespace-pre-wrap">
              {update.content}
            </p>

            <div className="mt-4 pt-4 border-t">
              <h4 className="font-semibold mb-2">Comments</h4>
              <div className="space-y-3">
                {update.comments.map((comment) => (
                  <div key={comment._id} className="flex items-start gap-3">
                    <Image
                      src={comment.user.profilePic || "/editProfileIcon.png"}
                      alt="User"
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                    <div className="bg-gray-100 p-2 rounded-lg w-full">
                      <p className="font-semibold text-sm">
                        {comment.user.firstName} {comment.user.lastName}
                      </p>
                      <p className="text-sm">{comment.content}</p>
                    </div>
                  </div>
                ))}
              </div>

              {session && (
                <div className="mt-4 flex gap-2">
                  <input
                    type="text"
                    value={newComment[update._id] || ""}
                    onChange={(e) =>
                      setNewComment({
                        ...newComment,
                        [update._id]: e.target.value,
                      })
                    }
                    placeholder="Write a comment..."
                    className="w-full p-2 border rounded"
                  />
                  <button
                    onClick={() => handlePostComment(update._id)}
                    className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
                  >
                    Post
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectUpdates;
