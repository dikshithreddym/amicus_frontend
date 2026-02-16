'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { casesApi, pagesApi } from '@/lib/api/endpoints';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Plus } from 'lucide-react';
import { Sidebar } from '@/components/layout/sidebar';

export default function CaseDetailPage() {
  const params = useParams();
  const caseId = params.id as string;

  const { data: caseData, isLoading: caseLoading } = useQuery({
    queryKey: ['case', caseId],
    queryFn: () => casesApi.get(caseId),
  });

  const { data: pagesData, isLoading: pagesLoading } = useQuery({
    queryKey: ['pages', caseId],
    queryFn: () => pagesApi.list(caseId),
  });

  if (caseLoading || pagesLoading) {
    return (
      <div className="flex h-screen">
        <Sidebar caseId={caseId} />
        <div className="flex-1 p-8">
          <div className="text-lg">Loading...</div>
        </div>
      </div>
    );
  }

  const caseItem = caseData?.data;
  const pages = pagesData?.data || [];

  return (
    <div className="flex h-screen">
      <Sidebar caseId={caseId} />
      <div className="flex-1 p-8 overflow-auto">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">{caseItem?.title}</h1>
            <p className="text-muted-foreground mt-2">
              Client: {caseItem?.clientName}
            </p>
            {caseItem?.description && (
              <p className="mt-4">{caseItem.description}</p>
            )}
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold">Pages</h2>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                New Page
              </Button>
            </div>

            {pages.length === 0 ? (
              <Card>
                <CardHeader>
                  <CardTitle>No pages yet</CardTitle>
                  <CardDescription>
                    Create your first page to start building your case
                  </CardDescription>
                </CardHeader>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {pages.map((page) => (
                  <Link key={page.id} href={`/cases/${caseId}/pages/${page.id}`}>
                    <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                      <CardHeader>
                        <div className="flex items-start gap-3">
                          <FileText className="h-5 w-5 text-primary" />
                          <div>
                            <CardTitle className="text-base">{page.title}</CardTitle>
                            <CardDescription className="mt-1 text-xs">
                              {page.blocks?.length || 0} blocks
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
