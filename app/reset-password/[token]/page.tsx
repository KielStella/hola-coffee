"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { KeyRound } from "lucide-react";
import AuthCard from "@/components/auth/AuthCard";
import { resetPassword } from "@/actions/auth";
import { resetPasswordSchema, type ResetPasswordInput } from "@/lib/validations/auth";

const inputClass =
  "w-full rounded-hola-sm border border-hola-brown/10 bg-hola-beige px-4 py-3 text-hola-brown outline-none transition placeholder:text-hola-brown-soft/60 focus:border-hola-blue focus:ring-2 focus:ring-hola-blue/30";

export default function ResetPasswordPage() {
  const params = useParams<{ token: string }>();
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { token: params.token },
  });

  async function onSubmit(data: ResetPasswordInput) {
    setServerError(null);
    const result = await resetPassword(data);
    if (!result.success) {
      setServerError(result.error);
      return;
    }
    router.push("/login");
  }

  return (
    <AuthCard title="Reset Password" subtitle="Choose a new password for your account.">
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        <input type="hidden" {...register("token")} />
        <div>
          <label htmlFor="password" className="mb-1.5 block text-sm font-semibold text-hola-brown">
            New Password
          </label>
          <input id="password" type="password" className={inputClass} {...register("password")} />
          {errors.password && <p className="mt-1.5 text-sm text-red-600">{errors.password.message}</p>}
        </div>
        <div>
          <label htmlFor="confirmPassword" className="mb-1.5 block text-sm font-semibold text-hola-brown">
            Confirm New Password
          </label>
          <input id="confirmPassword" type="password" className={inputClass} {...register("confirmPassword")} />
          {errors.confirmPassword && (
            <p className="mt-1.5 text-sm text-red-600">{errors.confirmPassword.message}</p>
          )}
        </div>

        {serverError && (
          <p className="rounded-hola-sm bg-red-50 px-3 py-2 text-sm text-red-600" role="alert">
            {serverError}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-hola-blue px-6 py-3.5 font-display text-white shadow-lg shadow-hola-blue/30 transition hover:-translate-y-0.5 hover:bg-hola-blue-dark hover:shadow-xl disabled:opacity-70"
        >
          <KeyRound className="h-4 w-4" />
          {isSubmitting ? "Resetting…" : "Reset Password"}
        </button>
      </form>
    </AuthCard>
  );
}
