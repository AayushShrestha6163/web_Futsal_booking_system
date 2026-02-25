import Link from "next/link";
import { cookies } from "next/headers";
import { logoutAction } from "@/lib/actions/auth-actions";

export default async function ProfilePage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  if (!token) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-white p-8">
        <div className="max-w-xl mx-auto bg-white rounded-2xl shadow p-6 border">
          <h1 className="text-xl font-bold text-slate-900">Profile</h1>
          <p className="mt-2 text-slate-600">Please login again.</p>
          <Link
            href="/login"
            className="inline-block mt-4 px-4 py-2 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  const base = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

  const res = await fetch(`${base}/api/auth/me`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  const data = await res.json();

  if (!res.ok) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-white p-8">
        <div className="max-w-xl mx-auto bg-white rounded-2xl shadow p-6 border">
          <h1 className="text-xl font-bold text-slate-900">Profile</h1>
          <p className="mt-2 text-red-600">{data?.message || "Failed to load profile"}</p>
          <Link
            href="/dashboard"
            className="inline-block mt-4 px-4 py-2 rounded-xl bg-slate-900 text-white font-semibold hover:opacity-90"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const user = data.data;
  const profileImage = user.profile ? `${base}${user.profile}` : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50 p-6 sm:p-10">
      <div className="max-w-4xl mx-auto">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              My Profile
            </h1>
            <p className="text-slate-600 mt-1">
              Your account details and status
            </p>
          </div>

          <div className="flex gap-3">
            <Link
              href="/dashboard"
              className="px-4 py-2 rounded-xl border border-emerald-200 bg-white text-slate-800 font-semibold hover:border-emerald-400"
            >
              Back to Dashboard
            </Link>

            {/* Logout (server action) */}
            <form action={logoutAction}>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-slate-900 text-white font-semibold hover:opacity-90"
              >
                Logout
              </button>
            </form>
          </div>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-emerald-100 overflow-hidden">
          {/* Header strip */}
          <div className="p-6 sm:p-8 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white">
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 rounded-2xl overflow-hidden bg-white/20 flex items-center justify-center">
                {profileImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-2xl font-black">
                    {(user.email?.[0] || "U").toUpperCase()}
                  </span>
                )}
              </div>

              <div>
                <p className="text-sm opacity-90">Signed in as</p>
                <p className="text-xl sm:text-2xl font-extrabold">
                  {user.email}
                </p>

                <span className="inline-flex mt-2 items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-sm font-semibold">
                  Role: {user.role}
                </span>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="p-6 sm:p-8">
            <div className="grid sm:grid-cols-3 gap-4">
              <Info label="User ID" value={user._id} />
              <Info label="Role" value={user.role} />
              <Info
                label="Joined"
                value={new Date(user.createdAt).toDateString()}
              />
            </div>

            
          </div>
        </div>

        
        
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 p-4 bg-white">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-1 font-semibold text-slate-900 break-all">{value}</p>
    </div>
  );
}