import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const AgentAssignedJobDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // State'ler
  const [isRequestingReport, setIsRequestingReport] = useState(false);
  const [reportRequested, setReportRequested] = useState(false);

  // Chat State'leri
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, text: 'Merhaba, işlemler planlandığı gibi gidiyor mu?', sender: 'me', time: '10:30' },
    { id: 2, text: 'Evet, sabah saatlerinde başladık. Şu an için bir sorun yok.', sender: 'subcontractor', time: '10:35' },
    { id: 3, text: 'Harika, kolay gelsin. Ekstra parça ihtiyacı olursa haber verin.', sender: 'me', time: '10:36' }
  ]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isChatOpen) {
      setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    }
  }, [isChatOpen, messages]);

  const handleSendChatMessage = () => {
    if (!chatMessage.trim()) return;
    setMessages(prev => [...prev, { 
      id: Date.now(), 
      text: chatMessage, 
      sender: 'me', 
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    }]);
    setChatMessage('');
    
    // Taşeron cevabını simüle et
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        id: Date.now(), 
        text: 'Mesajınızı aldık, yetkiliye iletiyorum.', 
        sender: 'subcontractor', 
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
      }]);
    }, 1500);
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
            onClick={() => setIsChatOpen(true)}
            className="flex items-center gap-2 px-4 py-2 border rounded-xl font-bold shadow-sm transition-all text-sm bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50"
          >
            <span className="material-icons-round text-[18px]">chat</span>
            Mesaj Gönder
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

      {/* Chat Slide-Over */}
      <AnimatePresence>
        {isChatOpen && (
          <div className="fixed inset-0 z-[100] flex justify-end">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsChatOpen(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full max-w-sm sm:max-w-md bg-slate-50 dark:bg-slate-900 h-full shadow-2xl flex flex-col border-l border-slate-200 dark:border-slate-800"
            >
              {/* Chat Header */}
              <div className="p-4 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between shadow-sm z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold shadow-inner">
                    {job.subcontractorInitials}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 dark:text-white leading-none mb-1">{job.subcontractor}</h3>
                    <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Çevrimiçi
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setIsChatOpen(false)} 
                  className="w-8 h-8 flex items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600 transition-colors"
                >
                  <span className="material-icons-round text-[18px]">close</span>
                </button>
              </div>

              {/* Chat Messages Array */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] dark:bg-none bg-slate-50 dark:bg-slate-900/50">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex flex-col ${msg.sender === 'me' ? 'items-end' : 'items-start'}`}>
                    <div className={`max-w-[85%] p-3 rounded-2xl text-[13px] sm:text-sm font-medium leading-relaxed shadow-sm ${
                      msg.sender === 'me' 
                        ? 'bg-primary text-white rounded-br-none shadow-primary/20' 
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-100 dark:border-slate-700 rounded-bl-none'
                    }`}>
                      {msg.text}
                    </div>
                    <span className="text-[10px] text-slate-400 font-bold mt-1 px-1 tracking-wide">{msg.time}</span>
                  </div>
                ))}
                <div ref={chatEndRef} className="h-1" />
              </div>

              {/* Chat Input Field */}
              <div className="p-4 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 p-2 rounded-2xl transition-all focus-within:border-primary/50 focus-within:shadow-[0_0_0_2px_rgba(59,130,246,0.1)]">
                  <button className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-primary transition-colors shrink-0">
                    <span className="material-icons-round text-[20px]">attach_file</span>
                  </button>
                  <input 
                    type="text"
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendChatMessage()}
                    placeholder="Bir mesaj yazın..."
                    className="flex-1 bg-transparent px-2 py-1.5 outline-none text-sm font-medium text-slate-800 dark:text-white placeholder-slate-400 min-w-0"
                  />
                  <button 
                    onClick={handleSendChatMessage}
                    disabled={!chatMessage.trim()}
                    className="w-9 h-9 flex items-center justify-center rounded-xl bg-primary text-white disabled:opacity-50 disabled:bg-slate-300 dark:disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 transition-all shrink-0"
                  >
                    <span className="material-icons-round text-[18px]">send</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default AgentAssignedJobDetail;
