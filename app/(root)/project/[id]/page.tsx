"use client"; // Ensure this file runs on the client side

import { useParams } from "next/navigation";
import Detail from "./Detail";
import Sidebar2 from "./Sidebar2";

export default function ProjectDetail() {
    const params = useParams();
    const id = params.id as string;
    return (
        <div className="flex">
            <Detail id={id} />
            <Sidebar2 id={id}/>
        </div>
    );
}
