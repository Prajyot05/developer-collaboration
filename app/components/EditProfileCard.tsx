import React from "react";
import Image from "next/image";
import { useState } from "react";
import TagButton from "./TagButton";
import EditTag from "./EditTag";

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

const EditProfileCard = ({
  profileData,
  setProfileData,
}: {
  profileData: ProfileData;
  setProfileData: React.Dispatch<React.SetStateAction<ProfileData>>;
}) => {
  const [updateProfileData, setUpdateProfileData] = useState<ProfileData>({
    name: profileData.name,
    country: profileData.country,
    profession: profileData.profession,
    institute: profileData.institute,
    area: profileData.area,
    email: profileData.email,
    skills: [],
    github: profileData.github,
    linkedin: profileData.linkedin,
  });

  const [currentSkill, setCurrentSkill] = useState("");

  const handleSkillInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentSkill(e.target.value);
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter" && currentSkill.trim() !== "") {
      e.preventDefault();
      setUpdateProfileData({
        ...updateProfileData,
        skills: [...updateProfileData.skills, currentSkill.trim()],
      });
      setCurrentSkill("");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdateProfileData({
      ...updateProfileData,
      [name]: value,
    });
  };

  const removeSkill = (skillToRemove: string) => {
    setUpdateProfileData({
      ...updateProfileData,
      skills: updateProfileData.skills.filter(
        (skill) => skill !== skillToRemove
      ),
    });
  };

  return (
    <div className="h-2/5 bg-gray-300 px-8 py-6 me-7 rounded-xl mb-10">
      <div className="bg-white my-2 rounded-xl ">
        <div className="flex flex-row items-center ">
          <div className=" my-2 py-6 px-8 rounded-xl flex flex-row items-end pe-20">
            <Image
              src="https://placehold.co/200x200"
              width={300}
              height={300}
              alt="profile pic"
              className="rounded-full ml-3 mt-3 border-2 border-gray-500"
            />
          </div>
          <div className="flex flex-col items-center pl-10 gap-10 ps-20">
            <button className="text-xl py-4 px-5 bg-gray-600 relative right-[50%] text-white rounded-md">
              Change Profile Picture
            </button>
            <button className="text-xl py-4 px-5 bg-gray-300 relative right-[50%] text-gray-600 rounded-md">
              Delete Profile Picture
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mx-10">
          <div className="col-span-2">
            <label className="block text-2xl mb-2">Your Name:</label>
            <input
              className="w-full text-lg p-2 border border-gray-400 rounded-md"
              type="text"
              name="name"
              value={updateProfileData.name}
              onChange={handleInputChange}
              placeholder="User_Name"
            />
          </div>
          <div>
            <label className="block text-2xl mb-2">Country Name:</label>
            <input
              className="w-full text-lg p-2 border border-gray-400 rounded-md"
              type="text"
              name="country"
              value={updateProfileData.country}
              onChange={handleInputChange}
              placeholder="Country Name"
            />
          </div>
          <div>
            <label className="block text-2xl mb-2">Profession:</label>
            <input
              className="w-full text-lg p-2 border border-gray-400 rounded-md"
              type="text"
              name="profession"
              value={updateProfileData.profession}
              onChange={handleInputChange}
              placeholder="Profession"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-2xl mb-2">Institute:</label>
            <input
              className="w-full text-lg p-2 border border-gray-400 rounded-md"
              type="text"
              name="institute"
              value={updateProfileData.institute}
              onChange={handleInputChange}
              placeholder="Institute"
            />
          </div>
          <div>
            <label className="block text-2xl mb-2">Area:</label>
            <input
              className="w-full text-lg p-2 border border-gray-400 rounded-md"
              type="text"
              value={updateProfileData.area}
              onChange={handleInputChange}
              name="area"
              placeholder="Area"
            />
          </div>
          <div>
            <label className="block text-2xl mb-2">Email:</label>
            <input
              className="w-full p-2 text-lg border border-gray-400 rounded-md"
              type="text"
              value={updateProfileData.email}
              onChange={handleInputChange}
              name="email"
              placeholder="email"
            />
          </div>
          <div>
            <label className="block text-2xl mb-2">Skills:</label>
            <input
              className="w-full text-lg p-2 border border-gray-400 rounded-md"
              type="text"
              name="skills"
              value={currentSkill}
              onChange={handleSkillInput}
              onKeyDown={handleKeyDown}
              placeholder="Add Skills"
            />
          </div>
          {updateProfileData.skills.length > 0 ? (
            <div className="gap-2 mt-10 max-w-full overflow-x-auto pb-2">
              {updateProfileData.skills.map((skill, index) => (
                <EditTag
                  key={index}
                  tag={skill}
                  onDelete={() => removeSkill(skill)}
                />
              ))}
            </div>
          ) : (
            <div className="mt-10 flex items-center">
              <p className="text-lg text-gray-500">No skills added yet!</p>
            </div>
          )}
          <div>
            <label className="block text-2xl mb-2">Github:</label>
            <input
              className="w-full text-lg p-2 border border-gray-400 rounded-md mb-10"
              type="text"
              value={updateProfileData.github}
              onChange={handleInputChange}
              name="github"
              placeholder="Github Profile"
            />
          </div>
          <div>
            <label className="block text-2xl mb-2">LinkedIn:</label>
            <input
              className="w-full text-lg p-2 border border-gray-400 rounded-md mb-10"
              type="text"
              value={updateProfileData.linkedin}
              onChange={handleInputChange}
              name="linkedin"
              placeholder="LinkedIn Profile"
            />
          </div>
        </div>
        <div className="flex flex-row justify-center">
          <button
            className="text-xl py-3 px-20 bg-gray-600 text-white rounded-md mb-10"
            onClick={() => {
              alert("All the Details has been saved...😊 ");
              setProfileData(updateProfileData);
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileCard;
