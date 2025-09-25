import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import JoinRequest from "@/app/models/JoinRequest";
import Projects from "@/app/models/Projects";
import { auth } from "@/app/auth";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Extract the request_id from the URL
    const { pathname } = request.nextUrl;
    const parts = pathname.split("/");
    const request_id = parts[parts.length - 2]; // Assuming the structure is `/api/linkage/accept/[request_id]`

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

    joinRequest.status = "accepted";
    await joinRequest.save();

    await Projects.findByIdAndUpdate(joinRequest.project._id, {
      $addToSet: { team: joinRequest.user },
    });

    return NextResponse.json(
      { message: "Join request accepted" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: `Error accepting join request: ${error}` },
      { status: 500 }
    );
  }
}
