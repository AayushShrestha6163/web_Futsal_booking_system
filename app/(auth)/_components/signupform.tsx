"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTransition, useState } from "react";
import { registerSchema, type RegisterData } from "../schema";
import { register as backendRegister } from "../../../lib/api/auth";
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
      const res = await handleRegister(values as RegisterData)
      console.log(res)
      setSuccess(true);
      router.push("/login");
    });
  };

  if (success) {
    return (
      <div className="text-center space-y-3">
        <div className="mx-auto w-12 h-12 rounded-full bg-purple-600/20 flex items-center justify-center">
          <span className="text-purple-400 text-xl">✓</span>
        </div>
        <h2 className="text-lg font-semibold text-white">
          Account Created!
        </h2>
        <p className="text-sm text-white/60">
          Redirecting to login page...
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-5">

      
      <div>
        <label className="block text-sm text-white/70 mb-1">
          Full Name
        </label>
        <input
          {...register("name")}
          type="text"
          placeholder="Aayush Shrestha"
          className="w-full bg-transparent border-b border-purple-500/50 
          focus:border-purple-500 outline-none text-white py-2"
        />
        {errors.name && (
          <p className="text-xs text-red-400 mt-1">
            {errors.name.message}
          </p>
        )}
      </div>

     
      <div>
        <label className="block text-sm text-white/70 mb-1">
          Email
        </label>
        <input
          {...register("email")}
          type="email"
          placeholder="aayush123@email.com"
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
        {isSubmitting || pending ? "Creating account..." : "Sign Up"}
      </button>

    </form>
  );
}
