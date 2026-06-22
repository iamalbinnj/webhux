"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useCreateService } from "@/hooks/useCreateService";
import { serviceSchema } from "@/lib/schemas";
import type { CreateServicePayload } from "@/types/service.types";

interface CreateServiceFormProps {
  projectId: string;
  open: boolean;
  onClose: () => void;
  onCreated: () => void;
}

export default function CreateServiceForm({ projectId, open, onClose, onCreated }: CreateServiceFormProps) {
  const { create, isSubmitting } = useCreateService(projectId, () => {
    onCreated();
    onClose();
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateServicePayload>({ resolver: zodResolver(serviceSchema) });

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] grid place-items-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-[#111] p-6 text-white shadow-2xl">
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h2 className="text-xl font-semibold">Create Service</h2>
            <p className="mt-1 text-sm text-white/40">Each service receives a unique public webhook URL.</p>
          </div>
          <button onClick={onClose} className="rounded-xl p-2 text-white/45 hover:bg-white/5 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>
        <form
          onSubmit={handleSubmit(async (data) => {
            await create(data);
            reset();
          })}
          className="space-y-5"
        >
          <div className="space-y-2">
            <label className="text-sm font-medium">Service Name</label>
            <input {...register("name")} placeholder="Stripe" className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 outline-none placeholder:text-white/25 focus:ring-2 focus:ring-white/20" />
            {errors.name ? <p className="text-xs text-red-300">{errors.name.message}</p> : null}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <textarea placeholder="Payment lifecycle events." rows={3} className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 outline-none placeholder:text-white/25 focus:ring-2 focus:ring-white/20" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Secret Key <span className="text-white/35">(Optional)</span></label>
            <input {...register("secretKey")} placeholder="sk_live_..." className="h-12 w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 font-mono outline-none placeholder:text-white/25 focus:ring-2 focus:ring-white/20" />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="h-11 rounded-xl border border-white/10 px-5 text-sm font-semibold text-white/70 hover:bg-white/5">Cancel</button>
            <button type="submit" disabled={isSubmitting} className="h-11 rounded-xl bg-white px-5 text-sm font-semibold text-black disabled:opacity-60">{isSubmitting ? "Creating..." : "Create"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
