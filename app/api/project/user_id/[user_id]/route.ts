import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import Projects from "@/app/models/Projects";
import User from "@/app/models/User";

import { auth } from "@/app/auth";

//Create a new project
export async function POST(
  req: Request,
  { params }: { params: Promise<{ user_id: string }> }
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { user_id } = await params;

    if (session.user?.id !== user_id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await connectDB();
    const body = await req.json();
    const {
      title,
      description,
      requirements,
      responsibilities,
      domains,
      duration,
      instituteName,
      location,
      link,
      hackathon,
    } = body;
    const newProject = new Projects({
      title,
      description,
      requirements,
      responsibilities,
      domains,
      duration,
      instituteName,
      location,
      link,
      hackathon: hackathon || undefined,
      owner: user_id,
      team: [user_id],
    });
    await newProject.save();

    await User.findByIdAndUpdate(user_id, {
      $push: { projectIds: newProject._id },
    });

    return NextResponse.json(
      { message: "Project Created Successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: `Error Creating Project: ${error}` },
      { status: 500 }
    );
  }
}
