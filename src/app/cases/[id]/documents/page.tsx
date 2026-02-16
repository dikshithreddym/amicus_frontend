'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { documentsApi } from '@/lib/api/endpoints';
import { Sidebar } from '@/components/layout/sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Upload } from 'lucide-react';

export default function DocumentsPage() {
  const params = useParams();
  const caseId = params.id as string;

  const { data, isLoading } = useQuery({
    queryKey: ['documents', caseId],
    queryFn: () => documentsApi.list(caseId),
  });

  const documents = data?.data || [];

  return (
    <div className="flex h-screen">
      <Sidebar caseId={caseId} />
      <div className="flex-1 p-8 overflow-auto">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">Documents</h1>
              <p className="text-muted-foreground mt-1">
                Manage case documents and files
              </p>
            </div>
            <Button>
              <Upload className="h-5 w-5 mr-2" />
              Upload Document
            </Button>
          </div>

          {isLoading ? (
            <div>Loading...</div>
          ) : documents.length === 0 ? (
            <Card>
              <CardHeader>
                <CardTitle>No documents yet</CardTitle>
              </CardHeader>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {documents.map((doc) => (
                <Card key={doc.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start gap-3">
                      <FileText className="h-5 w-5 text-primary" />
                      <div className="flex-1">
                        <CardTitle className="text-base">{doc.title}</CardTitle>
                        <p className="text-xs text-muted-foreground mt-1">
                          {doc.fileType}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {(doc.fileSize / 1024).toFixed(2)} KB
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
