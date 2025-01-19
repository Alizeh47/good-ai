import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for adding auth token
api.interceptors.request.use((config) => {
  // You can add auth token here if needed
  return config;
});

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle specific error cases here
    if (error.response?.status === 401) {
      // Handle unauthorized access
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export const fetcher = async (url: string) => {
  const response = await api.get(url);
  return response.data;
};

export const poster = async (url: string, data: any) => {
  const response = await api.post(url, data);
  return response.data;
};

export const putter = async (url: string, data: any) => {
  const response = await api.put(url, data);
  return response.data;
};

export const deleter = async (url: string) => {
  const response = await api.delete(url);
  return response.data;
};

export default api; 