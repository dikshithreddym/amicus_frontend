import { create } from 'zustand';
import { apiClient } from '@/lib/api/client';
import { authApi } from '@/lib/api/endpoints';
import type { User, LoginCredentials } from '@/types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  login: async (credentials: LoginCredentials) => {
    set({ isLoading: true, error: null });
    try {
      const response = await authApi.login(credentials);
      const { token, user } = response.data;
      
      apiClient.setToken(token);
      set({ user, isAuthenticated: true, isLoading: false });
    } catch (error: any) {
      const errorMessage = error.errors?.[0]?.detail || 'Login failed';
      set({ error: errorMessage, isLoading: false });
      throw error;
    }
  },

  logout: () => {
    apiClient.clearToken();
    set({ user: null, isAuthenticated: false });
  },

  checkAuth: async () => {
    if (!apiClient.hasToken()) {
      set({ isAuthenticated: false });
      return;
    }

    set({ isLoading: true });
    try {
      const response = await authApi.getCurrentUser();
      set({ user: response.data, isAuthenticated: true, isLoading: false });
    } catch (error) {
      apiClient.clearToken();
      set({ user: null, isAuthenticated: false, isLoading: false });
    }
  },

  clearError: () => set({ error: null }),
}));
