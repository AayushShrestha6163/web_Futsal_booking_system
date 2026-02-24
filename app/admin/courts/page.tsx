"use client";

import DeleteModal from "../users/_components/DeleteModal";
import { useEffect, useState } from "react";
import {
  getAdminCourts,
  createAdminCourt,
  updateAdminCourt,
  deleteAdminCourt,
} from "@/lib/api/admin/courts";

const BACKEND = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

export default function CourtsPage() {
  const [courts, setCourts] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  // ✅ Delete Modal state
  const [isDeleteOpen, setIsDeleteOpen] = useState<null | boolean>(null);
  const [selectedCourtId, setSelectedCourtId] = useState<string | null>(null);

  const [form, setForm] = useState<any>({
    name: "",
    location: "",
    pricePerHour: 1500,
    openingTime: "06:00",
    closingTime: "22:00",
    image: null as File | null,
  });

  const load = async () => {
    try {
      setError("");
      const data = await getAdminCourts();
      setCourts(data.courts || []);
    } catch (e: any) {
      setError(e?.message || "Failed to load courts");
    }
  };

  useEffect(() => {
    load();
  }, []);

  const resetForm = () => {
    setEditingId(null);
    setForm({
      name: "",
      location: "",
      pricePerHour: 1500,
      openingTime: "06:00",
      closingTime: "22:00",
      image: null,
    });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError("");
      if (editingId) {
        await updateAdminCourt(editingId, form);
      } else {
        await createAdminCourt(form);
      }
      await load();
      resetForm();
    } catch (e: any) {
      setError(e?.message || "Failed");
    }
  };

  const onEdit = (c: any) => {
    setEditingId(c._id);
    setForm({
      name: c.name || "",
      location: c.location || "",
      pricePerHour: c.pricePerHour || 1500,
      openingTime: c.openingTime || "06:00",
      closingTime: c.closingTime || "22:00",
      image: null,
    });
  };

  // ✅ open modal instead of confirm()
  const openDeleteModal = (id: string) => {
    setSelectedCourtId(id);
    setIsDeleteOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteOpen(null);
    setSelectedCourtId(null);
  };

  const confirmDelete = async () => {
    if (!selectedCourtId) return;

    try {
      setError("");
      await deleteAdminCourt(selectedCourtId);
      await load();
      closeDeleteModal();
    } catch (e: any) {
      setError(e?.message || "Delete failed");
      closeDeleteModal();
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-xl font-semibold">Courts</h1>

      {error ? (
        <div className="border rounded p-3 text-sm text-red-600">{error}</div>
      ) : null}

      <form onSubmit={onSubmit} className="border rounded-lg p-4 space-y-3">
        <div className="font-medium">
          {editingId ? "Edit Court" : "Add Court"}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input
            className="border p-2 rounded"
            placeholder="Court name"
            value={form.name}
            onChange={(e) =>
              setForm((s: any) => ({ ...s, name: e.target.value }))
            }
            required
          />
          <input
            className="border p-2 rounded"
            placeholder="Location"
            value={form.location}
            onChange={(e) =>
              setForm((s: any) => ({ ...s, location: e.target.value }))
            }
            required
          />
          <input
            className="border p-2 rounded"
            type="number"
            placeholder="Price per hour"
            value={form.pricePerHour}
            onChange={(e) =>
              setForm((s: any) => ({
                ...s,
                pricePerHour: Number(e.target.value),
              }))
            }
            required
          />

          <div className="flex gap-2">
            <input
              className="border p-2 rounded w-full"
              placeholder="Opening (06:00)"
              value={form.openingTime}
              onChange={(e) =>
                setForm((s: any) => ({ ...s, openingTime: e.target.value }))
              }
              required
            />
            <input
              className="border p-2 rounded w-full"
              placeholder="Closing (22:00)"
              value={form.closingTime}
              onChange={(e) =>
                setForm((s: any) => ({ ...s, closingTime: e.target.value }))
              }
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-sm opacity-80">Court Image</label>
            <input
              type="file"
              accept="image/*"
              className="border p-2 rounded w-full"
              onChange={(e) =>
                setForm((s: any) => ({
                  ...s,
                  image: e.target.files?.[0] || null,
                }))
              }
            />
            <div className="text-xs opacity-60 mt-1">Optional image upload</div>
          </div>
        </div>

        <div className="flex gap-2">
          <button className="border px-4 py-2 rounded hover:bg-gray-50">
            {editingId ? "Update" : "Add"}
          </button>
          {editingId ? (
            <button
              type="button"
              onClick={resetForm}
              className="border px-4 py-2 rounded hover:bg-gray-50"
            >
              Cancel
            </button>
          ) : null}
        </div>
      </form>

      <div className="border rounded-lg">
        <div className="p-4 border-b font-medium">All Courts</div>

        <div className="divide-y">
          {courts.length === 0 ? (
            <div className="p-4 text-sm">No courts yet.</div>
          ) : (
            courts.map((c) => (
              <div
                key={c._id}
                className="p-4 text-sm flex justify-between gap-4"
              >
                <div className="flex gap-3">
                  <div className="w-20 h-14 rounded overflow-hidden border bg-black/5">
                    {c.image ? (
                      <img
                        src={`${BACKEND}/uploads/${c.image}`}
                        alt={c.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs opacity-60">
                        No Image
                      </div>
                    )}
                  </div>

                  <div>
                    <div className="font-medium">{c.name}</div>
                    <div className="opacity-70">
                      {c.location} • Rs {c.pricePerHour}/hr • {c.openingTime}-
                      {c.closingTime}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => onEdit(c)}
                    className="border px-3 py-2 rounded hover:bg-gray-50"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => openDeleteModal(c._id)} // ✅ open modal
                    className="border px-3 py-2 rounded hover:bg-red-50 text-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* ✅ Reuse same DeleteModal UI (no change) */}
      <DeleteModal
        isOpen={isDeleteOpen}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
        title="Delete court?"
        description="This court will be permanently deleted. This action cannot be undone."
      />
    </div>
  );
}