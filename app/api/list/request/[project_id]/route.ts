
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import Projects from "@/app/models/Projects";
import JionRequest from "@/app/models/JionRequest";
import { auth } from "@/app/auth";

//get all the requests
export async function GET(req: NextRequest, context: any) {
  // const session = await auth();
  // if (!session) {
  //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  // }
  try {
    const { params } = context;
    const id = (await params).project_id;
    const list = await JionRequest.find({ project: id }).populate("user", "name image");
    if (!list || list.length === 0) {
      return NextResponse.json({ message: "No requests found" }, { status: 404 });
    }
    return NextResponse.json(list, { status: 200 });
  } catch (error) {
    console.error("Error getting join requests:", error);
    return NextResponse.json({ message: `Error getting join requests: ${error}` }, { status: 500 });
  }
}