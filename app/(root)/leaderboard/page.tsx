import React from "react";

const page = () => {
  const data = [
    {
      rank: "#1",
      name: "Pranav Ramane",
      institute: "Pimpri Chinchwad College of Engineering & Research",
      points: 3000,
    },
    {
      rank: "#2",
      name: "Adarsh Thakare",
      institute: "Pimpri Chinchwad College of Engineering & Research",
      points: 3000,
    },
    {
      rank: "#3",
      name: "Prajyot Tayde",
      institute: "Pimpri Chinchwad College of Engineering & Research",
      points: 3000,
    },
    {
      rank: "#4",
      name: "Rohit Tare",
      institute: "Pimpri Chinchwad College of Engineering & Research",
      points: 3000,
    },
    {
      rank: "#5",
      name: "Mayur Tummewar",
      institute: "Pimpri Chinchwad College of Engineering & Research",
      points: 3000,
    },

    // Add more data here
  ];
  return (
    <div className="ms-[10%] mt-6">
      <p className="text-5xl font-dmsans mb-6 ">Leaderboard</p>

      <div className="w-[95%] flex justify-between gap-0 border-r border-t border-l overflow-auto">
        <div className="py-4 text-[#F6C852] bg-[#fcecb654] text-xl font-dmsans border-[#DADCE0] border-b-black border-b-2   px-[43px] ">
          S Rank
        </div>
        <div className="py-4 text-[#A50000] text-xl font-dmsans border-[#DADCE0]  px-[43px]">
          A+ Rank
        </div>
        <div className="py-4 text-[#A50000] text-xl font-dmsans border-[#DADCE0]  px-[43px]">
          A Rank
        </div>
        <div className="py-4 text-[#004AAD] text-xl font-dmsans border-[#DADCE0]  px-[43px]">
          B+ Rank
        </div>
        <div className="py-4 text-[#004AAD] text-xl font-dmsans border-[#DADCE0]  px-[43px]">
          B Rank
        </div>

        <div className="py-4 text-[#B85BD7] text-xl font-dmsans border-[#DADCE0]  px-[43px]">
          C Rank
        </div>
        <div className="py-4 text-[#02B902] text-xl font-dmsans border-[#DADCE0]  px-[43px]">
          D Rank
        </div>
        <div className="py-4 text-[#848484] text-xl font-dmsans border-[#DADCE0]  border-r px-[43px]">
          E Rank
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-[95%] border-collapse border border-[#DADCE0]">
          {/* Table Head */}
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-[#DADCE0] text-[#848484] px-4 py-3 text-left font-dmsans text-xl font-normal">
                Rank
              </th>
              <th className="border border-[#DADCE0] text-[#848484] px-4 py-3 text-left font-dmsans text-xl font-normal">
                User Name
              </th>
              <th className="border border-[#DADCE0] text-[#848484] px-4 py-3 text-left font-dmsans text-xl font-normal">
                User Institute
              </th>
              <th className="border border-[#DADCE0] text-[#848484] px-4 py-3 text-left font-dmsans text-xl font-normal">
                Points
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {data.map((user, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border border-[#DADCE0] px-4 py-3  text-[#848484] font-dmsans text-xl font-normal">
                  {user.rank}
                </td>
                <td className="border border-[#DADCE0] px-4 py-3  text-[#848484] font-dmsans text-xl font-normal">
                  {user.name}
                </td>
                <td className="border border-[#DADCE0] px-4 py-3  text-[#848484] font-dmsans text-xl font-normal">
                  {user.institute}
                </td>
                <td className="border border-[#DADCE0] px-4 py-3  text-[#848484] font-dmsans text-xl font-normal">
                  {user.points}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default page;
