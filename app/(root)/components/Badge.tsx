import React, { FC } from "react";

type BadgeProps = {
  title: string;
  color: string;
};

const colorMap: { [key: string]: string } = {
  red: "border-red-500 bg-red-100 text-red-500",
  blue: "border-blue-500 bg-blue-100 text-blue-500",
  yellow: "border-[#F2AF04] bg-[#FEF9E8] text-[#F2AF04]",
  green: "border-green-500 bg-green-100 text-green-500",
  purple: "border-purple-500 bg-purple-100 text-purple-500",
  pink: "border-pink-500 bg-pink-100 text-pink-500",
};

const Badge: FC<BadgeProps> = ({ title, color }) => {
  return (
    <div
      className={`border-2 m-6 mx-8 py-6 rounded-md ${
        colorMap[color] || "border-gray-600"
      }`}
    >
      <div
        className={`text-center text-8xl font-dmsans p-2 rounded-md ${
          colorMap[color] || "bg-gray-200 text-gray-500"
        }`}
      >
        {title}
      </div>
    </div>
  );
};

export default Badge;
