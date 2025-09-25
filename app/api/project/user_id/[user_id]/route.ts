import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import Projects from "@/app/models/Projects";

//Create a new project
export async function POST(
  req: Request,
  { params }: { params: Promise<{ user_id: string }> }
) {
  try {
    const { user_id } = await params;
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
      owner: user_id,
      team: [user_id],
    });
    await newProject.save();
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
