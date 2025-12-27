"use client"

import { Calendar, Clock, MapPin, Trophy, User, LogOut, Menu } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import "@/app/styles/dashboard.css"


export default function DashboardPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const upcomingBookings = [
    {
      id: 1,
      court: "Court A - Jawalakhel",
      date: "Dec 28, 2025",
      time: "6:00 PM - 7:00 PM",
      status: "Confirmed",
    },
    {
      id: 2,
      court: "Court B - Kupondole",
      date: "Dec 30, 2025",
      time: "5:00 PM - 6:00 PM",
      status: "Confirmed",
    },
  ]

  const stats = [
    { label: "Total Bookings", value: "24", icon: Calendar, color: "text-green-600" },
    { label: "Hours Played", value: "48", icon: Clock, color: "text-blue-600" },
    { label: "Courts Visited", value: "8", icon: MapPin, color: "text-purple-600" },
    { label: "Matches Won", value: "15", icon: Trophy, color: "text-amber-600" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Trophy className="w-8 h-8 text-green-600" />
            <span className="text-xl font-bold text-green-700">KHEL MAIDAN</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/dashboard" className="text-green-600 font-semibold">Dashboard</Link>
            <Link href="/dashboard/bookings" className="text-gray-600 hover:text-green-600">My Bookings</Link>
            <Link href="/dashboard/courts" className="text-gray-600 hover:text-green-600">Find Courts</Link>

            <button className="border px-3 py-1 rounded flex items-center gap-2">
              <User className="w-4 h-4" /> Profile
            </button>

            <button className="text-red-600 flex items-center gap-2">
              <LogOut className="w-4 h-4" /> 
              <Link
                href="/register"
                className="text-purple-400 hover:underline cursor-pointer"
              >
                LogOut
            
              </Link>
              
            </button>
          </nav>

          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden">
            <Menu />
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden px-4 pb-4 space-y-2">
            <Link href="/dashboard" className="block p-2 bg-green-50 rounded">Dashboard</Link>
            <Link href="/dashboard/bookings" className="block p-2">My Bookings</Link>
            <Link href="/dashboard/courts" className="block p-2">Find Courts</Link>
          </div>
        )}
      </header>

      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Welcome back, Player!</h1>
        <p className="text-gray-600 mb-6">Ready to book your next game?</p>

        <button className="bg-green-600 text-white px-6 py-3 rounded mb-8 flex items-center gap-2">
          <Calendar className="w-5 h-5" /> Book a Court Now
        </button>

        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl shadow">
              <p className="text-sm text-gray-600">{stat.label}</p>
              <p className="text-3xl font-bold">{stat.value}</p>
              <stat.icon className={`w-6 h-6 mt-2 ${stat.color}`} />
            </div>
          ))}
        </div>

        
        <div className="bg-white p-6 rounded-xl shadow mb-6">
          <h2 className="text-xl font-bold mb-4">Upcoming Bookings</h2>
          {upcomingBookings.map((b) => (
            <div key={b.id} className="flex justify-between p-4 bg-green-50 rounded mb-3">
              <div>
                <h3 className="font-semibold">{b.court}</h3>
                <p className="text-sm">{b.date}</p>
                <p className="text-sm">{b.time}</p>
              </div>
              <div className="flex gap-2">
                <button className="border px-3 py-1 rounded">View</button>
                <button className="text-red-600">Cancel</button>
              </div>
            </div>
          ))}
        </div>

        
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
          <p>Booked Court A - Jawalakhel</p>
          <p>Completed match at Court C - Patan</p>
          <p>Cancelled booking at Court D - Bhaktapur</p>
        </div>
      </main>
    </div>
  )
}
