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
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 px-3 py-2 rounded-lg">
          {decodeURIComponent(error)}
        </p>
      )}

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-green-900/80 mb-2">
          Email
        </label>
        <input
          name="email"
          type="email"
          placeholder="aayush@email.com"
          required
          className="
            w-full rounded-xl px-4 py-3
            bg-white/80 border border-green-200
            text-green-950 placeholder:text-green-900/35
            outline-none
            focus:border-green-500 focus:ring-4 focus:ring-green-500/15
            transition
          "
        />
      </div>

      {/* Password */}
      <div>
        <label className="block text-sm font-medium text-green-900/80 mb-2">
          Password
        </label>
        <input
          name="password"
          type="password"
          placeholder="••••••••"
          required
          className="
            w-full rounded-xl px-4 py-3
            bg-white/80 border border-green-200
            text-green-950 placeholder:text-green-900/35
            outline-none
            focus:border-green-500 focus:ring-4 focus:ring-green-500/15
            transition
          "
        />
      </div>

      {/* Forgot password */}
      <div className="flex justify-end -mt-2">
        <Link
          href="/request-password-reset"
          className="text-xs font-medium text-green-700 hover:text-green-800 hover:underline transition"
        >
          Forgot password?
        </Link>
      </div>

      {/* Button */}
      <button
        type="submit"
        className="
          w-full py-3 rounded-full
          bg-gradient-to-r from-green-600 to-green-700
          text-white font-semibold
          shadow-lg shadow-green-700/20
          hover:brightness-105 active:brightness-95
          transition
        "
      >
        Login
      </button>
    </form>
  );
}