import mongoose from "mongoose";

const ProjectShema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    tags: {
        type: [String],
    },
    image: {
        type: String,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    team:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User",
    }

},{ timestamps: true });

export default mongoose.models.Project || mongoose.model("Project", ProjectShema);