import React from "react";

const AchievementsCard = () => {
  return (
    <>
      <div className="w-[45%] mb-20 flex flex-col gap-14 items-center ">
        <section className="w-full  h-[35rem] border border-[#878787] rounded-lg bg-gray-200">
          <header className="bg-white border-b border-[#878787]  rounded-md pt-3 pb-2">
            <p className="text-3xl font-dmsans text-center py-2">
              Achievements
            </p>
          </header>
          <div className="bg-white m-1 px-5 py-4 border-[#878787] border">
            Lorem Ipsum
          </div>
        </section>
        <button className="text-xl w-fit font-dmsans bg-[#004AAD] text-white px-5 py-3 rounded-md font-light">
          Edit Achievements
        </button>
      </div>
    </>
  );
};

export default AchievementsCard;
