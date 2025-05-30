import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
    nome: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    bio: {
        type: String,
    },
    isEmailVerified: {
        type: Boolean,
        default: false
    },

    emailVerificationToken: {
        token: {
            type: String
        },
        expires: {
            type: Date
        }
    },
    role: {
        type: String,
        enum: ['admin', 'user', 'professor'],
        default: 'user'
    }
}, { timestamps: true })

export default mongoose.model("User", UserSchema);