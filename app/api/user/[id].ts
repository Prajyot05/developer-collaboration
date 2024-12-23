import { getServerSession } from "next-auth/next";
import authOptions from "../auth/[...nextauth]";
import { NextApiRequest, NextApiResponse } from "next";
import User from "../../models/User";
import { connectToDatabase } from "../../lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { id } = req.query;

  if (req.method === "GET") {
    try {
      await connectToDatabase();
      const user = await User.findById(id);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  if (req.method === "PUT") {
    const { name, image, collegeDetails, codingPlatforms, score } = req.body;

    try {
      await connectToDatabase();
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { name, image, collegeDetails, codingPlatforms, score },
        { new: true, runValidators: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ error: "User not found" });
      }

      return res.status(200).json(updatedUser);
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}