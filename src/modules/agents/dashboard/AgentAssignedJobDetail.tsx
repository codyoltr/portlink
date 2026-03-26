import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const AgentAssignedJobDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // State'ler
  const [isSendingMessage, setIsSendingMessage] = useState(false);
  const [messageSent, setMessageSent] = useState(false);
  
  const [isRequestingReport, setIsRequestingReport] = useState(false);
  const [reportRequested, setReportRequested] = useState(false);

  const handleSendMessage = () => {
    setIsSendingMessage(true);
    setTimeout(() => {
      setIsSendingMessage(false);
      setMessageSent(true);
      setTimeout(() => setMessageSent(false), 3000); // 3 saniye sonra normale döner
    }, 1000);
  };

  const handleRequestReport = () => {
    setIsRequestingReport(true);
    setTimeout(() => {
      setIsRequestingReport(false);
      setReportRequested(true);
      setTimeout(() => setReportRequested(false), 3000); // 3 saniye sonra normale döner
    }, 1000);
  };

  // Sabit veri, gerçek senaryoda API'den id'ye göre çekilecek
  const job = {
    id: id,
    title: 'Ana Makine Rodaj ve Overhaul İşlemleri',
    shipName: 'M/V Ocean Explorer',
    subcontractor: 'Port Teknik A.Ş.',
    subcontractorInitials: 'PT',
    progress: 65,
    status: 'in_progress',
    startDate: '10 Mart 2026',
    dueDate: '20 Mart 2026',
    description: 'Geminin ana makinesinin detaylı bakımı, rodaj işlemleri ve aşınan parçaların değişimi. Tüm süreç uluslararası denizcilik standartlarına uygun olarak gerçekleştirilmektedir.',
    price: '₺125,000',
    location: 'Pendik Tersanesi, İstanbul'
  };

  return (
    <div className="flex flex-col gap-6 animate-fade-in pb-8">
      {/* Üst Kısım - Geri Dönüş ve Başlık */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-all shadow-sm shrink-0"
          >
            <span className="material-icons-round">arrow_back</span>
          </button>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white">{job.title}</h2>
              <span className="flex items-center gap-1.5 px-3 py-1 bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400 rounded-full text-xs font-bold border border-blue-200 dark:border-blue-500/30">
                <span className="material-icons-round text-[14px]">autorenew</span>
                Devam Ediyor
              </span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm flex items-center gap-4">
              <span className="flex items-center gap-1"><span className="material-icons-round text-[16px]">tag</span>İş ID: #{job.id}</span>
              <span className="flex items-center gap-1"><span className="material-icons-round text-[16px]">location_on</span>{job.location}</span>
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Mesaj Gönder Butonu */}
          <button 
            onClick={handleSendMessage}
            disabled={isSendingMessage || messageSent}
            className={`flex items-center gap-2 px-4 py-2 border rounded-xl font-bold shadow-sm transition-all text-sm ${
              messageSent 
                ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800'
                : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50'
            }`}
          >
            {isSendingMessage ? (
              <span className="material-icons-round text-[18px] animate-spin">autorenew</span>
            ) : messageSent ? (
              <span className="material-icons-round text-[18px]">check_circle</span>
            ) : (
              <span className="material-icons-round text-[18px]">chat</span>
            )}
            {isSendingMessage ? 'Gönderiliyor...' : messageSent ? 'Mesaj İletildi' : 'Mesaj Gönder'}
          </button>

          {/* Rapor İste Butonu */}
          <button 
            onClick={handleRequestReport}
            disabled={isRequestingReport || reportRequested}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold shadow-sm transition-all text-sm ${
              reportRequested 
                ? 'bg-emerald-500 hover:bg-emerald-600 text-white'
                : 'bg-primary hover:bg-primary/90 text-white'
            }`}
          >
            {isRequestingReport ? (
              <span className="material-icons-round text-[18px] animate-spin">autorenew</span>
            ) : reportRequested ? (
              <span className="material-icons-round text-[18px]">done_all</span>
            ) : (
              <span className="material-icons-round text-[18px]">summarize</span>
            )}
            {isRequestingReport ? 'İsteniyor...' : reportRequested ? 'Rapor İstenildi' : 'Rapor İste'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sol Kolon - İş Özeti ve İlerleme */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          {/* İlerleme Durumu Modülü */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50 space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
                <span className="material-icons-round text-primary bg-primary/10 p-1.5 rounded-lg text-[20px]">show_chart</span>
                Genel İlerleme
              </h3>
              <span className="text-2xl font-black text-slate-800 dark:text-white">{job.progress}%</span>
            </div>
            
            <div className="w-full h-4 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-500 rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
                style={{ width: `${job.progress}%` }}
              >
                <div className="absolute inset-0 bg-white/20 animate-[shimmer_2s_infinite]"></div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-100 dark:border-slate-700/50 mt-4">
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-400 mb-1">Gemi Adı</span>
                <span className="text-sm font-semibold text-slate-800 dark:text-white flex items-center gap-1.5"><span className="material-icons-round text-[16px] text-slate-400">directions_boat</span> {job.shipName}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-400 mb-1">Başlama Tarihi</span>
                <span className="text-sm font-semibold text-slate-800 dark:text-white flex items-center gap-1.5"><span className="material-icons-round text-[16px] text-slate-400">today</span> {job.startDate}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-400 mb-1">Hedeflenen Bitiş</span>
                <span className="text-sm font-semibold text-slate-800 dark:text-white flex items-center gap-1.5"><span className="material-icons-round text-[16px] text-primary">event_busy</span> {job.dueDate}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-400 mb-1">Bütçe</span>
                <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5"><span className="material-icons-round text-[16px]">payments</span> {job.price}</span>
              </div>
            </div>
          </div>

          {/* İş Açıklaması */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
              <span className="material-icons-round text-slate-500 bg-slate-100 dark:bg-slate-700 p-1.5 rounded-lg text-[20px]">description</span>
              İş Açıklaması
            </h3>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
              {job.description}
            </p>
          </div>

          {/* Aşama Logları */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
              <span className="material-icons-round text-slate-500 bg-slate-100 dark:bg-slate-700 p-1.5 rounded-lg text-[20px]">history</span>
              Süreç Logları
            </h3>
            
            <div className="relative border-l border-slate-200 dark:border-slate-700 ml-3 space-y-6 pb-4">
              <div className="relative pl-6">
                <span className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-blue-500 border-4 border-white dark:border-slate-800"></span>
                <p className="text-xs font-bold text-blue-500 mb-1">Bugün, 14:30</p>
                <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-700/50 p-3 rounded-xl inline-block w-full">
                  <h4 className="text-sm font-bold text-slate-800 dark:text-white">Rodaj kontrolleri başladı.</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Ekip şefi tarafından ilk rapor sisteme yüklendi.</p>
                </div>
              </div>

              <div className="relative pl-6">
                <span className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-slate-300 dark:bg-slate-600 border-4 border-white dark:border-slate-800"></span>
                <p className="text-xs font-bold text-slate-500 mb-1">Dün, 09:15</p>
                <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-700/50 p-3 rounded-xl inline-block w-full">
                  <h4 className="text-sm font-bold text-slate-800 dark:text-white">Gemiye intikal edildi.</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Tüm ekip ve ekipmanlar tersaneye giriş yaptı.</p>
                </div>
              </div>

              <div className="relative pl-6">
                <span className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-slate-300 dark:bg-slate-600 border-4 border-white dark:border-slate-800"></span>
                <p className="text-xs font-bold text-slate-500 mb-1">10 Mart 2026, 11:00</p>
                <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-700/50 p-3 rounded-xl inline-block w-full">
                  <h4 className="text-sm font-bold text-slate-800 dark:text-white">İş Planlaması Onaylandı.</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Taraflar arasında sözleşme imzalandı ve iş resmi olarak başlatıldı.</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Sağ Kolon - Taşeron & Dosyalar */}
        <div className="flex flex-col gap-6">
          
          {/* Taşeron Bilgi Kartı */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Atanan Taşeron</h3>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-bold text-xl border border-primary/20 shrink-0">
                {job.subcontractorInitials}
              </div>
              <div className="overflow-hidden">
                <h4 className="text-lg font-bold text-slate-800 dark:text-white truncate">{job.subcontractor}</h4>
                <div className="flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5">
                  <span className="material-icons-round text-[14px]">verified</span>
                  Onaylı Firma
                </div>
              </div>
            </div>

            <div className="space-y-3 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-700/50">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5"><span className="material-icons-round text-[16px]">star</span> Puanı</span>
                <span className="font-bold text-slate-800 dark:text-white">4.8 / 5.0</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5"><span className="material-icons-round text-[16px]">task_alt</span> Tamamlanan</span>
                <span className="font-bold text-slate-800 dark:text-white">42 İş</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5"><span className="material-icons-round text-[16px]">call</span> Telefon</span>
                <span className="font-bold text-slate-800 dark:text-white">+90 532 123 4567</span>
              </div>
            </div>
            
            <button className="w-full mt-4 py-2.5 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-50 dark:hover:bg-slate-600 transition-all text-sm flex items-center justify-center gap-2">
              <span className="material-icons-round text-[18px]">person</span>
              Profili İncele
            </button>
          </div>

          {/* Dosyalar ve Raporlar */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">İlgili Dosyalar</h3>
              <button className="text-primary hover:bg-primary/10 p-1 rounded transition-colors">
                <span className="material-icons-round text-[20px]">add</span>
              </button>
            </div>

            <div className="space-y-3">
              <a href="#" className="flex items-start gap-3 p-3 rounded-xl border border-slate-100 dark:border-slate-700/50 hover:border-primary/50 hover:bg-primary/5 transition-all group">
                <div className="p-2 bg-red-50 dark:bg-red-900/20 text-red-500 rounded-lg group-hover:bg-red-100 transition-colors">
                  <span className="material-icons-round text-[20px]">picture_as_pdf</span>
                </div>
                <div className="flex-1 overflow-hidden">
                  <h4 className="text-sm font-bold text-slate-800 dark:text-white truncate">Sözleşme_Protokolü.pdf</h4>
                  <p className="text-xs text-slate-500">2.4 MB • 10 Mart 2026</p>
                </div>
                <span className="material-icons-round text-slate-400 group-hover:text-primary transition-colors">download</span>
              </a>

              <a href="#" className="flex items-start gap-3 p-3 rounded-xl border border-slate-100 dark:border-slate-700/50 hover:border-primary/50 hover:bg-primary/5 transition-all group">
                <div className="p-2 bg-blue-50 dark:bg-blue-900/20 text-blue-500 rounded-lg group-hover:bg-blue-100 transition-colors">
                  <span className="material-icons-round text-[20px]">image</span>
                </div>
                <div className="flex-1 overflow-hidden">
                  <h4 className="text-sm font-bold text-slate-800 dark:text-white truncate">Ilk_Durum_Fotolari.zip</h4>
                  <p className="text-xs text-slate-500">14.8 MB • 11 Mart 2026</p>
                </div>
                <span className="material-icons-round text-slate-400 group-hover:text-primary transition-colors">download</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AgentAssignedJobDetail;
