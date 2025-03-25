import { Search } from "lucide-react";
import React from "react";

const Page = () => {
  return (
    <div className="px-28 py-6 ">
      <div className="text-3xl font-dmsans ">Hello, Rohit!</div>
      <div className="bg-[#FEF9E8] mt-4 mb-10 w-full sm:w-[90%]  rounded-2xl p-6 flex flex-col gap-6 md:flex-row items-center md:justify-between shadow-md">
        <div className="max-w-4xl">
          <h2 className="text-2xl ">Welcome to Help Page.</h2>
          <p className="text-gray-700 mt-2 w-[85%]">
            Have any questions or need assistance? Our Help page is the perfect
            place to reach out. Submit your doubts or concerns, and our admin
            team will be happy to assist you in resolving any issues or
            answering your queries about the website.
          </p>
        </div>
        <div className="w-32 h-32 flex-shrink-0  items-center">
          <img src="/help.png" alt="" className="p-2 rounded-xl bg-white" />
        </div>
      </div>

      <div className="text-4xl mb-3">Help</div>
      <hr className="border-gray-300" />
      <div className=" relative w-full mb-10">
        <Search className="size-6 absolute top-8 left-5" />
        <input
          type="text"
          placeholder="Describe your issues here."
          className="ps-14 px-5 py-3 my-4 border focus:outline-none w-full md:w-[60%] text-xl text-black border-[#545454] rounded-full placeholder:font-dmsans placeholder:text-xl"
        />
        <button className="text-white font-lato bg-[#004AAD] md:ms-5 py-3 px-8 w-[10rem] lg:w-[20%] text-xl rounded-full">
          Search
        </button>
      </div>
      <div className="text-4xl mb-3">FAQs</div>
      <hr className="border-gray-300" />
    </div>
  );
};

export default Page;
