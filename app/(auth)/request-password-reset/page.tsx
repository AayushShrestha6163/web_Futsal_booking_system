"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { RequestPasswordResetDTO, RequestPasswordResetSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { requestPasswordReset } from "@/lib/api/auth";
import { toast } from "react-toastify";

export default function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RequestPasswordResetDTO>({
    resolver: zodResolver(RequestPasswordResetSchema),
  });

  const onSubmit = async (data: RequestPasswordResetDTO) => {
    try {
      const response = await requestPasswordReset(data.email);

      if (response?.success) {
        toast.success("Password reset link sent to your email.");
      } else {
        toast.error(response?.message || "Failed to request password reset.");
      }
    } catch (error) {
      toast.error(
        (error as Error).message || "Failed to request password reset."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      
      <div className="relative w-[1000px] h-[600px] rounded-2xl overflow-hidden shadow-[0_0_60px_rgba(168,85,247,0.65)] border border-purple-600/30">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a0f2e] via-[#12081f] to-black" />

        {/* Right Panel (50%) */}
        <div className="absolute right-0 top-0 h-full w-[50%] bg-gradient-to-br from-purple-600 via-purple-700 to-purple-900 clip-diagonal flex items-center justify-center text-center px-14">
          <div>
            <h2 className="text-5xl font-extrabold text-white tracking-wide">
              RESET ACCESS
            </h2>
            <p className="mt-5 text-base text-purple-100/80 leading-relaxed">
              Enter your email and we’ll send a secure reset link.
              <br />
              Make sure to check your inbox (and spam).
            </p>

            <div className="mt-10">
              <Link
                href="/login"
                className="inline-flex items-center justify-center px-8 py-3 rounded-full border border-white/25 text-white/90 hover:bg-white/10 transition"
              >
                Back to Login
              </Link>
            </div>
          </div>
        </div>

        {/* Left Panel (50%) */}
        <div className="relative z-10 w-[50%] h-full flex items-center px-20">
          <div className="w-full space-y-10">
            <div className="space-y-2">
              <h1 className="text-4xl font-semibold text-white">Khel Maidan</h1>
              <p className="text-sm text-white/60">Request Password Reset</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
              {/* Email */}
              <div>
                <label className="block text-sm text-white/70 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="aayush@email.com"
                  {...register("email")}
                  className="w-full bg-transparent border-b border-purple-500/50 
                  focus:border-purple-500 outline-none text-white py-3 text-base"
                />
                {errors.email?.message && (
                  <p className="mt-2 text-xs text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-full 
                bg-gradient-to-r from-purple-600 to-purple-500 
                text-white font-medium hover:opacity-90 transition
                disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Sending..." : "Send Reset Link"}
              </button>

              {/* Links */}
              <div className="flex items-center justify-between text-sm text-white/60 pt-1">
                <Link href="/login" className="text-purple-400 hover:underline">
                  Back to Login
                </Link>

                <Link
                  href="/register"
                  className="text-purple-400 hover:underline"
                >
                  Create account
                </Link>
              </div>
            </form>

            <p className="text-xs text-white/40 leading-relaxed">
              For security reasons, we won’t confirm whether an email exists in
              our system.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}