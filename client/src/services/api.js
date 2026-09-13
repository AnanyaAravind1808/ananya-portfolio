// ============================================================
// Centralized API service.
// All network calls to the backend go through this file so that
// components never need to know request URLs or fetch details.
// ============================================================

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Internal helper: performs a fetch call and normalizes errors.
 * Never throws raw fetch/network errors to callers — always throws
 * an Error with a user-friendly message so the UI can display it safely.
 */
async function request(path, options = {}) {
  let response;
  try {
    response = await fetch(`${API_URL}${path}`, {
      headers: { 'Content-Type': 'application/json' },
      ...options,
    });
  } catch (networkError) {
    // Server unreachable, no internet, CORS failure, etc.
    throw new Error('Unable to reach the server. Please check your connection and try again.');
  }

  let data = null;
  try {
    data = await response.json();
  } catch (parseError) {
    // Non-JSON or empty response body.
    data = null;
  }

  if (!response.ok) {
    const message =
      (data && (data.message || data.error)) ||
      `Request failed with status ${response.status}.`;
    throw new Error(message);
  }

  return data;
}

export async function getProjects() {
  const data = await request('/projects');
  return data?.data ?? [];
}

export async function getProject(id) {
  const data = await request(`/projects/${id}`);
  return data?.data ?? null;
}

export async function createProject(project) {
  const data = await request('/projects', {
    method: 'POST',
    body: JSON.stringify(project),
  });
  return data?.data ?? null;
}

export async function updateProject(id, project) {
  const data = await request(`/projects/${id}`, {
    method: 'PUT',
    body: JSON.stringify(project),
  });
  return data?.data ?? null;
}

export async function deleteProject(id) {
  await request(`/projects/${id}`, { method: 'DELETE' });
  return true;
}

export async function submitContact(contact) {
  const data = await request('/contact', {
    method: 'POST',
    body: JSON.stringify(contact),
  });
  return data?.data ?? null;
}

export async function checkHealth() {
  try {
    const data = await request('/health');
    return data?.status === 'ok';
  } catch {
    return false;
  }
}
