import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import Projects from "@/app/models/Projects";

//update a project
export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ project_id: string }> }
) {
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

    console.log("image: ", image);
    const project = await Projects.findByIdAndUpdate(
      id,
      {
        title,
        description,
        tags,
        // image,
      },
      { new: true, runValidators: true }
    );

    if (!project || !id) {
      return NextResponse.json(
        { message: "Project not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(project, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: `Error Getting Project: ${error}` },
      { status: 500 }
    );
  }
}

//delete a project
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ project_id: string }> }
) {
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
      return NextResponse.json(
        { message: "Project not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(project, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: `Error Getting Project: ${error}` },
      { status: 500 }
    );
  }
}

//get a project
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ project_id: string }> }
) {
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
      return NextResponse.json(
        { message: "Project not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(project, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: `Error Getting Project: ${error}` },
      { status: 500 }
    );
  }
}

const deleteExpiredProjects = async () => {
  try {
    const now = new Date();
    const result = await Projects.deleteMany({ expiresAt: { $lte: now } });
    if (result.deletedCount > 0) {
      console.log(`Deleted ${result.deletedCount} expired projects`);
    }
  } catch (error) {
    console.error("Error deleting expired projects:", error);
  }
};

// Run the function every 5 minutes
setInterval(deleteExpiredProjects, 5 * 60 * 1000);
