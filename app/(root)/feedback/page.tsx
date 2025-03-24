import { Search } from "lucide-react";
import React from "react";

const Page = () => {
  return (
    <div className="px-28 py-6 ">
      <div className="text-3xl font-dmsans ">Hello, Rohit!</div>
      <div className="bg-[#FEE9E8] mt-4 mb-10 w-[90%]  rounded-2xl p-6 flex items-center justify-between shadow-md">
        <div className="max-w-4xl">
          <h2 className="text-2xl ">Welcome to Feedback Page.</h2>
          <p className="text-gray-700 mt-2 w-[85%]">
            Your feedback is important to us! Share your thoughts, suggestions,
            or any ideas for improvement. Help us make the website better by
            letting us know how we can enhance your experience. We value your
            input!
          </p>
        </div>
        <div className="w-32 h-32 flex-shrink-0  items-center">
          <img src="/feedback.png" alt="" className="p-3 rounded-xl bg-white" />
        </div>
      </div>

      <div className="text-4xl mb-3">Submit Your Feedback</div>
      <hr className="border-gray-300" />
      <form>
        {/* Input Field */}
        <div className="mt-5 w-[60%] py-2 border-2 rounded-2xl border-slate-400">
          <textarea
            placeholder="Describe your feedback here."
            className="w-full h-52 px-6 resize-none text-2xl font-lato focus:outline-none" // h-40 for big textarea
            rows={6} // Default height
            required
          />
        </div>
        <p className="font-extrabold font-lato">
          **Note: Please don't include any sensitive information
        </p>
        <div className="flex items-center gap-4 py-4">
          <input type="checkbox" id="terms" className="size-6" required />
          <label htmlFor="terms" className="text-lg font-bold">
            We may email you for more information or updates
          </label>
        </div>

        {/* Buttons */}
        <div className="flex justify-between space-x-4 py-4">
          <button
            type="submit"
            className="px-12 py-3 text-xl bg-[#839DBF] text-white rounded-xl"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Page;
