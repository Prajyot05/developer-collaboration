"use client";
import React from "react";
import Detail from "./Detail";
import Sidebar2 from "./Sidebar2";
import { useParams } from "next/navigation";

export default function ProjectDetail() {
  const params = useParams();
  const id = params.id as string;

  return (
    <div className="flex min-h-screen bg-theme-primary">
      <Detail id={id} />
      <Sidebar2 id={id} />
    </div>
  );
}
