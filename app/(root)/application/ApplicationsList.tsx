"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Clock } from "lucide-react";
import Link from "next/link";

interface JoinRequest {
  _id: string;
  project: { _id: string; title: string };
  status: string;
  createdAt: string;
}

const ApplicationsList = ({ filterStatus }: { filterStatus: string }) => {
  const [requests, setRequests] = useState<JoinRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get("/api/applications");
        const filtered = response.data.filter(
          (r: JoinRequest) => r.status === filterStatus
        );
        setRequests(filtered);
      } catch (error) {
        console.error("Error fetching applications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [filterStatus]);

  if (loading) {
    return (
      <div className="w-full space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-16 skeleton rounded-xl w-full" />
        ))}
      </div>
    );
  }

  if (requests.length === 0) {
    return (
      <div className="py-8 text-center text-sm text-theme-secondary">
        No applications found.
      </div>
    );
  }

  return (
    <div className="w-full space-y-2">
      {requests.map((item) => (
        <Link
          key={item._id}
          href={`/project/${item.project?._id}`}
          className="block glass-card p-4 hover:border-brand-500/30 transition-colors"
        >
          <div className="flex justify-between items-center">
            <span className="text-sm font-semibold text-theme-primary">
              {item.project?.title || "Unknown Project"}
            </span>
            <div className="flex items-center gap-3 text-xs">
              <span className={`px-2 py-1 rounded-md font-medium capitalize ${
                item.status === 'accepted' ? 'bg-green-500/10 text-green-500' :
                item.status === 'rejected' ? 'bg-red-500/10 text-red-500' :
                'bg-amber-500/10 text-amber-500'
              }`}>
                {item.status}
              </span>
              <span className="flex items-center gap-1 text-theme-tertiary">
                <Clock size={12} />
                {new Date(item.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ApplicationsList;
