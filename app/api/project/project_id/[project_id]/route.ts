import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import Projects from "@/app/models/Projects";
import User from "@/app/models/User"; // Ensure User model is imported

//Get a particular project
export async function GET(
  req: Request,
  { params }: { params: { project_id: string } }
) {
  try {
    const { project_id } = params;
    await connectDB();
    const project = await Projects.findById(project_id)
      .populate("owner", "firstName lastName email")
      .populate({
        path: "team",
        model: User,
        select: "firstName lastName email",
      });

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }
    return NextResponse.json(project, { status: 200 });
  } catch (error) {
    console.error("Error Getting Project:", error);
    return NextResponse.json(
      { message: `Error Getting Project: ${error}` },
      { status: 500 }
    );
  }
}

