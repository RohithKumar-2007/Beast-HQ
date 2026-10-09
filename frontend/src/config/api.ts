/// <reference types="vite/client" />

/**
 * Configurable API Base URL for BEAST HQ Frontend.
 * In development, defaults to relative '/api' which is proxied by Vite to http://localhost:5000.
 * In production (e.g., Vercel), can be overridden via VITE_API_BASE_URL (e.g., https://your-backend.onrender.com/api).
 */
export const getApiBaseUrl = (): string => {
  const envUrl = import.meta.env.VITE_API_BASE_URL;
  if (envUrl && typeof envUrl === 'string' && envUrl.trim() !== '') {
    return envUrl.trim().replace(/\/+$/, '');
  }
  return '/api';
};

export const API_BASE_URL = getApiBaseUrl();
