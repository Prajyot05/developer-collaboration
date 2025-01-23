import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import Projects from "@/app/models/Projects";
import { auth } from "@/app/auth";

//Get all of the projects created
export async function GET(req : NextRequest , context : any){
    // const session = await auth();
  
    // if (!session) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }

    try{
      await connectDB();
      const {params} = context;
      const id = (await params).user_id;
      const list = await Projects.find({owner:id}).select("-team -owner");
      return NextResponse.json(list, { status: 200 });
          
    }catch(error){
      return NextResponse.json({ message: `Error Getting Projects: ${error}` }, { status: 500 });
    }
}