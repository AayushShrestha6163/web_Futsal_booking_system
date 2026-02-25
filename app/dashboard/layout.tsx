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

  // not logged in
  if (!user) redirect("/login");

  // admin should not be in user dashboard
  if (user.role === "admin") redirect("/admin");

  return <>{children}</>;
}