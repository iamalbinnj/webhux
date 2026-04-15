'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCreateService } from '@/hooks/useCreateService';
// import { useGenerateSecretKey } from '@/hooks/useGenerateSecretKey';
import { serviceSchema } from '@/lib/schemas';
import { RefreshCw } from 'lucide-react';
import type { CreateServicePayload } from '@/types/service.types';

interface CreateServiceFormProps {
  projectId: string;
  onCreated: () => void;
}

export default function CreateServiceForm({ projectId, onCreated }: CreateServiceFormProps) {
  const { create, isSubmitting } = useCreateService(projectId, onCreated);
//   const { generate, generatedKey, isLoading: generating } = useGenerateSecretKey();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<CreateServicePayload>({
    resolver: zodResolver(serviceSchema),
  });

//   const handleGenerateKey = async () => {
//     const key = await generate();
//     if (key) {
//       setValue('secretKey', key);
//     }
//   };

  const onSubmit = async (data: CreateServicePayload) => {
    await create(data);
    reset();
  };

  return (
    <Card className="mt-12 border border-gray-100">
      <CardHeader>
        <CardTitle className="text-lg">Create new service</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-6">
          <div className="space-y-2 col-span-2 md:col-span-1">
            <Label>Service name</Label>
            <Input {...register('name')} placeholder="My API webhook" />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          <div className="space-y-2 col-span-2 md:col-span-1">
            <Label>Secret key (optional)</Label>
            <div className="flex gap-2">
              <Input
                {...register('secretKey')}
                placeholder="sk_••••••••"
              />
              {/* <Button
                type="button"
                variant="outline"
                onClick={handleGenerateKey}
                disabled={generating}
                className="shrink-0"
              >
                <RefreshCw className={`w-4 h-4 ${generating ? 'animate-spin' : ''}`} />
              </Button> */}
            </div>
          </div>

          <Button type="submit" className="col-span-2" disabled={isSubmitting}>
            {isSubmitting ? 'Creating service...' : 'Create service'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}