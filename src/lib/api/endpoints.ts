import { apiClient } from './client';
import type {
  LoginCredentials,
  User,
  Case,
  Page,
  Document,
  Task,
  AiConversation,
  AiMessage,
  Template,
  Firm,
  FirmUser,
  LayoutItem,
} from '@/types';

// Auth API
export const authApi = {
  login: (credentials: LoginCredentials) =>
    apiClient.post<{ token: string; user: User }>('/auth/login', credentials),
  
  logout: () =>
    apiClient.post('/auth/logout'),
  
  getCurrentUser: () =>
    apiClient.get<User>('/auth/me'),
};

// Cases API
export const casesApi = {
  list: (params?: { page?: number; per_page?: number; status?: string }) =>
    apiClient.get<Case[]>('/cases', params as Record<string, string>),
  
  get: (id: string) =>
    apiClient.get<Case>(`/cases/${id}`),
  
  create: (data: Partial<Case>) =>
    apiClient.post<Case>('/cases', { data }),
  
  update: (id: string, data: Partial<Case>) =>
    apiClient.patch<Case>(`/cases/${id}`, { data }),
  
  delete: (id: string) =>
    apiClient.delete(`/cases/${id}`),
};

// Pages API
export const pagesApi = {
  list: (caseId: string) =>
    apiClient.get<Page[]>(`/cases/${caseId}/pages`),
  
  get: (caseId: string, pageId: string) =>
    apiClient.get<Page>(`/cases/${caseId}/pages/${pageId}`),
  
  create: (caseId: string, data: Partial<Page>) =>
    apiClient.post<Page>(`/cases/${caseId}/pages`, { data }),
  
  update: (caseId: string, pageId: string, data: Partial<Page>) =>
    apiClient.patch<Page>(`/cases/${caseId}/pages/${pageId}`, { data }),
  
  updateLayout: (caseId: string, pageId: string, layout: LayoutItem[]) =>
    apiClient.patch<Page>(`/cases/${caseId}/pages/${pageId}/layout`, { layout }),
  
  delete: (caseId: string, pageId: string) =>
    apiClient.delete(`/cases/${caseId}/pages/${pageId}`),
};

// Documents API
export const documentsApi = {
  list: (caseId: string) =>
    apiClient.get<Document[]>(`/cases/${caseId}/documents`),
  
  get: (caseId: string, documentId: string) =>
    apiClient.get<Document>(`/cases/${caseId}/documents/${documentId}`),
  
  upload: (caseId: string, file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return apiClient.post<Document>(`/cases/${caseId}/documents`, formData);
  },
  
  delete: (caseId: string, documentId: string) =>
    apiClient.delete(`/cases/${caseId}/documents/${documentId}`),
};

// Tasks API
export const tasksApi = {
  list: (caseId: string) =>
    apiClient.get<Task[]>(`/cases/${caseId}/tasks`),
  
  get: (caseId: string, taskId: string) =>
    apiClient.get<Task>(`/cases/${caseId}/tasks/${taskId}`),
  
  create: (caseId: string, data: Partial<Task>) =>
    apiClient.post<Task>(`/cases/${caseId}/tasks`, { data }),
  
  update: (caseId: string, taskId: string, data: Partial<Task>) =>
    apiClient.patch<Task>(`/cases/${caseId}/tasks/${taskId}`, { data }),
  
  delete: (caseId: string, taskId: string) =>
    apiClient.delete(`/cases/${caseId}/tasks/${taskId}`),
};

// AI API
export const aiApi = {
  getConversations: (caseId: string) =>
    apiClient.get<AiConversation[]>(`/cases/${caseId}/ai_conversations`),
  
  createConversation: (caseId: string, context: { type: string; id: string }) =>
    apiClient.post<AiConversation>(`/cases/${caseId}/ai_conversations`, { context }),
  
  sendMessage: (caseId: string, conversationId: string, content: string) =>
    apiClient.post<AiMessage>(
      `/cases/${caseId}/ai_conversations/${conversationId}/messages`,
      { content }
    ),
};

// Firm API
export const firmApi = {
  getSettings: () =>
    apiClient.get<Firm>('/firm/settings'),
  
  updateSettings: (data: Partial<Firm>) =>
    apiClient.patch<Firm>('/firm/settings', { data }),
  
  listUsers: () =>
    apiClient.get<FirmUser[]>('/firm/users'),
  
  inviteUser: (email: string, role: string) =>
    apiClient.post<FirmUser>('/firm/users/invite', { email, role }),
};

// Templates API
export const templatesApi = {
  list: () =>
    apiClient.get<Template[]>('/firm/templates'),
  
  get: (id: string) =>
    apiClient.get<Template>(`/firm/templates/${id}`),
  
  create: (data: Partial<Template>) =>
    apiClient.post<Template>('/firm/templates', { data }),
  
  update: (id: string, data: Partial<Template>) =>
    apiClient.patch<Template>(`/firm/templates/${id}`, { data }),
  
  delete: (id: string) =>
    apiClient.delete(`/firm/templates/${id}`),
};
