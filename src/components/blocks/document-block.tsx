'use client';

import type { Block } from '@/types';
import { FileText } from 'lucide-react';

interface DocumentBlockProps {
  block: Block;
}

export function DocumentBlock({ block }: DocumentBlockProps) {
  const documentUrl = (block.data?.url as string) || '';
  const documentName = (block.data?.name as string) || 'Document';
  const fileType = (block.data?.fileType as string) || '';

  return (
    <div className="p-4">
      <div className="flex items-center gap-3 mb-4">
        <FileText className="h-6 w-6 text-primary" />
        <div>
          <h3 className="font-semibold">{documentName}</h3>
          <p className="text-xs text-muted-foreground">{fileType}</p>
        </div>
      </div>
      {fileType === 'application/pdf' && documentUrl ? (
        <iframe
          src={documentUrl}
          className="w-full h-[400px] border rounded"
          title={documentName}
        />
      ) : (
        <div className="text-sm text-muted-foreground">
          Document preview not available
        </div>
      )}
    </div>
  );
}
