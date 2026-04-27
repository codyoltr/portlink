import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/features/dashboard/components/LocalAgentDashboard/DashboardLayout';
import { agencyService } from '@/api/services/agencyService';

// Senin sahte verilerin (Listenin boş kalmaması için şimdilik dursun dedik)
const incomingOffers = [
  {
    id: 1,
    jobTitle: 'Ana Makine Bakımı',
    vessel: 'MV Horizon',
    company: 'Kuzey Denizcilik',
    subcontractor: 'Yıldız Marine Servis',
    location: 'Tuzla / İstanbul',
    amount: '₺82.500',
    duration: '5 Gün',
    submittedAt: '18 Mart 2026',
    status: 'Yeni Teklif',
    statusStyle: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
    note: 'Makine dairesi genel bakım, ekipman kontrolü ve test süreçleri dahil teklif sunulmuştur.',
  },
  {
    id: 2,
    jobTitle: 'Güverte Kumlama ve Boya',
    vessel: 'MV Atlas',
    company: 'Marmara Lojistik',
    subcontractor: 'Deniz Boya Teknoloji',
    location: 'Ambarlı / İstanbul',
    amount: '₺128.000',
    duration: '7 Gün',
    submittedAt: '17 Mart 2026',
    status: 'İnceleniyor',
    statusStyle: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
    note: 'İş planı, malzeme kapsamı ve sertifikalı ekip bilgileri teklif detayına eklenmiştir.',
  },
  {
    id: 3,
    jobTitle: 'Elektrik Tesisat Kontrolü',
    vessel: 'MV Delta',
    company: 'Delta Marine',
    subcontractor: 'Akdeniz Teknik',
    location: 'Yalova',
    amount: '₺69.500',
    duration: '3 Gün',
    submittedAt: '16 Mart 2026',
    status: 'Kısa Liste',
    statusStyle: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300',
    note: 'Arıza tespiti, pano kontrolleri ve test raporları teklif kapsamına dahildir.',
  },
];

