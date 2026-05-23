const API_BASE = process.env.NEXT_PUBLIC_BASE_URL;

export async function loginToBackend(email, password) {
  const response = await fetch(`${API_BASE}/api/v1/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Backend authentication failed");
  }

  return data;
}

export async function syncBackendToken(userId, email) {
  const response = await fetch(`${API_BASE}/api/v1/auth/sync`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ userId, email }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to sync API token");
  }

  return data;
}

export async function logoutFromBackend() {
  await fetch(`${API_BASE}/api/v1/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
}
