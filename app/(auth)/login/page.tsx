"use client";

import LoginForm from "../_components/loginform";
import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Background like landing page */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0dbb55] via-[#18c26a] to-[#bff3d4]" />

      {/* soft circles */}
      <div className="absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full bg-white/15 blur-0" />
      <div className="absolute top-[10%] -right-28 w-[520px] h-[520px] rounded-full bg-white/12 blur-0" />
      <div className="absolute -bottom-40 left-[10%] w-[620px] h-[620px] rounded-full bg-white/18 blur-0" />

      {/* Page content */}
      <div className="relative z-10 min-h-screen w-full flex items-center justify-center px-4 py-10">
        {/* Card wrapper */}
        <div
          className="
            w-full max-w-6xl
            rounded-3xl overflow-hidden
            bg-white/70 backdrop-blur-xl
            shadow-2xl
            border border-white/40
          "
        >
          <div className="grid grid-cols-1 md:grid-cols-2 min-h-[640px]">
            {/* Left (Form) */}
            <div className="p-8 sm:p-12 flex items-center">
              <div className="w-full max-w-md">
                <div className="mb-8">
                  <h1 className="text-3xl sm:text-4xl font-bold text-green-900">
                    Login
                  </h1>
                  <p className="mt-2 text-sm text-green-900/60">
                    Welcome back! Please enter your details.
                  </p>
                </div>

                <LoginForm />

                <p className="mt-6 text-sm text-green-900/70">
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/register"
                    className="font-semibold text-green-700 hover:text-green-800 hover:underline"
                  >
                    Sign up
                  </Link>
                </p>
              </div>
            </div>

            {/* Right (Hero) */}
            <div className="relative bg-gradient-to-br from-[#0b7f3b] via-[#0a8a40] to-[#0a6b33] text-white">
              {/* decorative glow */}
              <div className="absolute inset-0">
                <div className="absolute -top-24 -right-24 w-[380px] h-[380px] rounded-full bg-white/10" />
                <div className="absolute bottom-[-120px] left-[-120px] w-[420px] h-[420px] rounded-full bg-black/10" />
              </div>

              <div className="relative h-full flex items-center justify-center p-10 sm:p-14 text-center">
                <div className="max-w-md">
                  <h2 className="text-3xl sm:text-5xl font-extrabold leading-tight">
                    Welcome Back!
                  </h2>
                  <p className="mt-4 text-sm sm:text-base text-white/85 leading-relaxed">
                    Book your futsal court instantly, get quick confirmation, and
                    enjoy a smooth experience across Nepal.
                  </p>

                  <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                    <Link
                      href="/"
                      className="px-6 py-3 rounded-full bg-white text-green-800 font-semibold hover:opacity-95 transition"
                    >
                      Go to Home
                    </Link>

                  
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