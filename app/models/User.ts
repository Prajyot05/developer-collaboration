import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
  },
  skills: {
    type: [String],
  },
  profilePic: {
    type: String,
  },
  collegeDetails: {
    name: {
      type: String,
      required: true,
    },
    location: {
      type: String,
    },
    course: {
      type: String,
    },
  },
  instituteName: {
    type: String,
  },
  codingPlatforms: [
    {
      platform: {
        type: String,
        required: true,
      },
      username: {
        type: String,
        required: true,
      },
      profileUrl: {
        type: String,
      },
    },
  ],
  github: {
    type: String,
  },
  linkedin: {
    type: String,
  },
  location: {
    type: String,
  },
  projectsCompleted: {
    type: Number,
  },
  score: {
    type: Number,
  },
  rank: {
    type: Number,
  },
  projectIds: {
    type: [String],
  },
});

export default models.User || model("User", UserSchema);
