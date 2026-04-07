import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

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

const AgentOfferDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const offer = incomingOffers.find(o => o.id === Number(id));

  if (!offer) {
    return (
      <div className="p-8 text-center text-slate-500">
        Teklif bulunamadı.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/dashboard/agent/offers')}
            className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-primary transition-all"
          >
            <span className="material-icons-round">arrow_back</span>
          </button>
          <div>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Teklif Detayı</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Gelen teklifin tüm ayrıntıları</p>
          </div>
        </div>
        <span className={`px-4 py-1.5 rounded-full text-xs font-bold ${offer.statusStyle}`}>
          {offer.status}
        </span>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700/50 overflow-hidden shadow-sm">
        <div className="p-8 border-b border-slate-50 dark:border-slate-700/50">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-3xl font-black text-slate-800 dark:text-white mb-2">{offer.jobTitle}</h3>
              <div className="flex items-center gap-4 text-slate-500 dark:text-slate-400 font-medium">
                <span className="flex items-center gap-1"><span className="material-icons-round text-primary text-lg">directions_boat</span> {offer.vessel}</span>
                <span className="flex items-center gap-1"><span className="material-icons-round text-primary text-lg">apartment</span> {offer.company}</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Teklif Tarihi</p>
              <p className="font-bold text-slate-800 dark:text-white">{offer.submittedAt}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-50 dark:bg-slate-900/40 p-4 rounded-2xl border border-slate-100 dark:border-slate-700/50">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Teklif Tutarı</p>
              <p className="text-2xl font-black text-primary">{offer.amount}</p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-900/40 p-4 rounded-2xl border border-slate-100 dark:border-slate-700/50">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Teslim Süresi</p>
              <p className="text-2xl font-black text-slate-800 dark:text-white">{offer.duration}</p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-900/40 p-4 rounded-2xl border border-slate-100 dark:border-slate-700/50">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Lokasyon</p>
              <p className="text-2xl font-black text-slate-800 dark:text-white">{offer.location}</p>
            </div>
          </div>
        </div>

        <div className="p-8 space-y-8">
          <div>
            <h4 className="text-lg font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
              <span className="material-icons-round text-primary">engineering</span>
              Taşeron Bilgisi
            </h4>
            <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-900/40 p-4 rounded-2xl border border-slate-100 dark:border-slate-700/50">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center font-bold text-xl uppercase">
                {offer.subcontractor.charAt(0)}
              </div>
              <div>
                <p className="font-bold text-slate-800 dark:text-white">{offer.subcontractor}</p>
                <p className="text-xs text-slate-500">Sertifikalı Hizmet Sağlayıcı</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
              <span className="material-icons-round text-primary">description</span>
              Teklif Notu
            </h4>
            <div className="bg-slate-50 dark:bg-slate-900/40 p-6 rounded-2xl border border-slate-100 dark:border-slate-700/50">
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed italic">
                "{offer.note}"
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              onClick={() => navigate('/dashboard/agent/offers')}
              className="px-8 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 transition-all"
            >
              Vazgeç
            </button>
            <button
              className="px-8 py-3 rounded-2xl bg-primary text-white font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-all"
            >
              Teklifi Onayla
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentOfferDetail;
