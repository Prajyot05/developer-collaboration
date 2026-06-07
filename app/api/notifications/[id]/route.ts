import { NextResponse, NextRequest } from "next/server";
import { connectDB } from "@/app/lib/db";
import Notification from "@/app/models/Notification";
import { auth } from "@/app/auth";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    await connectDB();
    const notification = await Notification.findOne({
      _id: id,
      user: session.user.id,
    })
      .populate("relatedUser", "firstName lastName email image profilePic")
      .populate("relatedProject", "title");

    if (!notification) {
      return NextResponse.json({ error: "Notification not found" }, { status: 404 });
    }

    return NextResponse.json(notification, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: `Error Getting Notification: ${error}` },
      { status: 500 }
    );
  }
}
