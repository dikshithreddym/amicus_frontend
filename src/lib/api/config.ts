const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api';
const API_VERSION = process.env.NEXT_PUBLIC_API_VERSION || 'v1';
const JWT_STORAGE_KEY = process.env.NEXT_PUBLIC_JWT_STORAGE_KEY || 'amicus_jwt_token';

export const apiConfig = {
  baseUrl: `${API_BASE_URL}/${API_VERSION}`,
  jwtStorageKey: JWT_STORAGE_KEY,
  headers: {
    'Content-Type': 'application/vnd.api+json',
    'Accept': 'application/vnd.api+json',
  },
};
