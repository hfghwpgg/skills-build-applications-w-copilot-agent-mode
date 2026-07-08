import { Schema, model } from 'mongoose';
const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    level: { type: Number, required: true },
    team: { type: String, required: true },
    workoutsCompleted: { type: Number, required: true },
}, { timestamps: true });
export const UserModel = model('User', userSchema);
