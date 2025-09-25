import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import Comment from "@/app/models/Comment";
import ProjectUpdate from "@/app/models/ProjectUpdate";
import { auth } from "@/app/auth";

export async function POST(
  req: Request,
  { params }: { params: { update_id: string } }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { update_id } = params;
    const body = await req.json();
    const { content } = body;

    await connectDB();

    const newComment = new Comment({
      update: update_id,
      user: session.user.id,
      content,
    });

    await newComment.save();

    // Add comment to the project update's comments array
    await ProjectUpdate.findByIdAndUpdate(update_id, {
      $push: { comments: newComment._id },
    });

    // Populate user details before sending back
    const populatedComment = await Comment.findById(newComment._id).populate(
      "user",
      "firstName lastName profilePic"
    );

    return NextResponse.json(populatedComment, { status: 201 });
  } catch (error) {
    console.error("Error creating comment:", error);
    return NextResponse.json(
      { message: "Error creating comment" },
      { status: 500 }
    );
  }
}
