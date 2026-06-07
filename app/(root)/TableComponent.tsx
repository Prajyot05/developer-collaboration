"use client";
import { useRouter } from "next/navigation";
import React from "react";

const data: Array<{id: number; platform: string; title: string; description: string; date: string;}> = [];

const TableComponent = () => {
  const router = useRouter();

  return (
    <table className="w-full">
      <tbody>
        {data.length === 0 ? (
          <tr>
            <td className="px-4 py-8 text-center text-sm text-theme-secondary">
              No items to display.
            </td>
          </tr>
        ) : (
          data.map((item) => (
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
          ))
        )}
      </tbody>
    </table>
  );
};

export default TableComponent;
