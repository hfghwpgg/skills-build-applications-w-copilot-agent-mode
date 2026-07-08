import { Schema, model } from 'mongoose';
const leaderboardSchema = new Schema({
    team: { type: String, required: true, unique: true },
    points: { type: Number, required: true },
    rank: { type: Number, required: true },
    trend: { type: String, required: true, enum: ['up', 'down', 'steady'] },
}, { timestamps: true });
export const LeaderboardModel = model('Leaderboard', leaderboardSchema);
