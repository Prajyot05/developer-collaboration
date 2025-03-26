"use client";
import React, { useEffect, useState } from "react";
import "./hero.css";

interface Image {
  src: string;
  label: string;
}

const images: Image[] = [
  { src: "/devs.png", label: "Adarsh" },
  { src: "/devs.png", label: "Adarsh" },
  { src: "/devs.png", label: "Adarsh" },
  { src: "/devs.png", label: "Adarsh" },
];

const Hero: React.FC = () => {
  const [activeImage, setActiveImage] = useState<number>(0);
  const [exiting, setExiting] = useState<boolean>(false);
  const [textEditing, setTextExiting] = useState<boolean>(false);

  // Handle automatic image rotation every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (activeImage + 1) % images.length;
      handleButtonClick(nextIndex);
    }, 2000); // Rotate every 2 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [activeImage]);

  const handleButtonClick = (index: number): void => {
    if (index !== activeImage) {
      setExiting(true);
      setTextExiting(true);
      setTimeout(() => {
        setActiveImage(index);
        setExiting(false);
        setTimeout(() => {
          setTextExiting(false);
        }, 720);
      }, 500);
    }
  };

  return (
    <>
      <div className="Top-container mt-[90%] sm:mt-[60%] md:mt-[40%] lg:mt-[30%] xl:mt-[20%] rotate-[145deg] h-full w-full ">
        {activeImage !== null && (
          <>
            <div
              className={`absolute overflow-hidden md:-top-[65rem] md:-left-[24rem] -top-[65rem] -left-[28.8rem] h-[85rem] w-[85rem] ${
                exiting ? "exit-animation" : "enter-animation"
              }`}
            >
              <div className="Slider relative h-full w-full overflow-x-hidden overflow-hidden"></div>
              <div className="absolute right-[6rem] top-[6rem] z-[99]">
                <img
                  key={activeImage}
                  src={images[activeImage].src}
                  alt={images[activeImage].label}
                  className="mx-auto z-50 md:h-[19rem] h-[18rem] rotate-[80deg] rounded-full object-cover"
                />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Hero;
