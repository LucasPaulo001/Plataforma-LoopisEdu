import mongoose, { Schema } from "mongoose"

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
    role: {
        type: String,
        enum: ['admin', 'user', 'professor'],
        default: 'user'
    }
}, { timestamps: true })

export default mongoose.connect("User", UserSchema)