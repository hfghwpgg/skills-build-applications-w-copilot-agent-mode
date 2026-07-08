import { Schema, model } from 'mongoose';
const workoutSchema = new Schema({
    title: { type: String, required: true },
    category: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    intensity: { type: String, required: true, enum: ['low', 'medium', 'high'] },
    focus: { type: String, required: true },
}, { timestamps: true });
export const WorkoutModel = model('Workout', workoutSchema);
