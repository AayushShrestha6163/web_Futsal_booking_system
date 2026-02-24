import Link from "next/link";
import { redirect } from "next/navigation";
import {
  getCourtByIdAction,
  getSlotsAction,
} from "../../../../lib/actions/court-actions";
import { createBookingAction } from "../../../../lib/actions/booking-actions";

export default async function CourtDetailsPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ date?: string; error?: string }>;
}) {
  const { id: courtId } = await params;
  const sp = await searchParams;

  const date = sp?.date || new Date().toISOString().slice(0, 10);

  const courtRes = await getCourtByIdAction(courtId);
  const court = courtRes?.court;

  if (!court) {
    return (
      <div className="min-h-screen p-8">
        <Link
          href="/dashboard/courts"
          className="text-emerald-700 hover:underline font-semibold"
        >
          ← Back to Courts
        </Link>
        <p className="mt-6 text-red-600 font-semibold">Court not found.</p>
      </div>
    );
  }

  const slotsRes = await getSlotsAction(courtId, date);
  const slots = slotsRes?.slots || slotsRes?.data || [];

  const base =
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";
  const imgUrl = court?.image ? `${base}/uploads/${court.image}` : null;

  // ✅ Server Action: create booking then go to payment page
  async function bookAndGoToPayment(formData: FormData) {
    "use server";

    const startTime = String(formData.get("startTime") || "");
    const endTime = String(formData.get("endTime") || "");

    if (!startTime || !endTime) {
      redirect(
        `/dashboard/courts/${courtId}?date=${date}&error=${encodeURIComponent(
          "Invalid slot time"
        )}`
      );
    }

    try {
      const bookingRes: any = await createBookingAction(
        courtId,
        date,
        startTime,
        endTime
      );

      const bookingId = bookingRes?.bookingId;

      if (!bookingId) {
        redirect(
          `/dashboard/courts/${courtId}?date=${date}&error=${encodeURIComponent(
            "bookingId missing from backend response"
          )}`
        );
      }

      // ✅ IMPORTANT: redirect throws NEXT_REDIRECT (must not be caught)
      redirect(`/pay/esewa?bookingId=${bookingId}`);
    } catch (e: any) {
      // ✅ Let Next.js redirect work
      if (e?.digest?.includes("NEXT_REDIRECT")) throw e;

      redirect(
        `/dashboard/courts/${courtId}?date=${date}&error=${encodeURIComponent(
          e?.message || "Booking failed"
        )}`
      );
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-50 text-slate-900">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <Link
          href="/dashboard/courts"
          className="text-emerald-700 hover:underline font-semibold"
        >
          ← Back to Courts
        </Link>

        {/* optional error banner */}
        {sp?.error && sp.error !== "NEXT_REDIRECT" && (
          <div className="mt-4 bg-red-100 border border-red-300 text-red-800 px-4 py-3 rounded">
            {decodeURIComponent(sp.error)}
          </div>
        )}

        <div className="mt-6 bg-white border border-emerald-100 rounded-xl shadow overflow-hidden">
          <div className="h-64 bg-emerald-100">
            {imgUrl ? (
              <img
                src={imgUrl}
                alt={court?.name || "Court"}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-600">
                No Image
              </div>
            )}
          </div>

          <div className="p-6">
            <h1 className="text-2xl font-bold">{court?.name}</h1>
            <p className="text-slate-600">{court?.location}</p>
            <p className="text-emerald-700 font-semibold mt-2">
              Rs {court?.pricePerHour}/hr
            </p>

            {/* Date filter */}
            <div className="mt-6">
              <form method="GET">
                <label className="block text-sm font-semibold mb-2">
                  Choose date
                </label>
                <input
                  type="date"
                  name="date"
                  defaultValue={date}
                  className="border border-emerald-200 rounded-lg px-3 py-2"
                />
                <button
                  type="submit"
                  className="ml-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg"
                >
                  Load Slots
                </button>
              </form>
            </div>

            {/* Slots */}
            <div className="mt-6">
              <h2 className="font-bold mb-3">Available Slots</h2>

              {slots.length === 0 ? (
                <p className="text-slate-600">No slots found for this date.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {slots.map((s: any, idx: number) => {
                    const timeStr = String(s?.time || "");
                    const [rawStart, rawEnd] = timeStr.split("-");
                    const startTime = rawStart?.trim();
                    const endTime = rawEnd?.trim();
                    const canBook = Boolean(s?.available) && startTime && endTime;

                    return (
                      <form
                        key={idx}
                        action={bookAndGoToPayment}
                        className="border border-emerald-200 rounded-lg p-3"
                      >
                        <div className="font-semibold">{timeStr}</div>

                        {/* ✅ Hidden inputs submitted to server action */}
                        <input
                          type="hidden"
                          name="startTime"
                          value={startTime}
                        />
                        <input type="hidden" name="endTime" value={endTime} />

                        <button
                          type="submit"
                          disabled={!canBook}
                          className={`mt-2 w-full py-2 rounded-lg ${
                            canBook
                              ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                              : "bg-gray-300 text-gray-600 cursor-not-allowed"
                          }`}
                        >
                          {canBook ? "Book This Slot" : "Booked"}
                        </button>
                      </form>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}