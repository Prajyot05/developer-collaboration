import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import Projects from "@/app/models/Projects";
import User from "@/app/models/User";
import JionRequest from "@/app/models/JionRequest";

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ user_id: string; project_id: string }> }
) {
  //   const session = await auth();

  //   if (!session) {
  //     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  //   }

  const { params } = context;
  const user_id = (await params).user_id;
  const project_id = (await params).project_id;
  console.log("User ID: ", user_id);
  console.log("Project ID: ", project_id);
  const body = await req.json();
  const { decision } = body;
  if (!decision) {
    return NextResponse.json(
      { message: "Decision not found" },
      { status: 404 }
    );
  }

  try {
    await connectDB();
    const user = await User.findById(user_id);
    const project = await Projects.findById(project_id);
    if (!user || !project) {
      return NextResponse.json(
        { message: "User or Project not found" },
        { status: 404 }
      );
    }

    if (decision === "accept") {
      project.team.push(user_id);
      await project.save();

      const jionRequest = await JionRequest.findOneAndDelete({
        user: user_id,
        project: project_id,
      });
      if (!jionRequest) {
        return NextResponse.json(
          { message: "Request not found" },
          { status: 404 }
        );
      }

      return NextResponse.json(
        { message: "Request Accepted" },
        { status: 200 }
      );
    } else {
      const jionRequest = await JionRequest.findOneAndDelete({
        user: user_id,
        project: project_id,
      });
      if (!jionRequest) {
        return NextResponse.json(
          { message: "Request not found" },
          { status: 404 }
        );
      }
      return NextResponse.json(
        { message: "Request Rejected" },
        { status: 200 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: `Error Getting Project: ${error}` },
      { status: 500 }
    );
  }
}
