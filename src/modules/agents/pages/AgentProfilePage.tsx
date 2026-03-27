import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const agentInfo = {
  companyName: 'Portlink Gemi Acentesi',
  bio: 'Karadeniz ve Marmara havzasında 15 yılı aşkın süredir güvenilir ve hızlı acente hizmeti veren öncü firma. Transit geçişler, yükleme, tahliye operasyonlarında 7/24 kesintisiz hizmet sağlıyoruz.',
  logo: 'directions_boat',
  phone: '+90 212 555 12 34',
  email: 'ops@portlinkagency.com'
};

const operationAreas = {
  ports: ['Ambarlı', 'Harem', 'Haydarpaşa', 'Tuzla', 'Yalova'],
  regions: ['Türkiye', 'Marmara Denizi']
};

const serviceScopes = ['Liman İşlemleri', 'Crew (Mürettebat Değişimi)', 'Teknik Koordinasyon', 'Yedek Parça Tedariği'];

const jobHistory = {
  totalJobs: 1345,
  completionRate: '%98'
};

const AgentProfilePage: React.FC = () => {
  const navigate = useNavigate();

  const [info, setInfo] = useState(agentInfo);
  const [opAreas, setOpAreas] = useState({ regions: operationAreas.regions, ports: operationAreas.ports });
  const [scopes, setScopes] = useState(serviceScopes);

  useEffect(() => {
    const saved = localStorage.getItem('agentProfileData');
    if (saved) {
      const data = JSON.parse(saved);
      if (data.info) setInfo({ ...info, ...data.info });
      if (data.regions && data.ports) {
        setOpAreas({ regions: data.regions, ports: data.ports });
      }
      if (data.scopes) setScopes(data.scopes);
    }
  }, []);

  return (
    <div className="w-full space-y-8 animate-in fade-in duration-700">
      {/* Header */}
      <div className="mb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-800 dark:text-white tracking-tight">Kişisel Profil</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium">Firma vitrininizde dış dünyaya açık olan kurumsal profiliniz.</p>
        </div>
        <button 
          onClick={() => navigate('/dashboard/agent/profile-edit')}
          className="bg-primary hover:bg-primary/90 text-white font-bold py-3 px-6 rounded-xl shadow-md shadow-primary/20 flex items-center gap-2 transition-all w-fit"
        >
          <span className="material-icons-round text-sm">edit</span>
          Profili Düzenle
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sol Kolon - Firma Temel Bilgisi ve Rozetler */}
        <div className="lg:col-span-1 space-y-8">
          {/* Firma Kimliği Kartı */}
          <div className="bg-white dark:bg-slate-800 p-8 rounded-[40px] shadow-sm border border-slate-100 dark:border-slate-700/50 flex flex-col items-center text-center relative overflow-hidden">
            <div className="w-32 h-32 rounded-[24px] bg-primary/10 text-primary flex items-center justify-center mb-6 shadow-inner ring-4 ring-white dark:ring-slate-800">
              <span className="material-icons-round text-6xl">{info.logo}</span>
            </div>
            
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">{info.companyName}</h3>
            <span className="bg-blue-100 text-blue-700 font-bold px-4 py-1.5 rounded-full text-[10px] uppercase tracking-widest mb-6">Acente (Agent)</span>
            
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-medium mb-6">
              {info.bio}
            </p>

            <div className="w-full pt-6 border-t border-slate-100 dark:border-slate-700/50 space-y-3">
              <div className="flex items-center gap-3 text-sm font-semibold text-slate-600 dark:text-slate-300">
                <span className="material-icons-round text-slate-400">phone</span>
                {info.phone}
              </div>
              <div className="flex items-center gap-3 text-sm font-semibold text-slate-600 dark:text-slate-300">
                <span className="material-icons-round text-slate-400">email</span>
                {info.email}
              </div>
            </div>
          </div>

          {/* Güven Rozetleri */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-900 p-8 rounded-[40px] shadow-xl shadow-blue-900/20 relative overflow-hidden border border-blue-500/30">
            <h4 className="text-sm font-bold text-blue-200 uppercase tracking-widest mb-6 font-mono">Güven Rozetleri</h4>
            <div className="space-y-4 relative z-10">
              <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
                <span className="material-icons-round text-emerald-400 text-2xl">verified</span>
                <span className="font-bold text-white text-sm">Onaylı Acente (Verified)</span>
              </div>
              <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
                <span className="material-icons-round text-blue-400 text-2xl">description</span>
                <span className="font-bold text-white text-sm">Resmi Belgeler Tam</span>
              </div>
              <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
                <span className="material-icons-round text-amber-400 text-2xl">stars</span>
                <span className="font-bold text-white text-sm">Premium Kullanıcı</span>
              </div>
            </div>
            <span className="material-icons-round absolute -right-6 -bottom-6 text-[160px] text-white/5">workspace_premium</span>
          </div>
        </div>

        {/* Sağ Kolon - Detaylar */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* İstatistikler */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700/50">
              <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 rounded-xl flex items-center justify-center mb-4">
                <span className="material-icons-round">work_history</span>
              </div>
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-1">Toplam İş Sayısı</p>
              <h3 className="text-3xl font-black text-slate-800 dark:text-white tracking-tighter">{jobHistory.totalJobs}</h3>
            </div>
            <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700/50">
              <div className="w-10 h-10 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 rounded-xl flex items-center justify-center mb-4">
                <span className="material-icons-round">trending_up</span>
              </div>
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-1">Tamamlanan İşler</p>
              <h3 className="text-3xl font-black text-slate-800 dark:text-white tracking-tighter">{jobHistory.completionRate}</h3>
            </div>
            <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700/50 flex flex-col justify-between">
              <div className="flex items-center gap-1 mb-2 text-amber-400">
                <span className="material-icons-round">star</span>
                <span className="material-icons-round">star</span>
                <span className="material-icons-round">star</span>
                <span className="material-icons-round">star</span>
                <span className="material-icons-round">star_half</span>
              </div>
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-1">Ortalama Puan</p>
              <h3 className="text-3xl font-black text-slate-800 dark:text-white tracking-tighter">4.8 <span className="text-base text-slate-400 font-medium">/ 5.0</span></h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Operasyon Alanı */}
            <div className="bg-white dark:bg-slate-800 p-8 rounded-[32px] shadow-sm border border-slate-100 dark:border-slate-700/50">
              <h4 className="text-lg font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
                <span className="material-icons-round text-primary">public</span>
                Operasyon Alanı
              </h4>
              <div className="space-y-6">
                <div>
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Bölgeler</p>
                  <div className="flex flex-wrap gap-2">
                    {opAreas.regions.map(r => (
                      <span key={r} className="px-3 py-1.5 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-700 rounded-lg text-sm font-bold text-slate-700 dark:text-slate-300">{r}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Limanlar</p>
                  <div className="flex flex-wrap gap-2">
                    {opAreas.ports.map(p => (
                      <span key={p} className="px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-lg text-sm font-bold">{p}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Hizmet Kapsamı */}
            <div className="bg-white dark:bg-slate-800 p-8 rounded-[32px] shadow-sm border border-slate-100 dark:border-slate-700/50">
              <h4 className="text-lg font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
                <span className="material-icons-round text-primary">engineering</span>
                Hizmet Kapsamı
              </h4>
              <ul className="space-y-3">
                {scopes.map(scope => (
                  <li key={scope} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-900/50">
                    <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                      <span className="material-icons-round text-sm">check</span>
                    </span>
                    <span className="font-semibold text-slate-700 dark:text-slate-200 text-sm">{scope}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Son Yorumlar */}
          <div className="bg-white dark:bg-slate-800 p-8 rounded-[32px] shadow-sm border border-slate-100 dark:border-slate-700/50">
            <h4 className="text-lg font-bold text-slate-800 dark:text-white mb-6">Son Yorumlar</h4>
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/50 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold">M</div>
                    <span className="font-bold text-slate-800 dark:text-white">Mehmet Kaptan</span>
                  </div>
                  <div className="flex text-amber-400 text-sm"><span className="material-icons-round">star</span><span className="material-icons-round">star</span><span className="material-icons-round">star</span><span className="material-icons-round">star</span><span className="material-icons-round">star</span></div>
                </div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400 pl-11">"Ambarlı limanındaki tüm operasyonlarımızı kusursuz yönettiler. Kesinlikle tavsiye ederim. Her zaman hızlı ve güvenilir bir acente."</p>
              </div>
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/50 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">C</div>
                    <span className="font-bold text-slate-800 dark:text-white">Cemil Armatör</span>
                  </div>
                  <div className="flex text-amber-400 text-sm"><span className="material-icons-round">star</span><span className="material-icons-round">star</span><span className="material-icons-round">star</span><span className="material-icons-round">star</span><span className="material-icons-round">star_half</span></div>
                </div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400 pl-11">"Evrak işleri dahil her şeyi özenle hallettiler. Sadece bir kez zamanlama ile ilgili küçük bir sorun yaşadık ancak telafi edildi."</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AgentProfilePage;
