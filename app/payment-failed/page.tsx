"use client";

import { useSearchParams } from "next/navigation";

export default function PaymentFailed() {
  const sp = useSearchParams();
  const bookingId = sp.get("bookingId");

  return (
    <div className="p-10">
      <h1 className="text-xl font-semibold text-red-700">Payment Failed ❌</h1>
      <p className="mt-2">Booking ID: {bookingId}</p>
    </div>
  );
}