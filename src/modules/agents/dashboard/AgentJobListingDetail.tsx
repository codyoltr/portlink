import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const AgentJobListingDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleGiveOffer = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

  const job = {
    id: id || 'fake-2',
    title: 'Ana Makine Rodaj ve Overhaul İşlemleri',
    category: 'Teknik & Tamir Hizmetleri',
    startDate: '10 Mart 2026',
    endDate: '20 Mart 2026',
    location: 'Pendik Tersanesi, İstanbul',
    price: '₺125,000',
    description: 'Motor sökümü, parça kontrolü ve yeniden montaj işlemleri.',
    details: [
      'Gemiye erişim sağlanacak',
      'Parça değişimi yapılacak',
      'Test ve kontrol süreci uygulanacak'
    ],
    // Yeni eklenen acente ve dosya verileri
    agency: {
      name: 'Global Maritime Agency',
      initials: 'GM',
      rating: '4.9 / 5.0',
      totalJobs: '124 Yayınlanan İş',
      isVerified: true
    },
    files: [
      { name: 'Teknik_Sartname.pdf', size: '1.2 MB', date: '25 Mart 2026', type: 'pdf' },
      { name: 'Makine_Dairesi_Plani.jpg', size: '4.5 MB', date: '26 Mart 2026', type: 'image' }
    ]
  };

  return (
    <div className="flex flex-col gap-6 animate-fade-in pb-8">
      {/* Üst Kısım */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/dashboard/agent/job-list')}
            className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-all shadow-sm shrink-0"
          >
            <span className="material-icons-round">arrow_back</span>
          </button>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white">{job.title}</h2>
              <span className="px-3 py-1 bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400 rounded-full text-xs font-bold border border-amber-200 dark:border-amber-500/30">
                Teklif Bekliyor
              </span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm flex items-center gap-4">
              <span className="flex items-center gap-1"><span className="material-icons-round text-[16px]">category</span>{job.category}</span>
              <span className="flex items-center gap-1"><span className="material-icons-round text-[16px]">location_on</span>{job.location}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="px-4 py-2 text-slate-600 dark:text-slate-400 font-bold text-sm hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all">
            Vazgeç
          </button>
          <button
            onClick={handleGiveOffer}
            disabled={isSubmitting || submitted}
            className={`flex items-center gap-2 px-8 py-2.5 rounded-xl font-bold shadow-lg shadow-primary/20 transition-all text-sm ${submitted ? 'bg-emerald-500 text-white' : 'bg-primary hover:bg-primary/90 text-white'
              }`}
          >
            {isSubmitting ? <span className="material-icons-round text-[18px] animate-spin">autorenew</span> : submitted ? <span className="material-icons-round text-[18px]">check</span> : <span className="material-icons-round text-[18px]">send</span>}
            {isSubmitting ? 'İşleniyor...' : submitted ? 'Teklif Verildi' : 'Teklif Ver'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sol Kolon */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
              <span className="material-icons-round text-primary bg-primary/10 p-1.5 rounded-lg text-[20px]">description</span>
              İş Açıklaması
            </h3>
            <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed">{job.description}</p>
          </div>

          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
              <span className="material-icons-round text-slate-500 bg-slate-100 dark:bg-slate-700 p-1.5 rounded-lg text-[20px]">list</span>
              Detaylar
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {job.details.map((detail, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-700/50">
                  <span className="material-icons-round text-emerald-500 text-[20px]">check_circle</span>
                  <span className="text-slate-700 dark:text-slate-300 font-medium">{detail}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sağ Kolon */}
        <div className="flex flex-col gap-6">
          {/* Acente Bilgi Kartı (1. Görseldeki Stil) */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">İşi Yayınlayan Acente</h3>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center text-blue-600 font-bold text-xl border border-blue-200 dark:border-blue-500/30 shrink-0">
                {job.agency.initials}
              </div>
              <div className="overflow-hidden">
                <h4 className="text-lg font-bold text-slate-800 dark:text-white truncate">{job.agency.name}</h4>
                {job.agency.isVerified && (
                  <div className="flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400 mt-0.5">
                    <span className="material-icons-round text-[14px]">verified</span> Onaylı Acente
                  </div>
                )}
              </div>
            </div>
            <div className="space-y-3 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-700/50 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-slate-500 flex items-center gap-1.5"><span className="material-icons-round text-[16px]">star</span> Puan</span>
                <span className="font-bold text-slate-800 dark:text-white">{job.agency.rating}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500 flex items-center gap-1.5"><span className="material-icons-round text-[16px]">history</span> İş Geçmişi</span>
                <span className="font-bold text-slate-800 dark:text-white">{job.agency.totalJobs}</span>
              </div>
            </div>
          </div>

          {/* İş Özeti Kartı */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50">
            <div className="p-4 bg-emerald-50 dark:bg-emerald-500/10 rounded-2xl border border-emerald-100 dark:border-emerald-500/20 text-center mb-4">
              <span className="text-xs font-bold text-emerald-600 uppercase block mb-1">Tahmini Bütçe</span>
              <span className="text-3xl font-black text-emerald-700 dark:text-emerald-300">{job.price}</span>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-slate-500">Başlangıç</span><span className="font-bold dark:text-white">{job.startDate}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Bitiş</span><span className="font-bold dark:text-white">{job.endDate}</span></div>
            </div>
          </div>

          {/* İlgili Dosyalar Kartı (1. Görseldeki Stil) */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">İlgili Dosyalar</h3>
            <div className="space-y-3">
              {job.files.map((file, idx) => (
                <a key={idx} href="#" className="flex items-start gap-3 p-3 rounded-xl border border-slate-100 dark:border-slate-700/50 hover:border-primary/50 hover:bg-primary/5 transition-all group">
                  <div className={`p-2 rounded-lg transition-colors ${file.type === 'pdf' ? 'bg-red-50 text-red-500' : 'bg-blue-50 text-blue-500'}`}>
                    <span className="material-icons-round text-[20px]">{file.type === 'pdf' ? 'picture_as_pdf' : 'image'}</span>
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <h4 className="text-sm font-bold text-slate-800 dark:text-white truncate">{file.name}</h4>
                    <p className="text-xs text-slate-500">{file.size} • {file.date}</p>
                  </div>
                  <span className="material-icons-round text-slate-400 group-hover:text-primary transition-colors">download</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentJobListingDetail;