import mongoose, { Schema } from "mongoose";
import { MODELS } from './models.js';
import { hash, compare } from "bcrypt";

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            unique: true,
        },
        password: {
            type: String, // Guardar encriptado
            select: false,
        }
    },
    {
        timestamps: true,
    }
);

//statics: pertenecen al modelo (User)
userSchema.statics.hashPassword = (clearPassword) => {
    return hash(clearPassword, 7);
}

//methods: perteneces a la instancia (user)
userSchema.methods.comparePassword = function (plainPassword) {
    return compare(plainPassword, this.password);
}
export const User = mongoose.models.User || mongoose.model(MODELS.USER, userSchema);