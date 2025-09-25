import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import Project from "@/app/models/Projects";
import ProjectUpdate from "@/app/models/ProjectUpdate";
import { auth } from "@/app/auth";

export async function POST(
  req: Request,
  { params }: { params: { project_id: string } }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { project_id } = params;
    const body = await req.json();
    const { title, content } = body;

    await connectDB();

    const project = await Project.findById(project_id);
    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    if (project.owner.toString() !== session.user.id) {
      return NextResponse.json(
        { error: "Only the project owner can post updates." },
        { status: 403 }
      );
    }

    const newUpdate = new ProjectUpdate({
      project: project_id,
      owner: session.user.id,
      title,
      content,
    });

    await newUpdate.save();

    return NextResponse.json(newUpdate, { status: 201 });
  } catch (error) {
    console.error("Error creating project update:", error);
    return NextResponse.json(
      { message: "Error creating project update" },
      { status: 500 }
    );
  }
}
