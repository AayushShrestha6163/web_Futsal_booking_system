import EsewaRedirectClient from "./EsewaRedirectClient";

export const dynamic = "force-dynamic";

export default async function EsewaPayPage({
  searchParams,
}: {
  searchParams: Promise<{ bookingId?: string }>;
}) {
  const sp = await searchParams;

  if (!sp?.bookingId) {
    return <div style={{ padding: 24 }}>Missing bookingId</div>;
  }

  return <EsewaRedirectClient bookingId={sp.bookingId} />;
}