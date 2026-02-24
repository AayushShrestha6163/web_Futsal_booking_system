import DashboardClient from "./DashboardClient";
import { getMyBookingsAction } from "@/lib/actions/booking-actions";

export const dynamic = "force-dynamic";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string; error?: string }>;
}) {
  const sp = await searchParams; // ✅ unwrap promise

  const data = await getMyBookingsAction();
  const bookings = data?.bookings || data?.data || [];

  return (
    <DashboardClient
      upcomingBookings={bookings}
      success={sp?.success}
      error={sp?.error}
    />
  );
}