import ResourcePage from './ResourcePage.jsx';

const endpointPath = '/api/leaderboard/';

const fields = [
  { key: 'rank', label: 'Rank' },
  { key: 'team', label: 'Team' },
  { key: 'points', label: 'Points' },
  { key: 'trend', label: 'Trend' },
];

export default function Leaderboard() {
  return (
    <ResourcePage
      accent="success"
      description="Competitive standings ordered by rank, points, and momentum."
      emptyMessage="No leaderboard entries are available yet."
      endpointPath={endpointPath}
      fields={fields}
      resourceName="leaderboard"
      title="Leaderboard"
    />
  );
}