import { apiConfig } from './config';
import type { ApiResponse, ApiError } from '@/types';

export class ApiClient {
  private baseUrl: string;
  private headers: Record<string, string>;

  constructor() {
    this.baseUrl = apiConfig.baseUrl;
    this.headers = { ...apiConfig.headers };
  }

  private getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(apiConfig.jwtStorageKey);
  }

  private getAuthHeaders(): Record<string, string> {
    const token = this.getToken();
    if (token) {
      return {
        ...this.headers,
        Authorization: `Bearer ${token}`,
      };
    }
    return this.headers;
  }

  async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = this.getAuthHeaders();

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...headers,
          ...options.headers,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw {
          status: response.status,
          errors: data.errors || [
            {
              status: response.status.toString(),
              title: response.statusText,
              detail: data.message || 'An error occurred',
            },
          ],
        };
      }

      return data as ApiResponse<T>;
    } catch (error) {
      if (error && typeof error === 'object' && 'errors' in error) {
        throw error;
      }
      throw {
        status: 500,
        errors: [
          {
            status: '500',
            title: 'Network Error',
            detail: error instanceof Error ? error.message : 'An error occurred',
          },
        ],
      };
    }
  }

  async get<T>(endpoint: string, params?: Record<string, string>): Promise<ApiResponse<T>> {
    const queryString = params
      ? '?' + new URLSearchParams(params).toString()
      : '';
    return this.request<T>(`${endpoint}${queryString}`, {
      method: 'GET',
    });
  }

  async post<T>(endpoint: string, body?: unknown): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
    });
  }

  async patch<T>(endpoint: string, body?: unknown): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(body),
    });
  }

  async put<T>(endpoint: string, body?: unknown): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(body),
    });
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'DELETE',
    });
  }

  setToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(apiConfig.jwtStorageKey, token);
    }
  }

  clearToken(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(apiConfig.jwtStorageKey);
    }
  }

  hasToken(): boolean {
    return !!this.getToken();
  }
}

export const apiClient = new ApiClient();
