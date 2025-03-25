import React from "react";
import TabsComponent2 from "../TabsComponent2";
import TableComponent from "../TableComponent";

// Tab contents with table components
const tabContents = [
  <TableComponent key="all-jobs" />,
  <TableComponent key="active" />,
  <TableComponent key="draft" />,
];

const Page = () => {
  const tabTitles = ["Submitted(56)", "Bookmarks(23)", "Rejected(23)"];
  return (
    <div className="px-28 py-6 ">
      <div className="text-3xl font-dmsans ">Hello, Rohit!</div>
      <div className="bg-[#E8F0FE] mt-4 mb-10 w-full sm:w-[90%]  rounded-2xl p-6 flex flex-col gap-6  items-center md:flex-row md:justify-between shadow-md">
        <div className="max-w-4xl">
          <h2 className="text-2xl ">Welcome to Application Status.</h2>
          <p className="text-gray-700 mt-2">
            This page is designed to help you track and manage your project
            collaboration applications with ease. View the status of your
            submissions, from drafts to approved or rejected applications, all
            in one place. Stay organized, keep track of your progress, and
            refine your proposals for future opportunities.
          </p>
        </div>
        <div className="w-32 h-32 flex-shrink-0">
          <img src="/post.png" alt="" />
        </div>
      </div>

      <div className="text-4xl mb-6">Appilcations</div>
      <TabsComponent2 tabTitles={tabTitles} tabContents={tabContents} />
    </div>
  );
};

export default Page;
