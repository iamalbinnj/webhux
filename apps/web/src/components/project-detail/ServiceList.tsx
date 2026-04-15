'use client';

import { useProjectDetail } from '@/hooks/useProjectDetail';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Plus, Copy, ExternalLink } from 'lucide-react';
import CreateServiceForm from './CreateServiceForm';

interface ServiceListProps {
  projectId: string;
}

export default function ServiceList({ projectId }: ServiceListProps) {
  const { services, refetch } = useProjectDetail(projectId);
  console.log("projectid", projectId)

  return (
    <div className="mt-10">
      <div className="flex items-center justify-between mb-6">
        <CardTitle className="text-xl">Services</CardTitle>
        <Button variant="outline" size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add service
        </Button>
      </div>

      <div className="grid gap-4">
        {services.map((service) => (
          <Card key={service.id} className="border border-gray-100 hover:border-blue-200 transition-colors">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <h4 className="font-semibold">{service.name}</h4>
                  <Badge variant="outline" className="text-xs font-mono">
                    {service.publicId}
                  </Badge>
                </div>
                <p className="text-xs text-gray-400 mt-1 font-mono">Created {new Date(service.createdAt).toLocaleDateString()}</p>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    navigator.clipboard.writeText(`process.env.NEXT_PUBLIC_API_BASE_URL/webhook/${service.publicId}`);
                  }}
                >
                  <Copy className="w-4 h-4" />
                </Button>
                <Link href={`/dashboard/services/${projectId}/${service.id}`}>
                  <Button variant="outline" size="sm">
                    View
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <CreateServiceForm projectId={projectId} onCreated={refetch} />
    </div>
  );
}