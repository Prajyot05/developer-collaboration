import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import Projects from "@/app/models/Projects";

//Get all of the projects
export async function GET() {
  // const session = await auth();

  // if (!session) {
  //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  // }

  try {
    await connectDB();
    const list = await Projects.find({}).select("-team -owner");
    return NextResponse.json(list, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: `Error Getting Projects: ${error}` },
      { status: 500 }
    );
  }
}
