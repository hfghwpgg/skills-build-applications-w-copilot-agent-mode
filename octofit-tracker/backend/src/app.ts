import cors from 'cors';
import express from 'express';

import { ActivityModel } from './models/activity.js';
import { LeaderboardModel } from './models/leaderboard.js';
import { TeamModel } from './models/team.js';
import { UserModel } from './models/user.js';
import { WorkoutModel } from './models/workout.js';

const app = express();
const codespaceName = process.env.CODESPACE_NAME;

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

function createResourceRouter(resourceName: string) {
  const router = express.Router();

  router.get('/', (_request, response) => {
    response.json({
      resource: resourceName,
      baseUrl: apiBaseUrl,
      message: `${resourceName} route is ready`,
    });
  });

  return router;
}

function createCollectionRouter(model: typeof UserModel | typeof TeamModel | typeof ActivityModel | typeof LeaderboardModel | typeof WorkoutModel) {
  const router = express.Router();

  router.get('/', async (_request, response) => {
    const collectionModel = model as any;
    const documents = await collectionModel.find().sort({ createdAt: 1 }).lean();
    response.json({
      baseUrl: apiBaseUrl,
      count: documents.length,
      data: documents,
    });
  });

  return router;
}

app.use(cors());
app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.json({
    status: 'ok',
    service: 'octofit-tracker-backend',
    baseUrl: apiBaseUrl,
  });
});

app.use('/api/users', createCollectionRouter(UserModel));
app.use('/api/teams', createCollectionRouter(TeamModel));
app.use('/api/activities', createCollectionRouter(ActivityModel));
app.use('/api/leaderboard', createCollectionRouter(LeaderboardModel));
app.use('/api/workouts', createCollectionRouter(WorkoutModel));

export default app;
