const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://shipping.ifrstech.com';

export async function fetchShipments({ page = 1, pageSize = 10, query = '', signal } = {}) {
  const url = new URL('/api/rows', API_BASE_URL);
  url.searchParams.set('page', String(page));
  url.searchParams.set('pageSize', String(pageSize));

  if (query.trim()) {
    url.searchParams.set('q', query.trim());
  }

  const response = await fetch(url.toString(), { signal });
  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(payload?.error || 'Unable to load shipments.');
  }

  return payload;
}
