import DashboardClient from "./DashboardClient";
import { getMyBookingsAction } from "@/lib/actions/booking-actions";
import { getUserData } from "@/lib/cookie";

export const dynamic = "force-dynamic";

function isUpcoming(dateStr: string) {
  
  const today = new Date().toISOString().slice(0, 10);
  return dateStr >= today;
}

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string; error?: string }>;
}) {
  const sp = await searchParams;
  const user = await getUserData();

  if (!user || user.role !== "user") {
    return (
      <DashboardClient
        upcomingBookings={[]}
        success={sp?.success}
        error={sp?.error}
      />
    );
  }

  const data = await getMyBookingsAction();
  const all = (data?.bookings || []) as any[];

  
  const upcoming = all
    .filter((b) => b?.date && isUpcoming(String(b.date)))
    .filter((b) => b?.status !== "cancelled" && b?.status !== "completed");

  return (
    <DashboardClient
      upcomingBookings={upcoming}
      success={sp?.success}
      error={sp?.error}
    />
  );
}