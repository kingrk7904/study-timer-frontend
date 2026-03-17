const API_URL =
  process.env.REACT_APP_API_URL ||
  "https://backend-app-ewcra3hvbzb9ezfw.southeastasia-01.azurewebsites.net";

const BASE_URL = `${API_URL}/api/sessions`;

async function request(endpoint = "", options = {}) {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  let data = {};
  const contentType = response.headers.get("content-type") || "";

  if (response.status !== 204) {
    if (contentType.includes("application/json")) {
      data = await response.json();
    } else {
      const text = await response.text();
      data = text ? { message: text } : {};
    }
  }

  if (!response.ok) {
    const message =
      data?.message || data?.error || `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  return data;
}

export function getAllSessions() {
  return request("").then((data) => (Array.isArray(data) ? data : []));
}

export function getSessionById(id) {
  return request(`/${id}`).then((data) => (data && typeof data === "object" ? data : {}));
}

export function createSession(payload) {
  return request("", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function updateSession(id, payload) {
  return request(`/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export function deleteSession(id) {
  return request(`/${id}`, {
    method: "DELETE",
  });
}

export { BASE_URL };
