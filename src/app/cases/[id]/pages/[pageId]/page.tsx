'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { pagesApi } from '@/lib/api/endpoints';
import { PageBuilder } from '@/components/page-builder/page-builder';
import { AssetSidebar } from '@/components/page-builder/asset-sidebar';
import { Sidebar } from '@/components/layout/sidebar';
import { Button } from '@/components/ui/button';
import { usePageBuilderStore } from '@/store/page-builder';
import { Edit, Eye } from 'lucide-react';

export default function PageDetailPage() {
  const params = useParams();
  const caseId = params.id as string;
  const pageId = params.pageId as string;
  const { isEditMode, setEditMode } = usePageBuilderStore();

  const { data, isLoading } = useQuery({
    queryKey: ['page', caseId, pageId],
    queryFn: () => pagesApi.get(caseId, pageId),
  });

  if (isLoading) {
    return (
      <div className="flex h-screen">
        <Sidebar caseId={caseId} />
        <div className="flex-1 p-8">
          <div className="text-lg">Loading...</div>
        </div>
      </div>
    );
  }

  const page = data?.data;
  if (!page) {
    return (
      <div className="flex h-screen">
        <Sidebar caseId={caseId} />
        <div className="flex-1 p-8">
          <div className="text-lg text-destructive">Page not found</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      <Sidebar caseId={caseId} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="border-b bg-card px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">{page.title}</h1>
            <p className="text-sm text-muted-foreground mt-1">
              {isEditMode ? 'Edit mode' : 'View mode'}
            </p>
          </div>
          <Button
            variant={isEditMode ? 'default' : 'outline'}
            onClick={() => setEditMode(!isEditMode)}
          >
            {isEditMode ? (
              <>
                <Eye className="h-4 w-4 mr-2" />
                View Mode
              </>
            ) : (
              <>
                <Edit className="h-4 w-4 mr-2" />
                Edit Mode
              </>
            )}
          </Button>
        </div>
        <div className="flex-1 flex overflow-hidden">
          {isEditMode && <AssetSidebar />}
          <div className="flex-1 overflow-auto p-6 bg-muted/20">
            <PageBuilder
              caseId={caseId}
              pageId={pageId}
              initialLayout={page.layout || []}
              blocks={page.blocks || []}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
