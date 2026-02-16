'use client';

import { useQuery } from '@tanstack/react-query';
import { firmApi } from '@/lib/api/endpoints';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, UserPlus } from 'lucide-react';

export default function FirmUsersPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['firm', 'users'],
    queryFn: () => firmApi.listUsers(),
  });

  const users = data?.data || [];

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Team Members</h1>
            <p className="text-muted-foreground mt-1">
              Manage your firm's users and permissions
            </p>
          </div>
          <Button>
            <UserPlus className="h-5 w-5 mr-2" />
            Invite User
          </Button>
        </div>

        {isLoading ? (
          <div>Loading...</div>
        ) : users.length === 0 ? (
          <Card>
            <CardHeader>
              <CardTitle>No users yet</CardTitle>
            </CardHeader>
          </Card>
        ) : (
          <div className="space-y-3">
            {users.map((user) => (
              <Card key={user.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">
                        {user.firstName} {user.lastName}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        {user.email}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        user.status === 'active' 
                          ? 'bg-green-100 text-green-700'
                          : user.status === 'invited'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {user.status}
                      </span>
                      <p className="text-sm text-muted-foreground mt-2">
                        Role: {user.role}
                      </p>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
