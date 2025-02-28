import React from "react";

const EditTag = ({ tag, onDelete }: { tag: string; onDelete: () => void }) => {
  return (
    <div className="inline-flex items-center bg-white border-2 border-gray-300 rounded-full mb-1 px-3 py-2">
      <span className="text-gray-700 text-sm font-medium">{tag}</span>
      <button
        onClick={onDelete}
        className="ml-2 text-gray-500 hover:text-black focus:outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
};

export default EditTag;
