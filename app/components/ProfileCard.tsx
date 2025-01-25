import React from "react";
import TagButton from "./TagButton";
import Image from "next/image";

const ProfileCard = () => {
  return (
    <div className="h-2/5 bg-gray-300 px-8 py-6 me-7 rounded-xl">
      <div className="bg-white my-2 py-6 px-8 rounded-xl">
        <div className="bg-white -mx-2 px-8 py-5 rounded-xl border-2 border-gray-300">
          <div className="flex flex-row justify-between items-center">
            <div>
              <div className="flex flex-row items-center gap-5 pb-3">
                <p className="text-4xl font-lato">Hello RAMPP</p>
                <TagButton title="Working" color="bg-teal-200" />
              </div>
              <p className="text-xl mt-2 text-gray-500">Country : India </p>
              <p className="text-xl mt-2 text-gray-500">
                Profession : Student{" "}
              </p>
              <p className="text-xl mt-2 text-gray-500">Institute : PCCOE&R</p>
              <div>
                <Image
                  src="/mail.svg"
                  width={20}
                  height={20}
                  alt="mail icon"
                  className="mt-3"
                />
                <Image
                  src="/github.svg"
                  width={20}
                  height={20}
                  alt="mail icon"
                  className="mt-4"
                />
                <Image
                  src="/linkedin.svg"
                  width={20}
                  height={20}
                  alt="mail icon"
                  className="mt-4"
                />
              </div>
              <p className="text-xl mt-3 text-gray-500 mb-1">Skills : </p>
              <TagButton title="Web/App Development" color="bg-blue-200" />
              <TagButton title="IOT" color="bg-yellow-200" />
              <TagButton title="Data Analytics" color="bg-red-200" />
              <TagButton title="AIML" color="bg-green-200" />
            </div>
            <div className="flex flex-col items-center border-l-2 border-gray-300 pl-10 gap-20 -my-5">
              <Image
                src="/medal1.svg"
                width={200}
                height={200}
                alt="medal"
                className="-my-10 rounded-xl"
              />

              <Image
                src="https://placehold.co/200x200"
                width={150}
                height={150}
                alt="profile pic"
                className="rounded-xl mb-8"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
