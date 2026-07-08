import ResourcePage from './ResourcePage.jsx';

const endpointPath = '/api/activities/';

const fields = [
  { key: 'user', label: 'User' },
  { key: 'team', label: 'Team' },
  { key: 'type', label: 'Activity' },
  { key: 'minutes', label: 'Minutes' },
  { key: 'caloriesBurned', label: 'Calories' },
  { key: 'completedAt', label: 'Completed' },
];

export default function Activities() {
  return (
    <ResourcePage
      accent="warning"
      description="Track completed sessions, time spent, and calories burned for each user activity."
      emptyMessage="No activities have been recorded yet."
      endpointPath={endpointPath}
      fields={fields}
      resourceName="activities"
      title="Activities"
    />
  );
}