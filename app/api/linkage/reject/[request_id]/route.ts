import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import JoinRequest from "@/app/models/JoinRequest";
import { auth } from "@/app/auth";

export async function POST(
  req: Request,
  { params }: { params: { request_id: string } }
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { request_id } = params;
    await connectDB();

    const request = await JoinRequest.findById(request_id).populate("project");

    if (!request) {
      return NextResponse.json(
        { error: "Join request not found" },
        { status: 404 }
      );
    }

    if (request.project.owner.toString() !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    request.status = "rejected";
    await request.save();

    return NextResponse.json(
      { message: "Join request rejected" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: `Error rejecting join request: ${error}` },
      { status: 500 }
    );
  }
}
