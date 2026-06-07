"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Send } from "lucide-react";
import Link from "next/link";
import axios from "axios";
import { toast } from "sonner";

export default function SubmitHackathonPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    url: "",
    startDate: "",
    endDate: "",
    location: "",
    organizer: "",
    tags: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const payload = {
        ...formData,
        tags: formData.tags.split(",").map((t) => t.trim()).filter(Boolean),
      };

      await axios.post("/api/hackathons", payload);
      toast.success("Hackathon submitted successfully!");
      router.push("/hackathons");
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit hackathon.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-theme-card border border-theme-primary rounded-2xl shadow-xl w-[90%] max-w-2xl max-h-[90vh] overflow-auto p-8"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-theme-primary">Submit a Hackathon</h2>
          <Link href="/hackathons" className="p-2 hover:bg-theme-tertiary rounded-lg text-theme-tertiary hover:text-theme-primary transition-colors">
            <ArrowLeft size={20} />
          </Link>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-semibold text-theme-primary mb-1.5 block">Hackathon Title</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} required
              className="w-full p-3 text-sm bg-theme-tertiary border border-theme-primary rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/40" />
          </div>

          <div>
            <label className="text-sm font-semibold text-theme-primary mb-1.5 block">Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} required rows={3}
              className="w-full p-3 text-sm bg-theme-tertiary border border-theme-primary rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/40 resize-none" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold text-theme-primary mb-1.5 block">Start Date</label>
              <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} required
                className="w-full p-3 text-sm bg-theme-tertiary border border-theme-primary rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/40 text-theme-primary" />
            </div>
            <div>
              <label className="text-sm font-semibold text-theme-primary mb-1.5 block">End Date</label>
              <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} required
                className="w-full p-3 text-sm bg-theme-tertiary border border-theme-primary rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/40 text-theme-primary" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold text-theme-primary mb-1.5 block">Location (or Online)</label>
              <input type="text" name="location" value={formData.location} onChange={handleChange} required
                className="w-full p-3 text-sm bg-theme-tertiary border border-theme-primary rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/40" />
            </div>
            <div>
              <label className="text-sm font-semibold text-theme-primary mb-1.5 block">Organizer</label>
              <input type="text" name="organizer" value={formData.organizer} onChange={handleChange} required
                className="w-full p-3 text-sm bg-theme-tertiary border border-theme-primary rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/40" />
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-theme-primary mb-1.5 block">Registration URL</label>
            <input type="url" name="url" value={formData.url} onChange={handleChange} required placeholder="https://..."
              className="w-full p-3 text-sm bg-theme-tertiary border border-theme-primary rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/40" />
          </div>

          <div>
            <label className="text-sm font-semibold text-theme-primary mb-1.5 block">Tags (comma separated)</label>
            <input type="text" name="tags" value={formData.tags} onChange={handleChange} placeholder="AI, Web3, FinTech"
              className="w-full p-3 text-sm bg-theme-tertiary border border-theme-primary rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/40" />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-white font-medium flex-1 transition-all ${
                isSubmitting ? "bg-gray-500 cursor-not-allowed" : "bg-gradient-to-r from-brand-500 to-purple-600 hover:from-brand-600 hover:to-purple-700"
              }`}
            >
              <Send size={16} />
              {isSubmitting ? "Submitting..." : "Submit Hackathon"}
            </button>
            <Link
              href="/hackathons"
              className="px-6 py-3 flex items-center justify-center border border-theme-secondary text-theme-secondary hover:bg-theme-tertiary rounded-xl font-medium transition-colors"
            >
              Cancel
            </Link>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
