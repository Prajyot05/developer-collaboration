import React from "react";


const data = [
    {
      platform: "LinkedIn",
      title: "Pranav, Radhika Gupta has a new post for you",
      description: "To every woman who sometimes wonders, can I do it, here is a thought...",
      date: "Mar 17",
    },
    {
      platform: "LinkedIn",
      title: "Pranav, Nikhil Kamath has a new post for you",
      description: "Digressing from the post, but it's about time we need an Indian answer to...",
      date: "Mar 14",
    },
    {
      platform: "LinkedIn",
      title: "Pranav, Nikhil Kamath has a new post for you",
      description: "Digressing from the post, but it's about time we need an Indian answer to...",
      date: "Mar 12",
    },
  ];
  
  // Define a TableComponent
  const TableComponent = () => {
    return (
      <>
        <table className="w-full">
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="px-4 py-2">
                  <input type="checkbox" />
                </td>
                <td className="px-4 py-2">{item.platform}</td>
                <td className="px-4 py-2">
                  <span className="font-semibold">{item.title}</span> - {item.description}
                </td>
                <td className="px-4 py-2 text-gray-500">{item.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  };
  export default TableComponent;