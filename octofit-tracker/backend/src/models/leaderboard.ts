import { Schema, model } from 'mongoose';

export interface LeaderboardEntry {
  team: string;
  points: number;
  rank: number;
  trend: 'up' | 'down' | 'steady';
}

const leaderboardSchema = new Schema<LeaderboardEntry>(
  {
    team: { type: String, required: true, unique: true },
    points: { type: Number, required: true },
    rank: { type: Number, required: true },
    trend: { type: String, required: true, enum: ['up', 'down', 'steady'] },
  },
  { timestamps: true },
);

export const LeaderboardModel = model<LeaderboardEntry>('Leaderboard', leaderboardSchema);