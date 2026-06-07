import mongoose, { Schema, Document } from "mongoose";

export interface IHackathon extends Document {
  title: string;
  description: string;
  url: string;
  startDate: Date;
  endDate: Date;
  location: string;
  organizer: string;
  image?: string;
  tags: string[];
  submittedBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const HackathonSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    url: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    location: { type: String, required: true },
    organizer: { type: String, required: true },
    image: { type: String },
    tags: { type: [String], default: [] },
    submittedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Hackathon ||
  mongoose.model<IHackathon>("Hackathon", HackathonSchema);
