"use client";

import { Calendar, Clock, MapPin, Trophy, User, LogOut, Menu } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import "@/app/styles/dashboard.css";
import { useRouter } from "next/navigation";
import {
  cancelBookingAction,
  initiateEsewaPaymentAction,
} from "@/lib/actions/booking-actions";
import { useAuth } from "@/context/AuthContext";

type Booking = {
  _id: string;
  court?: { name?: string; location?: string; pricePerHour?: number };
  date: string;
  startTime: string;
  endTime: string;

  status?: "pending" | "confirmed" | "cancelled" | "completed";

  price?: number;

  paymentMethod?: "NONE" | "ESEWA";
  paymentStatus?: "UNPAID" | "PAID" | "FAILED";
  transactionUuid?: string;
  paidAt?: string;
};

export default function DashboardClient({
  upcomingBookings,
  success,
  error,
}: {
  upcomingBookings: Booking[];
  success?: string;
  error?: string;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [payingId, setPayingId] = useState<string>("");
  const router = useRouter();
  const { logout } = useAuth();

  const stats = useMemo(
    () => [
      {
        label: "Total Bookings",
        value: String(upcomingBookings.length),
        icon: Calendar,
        color: "text-green-600",
      },
      { label: "Hours Played", value: "-", icon: Clock, color: "text-blue-600" },
      { label: "Courts Visited", value: "-", icon: MapPin, color: "text-purple-600" },
      { label: "Matches Won", value: "-", icon: Trophy, color: "text-amber-600" },
    ],
    [upcomingBookings.length]
  );

  const handleCancel = async (bookingId: string) => {
    const ok = confirm("Are you sure you want to cancel this booking?");
    if (!ok) return;

    try {
      await cancelBookingAction(bookingId);
      router.refresh();
    } catch (err: any) {
      alert(err?.message || "Cancel failed");
    }
  };

  // ✅ Pay Now using SERVER ACTION (axiosServer reads httpOnly cookie)
  const handlePayNow = async (bookingId: string) => {
    try {
      setPayingId(bookingId);

      const data: any = await initiateEsewaPaymentAction(bookingId);

      if (!data?.success) {
        throw new Error(data?.message || "Payment initiation failed");
      }

      const formUrl: string = data.formUrl;
      const fields: Record<string, any> = data.fields || {};

      // Submit form to eSewa
      const form = document.createElement("form");
      form.method = "POST";
      form.action = formUrl;

      Object.entries(fields).forEach(([key, value]) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = String(value);
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();
    } catch (err: any) {
      alert(err?.message || "Payment failed");
    } finally {
      setPayingId("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-50 text-slate-900">
      <header className="bg-white border-b border-emerald-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Trophy className="w-8 h-8 text-emerald-600" />
            <span className="text-xl font-bold text-emerald-700">KHEL MAIDAN</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/dashboard" className="text-emerald-700 font-semibold">
              Dashboard
            </Link>
            <Link href="/dashboard/bookings" className="text-slate-600 hover:text-emerald-700">
              My Bookings
            </Link>
            <Link href="/dashboard/courts" className="text-slate-600 hover:text-emerald-700">
              Find Courts
            </Link>

            <Link href="/user/profile" className="text-slate-600 hover:text-emerald-700 flex items-center gap-2">
              <User className="w-4 h-4" /> Profile
            </Link>

            <button
              type="button"
              onClick={logout}
              className="text-red-600 flex items-center gap-2 hover:text-red-700"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </nav>

          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden text-slate-800">
            <Menu />
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden px-4 pb-4 space-y-2 border-t border-emerald-100">
            <Link href="/dashboard" className="block p-2 bg-emerald-100 text-emerald-800 rounded">
              Dashboard
            </Link>
            
            <Link href="/dashboard/courts" className="block p-2 text-slate-700 hover:text-emerald-700">
              Find Courts
            </Link>

            <button
              type="button"
              onClick={logout}
              className="block w-full text-left p-2 text-red-600 hover:text-red-700"
            >
              Logout
            </button>
          </div>
        )}
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {success && (
          <div className="mb-6 bg-green-100 border border-green-300 text-green-800 px-4 py-3 rounded">
            {decodeURIComponent(success)}
          </div>
        )}

        {error && error !== "NEXT_REDIRECT" && (
          <div className="mb-6 bg-red-100 border border-red-300 text-red-800 px-4 py-3 rounded">
            {decodeURIComponent(error)}
          </div>
        )}

        <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome back, Player!</h1>
        <p className="text-slate-600 mb-6">Ready to book your next game?</p>

        <Link
          href="/dashboard/courts"
          className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded mb-8 shadow"
        >
          <Calendar className="w-5 h-5" /> Book a Court Now
        </Link>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl shadow border border-emerald-100">
              <p className="text-sm text-slate-600">{stat.label}</p>
              <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
              <stat.icon className={`w-6 h-6 mt-2 ${stat.color}`} />
            </div>
          ))}
        </div>

        <div className="bg-white p-6 rounded-xl shadow border border-emerald-100 mb-6">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Upcoming Bookings</h2>

          {upcomingBookings.length === 0 ? (
            <p className="text-slate-600">No upcoming bookings yet. Book your first court!</p>
          ) : (
            upcomingBookings.map((b) => {
              const payStatus = b.paymentStatus || "UNPAID";
              const amount = b.price ?? 0;

              const canPay = b.status === "pending" && payStatus !== "PAID";
              const canCancel = payStatus !== "PAID";

              return (
                <div
                  key={b._id}
                  className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 p-4 bg-emerald-100/70 border border-emerald-200 rounded mb-3"
                >
                  <div className="min-w-0">
                    <h3 className="font-semibold text-slate-900">
                      {b.court?.name || "Court"}
                      {b.court?.location ? ` - ${b.court.location}` : ""}
                    </h3>

                    <p className="text-sm text-slate-600">{b.date}</p>
                    <p className="text-sm text-slate-600">
                      {b.startTime} - {b.endTime}
                    </p>

                    {/* ✅ Paid/Unpaid + amount */}
                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      <span
                        className={
                          payStatus === "PAID"
                            ? "px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 border border-green-200"
                            : payStatus === "FAILED"
                            ? "px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700 border border-yellow-200"
                            : "px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700 border border-red-200"
                        }
                      >
                        {payStatus}
                      </span>

                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/70 border border-emerald-200 text-slate-700">
                        Rs {amount}
                      </span>

                      {b.paymentMethod && b.paymentMethod !== "NONE" && (
                        <span className="text-xs text-slate-600">
                          {b.paymentMethod === "ESEWA" ? "eSewa" : b.paymentMethod}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* ✅ Actions: Pay Now + Cancel (no View) */}
                  <div className="flex gap-2 sm:items-start">
                    {canPay ? (
                      <button
                        onClick={() => handlePayNow(b._id)}
                        disabled={payingId === b._id}
                        className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-60 text-white px-4 py-2 rounded-md text-sm font-semibold shadow"
                      >
                        {payingId === b._id ? "Processing..." : "Pay Now"}
                      </button>
                    ) : (
                      <button
                        disabled
                        className="bg-slate-200 text-slate-600 px-4 py-2 rounded-md text-sm font-semibold cursor-not-allowed"
                      >
                        {payStatus === "PAID" ? "Paid" : "Not Payable"}
                      </button>
                    )}

                    <button
                      onClick={() => handleCancel(b._id)}
                      disabled={!canCancel}
                      className="text-red-600 hover:text-red-700 disabled:opacity-50 px-3 py-2 text-sm font-semibold"
                      title={!canCancel ? "Paid booking cannot be cancelled" : "Cancel booking"}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="bg-white p-6 rounded-xl shadow border border-emerald-100">
          <h2 className="text-xl font-bold text-slate-900 mb-4">Recent Activity</h2>
          <p className="text-slate-700">Your booking activity will show here.</p>
        </div>
      </main>
    </div>
  );
}