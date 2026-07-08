import mongoose from 'mongoose';
import { ActivityModel } from '../models/activity.js';
import { LeaderboardModel } from '../models/leaderboard.js';
import { TeamModel } from '../models/team.js';
import { UserModel } from '../models/user.js';
import { WorkoutModel } from '../models/workout.js';
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    try {
        await mongoose.connect(connectionString);
        console.log('Connected to octofit_db');
        await Promise.all([
            UserModel.deleteMany({}),
            TeamModel.deleteMany({}),
            ActivityModel.deleteMany({}),
            LeaderboardModel.deleteMany({}),
            WorkoutModel.deleteMany({}),
        ]);
        await UserModel.insertMany([
            { name: 'Ava Chen', email: 'ava.chen@octofit.dev', level: 12, team: 'Pulse Pack', workoutsCompleted: 38 },
            { name: 'Noah Martinez', email: 'noah.martinez@octofit.dev', level: 10, team: 'Velocity Vipers', workoutsCompleted: 31 },
            { name: 'Mia Thompson', email: 'mia.thompson@octofit.dev', level: 11, team: 'Endurance Eagles', workoutsCompleted: 35 },
            { name: 'Liam Johnson', email: 'liam.johnson@octofit.dev', level: 9, team: 'Pulse Pack', workoutsCompleted: 27 },
        ]);
        await TeamModel.insertMany([
            { name: 'Pulse Pack', captain: 'Ava Chen', members: 14, points: 1240 },
            { name: 'Velocity Vipers', captain: 'Noah Martinez', members: 12, points: 1185 },
            { name: 'Endurance Eagles', captain: 'Mia Thompson', members: 13, points: 1215 },
        ]);
        await ActivityModel.insertMany([
            {
                user: 'Ava Chen',
                team: 'Pulse Pack',
                type: 'Interval Run',
                minutes: 42,
                caloriesBurned: 510,
                completedAt: new Date('2026-07-06T07:30:00.000Z'),
            },
            {
                user: 'Noah Martinez',
                team: 'Velocity Vipers',
                type: 'Strength Circuit',
                minutes: 35,
                caloriesBurned: 420,
                completedAt: new Date('2026-07-06T12:00:00.000Z'),
            },
            {
                user: 'Mia Thompson',
                team: 'Endurance Eagles',
                type: 'Rowing Session',
                minutes: 50,
                caloriesBurned: 560,
                completedAt: new Date('2026-07-07T06:15:00.000Z'),
            },
        ]);
        await LeaderboardModel.insertMany([
            { team: 'Pulse Pack', points: 1240, rank: 1, trend: 'up' },
            { team: 'Endurance Eagles', points: 1215, rank: 2, trend: 'steady' },
            { team: 'Velocity Vipers', points: 1185, rank: 3, trend: 'up' },
        ]);
        await WorkoutModel.insertMany([
            {
                title: 'Sunrise Sprint',
                category: 'cardio',
                durationMinutes: 30,
                intensity: 'high',
                focus: 'speed and conditioning',
            },
            {
                title: 'Core Control Flow',
                category: 'strength',
                durationMinutes: 25,
                intensity: 'medium',
                focus: 'core stability and balance',
            },
            {
                title: 'Recovery Ride',
                category: 'mobility',
                durationMinutes: 40,
                intensity: 'low',
                focus: 'active recovery and circulation',
            },
        ]);
        console.log('Seed the octofit_db database with test data');
        console.log('Database seeding complete');
        await mongoose.disconnect();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
