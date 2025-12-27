"use client";

import SignupForm from "../_components/signupform";
import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div
        className="relative w-[900px] h-[500px] rounded-xl overflow-hidden 
        shadow-[0_0_40px_rgba(168,85,247,0.6)] border border-purple-600/30"
      >
        
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a0f2e] via-[#12081f] to-black" />

        
        <div
          className="absolute left-0 top-0 h-full w-[55%] 
          bg-gradient-to-br from-purple-600 via-purple-700 to-purple-900 
          clip-diagonal flex items-center px-12"
        >
          <div>
            <h2 className="text-4xl font-bold text-white">WELCOME BACK!</h2>
            <p className="mt-4 text-sm text-purple-100/80 max-w-xs">
              Enter your personal details to use all of site features.
            </p>
          </div>
        </div>

       
        <div className="relative z-10 ml-auto w-[45%] h-full flex items-center px-12">
          <div className="w-full space-y-6">
            <h1 className="text-3xl font-semibold text-white">Sign Up</h1>

            <SignupForm />

            <p className="text-sm text-white/60">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-purple-400 hover:underline cursor-pointer"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
