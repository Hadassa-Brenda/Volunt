import axios from "axios";

const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:8080/api";

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("volunt-token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const authApi = {
  login: (email, password) =>
    api.post("/auth/login", {
      email,
      password,
    }),
  register: (payload) => api.post("/auth/register", payload),
  requestPasswordReset: (email) =>
    api.post("/auth/forgot-password", {
      email,
    }),
  resetPassword: (token, password, confirmPassword) =>
    api.post("/auth/reset-password", {
      token,
      password,
      confirmPassword,
    }),
};
