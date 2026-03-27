import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';


const offers = [
  {
    id: 1,
    jobTitle: 'Makine Dairesi Bakım İşi',
    company: 'Kuzey Denizcilik',
    location: 'Tuzla / İstanbul',
    offerAmount: '₺82.500',
    submittedAt: '12 Mart 2026',
    status: 'İnceleniyor',
    statusStyle:
      'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
    note: 'Teklifiniz teknik ekip tarafından değerlendiriliyor.',
  },
  {
    id: 2,
    jobTitle: 'Güverte Kumlama ve Boya',
    company: 'Marmara Lojistik',
    location: 'Ambarlı / İstanbul',
    offerAmount: '₺128.000',
    submittedAt: '10 Mart 2026',
    status: 'Revize İstendi',
    statusStyle:
      'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
    note: 'İşveren fiyat ve termin konusunda revize talep etti.',
  },
  {
    id: 3,
    jobTitle: 'Elektrik Tesisat Kontrolü',
    company: 'Delta Marine',
    location: 'Yalova',
    offerAmount: '₺69.500',
    submittedAt: '8 Mart 2026',
    status: 'Onaylandı',
    statusStyle:
      'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300',
    note: 'Teklifiniz kabul edildi. İş başlangıcı için geri dönüş bekleniyor.',
  },
];

const summaryCards = [
  {
    title: 'Toplam Teklif',
    value: '18',
    icon: 'send',
    iconWrap: 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400',
    helper: 'Bu ay +4 yeni teklif',
    helperColor: 'text-indigo-500',
  },
  {
    title: 'İncelenen Teklifler',
    value: '7',
    icon: 'hourglass_top',
    iconWrap: 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400',
    helper: '3 teklif aktif değerlendirmede',
    helperColor: 'text-amber-500',
  },
  {
    title: 'Onaylanan Teklifler',
    value: '5',
    icon: 'verified',
    iconWrap: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400',
    helper: '%27 başarı oranı',
    helperColor: 'text-emerald-500',
  },
];

const SubcontractorOffersPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Tüm Durumlar');
  const [dateFilter, setDateFilter] = useState('Tüm Tarihler');

  const filteredOffers = useMemo(() => {
  return offers.filter((offer) => {
    const matchesSearch =
      offer.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      offer.company.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === 'Tüm Durumlar' || offer.status === statusFilter;

    const matchesDate =
      dateFilter === 'Tüm Tarihler' ||
      (dateFilter === 'Son 7 Gün' && ['12 Mart 2026', '10 Mart 2026'].includes(offer.submittedAt)) ||
      (dateFilter === 'Son 30 Gün' && ['12 Mart 2026', '10 Mart 2026', '8 Mart 2026'].includes(offer.submittedAt)) ||
      (dateFilter === 'Bu Ay' && offer.submittedAt.includes('Mart 2026'));

    return matchesSearch && matchesStatus && matchesDate;
  });
}, [searchTerm, statusFilter, dateFilter]);

  const [selectedOffer, setSelectedOffer] = useState<(typeof offers)[number] | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const openDetailModal = (offer: (typeof offers)[number]) => {
    setSelectedOffer(offer);
    setIsEditModalOpen(false);
    setIsDetailModalOpen(true);
  };

  const openEditModal = (offer: (typeof offers)[number]) => {
    setSelectedOffer(offer);
    setIsDetailModalOpen(false);
    setIsEditModalOpen(true);
  };

  const closeModals = () => {
    setIsDetailModalOpen(false);
    setIsEditModalOpen(false);
    setSelectedOffer(null);
  };
  return (
    <>
      <div className="mb-8 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <button
              onClick={() => navigate('/dashboard/subcontractor')}
              className="inline-flex items-center gap-1 text-sm font-semibold text-slate-500 hover:text-primary transition-colors"
            >
              <span className="material-icons-round text-[18px]">arrow_back</span>
              Geri Dön
            </button>
          </div>

          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
            Verilen Teklifler
          </h2>
          <p className="text-slate-500 dark:text-slate-400">
            Gönderdiğiniz teklifleri, durumlarını ve teklif detaylarını buradan takip edebilirsiniz.
          </p>
        </div>

        <button
          onClick={() => navigate('/dashboard/subcontractor/jobs')}
          className="bg-primary hover:bg-primary/90 text-white font-bold py-2.5 px-6 rounded-xl transition-all shadow-md shadow-primary/20 flex items-center justify-center gap-2"
        >
          <span className="material-icons-round text-sm">search</span>
          İş Ara
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
        {summaryCards.map((card) => (
          <div
            key={card.title}
            className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50 flex flex-col"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl ${card.iconWrap}`}>
                <span className="material-icons-round">{card.icon}</span>
              </div>
            </div>

            <h3 className="text-slate-500 dark:text-slate-400 text-sm font-semibold mb-1">
              {card.title}
            </h3>
            <p className="text-3xl font-extrabold text-slate-800 dark:text-white">
              {card.value}
            </p>
            <div className={`mt-4 text-sm font-semibold ${card.helperColor}`}>
              {card.helper}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/50 rounded-2xl p-5 md:p-6 shadow-sm mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
              İlan / Firma Ara
            </label>
            <div className="relative">
              <span className="material-icons-round absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">
                search
              </span>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Örn. Kuzey Denizcilik"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40 text-slate-800 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
              Durum
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            >
              <option>Tüm Durumlar</option>
              <option>İnceleniyor</option>
              <option>Revize İstendi</option>
              <option>Onaylandı</option>
              <option>Reddedildi</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
              Tarih
            </label>
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            >
              <option>Tüm Tarihler</option>
              <option>Son 7 Gün</option>
              <option>Son 30 Gün</option>
              <option>Bu Ay</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('Tüm Durumlar');
                setDateFilter('Tüm Tarihler');
              }}
              className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 px-5 rounded-xl transition-all shadow-md shadow-primary/20 flex items-center justify-center gap-2"
            >
              <span className="material-icons-round text-sm">restart_alt</span>
              Filtreleri Sıfırla
            </button>
          </div>
        </div>
      </div>

      <div className="mb-5">
        <h3 className="text-lg font-bold text-slate-800 dark:text-white">Teklif Listesi</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Toplam {filteredOffers.length} teklif listelenmektedir.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {filteredOffers.map((offer) => (
          <div
            key={offer.id}
            className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 shadow-sm hover:border-primary/40 hover:shadow-md transition-all"
          >
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-6">
              
              {/* Sol: İkon, Başlık, Firma vs */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-3 mb-1.5">
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white truncate">
                    {offer.jobTitle}
                  </h4>
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md whitespace-nowrap border dark:border-transparent ${offer.statusStyle}`}>
                    {offer.status}
                  </span>
                </div>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <span className="material-icons-round text-[16px] text-primary">apartment</span>
                    {offer.company}
                  </div>
                  <div className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600 hidden sm:block"></div>
                  <div className="flex items-center gap-1.5">
                    <span className="material-icons-round text-[16px]">location_on</span>
                    {offer.location}
                  </div>
                  <div className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600 hidden sm:block"></div>
                  <div className="flex items-center gap-1.5">
                    <span className="material-icons-round text-[16px]">calendar_today</span>
                    {offer.submittedAt}
                  </div>
                </div>
                
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-3 truncate xl:whitespace-normal xl:line-clamp-2">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">Not:</span> {offer.note}
                </p>
              </div>

              {/* Sağ: Fiyat ve Butonlar */}
              <div className="w-full lg:w-auto flex flex-col sm:flex-row items-center justify-between sm:justify-end gap-4 shrink-0 p-4 lg:p-0 bg-slate-50 dark:bg-slate-900/50 lg:bg-transparent rounded-xl border border-slate-100 dark:border-slate-700/50 lg:border-none">
                <div className="flex flex-col items-center sm:items-end min-w-[120px]">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Teklif Tutarı</span>
                  <span className="text-xl font-black text-slate-800 dark:text-white">{offer.offerAmount}</span>
                </div>

                <div className="h-10 w-px bg-slate-200 dark:bg-slate-700 hidden lg:block"></div>

                <div className="flex items-center justify-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => openDetailModal(offer)}
                    className="flex-1 sm:flex-none flex items-center justify-center w-10 h-10 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
                    title="Detay Görüntüle"
                  >
                    <span className="material-icons-round text-[20px]">visibility</span>
                  </button>
                  <button
                    onClick={() => openEditModal(offer)}
                    className="flex-[3] sm:flex-none flex items-center justify-center gap-2 px-5 h-10 rounded-xl bg-primary text-white font-bold hover:bg-primary/90 transition-all shadow-sm shadow-primary/20"
                  >
                    <span className="material-icons-round text-[18px]">edit</span>
                    Güncelle
                  </button>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>
      {isDetailModalOpen && selectedOffer && (
  <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 backdrop-blur-[2px] px-4">
    <div className="w-full max-w-2xl bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-700 overflow-hidden max-h-[90vh] flex flex-col">
      <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 dark:border-slate-700 shrink-0">
        <div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-white">
            Teklif Detayı
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Gönderdiğiniz teklifin detay bilgileri
          </p>
        </div>

        <button
          onClick={closeModals}
          className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all"
        >
          <span className="material-icons-round">close</span>
        </button>
      </div>

      <div className="p-6 overflow-y-auto">
        <div className="flex items-start justify-between gap-3 mb-5">
          <div>
            <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              {selectedOffer.jobTitle}
            </h4>
            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <span className="material-icons-round text-[16px] text-primary">apartment</span>
              {selectedOffer.company}
            </div>
          </div>

          <span className={`text-[11px] font-bold px-2.5 py-1 rounded-md whitespace-nowrap ${selectedOffer.statusStyle}`}>
            {selectedOffer.status}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          <div className="rounded-xl bg-slate-50 dark:bg-slate-900/40 px-4 py-3 border border-slate-100 dark:border-slate-700/60">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">Konum</p>
            <p className="text-sm font-bold text-slate-700 dark:text-slate-200">{selectedOffer.location}</p>
          </div>

          <div className="rounded-xl bg-slate-50 dark:bg-slate-900/40 px-4 py-3 border border-slate-100 dark:border-slate-700/60">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">Teklif Tutarı</p>
            <p className="text-sm font-bold text-slate-700 dark:text-slate-200">{selectedOffer.offerAmount}</p>
          </div>

          <div className="rounded-xl bg-slate-50 dark:bg-slate-900/40 px-4 py-3 border border-slate-100 dark:border-slate-700/60">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">Gönderim Tarihi</p>
            <p className="text-sm font-bold text-slate-700 dark:text-slate-200">{selectedOffer.submittedAt}</p>
          </div>
        </div>

        <div className="rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-700/60 p-5">
          <h5 className="text-sm font-bold text-slate-800 dark:text-white mb-2">Durum Notu</h5>
          <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">
            {selectedOffer.note}
          </p>
        </div>
      </div>

        <div className="flex flex-col sm:flex-row justify-end gap-3 shrink-0 bg-white dark:bg-slate-800 p-6 pt-4 border-t border-slate-100 dark:border-slate-700">
          <button
            onClick={closeModals}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-semibold hover:border-primary/40 hover:text-primary transition-all"
          >
            Kapat
          </button>

          <button
            onClick={() => {
              if (selectedOffer) openEditModal(selectedOffer);
            }}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-primary text-white font-bold shadow-md shadow-primary/20 hover:bg-primary/90 transition-all"
          >
            <span className="material-icons-round text-[18px]">edit</span>
            Teklifi Güncelle
          </button>
        </div>
    </div>
  </div>
      )}
      {isEditModalOpen && selectedOffer && (
  <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 backdrop-blur-[2px] px-4">
    <div className="w-full max-w-2xl bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-700 overflow-hidden max-h-[90vh] flex flex-col">
      <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 dark:border-slate-700 shrink-0">
        <div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-white">
            Teklifi Güncelle
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {selectedOffer.jobTitle} için teklifinizi düzenleyin
          </p>
        </div>

        <button
          onClick={closeModals}
          className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all"
        >
          <span className="material-icons-round">close</span>
        </button>
      </div>

      <div className="p-6 space-y-5 overflow-y-auto">
        <div className="rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-700/60 p-4">
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">İlan</p>
          <p className="font-bold text-slate-800 dark:text-white">{selectedOffer.jobTitle}</p>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{selectedOffer.company}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
              Teklif Tutarı
            </label>
            <input
              type="text"
              defaultValue={selectedOffer.offerAmount}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40 text-slate-800 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
              Tahmini Süre
            </label>
            <input
              type="text"
              placeholder="Örn. 6 Gün"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40 text-slate-800 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
            Güncelleme Notu
          </label>
          <textarea
            rows={5}
            defaultValue={selectedOffer.note}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40 text-slate-800 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
          />
        </div>
      </div>

        <div className="flex flex-col sm:flex-row justify-end gap-3 shrink-0 bg-white dark:bg-slate-800 p-6 pt-4 border-t border-slate-100 dark:border-slate-700">
          <button
            onClick={closeModals}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-semibold hover:border-primary/40 hover:text-primary transition-all"
          >
            Vazgeç
          </button>

          <button
            onClick={closeModals}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-primary text-white font-bold shadow-md shadow-primary/20 hover:bg-primary/90 transition-all"
          >
            <span className="material-icons-round text-[18px]">save</span>
            Güncellemeyi Kaydet
          </button>
        </div>
      </div>
    </div>
)}
    </>
  );
};

export default SubcontractorOffersPage;