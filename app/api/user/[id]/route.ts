import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import User from "@/app/models/User";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  // const session = await auth();

  // if (!session) {
  //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  // }

  const { params } = context;
  const id = (await params).id;

  try {
    await connectDB();
    const user = await User.findById(id);
    if (!user || !id) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: `Error Fetching User: ${error}` },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  // const session = await auth();

  // if (!session) {
  //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  // }

  const { params } = context;
  const id = (await params).id;
  console.log("ID: ", id);

  if (!id) {
    return NextResponse.json({ error: "ID not found" }, { status: 404 });
  }

  const body = await req.json();
  const { name, image, collegeDetails, codingPlatforms, score } = body;

  try {
    await connectDB();
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, image, collegeDetails, codingPlatforms, score },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: `Error Updating User: ${error}` },
      { status: 500 }
    );
  }
}
