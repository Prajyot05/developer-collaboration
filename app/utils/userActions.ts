"use server";
import axios from "axios";
import { auth } from "../auth";

export async function fetchUserData() {
  const session = await auth();
  if (session?.user) {
    try {
      const { data: user } = await axios.get(
        `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/user/${session.user.id}`
      );
      console.log("USER: ", user);
      return user;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios Error:", error.response?.data || error.message);
      } else {
        console.error("Error:", error);
      }
      throw new Error("Failed to fetch user data");
    }
  }
}
