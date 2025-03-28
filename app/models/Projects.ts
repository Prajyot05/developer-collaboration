import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    requirements: {
        type: String,
    },
    responsibilities: {
        type: String,
    },
    domains: {
        type: [String],
    },
    starts: {
        type: Number,
        default: 0
    },
    image: {
        type: String,
    },
    instituteName: {
        type: String,
    },
    location: {
        type: String,
    },
    duration: {
        type: Number,
        required: true
    },
    expiresAt: { type: Date },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    team: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User",
    }
}, { timestamps: true });

ProjectSchema.pre("save", function (next) {
    if (this.duration) {
        this.expiresAt = new Date(Date.now() + this.duration * 1000); 
    }
    next();
});

export default mongoose.models.Project || mongoose.model("Project", ProjectSchema);