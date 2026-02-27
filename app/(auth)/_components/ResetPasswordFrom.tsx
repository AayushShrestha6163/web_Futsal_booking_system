"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { ResetPasswordDTO, ResetPasswordSchema } from "../reset-password/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { handleResetPassword } from "@/lib/actions/auth-actions";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function ResetPasswordForm({ token }: { token: string }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordDTO>({
    resolver: zodResolver(ResetPasswordSchema),
  });

  const router = useRouter();

  const onSubmit = async (data: ResetPasswordDTO) => {
    try {
      const response = await handleResetPassword(token, data.newPassword);

      if (response.success) {
        toast.success("Password reset successfully");
        router.replace("/login");
      } else {
        toast.error(response.message || "Failed to reset password");
      }
    } catch (error) {
      toast.error((error as Error).message || "An unexpected error occurred");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="relative w-full max-w-[520px] rounded-2xl overflow-hidden shadow-[0_0_60px_rgba(168,85,247,0.65)] border border-purple-600/30">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a0f2e] via-[#12081f] to-black" />

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="relative z-10 p-10 space-y-7"
        >
          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-4xl font-semibold text-white">Khel Maidan</h1>
            <p className="text-sm text-white/60">Reset your password</p>
          </div>

          {/* New Password */}
          <div>
            <label className="block text-sm text-white/70 mb-2">
              New Password
            </label>
            <input
              type="password"
              {...register("newPassword")}
              placeholder="••••••••"
              className="w-full bg-transparent border-b border-purple-500/50 
              focus:border-purple-500 outline-none text-white py-3 text-base"
            />
            {errors.newPassword?.message && (
              <p className="mt-2 text-xs text-red-500">
                {errors.newPassword.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm text-white/70 mb-2">
              Confirm New Password
            </label>
            <input
              type="password"
              {...register("confirmPassword")}
              placeholder="••••••••"
              className="w-full bg-transparent border-b border-purple-500/50 
              focus:border-purple-500 outline-none text-white py-3 text-base"
            />
            {errors.confirmPassword?.message && (
              <p className="mt-2 text-xs text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Links */}
          <div className="flex items-center justify-between text-sm text-white/60 pt-1">
            <Link href="/login" className="text-purple-400 hover:underline">
              Back to Login
            </Link>
            <Link
              href="/request-password-reset"
              className="text-purple-400 hover:underline"
            >
              Request another reset email
            </Link>
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
            {isSubmitting ? "Resetting..." : "Reset Password"}
          </button>

          <p className="text-xs text-white/40 leading-relaxed">
            Choose a strong password (8+ characters recommended).
          </p>
        </form>
      </div>
    </div>
  );
}