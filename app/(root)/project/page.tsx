"use client";

import React from "react";
import ProjectList from "./ProjectList";
import Sidebar1 from "./Sidebar1";

const Page = () => {
  return (
    <div className="flex w-full min-h-screen bg-theme-primary">
      <Sidebar1 />
      <ProjectList />
    </div>
  );
};

export default Page;
