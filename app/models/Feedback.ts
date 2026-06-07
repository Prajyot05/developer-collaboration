import mongoose, { Schema, Document } from "mongoose";

export interface IFeedback extends Document {
  user: mongoose.Types.ObjectId;
  feedback: string;
  consent: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const FeedbackSchema: Schema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    feedback: { type: String, required: true },
    consent: { type: Boolean, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Feedback ||
  mongoose.model<IFeedback>("Feedback", FeedbackSchema);
