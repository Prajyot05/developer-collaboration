"use client";

import { useState } from "react";

interface SwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export default function Switch({ checked, onCheckedChange }: SwitchProps) {
  return (
    <button
      className={`w-14 h-7 flex items-center rounded-full p-1 transition-colors ${
        checked ? "bg-green-500 justify-end" : "bg-gray-300 justify-start"
      }`}
      onClick={() => onCheckedChange(!checked)}
    >
      <div className="w-5 h-5 bg-white rounded-full shadow-md"></div>
    </button>
  );
}
