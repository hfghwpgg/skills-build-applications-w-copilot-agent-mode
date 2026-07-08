const features = [
  'User authentication and profiles',
  'Activity logging and tracking',
  'Team creation and management',
  'Competitive leaderboard',
  'Personalized workout suggestions',
];

export default function App() {
  return (
    <main className="min-vh-100 bg-dark text-light">
      <section className="container py-5">
        <div className="row align-items-center g-5 py-5">
          <div className="col-lg-7">
            <span className="badge text-bg-warning text-dark mb-3">OctoFit Tracker</span>
            <h1 className="display-4 fw-bold lh-1 mb-3">Modern multi-tier fitness tracking for teams and individuals.</h1>
            <p className="lead text-secondary-emphasis mb-4">
              A React 19 frontend on Vite, an Express + TypeScript API on port 8000, and MongoDB-backed data access through Mongoose.
            </p>
            <div className="d-flex flex-wrap gap-3">
              <a className="btn btn-warning btn-lg" href="#features">
                Explore features
              </a>
              <span className="text-secondary align-self-center">Frontend runs on 5173</span>
            </div>
          </div>
          <div className="col-lg-5">
            <div className="card border-0 shadow-lg bg-black text-light">
              <div className="card-body p-4">
                <p className="text-uppercase text-warning fw-semibold small mb-2">System ports</p>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item bg-transparent text-light border-secondary px-0">Frontend: 5173</li>
                  <li className="list-group-item bg-transparent text-light border-secondary px-0">Backend: 8000</li>
                  <li className="list-group-item bg-transparent text-light border-secondary px-0">MongoDB: 27017</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="container pb-5">
        <div className="row g-4">
          {features.map((feature) => (
            <div className="col-md-6 col-xl-4" key={feature}>
              <div className="card h-100 bg-secondary-subtle border-0 shadow-sm">
                <div className="card-body">
                  <h2 className="h5 card-title">{feature}</h2>
                  <p className="card-text text-secondary mb-0">
                    Built to support the OctoFit Tracker application goals and grow into the full product surface.
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
