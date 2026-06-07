"use client";

import React from "react";
import ProjectList from "./ProjectList";
import Sidebar1 from "./Sidebar1";

const Page = () => {
  return (
    <div className="flex w-full min-h-screen bg-theme-primary">
      <React.Suspense fallback={<div className="p-4">Loading filters...</div>}>
        <Sidebar1 />
      </React.Suspense>
      <React.Suspense fallback={<div className="p-8 w-full">Loading projects...</div>}>
        <ProjectList />
      </React.Suspense>
    </div>
  );
};

export default Page;
