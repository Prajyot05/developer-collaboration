"use client";
import Image from "next/image";
import React, { useState } from "react";

const EditProfile = ({ onProfileUpdate }: any) => {
  const [firstName, setFirstName] = useState("John");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("Doe");
  const [email, setEmail] = useState("");
  const [institute, setInstitute] = useState(
    "Pimpri Chinchwad College of Engineering and Research, Ravet"
  );
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [github, setGithub] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [skill, setSkill] = useState("");
  const [skills, setSkills] = useState<string[]>([]);
  const [isChecked, setIsChecked] = useState(false);

  // Add Skill
  const addSkill = () => {
    if (skill.trim() && !skills.includes(skill)) {
      setSkills([...skills, skill]);
      setSkill("");
    }
  };

  // Remove Skill
  const removeSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedProfileData = {
      name: `${firstName} ${middleName} ${lastName}`,
      email,
      institute,
      location: `${country}, ${state}, ${pinCode}`,
      skills: skills.join(", "), // Convert skills array to a string
      github,
      linkedin,
    };
    onProfileUpdate(updatedProfileData); // Call the function passed from the parent
  };

  return (
    <>
      <section className="-ms-4 flex justify-start gap-10 mb-10">
        <aside className="w-[40%] h-fit bg-[#F7E8FE] px-5 py-5 rounded-3xl">
          <p className="font-dmsans text-2xl mb-2 text-[#1E1F21]">
            Welcome to Profile Page.
          </p>
          <p className="font-dmsans text-lg w-[80%] leading-6 pb-3 text-[#1E1F21]">
            Here, you can manage and update your personal information to ensure
            that your account reflects your preferences. This is where you can
            adjust your settings, change your details, and keep your profile
            up-to-date.
          </p>
          <p className="font-dmsans text-lg w-[80%] leading-6 pb-5 text-[#1E1F21]">
            We take your privacy seriously. Any information you provide on this
            page will be handled with the utmost care and confidentiality.
          </p>
          <p className="font-dmsans text-lg w-[80%] leading-6 pb-8 text-[#1E1F21]">
            For selection purposes, certain data you provide here will be
            required and used in applications submitted to project creators.
            This may include your name, relevant skills or qualifications, and
            any other details necessary for the selection process.
          </p>
          <div className="w-full flex justify-center">
            <Image
              src="/editProfileIcon.png"
              alt="Profile Icon"
              height={250}
              width={250}
              className="bg-white rounded-full opacity-60 mb-6"
            />
          </div>
        </aside>
        <main>
          <p className="text-xl font-medium text-gray-600 mb-6">Legal Name</p>
          <div className="flex gap-5 mb-8">
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First name*"
              className="px-4 py-4 w-[11rem] text-xl text-gray-600 font-dmsans text-ellipsis border rounded-md border-gray-400 placeholder:font-dmsans placeholder:text-xl placeholder:text-gray-500"
            />
            <input
              type="text"
              value={middleName}
              onChange={(e) => setMiddleName(e.target.value)}
              placeholder="Middle name"
              className="px-4 py-4 w-[11rem] text-xl text-gray-600 font-dmsans text-ellipsis border rounded-md border-gray-400 placeholder:font-dmsans placeholder:text-xl placeholder:text-gray-500"
            />
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last name*"
              className="px-4 py-4 w-[11rem] text-xl text-gray-600 font-dmsans text-ellipsis border rounded-md border-gray-400 placeholder:font-dmsans placeholder:text-xl placeholder:text-gray-500"
            />
          </div>
          <p className="text-xl font-medium text-gray-600 mb-6">
            E-mail Address
          </p>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail Address"
            className="px-4 py-4 w-[40rem] text-xl text-gray-600 font-dmsans text-ellipsis border rounded-md border-gray-400 placeholder:font-dmsans placeholder:text-xl placeholder:text-gray-500"
          />
          <p className="text-xl font-medium text-gray-600 my-6">Institute</p>
          <input
            type="text"
            value={institute}
            onChange={(e) => setInstitute(e.target.value)}
            placeholder="Institute name"
            className="px-4 py-4 w-[40rem] text-xl text-gray-600 font-dmsans text-ellipsis border rounded-md border-gray-400 placeholder:font-dmsans placeholder:text-xl placeholder:text-gray-500"
          />
          <p className="font-dmsans font-medium text-gray-600 mt-2 mb-8">
            **If you are not part of any Institute please enter “Other”
          </p>
          <p className="text-xl font-medium text-gray-600 mb-6">Address</p>
          <div className="flex gap-5 mb-8">
            <input
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              type="text"
              placeholder="Country"
              className="px-4 py-4 w-[15rem] text-xl text-gray-600 font-dmsans text-ellipsis border rounded-md border-gray-400 placeholder:font-dmsans placeholder:text-xl placeholder:text-gray-500"
            />
            <input
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
              placeholder="State"
              className="px-4 py-4 w-[15rem] text-xl text-gray-600 font-dmsans text-ellipsis border rounded-md border-gray-400 placeholder:font-dmsans placeholder:text-xl placeholder:text-gray-500"
            />
            <input
              type="text"
              value={pinCode}
              onChange={(e) => setPinCode(e.target.value)}
              placeholder="Pin Code"
              className="px-4 py-4 w-[15rem] text-xl text-gray-600 font-dmsans text-ellipsis border rounded-md border-gray-400 placeholder:font-dmsans placeholder:text-xl placeholder:text-gray-500"
            />
          </div>
          <p className="text-xl font-medium text-gray-600 mb-6">Skills</p>
          <div className="flex gap-6 mb-6">
            <input
              type="text"
              value={skill}
              onChange={(e) => setSkill(e.target.value)}
              placeholder="Enter your Skill"
              className="px-4 py-4 w-[15rem] text-xl text-gray-600 font-dmsans text-ellipsis border rounded-md border-gray-400 placeholder:font-dmsans placeholder:text-xl placeholder:text-gray-500"
            />
            <button
              onClick={addSkill}
              className="bg-[#A8A8A8] text-white text-lg font-thin w-[8rem] px-5 py-2 rounded-md hover:font-normal"
            >
              Push
            </button>
          </div>
          {/* Skills List */}
          <div className="flex flex-wrap gap-3">
            {skills.length > 0 ? (
              skills.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-gray-200 px-4 py-3 rounded-md"
                >
                  <span className="text-gray-700 text-xl">{item}</span>
                  <button
                    onClick={() => removeSkill(index)}
                    className="rotate-45 bg-white px-2  text-center rounded-full text-gray border border-gray-400 text-2xl relative bottom-4 left-6 text-black"
                  >
                    +
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No skills added yet!</p>
            )}
          </div>
          <p className="text-xl font-medium text-gray-600 my-6">
            Account Details
          </p>
          <input
            type="url"
            value={github}
            onChange={(e) => setGithub(e.target.value)}
            placeholder="Github URL"
            className="px-4 py-4 w-[40rem] text-xl text-gray-600 font-dmsans text-ellipsis border rounded-md border-gray-400 placeholder:font-dmsans placeholder:text-xl placeholder:text-gray-500"
          />
          <input
            type="url"
            value={linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
            placeholder="Linkedin URL"
            className="px-4 py-4 mt-6 w-[40rem] text-xl text-gray-600 font-dmsans text-ellipsis border rounded-md border-gray-400 placeholder:font-dmsans placeholder:text-xl placeholder:text-gray-500"
          />
          <div className="flex justify-start items-center gap-3 my-6">
            <input
              type="checkbox"
              className="size-4"
              checked={isChecked}
              onChange={() => {
                setIsChecked(!isChecked);
              }}
            />
            <p className="text-lg font-lato text-gray-500">
              I hereby certify that, to the best of my knowledge, the provided
              information is true and accurate.*
            </p>
          </div>
          <button
            className={`text-xl font-dmsans ${
              isChecked ? "bg-[#004AAD]" : "bg-[#65a8ff]"
            } text-white px-5 py-3 rounded-md font-light`}
            onClick={handleSubmit}
            disabled={!isChecked}
          >
            Submit
          </button>
        </main>
      </section>
    </>
  );
};

export default EditProfile;
