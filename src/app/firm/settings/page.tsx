'use client';

import { useQuery } from '@tanstack/react-query';
import { firmApi } from '@/lib/api/endpoints';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function FirmSettingsPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['firm', 'settings'],
    queryFn: () => firmApi.getSettings(),
  });

  const firm = data?.data;

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Firm Settings</h1>
          <p className="text-muted-foreground mt-1">
            Manage your firm's configuration
          </p>
        </div>

        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>General Information</CardTitle>
                <CardDescription>
                  Basic information about your firm
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Firm Name</label>
                  <Input defaultValue={firm?.name} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Timezone</label>
                  <Input defaultValue={firm?.settings?.timezone || 'UTC'} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Date Format</label>
                  <Input defaultValue={firm?.settings?.dateFormat || 'MM/DD/YYYY'} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Branding</CardTitle>
                <CardDescription>
                  Customize your firm's appearance
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Primary Color</label>
                  <Input type="color" defaultValue={firm?.settings?.primaryColor || '#3b82f6'} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Logo URL</label>
                  <Input defaultValue={firm?.settings?.logo} placeholder="https://..." />
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button>Save Changes</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
