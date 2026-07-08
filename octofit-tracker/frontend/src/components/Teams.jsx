import ResourcePage from './ResourcePage.jsx';

const endpointPath = '/api/teams/';

const fields = [
  { key: 'name', label: 'Team' },
  { key: 'captain', label: 'Captain' },
  { key: 'members', label: 'Members' },
  { key: 'points', label: 'Points' },
];

export default function Teams() {
  return (
    <ResourcePage
      accent="info"
      description="Group users into teams, track membership, and compare overall points."
      emptyMessage="No teams have been created yet."
      endpointPath={endpointPath}
      fields={fields}
      resourceName="teams"
      title="Teams"
    />
  );
}