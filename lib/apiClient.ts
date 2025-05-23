const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:18080';

async function fetchWithErrorHandling(url: string, options?: RequestInit) {
  try {
    const res = await fetch(url, options);
    if (!res.ok) {
      throw new Error(`API error: ${res.status} ${res.statusText}`);
    }
    return await res.json();
  } catch (err) {
    throw new Error('API bağlantı hatası veya sunucu yanıt vermiyor.');
  }
}

export async function register({ username, email, password }: { username: string; email: string; password: string }) {
  return fetchWithErrorHandling(`${API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password }),
  });
}

export async function login({ username, password }: { username: string; password: string }) {
  return fetchWithErrorHandling(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
}

export async function getUsers() {
  return fetchWithErrorHandling(`${API_URL}/users`);
}

export async function getRooms() {
  return fetchWithErrorHandling(`${API_URL}/rooms`);
}

export async function getRoom(id: number) {
  return fetchWithErrorHandling(`${API_URL}/rooms/${id}`);
}

export async function createRoom({ name }: { name: string }) {
  return fetchWithErrorHandling(`${API_URL}/rooms`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name }),
  });
}

export async function deleteRoom(id: number) {
  return fetchWithErrorHandling(`${API_URL}/rooms/${id}`, {
    method: 'DELETE',
  });
}

export async function addUserToRoom(roomId: number, user_id: number) {
  return fetchWithErrorHandling(`${API_URL}/rooms/${roomId}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_id }),
  });
}

export async function getRoomUsers(roomId: number) {
  return fetchWithErrorHandling(`${API_URL}/rooms/${roomId}/users`);
}

export async function removeUserFromRoom(roomId: number, userId: number) {
  return fetchWithErrorHandling(`${API_URL}/rooms/${roomId}/users/${userId}`, {
    method: 'DELETE',
  });
}

export async function getUserRooms(userId: number) {
  return fetchWithErrorHandling(`${API_URL}/users/${userId}/rooms`);
} 