"use client";

import { useEffect, useState } from "react";
import { getAdminBookings } from "@/lib/api/admin/booking";
import { initiateEsewaPayment } from "@/lib/api/payment";

export default function BookingsPage() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [error, setError] = useState("");


  const [page, setPage] = useState(1);
  const limit = 6; 
  const [pagination, setPagination] = useState({
    total: 0,
    totalPages: 1,
    page: 1,
    limit: 6,
  });

  const load = async () => {
    try {
      setError("");
      const data = await getAdminBookings(page, limit);

      setBookings(data.bookings || []);
      setPagination(
        data.pagination || {
          total: 0,
          totalPages: 1,
          page,
          limit,
        }
      );
    } catch (e: any) {
      setError(e?.message || "Failed to load bookings");
    }
  };

  
  useEffect(() => {
    load();
    
  }, [page]);

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

  const badgeClass = (status: string) => {
    const s = (status || "").toLowerCase();
    if (s === "confirmed")
      return "bg-green-500/15 text-green-200 border-green-500/25";
    if (s === "pending")
      return "bg-yellow-500/15 text-yellow-200 border-yellow-500/25";
    if (s === "cancelled" || s === "canceled")
      return "bg-red-500/15 text-red-200 border-red-500/25";
    return "bg-white/10 text-white/80 border-white/15";
  };

  const payBadgeClass = (pay: string) => {
    if (pay === "PAID")
      return "bg-green-500/15 text-green-200 border-green-500/25";
    return "bg-red-500/12 text-red-200 border-red-500/20";
  };

  const totalPages = pagination.totalPages || 1;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-xl font-semibold">Bookings</h1>

        <button
          onClick={() => load()}
          className="border border-emerald-400/40 text-emerald-300 px-3 py-2 rounded-lg hover:bg-emerald-400/10 hover:text-emerald-200 transition"
        >
          Refresh
        </button>
      </div>

      {error ? (
        <div className="border rounded p-3 text-sm text-red-600">{error}</div>
      ) : null}

      <div className="border rounded-lg overflow-hidden">
        <div className="p-4 border-b font-medium">All Bookings & Payments</div>

        {bookings.length === 0 ? (
          <div className="p-4 text-sm">No bookings yet.</div>
        ) : (
          <>
            <div className="w-full overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-xs uppercase opacity-80">
                  <tr className="border-b border-white/10">
                    <th className="text-left p-4">ID</th>
                    <th className="text-left p-4">Court</th>
                    <th className="text-left p-4">Date</th>
                    <th className="text-left p-4">Time</th>
                    <th className="text-left p-4">User</th>
                    <th className="text-left p-4">Status</th>
                    <th className="text-left p-4">Payment</th>
                    <th className="text-left p-4">Amount</th>
                    <th className="text-right p-4">Action</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-white/10">
                  {bookings.map((b) => (
                    <tr key={b._id} className="hover:bg-white/5 transition">
                      <td className="p-4 font-mono text-xs opacity-90">
                        {String(b._id).slice(0, 18)}...
                      </td>

                      <td className="p-4 font-medium">
                        {b.court?.name || "Court"}
                        <div className="text-xs opacity-60">
                          {b.court?.location || ""}
                        </div>
                      </td>

                      <td className="p-4">{b.date || "-"}</td>

                      <td className="p-4">
                        {b.startTime || "-"} - {b.endTime || "-"}
                      </td>

                      <td className="p-4">{b.user?.email || "-"}</td>

                      <td className="p-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full border ${badgeClass(
                            b.status
                          )}`}
                        >
                          {b.status || "UNKNOWN"}
                        </span>
                      </td>

                      <td className="p-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full border ${payBadgeClass(
                            b.paymentStatus || "UNPAID"
                          )}`}
                        >
                          {b.paymentStatus || "UNPAID"}
                        </span>
                      </td>

                      <td className="p-4">Rs {b.price ?? "-"}</td>

                      <td className="p-4 text-right">
                        {b.paymentStatus !== "PAID" ? (
                          <button
                            onClick={() => payEsewa(b._id)}
                            className="border px-3 py-2 rounded-lg hover:bg-white/5 transition"
                          >
                            Pay (eSewa)
                          </button>
                        ) : (
                          <span className="text-green-300 font-semibold">
                            PAID
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            
            <div className="flex items-center justify-between p-4">
              <div className="text-sm opacity-70">
                Page {page} of {totalPages}
              </div>

              <div className="flex gap-2">
                <button
                  disabled={page <= 1}
                  onClick={() => setPage((p) => p - 1)}
                  className="border px-3 py-2 rounded disabled:opacity-40"
                >
                  Previous
                </button>

                <button
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => p + 1)}
                  className="border px-3 py-2 rounded disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}