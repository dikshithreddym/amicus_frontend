'use client';

import { GripVertical } from 'lucide-react';
import type { Block } from '@/types';
import { TextBlock } from '@/components/blocks/text-block';
import { HeadingBlock } from '@/components/blocks/heading-block';
import { FormBlock } from '@/components/blocks/form-block';
import { DocumentBlock } from '@/components/blocks/document-block';
import { TasksBlock } from '@/components/blocks/tasks-block';
import { AiChatBlock } from '@/components/blocks/ai-chat-block';

interface BlockRendererProps {
  block: Block;
  isEditMode: boolean;
}

export function BlockRenderer({ block, isEditMode }: BlockRendererProps) {
  const renderBlock = () => {
    switch (block.type) {
      case 'text':
        return <TextBlock block={block} />;
      case 'heading':
        return <HeadingBlock block={block} />;
      case 'form':
        return <FormBlock block={block} />;
      case 'document':
        return <DocumentBlock block={block} />;
      case 'tasks':
        return <TasksBlock block={block} />;
      case 'ai-chat':
        return <AiChatBlock block={block} />;
      default:
        return <div className="p-4">Unknown block type: {block.type}</div>;
    }
  };

  return (
    <div className="h-full flex flex-col">
      {isEditMode && (
        <div className="drag-handle cursor-move bg-muted border-b px-3 py-2 flex items-center gap-2">
          <GripVertical className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium capitalize">{block.type}</span>
        </div>
      )}
      <div className="flex-1 overflow-auto">
        {renderBlock()}
      </div>
    </div>
  );
}
