"use client";

import { useState, ChangeEvent } from "react";
import {
  Eye,
  Pencil,
  Trash2,
  Upload,
  Search,
  X,
} from "lucide-react";

/* ================= TYPES ================= */

type Banner = {
  id: string;
  title: string;
  image: string;
  startDate: string;
  endDate: string;
  createdAt: string;
};

/* ================= STATUS LOGIC ================= */

function getBannerStatus(startDate: string, endDate: string) {
  const current = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (current < start) return "FUTURE";
  if (current > end) return "EXPIRED";
  return "ACTIVE";
}

/* ================= PAGE ================= */

export default function BannerPage() {
  const [showForm, setShowForm] = useState(false);

  const [banners, setBanners] = useState<Banner[]>([
    {
      id: "1",
      title: "Summer Collection",
      image:
        "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c",
      startDate: "2026-06-01",
      endDate: "2026-07-30",
      createdAt: "15 Jun 2026",
    },
    {
      id: "2",
      title: "Wedding Collection",
      image:
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1",
      startDate: "2026-07-15",
      endDate: "2026-09-10",
      createdAt: "20 Jun 2026",
    },
    {
      id: "3",
      title: "Old Diwali Offer",
      image:
        "https://images.unsplash.com/photo-1513151233558-d860c5398176",
      startDate: "2026-01-01",
      endDate: "2026-03-10",
      createdAt: "10 Jan 2026",
    },
  ]);

  const [form, setForm] = useState({
    title: "",
    startDate: "",
    endDate: "",
    image: "",
  });

  const [editingId, setEditingId] = useState<string | null>(null);

  const [selectedBanner, setSelectedBanner] =
    useState<Banner | null>(null);

  /* ---------- IMAGE ---------- */

  function handleImageUpload(
    e: ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    setForm((prev) => ({
      ...prev,
      image: imageUrl,
    }));
  }

  /* ---------- SUBMIT ---------- */

  function handleSubmit() {
    if (
      !form.title ||
      !form.startDate ||
      !form.endDate ||
      !form.image
    )
      return;

    if (editingId) {
      setBanners((prev) =>
        prev.map((banner) =>
          banner.id === editingId
            ? { ...banner, ...form }
            : banner
        )
      );

      setEditingId(null);
    } else {
      const newBanner: Banner = {
        id: crypto.randomUUID(),
        title: form.title,
        image: form.image,
        startDate: form.startDate,
        endDate: form.endDate,
        createdAt: new Date().toDateString(),
      };

      setBanners((prev) => [newBanner, ...prev]);
    }

    setForm({
      title: "",
      startDate: "",
      endDate: "",
      image: "",
    });

    setShowForm(false);
  }

  /* ---------- DELETE ---------- */

  function handleDelete(id: string) {
    setBanners((prev) =>
      prev.filter((banner) => banner.id !== id)
    );
  }

  /* ---------- EDIT ---------- */

  function handleEdit(banner: Banner) {
    setEditingId(banner.id);

    setForm({
      title: banner.title,
      startDate: banner.startDate,
      endDate: banner.endDate,
      image: banner.image,
    });

    setShowForm(true);
  }

  /* ---------- CANCEL ---------- */

  function handleCancel() {
    setShowForm(false);

    setEditingId(null);

    setForm({
      title: "",
      startDate: "",
      endDate: "",
      image: "",
    });
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* HEADER */}

      <div className="flex justify-between mb-6">

        <div>
          <h1 className="text-3xl font-bold">
            Banner Management
          </h1>

          <p className="text-gray-500 mt-1">
            Manage homepage banners and campaigns.
          </p>
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-700 text-white px-4 py-2 rounded-lg flex gap-2 items-center"
        >
          <Upload size={18} />
          Upload Banner
        </button>
      </div>

      {/* CONDITIONAL FORM */}

      {showForm && (
        <div className="bg-white p-5 rounded-xl border mb-6">

          <div className="flex justify-between mb-4">

            <h2 className="font-semibold text-lg">
              {editingId
                ? "Edit Banner"
                : "Upload New Banner"}
            </h2>

            <button onClick={handleCancel}>
              <X size={20} />
            </button>

          </div>

          <div className="grid grid-cols-4 gap-4">

            <input
              placeholder="Banner title"
              value={form.title}
              onChange={(e) =>
                setForm({
                  ...form,
                  title: e.target.value,
                })
              }
              className="border rounded p-3"
            />

            <input
              type="date"
              value={form.startDate}
              onChange={(e) =>
                setForm({
                  ...form,
                  startDate: e.target.value,
                })
              }
              className="border rounded p-3"
            />

            <input
              type="date"
              value={form.endDate}
              onChange={(e) =>
                setForm({
                  ...form,
                  endDate: e.target.value,
                })
              }
              className="border rounded p-3"
            />

            <input
              type="file"
              onChange={handleImageUpload}
              className="border rounded p-2"
            />

          </div>

          {form.image && (
            <img
              src={form.image}
              className="w-40 h-24 object-cover mt-4 rounded"
            />
          )}

          <div className="flex gap-3 mt-4">

            <button
              onClick={handleSubmit}
              className="bg-blue-700 text-white px-5 py-2 rounded"
            >
              {editingId
                ? "Update Banner"
                : "Submit Banner"}
            </button>

            <button
              onClick={handleCancel}
              className="border px-5 py-2 rounded"
            >
              Cancel
            </button>

          </div>
        </div>
      )}

      {/* SEARCH */}

      <div className="bg-white p-4 rounded-xl border mb-6 flex justify-between">

        <div className="flex items-center gap-2 border px-3 py-2 rounded w-96">

          <Search size={18} />

          <input
            placeholder="Search banner..."
            className="outline-none w-full"
          />
        </div>

        <select className="border px-4 rounded">
          <option>All</option>
        </select>

      </div>

      {/* CARDS */}

      <div className="grid grid-cols-4 gap-5">

        {banners.map((banner) => {
          const status = getBannerStatus(
            banner.startDate,
            banner.endDate
          );

          return (
            <div
              key={banner.id}
              className="bg-white rounded-xl border overflow-hidden shadow-sm"
            >
              <img
                src={banner.image}
                className="w-full h-36 object-cover"
              />

              <div className="p-4">

                <div className="flex justify-between items-center">

                  <h3 className="font-semibold">
                    {banner.title}
                  </h3>

                  <span
                    className={`text-xs px-2 py-1 rounded
                    ${status === "ACTIVE"
                        ? "bg-green-100 text-green-700"
                        : status === "FUTURE"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-red-100 text-red-700"
                      }`}
                  >
                    {status}
                  </span>
                </div>

                <p className="text-sm text-gray-500 mt-2">
                  Created {banner.createdAt}
                </p>

                <div className="flex gap-4 mt-4">

                  <button
                    onClick={() =>
                      setSelectedBanner(banner)
                    }
                  >
                    <Eye size={18} />
                  </button>

                  <button
                    onClick={() =>
                      handleEdit(banner)
                    }
                  >
                    <Pencil size={18} />
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(banner.id)
                    }
                  >
                    <Trash2 size={18} />
                  </button>

                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* PAGINATION */}

      <div className="flex justify-center gap-4 mt-8">

        <button>{"<"}</button>

        <button className="bg-blue-700 text-white px-3 py-1 rounded">
          1
        </button>

        <button>2</button>
        <button>3</button>
        <button>4</button>
        <button>5</button>

        <button>{">"}</button>

      </div>

      {/* VIEW MODAL */}

      {selectedBanner && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">

          <div className="bg-white p-6 rounded-xl w-[500px]">

            <img
              src={selectedBanner.image}
              className="w-full h-60 object-cover rounded"
            />

            <h2 className="text-xl font-bold mt-4">
              {selectedBanner.title}
            </h2>

            <p className="mt-2">
              Start: {selectedBanner.startDate}
            </p>

            <p>End: {selectedBanner.endDate}</p>

            <button
              onClick={() =>
                setSelectedBanner(null)
              }
              className="mt-4 bg-blue-700 text-white px-4 py-2 rounded"
            >
              Close
            </button>

          </div>
        </div>
      )}
    </div>
  );
}