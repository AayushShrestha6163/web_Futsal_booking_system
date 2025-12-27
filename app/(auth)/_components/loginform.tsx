"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { loginSchema, type LoginData } from "../schema";

export default function LoginForm() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    mode: "onSubmi",
  });

  const submit = async (values: LoginData) => {
    startTransition(async () => {
      await new Promise((r) => setTimeout(r, 1000));
      router.push("/dashboard");
    });

    console.log("login", values);
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-5">

     
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
