import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { getUserData } from "@/lib/cookie";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await getUserData();

  
  if (!user) redirect("/login");

  
  if (user.role === "admin") redirect("/admin");

  return <>{children}</>;
}