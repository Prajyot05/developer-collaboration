"use client";

import TagButton from "@/app/components/TagButton";
import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();

  // Animation Variants
  const fadeVariant = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      className="bg-gray-400 h-screen ps-8 pe-6 pb-3 pt-8"
      variants={fadeVariant}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Close Button */}
      <motion.button
        onClick={() => router.push("/projects")}
        className="absolute top-8 right-6 bg-white size-10 p-2 rounded-full"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <X />
      </motion.button>

      <motion.main
        className="bg-blue-100 px-8 py-6 my-8 me-10 rounded-xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
        exit={{ opacity: 0, y: -30, transition: { duration: 0.3 } }}
      >
        <div className="flex flex-row items-start gap-5">
          <Image
            src="/medal1.svg"
            width={150}
            height={150}
            alt="mail icon"
            className="-mt-10 size-60"
          />
          <div>
            <p className="text-5xl font-extrabold font-lato">Project_Title</p>
            <p className="text-3xl font-extrabold font-lato mt-3">Assigner</p>
            <p className="text-2xl font-lato mt-4 mb-3">Tags:</p>
            <TagButton title="Web/App Development" color="bg-blue-200" />
            <TagButton title="IOT" color="bg-yellow-200" />
            <TagButton title="Data Analytics" color="bg-red-200" />
            <TagButton title="AIML" color="bg-green-200" />
            <p className="text-2xl font-lato mt-4 mb-1">Abstract:</p>
            <p className="font-lato mb-3 text-gray-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis,
              laudantium. Non optio ipsum sequi dignissimos minus nemo error
              reiciendis quia! Repellat veniam eveniet laboriosam non quos hic,
              dolorum suscipit quam.{" "}
            </p>
            <p className="text-2xl font-lato mt-4 mb-1">Data:</p>
            <p className="font-lato mb-3 text-gray-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
              veniam in omnis cumque error sit praesentium, optio placeat
              laboriosam explicabo? Vel repudiandae in, numquam veritatis hic
              magni necessitatibus id velit alias veniam corporis, cupiditate
              consequuntur deleniti esse reprehenderit maiores architecto.{" "}
            </p>
            <p className="text-2xl font-lato mt-4 mb-1">More Data:</p>
            <p className="font-lato mb-3 text-gray-500">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Reprehenderit sit laborum autem consequatur vitae, repellendus
              eaque, quas minima at necessitatibus, nisi quam est quasi dolores
              deleniti omnis beatae? Perspiciatis at veritatis harum laborum a
              voluptatum quos quam nemo magnam illo?{" "}
            </p>
            <div className="flex flex-row gap-5 justify-between items-center">
              <div className="flex flex-row gap-5 items-center">
                <Image src="/eye.svg" width={30} height={30} alt="eye icon" />
                <p className="text-gray-500 text-lg">230</p>
                <Image
                  src="/darkmail.svg"
                  width={30}
                  height={30}
                  alt="eye icon"
                  className="ml-3"
                />
                <p className="text-gray-500 text-lg">520</p>
              </div>
            </div>
          </div>
        </div>
      </motion.main>
    </motion.div>
  );
};

export default page;
