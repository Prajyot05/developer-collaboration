import { NextResponse, NextRequest } from "next/server";
import { connectDB } from "@/app/lib/db";
import Projects from "@/app/models/Projects";
import { auth } from "@/app/auth";

//Get all of the projects
export async function GET(req: NextRequest) {
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const domains = searchParams.get("domains");
    const search = searchParams.get("search");
    const institute = searchParams.get("institute");
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query: Record<string, any> = {};
    if (domains) {
      const domainList = domains.split(",");
      // Allow case insensitive matching
      query.domains = { $in: domainList.map(d => new RegExp(`^${d}$`, "i")) };
    }
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }
    if (institute) {
      query.instituteName = { $regex: institute, $options: "i" };
    }

    const list = (await Projects.find(query).select("-team -owner")).reverse();
    return NextResponse.json(list, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: `Error Getting Projects: ${error}` },
      { status: 500 }
    );
  }
}
