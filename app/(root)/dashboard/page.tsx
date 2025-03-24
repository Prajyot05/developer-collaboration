import React from "react";
import TabsComponent2 from "../TabsComponent2";
import TableComponent from "../TableComponent";

// Tab contents with table components
const tabContents = [
  <TableComponent key="all-jobs" />,
  <TableComponent key="active" />,
  <TableComponent key="draft" />,
];

const page = () => {
  const tabTitles = ["Announcements (10)", "Projects(02)"];
  return (
    <div className="px-28 py-6 ">
      <div className="text-3xl font-dmsans">Hello, Rohit!</div>
      <div className="bg-[#E8FEE9] mt-4 mb-10 w-[90%]  rounded-2xl p-6 flex items-center justify-between shadow-md">
        <div className="max-w-4xl">
          <h2 className="text-2xl ">Welcome to User Dashboard.</h2>
          <p className="text-gray-700 mt-2">
            Here, you can stay up-to-date with all the latest notifications and
            announcements related to your selected projects. Get real-time
            updates, important alerts, and stay informed about key developments
            and opportunities. Keep everything at your fingertips and never miss
            an important detail about your ongoing collaborations.
          </p>
        </div>
        <div className="w-32 h-32 flex-shrink-0">
          <img src="/image.png" alt="" className="bg-white rounded-xl" />
        </div>
      </div>

      <div className="text-4xl mb-6">Dashboard</div>
      <TabsComponent2 tabTitles={tabTitles} tabContents={tabContents} />
    </div>
  );
};

export default page;
