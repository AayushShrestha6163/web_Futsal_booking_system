import Header from "./_components/Header";
import Sidebar from "./_components/Sidebar";
import "./admin.css";
import { getUserData } from "@/lib/cookie";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Layout({ children }: { children: React.ReactNode }) {
  const user = await getUserData();

  // not logged in
  if (!user) redirect("/login");

  // not admin
  if (user.role !== "admin") redirect("/dashboard");

  return (
    <div className="flex w-full min-h-screen">
      <div className="page-wrapper flex w-full">
        {/* Sidebar */}
        <div className="xl:block hidden">
          <Sidebar />
        </div>

        <div className="w-full bg-background">
          {/* Top Header */}
          <Header />

          {/* Body Content */}
          <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 p-2">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}