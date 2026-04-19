"use client";

import React, { useState } from "react";
import { ChevronDown, Search, Filter, X } from "lucide-react";

const Sidebar1 = () => {
  const [query, setQuery] = useState("");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [selectRank, setSelectRank] = useState<string[]>([]);
  const [isRankOpen, setIsRankOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const items = [
    "Web-dev",
    "App-dev",
    "Data Science",
    "Machine Learning",
    "AI",
    "IOT",
    "Cyber Security",
  ];
  const rank = ["S", "A+", "A", "B+", "B", "C", "D", "E"];

  const filteredItems = items.filter((item) =>
    item.toLowerCase().includes(query.toLowerCase())
  );

  const handleCheckboxChange = (item: string) => {
    setSelectedItems((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const handleRankChange = (item: string) => {
    setSelectRank((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const clearFilters = () => {
    setSelectedItems([]);
    setSelectRank([]);
    setQuery("");
  };

  const totalFilters = selectedItems.length + selectRank.length;

  return (
    <>
      {/* Toggle Button for Mobile */}
      <button
        className="lg:hidden fixed top-20 right-4 z-40 p-2.5 rounded-xl bg-theme-card border border-theme-primary shadow-md text-theme-secondary hover:text-theme-primary transition-colors"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <Filter size={18} />
        {totalFilters > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-brand-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
            {totalFilters}
          </span>
        )}
      </button>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed z-40 mt-0 h-[calc(100vh-4rem)] w-[20rem] bg-theme-sidebar border-r border-theme-primary px-5 py-6 overflow-y-auto transition-transform duration-300 lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-theme-tertiary" />
            <span className="text-sm font-semibold text-theme-primary">Filters</span>
            {totalFilters > 0 && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-brand-500/10 text-brand-500 dark:text-brand-400 font-medium">
                {totalFilters}
              </span>
            )}
          </div>
          {totalFilters > 0 && (
            <button
              onClick={clearFilters}
              className="text-xs font-medium text-brand-500 dark:text-brand-400 hover:text-brand-600 transition-colors"
            >
              Clear all
            </button>
          )}
        </div>

        {/* Search Bar */}
        <div className="relative mb-5">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-theme-tertiary" size={14} />
          <input
            type="text"
            placeholder="Search filters..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2.5 text-sm bg-theme-tertiary border border-theme-primary rounded-lg text-theme-primary placeholder:text-theme-tertiary focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition-all"
          />
        </div>

        {/* Domain Filter */}
        <div className="mb-4">
          <button
            className="w-full flex items-center justify-between py-2 text-sm font-semibold text-theme-primary"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            Domain
            <ChevronDown
              size={16}
              className={`text-theme-tertiary transition-transform duration-200 ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isDropdownOpen && (
            <div className="mt-1 space-y-0.5">
              {filteredItems.map((item) => (
                <label
                  key={item}
                  className="flex items-center gap-2.5 px-2 py-2 rounded-lg hover:bg-theme-tertiary cursor-pointer transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item)}
                    onChange={() => handleCheckboxChange(item)}
                    className="w-4 h-4 rounded border-theme-secondary accent-brand-500"
                  />
                  <span className="text-sm text-theme-secondary">{item}</span>
                </label>
              ))}
              {filteredItems.length === 0 && (
                <p className="text-xs text-theme-tertiary px-2 py-2">No results found</p>
              )}
            </div>
          )}
        </div>

        <hr className="border-theme-primary mb-4" />

        {/* Institute */}
        <div className="mb-4">
          <p className="text-sm font-semibold text-theme-primary mb-2">Institute</p>
          <input
            type="text"
            placeholder="Enter institute name..."
            className="w-full px-3 py-2.5 text-sm bg-theme-tertiary border border-theme-primary rounded-lg text-theme-primary placeholder:text-theme-tertiary focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition-all"
          />
        </div>

        <hr className="border-theme-primary mb-4" />

        {/* Rank Filter */}
        <div className="mb-4">
          <button
            className="w-full flex items-center justify-between py-2 text-sm font-semibold text-theme-primary"
            onClick={() => setIsRankOpen(!isRankOpen)}
          >
            Rank
            <ChevronDown
              size={16}
              className={`text-theme-tertiary transition-transform duration-200 ${
                isRankOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {isRankOpen && (
            <div className="mt-1 flex flex-wrap gap-2">
              {rank.map((item) => (
                <button
                  key={item}
                  onClick={() => handleRankChange(item)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-all duration-200 ${
                    selectRank.includes(item)
                      ? "bg-brand-500/15 border-brand-500/30 text-brand-500 dark:text-brand-400"
                      : "bg-theme-tertiary border-theme-primary text-theme-secondary hover:border-theme-secondary"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>

        <hr className="border-theme-primary mb-4" />

        {/* Selected Filters Tags */}
        {totalFilters > 0 && (
          <div className="flex flex-wrap gap-2">
            {selectedItems.map((item) => (
              <span
                key={item}
                className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-brand-500/10 text-brand-500 dark:text-brand-400 border border-brand-500/20"
              >
                {item}
                <X
                  size={12}
                  className="cursor-pointer hover:text-brand-600"
                  onClick={() => handleCheckboxChange(item)}
                />
              </span>
            ))}
            {selectRank.map((item) => (
              <span
                key={item}
                className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-purple-500/10 text-purple-500 dark:text-purple-400 border border-purple-500/20"
              >
                Rank {item}
                <X
                  size={12}
                  className="cursor-pointer hover:text-purple-600"
                  onClick={() => handleRankChange(item)}
                />
              </span>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Sidebar1;
