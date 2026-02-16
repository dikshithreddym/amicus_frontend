'use client';

import type { Block } from '@/types';

interface HeadingBlockProps {
  block: Block;
}

export function HeadingBlock({ block }: HeadingBlockProps) {
  const content = (block.data?.content as string) || '';
  const level = (block.data?.level as number) || 2;

  const HeadingTag = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

  return (
    <div className="p-4">
      <HeadingTag className="font-bold text-lg">{content}</HeadingTag>
    </div>
  );
}
