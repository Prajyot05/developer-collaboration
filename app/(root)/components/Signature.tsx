"use client";

import Image from "next/image";
import React, { useState } from "react";
import { Upload, ImageIcon } from "lucide-react";

const SignatureCard = () => {
  const [image, setImage] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      {image ? (
        <Image
          src={image}
          alt="Signature Preview"
          width={200}
          height={100}
          className="w-full object-contain mb-4 rounded-lg"
        />
      ) : (
        <div className="w-full flex flex-col items-center justify-center py-6 mb-4 text-theme-tertiary">
          <ImageIcon size={24} className="mb-1" />
          <p className="text-sm">No signature</p>
        </div>
      )}

      <label className="w-full flex flex-col items-center cursor-pointer">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
        <div className="flex items-center gap-2 text-sm font-medium bg-gradient-to-r from-brand-500 to-purple-600 text-white text-center w-[70%] py-2 rounded-lg hover:from-brand-600 hover:to-purple-700 transition-all duration-200">
          <Upload size={14} className="ml-auto" />
          <span className="mr-auto">Upload</span>
        </div>
      </label>
    </div>
  );
};

export default SignatureCard;
