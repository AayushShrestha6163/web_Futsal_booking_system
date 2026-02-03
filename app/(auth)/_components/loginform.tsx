"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { loginSchema, type LoginData } from "../schema";
import { login } from "@/lib/api/auth";
import { handleLogin } from "@/lib/actions/auth-actions";

export default function LoginForm() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
  });

  const submit = async (values: LoginData) => {
    startTransition(async () => {
            try {
                const response = await handleLogin(values);
                if (!response.success) {
                    throw new Error(response.message);
                }
                if (response.success) {
                    if (response.data?.role == 'admin') {
                        return router.replace("/admin");
                    }
                    if (response.data?.role === 'user') {
                        return router.replace("/dashboard");
                    }
                    return router.replace("/");
                } else {
                    setError('Login failed');
                }
            } catch (err: Error | any) {
                setError(err.message || 'Login failed');
            }
        })

    console.log("login", values);
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-5">
       {error && (
                <p className="text-sm text-red-600">{error}</p>
            )}

     
      <div>
        <label className="block text-sm text-white/70 mb-1">
          Email
        </label>
        <input
          {...register("email")}
          type="email"
          placeholder="aayush@email.com"
          className="w-full bg-transparent border-b border-purple-500/50 
          focus:border-purple-500 outline-none text-white py-2"
        />
        {errors.email && (
          <p className="text-xs text-red-400 mt-1">
            {errors.email.message}
          </p>
        )}
      </div>

     
      <div>
        <label className="block text-sm text-white/70 mb-1">
          Password
        </label>
        <input
          {...register("password")}
          type="password"
          placeholder="••••••••"
          className="w-full bg-transparent border-b border-purple-500/50 
          focus:border-purple-500 outline-none text-white py-2"
        />
        {errors.password && (
          <p className="text-xs text-red-400 mt-1">
            {errors.password.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting || pending}
        className="w-full py-2 rounded-full 
        bg-gradient-to-r from-purple-600 to-purple-500 
        text-white font-medium hover:opacity-90 transition"
      >
        {isSubmitting || pending ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}
