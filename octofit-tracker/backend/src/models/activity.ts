import { Schema, model } from 'mongoose';

export interface Activity {
  user: string;
  team: string;
  type: string;
  minutes: number;
  caloriesBurned: number;
  completedAt: Date;
}

const activitySchema = new Schema<Activity>(
  {
    user: { type: String, required: true },
    team: { type: String, required: true },
    type: { type: String, required: true },
    minutes: { type: Number, required: true },
    caloriesBurned: { type: Number, required: true },
    completedAt: { type: Date, required: true },
  },
  { timestamps: true },
);

export const ActivityModel = model<Activity>('Activity', activitySchema);