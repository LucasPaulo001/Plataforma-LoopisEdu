import mongoose, { Schema } from "mongoose";

const WishBoxSchema = new Schema({
    nome: {
        type: String,
        required: true
    },

    description: {
        type: String,
    },
    
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    UPs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],

    approved: {
        type: Boolean,
        default: false
    },

    tags: [{
        type: String
    }]

}, { timestamps: true })

export default mongoose.model("WishBox", WishBoxSchema)