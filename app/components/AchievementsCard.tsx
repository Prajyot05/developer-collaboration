import React from "react";

const AchievementsCard = () => {
  return (
    <>
      <section className="w-full h-[25rem] sm:h-[30rem] md:h-[35rem] border border-[#878787] rounded-lg bg-gray-200">
        <header className="bg-white border-b border-[#878787] rounded-md pt-2 sm:pt-3 pb-1 sm:pb-2">
          <p className="text-xl sm:text-2xl md:text-3xl font-dmsans text-center py-1 sm:py-2">
            Achievements
          </p>
        </header>
        <div className="bg-white m-1 px-3 sm:px-4 md:px-5 py-3 sm:py-4 border-[#878787] border text-sm sm:text-base">
          Lorem Ipsum
        </div>
      </section>
    </>
  );
};

export default AchievementsCard;
