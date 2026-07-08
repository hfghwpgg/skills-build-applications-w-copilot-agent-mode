import { Schema, model } from 'mongoose';
const activitySchema = new Schema({
    user: { type: String, required: true },
    team: { type: String, required: true },
    type: { type: String, required: true },
    minutes: { type: Number, required: true },
    caloriesBurned: { type: Number, required: true },
    completedAt: { type: Date, required: true },
}, { timestamps: true });
export const ActivityModel = model('Activity', activitySchema);
