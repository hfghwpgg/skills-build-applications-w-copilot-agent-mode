import { Navigate, NavLink, Route, Routes } from 'react-router-dom';

import Activities from './components/Activities.jsx';
import Leaderboard from './components/Leaderboard.jsx';
import Teams from './components/Teams.jsx';
import Users from './components/Users.jsx';
import Workouts from './components/Workouts.jsx';

const navItems = [
  { to: '/users', label: 'Users' },
  { to: '/activities', label: 'Activities' },
  { to: '/teams', label: 'Teams' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/workouts', label: 'Workouts' },
];

const highlights = [
  'User authentication and profiles',
  'Activity logging and tracking',
  'Team creation and management',
  'Competitive leaderboard',
  'Personalized workout suggestions',
];

function getApiOrigin() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();

  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`;
  }

  return 'http://localhost:8000';
}

function Home() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
  const apiOrigin = getApiOrigin();

  return (
    <section className="octofit-hero octofit-panel p-4 p-lg-5">
      <div className="row g-4 align-items-lg-center">
        <div className="col-lg-7">
          <span className="badge text-bg-warning text-dark mb-3">OctoFit Tracker</span>
          <h1 className="display-5 fw-bold lh-1 mb-3">A routed React 19 presentation tier for the OctoFit multi-tier app.</h1>
          <p className="lead octofit-muted mb-4">
            This frontend reads OctoFit data from the Codespaces-hosted API when <code>VITE_CODESPACE_NAME</code> is set, and falls back to a local backend URL when it is not.
          </p>
          <div className="d-flex flex-wrap gap-3">
            <NavLink className="btn btn-warning btn-lg" to="/users">
              Open the app
            </NavLink>
            <a className="btn btn-outline-light btn-lg" href={apiOrigin} target="_blank" rel="noreferrer">
              API origin
            </a>
          </div>
        </div>

        <div className="col-lg-5">
          <div className="octofit-panel p-4 h-100">
            <p className="text-uppercase text-warning fw-semibold small mb-2">Environment</p>
            <p className="mb-3 octofit-muted">
              Define <code>VITE_CODESPACE_NAME</code> in <code>octofit-tracker/frontend/.env.local</code> so the app can build Codespaces API URLs like <code>https://{'${'}import.meta.env.VITE_CODESPACE_NAME{'}'}-8000.app.github.dev/api/users/</code>.
            </p>
            <div className="small text-uppercase text-secondary fw-semibold mb-2">Resolved API origin</div>
            <code className="d-block text-break mb-3">{apiOrigin}</code>
            <div className="small text-uppercase text-secondary fw-semibold mb-2">VITE_CODESPACE_NAME</div>
            <div className="fw-semibold">{codespaceName || 'not set - localhost fallback is active'}</div>
          </div>
        </div>
      </div>

      <div className="row g-3 mt-4">
        {highlights.map((highlight) => (
          <div className="col-sm-6 col-xl-4" key={highlight}>
            <div className="octofit-feature card h-100 border-0">
              <div className="card-body">
                <h2 className="h5 card-title mb-2">{highlight}</h2>
                <p className="card-text octofit-muted mb-0">
                  The resource views below keep working whether the backend returns plain arrays or paginated payloads with a <code>data</code> collection.
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function App() {
  return (
    <div className="octofit-shell">
      <header className="octofit-navbar sticky-top">
        <div className="container py-3 d-flex flex-column flex-lg-row gap-3 align-items-lg-center justify-content-between">
          <div>
            <div className="octofit-brand fw-semibold text-warning">OctoFit Tracker</div>
            <div className="small octofit-muted">React 19, Vite, react-router-dom, Bootstrap</div>
          </div>

          <nav className="d-flex flex-wrap gap-2" aria-label="Primary">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => `octofit-nav-link btn btn-sm ${isActive ? 'btn-warning text-dark' : 'btn-outline-light'}`}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main className="container py-4 py-lg-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}
