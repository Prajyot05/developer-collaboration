import mongoose from "mongoose";

const JoinRequestSchema = new mongoose.Schema({
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
        required: true,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    attachment:{
        type: String,
    },
    status:{
        type: String,
        enum: ["pending", "accepted", "rejected"],
        default: "pending",
    },
},{ timestamps: true });

export default mongoose.models.JoinRequest || mongoose.model("JoinRequest", JoinRequestSchema);