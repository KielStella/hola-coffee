"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, CheckCircle2 } from "lucide-react";
import AuthCard from "@/components/auth/AuthCard";
import { requestPasswordReset } from "@/actions/auth";
import { forgotPasswordSchema, type ForgotPasswordInput } from "@/lib/validations/auth";

const inputClass =
  "w-full rounded-hola-sm border border-hola-brown/10 bg-hola-beige px-4 py-3 text-hola-brown outline-none transition placeholder:text-hola-brown-soft/60 focus:border-hola-blue focus:ring-2 focus:ring-hola-blue/30";

export default function ForgotPasswordPage() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordInput>({ resolver: zodResolver(forgotPasswordSchema) });

  async function onSubmit(data: ForgotPasswordInput) {
    await requestPasswordReset(data);
    setSubmitted(true);
  }

  return (
    <AuthCard
      title="Forgot Password"
      subtitle="We'll email you a link to reset it."
      footer={
        <Link href="/login" className="text-hola-blue-dark hover:underline">
          Back to Sign In
        </Link>
      }
    >
      {submitted ? (
        <div className="flex flex-col items-center py-4 text-center">
          <CheckCircle2 className="h-10 w-10 text-hola-blue" />
          <p className="mt-4 text-hola-brown">
            If an account exists for that email, we&apos;ve sent a password reset link.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-hola-brown">
              Email Address
            </label>
            <input id="email" type="email" className={inputClass} {...register("email")} />
            {errors.email && <p className="mt-1.5 text-sm text-red-600">{errors.email.message}</p>}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-hola-blue px-6 py-3.5 font-display text-white shadow-lg shadow-hola-blue/30 transition hover:-translate-y-0.5 hover:bg-hola-blue-dark hover:shadow-xl disabled:opacity-70"
          >
            <Mail className="h-4 w-4" />
            {isSubmitting ? "Sending…" : "Send Reset Link"}
          </button>
        </form>
      )}
    </AuthCard>
  );
}
