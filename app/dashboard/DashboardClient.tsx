"use client";

import { Calendar, Clock, MapPin, Trophy, User, LogOut, Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import "@/app/styles/dashboard.css";
import { useRouter } from "next/navigation";
import { cancelBookingAction } from "../../lib/actions/booking-actions";
import { useAuth } from "@/context/AuthContext"; 

type Booking = {
  _id: string;
  court?: { name?: string; location?: string };
  date: string;
  startTime: string;
  endTime: string;
  status?: string;
  paymentStatus?: string;
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
  const router = useRouter();
  const { logout } = useAuth(); 

  const stats = [
    { label: "Total Bookings", value: String(upcomingBookings.length), icon: Calendar, color: "text-green-600" },
    { label: "Hours Played", value: "-", icon: Clock, color: "text-blue-600" },
    { label: "Courts Visited", value: "-", icon: MapPin, color: "text-purple-600" },
    { label: "Matches Won", value: "-", icon: Trophy, color: "text-amber-600" },
  ];

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
            <Link href="/dashboard/bookings" className="block p-2 text-slate-700 hover:text-emerald-700">
              My Bookings
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
            Booking successful 🎉
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
            upcomingBookings.map((b) => (
              <div
                key={b._id}
                className="flex justify-between p-4 bg-emerald-100/70 border border-emerald-200 rounded mb-3"
              >
                <div>
                  <h3 className="font-semibold text-slate-900">
                    {b.court?.name || "Court"}
                    {b.court?.location ? ` - ${b.court.location}` : ""}
                  </h3>
                  <p className="text-sm text-slate-600">{b.date}</p>
                  <p className="text-sm text-slate-600">
                    {b.startTime} - {b.endTime}
                  </p>
                </div>

                <div className="flex gap-2 items-start">
                  <Link
                    href="/dashboard/bookings"
                    className="border border-emerald-300 text-emerald-800 px-3 py-1 rounded hover:bg-emerald-50"
                  >
                    View
                  </Link>

                  <button
                    onClick={() => handleCancel(b._id)}
                    className="text-red-600 hover:text-red-700 px-3 py-1"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ))
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