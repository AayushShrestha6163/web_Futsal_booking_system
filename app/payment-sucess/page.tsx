"use client";

import { useSearchParams } from "next/navigation";

export default function PaymentSuccess() {
  const sp = useSearchParams();
  const bookingId = sp.get("bookingId");

  return (
    <div className="p-10">
      <h1 className="text-xl font-semibold text-green-700">Payment Success ✅</h1>
      <p className="mt-2">Booking ID: {bookingId}</p>
    </div>
  );
}