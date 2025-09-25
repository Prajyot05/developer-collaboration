import mongoose, { Schema, model, models } from "mongoose";

const CommentSchema = new Schema(
  {
    update: {
      type: Schema.Types.ObjectId,
      ref: "ProjectUpdate",
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default models.Comment || model("Comment", CommentSchema);
