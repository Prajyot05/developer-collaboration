import React from "react";

const TagButton = ({ title, color }: { title: string; color: string }) => {
  return (
    <div
      className={`${color} text-gray-500 px-2 rounded-full inline-block border-2 border-gray-400 mr-1`}
    >
      {title}
    </div>
  );
};

export default TagButton;
