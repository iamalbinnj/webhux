"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "motion/react";
import { Circle, Eye, EyeOff, GitBranch, Globe2, Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const authVideo =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260506_081238_406ed0e3-5d83-436e-a512-0bbff7ec5b95.mp4";

type RegisterFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const parent = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
};

const child = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { register: registerUser, isLoading, error } = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormValues>();

  const password = watch("password", "");
  const strength = useMemo(() => {
    let score = 0;
    if (password.length >= 8) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    return score;
  }, [password]);

  const submit = async (values: RegisterFormValues) => {
    await registerUser({
      name: `${values.firstName} ${values.lastName}`.trim(),
      email: values.email,
      password: values.password,
    });
  };

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
            <h1 className="whitespace-nowrap text-4xl font-medium tracking-tight">Join Webhux</h1>
            <p className="px-4 text-sm leading-relaxed text-white/60">Follow these 3 quick phases to activate your webhook workspace.</p>
          </motion.div>
          <motion.div variants={child} className="space-y-3">
            <StepItem number="1" text="Register your identity" active />
            <StepItem number="2" text="Configure your services" />
            <StepItem number="3" text="Inspect live payloads" />
          </motion.div>
        </motion.div>
      </section>

      <section className="flex flex-1 flex-col items-center justify-center overflow-y-auto px-4 py-12 sm:px-12 lg:overflow-hidden lg:px-16 lg:py-6 xl:px-24">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, ease: "easeOut" }} className="w-full max-w-xl space-y-8 sm:space-y-10 lg:space-y-6">
          <div className="space-y-2">
            <h2 className="text-3xl font-medium tracking-tight">Create New Profile</h2>
            <p className="text-sm text-white/40">Input your basic details to begin the journey.</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <SocialButton icon={Globe2} label="Google" />
            <SocialButton icon={GitBranch} label="Github" />
          </div>

          <div className="relative">
            <div className="border-t border-white/10" />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-black px-4 text-xs font-medium uppercase tracking-widest text-white/40">Or</span>
          </div>

          <form onSubmit={handleSubmit(submit)} className="space-y-5">
            {error ? <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</div> : null}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <InputGroup label="First Name" placeholder="Marcus" type="text" error={errors.firstName?.message} registration={register("firstName", { required: "First name is required" })} />
              <InputGroup label="Last Name" placeholder="Chen" type="text" error={errors.lastName?.message} registration={register("lastName", { required: "Last name is required" })} />
            </div>
            <InputGroup
              label="Email"
              placeholder="you@company.com"
              type="email"
              error={errors.email?.message}
              registration={register("email", {
                required: "Email is required",
                pattern: { value: /^\S+@\S+\.\S+$/, message: "Please enter a valid email" },
              })}
            />
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create password"
                  {...register("password", { required: "Password is required", minLength: { value: 8, message: "Password must be at least 8 symbols" } })}
                  className="h-11 w-full rounded-xl border-none bg-brand-gray px-4 pr-11 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-white/20"
                />
                <button type="button" onClick={() => setShowPassword((value) => !value)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white" aria-label="Toggle password">
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <div className="flex gap-1">
                {[0, 1, 2, 3].map((bar) => (
                  <span key={bar} className={`h-1 flex-1 rounded-full ${strength > bar ? "bg-white" : "bg-white/10"}`} />
                ))}
              </div>
              <p className="text-xs text-white/35">Requires at least 8 symbols.</p>
              {errors.password ? <p className="text-xs text-red-300">{errors.password.message}</p> : null}
            </div>
            <InputGroup
              label="Confirm Password"
              placeholder="Confirm password"
              type="password"
              error={errors.confirmPassword?.message}
              registration={register("confirmPassword", {
                required: "Confirm password is required",
                validate: (value) => value === password || "Passwords do not match",
              })}
            />

            <button type="submit" disabled={isLoading} className="mt-4 flex h-14 w-full items-center justify-center rounded-xl bg-white font-semibold text-black transition hover:bg-white/90 active:scale-[0.98] disabled:opacity-60">
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Create Account
            </button>
          </form>

          <p className="text-center text-sm text-white/40">
            Member of the team?{" "}
            <Link href="/login" className="font-medium text-white hover:underline">
              Log in
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
