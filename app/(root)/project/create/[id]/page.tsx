"use client";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { ArrowLeft, Plus, Trophy } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const domainOptions = [
  { name: "aiMl", label: "AI/ML" },
  { name: "webApp", label: "Web-App" },
  { name: "androidApp", label: "Android App" },
];

const durationOptions = [
  { label: "1 Month", value: 30 * 24 * 60 * 60 },
  { label: "2 Months", value: 60 * 24 * 60 * 60 },
  { label: "3 Months", value: 90 * 24 * 60 * 60 },
  { label: "6 Months", value: 180 * 24 * 60 * 60 },
];

const CreateProjectForm = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const hackathonId = searchParams.get("hackathon");
  const hackathonTitle = searchParams.get("title");
  const id = params.id as string;
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "", description: "", requirements: "", responsibilities: "",
    duration: "", instituteRequired: "no", instituteName: "",
    domains: [] as string[], certified1: false, certified2: false, link: "",
    hackathon: hackathonId || "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type } = target;
    const checked = type === "checkbox" ? target.checked : undefined;
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleDomainChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      domains: checked ? [...prev.domains, name] : prev.domains.filter((d) => d !== name),
    }));
  };

  const sendData = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const toastId = toast.loading("Creating project...");
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/project/user_id/${id}`,
        formData
      );
      if (res.status === 201) {
        toast.success("Project created!", { id: toastId });
        router.push("/project");
      }
    } catch (error) {
      toast.error("Failed to create project.", { id: toastId });
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-theme-card border border-theme-primary rounded-2xl shadow-xl w-[90%] max-w-3xl max-h-[90vh] overflow-auto p-8"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-theme-primary">Create New Project</h2>
            {hackathonId && (
              <div className="flex items-center gap-1.5 mt-2 text-sm text-purple-500 font-medium bg-purple-500/10 px-3 py-1 rounded-full w-fit">
                <Trophy size={14} />
                For {hackathonTitle || "Hackathon"}
              </div>
            )}
          </div>
          <Link href="/project" className="p-2 hover:bg-theme-tertiary rounded-lg text-theme-tertiary hover:text-theme-primary transition-colors">
            <ArrowLeft size={20} />
          </Link>
        </div>

        <form className="space-y-5" onSubmit={sendData}>
          {/* Title */}
          <div>
            <label className="text-sm font-semibold text-theme-primary mb-1.5 block">Project Title</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange}
              className="w-full p-3 text-sm bg-theme-tertiary border border-theme-primary rounded-xl text-theme-primary placeholder:text-theme-tertiary focus:outline-none focus:ring-2 focus:ring-brand-500/40 transition-all"
              placeholder="Enter project title" required />
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-semibold text-theme-primary mb-1.5 block">Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange}
              className="w-full p-3 text-sm bg-theme-tertiary border border-theme-primary rounded-xl text-theme-primary placeholder:text-theme-tertiary resize-none focus:outline-none focus:ring-2 focus:ring-brand-500/40 transition-all"
              rows={3} placeholder="Describe your project" />
          </div>

          {/* Requirements */}
          <div>
            <label className="text-sm font-semibold text-theme-primary mb-1.5 block">Minimum Requirements</label>
            <textarea name="requirements" value={formData.requirements} onChange={handleChange}
              className="w-full p-3 text-sm bg-theme-tertiary border border-theme-primary rounded-xl text-theme-primary placeholder:text-theme-tertiary resize-none focus:outline-none focus:ring-2 focus:ring-brand-500/40 transition-all"
              rows={2} placeholder="What skills/experience are required?" />
          </div>

          {/* Responsibilities */}
          <div>
            <label className="text-sm font-semibold text-theme-primary mb-1.5 block">Responsibilities</label>
            <textarea name="responsibilities" value={formData.responsibilities} onChange={handleChange}
              className="w-full p-3 text-sm bg-theme-tertiary border border-theme-primary rounded-xl text-theme-primary placeholder:text-theme-tertiary resize-none focus:outline-none focus:ring-2 focus:ring-brand-500/40 transition-all"
              rows={2} placeholder="What will team members be responsible for?" />
          </div>

          {/* Duration + Institute */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold text-theme-primary mb-1.5 block">Duration</label>
              <select name="duration" value={formData.duration} onChange={handleChange}
                className="w-full p-3 text-sm bg-theme-tertiary border border-theme-primary rounded-xl text-theme-primary focus:outline-none focus:ring-2 focus:ring-brand-500/40 transition-all"
              >
                <option value="">Select duration</option>
                {durationOptions.map((d) => <option key={d.value} value={d.value}>{d.label}</option>)}
              </select>
            </div>

            <div>
              <label className="text-sm font-semibold text-theme-primary mb-1.5 block">Institute Project?</label>
              <div className="flex gap-4 items-center h-[46px]">
                <label className="flex items-center gap-2 text-sm text-theme-secondary cursor-pointer">
                  <input type="radio" name="instituteRequired" value="yes" checked={formData.instituteRequired === "yes"} onChange={handleChange} className="accent-brand-500" />
                  Yes
                </label>
                <label className="flex items-center gap-2 text-sm text-theme-secondary cursor-pointer">
                  <input type="radio" name="instituteRequired" value="no" checked={formData.instituteRequired === "no"} onChange={handleChange} className="accent-brand-500" />
                  No
                </label>
              </div>
            </div>
          </div>

          {formData.instituteRequired === "yes" && (
            <input type="text" name="instituteName" value={formData.instituteName} onChange={handleChange}
              className="w-full p-3 text-sm bg-theme-tertiary border border-theme-primary rounded-xl text-theme-primary placeholder:text-theme-tertiary focus:outline-none focus:ring-2 focus:ring-brand-500/40 transition-all"
              placeholder="College/Institute name" />
          )}

          {/* Domains */}
          <div>
            <label className="text-sm font-semibold text-theme-primary mb-2 block">Project Domains</label>
            <div className="flex flex-wrap gap-3">
              {domainOptions.map((d) => (
                <label key={d.name} className="flex items-center gap-2 text-sm text-theme-secondary cursor-pointer">
                  <input type="checkbox" name={d.name} onChange={handleDomainChange} className="w-4 h-4 accent-brand-500" />
                  {d.label}
                </label>
              ))}
            </div>
          </div>

          {/* Link */}
          <div>
            <label className="text-sm font-semibold text-theme-primary mb-1.5 block">Links (Community/Meet)</label>
            <input type="text" name="link" value={formData.link} onChange={handleChange}
              className="w-full p-3 text-sm bg-theme-tertiary border border-theme-primary rounded-xl text-theme-primary placeholder:text-theme-tertiary focus:outline-none focus:ring-2 focus:ring-brand-500/40 transition-all"
              placeholder="https://..." />
          </div>

          {/* Certifications */}
          <div className="space-y-2">
            <label className="flex items-start gap-2 text-sm text-theme-secondary cursor-pointer">
              <input type="checkbox" name="certified1" checked={formData.certified1} onChange={handleChange} className="w-4 h-4 mt-0.5 accent-brand-500" />
              I certify that the provided information is true and accurate.
            </label>
            <label className="flex items-start gap-2 text-sm text-theme-secondary cursor-pointer">
              <input type="checkbox" name="certified2" checked={formData.certified2} onChange={handleChange} className="w-4 h-4 mt-0.5 accent-brand-500" />
              I understand the project will be evaluated for ranking.
            </label>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={!formData.certified1 || !formData.certified2 || isSubmitting}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium text-white transition-all active:scale-[0.98] ${
                formData.certified1 && formData.certified2 && !isSubmitting
                  ? "bg-gradient-to-r from-brand-500 to-purple-600 hover:from-brand-600 hover:to-purple-700 shadow-md"
                  : "bg-gray-400 dark:bg-gray-600 cursor-not-allowed"
              }`}
            >
              <Plus size={16} />
              {isSubmitting ? "Creating..." : "Create Project"}
            </button>
            <button
              type="button"
              onClick={() => router.push("/project")}
              className="px-6 py-3 rounded-xl text-sm font-medium border border-theme-secondary text-theme-secondary hover:bg-theme-tertiary transition-all active:scale-[0.98]"
            >
              Cancel
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

const CreatePage = () => {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <CreateProjectForm />
    </React.Suspense>
  );
};

export default CreatePage;
