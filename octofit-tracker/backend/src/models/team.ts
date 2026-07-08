import { Schema, model } from 'mongoose';

export interface Team {
  name: string;
  captain: string;
  members: number;
  points: number;
}

const teamSchema = new Schema<Team>(
  {
    name: { type: String, required: true, unique: true },
    captain: { type: String, required: true },
    members: { type: Number, required: true },
    points: { type: Number, required: true },
  },
  { timestamps: true },
);

export const TeamModel = model<Team>('Team', teamSchema);