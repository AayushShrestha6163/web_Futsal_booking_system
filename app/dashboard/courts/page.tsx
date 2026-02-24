import Link from "next/link";
import { getCourtsAction } from "../../../lib/actions/court-actions";
import CourtsClient from "./courtClient";

export default async function CourtsPage() {
  const data = await getCourtsAction();
  const courts = data?.courts || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-50 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold">Find Courts</h1>
            <p className="text-slate-600">Browse courts and book your slot.</p>
          </div>
          <Link href="/dashboard" className="text-emerald-700 hover:underline font-semibold">
            ← Back to Dashboard
          </Link>
        </div>

        <CourtsClient initialCourts={courts} />
      </div>
    </div>
  );
}