'use client';

import { useEffect, useMemo } from 'react';
import { useMutation } from '@tanstack/react-query';
import GridLayout, { Layout } from 'react-grid-layout';
import { usePageBuilderStore } from '@/store/page-builder';
import { pagesApi } from '@/lib/api/endpoints';
import { BlockRenderer } from './block-renderer';
import type { Block, LayoutItem } from '@/types';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

interface PageBuilderProps {
  caseId: string;
  pageId: string;
  initialLayout: LayoutItem[];
  blocks: Block[];
}

export function PageBuilder({ caseId, pageId, initialLayout, blocks }: PageBuilderProps) {
  const { layout, isEditMode, setLayout, updateLayout } = usePageBuilderStore();

  useEffect(() => {
    setLayout(initialLayout);
  }, [initialLayout, setLayout]);

  const layoutMutation = useMutation({
    mutationFn: (newLayout: LayoutItem[]) =>
      pagesApi.updateLayout(caseId, pageId, newLayout),
  });

  const handleLayoutChange = (newLayout: Layout[]) => {
    const updatedLayout: LayoutItem[] = newLayout.map((item) => ({
      i: item.i,
      x: item.x,
      y: item.y,
      w: item.w,
      h: item.h,
      minW: item.minW,
      minH: item.minH,
      maxW: item.maxW,
      maxH: item.maxH,
      static: item.static,
    }));
    updateLayout(updatedLayout);
  };

  const handleSaveLayout = () => {
    layoutMutation.mutate(layout);
  };

  const blockMap = useMemo(() => {
    return blocks.reduce((acc, block) => {
      acc[block.id] = block;
      return acc;
    }, {} as Record<string, Block>);
  }, [blocks]);

  return (
    <div className="relative">
      {isEditMode && (
        <div className="fixed top-4 right-4 z-50 bg-card border rounded-lg p-4 shadow-lg">
          <button
            onClick={handleSaveLayout}
            disabled={layoutMutation.isPending}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            {layoutMutation.isPending ? 'Saving...' : 'Save Layout'}
          </button>
        </div>
      )}

      <GridLayout
        className="layout"
        layout={layout}
        cols={12}
        rowHeight={30}
        width={1200}
        isDraggable={isEditMode}
        isResizable={isEditMode}
        onLayoutChange={handleLayoutChange}
        draggableHandle=".drag-handle"
      >
        {layout.map((item) => {
          const block = blockMap[item.i];
          if (!block) return null;

          return (
            <div key={item.i} className="bg-card border rounded-lg shadow-sm overflow-hidden">
              <BlockRenderer block={block} isEditMode={isEditMode} />
            </div>
          );
        })}
      </GridLayout>
    </div>
  );
}
