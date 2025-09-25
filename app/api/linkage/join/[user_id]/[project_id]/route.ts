import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import JoinRequest from "@/app/models/JoinRequest";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ user_id: string; project_id: string }> }
) {
  try {
    const { user_id, project_id } = await params;
    await connectDB();
    const body = await req.json();
    const { attachment } = body;

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
