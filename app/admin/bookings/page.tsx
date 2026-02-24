"use client";

import { useEffect, useState } from "react";
import { getAdminBookings } from "@/lib/api/admin/booking";
import { initiateEsewaPayment } from "@/lib/api/payment";

export default function BookingsPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [error, setError] = useState("");

  const load = async () => {
    try {
      setError("");
      const data = await getAdminBookings();
      setBookings(data.bookings || []);
    } catch (e: any) {
      setError(e?.message || "Failed to load bookings");
    }
  };

  useEffect(() => {
    load();
  }, []);

  const payEsewa = async (bookingId: string) => {
    try {
      setError("");
      const data = await initiateEsewaPayment(bookingId);

      const form = document.createElement("form");
      form.method = "POST";
      form.action = data.formUrl;

      Object.entries(data.fields).forEach(([k, v]) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = k;
        input.value = String(v);
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();
    } catch (e: any) {
      setError(e?.message || "Payment initiation failed");
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-xl font-semibold">Bookings</h1>

      {error ? (
        <div className="border rounded p-3 text-sm text-red-600">{error}</div>
      ) : null}

      <div className="border rounded-lg">
        <div className="p-4 border-b font-medium">All Bookings</div>

        <div className="divide-y">
          {bookings.length === 0 ? (
            <div className="p-4 text-sm">No bookings yet.</div>
          ) : (
            bookings.map((b) => (
              <div key={b._id} className="p-4 text-sm flex justify-between gap-4">
                <div className="min-w-0">
                  <div className="font-medium truncate">
                    {b.court?.name || "Court"} • {b.date} • {b.startTime}-{b.endTime}
                  </div>
                  <div className="opacity-70 truncate">
                    User: {b.user?.email || "-"} • Status: {b.status} • Payment: {b.paymentStatus || "UNPAID"} • Rs {b.price}
                  </div>
                </div>

                <div className="shrink-0">
                  {b.paymentStatus !== "PAID" ? (
                    <button
                      onClick={() => payEsewa(b._id)}
                      className="border px-3 py-2 rounded hover:bg-gray-50"
                    >
                      Pay (eSewa)
                    </button>
                  ) : (
                    <span className="text-green-700 font-semibold">PAID</span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}