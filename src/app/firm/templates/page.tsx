'use client';

import { useQuery } from '@tanstack/react-query';
import { templatesApi } from '@/lib/api/endpoints';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, LayoutTemplate } from 'lucide-react';

export default function TemplatesPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['templates'],
    queryFn: () => templatesApi.list(),
  });

  const templates = data?.data || [];

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Page Templates</h1>
            <p className="text-muted-foreground mt-1">
              Create and manage reusable page templates
            </p>
          </div>
          <Button>
            <Plus className="h-5 w-5 mr-2" />
            New Template
          </Button>
        </div>

        {isLoading ? (
          <div>Loading...</div>
        ) : templates.length === 0 ? (
          <Card>
            <CardHeader>
              <CardTitle>No templates yet</CardTitle>
              <CardDescription>
                Create templates to speed up case setup
              </CardDescription>
            </CardHeader>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template) => (
              <Card key={template.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <LayoutTemplate className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      <CardDescription className="mt-1">
                        {template.category}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {template.description && (
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {template.description}
                    </p>
                  )}
                  <div className="mt-4 flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      Preview
                    </Button>
                    <Button size="sm" className="flex-1">
                      Use Template
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
