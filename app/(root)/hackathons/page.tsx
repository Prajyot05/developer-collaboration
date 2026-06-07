"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Trophy, Calendar, MapPin, Plus, ExternalLink, Users } from "lucide-react";
import Link from "next/link";
import axios from "axios";

interface Hackathon {
  _id: string;
  title: string;
  description: string;
  url: string;
  startDate: string;
  endDate: string;
  location: string;
  organizer: string;
  tags: string[];
}

export default function HackathonsPage() {
  const [hackathons, setHackathons] = useState<Hackathon[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHackathons = async () => {
      try {
        const response = await axios.get("/api/hackathons");
        setHackathons(response.data);
      } catch (error) {
        console.error("Error fetching hackathons:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHackathons();
  }, []);

  return (
    <div className="min-h-screen px-6 md:px-12 lg:px-16 py-8 bg-theme-primary">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <div className="flex items-center gap-3">
          <Trophy size={28} className="text-amber-500" />
          <h1 className="text-3xl font-bold text-theme-primary">Hackathons</h1>
        </div>
        <Link
          href="/hackathons/submit"
          className="flex items-center gap-2 px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-lg text-sm font-medium transition-colors"
        >
          <Plus size={16} />
          Submit Event
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card bg-gradient-to-r from-amber-500/5 to-orange-500/5 mt-2 mb-8 w-full p-6"
      >
        <h2 className="text-lg font-semibold text-theme-primary mb-2">Find a Hackathon Team</h2>
        <p className="text-sm text-theme-secondary max-w-2xl">
          Browse upcoming hackathons and post projects specifically for these events to find the perfect teammates. 
          All events are community-submitted.
        </p>
      </motion.div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="glass-card h-64 skeleton" />
          ))}
        </div>
      ) : hackathons.length === 0 ? (
        <div className="glass-card p-12 text-center">
          <p className="text-theme-secondary mb-4">No upcoming hackathons found.</p>
          <Link
            href="/hackathons/submit"
            className="inline-flex items-center gap-2 px-4 py-2 bg-theme-tertiary text-theme-primary rounded-lg text-sm font-medium hover:bg-theme-secondary transition-colors border border-theme-primary"
          >
            Be the first to submit one
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hackathons.map((h, i) => (
            <motion.div
              key={h._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i }}
              className="glass-card p-6 flex flex-col h-full hover:border-brand-500/30 transition-colors"
            >
              <div className="flex-1">
                <div className="flex justify-between items-start gap-2 mb-3">
                  <h3 className="text-xl font-bold text-theme-primary line-clamp-2">{h.title}</h3>
                  <a href={h.url} target="_blank" rel="noopener noreferrer" className="p-1.5 bg-theme-tertiary rounded-md text-theme-secondary hover:text-brand-500 transition-colors flex-shrink-0">
                    <ExternalLink size={16} />
                  </a>
                </div>
                
                <p className="text-sm text-theme-secondary mb-4 line-clamp-2">{h.description}</p>
                
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-sm text-theme-tertiary">
                    <Calendar size={14} className="text-brand-500" />
                    <span>{new Date(h.startDate).toLocaleDateString()} - {new Date(h.endDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-theme-tertiary">
                    <MapPin size={14} className="text-brand-500" />
                    <span>{h.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-theme-tertiary">
                    <Users size={14} className="text-brand-500" />
                    <span>{h.organizer}</span>
                  </div>
                </div>

                {h.tags && h.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {h.tags.map((tag) => (
                      <span key={tag} className="text-xs px-2 py-1 rounded-md bg-theme-tertiary border border-theme-primary text-theme-secondary">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="mt-auto pt-4 border-t border-theme-primary">
                <Link
                  href={`/project/create/new?hackathon=${h._id}&title=${encodeURIComponent(h.title)}`}
                  className="block w-full py-2.5 text-center bg-theme-tertiary hover:bg-brand-500/10 text-theme-primary hover:text-brand-500 border border-theme-primary hover:border-brand-500/30 rounded-lg text-sm font-medium transition-all"
                >
                  Find a Team for This Event
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
