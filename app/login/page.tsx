"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LogIn } from "lucide-react";
import AuthCard from "@/components/auth/AuthCard";
import SocialLoginButtons from "@/components/auth/SocialLoginButtons";
import { loginSchema, type LoginInput } from "@/lib/validations/auth";

const inputClass =
  "w-full rounded-hola-sm border border-hola-brown/10 bg-hola-beige px-4 py-3 text-hola-brown outline-none transition placeholder:text-hola-brown-soft/60 focus:border-hola-blue focus:ring-2 focus:ring-hola-blue/30";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/account";
  const [serverError, setServerError] = useState<string | null>(null);
  const [rememberMe, setRememberMe] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({ resolver: zodResolver(loginSchema) });

  async function onSubmit(data: LoginInput) {
    setServerError(null);
    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (result?.error) {
      setServerError("Incorrect email or password.");
      return;
    }
    router.push(callbackUrl);
    router.refresh();
  }

  return (
    <AuthCard
      title="Welcome Back"
      subtitle="Sign in to track orders, points, and rewards."
      footer={
        <>
          <Link href="/forgot-password" className="text-hola-blue-dark hover:underline">
            Forgot your password?
          </Link>
          <p className="mt-3">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="font-semibold text-hola-blue-dark hover:underline">
              Sign Up
            </Link>
          </p>
        </>
      }
    >
      <SocialLoginButtons callbackUrl={callbackUrl} />

      <div className="my-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-hola-beige" />
        <span className="text-xs text-hola-brown-soft">or continue with email</span>
        <div className="h-px flex-1 bg-hola-beige" />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
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

        <label className="flex items-center gap-2 text-sm text-hola-brown-soft">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="h-4 w-4 rounded border-hola-brown/20 text-hola-blue focus:ring-hola-blue"
          />
          Remember me
        </label>

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
          <LogIn className="h-4 w-4" />
          {isSubmitting ? "Signing In…" : "Sign In"}
        </button>
      </form>
    </AuthCard>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
