"use client";

import React, { useState, useEffect } from 'react'
import { IoMdArrowDropdown } from "react-icons/io";
const Sidebar1 = () => {
    const [query, setQuery] = useState("");
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [selectRank, setSelectRank] = useState<string[]>([]);
    const [isRankOpen, setIsRankOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const items = ["Apple", "Banana", "Cherry", "Date", "Grape", "Mango", "Orange"];
    const rank = ["S", "A", "B", "C", "D", "E", "F"];

    const filteredItems = items.filter(item =>
        item.toLowerCase().includes(query.toLowerCase())
    );

    const filteredRank = rank.filter(item =>
        item.toLowerCase().includes(query.toLowerCase())
    );

    const handleCheckboxChange = (item: string) => {
        setSelectedItems(prev =>
            prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
        );
    };
    const handleRankChange = (item: string) => {
        setSelectRank(prev =>
            prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
        );
    }



    return (
        <div className={`fixed h-full w-[22%] text-gray-800  px-4 py-6  `}>

            <div className='flex justify-between'>
                <div><span className='text-green-700'>2000</span> project found </div>
                <div className='bg-[#e8f0fe] rounded-md py-1 px-5 text-[#014aad]'>clear filter</div>
            </div>

            {/* Search Bar */}
            <div className=" max-w-md py-3 mx-auto">
                <input
                    type="text"
                    placeholder="Search..."
                    className="w-full px-2 py-1 border border-gray-300 rounded-lg"
                />
            </div>


            {/* Filter */}

            <div
                className="w-full flex items-center justify-between py-2 bg-white"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
                <div>Domain</div>
                <IoMdArrowDropdown className={`text-2xl transition-transform ${isDropdownOpen ? 'rotate-180' : 'rotate-0'}`} />
            </div>

            {isDropdownOpen && (
                <div>
                    <ul className=" w-full flex flex-col flex-wrap  mt-1 bg-white p-2 max-h-40 overflow-auto">
                        {filteredItems.length > 0 ? (
                            filteredItems.map((item, index) => (
                                <li key={index} className="flex text-base items-center p-1 hover:bg-gray-100">
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

                    <div className=" max-w-md py-3 mx-auto">
                        <input
                            type="text"
                            placeholder="Enter Domain"
                            className="w-full px-2 py-1 border border-gray-300 rounded-lg"
                        />
                    </div>
                </div>


            )}
            <hr className="my-2 border-gray-300" />

            {/* Institute */}
            <div className=" max-w-md py-3 mx-auto">
                <div className='py-2 flex items-center justify-between'>
                    <div>Institute</div>
                    <IoMdArrowDropdown className={`text-2xl`} />
                </div>
                <input
                    type="text"
                    placeholder="Mention institute name here."
                    className="w-full px-2 py-1 border border-gray-300 rounded-lg"
                />
            </div>
            <hr className="my-2 border-gray-300" />

            {/* Rank */}

            <div
                className="w-full flex items-center justify-between py-2 bg-white"
                onClick={() => setIsRankOpen(!isRankOpen)}
            >
                <div>Rank</div>
                <IoMdArrowDropdown className={`text-2xl transition-transform ${isRankOpen ? 'rotate-180' : 'rotate-0'}`} />
            </div>

            {isRankOpen && (
                <ul className=" w-full flex flex-col flex-wrap  mt-1 bg-white p-2  max-h-40 overflow-auto">
                    {filteredRank.length > 0 ? (
                        filteredRank.map((item, index) => (
                            <li key={index} className="flex items-center p-1 hover:bg-gray-100">
                                <input
                                    type="checkbox"
                                    checked={selectRank.includes(item)}
                                    onChange={() => handleRankChange(item)}
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
            {/* Others */}
            <div className='py-2 flex items-center justify-between'>Other<IoMdArrowDropdown className={`text-2xl `} /></div>

        </div>
    )
}

export default Sidebar1
