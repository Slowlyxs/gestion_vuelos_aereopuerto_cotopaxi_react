// src/infrastructure/config/api.config.ts

export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL ?? 'http://cotopaxi-airlines-api.uaeftt-ute.site/api',
  TIMEOUT: 10_000,
} as const