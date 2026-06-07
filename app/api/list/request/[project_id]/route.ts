import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import JoinRequest from "@/app/models/JoinRequest";
import Projects from "@/app/models/Projects";
import { auth } from "@/app/auth";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ project_id: string }> }
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();

    const project = await Projects.findById((await params).project_id);
    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    if (project.owner.toString() !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const requests = await JoinRequest.find({
      project: (await params).project_id,
    }).populate("user", "firstName lastName email");

    return NextResponse.json(requests, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: `Error getting join requests: ${error}` },
      { status: 500 }
    );
  }
}
