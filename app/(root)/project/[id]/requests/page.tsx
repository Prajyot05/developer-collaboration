"use client";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Check, X, Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface JoinRequest {
  _id: string;
  user: { _id: string; firstName: string; lastName: string; email: string };
  attachment: string;
  status: string;
}

const statusColors: Record<string, string> = {
  pending: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  accepted: "bg-green-500/10 text-green-500 border-green-500/20",
  rejected: "bg-red-500/10 text-red-500 border-red-500/20",
};

const ProjectRequests = () => {
  const { data: session } = useSession();
  const params = useParams();
  const id = params.id as string;
  const [requests, setRequests] = useState<JoinRequest[]>([]);

  const fetchRequests = useCallback(async () => {
    if (session) {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/list/request/${id}`
        );
        setRequests(response.data);
      } catch (error) {
        console.error("Error:", error);
        toast.error("Failed to fetch requests.");
      }
    }
  }, [id, session]);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  const handleAccept = async (requestId: string) => {
    const toastId = toast.loading("Accepting...");
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_CLIENT_URL}/api/linkage/accept/${requestId}`);
      toast.success("Accepted!", { id: toastId });
      fetchRequests();
    } catch (error) {
      toast.error("Failed to accept.", { id: toastId });
      console.error(error);
    }
  };

  const handleReject = async (requestId: string) => {
    const toastId = toast.loading("Rejecting...");
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_CLIENT_URL}/api/linkage/reject/${requestId}`);
      toast.success("Rejected!", { id: toastId });
      fetchRequests();
    } catch (error) {
      toast.error("Failed to reject.", { id: toastId });
      console.error(error);
    }
  };

  return (
    <div className="px-6 md:px-12 lg:px-16 py-8 min-h-screen bg-theme-primary">
      <Link
        href={`/project/${id}`}
        className="inline-flex items-center gap-2 text-sm text-theme-secondary hover:text-theme-primary transition-colors mb-6"
      >
        <ArrowLeft size={16} />
        Back to Project
      </Link>

      <h1 className="text-2xl font-bold text-theme-primary mb-6">Join Requests</h1>

      {requests.length === 0 ? (
        <div className="glass-card p-8 text-center">
          <Clock size={32} className="text-theme-tertiary mx-auto mb-3" />
          <p className="text-theme-secondary">No pending join requests</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {requests.map((request, i) => (
            <motion.div
              key={request._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass-card p-5"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-full bg-brand-500/10 flex items-center justify-center">
                    <span className="text-sm font-bold text-brand-500">
                      {request.user.firstName.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-theme-primary">
                      {request.user.firstName} {request.user.lastName}
                    </p>
                    <p className="text-xs text-theme-tertiary">{request.user.email}</p>
                  </div>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${statusColors[request.status]}`}>
                  {request.status}
                </span>
              </div>

              <p className="text-sm text-theme-secondary bg-theme-tertiary/50 p-3 rounded-lg mb-4 leading-relaxed">
                {request.attachment || "No message provided"}
              </p>

              {request.status === "pending" && (
                <div className="flex gap-2">
                  <button
                    onClick={() => handleAccept(request._id)}
                    className="flex-1 flex items-center justify-center gap-1 py-2 rounded-lg bg-green-500/10 text-green-500 hover:bg-green-500/20 text-sm font-medium transition-colors active:scale-[0.98]"
                  >
                    <Check size={14} /> Accept
                  </button>
                  <button
                    onClick={() => handleReject(request._id)}
                    className="flex-1 flex items-center justify-center gap-1 py-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 text-sm font-medium transition-colors active:scale-[0.98]"
                  >
                    <X size={14} /> Reject
                  </button>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectRequests;
