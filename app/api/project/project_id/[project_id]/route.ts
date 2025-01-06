import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import Projects from "@/app/models/Projects";
import JionRequest from "@/app/models/JionRequest";
import { auth } from "@/app/auth";

//update a project
export async function PUT(req: NextRequest, context: any) {
  // const session = await auth();

  // if (!session) {
  //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  // }

  const { params } = context;
  const id = (await params).project_id;
  console.log("ID: ", id);

  try {
    await connectDB();
    const body = await req.json();
    const { title, description, tags, image } = body;

    const project = await Projects.findByIdAndUpdate(id, {
      title,
      description,
      tags,
      // image,
    }, { new: true, runValidators: true });

    if (!project || !id) {
      return NextResponse.json({ message: "Project not found" }, { status: 404 });
    }
    return NextResponse.json(project, { status: 200 });

  } catch (error) {
    return NextResponse.json({ message: `Error Getting Project: ${error}` }, { status: 500 });
  }
}

//delete a project
export async function DELETE(req: NextRequest, context: any) {
  // const session = await auth();

  // if (!session) {
  //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  // }

  const { params } = context;
  const id = (await params).project_id;
  console.log("ID: ", id);

  try {
    await connectDB();
    const project = await Projects.findByIdAndDelete(id);
    if (!project || !id) {
      return NextResponse.json({ message: "Project not found" }, { status: 404 });
    }
    return NextResponse.json(project, { status: 200 });

  } catch (error) {
    return NextResponse.json({ message: `Error Getting Project: ${error}` }, { status: 500 });
  }
}

//get a project
export async function GET(req: NextRequest, context: any) {
  // const session = await auth();

  // if (!session) {
  //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  // }

  const { params } = context;
  const id = (await params).project_id;
  console.log("ID: ", id);

  try {
    await connectDB();
    const project = await Projects.findById(id);
    if (!project || !id) {
      return NextResponse.json({ message: "Project not found" }, { status: 404 });
    }
    return NextResponse.json(project, { status: 200 });

  } catch (error) {
    return NextResponse.json({ message: `Error Getting Project: ${error}` }, { status: 500 });
  }
}
