'use client';

import type { Block } from '@/types';
import { CheckSquare, Square } from 'lucide-react';

interface TasksBlockProps {
  block: Block;
}

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

export function TasksBlock({ block }: TasksBlockProps) {
  const tasks = (block.data?.tasks as Task[]) || [];

  return (
    <div className="p-4">
      <h3 className="font-semibold text-lg mb-4">Tasks</h3>
      <div className="space-y-2">
        {tasks.length === 0 ? (
          <p className="text-sm text-muted-foreground">No tasks yet</p>
        ) : (
          tasks.map((task) => (
            <div key={task.id} className="flex items-center gap-3 p-2 hover:bg-accent rounded">
              {task.completed ? (
                <CheckSquare className="h-5 w-5 text-primary" />
              ) : (
                <Square className="h-5 w-5 text-muted-foreground" />
              )}
              <span className={task.completed ? 'line-through text-muted-foreground' : ''}>
                {task.title}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
