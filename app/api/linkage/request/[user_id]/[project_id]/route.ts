import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import Projects from "@/app/models/Projects";
import User from "@/app/models/User";
import JionRequest from "@/app/models/JionRequest";
//request to join
export async function POST(
  req: NextRequest,
  context: { params: Promise<{ user_id: string; project_id: string }> }
) {
  // const session = await auth();

  // if (!session) {
  //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  // }
  console.log("Running");

  const { params } = context;
  const project_id = (await params).project_id;
  const user_id = (await params).user_id;

  try {
    await connectDB();
    const user = await User.findById(user_id);
    if (!user || !user_id) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    console.log("User: ", user);
    const project = await Projects.findById(project_id);
    if (!project || !project_id) {
      return NextResponse.json(
        { message: "Project not found" },
        { status: 404 }
      );
    }
    console.log("Project: ", project);
    const isrequseted = await Projects.findOne({
      project: project_id,
      user: user_id,
    });
    if (isrequseted) {
      return NextResponse.json(
        { message: "Request already sent" },
        { status: 400 }
      );
    }

    const joinRequest = await JionRequest.create({
      project: project_id,
      user: user_id,
    });
    if (!joinRequest) {
      return NextResponse.json({ message: "Request failed" }, { status: 400 });
    }
    return NextResponse.json(joinRequest, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: `Error Getting User: ${error}` },
      { status: 500 }
    );
  }
}
