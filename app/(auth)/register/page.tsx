"use client";

import SignupForm from "../_components/signupform";
import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0dbb55] via-[#18c26a] to-[#bff3d4]" />

      {/* soft circles */}
      <div className="absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full bg-white/15" />
      <div className="absolute top-[10%] -right-28 w-[520px] h-[520px] rounded-full bg-white/12" />
      <div className="absolute -bottom-40 left-[10%] w-[620px] h-[620px] rounded-full bg-white/18" />

      <div className="relative z-10 min-h-screen w-full flex items-center justify-center px-4 py-10">
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
            {/* Left (Hero) */}
            <div className="relative bg-gradient-to-br from-[#0b7f3b] via-[#0a8a40] to-[#0a6b33] text-white">
              <div className="absolute inset-0">
                <div className="absolute -top-24 -right-24 w-[380px] h-[380px] rounded-full bg-white/10" />
                <div className="absolute bottom-[-120px] left-[-120px] w-[420px] h-[420px] rounded-full bg-black/10" />
              </div>

              <div className="relative h-full flex items-center justify-center p-10 sm:p-14 text-center">
                <div className="max-w-md">
                  <h2 className="text-3xl sm:text-5xl font-extrabold leading-tight">
                    Create Account
                  </h2>
                  <p className="mt-4 text-sm sm:text-base text-white/85 leading-relaxed">
                    Join us to book futsal courts instantly and manage your
                    bookings easily.
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

            {/* Right (Form) */}
            <div className="p-8 sm:p-12 flex items-center">
              <div className="w-full max-w-md">
                <div className="mb-8">
                  <h1 className="text-3xl sm:text-4xl font-bold text-green-900">
                    Sign Up
                  </h1>
                  <p className="mt-2 text-sm text-green-900/60">
                    Please fill your details to create an account.
                  </p>
                </div>

                <SignupForm />

                <p className="mt-6 text-sm text-green-900/70">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="font-semibold text-green-700 hover:text-green-800 hover:underline"
                  >
                    Login
                  </Link>
                </p>
              </div>
            </div>
            {/* end right */}
          </div>
        </div>
      </div>
    </div>
  );
}