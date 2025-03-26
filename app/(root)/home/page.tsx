import { Search } from "lucide-react";
import Image from "next/image";
import React from "react";
import Hero from "../components/Hero";

const page = () => {
  return (
    <div className="mt-16 relative h-screen overflow-clip">
      <div className="pl-10">
        <Image
          src="/devlogo.png"
          alt="Developer Logo"
          width={700}
          height={200}
          className="mb-8 -ms-5"
        />
        <h1 className="text-[#878787] font-lato text-3xl font-bold w-full md:w-[60%] mb-14 -ms-3">
          A Platform where Developers Connect,Communicate and Collaborate..
        </h1>
        <p className="text-xl font-lato font-bold text-[#545454]">Domain</p>
        <div className="flex relative -ms-3 w-full gap-5 mb-3">
          <Search className="size-6 absolute top-8 left-5" />
          <input
            type="text"
            placeholder="Web Development."
            className="ps-14 px-5 py-4 my-4 border-2 focus:outline-none w-[33rem] text-xl text-black border-[#545454] rounded-full placeholder:font-dmsans placeholder:text-xl"
          />
        </div>
        <p className="text-xl font-lato font-bold text-[#545454]">Institute</p>
        <div className="flex relative -ms-3 w-full gap-5">
          <Search className="size-6 absolute top-8 left-5" />
          <input
            type="text"
            placeholder="Web Development."
            className="ps-14 px-5 py-4 my-4 border-2 focus:outline-none w-[33rem] text-xl text-black border-[#545454] rounded-full placeholder:font-dmsans placeholder:text-xl"
          />
        </div>
        <button className="text-white -ms-3 font-lato bg-[#004AAD] my-4 py-4 px-3 w-[14rem] text-2xl rounded-full">
          Search
        </button>
      </div>
      <div className="absolute">
        <Hero />
      </div>
    </div>
  );
};

export default page;
