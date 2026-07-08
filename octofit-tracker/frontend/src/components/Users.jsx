import ResourcePage from './ResourcePage.jsx';

const endpointPath = '/api/users/';

const fields = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'team', label: 'Team' },
  { key: 'level', label: 'Level' },
  { key: 'workoutsCompleted', label: 'Workouts' },
];

export default function Users() {
  return (
    <ResourcePage
      accent="primary"
      description="Browse user profiles, team assignments, and workout progress."
      emptyMessage="No users are available yet."
      endpointPath={endpointPath}
      fields={fields}
      resourceName="users"
      title="Users"
    />
  );
}