import { z } from 'zod';
import mongoose from 'mongoose';

export const projectIdParamSchema = z.object({
  projectId: z
    .string({ error: 'Project ID is required' })
    .min(1, 'Project ID is required')
    .refine((val) => mongoose.Types.ObjectId.isValid(val), {
      message: 'Project id is invalid',
    }),
});

export const serviceIdParamSchema = z.object({
  id: z
    .string({ error: 'Service ID is required' })
    .min(1, 'Service ID is required')
    .refine((val) => mongoose.Types.ObjectId.isValid(val), {
      message: 'Service id is invalid',
    }),
});

export const serviceParamsSchema = projectIdParamSchema.merge(serviceIdParamSchema);

export const createServiceSchema = z.object({
  name: z
    .string({ error: 'Service name is required' })
    .min(1, 'Service name is required')
    .max(100, 'Service name cannot exceed 100 characters'),
});

export const updateServiceSchema = z.object({
  name: z
    .string()
    .min(1, 'Service name is required')
    .max(100, 'Service name cannot exceed 100 characters')
    .optional(),

  secretKey: z
    .string()
    .optional(),
});