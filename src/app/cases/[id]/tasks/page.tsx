'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { tasksApi } from '@/lib/api/endpoints';
import { Sidebar } from '@/components/layout/sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, CheckSquare, Square } from 'lucide-react';

export default function TasksPage() {
  const params = useParams();
  const caseId = params.id as string;

  const { data, isLoading } = useQuery({
    queryKey: ['tasks', caseId],
    queryFn: () => tasksApi.list(caseId),
  });

  const tasks = data?.data || [];

  return (
    <div className="flex h-screen">
      <Sidebar caseId={caseId} />
      <div className="flex-1 p-8 overflow-auto">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">Tasks</h1>
              <p className="text-muted-foreground mt-1">
                Track case tasks and deadlines
              </p>
            </div>
            <Button>
              <Plus className="h-5 w-5 mr-2" />
              New Task
            </Button>
          </div>

          {isLoading ? (
            <div>Loading...</div>
          ) : tasks.length === 0 ? (
            <Card>
              <CardHeader>
                <CardTitle>No tasks yet</CardTitle>
              </CardHeader>
            </Card>
          ) : (
            <div className="space-y-3">
              {tasks.map((task) => (
                <Card key={task.id}>
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      {task.status === 'done' ? (
                        <CheckSquare className="h-6 w-6 text-primary mt-1" />
                      ) : (
                        <Square className="h-6 w-6 text-muted-foreground mt-1" />
                      )}
                      <div className="flex-1">
                        <CardTitle className={task.status === 'done' ? 'line-through text-muted-foreground' : ''}>
                          {task.title}
                        </CardTitle>
                        {task.description && (
                          <p className="text-sm text-muted-foreground mt-2">
                            {task.description}
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          task.priority === 'high' 
                            ? 'bg-red-100 text-red-700'
                            : task.priority === 'medium'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-green-100 text-green-700'
                        }`}>
                          {task.priority}
                        </span>
                        {task.dueDate && (
                          <p className="text-xs text-muted-foreground mt-2">
                            Due: {new Date(task.dueDate).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
