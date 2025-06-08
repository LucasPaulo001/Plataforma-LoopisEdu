import mongoose, { Schema } from "mongoose";

const MessagesSchema = new Schema({

    subject: {
        type: String
    },

    content: {
        type: String,
        required: true
    },

    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],

    responses: [{
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        content: {
            type: String,
            required: true
        },
        created: {
            type: Date,
            default: Date.now
        }
    }],

    fixed: {
        type: Boolean,
        default: false
    }

}, { timestamps: true })

export default mongoose.model("Messages", MessagesSchema)