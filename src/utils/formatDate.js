export function formatDate(dateValue) {
  if (!dateValue) return 'N/A';

  const date = new Date(`${dateValue}T10:00:00`);
  if (Number.isNaN(date.getTime())) return dateValue;

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(date);
}

export function formatFollowUpDate(dateValue) {
  if (!dateValue) return 'N/A';

  const date = new Date(`${dateValue}T10:00:00`);
  if (Number.isNaN(date.getTime())) return dateValue;

  date.setDate(date.getDate() + 2);
  date.setHours(9, 0, 0, 0);

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(date);
}
