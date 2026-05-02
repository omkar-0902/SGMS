// ─── EcoTrack API Service ─────────────────────────────────────────────────────
// Base URL of the deployed Render backend
const BASE_URL = 'https://ecotrack-rm92.onrender.com';

/**
 * Generic fetch wrapper with JSON handling and error normalisation.
 */
async function request(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;
  const config = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json', // Signal we want JSON back
      ...options.headers,
    }
  };

  const response = await fetch(url, config);
  const text = await response.text();

  // Try to parse as JSON, fall back to raw text
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    data = text;
  }

  if (!response.ok) {
    // Normalise the error message
    const message =
      (typeof data === 'object' && (data.message || data.error)) ||
      data ||
      `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  return data;
}

// ─── Auth helpers ─────────────────────────────────────────────────────────────

/** Attach the saved JWT to every authenticated request. */
function authHeaders() {
  const token = localStorage.getItem('authToken');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// ─── Admin Auth ───────────────────────────────────────────────────────────────

/**
 * Register a new admin account.
 * POST /admins/register
 * Body: { name, email, password }
 * Response: "Admin registered successfully"
 */
export async function registerAdmin({ name, email, password }) {
  return request('/admins/register', {
    method: 'POST',
    body: JSON.stringify({ name, email, password }),
  });
}

/**
 * Login an existing admin.
 * POST /admins/login
 * Body: { email, password }
 * Expected response contains a token and admin details.
 */
export async function loginAdmin({ email, password }) {
  return request('/admins/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

// ─── Collectors ───────────────────────────────────────────────────────────────

export async function getCollectors() {
  return request('/admins/collector-data', { headers: authHeaders() });
}

export async function createCollector(data) {
  return request('/admins/collector', {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(data),
  });
}

export async function updateCollector(id, data) {
  return request(`/collectors/${id}`, {
    method: 'PUT',
    headers: authHeaders(),
    body: JSON.stringify(data),
  });
}

export async function deleteCollector(id) {
  return request(`/collectors/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
}

// ─── Pickup Requests ──────────────────────────────────────────────────────────

export async function getPickupRequests() {
  return request('/requests', { headers: authHeaders() });
}

export async function updateRequestStatus(id, status) {
  return request(`/requests/${id}/status`, {
    method: 'PATCH',
    headers: authHeaders(),
    body: JSON.stringify({ status }),
  });
}

// ─── Reports / Analytics ─────────────────────────────────────────────────────

export async function getDashboardStats() {
  return request('/reports/stats', { headers: authHeaders() });
}

export async function getReports() {
  return request('/reports', { headers: authHeaders() });
}
