import mongoose, { Schema } from "mongoose";

const ClassSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    youtubeLink: {
        type: String,
        required: true
    },
    thumbnailVideo: {
        type: String,
        required: true
    },

    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    
    category: [String],

    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    createDate: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model("Class", ClassSchema)