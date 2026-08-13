"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserPlus } from "lucide-react";
import AuthCard from "@/components/auth/AuthCard";
import SocialLoginButtons from "@/components/auth/SocialLoginButtons";
import { signUp } from "@/actions/auth";
import { signUpSchema, type SignUpInput } from "@/lib/validations/auth";

const inputClass =
  "w-full rounded-hola-sm border border-hola-brown/10 bg-hola-beige px-4 py-3 text-hola-brown outline-none transition placeholder:text-hola-brown-soft/60 focus:border-hola-blue focus:ring-2 focus:ring-hola-blue/30";

export default function SignUpPage() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpInput>({ resolver: zodResolver(signUpSchema) });

  async function onSubmit(data: SignUpInput) {
    setServerError(null);
    const result = await signUp(data);
    if (!result.success) {
      setServerError(result.error);
      return;
    }
    // Auto sign-in after successful sign up
    await signIn("credentials", { email: data.email, password: data.password, redirect: false });
    router.replace("/auth/redirect");
    router.refresh();
  }

  return (
    <AuthCard
      title="Join HOLA Rewards"
      subtitle="Create an account to earn points on every order."
      footer={
        <p>
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-hola-blue-dark hover:underline">
            Sign In
          </Link>
        </p>
      }
    >
      <SocialLoginButtons />

      <div className="my-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-hola-beige" />
        <span className="text-xs text-hola-brown-soft">or sign up with email</span>
        <div className="h-px flex-1 bg-hola-beige" />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-semibold text-hola-brown">
            Full Name
          </label>
          <input id="name" className={inputClass} {...register("name")} />
          {errors.name && <p className="mt-1.5 text-sm text-red-600">{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-hola-brown">
            Email Address
          </label>
          <input id="email" type="email" className={inputClass} {...register("email")} />
          {errors.email && <p className="mt-1.5 text-sm text-red-600">{errors.email.message}</p>}
        </div>
        <div>
          <label htmlFor="password" className="mb-1.5 block text-sm font-semibold text-hola-brown">
            Password
          </label>
          <input id="password" type="password" className={inputClass} {...register("password")} />
          {errors.password && <p className="mt-1.5 text-sm text-red-600">{errors.password.message}</p>}
        </div>
        <div>
          <label htmlFor="confirmPassword" className="mb-1.5 block text-sm font-semibold text-hola-brown">
            Confirm Password
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
          <UserPlus className="h-4 w-4" />
          {isSubmitting ? "Creating Account…" : "Create Account"}
        </button>

        <p className="text-center text-xs text-hola-brown-soft">
          By creating an account, you agree to our{" "}
          <Link href="/terms-and-conditions" className="underline hover:text-hola-brown">
            Terms &amp; Conditions
          </Link>{" "}
          and{" "}
          <Link href="/privacy-policy" className="underline hover:text-hola-brown">
            Privacy Policy
          </Link>
          .
        </p>
      </form>
    </AuthCard>
  );
}
