"use client";

import React from "react";
import ProjectList from "./ProjectList";
import Sidebar1 from "./Sidebar1";

const page = () => {
  return (
    <>
      <div className="w-full fixed h-16 bg-white shadow-sm border-t-2 shadow-gray-300 lg:hidden z-30">
        <div className="lg:hidden flex justify-start ml-5 items-center mt-4 gap-10">
          <div>
            <span className="text-green-600 px-1">2000</span>project found{" "}
          </div>
          <div className="bg-[#e8f0fe] rounded-md py-1 px-5 text-[#014aad]">
            clear filter
          </div>
        </div>
      </div>
      <div className="flex w-full h-full">
        <Sidebar1 />
        <ProjectList />
      </div>
    </>
  );
};

export default page;
