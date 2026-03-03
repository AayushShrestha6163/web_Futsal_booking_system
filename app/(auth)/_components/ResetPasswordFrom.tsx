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
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Background like landing page */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0dbb55] via-[#18c26a] to-[#bff3d4]" />

      {/* soft circles */}
      <div className="absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full bg-white/15" />
      <div className="absolute top-[10%] -right-28 w-[520px] h-[520px] rounded-full bg-white/12" />
      <div className="absolute -bottom-40 left-[10%] w-[620px] h-[620px] rounded-full bg-white/18" />

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-10">
        <div
          className="
            w-full max-w-2xl
            rounded-3xl overflow-hidden
            bg-white/70 backdrop-blur-xl
            shadow-2xl
            border border-white/40
          "
        >
          <div className="grid grid-cols-1 md:grid-cols-2 min-h-[520px]">
            {/* Left hero */}
            <div className="relative bg-gradient-to-br from-[#0b7f3b] via-[#0a8a40] to-[#0a6b33] text-white">
              <div className="absolute inset-0">
                <div className="absolute -top-20 -right-20 w-[300px] h-[300px] rounded-full bg-white/10" />
                <div className="absolute bottom-[-90px] left-[-90px] w-[320px] h-[320px] rounded-full bg-black/10" />
              </div>

              <div className="relative h-full flex items-center justify-center p-8 text-center">
                <div className="max-w-sm">
                  <h1 className="text-3xl font-extrabold">Khel Maidan</h1>
                  <p className="mt-3 text-sm text-white/85 leading-relaxed">
                    Set a new password and continue booking your futsal court
                    smoothly.
                  </p>

                  <div className="mt-6 flex flex-col gap-3">
                    <Link
                      href="/login"
                      className="px-6 py-3 rounded-full bg-white text-green-800 font-semibold hover:opacity-95 transition"
                    >
                      Back to Login
                    </Link>
                    <Link
                      href="/request-password-reset"
                      className="px-6 py-3 rounded-full border border-white/70 text-white font-semibold hover:bg-white/10 transition"
                    >
                      Request new reset email
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Right form */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="p-8 sm:p-10 space-y-6 flex flex-col justify-center"
            >
              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl font-bold text-green-900">
                  Reset Password
                </h2>
                <p className="text-sm text-green-900/60">
                  Choose a strong password (8+ characters recommended).
                </p>
              </div>

              {/* New Password */}
              <div>
                <label className="block text-sm font-medium text-green-900/80 mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  {...register("newPassword")}
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
                {errors.newPassword?.message && (
                  <p className="mt-2 text-xs text-red-600">
                    {errors.newPassword.message}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-green-900/80 mb-2">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  {...register("confirmPassword")}
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
                {errors.confirmPassword?.message && (
                  <p className="mt-2 text-xs text-red-600">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              {/* Button */}
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
                {isSubmitting ? "Resetting..." : "Reset Password"}
              </button>

              {/* Small links for mobile (since left panel may go top on mobile) */}
              <div className="md:hidden flex items-center justify-between text-xs text-green-900/70 pt-1">
                <Link href="/login" className="text-green-700 hover:underline">
                  Back to Login
                </Link>
                <Link
                  href="/request-password-reset"
                  className="text-green-700 hover:underline"
                >
                  Request email
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}