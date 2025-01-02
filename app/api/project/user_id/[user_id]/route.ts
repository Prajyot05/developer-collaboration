import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import Projects from "@/app/models/Projects";
import User from "@/app/models/User";
import { auth } from "@/app/auth";

//Create a new project
export async function POST(req: NextRequest, context: any) {
  // const session = await auth();

  // if (!session) {
  //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  // }

  const {params} = context;
  const id = (await params).user_id;
  console.log("ID: ", id);

  try {
    await connectDB();
    const user = await User.findById(id);
    if (!user || !id) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    console.log("User: ", user);
    

    const body = await req.json();
    const { title, description, tags } = body;
    if(!title){
      return NextResponse.json({ message: "Please fill the title!!!" }, { status: 400 });
    }
    const newProject = new Projects({
        title,
        description,
        tags,
        owner: id,
    });
    if(newProject){
      await newProject.save();
      return NextResponse.json(newProject, { status: 201 });
    }

  } catch (error) {
    return NextResponse.json({ message: `Error Getting User: ${error}` }, { status: 500 });
  }
}


//Get all of the project of a user joined or created