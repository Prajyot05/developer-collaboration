"use client";

import { useParams } from "next/navigation";
import React from "react";
import { FaUser } from "react-icons/fa";
const dummyEmails = [
    {
        id: "1",
        sender: "Radhika Gupta",
        subject: "New Post for You",
        body: "To every woman who sometimes wonders, can I do it, here is a thought...",
        date: "March 17, 2025",
    },
    {
        id: "2",
        sender: "Nikhil Kamath",
        subject: "Indian Market Insights",
        body: "Digressing from the post, but it's about time we need an Indian answer to...",
        date: "March 14, 2025",
    },
    {
        id: "3",
        sender: "Nikhil Kamath",
        subject: "Indian Market Trends",
        body: "Digressing from the post, but it's about time we need an Indian answer to...",
        date: "March 12, 2025",
    },
];

const EmailDetailsPage = () => {
    const params = useParams();
    const email = dummyEmails.find((item) => item.id === params.id);

    if (!email) {
        return <div className="p-6 text-center text-red-500">Email not found</div>;
    }

    return (
        <div className="w-full flex items-center justify-center py-20  mx-auto bg-white  rounded-lg">
            <div className="w-[80%]">
                <h1 className="text-2xl font-semibold py-4">{email.subject}</h1>
                <p className="text-sm flex gap-3 items-center text-gray-500 mb-4"> <FaUser className="text-2xl" /> {email.sender}</p>
                <p className="text-gray-700">{email.body}</p>
                <p className="text-sm text-gray-400 mt-4">Received on: {email.date}</p>
            </div>

        </div>
    );
};

export default EmailDetailsPage;

