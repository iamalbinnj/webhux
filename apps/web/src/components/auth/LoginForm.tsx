"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "motion/react";
import { Circle, Eye, EyeOff, Loader2, Globe2, GitBranch } from "lucide-react";
import { loginSchema } from "@/lib/schemas";
import { useAuth } from "@/hooks/useAuth";
import type { LoginPayload } from "@/types/auth.types";

const authVideo =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260506_081238_406ed0e3-5d83-436e-a512-0bbff7ec5b95.mp4";

const parent = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
};

const child = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading, error } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginPayload>({ resolver: zodResolver(loginSchema) });

  return (
    <main className="flex min-h-screen w-full bg-black p-2 text-white selection:bg-white/30 transition-all duration-500 lg:h-screen lg:overflow-hidden lg:p-4">
      <section className="relative hidden h-full w-[52%] flex-col items-center justify-end overflow-hidden rounded-3xl px-12 pb-32 shadow-2xl lg:flex">
        <video className="absolute inset-0 h-full w-full object-cover" autoPlay muted loop playsInline>
          <source src={authVideo} type="video/mp4" />
        </video>
        <motion.div variants={parent} initial="hidden" animate="show" className="z-10 w-full max-w-xs space-y-8">
          <motion.div variants={child} className="flex items-center gap-3">
            <Circle className="h-5 w-5 fill-white text-white" />
            <span className="text-xl font-semibold tracking-tight">Webhux</span>
          </motion.div>
          <motion.div variants={child} className="space-y-3">
            <h1 className="whitespace-nowrap text-4xl font-medium tracking-tight">Welcome back</h1>
            <p className="px-4 text-sm leading-relaxed text-white/60">Inspect every webhook event from one calm control room.</p>
          </motion.div>
          <motion.div variants={child} className="space-y-3">
            <StepItem number="1" text="Authenticate your identity" active />
            <StepItem number="2" text="Review your projects" />
            <StepItem number="3" text="Monitor live events" />
          </motion.div>
        </motion.div>
      </section>

      <section className="flex flex-1 flex-col items-center justify-center overflow-y-auto px-4 py-12 sm:px-12 lg:overflow-hidden lg:px-16 lg:py-6 xl:px-24">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, ease: "easeOut" }} className="w-full max-w-xl space-y-8 sm:space-y-10 lg:space-y-6">
          <div className="space-y-2">
            <h2 className="text-3xl font-medium tracking-tight">Log in to Webhux</h2>
            <p className="text-sm text-white/40">Use your credentials to continue monitoring webhooks.</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <SocialButton icon={Globe2} label="Google" />
            <SocialButton icon={GitBranch} label="Github" />
          </div>

          <div className="relative">
            <div className="border-t border-white/10" />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-black px-4 text-xs font-medium uppercase tracking-widest text-white/40">Or</span>
          </div>

          <form onSubmit={handleSubmit((data) => login(data))} className="space-y-5">
            {error ? <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</div> : null}
            <InputGroup label="Email" placeholder="you@company.com" type="email" error={errors.email?.message} registration={register("email")} />
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  {...register("password")}
                  className="h-11 w-full rounded-xl border-none bg-brand-gray px-4 pr-11 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-white/20"
                />
                <button type="button" onClick={() => setShowPassword((value) => !value)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white" aria-label="Toggle password">
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password ? <p className="text-xs text-red-300">{errors.password.message}</p> : null}
              <div className="flex justify-end">
                <Link href="/forgot-password" className="text-xs font-medium text-white/45 hover:text-white">
                  Forgot password?
                </Link>
              </div>
            </div>

            <button type="submit" disabled={isLoading} className="mt-4 flex h-14 w-full items-center justify-center rounded-xl bg-white font-semibold text-black transition hover:bg-white/90 active:scale-[0.98] disabled:opacity-60">
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Login
            </button>
          </form>

          <p className="text-center text-sm text-white/40">
            New to the team?{" "}
            <Link href="/register" className="font-medium text-white hover:underline">
              Create account
            </Link>
          </p>
        </motion.div>
      </section>
    </main>
  );
}

function StepItem({ number, text, active = false }: { number: string; text: string; active?: boolean }) {
  return (
    <div className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm ${active ? "border border-white bg-white text-black" : "border-none bg-brand-gray text-white"}`}>
      <span className={`grid h-7 w-7 place-items-center rounded-full text-xs font-semibold ${active ? "bg-black text-white" : "bg-white/10 text-white/40"}`}>{number}</span>
      {text}
    </div>
  );
}

function SocialButton({ icon: Icon, label }: { icon: React.ComponentType<{ className?: string }>; label: string }) {
  return (
    <button type="button" className="flex h-12 items-center justify-center gap-2 rounded-xl border border-white/10 bg-black text-sm font-medium text-white transition hover:bg-white/5">
      <Icon className="h-4 w-4" />
      {label}
    </button>
  );
}

function InputGroup({
  label,
  placeholder,
  type,
  error,
  registration,
}: {
  label: string;
  placeholder: string;
  type: string;
  error?: string;
  registration: Record<string, unknown>;
}) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-white">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        {...registration}
        className="h-11 w-full rounded-xl border-none bg-brand-gray px-4 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-white/20"
      />
      {error ? <p className="text-xs text-red-300">{error}</p> : null}
    </div>
  );
}
