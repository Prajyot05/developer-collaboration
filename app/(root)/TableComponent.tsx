"use client";
import { useRouter } from "next/navigation";
import React from "react";
const data = [
  {
    id: 1,
    platform: "LinkedIn",
    title: "Pranav, Radhika Gupta has a new post for you",
    description: "To every woman who sometimes wonders, can I do it, here is a thought...",
    date: "Mar 17",
  },
  {
    id: 2,
    platform: "LinkedIn",
    title: "Pranav, Nikhil Kamath has a new post for you",
    description: "Digressing from the post, but it's about time we need an Indian answer to...",
    date: "Mar 14",
  },
  {
    id: 3,
    platform: "LinkedIn",
    title: "Pranav, Nikhil Kamath has a new post for you",
    description: "Digressing from the post, but it's about time we need an Indian answer to...",
    date: "Mar 12",
  },
];



const TableComponent = () => {
  const router = useRouter();

  return (
    <table className="w-full">
      <tbody>
        {data.map((item, index) => (
          <tr
            key={index}
            className="border-b cursor-pointer hover:bg-gray-100"
            onClick={() => router.push(`/notification/${item.id}`)}
          >
            <td className="px-4 py-2">
              <input type="checkbox" onClick={(e) => e.stopPropagation()} />
            </td>
            <td className="px-4 py-2">{item.platform}</td>
            <td className="px-4 py-2">
              <span className="font-semibold">{item.title}</span> - {item.description}
            </td>
            <td className="px-4 py-2 text-gray-500">{item.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableComponent;
