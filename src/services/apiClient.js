const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
};

export async function apiClient(endpoint, { method = 'GET', body, headers = {} } = {}) {
  const response = await fetch(endpoint, {
    method,
    headers: {
      ...DEFAULT_HEADERS,
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const message = `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  const contentType = response.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    return response.json();
  }

  return response.text();
}
