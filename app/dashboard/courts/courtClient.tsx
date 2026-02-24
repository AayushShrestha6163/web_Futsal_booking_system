"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { MapPin, Search } from "lucide-react";

type Court = {
  _id: string;
  name?: string;
  location?: string;
  pricePerHour?: number;
  image?: string;
};

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

export default function CourtsClient({ initialCourts }: { initialCourts: Court[] }) {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return initialCourts;
    return initialCourts.filter((c) => {
      const name = (c.name || "").toLowerCase();
      const loc = (c.location || "").toLowerCase();
      return name.includes(s) || loc.includes(s);
    });
  }, [q, initialCourts]);

  return (
    <>
      <div className="bg-white border border-emerald-100 rounded-xl p-4 shadow mb-6 flex items-center gap-2">
        <Search className="w-5 h-5 text-slate-500" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search by court name or location..."
          className="w-full outline-none text-slate-800"
        />
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white border border-emerald-100 p-6 rounded-xl">
          No courts found.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((c) => {
            const img = c.image ? `${BASE_URL}/uploads/${c.image}` : null;

            return (
              <Link
                key={c._id}
                href={`/dashboard/courts/${c._id}`}
                className="bg-white border border-emerald-100 rounded-xl shadow hover:shadow-md transition overflow-hidden"
              >
                <div className="h-44 bg-emerald-100">
                  {img ? (
                    <img src={img} alt={c.name || "Court"} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-600">
                      No Image
                    </div>
                  )}
                </div>

                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h2 className="text-lg font-bold text-slate-900">{c.name || "Court"}</h2>
                    {typeof c.pricePerHour === "number" && (
                      <div className="text-emerald-700 font-semibold">Rs {c.pricePerHour}/hr</div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-slate-600 mt-2">
                    <MapPin className="w-4 h-4" />
                    <span>{c.location || "Kathmandu"}</span>
                  </div>

                  <div className="mt-4 w-full bg-emerald-600 text-white py-2 rounded-lg font-semibold text-center">
                    View & Book
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
}