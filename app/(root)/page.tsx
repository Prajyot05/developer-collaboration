import React from "react";
import Hero from "./components/Hero";

const page = () => {
  return (
    <div className="h-screen ml-5 font-lato relative">
      <div className="h-full bg-black text-white w-1/2 absolute top-0 left-0">
        Ithe tumcha kaam kara
      </div>
      <div className="absolute">
        <Hero />
      </div>
    </div>
  );
};

export default page;
