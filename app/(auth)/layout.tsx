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
    <div className="min-h-screen flex items-center justify-center bg-black">
      {children}
    </div>
  );
}
