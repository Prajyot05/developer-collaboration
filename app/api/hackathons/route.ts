import { NextResponse, NextRequest } from "next/server";
import { connectDB } from "@/app/lib/db";
import Hackathon from "@/app/models/Hackathon";
import { auth } from "@/app/auth";

export async function GET() {
  try {
    await connectDB();
    const hackathons = await Hackathon.find()
      .populate("submittedBy", "firstName lastName image")
      .sort({ startDate: 1 });
      
    return NextResponse.json(hackathons, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: `Error Getting Hackathons: ${error}` },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();
    const body = await req.json();
    const { title, description, url, startDate, endDate, location, organizer, tags } = body;

    const newHackathon = new Hackathon({
      title,
      description,
      url,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      location,
      organizer,
      tags,
      submittedBy: session.user.id,
    });

    await newHackathon.save();

    return NextResponse.json(
      { message: "Hackathon submitted successfully", hackathon: newHackathon },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: `Error Submitting Hackathon: ${error}` },
      { status: 500 }
    );
  }
}
