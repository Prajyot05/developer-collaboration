import { NextResponse, NextRequest } from "next/server";
import { connectDB } from "@/app/lib/db";
import Feedback from "@/app/models/Feedback";
import { auth } from "@/app/auth";

export async function POST(req: NextRequest) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();
    const body = await req.json();
    const { feedback, consent } = body;

    if (!feedback) {
      return NextResponse.json({ error: "Feedback is required" }, { status: 400 });
    }

    const newFeedback = new Feedback({
      user: session.user.id,
      feedback,
      consent,
    });

    await newFeedback.save();

    return NextResponse.json(
      { message: "Feedback submitted successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: `Error Submitting Feedback: ${error}` },
      { status: 500 }
    );
  }
}
