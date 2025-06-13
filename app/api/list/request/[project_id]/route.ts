import { NextRequest, NextResponse } from "next/server";
import JionRequest from "@/app/models/JionRequest";

//get all the requests
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ project_id: string }> }
) {
  // const session = await auth();
  // if (!session) {
  //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  // }
  try {
    const { params } = context;
    const id = (await params).project_id;
    const list = await JionRequest.find({ project: id }).populate(
      "user",
      "name image"
    );
    if (!list || list.length === 0) {
      return NextResponse.json(
        { message: "No requests found" },
        { status: 404 }
      );
    }
    return NextResponse.json(list, { status: 200 });
  } catch (error) {
    console.error("Error getting join requests:", error);
    return NextResponse.json(
      { message: `Error getting join requests: ${error}` },
      { status: 500 }
    );
  }
}
