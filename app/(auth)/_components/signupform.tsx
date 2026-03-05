"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTransition, useState } from "react";
import { registerSchema, type RegisterData } from "../schema";
import { handleRegister } from "@/lib/actions/auth-actions";

export default function SignupForm() {
  const router = useRouter();
  const [success, setSuccess] = useState(false);
  const [pending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
    mode: "onSubmit",
  });

  const submit = async (values: RegisterData) => {
    startTransition(async () => {
      const res = await handleRegister(values as RegisterData);
      console.log(res);
      setSuccess(true);
      router.push("/login");
    });
  };

  if (success) {
    return (
      <div className="text-center space-y-3">
        <div className="mx-auto w-12 h-12 rounded-full bg-green-600/15 flex items-center justify-center">
          <span className="text-green-700 text-xl">✓</span>
        </div>
        <h2 className="text-lg font-semibold text-green-900">
          Account Created!
        </h2>
        <p className="text-sm text-green-900/60">
          Redirecting to login page...
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-5">
   
      <div>
        <label className="block text-sm font-medium text-green-900/80 mb-2">
          Full Name
        </label>
        <input
          {...register("name")}
          type="text"
          placeholder="Aayush Shrestha"
          className="
            w-full rounded-xl px-4 py-3
            bg-white/80 border border-green-200
            text-green-950 placeholder:text-green-900/35
            outline-none
            focus:border-green-500 focus:ring-4 focus:ring-green-500/15
            transition
          "
        />
        {errors.name && (
          <p className="text-xs text-red-600 mt-1">{errors.name.message}</p>
        )}
      </div>

      
      <div>
        <label className="block text-sm font-medium text-green-900/80 mb-2">
          Email
        </label>
        <input
          {...register("email")}
          type="email"
          placeholder="aayush123@email.com"
          className="
            w-full rounded-xl px-4 py-3
            bg-white/80 border border-green-200
            text-green-950 placeholder:text-green-900/35
            outline-none
            focus:border-green-500 focus:ring-4 focus:ring-green-500/15
            transition
          "
        />
        {errors.email && (
          <p className="text-xs text-red-600 mt-1">{errors.email.message}</p>
        )}
      </div>

     
      <div>
        <label className="block text-sm font-medium text-green-900/80 mb-2">
          Password
        </label>
        <input
          {...register("password")}
          type="password"
          placeholder="••••••••"
          className="
            w-full rounded-xl px-4 py-3
            bg-white/80 border border-green-200
            text-green-950 placeholder:text-green-900/35
            outline-none
            focus:border-green-500 focus:ring-4 focus:ring-green-500/15
            transition
          "
        />
        {errors.password && (
          <p className="text-xs text-red-600 mt-1">
            {errors.password.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting || pending}
        className="
          w-full py-3 rounded-full
          bg-gradient-to-r from-green-600 to-green-700
          text-white font-semibold
          shadow-lg shadow-green-700/20
          hover:brightness-105 active:brightness-95
          disabled:opacity-60 disabled:cursor-not-allowed
          transition
        "
      >
        {isSubmitting || pending ? "Creating account..." : "Sign Up"}
      </button>
    </form>
  );
}