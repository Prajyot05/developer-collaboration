import { Menu, Search } from "lucide-react";
import Form from "next/form";
import React from "react";

const InputBar = () => {
  return (
    <Form
      action="/"
      scroll={false}
      className="flex flex-row justify-between items-center w-2/3"
    >
      <input
        name="query"
        placeholder="Search for projects"
        className="flex-1 font-lato bg-gray-100 w-full h-auto outline-none border-gray-300 border-2 px-5 rounded-xl my-6 py-3 placeholder:text-xl w-2/3"
      />
      <button type="submit" className="flex justify-center items-center">
        <Search className="size-5 relative right-20" />
      </button>
      <Menu className="size-5 relative right-16" />
    </Form>
  );
};

export default InputBar;
