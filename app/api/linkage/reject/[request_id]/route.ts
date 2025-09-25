import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import JoinRequest from "@/app/models/JoinRequest";
import { auth } from "@/app/auth";
import { NextRequest } from "next/server"; // Importing the correct type

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Extract request_id from the URL
    const { pathname } = req.nextUrl;
    const parts = pathname.split("/");
    const request_id = parts[parts.length - 2]; // Extract the [request_id] part

    if (!request_id) {
      return NextResponse.json(
        { error: "Request ID not provided" },
        { status: 400 }
      );
    }

    await connectDB();

    const joinRequest = await JoinRequest.findById(request_id).populate(
      "project"
    );

    if (!joinRequest) {
      return NextResponse.json(
        { error: "Join request not found" },
        { status: 404 }
      );
    }

    if (joinRequest.project.owner.toString() !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    joinRequest.status = "rejected";
    await joinRequest.save();

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
