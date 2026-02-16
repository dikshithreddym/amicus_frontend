'use client';

import type { Block } from '@/types';

interface TextBlockProps {
  block: Block;
}

export function TextBlock({ block }: TextBlockProps) {
  const content = (block.data?.content as string) || '';

  return (
    <div className="p-4">
      <p className="text-sm whitespace-pre-wrap">{content}</p>
    </div>
  );
}
