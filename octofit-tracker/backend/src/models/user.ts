import { Schema, model } from 'mongoose';

export interface User {
  name: string;
  email: string;
  level: number;
  team: string;
  workoutsCompleted: number;
}

const userSchema = new Schema<User>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    level: { type: Number, required: true },
    team: { type: String, required: true },
    workoutsCompleted: { type: Number, required: true },
  },
  { timestamps: true },
);

export const UserModel = model<User>('User', userSchema);