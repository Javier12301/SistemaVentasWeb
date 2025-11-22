import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    passwordHash: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
    },
    role: {
        type: String,
        default: 'admin',
        enum: ['admin'] // unico rol disponible
    },
}, { timestamps: true });

// Método para establecer la contraseña

UserSchema.methods.matchPassword = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword, this.passwordHash);
};

export default mongoose.model('User', UserSchema);