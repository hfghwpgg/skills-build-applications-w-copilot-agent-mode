import ResourcePage from './ResourcePage.jsx';

const endpointPath = '/api/workouts/';

const fields = [
  { key: 'title', label: 'Workout' },
  { key: 'category', label: 'Category' },
  { key: 'durationMinutes', label: 'Duration' },
  { key: 'intensity', label: 'Intensity' },
  { key: 'focus', label: 'Focus' },
];

export default function Workouts() {
  return (
    <ResourcePage
      accent="danger"
      description="Suggested workout templates with category, duration, and focus area."
      emptyMessage="No workout suggestions are available yet."
      endpointPath={endpointPath}
      fields={fields}
      resourceName="workouts"
      title="Workouts"
    />
  );
}