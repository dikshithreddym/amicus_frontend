import { create } from 'zustand';
import type { LayoutItem } from '@/types';

interface PageBuilderState {
  layout: LayoutItem[];
  selectedBlockId: string | null;
  isEditMode: boolean;
  isDirty: boolean;
  
  setLayout: (layout: LayoutItem[]) => void;
  updateLayout: (layout: LayoutItem[]) => void;
  selectBlock: (blockId: string | null) => void;
  setEditMode: (isEditMode: boolean) => void;
  markDirty: () => void;
  markClean: () => void;
}

export const usePageBuilderStore = create<PageBuilderState>((set) => ({
  layout: [],
  selectedBlockId: null,
  isEditMode: false,
  isDirty: false,

  setLayout: (layout) => set({ layout, isDirty: false }),
  
  updateLayout: (layout) => set({ layout, isDirty: true }),
  
  selectBlock: (blockId) => set({ selectedBlockId: blockId }),
  
  setEditMode: (isEditMode) => set({ isEditMode }),
  
  markDirty: () => set({ isDirty: true }),
  
  markClean: () => set({ isDirty: false }),
}));
