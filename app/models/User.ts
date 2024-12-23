import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  email: { 
    type: String, required: true, unique: true 
  },
  name: { 
    type: String 
  },
  image: { 
    type: String 
  },
  collegeDetails: {
    name: { 
      type: String, 
      required: true 
    },
    location: { 
      type: String 
    },
    course: { 
      type: String 
    },
  },
  codingPlatforms: [
    {
      platform: { 
        type: String, 
        required: true 
      },
      username: { 
        type: String, 
        required: true 
      },
      profileUrl: { 
        type: String 
      },
    },
  ],
  score: { 
    type: Number, 
    default: 0 
  },
});

export default models.User || model("User", UserSchema);