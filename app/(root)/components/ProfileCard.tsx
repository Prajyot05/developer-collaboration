import React from "react";
import Badge from "./Badge";
import Signature from "./Signature";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

const ProfileCard = () => {
  return (
    <>
      <div className="w-[50%] h-[25%] flex flex-col items-center gap-14 mb-10 ">
        <div className="border border-[#878787] rounded-lg">
          <div className="flex flex-1">
            <div className="w-1/3 border-r-2 border-gray-300">
              <Badge title="S" color="yellow" />
              <Signature />
            </div>
            <section className="w-2/3 px-6 py-4">
              <p className="text-3xl font-dmsans text-[#717171] py-2">
                John Doe
              </p>
              <div className="my-3">
                <span className="text-xl font-dmsans text-[#717171] font-bold  pe-2 py-4">
                  Projects Completed :
                </span>
                <span className="text-xl text-[#717171] font-dmsans">68</span>
              </div>
              <div className="my-3">
                <span className="text-xl font-dmsans text-[#717171] font-bold  pe-2 py-4">
                  Location :
                </span>
                <span className="text-xl text-[#717171] font-dmsans">
                  Maharashtra, India
                </span>
              </div>
              <div className="my-3">
                <span className="text-xl font-dmsans text-[#717171] font-bold  pe-2 py-4">
                  Institute :
                </span>
                <p className="text-xl text-[#717171] font-dmsans">
                  Pimpri Chinchwad College of Engineering and Research , Ravet
                </p>
              </div>
              <div className="my-3">
                <span className="text-xl font-dmsans text-[#717171] font-bold  pe-2 py-4">
                  Skills :
                </span>
                <span className="text-xl text-[#717171] font-dmsans">
                  AI/ML, Web Development, DSA
                </span>
              </div>

              <div className="flex gap-5 items-center">
                <span className="text-xl font-dmsans text-[#717171] font-bold  pe-2 py-4">
                  Other Accounts :
                </span>
                <FaGithub size={40} />
                <FaLinkedin size={40} color="#0077B5" />
              </div>
            </section>
          </div>
        </div>
        <button className="text-xl font-dmsans bg-[#004AAD] text-white px-5 py-3 rounded-md font-light">
          Edit Guild Profile
        </button>
      </div>
    </>
  );
};

export default ProfileCard;
