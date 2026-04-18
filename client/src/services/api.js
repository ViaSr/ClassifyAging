const API_BASE = '/api';

async function request(endpoint, options = {}) {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

export const hallmarksApi = {
  getAll: () => request('/hallmarks'),
  getBySlug: (slug) => request(`/hallmarks/${slug}`),
};

export const resourcesApi = {
  search: (params = {}) => {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value != null && value !== '') query.set(key, value);
    });
    return request(`/resources?${query.toString()}`);
  },
  getById: (id) => request(`/resources/${id}`),
};

export const chatApi = {
  status: () => request('/chat/status'),
  send: (message, history = []) =>
    request('/chat', {
      method: 'POST',
      body: JSON.stringify({ message, history }),
    }),
};
