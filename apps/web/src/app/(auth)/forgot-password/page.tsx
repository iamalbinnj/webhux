"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, Check, Circle, Mail } from "lucide-react";

const authVideo =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260506_081238_406ed0e3-5d83-436e-a512-0bbff7ec5b95.mp4";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim()) {
      setError("Email is required");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Please enter a valid email");
      return;
    }
    setError("");
    setSent(true);
  };

  return (
    <main className="flex min-h-screen w-full bg-black p-2 text-white selection:bg-white/30 transition-all duration-500 lg:h-screen lg:overflow-hidden lg:p-4">
      <section className="relative hidden h-full w-[52%] flex-col items-center justify-end overflow-hidden rounded-3xl px-12 pb-32 shadow-2xl lg:flex">
        <video className="absolute inset-0 h-full w-full object-cover" autoPlay muted loop playsInline>
          <source src={authVideo} type="video/mp4" />
        </video>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="z-10 w-full max-w-xs space-y-8">
          <div className="flex items-center gap-3">
            <Circle className="h-5 w-5 fill-white text-white" />
            <span className="text-xl font-semibold tracking-tight">Webhux</span>
          </div>
          <div className="space-y-3">
            <h1 className="text-4xl font-medium tracking-tight">Reset access</h1>
            <p className="px-4 text-sm leading-relaxed text-white/60">Get back to monitoring integrations without losing the thread.</p>
          </div>
        </motion.div>
      </section>
      <section className="flex flex-1 flex-col items-center justify-center px-4 py-12 sm:px-12 lg:px-16 xl:px-24">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, ease: "easeOut" }} className="w-full max-w-xl space-y-8">
          <Link href="/login" className="inline-flex items-center gap-2 text-sm text-white/45 hover:text-white">
            <ArrowLeft className="h-4 w-4" />
            Back to login
          </Link>
          <div className="space-y-2">
            <h2 className="text-3xl font-medium tracking-tight">Forgot Password</h2>
            <p className="text-sm text-white/40">Enter your email and we will send a reset link.</p>
          </div>
          <form onSubmit={submit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-white">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
                <input
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  type="email"
                  placeholder="you@company.com"
                  className="h-12 w-full rounded-xl border-none bg-brand-gray px-11 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-white/20"
                />
              </div>
              {error ? <p className="text-xs text-red-300">{error}</p> : null}
            </div>
            <button type="submit" className="flex h-14 w-full items-center justify-center rounded-xl bg-white font-semibold text-black transition hover:bg-white/90 active:scale-[0.98]">
              Send reset link
            </button>
          </form>
        </motion.div>
      </section>
      {sent ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4 backdrop-blur-sm">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-sm rounded-3xl border border-white/10 bg-[#111] p-6 text-center shadow-2xl">
            <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-full bg-white text-black">
              <Check className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-semibold">Reset link sent successfully</h3>
            <p className="mt-2 text-sm text-white/45">Check your inbox for the next step.</p>
            <button onClick={() => setSent(false)} className="mt-6 h-11 w-full rounded-xl bg-white text-sm font-semibold text-black">
              Done
            </button>
          </motion.div>
        </div>
      ) : null}
    </main>
  );
}
