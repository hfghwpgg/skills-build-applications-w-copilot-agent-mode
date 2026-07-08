import { Schema, model } from 'mongoose';

export interface Workout {
  title: string;
  category: string;
  durationMinutes: number;
  intensity: 'low' | 'medium' | 'high';
  focus: string;
}

const workoutSchema = new Schema<Workout>(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    intensity: { type: String, required: true, enum: ['low', 'medium', 'high'] },
    focus: { type: String, required: true },
  },
  { timestamps: true },
);

export const WorkoutModel = model<Workout>('Workout', workoutSchema);