import React from "react";

const page = () => {
  const data = [
    {
      rank: "#5",
      name: "Mayur Tummewar",
      institute: "Pimpri Chinchwad College of Engineering & Research",
      points: 3000,
    },
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


    // Add more data here
  ];
  return (
    <>
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
    </>
  );
};

export default page;
