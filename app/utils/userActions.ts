"use server";
import { auth } from "../auth";
import { connectDB } from "../lib/db";
import User from "../models/User";

export async function fetchUserData() {
  const session = await auth();
  if (!session?.user?.id) {
    return null;
  }

  await connectDB();
  return User.findById(session.user.id).lean();
}
