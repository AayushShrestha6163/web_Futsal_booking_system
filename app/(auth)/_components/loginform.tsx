"use client";

import { useSearchParams } from "next/navigation";
import { handleLogin } from "@/lib/actions/auth-actions";
import Link from "next/link";

export default function LoginForm() {
  const sp = useSearchParams();
  const error = sp.get("error");

  return (
    <form action={handleLogin} className="space-y-5">
      {error && (
        <p className="text-sm text-red-500">
          {decodeURIComponent(error)}
        </p>
      )}

      {/* Email */}
      <div>
        <label className="block text-sm text-white/70 mb-1">Email</label>
        <input
          name="email"
          type="email"
          placeholder="aayush@email.com"
          required
          className="w-full bg-transparent border-b border-purple-500/50 
          focus:border-purple-500 outline-none text-white py-2"
        />
      </div>

      {/* Password */}
      <div>
        <label className="block text-sm text-white/70 mb-1">Password</label>
        <input
          name="password"
          type="password"
          placeholder="••••••••"
          required
          className="w-full bg-transparent border-b border-purple-500/50 
          focus:border-purple-500 outline-none text-white py-2"
        />
      </div>

      {/* ✅ Forgot password link */}
      <div className="text-right -mt-2">
        <Link
          href="/request-password-reset"
          className="text-xs text-purple-400 hover:text-purple-300 hover:underline transition"
        >
          Forgot password?
        </Link>
      </div>

      {/* Button */}
      <button
        type="submit"
        className="w-full py-2 rounded-full 
        bg-gradient-to-r from-purple-600 to-purple-500 
        text-white font-medium hover:opacity-90 transition"
      >
        Login
      </button>
    </form>
  );
}