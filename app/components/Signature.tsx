"use client";

import Image from "next/image";
import React, { useState } from "react";

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
    <div className="flex flex-col items-center p-6 bg-white rounded-lg">
      {/* Image Preview */}
      {image ? (
        <Image
          src={image}
          width={100}
          height={100}
          alt="Signature Preview"
          className="w-full  object-contain  mb-4"
        />
      ) : (
        <div className="w-full  text-center  mb-6 text-gray-500">
          <p className=""> No Signature Selected</p>
        </div>
      )}

      {/* File Input & Upload Button */}
      <label className="w-full flex flex-col items-center">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
        <div className="text-xl font-dmsans bg-[#004AAD] text-center text-white w-[70%] py-2 rounded-md font-light">
          Upload
        </div>
      </label>
    </div>
  );
};

export default SignatureCard;
