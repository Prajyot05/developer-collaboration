import React, { useState } from "react";
import Link from "next/link";
const Sidebar2 = () => {
  const [query, setQuery] = useState("");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [formData, setFormData] = useState(""); // Form data

  const items = ["User1", "User2", "User3"];

  const filteredItems = items.filter((item) =>
    item.toLowerCase().includes(query.toLowerCase())
  );

  const handleCheckboxChange = (item: string) => {
    setSelectedItems((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Application Submitted: ${formData}`);
    setIsModalOpen(false); // Close modal after submission
  };

  return (
    <div className={`fixed z-10 h-full w-[22%] text-gray-800 px-4 py-6`}>
      <div className="font-lato text-gray-500 font-medium text-lg">
        <Link
          href="/project"
          className="font-dmsans text-[14px] text-gray-500 font-medium text-lg"
        >
          Back
        </Link>
      </div>
      <hr className="my-2 border-gray-300" />
      <div
        className="w-full py-2 text-lg bg-white cursor-pointer"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        Team-mates
      </div>
      {isDropdownOpen && (
        <ul className="w-full flex flex-col flex-wrap mt-1 bg-white p-2 max-h-40 overflow-auto">
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => (
              <li
                key={index}
                className="flex text-base items-center p-1 hover:bg-gray-100"
              >
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item)}
                  onChange={() => handleCheckboxChange(item)}
                  className="mr-2"
                />
                {item}
              </li>
            ))
          ) : (
            <li className="text-gray-500 p-1">No results found</li>
          )}
        </ul>
      )}
      <hr className="my-2 border-gray-300" />

      {/* Open Modal Button */}
      <div
        className="text-lg text-[#014aad] cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        Apply
      </div>
      <hr className="my-2 border-gray-300" />

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={() => setIsModalOpen(false)} // Click outside to close modal
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg w-1/3"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
          >
            <h2 className="text-3xl font-semibold mb-4">Application Form</h2>
            <hr className="py-2 border-gray-300" />
            <form onSubmit={handleSubmit}>

              {/* Input Field */}
              <div className="py-2 border rounded-md border-slate-400">
                <textarea
                  placeholder="Enter details..."
                  value={formData}
                  onChange={(e) => setFormData(e.target.value)}
                  className="w-full h-52 p-2 resize-none focus:outline-none" // h-40 for big textarea
                  rows={6} // Default height
                  required
                />
              </div>

              {/* Terms & Conditions Checkbox */}
              <div className="flex items-center gap-4 py-4">
                <input type="checkbox" id="terms" required />
                <label htmlFor="terms" className="text-sm">
                  I have read all the data regarding the project and accept all the terms & conditions.
                </label>
              </div>

              {/* Buttons */}
              <div className="flex justify-between space-x-4 py-4">
                <button type="submit" className="px-8 py-2 bg-[#839DBF] text-white rounded-xl">
                  Submit
                </button>
                <button
                  type="button"
                  className="px-8 py-2 rounded-xl border-[#839DBF] border-solid border-[1px]"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Sidebar2;

