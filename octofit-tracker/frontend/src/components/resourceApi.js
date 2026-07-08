const FALLBACK_API_ORIGIN = 'http://localhost:8000';

export function getApiOrigin() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();

  if (!codespaceName) {
    return FALLBACK_API_ORIGIN;
  }

  return `https://${codespaceName}-8000.app.github.dev`;
}

export function getResourceUrl(resourceName) {
  return `${getApiOrigin()}/api/${resourceName}/`;
}

function asArray(value) {
  if (Array.isArray(value)) {
    return value;
  }

  return [];
}

function extractRecords(payload) {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (!payload || typeof payload !== 'object') {
    return [];
  }

  return asArray(payload.data)
    .concat(asArray(payload.items))
    .concat(asArray(payload.results))
    .concat(asArray(payload.docs))
    .concat(asArray(payload.records));
}

function extractCount(payload, records) {
  if (payload && typeof payload === 'object') {
    const candidateCount = payload.count ?? payload.total ?? payload.totalCount;

    if (typeof candidateCount === 'number') {
      return candidateCount;
    }

    const paginationCount = payload.pagination?.total ?? payload.meta?.total;

    if (typeof paginationCount === 'number') {
      return paginationCount;
    }
  }

  return records.length;
}

export async function fetchCollection(resourceName, signal) {
  const response = await fetch(getResourceUrl(resourceName), { signal });

  if (!response.ok) {
    throw new Error(`Failed to load ${resourceName} data (${response.status})`);
  }

  const payload = await response.json();
  const records = extractRecords(payload);

  return {
    count: extractCount(payload, records),
    records,
    raw: payload,
    sourceUrl: getResourceUrl(resourceName),
  };
}