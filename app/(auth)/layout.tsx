import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentication | Futsal Booking System",
  description: "Login or create a new account",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
          {children}
        </div>
      </div>
    </div>
  );
}