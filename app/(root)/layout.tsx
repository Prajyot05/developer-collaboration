import React from "react";
import Sidebar from "../components/Sidebar";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex flex-row">
      <Sidebar />
      <div className="ml-[20%] w-full">{children}</div>
    </main>
  );
};

export default layout;
