import axios from "axios";

export interface AuthResponse {
  user: {
    email: string;
    name?: string;
  };
  token: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials extends LoginCredentials {
  name?: string;
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include the auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth methods
export const login = async (
  credentials: LoginCredentials
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>("/api/auth/login", credentials);
  return response.data;
};

export const signup = async (
  credentials: SignupCredentials
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>(
    "/api/auth/signup",
    credentials
  );
  return response.data;
};

export const getCurrentUser = async (token: string): Promise<AuthResponse> => {
  const response = await api.get<AuthResponse>("/api/auth/me", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export default api;
