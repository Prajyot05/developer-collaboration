import { NextResponse, NextRequest } from "next/server";
import { connectDB } from "@/app/lib/db";
import Notification from "@/app/models/Notification";
import { auth } from "@/app/auth";

// Get user's notifications
export async function GET() {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();
    const notifications = await Notification.find({ user: session.user.id })
      .populate("relatedUser", "firstName lastName email image profilePic")
      .populate("relatedProject", "title")
      .sort({ createdAt: -1 })
      .limit(50);
      
    return NextResponse.json(notifications, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: `Error Getting Notifications: ${error}` },
      { status: 500 }
    );
  }
}

// Mark notifications as read
export async function PATCH(req: NextRequest) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();
    const body = await req.json();
    const { notificationIds } = body;

    if (notificationIds && Array.isArray(notificationIds)) {
      await Notification.updateMany(
        { _id: { $in: notificationIds }, user: session.user.id },
        { $set: { read: true } }
      );
    } else {
      // Mark all as read
      await Notification.updateMany(
        { user: session.user.id, read: false },
        { $set: { read: true } }
      );
    }

    return NextResponse.json({ message: "Notifications updated" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: `Error Updating Notifications: ${error}` },
      { status: 500 }
    );
  }
}
