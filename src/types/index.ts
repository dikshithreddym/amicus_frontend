// API Types
export interface ApiResponse<T = unknown> {
  data: T;
  meta?: {
    total?: number;
    page?: number;
    per_page?: number;
  };
  errors?: ApiError[];
}

export interface ApiError {
  status: string;
  title: string;
  detail?: string;
}

// Auth Types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthToken {
  token: string;
  expiresAt: number;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  firmId: string;
}

// Case Types
export interface Case {
  id: string;
  title: string;
  description?: string;
  status: 'active' | 'closed' | 'pending';
  clientName: string;
  createdAt: string;
  updatedAt: string;
  firmId: string;
}

// Page Types
export interface Page {
  id: string;
  title: string;
  caseId?: string;
  firmId: string;
  isTemplate: boolean;
  layout: LayoutItem[];
  blocks: Block[];
  createdAt: string;
  updatedAt: string;
}

export interface LayoutItem {
  i: string; // block id
  x: number;
  y: number;
  w: number;
  h: number;
  minW?: number;
  minH?: number;
  maxW?: number;
  maxH?: number;
  static?: boolean;
}

export interface Block {
  id: string;
  type: BlockType;
  pageId: string;
  data: BlockData;
  createdAt: string;
  updatedAt: string;
}

export type BlockType = 
  | 'text'
  | 'heading'
  | 'form'
  | 'document'
  | 'tasks'
  | 'timeline'
  | 'notes'
  | 'ai-chat';

export interface BlockData {
  [key: string]: unknown;
}

// Form Types
export interface FormBlock extends Block {
  type: 'form';
  data: {
    title: string;
    fields: FormField[];
  };
}

export interface FormField {
  id: string;
  label: string;
  type: FieldType;
  value?: unknown;
  required?: boolean;
  options?: FieldOption[];
  validation?: FieldValidation;
}

export type FieldType = 
  | 'text'
  | 'textarea'
  | 'number'
  | 'email'
  | 'phone'
  | 'date'
  | 'select'
  | 'checkbox'
  | 'radio'
  | 'file';

export interface FieldOption {
  value: string;
  label: string;
}

export interface FieldValidation {
  min?: number;
  max?: number;
  pattern?: string;
  message?: string;
}

// Document Types
export interface Document {
  id: string;
  title: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  url: string;
  caseId: string;
  uploadedBy: string;
  createdAt: string;
  updatedAt: string;
}

// Task Types
export interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'todo' | 'in_progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
  assignedTo?: string;
  caseId: string;
  createdAt: string;
  updatedAt: string;
}

// AI Types
export interface AiConversation {
  id: string;
  messages: AiMessage[];
  context: AiContext;
  caseId: string;
  createdAt: string;
  updatedAt: string;
}

export interface AiMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
}

export interface AiContext {
  type: 'case' | 'page' | 'block' | 'document';
  id: string;
  metadata?: Record<string, unknown>;
}

// Firm Types
export interface Firm {
  id: string;
  name: string;
  settings: FirmSettings;
  createdAt: string;
  updatedAt: string;
}

export interface FirmSettings {
  logo?: string;
  primaryColor?: string;
  timezone?: string;
  dateFormat?: string;
}

export interface FirmUser extends User {
  permissions: string[];
  invitedAt: string;
  status: 'active' | 'invited' | 'suspended';
}

// Template Types
export interface Template {
  id: string;
  name: string;
  description?: string;
  category: string;
  firmId: string;
  page: Omit<Page, 'id' | 'caseId' | 'createdAt' | 'updatedAt'>;
  createdAt: string;
  updatedAt: string;
}

// Asset Types
export interface Asset {
  id: string;
  type: BlockType;
  name: string;
  description?: string;
  icon: string;
  defaultData: BlockData;
  category: 'content' | 'form' | 'media' | 'integration';
}
