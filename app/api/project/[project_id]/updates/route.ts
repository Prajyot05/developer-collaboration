import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import ProjectUpdate from "@/app/models/ProjectUpdate";
import Comment from "@/app/models/Comment";
import User from "@/app/models/User";

export async function GET(
  req: Request,
  { params }: { params: { project_id: string } }
) {
  try {
    const { project_id } = params;
    await connectDB();

    const updates = await ProjectUpdate.find({ project: project_id })
      .sort({ createdAt: -1 })
      .populate({
        path: "comments",
        model: Comment,
        populate: {
          path: "user",
          model: User,
          select: "firstName lastName profilePic",
        },
      });

    return NextResponse.json(updates, { status: 200 });
  } catch (error) {
    console.error("Error fetching project updates:", error);
    return NextResponse.json(
      { message: "Error fetching project updates" },
      { status: 500 }
    );
  }
}
