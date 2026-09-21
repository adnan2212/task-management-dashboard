import axios, { AxiosError } from "axios";
import type { ApiError } from "@/types/index";
import { getToken, clearAuth } from "@/utils/storage";

export const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL ?? "/api",
  timeout: 10000,
});

// Attach the token to every request.
client.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Turn every failure into one predictable shape: { message, status }.
client.interceptors.response.use(
  (res) => res,
  (error: AxiosError<{ message?: string }>) => {
    const isOnLogin =
      typeof window !== "undefined" && window.location.pathname.startsWith("/login");

    if (error.response?.status === 401 && !isOnLogin) {
      clearAuth();
      window.location.href = "/login";
    }
    return Promise.reject(toApiError(error));
  }
);

function toApiError(error: AxiosError<{ message?: string }>): ApiError {
  if (error.response) {
    return {
      message: error.response.data?.message ?? "Something went wrong. Try again.",
      status: error.response.status,
    };
  }
  if (error.code === "ECONNABORTED") {
    return { message: "The request timed out. Try again." };
  }
  return { message: "Can't reach the server. Check your connection." };
}