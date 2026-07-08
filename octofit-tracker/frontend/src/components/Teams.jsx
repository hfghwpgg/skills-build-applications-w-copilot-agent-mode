import ResourcePage from './ResourcePage.jsx';

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
      fields={fields}
      resourceName="teams"
      title="Teams"
    />
  );
}