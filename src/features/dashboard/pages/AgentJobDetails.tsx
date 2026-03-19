import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const AgentJobDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/dashboard/agent/jobs')}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-primary/10 hover:text-primary transition-colors"
          >
            <span className="material-icons-round">arrow_back</span>
          </button>
          <div>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">İlan Detayı #{id?.padStart(4, '0') || '0101'}</h2>
            <p className="text-slate-500 dark:text-slate-400">İlanınızla ilgili tüm detaylar ve gelen teklifleri inceleyin.</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-rose-50 text-rose-600 hover:bg-rose-100 dark:bg-rose-500/10 dark:text-rose-400 dark:hover:bg-rose-500/20 px-5 py-2.5 rounded-xl font-bold transition-all whitespace-nowrap">
            <span className="material-icons-round text-[20px]">delete_outline</span>
            İlanı Kaldır
          </button>
          <button className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-sm hover:shadow-md whitespace-nowrap">
            <span className="material-icons-round text-[20px]">edit</span>
            Düzenle
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Details */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50 overflow-hidden">
            <div className="p-6 border-b border-slate-100 dark:border-slate-700/50 flex justify-between items-center">
              <h3 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
                 <span className="material-icons-round text-primary">info</span>
                 Genel Bilgiler
              </h3>
              <span className="flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400 rounded-full text-xs font-bold border border-emerald-200 dark:border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Yayında
              </span>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-5">
                 <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">İş Başlığı</h4>
                    <p className="text-slate-800 dark:text-white font-semibold">Ana Makine Rodaj ve Overhaul İşlemleri</p>
                 </div>
                 <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Gemi Adı</h4>
                    <p className="text-slate-800 dark:text-white font-semibold flex items-center gap-2">
                       <span className="material-icons-round text-slate-400 text-[18px]">directions_boat</span>
                       M/V Ocean Explorer
                    </p>
                 </div>
              </div>
              <div className="space-y-5">
                 <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Konum</h4>
                    <p className="text-slate-800 dark:text-white font-semibold flex items-center gap-2">
                       <span className="material-icons-round text-slate-400 text-[18px]">location_on</span>
                       Pendik Tersanesi, İstanbul
                    </p>
                 </div>
                 <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Yayın Tarihi</h4>
                    <p className="text-slate-800 dark:text-white font-semibold flex items-center gap-2">
                       <span className="material-icons-round text-slate-400 text-[18px]">calendar_today</span>
                       14 Mart 2026
                    </p>
                 </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50 overflow-hidden">
             <div className="p-6 border-b border-slate-100 dark:border-slate-700/50">
               <h3 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
                 <span className="material-icons-round text-primary">description</span>
                 Teknik Şartname ve Açıklama
               </h3>
             </div>
             <div className="p-6">
               <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6">
                  Tersanede bakımda olan gemimizin ana makinesi için 5000 saatlik rodaj bakımı ve parça değişimi yapılacaktır. Orijinal üretici yönergelerine göre turboşarjer bakımı, enjektör testi, soğutma suyu pompalarının onarımı gerekmektedir. Yalnızca yetkili servis sertifikasına sahip firmaların teklif vermesi zorunludur. İş teslim süresi maksimum 5 iş günüdür.
               </p>
               
               <div className="flex flex-wrap gap-3">
                  <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-600 dark:text-slate-300">
                     <span className="material-icons-round text-rose-500">picture_as_pdf</span>
                     <span className="font-medium">teknik_sartname.pdf</span>
                     <span className="text-slate-400 text-xs">(2.4 MB)</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-600 dark:text-slate-300">
                     <span className="material-icons-round text-blue-500">image</span>
                     <span className="font-medium">makine_durumu.jpg</span>
                     <span className="text-slate-400 text-xs">(1.1 MB)</span>
                  </div>
               </div>
             </div>
          </div>
        </div>

        {/* Right Column - Offers */}
        <div className="flex flex-col gap-6">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50 overflow-hidden">
            <div className="p-6 border-b border-slate-100 dark:border-slate-700/50 flex justify-between items-center">
              <h3 className="text-lg font-bold text-slate-800 dark:text-white">Gelen Teklifler</h3>
              <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-1 rounded-md">5 Teklif</span>
            </div>
            <div className="p-0">
               {[
                 { id: 1, name: 'Port Teknik Ltd.', price: '45.000', success: '%98', avatar: 12 },
                 { id: 2, name: 'Marine Destek A.Ş.', price: '48.500', success: '%95', avatar: 15 },
                 { id: 3, name: 'Kuzey Yıldızı Tersanecilik', price: '42.000', success: '%90', avatar: 18 }
               ].map((offer) => (
               <div key={offer.id} className="p-5 border-b border-slate-100 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-700/20 transition-colors cursor-pointer group">
                  <div className="flex justify-between items-start mb-2">
                     <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-slate-100 dark:border-slate-600 shadow-sm">
                           <img src={`https://i.pravatar.cc/150?img=${offer.avatar}`} alt="Company" className="w-full h-full object-cover"/>
                        </div>
                        <div>
                           <h4 className="text-sm font-bold text-slate-800 dark:text-white group-hover:text-primary transition-colors">{offer.name}</h4>
                           <div className="flex items-center text-[11px] text-emerald-500 font-bold gap-1 mt-0.5">
                              <span className="material-icons-round text-[12px]">verified</span> {offer.success} Başarı Oranı
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="flex justify-between items-end mt-4">
                     <div>
                        <span className="text-xs text-slate-500 dark:text-slate-400 font-medium tracking-wide">TEKLİF TUTARI</span>
                        <p className="text-lg font-extrabold text-slate-800 dark:text-white">₺{offer.price}</p>
                     </div>
                     <button className="text-xs font-bold bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-primary hover:text-white dark:hover:bg-primary px-4 py-2 rounded-lg transition-all shadow-sm">
                        Değerlendir
                     </button>
                  </div>
               </div>
               ))}
            </div>
            <div className="p-4 text-center bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-700/50">
               <button className="text-sm font-bold text-primary hover:text-primary/80 transition-colors">Tüm Teklifleri Görüntüle</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentJobDetails;
