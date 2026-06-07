import React from "react";
import { Award } from "lucide-react";

const AchievementsCard = () => {
  return (
    <section className="w-full h-[28rem] glass-card overflow-hidden">
      <header className="bg-theme-card border-b border-theme-primary rounded-t-lg py-3 px-4">
        <p className="text-xl font-bold text-theme-primary text-center flex items-center justify-center gap-2">
          <Award size={20} className="text-amber-500" />
          Achievements
        </p>
      </header>
      <div className="p-4 space-y-3">
        <div className="flex items-center gap-3 p-3 rounded-lg bg-theme-tertiary/50 border border-theme-primary">
          <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
            <Award size={18} className="text-amber-500" />
          </div>
          <div>
            <p className="text-sm font-medium text-theme-primary">First Project Completed</p>
            <p className="text-xs text-theme-tertiary">Complete your first project to earn this badge</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 rounded-lg bg-theme-tertiary/50 border border-theme-primary">
          <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
            <Award size={18} className="text-purple-500" />
          </div>
          <div>
            <p className="text-sm font-medium text-theme-primary">Team Player</p>
            <p className="text-xs text-theme-tertiary">Join 5 projects to unlock</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-3 rounded-lg bg-theme-tertiary/50 border border-theme-primary opacity-50">
          <div className="w-10 h-10 rounded-lg bg-gray-500/10 flex items-center justify-center">
            <Award size={18} className="text-gray-500" />
          </div>
          <div>
            <p className="text-sm font-medium text-theme-primary">S-Rank Developer</p>
            <p className="text-xs text-theme-tertiary">Reach S rank to unlock</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AchievementsCard;
