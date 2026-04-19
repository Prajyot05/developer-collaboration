"use client";
import { useRouter } from "next/navigation";
import React from "react";

const data = [
  { id: 1, platform: "LinkedIn", title: "Pranav, Radhika Gupta has a new post", description: "To every woman who sometimes wonders, can I do it...", date: "Mar 17" },
  { id: 2, platform: "LinkedIn", title: "Pranav, Nikhil Kamath has a new post", description: "Digressing from the post, but it's about time...", date: "Mar 14" },
  { id: 3, platform: "LinkedIn", title: "Pranav, Nikhil Kamath has a new post", description: "Digressing from the post, but it's about time...", date: "Mar 12" },
];

const TableComponent = () => {
  const router = useRouter();

  return (
    <table className="w-full">
      <tbody>
        {data.map((item) => (
          <tr
            key={item.id}
            className="border-b border-theme-primary cursor-pointer hover:bg-theme-tertiary/30 transition-colors"
            onClick={() => router.push(`/notification/${item.id}`)}
          >
            <td className="px-4 py-3">
              <input
                type="checkbox"
                onClick={(e) => e.stopPropagation()}
                className="accent-brand-500"
              />
            </td>
            <td className="px-4 py-3 text-xs font-medium text-brand-500 dark:text-brand-400">{item.platform}</td>
            <td className="px-4 py-3">
              <span className="text-sm font-medium text-theme-primary">{item.title}</span>
              <span className="text-sm text-theme-tertiary"> — {item.description}</span>
            </td>
            <td className="px-4 py-3 text-xs text-theme-tertiary whitespace-nowrap">{item.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableComponent;
