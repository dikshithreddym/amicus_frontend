'use client';

import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { casesApi } from '@/lib/api/endpoints';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, FolderOpen } from 'lucide-react';

export default function CasesPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['cases'],
    queryFn: () => casesApi.list(),
  });

  if (isLoading) {
    return (
      <div className="p-8">
        <div className="text-lg">Loading cases...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="text-lg text-destructive">Failed to load cases</div>
      </div>
    );
  }

  const cases = data?.data || [];

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Cases</h1>
          <p className="text-muted-foreground mt-1">
            Manage your legal cases
          </p>
        </div>
        <Button>
          <Plus className="h-5 w-5 mr-2" />
          New Case
        </Button>
      </div>

      {cases.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>No cases yet</CardTitle>
            <CardDescription>
              Get started by creating your first case
            </CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cases.map((caseItem) => (
            <Link key={caseItem.id} href={`/cases/${caseItem.id}`}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <FolderOpen className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg">{caseItem.title}</CardTitle>
                      <CardDescription className="mt-1">
                        {caseItem.clientName}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm">
                    <span className={`px-2 py-1 rounded-full ${
                      caseItem.status === 'active' 
                        ? 'bg-green-100 text-green-700'
                        : caseItem.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {caseItem.status}
                    </span>
                    <span className="text-muted-foreground">
                      {new Date(caseItem.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                  {caseItem.description && (
                    <p className="text-sm text-muted-foreground mt-3 line-clamp-2">
                      {caseItem.description}
                    </p>
                  )}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
