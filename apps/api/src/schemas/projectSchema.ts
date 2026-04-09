import { z } from 'zod'
import mongoose from "mongoose";

export const createProjectSchema = z.object({
  name: z
    .string({ error: 'Project name is required' })
    .min(1)
    .max(100, { error: 'Project name cannot exceed 100 characters' }),

  description: z
    .string()
    .max(500, { error: 'Description cannot exceed 500 characters' })
    .optional()
    .default(''),
})

export const getProjectParamsSchema = z.object({
  id: z
    .string()
    .min(1, { error: 'Project id is required' })
    .refine((val) => mongoose.Types.ObjectId.isValid(val), {
      error: 'Project id is invalid',
    }),
})

export const updateProjectSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  description: z.string().max(500).optional(),
});