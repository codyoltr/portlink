import React, { useState } from "react";
import DashboardLayout from "@/features/dashboard/components/DashboardLayout";
import { useNavigate } from "react-router-dom";

const mockOffers = [
  {
    id: 1,
    company: "Port A.Ş.",
    job: "Güverte",
    price: "₺45,000",
    duration: "3 Gün",
    status: "pending",
  },
  {
    id: 2,
    company: "Ayşe Ltd.",
    job: "Makine",
    price: "₺30,000",
    duration: "2 Gün",
    status: "accepted",
  },
  {
    id: 3,
    company: "Aleyna.",
    job: "Boyama",
    price: "₺20,000",
    duration: "4 Gün",
    status: "rejected",
  },
];

const OffersPage: React.FC = () => {
  const [filter, setFilter] = useState("all");
  const [selectedOffer, setSelectedOffer] = useState<any>(null);
  const navigate = useNavigate();

  const filteredOffers =
    filter === "all"
      ? mockOffers
      : mockOffers.filter((o) => o.status === filter);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-amber-100 text-amber-700";
      case "accepted":
        return "bg-emerald-100 text-emerald-700";
      case "rejected":
        return "bg-red-100 text-red-700";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Bekliyor";
      case "accepted":
        return "Kabul Edildi";
      case "rejected":
        return "Reddedildi";
    }
  };

  return (
    <DashboardLayout role="agent">
      {/* HEADER */}
      
      <div className="mb-8 flex items-center gap-4">

  {/* BACK */}
 <button
          onClick={() => navigate("/dashboard/agent")
}
          className="text-sm text-primary mb-4"
        >
          ← Geri Dön
        </button>

  {/* TITLE */}
  <div>
    <h2 className="text-2xl font-bold text-slate-800">
      Gelen Teklifler
    </h2>
    <p className="text-slate-500">
      Tüm tekliflerini buradan yönetebilirsin
    </p>
  </div>

</div>
      {/* FILTERS */}
      <div className="flex gap-3 mb-6">
        {[
          { key: "all", label: "Hepsi" },
          { key: "pending", label: "Bekliyor" },
          { key: "accepted", label: "Kabul Edildi" },
          { key: "rejected", label: "Reddedildi" },
        ].map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${
              filter === f.key
                ? "bg-primary text-white"
                : "bg-slate-100 hover:bg-slate-200"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* LIST */}
      <div className="space-y-4">
        {filteredOffers.map((offer) => (
          <div
            key={offer.id}
            className="bg-white p-5 rounded-2xl border border-slate-100 hover:shadow-md transition 
            grid grid-cols-4 items-center gap-4"
          >
            {/* COMPANY */}
            <div>
              <h4 className="font-bold text-slate-800">
                {offer.company}
              </h4>
              <p className="text-sm text-slate-500">
                {offer.job}
              </p>
            </div>

            {/* PRICE */}
            <div>
              <p className="font-bold text-lg">{offer.price}</p>
              <p className="text-sm text-slate-500">
                {offer.duration}
              </p>
            </div>

            {/* STATUS */}
            <div>
              <span
                className={`px-3 py-1 rounded-md text-xs font-bold ${getStatusStyle(
                  offer.status
                )}`}
              >
                {getStatusText(offer.status)}
              </span>
            </div>

            {/* ACTIONS */}
            <div className="flex gap-2 justify-end">
              <button className="px-3 py-1 bg-emerald-500 text-white rounded-lg text-sm hover:bg-emerald-600">
                Kabul
              </button>

              <button className="px-3 py-1 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600">
                Red
              </button>

              <button
                onClick={() => setSelectedOffer(offer)}
                className="px-3 py-1 border rounded-lg text-sm hover:bg-slate-50"
              >
                Detay
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 🔥 MODAL */}
      {selectedOffer && (
        <div
          onClick={() => setSelectedOffer(null)}
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white p-6 rounded-2xl w-full max-w-md shadow-xl"
          >
            <h3 className="text-xl font-bold mb-4">
              Teklif Detayı
            </h3>

            <div className="space-y-2 text-sm text-slate-700">
              <p><b>Firma:</b> {selectedOffer.company}</p>
              <p><b>İş:</b> {selectedOffer.job}</p>
              <p><b>Fiyat:</b> {selectedOffer.price}</p>
              <p><b>Süre:</b> {selectedOffer.duration}</p>
              <p>
                <b>Durum:</b>{" "}
                {getStatusText(selectedOffer.status)}
              </p>
            </div>

            <button
              onClick={() => setSelectedOffer(null)}
              className="mt-5 w-full bg-primary text-white py-2 rounded-lg hover:bg-primary/90"
            >
              Kapat
            </button>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default OffersPage;