import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import JoinRequest from "@/app/models/JoinRequest";
import { auth } from "@/app/auth";

export async function GET() {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();
    const requests = await JoinRequest.find({ user: session.user.id })
      .populate("project", "title")
      .sort({ createdAt: -1 });

    return NextResponse.json(requests, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: `Error Getting Applications: ${error}` },
      { status: 500 }
    );
  }
}
