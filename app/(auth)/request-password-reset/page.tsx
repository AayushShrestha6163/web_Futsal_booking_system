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
      toast.error((error as Error).message || "Failed to request password reset.");
    }
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
     
      <div className="absolute inset-0 bg-gradient-to-br from-[#0dbb55] via-[#18c26a] to-[#bff3d4]" />

      
      <div className="absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full bg-white/15" />
      <div className="absolute top-[10%] -right-28 w-[520px] h-[520px] rounded-full bg-white/12" />
      <div className="absolute -bottom-40 left-[10%] w-[620px] h-[620px] rounded-full bg-white/18" />

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-10">
        <div
          className="
            w-full max-w-6xl
            rounded-3xl overflow-hidden
            bg-white/70 backdrop-blur-xl
            shadow-2xl
            border border-white/40
          "
        >
          <div className="grid grid-cols-1 md:grid-cols-2 min-h-[620px]">
            
            <div className="p-8 sm:p-12 flex items-center">
              <div className="w-full max-w-md">
                <div className="space-y-2 mb-8">
                  <h1 className="text-3xl sm:text-4xl font-bold text-green-900">
                    Khel Maidan
                  </h1>
                  <p className="text-sm text-green-900/60">
                    Request Password Reset
                  </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                
                  <div>
                    <label className="block text-sm font-medium text-green-900/80 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="aayush@email.com"
                      {...register("email")}
                      className="
                        w-full rounded-xl px-4 py-3
                        bg-white/80 border border-green-200
                        text-green-950 placeholder:text-green-900/35
                        outline-none
                        focus:border-green-500 focus:ring-4 focus:ring-green-500/15
                        transition
                      "
                    />
                    {errors.email?.message && (
                      <p className="mt-2 text-xs text-red-600">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                 
                  <button
                    type="submit"
                    disabled={isSubmitting}
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
                    {isSubmitting ? "Sending..." : "Send Reset Link"}
                  </button>

                  
                  <div className="flex items-center justify-between text-sm text-green-900/70">
                    <Link href="/login" className="text-green-700 hover:underline">
                      Back to Login
                    </Link>

                    <Link
                      href="/register"
                      className="text-green-700 hover:underline"
                    >
                      Create account
                    </Link>
                  </div>
                </form>

                <p className="mt-8 text-xs text-green-900/50 leading-relaxed">
                  For security reasons, we won’t confirm whether an email exists in
                  our system.
                </p>
              </div>
            </div>

            
            <div className="relative bg-gradient-to-br from-[#0b7f3b] via-[#0a8a40] to-[#0a6b33] text-white">
              {/* decorative glow */}
              <div className="absolute inset-0">
                <div className="absolute -top-24 -right-24 w-[380px] h-[380px] rounded-full bg-white/10" />
                <div className="absolute bottom-[-120px] left-[-120px] w-[420px] h-[420px] rounded-full bg-black/10" />
              </div>

              <div className="relative h-full flex items-center justify-center p-10 sm:p-14 text-center">
                <div className="max-w-md">
                  <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
                    Reset Access
                  </h2>
                  <p className="mt-4 text-sm sm:text-base text-white/85 leading-relaxed">
                    Enter your email and we’ll send a secure reset link.
                    <br />
                    Please check your inbox (and spam).
                  </p>

                  <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                    <Link
                      href="/login"
                      className="px-6 py-3 rounded-full bg-white text-green-800 font-semibold hover:opacity-95 transition"
                    >
                      Back to Login
                    </Link>

                    <Link
                      href="/"
                      className="px-6 py-3 rounded-full border border-white/70 text-white font-semibold hover:bg-white/10 transition"
                    >
                      Go to Home
                    </Link>
                  </div>

                  
                  <div className="md:hidden mt-6 text-xs text-white/80">
                    Tip: Use a valid email you registered with.
                  </div>
                </div>
              </div>
            </div>
            {/* end right */}
          </div>
        </div>
      </div>
    </div>
  );
}