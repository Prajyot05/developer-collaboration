import React from "react";
import TagButton from "./TagButton";
import Image from "next/image";

type ProfileData = {
  name: string;
  country: string;
  profession: string;
  institute: string;
  area: string;
  email: string;
  skills: string[];
  github: string;
  linkedin: string;
};

const ProfileCard = ({ profileData }: { profileData: ProfileData }) => {
  const skillColors = [
    "bg-red-200",
    "bg-green-200",
    "bg-yellow-200",
    "bg-blue-200",
  ];
  return (
    <div className="h-2/5 bg-gray-300 px-8 py-6 me-7 rounded-xl">
      <div className="bg-white my-2 py-6 px-8 rounded-xl">
        <div className="bg-white -mx-2 px-8 py-5 rounded-xl border-2 border-gray-300">
          <div className="flex flex-row justify-between items-center">
            <div>
              <div className="flex flex-row items-center gap-5 pb-3">
                <p className="text-4xl font-lato">
                  Hello {profileData.name ? profileData.name : "User"}
                </p>
                <TagButton title="Working" color="bg-teal-200" />
              </div>
              <p className="text-xl mt-2 text-gray-500">
                Country :{" "}
                {
                  <span className="text-black">
                    {profileData.country ? profileData.country : ""}
                  </span>
                }
              </p>
              <p className="text-xl mt-2 text-gray-500">
                Profession :{" "}
                {
                  <span className="text-black">
                    {profileData.profession ? profileData.profession : ""}
                  </span>
                }
              </p>
              <p className="text-xl mt-2 text-gray-500">
                Institute :{" "}
                {
                  <span className="text-black">
                    {profileData.institute ? profileData.institute : ""}
                  </span>
                }
              </p>
              <div>
                <div className="flex flex-row  mt-3 items-center gap-4">
                  <Image
                    src="/mail.svg"
                    width={24}
                    height={24}
                    alt="mail icon"
                  />
                  <p className="text-xl -mt-1">{profileData.email}</p>
                </div>
                <div className="flex flex-row  mt-4 items-center gap-4">
                  <Image
                    src="/github.svg"
                    width={20}
                    height={20}
                    alt="mail icon"
                  />
                  <p className="text-xl -mt-1">{profileData.github}</p>
                </div>
                <div className="flex flex-row  mt-4 items-center gap-4">
                  <Image
                    src="/linkedin.svg"
                    width={20}
                    height={20}
                    alt="mail icon"
                  />
                  <p className="text-xl -mt-1">{profileData.linkedin}</p>
                </div>
              </div>
              <p className="text-xl mt-3 text-gray-500 mb-1">Skills : </p>
              {profileData.skills.map((skill, index) => (
                <TagButton
                  key={index}
                  title={skill}
                  color={skillColors[index % skillColors.length]}
                />
              ))}
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
