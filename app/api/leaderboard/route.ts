import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import User from "@/app/models/User";

export async function GET() {
  try {
    await connectDB();
    const users = await User.find({})
      .select("firstName lastName collegeDetails instituteName score profilePic image")
      .sort({ score: -1 }) // Sort by score descending
      .limit(50); // Top 50 users

    const leaderboard = users.map((u, index) => ({
      _id: u._id,
      rank: `#${index + 1}`,
      name: `${u.firstName} ${u.lastName}`,
      institute: u.collegeDetails?.name || u.instituteName || "Unknown",
      points: u.score || 0,
      profilePic: u.profilePic || u.image,
    }));

    return NextResponse.json(leaderboard, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: `Error Getting Leaderboard: ${error}` },
      { status: 500 }
    );
  }
}
