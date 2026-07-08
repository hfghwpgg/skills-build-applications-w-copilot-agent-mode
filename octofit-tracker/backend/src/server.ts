import 'dotenv/config';

import app from './app.js';
import db from './config/database.js';

const codespaceName = process.env.CODESPACE_NAME;
export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

const port = Number(process.env.PORT || 8000);

function startServer() {
  app.listen(port, () => {
    console.log(`OctoFit Tracker backend listening on port ${port}`);
  });
}

if (db.readyState === 1) {
  startServer();
} else {
  db.once('connected', startServer);
}
