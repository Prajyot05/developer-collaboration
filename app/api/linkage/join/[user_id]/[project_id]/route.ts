import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import JoinRequest from "@/app/models/JoinRequest";

import { auth } from "@/app/auth";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ user_id: string; project_id: string }> }
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { user_id, project_id } = await params;
    
    if (session.user?.id !== user_id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await connectDB();
    const body = await req.json();
    const { attachment } = body;

    const existingRequest = await JoinRequest.findOne({
      user: user_id,
      project: project_id,
    });

    if (existingRequest) {
      return NextResponse.json(
        { error: "Join request already sent" },
        { status: 400 }
      );
    }

    const newJoinRequest = new JoinRequest({
      user: user_id,
      project: project_id,
      attachment,
    });

    await newJoinRequest.save();

    return NextResponse.json(
      { message: "Join request sent successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: `Error sending join request: ${error}` },
      { status: 500 }
    );
  }
}
