import mongoose, { Schema, Document } from "mongoose";

export interface INotification extends Document {
  user: mongoose.Types.ObjectId;
  type: string;
  title: string;
  message: string;
  link?: string;
  read: boolean;
  relatedProject?: mongoose.Types.ObjectId;
  relatedUser?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const NotificationSchema: Schema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    type: {
      type: String,
      required: true,
      enum: [
        "join_request_received",
        "join_request_accepted",
        "join_request_rejected",
        "project_update",
        "system",
      ],
    },
    title: { type: String, required: true },
    message: { type: String, required: true },
    link: { type: String },
    read: { type: Boolean, default: false },
    relatedProject: { type: Schema.Types.ObjectId, ref: "Projects" },
    relatedUser: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default mongoose.models.Notification ||
  mongoose.model<INotification>("Notification", NotificationSchema);
