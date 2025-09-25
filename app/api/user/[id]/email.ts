import { auth } from "@/app/auth";
import { connectDB } from "@/app/lib/db";
import User from "@/app/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ email: string }> }
) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { params } = context;
  const email = (await params).email;
  console.log("EMAIL: ", email);

  try {
    await connectDB();
    const user = await User.find({ email: email });
    if (!user || !email) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: `Error Getting User: ${error}` },
      { status: 500 }
    );
  }
}
