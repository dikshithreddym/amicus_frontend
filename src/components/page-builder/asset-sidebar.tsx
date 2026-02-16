'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Type, 
  Heading, 
  FormInput, 
  FileText, 
  CheckSquare, 
  MessageSquare,
  ChevronRight,
  ChevronDown
} from 'lucide-react';
import type { Asset } from '@/types';

const AVAILABLE_ASSETS: Asset[] = [
  {
    id: 'text',
    type: 'text',
    name: 'Text Block',
    description: 'Add a paragraph of text',
    icon: 'Type',
    category: 'content',
    defaultData: { content: 'Enter your text here...' },
  },
  {
    id: 'heading',
    type: 'heading',
    name: 'Heading',
    description: 'Add a section heading',
    icon: 'Heading',
    category: 'content',
    defaultData: { content: 'Heading', level: 2 },
  },
  {
    id: 'form',
    type: 'form',
    name: 'Form',
    description: 'Add a dynamic form with fields',
    icon: 'FormInput',
    category: 'form',
    defaultData: { 
      title: 'New Form',
      fields: [
        { id: 'field-1', label: 'Name', type: 'text', required: true }
      ]
    },
  },
  {
    id: 'document',
    type: 'document',
    name: 'Document Viewer',
    description: 'Embed a document preview',
    icon: 'FileText',
    category: 'media',
    defaultData: { name: 'Document', url: '', fileType: 'application/pdf' },
  },
  {
    id: 'tasks',
    type: 'tasks',
    name: 'Tasks',
    description: 'Display a task list',
    icon: 'CheckSquare',
    category: 'content',
    defaultData: { tasks: [] },
  },
  {
    id: 'ai-chat',
    type: 'ai-chat',
    name: 'AI Assistant',
    description: 'Add an AI chat panel',
    icon: 'MessageSquare',
    category: 'integration',
    defaultData: {},
  },
];

const ICON_MAP = {
  Type,
  Heading,
  FormInput,
  FileText,
  CheckSquare,
  MessageSquare,
};

export function AssetSidebar() {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(['content', 'form', 'media', 'integration'])
  );

  const categories = Array.from(new Set(AVAILABLE_ASSETS.map(a => a.category)));

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => {
      const next = new Set(prev);
      if (next.has(category)) {
        next.delete(category);
      } else {
        next.add(category);
      }
      return next;
    });
  };

  const handleDragStart = (e: React.DragEvent, asset: Asset) => {
    e.dataTransfer.setData('application/json', JSON.stringify(asset));
    e.dataTransfer.effectAllowed = 'copy';
  };

  return (
    <div className="w-80 border-r bg-card h-full overflow-y-auto">
      <div className="p-4 border-b">
        <h2 className="font-semibold text-lg">Asset Library</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Drag blocks onto the canvas
        </p>
      </div>

      <div className="p-4 space-y-4">
        {categories.map((category) => {
          const isExpanded = expandedCategories.has(category);
          const assets = AVAILABLE_ASSETS.filter(a => a.category === category);

          return (
            <div key={category}>
              <button
                onClick={() => toggleCategory(category)}
                className="flex items-center justify-between w-full text-sm font-medium mb-2 hover:text-primary"
              >
                <span className="capitalize">{category}</span>
                {isExpanded ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </button>

              {isExpanded && (
                <div className="space-y-2">
                  {assets.map((asset) => {
                    const Icon = ICON_MAP[asset.icon as keyof typeof ICON_MAP];
                    
                    return (
                      <div
                        key={asset.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, asset)}
                        className="p-3 border rounded-lg cursor-grab hover:shadow-md transition-shadow bg-background"
                      >
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-primary/10 rounded">
                            <Icon className="h-4 w-4 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm">{asset.name}</p>
                            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                              {asset.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
