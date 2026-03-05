"use client";

import { useEffect, useRef, useState } from "react";
import { initiateEsewaPayment } from "@/lib/api/payment";
import { useRouter } from "next/navigation";

export default function EsewaRedirectClient({ bookingId }: { bookingId: string }) {
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  const [formUrl, setFormUrl] = useState("");
  const [fields, setFields] = useState<Record<string, string>>({});
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await initiateEsewaPayment(bookingId);
        if (!res?.success) throw new Error(res?.message || "Failed to initiate payment");

        setFormUrl(res.formUrl);
        setFields(res.fields);
      } catch (e: any) {
        setError(e?.message || "Payment error");
      }
    })();
  }, [bookingId]);

  useEffect(() => {
    if (formUrl && Object.keys(fields).length > 0) {
      formRef.current?.submit();
    }
  }, [formUrl, fields]);

  if (error) {
    return (
      <div style={{ padding: 24 }}>
        <h2>Payment Error</h2>
        <p>{error}</p>
        <button
          onClick={() => router.push(`/dashboard?error=${encodeURIComponent(error)}`)}
          style={{ padding: 10, border: "1px solid #ccc" }}
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: 24 }}>
      <h2>Redirecting to eSewa…</h2>
      <p>Please wait.</p>

      <form ref={formRef} action={formUrl} method="POST">
        {Object.entries(fields).map(([k, v]) => (
          <input key={k} type="hidden" name={k} value={String(v)} />
        ))}
        <noscript>
          <button type="submit">Continue</button>
        </noscript>
      </form>
    </div>
  );
}