import { Schema, model } from 'mongoose';
const teamSchema = new Schema({
    name: { type: String, required: true, unique: true },
    captain: { type: String, required: true },
    members: { type: Number, required: true },
    points: { type: Number, required: true },
}, { timestamps: true });
export const TeamModel = model('Team', teamSchema);
