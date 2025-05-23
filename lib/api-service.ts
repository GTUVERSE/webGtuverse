// lib/api-service.ts dosyasını oluşturun
const API_URL = "http://localhost:18080";

// Token işlemleri
const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("auth-token");
  }
  return null;
};

const setToken = (token: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("auth-token", token);
  }
};

const clearToken = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("auth-token");
  }
};

// API istekleri için temel fonksiyon
const fetchAPI = async (endpoint: string, options: RequestInit = {}) => {
  const token = getToken();
  
  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  console.log('İstek:', `${API_URL}${endpoint}`, options);

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || "API isteği başarısız oldu");
  }

  // Boş yanıt kontrolü (DELETE istekleri için)
  if (response.status === 204) {
    return null;
  }

  return await response.json();
};

// Auth API
export const authAPI = {
  register: async (userData: { username: string; email: string; password: string }) => {
    const res = await fetch(`${API_URL}/register`, {
      method: "POST",
      body: JSON.stringify(userData),
    });
    
    if (res.status === 204) return {};
    return res.json();
  },
  
  login: async (credentials: { username: string; password: string }) => {
    const data = await fetchAPI("/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
    
    if (data.token) {
      setToken(data.token);
    }
    
    return data;
  },
  
  logout: () => {
    clearToken();
  },
};

// Users API
export const usersAPI = {
  getAll: async () => {
    return fetchAPI("/users");
  },
  
  getUserRooms: async (userId: number) => {
    return fetchAPI(`/users/${userId}/rooms`);
  },
};

// Rooms API
export const roomsAPI = {
  getAll: async () => {
    return fetchAPI("/rooms");
  },
  
  getById: async (roomId: number) => {
    return fetchAPI(`/rooms/${roomId}`);
  },
  
  create: async (roomData: { name: string }) => {
    return fetchAPI("/rooms", {
      method: "POST",
      body: JSON.stringify(roomData),
    });
  },
  
  delete: async (roomId: number) => {
    return fetchAPI(`/rooms/${roomId}`, {
      method: "DELETE",
    });
  },
  
  addUser: async (roomId: number, userId: number) => {
    return fetchAPI(`/rooms/${roomId}/users`, {
      method: "POST",
      body: JSON.stringify({ user_id: userId }),
    });
  },
  
  getUsers: async (roomId: number) => {
    return fetchAPI(`/rooms/${roomId}/users`);
  },
  
  removeUser: async (roomId: number, userId: number) => {
    return fetchAPI(`/rooms/${roomId}/users/${userId}`, {
      method: "DELETE",
    });
  },
};