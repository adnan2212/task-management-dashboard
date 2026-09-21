"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginValues } from "@/schemas/loginSchema";
import { useAuth } from "@/context/AuthContext";
import type { ApiError } from "@/types/index";

export default function LoginPage() {
  const { user, ready, login } = useAuth();
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({ resolver: zodResolver(loginSchema) });

  useEffect(() => {
    if (ready && user) router.replace("/");
  }, [ready, user, router]);

  const handleFillAdmin = () => {
    setValue("email", "admin@company.com", { shouldValidate: true });
    setValue("password", "password123", { shouldValidate: true });
  };

  async function onSubmit(values: LoginValues) {
    setServerError(null);
    try {
      await login(values.email, values.password);
      router.replace("/");
    } catch (err) {
      setServerError((err as ApiError).message);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="w-full max-w-sm rounded-xl border border-gray-200 p-6"
      >
        <h1 className="mb-1 text-xl font-medium">Log in</h1>
        <p className="mb-5 text-sm text-gray-500">Use your work account to continue.</p>

        {serverError && (
          <div role="alert" className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
            {serverError}
          </div>
        )}

        <label htmlFor="email" className="mb-1 block text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="name@company.com"
          {...register("email")}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
        {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>}

        <label htmlFor="password" className="mb-1 mt-4 block text-sm font-medium">
          Password
        </label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          {...register("password")}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
        {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-6 w-full rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium hover:bg-gray-800 disabled:opacity-60"
        >
          {isSubmitting ? "Logging in…" : "Log in"}
        </button>
        
        {/* <p className="mt-4 text-center text-xs text-gray-400">
          Demo: admin@company.com / password123
        </p> */}

        <button 
          type="button"
          onClick={handleFillAdmin}
          className="mt-4 text-center text-xs text-gray-400 underline hover:cursor-pointer"
        >
          Login as Admin
        </button>
      </form>
    </main>
  );
}