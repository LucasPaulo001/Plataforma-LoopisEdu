import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
    nome: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: false
    },
    bio: {
        type: String,
    },
    isEmailVerified: {
        type: Boolean,
        default: false
    },

    active: {
        type: Boolean,
        default: true
    },

    classSaved: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Class"
    }],

    emailVerificationToken: {
        token: {
            type: String
        },
        expires: {
            type: Date
        }
    },
    googleId: String,
    githubId: String,
    role: {
        type: String,
        enum: [
            'Presidente',
            'Vice-Presidente', 
            'Diretor de Projetos',
            'Diretor de RH',
            'Diretor de Comercial',
            'Diretor de Marketing',
            'Projetos',
            'Comercial',
            'Marketing',
            'Recursos Humanos',
            'Trainee',
            'Membro',
            'admin'
        ],
        default: 'Membro'
    },
    lecionador: {
        type: Boolean,
        default: false
    },
}, { timestamps: true })

export default mongoose.model("User", UserSchema);