const AgentOfferView: React.FC = () => {
  const navigate = useNavigate();
  const [selectedOffer, setSelectedOffer] = useState<(typeof incomingOffers)[number] | null>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Tüm Durumlar');
  const [locationFilter, setLocationFilter] = useState('Tüm Lokasyonlar');

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [isEvaluateModalOpen, setIsEvaluateModalOpen] = useState(false);

  // --- SADECE BU STATI VE EFFECT'İ EKLEDİK ---
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const statsRes = await agencyService.getDashboardStats();
        // Sude'nin Swagger verisine (data.activeListings) tam uyum:
        if (statsRes && statsRes.data) {
          setStats(statsRes.data);
        }
      } catch (error) {
        console.error('İstatistik yükleme hatası:', error);
      }
    };
    fetchDashboardData();
  }, []);
  // ------------------------------------------

  const filteredOffers = useMemo(() => {
    return incomingOffers.filter((offer) => {
      const matchesSearch =
        offer.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        offer.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        offer.subcontractor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        offer.vessel.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = statusFilter === 'Tüm Durumlar' || offer.status === statusFilter;
      const matchesLocation = locationFilter === 'Tüm Lokasyonlar' || offer.location.toLowerCase().includes(locationFilter.toLowerCase());

      return matchesSearch && matchesStatus && matchesLocation;
    });
  }, [searchTerm, statusFilter, locationFilter]);

  const closeModals = () => {
    setIsFilterModalOpen(false);
    setIsCompareModalOpen(false);
    setIsEvaluateModalOpen(false);
  };

  const openEvaluateModal = (offer: (typeof incomingOffers)[number]) => {
    setSelectedOffer(offer);
    setIsCompareModalOpen(false);
    setIsEvaluateModalOpen(true);
  };

  return (
    <DashboardLayout role="agent">
      {/* HEADER BÖLÜMÜ */}
      <div className="mb-8 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <button
              onClick={() => navigate('/dashboard/agent')}
              className="inline-flex items-center gap-1 text-sm font-semibold text-slate-500 hover:text-primary transition-colors"
            >
              <span className="material-icons-round text-[18px]">arrow_back</span>
              Geri Dön
            </button>
          </div>

          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
            Gelen Teklifler
          </h2>
          <p className="text-slate-500 dark:text-slate-400">
            Taşeronlardan gelen teklifleri inceleyin, karşılaştırın ve uygun adayı değerlendirin.
          </p>
        </div>

        <button
          onClick={() => setIsCompareModalOpen(true)}
          className="bg-primary hover:bg-primary/90 text-white font-bold py-2.5 px-6 rounded-xl transition-all shadow-md shadow-primary/20 flex items-center justify-center gap-2"
        >
          <span className="material-icons-round text-sm">tune</span>
          Teklifleri Karşılaştır
        </button>
      </div>

      {/* İSTATİSTİK KARTLARI (Sude'nin backend isimleri yerleştirildi) */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50">
          <div className="p-3 w-fit bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-xl mb-4">
            <span className="material-icons-round">receipt_long</span>
          </div>
          <h3 className="text-slate-500 dark:text-slate-400 text-sm font-semibold mb-1">
            Toplam İlan
          </h3>
          <p className="text-3xl font-extrabold text-slate-800 dark:text-white">
            {stats?.activeListings ?? 0}
          </p>
          <p className="mt-3 text-sm text-blue-500 font-semibold">Aktif ilan sayısı</p>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50">
          <div className="p-3 w-fit bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 rounded-xl mb-4">
            <span className="material-icons-round">hourglass_top</span>
          </div>
          <h3 className="text-slate-500 dark:text-slate-400 text-sm font-semibold mb-1">
            Toplam Teklif
          </h3>
          <p className="text-3xl font-extrabold text-slate-800 dark:text-white">
            {stats?.totalOffers ?? 0}
          </p>
          <p className="mt-3 text-sm text-amber-500 font-semibold">Karar bekleyen teklifler</p>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50">
          <div className="p-3 w-fit bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-xl mb-4">
            <span className="material-icons-round">verified</span>
          </div>
          <h3 className="text-slate-500 dark:text-slate-400 text-sm font-semibold mb-1">
            Tamamlanan İş
          </h3>
          <p className="text-3xl font-extrabold text-slate-800 dark:text-white">
            {stats?.completedJobs ?? 0}
          </p>
          <p className="mt-3 text-sm text-emerald-500 font-semibold">Ön elemeden geçenler</p>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50">
          <div className="p-3 w-fit bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-xl mb-4">
            <span className="material-icons-round">payments</span>
          </div>
          <h3 className="text-slate-500 dark:text-slate-400 text-sm font-semibold mb-1">
            Toplam Harcama
          </h3>
          <p className="text-3xl font-extrabold text-slate-800 dark:text-white">
            ₺{stats?.totalSpent?.toLocaleString('tr-TR') ?? 0}
          </p>
          <p className="mt-3 text-sm text-indigo-500 font-semibold">Aktif ilanlar ortalaması</p>
        </div>
      </div>

      {/* FİLTRELEME ALANI (Olduğu gibi korundu) */}
      <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/50 rounded-2xl p-5 md:p-6 shadow-sm mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
              İlan / Gemi / Firma
            </label>
            <div className="relative">
              <span className="material-icons-round absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">
                search
              </span>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Örn. Ana Makine Bakımı"
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
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all">
                <option>Tüm Durumlar</option>
                <option>Yeni Teklif</option>
                <option>İnceleniyor</option>
                <option>Kısa Liste</option>
                <option>Onaylandı</option>
              </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
              Lokasyon
            </label>
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all">
                <option>Tüm Lokasyonlar</option>
                <option>Tuzla</option>
                <option>Yalova</option>
                <option>Ambarlı</option>
              </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={() => setIsFilterModalOpen(true)}
              className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 px-5 rounded-xl transition-all shadow-md shadow-primary/20 flex items-center justify-center gap-2"
            >
              <span className="material-icons-round text-sm">filter_alt</span>
              Filtrele
            </button>
          </div>
        </div>
      </div>

      {/* TEKLİF LİSTESİ */}
      <div className="mb-5">
        <h3 className="text-lg font-bold text-slate-800 dark:text-white">Teklif Listesi</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Taşeronlardan gelen teklifler aşağıda listelenmektedir.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        {filteredOffers.map((offer) => (
          <div
            key={offer.id}
            className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 md:p-6 shadow-sm hover:border-primary/40 hover:shadow-md transition-all"
          >
            <div className="flex items-start justify-between gap-3 mb-4">
              <div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                  {offer.jobTitle}
                </h4>
                <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                  <span className="material-icons-round text-[16px] text-primary">directions_boat</span>
                  {offer.vessel}
                </div>
              </div>

              <span className={`text-[11px] font-bold px-2.5 py-1 rounded-md whitespace-nowrap ${offer.statusStyle}`}>
                {offer.status}
              </span>
            </div>

            <div className="mb-4 space-y-1">
              <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                <span className="material-icons-round text-[16px] text-primary">apartment</span>
                {offer.company}
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                <span className="material-icons-round text-[16px] text-primary">engineering</span>
                {offer.subcontractor}
              </div>
            </div>

            <p className="text-sm leading-6 text-slate-500 dark:text-slate-400 mb-5">
              {offer.note}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
              <div className="rounded-xl bg-slate-50 dark:bg-slate-900/40 px-4 py-3 border border-slate-100 dark:border-slate-700/60">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">Lokasyon</p>
                <p className="text-sm font-bold text-slate-700 dark:text-slate-200">{offer.location}</p>
              </div>

              <div className="rounded-xl bg-slate-50 dark:bg-slate-900/40 px-4 py-3 border border-slate-100 dark:border-slate-700/60">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">Teklif</p>
                <p className="text-sm font-bold text-slate-700 dark:text-slate-200">{offer.amount}</p>
              </div>

              <div className="rounded-xl bg-slate-50 dark:bg-slate-900/40 px-4 py-3 border border-slate-100 dark:border-slate-700/60">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">Süre</p>
                <p className="text-sm font-bold text-slate-700 dark:text-slate-200">{offer.duration}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <button
                onClick={() => navigate(`/dashboard/agent/offers/${offer.id}`)}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-semibold hover:border-primary/40 hover:text-primary transition-all">
                <span className="material-icons-round text-[18px]">visibility</span>
                Teklif Detayı
              </button>

              <button
                onClick={() => openEvaluateModal(offer)}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white font-bold shadow-md shadow-primary/20 hover:bg-primary/90 transition-all">
                <span className="material-icons-round text-[18px]">check_circle</span>
                Değerlendir
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* TÜM MODALLAR (500 Satıra tamamlayan o dev bloklar buraya geldi) */}
      {isFilterModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 backdrop-blur-[2px] px-4">
          <div className="w-full max-w-xl bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-700 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 dark:border-slate-700">
              <div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-white">Filtre Özeti</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  Uygulanan filtre kriterlerini görüntüleyin
                </p>
              </div>
              <button
                onClick={closeModals}
                className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all"
              >
                <span className="material-icons-round">close</span>
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="rounded-xl bg-slate-50 dark:bg-slate-900/40 px-4 py-4 border border-slate-100 dark:border-slate-700/60">
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Arama</p>
                <p className="font-bold text-slate-800 dark:text-white">{searchTerm || 'Boş'}</p>
              </div>

              <div className="rounded-xl bg-slate-50 dark:bg-slate-900/40 px-4 py-4 border border-slate-100 dark:border-slate-700/60">
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Durum</p>
                <p className="font-bold text-slate-800 dark:text-white">{statusFilter}</p>
              </div>

              <div className="rounded-xl bg-slate-50 dark:bg-slate-900/40 px-4 py-4 border border-slate-100 dark:border-slate-700/60">
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Lokasyon</p>
                <p className="font-bold text-slate-800 dark:text-white">{locationFilter}</p>
              </div>

              <div className="flex flex-col sm:flex-row justify-end gap-3 pt-2">
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setStatusFilter('Tüm Durumlar');
                    setLocationFilter('Tüm Lokasyonlar');
                    closeModals();
                  }}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-semibold hover:border-primary/40 hover:text-primary transition-all"
                >
                  Filtreleri Temizle
                </button>

                <button
                  onClick={closeModals}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-primary text-white font-bold shadow-md shadow-primary/20 hover:bg-primary/90 transition-all"
                >
                  Tamam
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isCompareModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 backdrop-blur-[2px] px-4">
          <div className="w-full max-w-4xl bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-700 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 dark:border-slate-700">
              <div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-white">Teklif Karşılaştırma</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  En güncel teklifleri hızlıca kıyaslayın
                </p>
              </div>
              <button
                onClick={closeModals}
                className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all"
              >
                <span className="material-icons-round">close</span>
              </button>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              {filteredOffers.slice(0, 3).map((offer) => (
                <div
                  key={offer.id}
                  className="rounded-2xl border border-slate-200 dark:border-slate-700 p-5 bg-slate-50 dark:bg-slate-900/30"
                >
                  <h4 className="font-bold text-slate-900 dark:text-white mb-2">{offer.subcontractor}</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">{offer.jobTitle}</p>

                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-slate-400 uppercase font-semibold">Teklif</p>
                      <p className="font-bold text-slate-800 dark:text-white">{offer.amount}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 uppercase font-semibold">Süre</p>
                      <p className="font-bold text-slate-800 dark:text-white">{offer.duration}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 uppercase font-semibold">Durum</p>
                      <span className={`text-[11px] font-bold px-2.5 py-1 rounded-md ${offer.statusStyle}`}>
                        {offer.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="px-6 pb-6 flex justify-end">
              <button
                onClick={closeModals}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-primary text-white font-bold shadow-md shadow-primary/20 hover:bg-primary/90 transition-all"
              >
                Kapat
              </button>
            </div>
          </div>
        </div>
      )}

      {isEvaluateModalOpen && selectedOffer && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 backdrop-blur-[2px] px-4">
          <div className="w-full max-w-2xl bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-700 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 dark:border-slate-700">
              <div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-white">Teklifi Değerlendir</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  {selectedOffer.subcontractor} tarafından gönderilen teklif için karar verin
                </p>
              </div>
              <button
                onClick={closeModals}
                className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all"
              >
                <span className="material-icons-round">close</span>
              </button>
            </div>

            <div className="p-6 space-y-5">
              <div className="rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-700/60 p-4">
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Seçilen Teklif</p>
                <p className="font-bold text-slate-800 dark:text-white">{selectedOffer.jobTitle}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  {selectedOffer.subcontractor} • {selectedOffer.amount}
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
                  Karar
                </label>
                <select className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all">
                  <option>İncelemeye Al</option>
                  <option>Kısa Listeye Ekle</option>
                  <option>Onayla</option>
                  <option>Reddet</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
                  İç Not
                </label>
                <textarea
                  rows={5}
                  placeholder="Bu teklif için kısa bir iç değerlendirme notu ekleyin..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40 text-slate-800 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none"
                />
              </div>

              <div className="flex flex-col sm:flex-row justify-end gap-3 pt-2">
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
                  Kararı Kaydet
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  ); 
};

export default AgentOfferView;