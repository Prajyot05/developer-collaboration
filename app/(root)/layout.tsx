"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import SignInButton from "../components/Nav/SignInButton";
import { fetchUserData } from "../utils/userActions";
import useAuthStore from "../store/useAuthStore";
import SignOutButton from "../components/Nav/SignOutButton";
import Sidebar from "../components/Sidebar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  //calling user from zustand store
  const { user, setUser } = useAuthStore();

  useEffect(() => {
    async function getUser() {
      console.log(0);

      try {
        const user = await fetchUserData();

        setUser({
          id: user._id,
          name: user.name,
          email: user.email,
          image: user.image,
          codingPlatforms: user.codingPlatforms,
          firstName: user.firstName,
          lastName: user.lastName,
          gender: user.gender,
          skills: user.skills,
          profilePic: user.profilePic,
          instituteName: user.instituteName,
          github: user.github,
          linkedin: user.linkedin,
          location: user.location,
          projectsCompleted: user.projectsCompleted,
          rank: user.rank,
          projectIds: user.projectIds,
        });
      } catch (err) {
        console.log(err);
      }
    }
    getUser();
  }, [setUser]);

  return (
    <>
      <Sidebar />
      <main className=" pt-16">{children}</main>
    </>
  );
}
