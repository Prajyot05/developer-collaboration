import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import Projects from "@/app/models/Projects";
import User from "@/app/models/User";
import { NextRequest } from "next/server"; // Use NextRequest for nextUrl support

// Get a particular project
export async function GET(req: NextRequest) {
  try {
    // Extract project_id from the pathname
    const { pathname } = req.nextUrl;
    const parts = pathname.split("/");
    const project_id = parts[parts.length - 1]; // since it's the last part of /project/project_id/[project_id]

    if (!project_id) {
      return NextResponse.json(
        { error: "Project ID is required" },
        { status: 400 }
      );
    }

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
