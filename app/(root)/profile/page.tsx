import React from "react";
import ProfileCard from "../components/ProfileCard";
import AchievementsCard from "../components/AchievementsCard";

const page = () => {
  return (
    <>
      <header className="mt-10">
        <p className="font-dmsans text-2xl font-medium">Hello, John Doe!</p>
        <p className="font-dmsans text-xl font-light">Here's your Guild Card</p>
      </header>
      <section className="mt-10 flex justify-start gap-10">
        <ProfileCard />
        <AchievementsCard />
      </section>
    </>
  );
};

export default page;
