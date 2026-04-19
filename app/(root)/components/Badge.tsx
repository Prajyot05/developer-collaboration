import React, { FC } from "react";

type BadgeProps = {
  title: string;
  color: string;
};

const colorMap: { [key: string]: { bg: string; border: string; text: string; glow: string } } = {
  red: { bg: "bg-red-500/10", border: "border-red-500/30", text: "text-red-500", glow: "shadow-[0_0_20px_rgba(239,68,68,0.3)]" },
  blue: { bg: "bg-blue-500/10", border: "border-blue-500/30", text: "text-blue-500", glow: "shadow-[0_0_20px_rgba(59,130,246,0.3)]" },
  yellow: { bg: "bg-amber-500/10", border: "border-amber-500/30", text: "text-amber-500", glow: "shadow-[0_0_20px_rgba(245,158,11,0.3)]" },
  green: { bg: "bg-green-500/10", border: "border-green-500/30", text: "text-green-500", glow: "shadow-[0_0_20px_rgba(16,185,129,0.3)]" },
  purple: { bg: "bg-purple-500/10", border: "border-purple-500/30", text: "text-purple-500", glow: "shadow-[0_0_20px_rgba(139,92,246,0.3)]" },
};

const defaultColor = { bg: "bg-gray-500/10", border: "border-gray-500/30", text: "text-gray-500", glow: "" };

const Badge: FC<BadgeProps> = ({ title, color }) => {
  const c = colorMap[color] || defaultColor;
  return (
    <div className={`border-2 m-4 mx-6 py-5 rounded-xl ${c.bg} ${c.border} ${c.glow} transition-shadow duration-300`}>
      <div className={`text-center text-7xl font-bold font-dmsans p-2 ${c.text}`}>
        {title}
      </div>
    </div>
  );
};

export default Badge;
