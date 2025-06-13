import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import Projects from "@/app/models/Projects";
import User from "@/app/models/User";

//Create a new project
export async function POST(
  req: NextRequest,
  context: { params: Promise<{ user_id: string }> }
) {
  // const session = await auth();

  // if (!session) {
  //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  // }

  const { params } = context;
  const id = (await params).user_id;

  try {
    await connectDB();
    const user = await User.findById(id);
    if (!user || !id) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    console.log("User: ", user);
    const formData = await req.formData();
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const requirements = formData.get("requirements") as string;
    const responsibilities = formData.get("responsibilities") as string;
    const instituteName = formData.get("instituteName") as string;
    const domains = formData.getAll("domains") as string[];
    const link = formData.get("link") as string;

    // Validate required fields
    if (!title) {
      return NextResponse.json(
        { message: "Please fill the title!!!" },
        { status: 400 }
      );
    }

    const newProject = new Projects({
      title,
      description,
      requirements,
      responsibilities,
      instituteName,
      domains,
      link,
      owner: id, // Assuming `id` is the user creating the project
    });

    console.log("New Project: ", newProject);

    // if(image){
    //   try {
    //     const cloudinaryResponse = await uploadOnCloudinary(image);
    //     if (cloudinaryResponse) {
    //       newProject.image = cloudinaryResponse.secure_url;
    //     }
    //   } catch (uploadError) {
    //     return NextResponse.json({ message: `Error uploading image: ${uploadError}` }, { status: 500 });
    //   }
    // }

    if (newProject) {
      await newProject.save();
      return NextResponse.json(newProject, { status: 201 });
    }
  } catch (error) {
    return NextResponse.json(
      { message: `Error Getting User: ${error}` },
      { status: 500 }
    );
  }
}
