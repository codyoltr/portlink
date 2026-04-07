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
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-700/50">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-[2rem] bg-primary/10 text-primary flex items-center justify-center shadow-inner ring-4 ring-slate-50 dark:ring-slate-900/20">
            <span className="material-icons-round text-5xl">{info.logo}</span>
          </div>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">{info.companyName}</h2>
              <span className="bg-blue-100 text-blue-700 font-bold px-3 py-1 rounded-full text-[10px] uppercase tracking-widest">Kurumsal Acente</span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 font-medium flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="material-icons-round text-amber-400 text-[18px]">star</span>
                4.8 / 5.0 (Ortalama Puan)
              </span>
              <span className="w-1 h-1 rounded-full bg-slate-300" />
              <span>{info.email}</span>
            </p>
          </div>
        </div>
        <button 
          onClick={() => navigate('/dashboard/agent/profile-edit')}
          className="bg-primary hover:bg-primary/90 text-white font-bold py-4 px-8 rounded-2xl shadow-xl shadow-primary/20 flex items-center gap-2 transition-all hover:-translate-y-1 active:scale-95"
        >
          <span className="material-icons-round text-[20px]">edit</span>
          Profili Düzenle
        </button>
      </div>

      <div className="space-y-6 pb-12">
        
        {/* 1. HAKKINDA / BIO */}
        <div className="bg-white dark:bg-slate-800 p-10 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-700/50">
          <h4 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
            <span className="material-icons-round text-primary">info</span>
            Firma Hakkında
          </h4>
          <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
            {info.bio}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 pt-8 border-t border-slate-100 dark:border-slate-700/50">
            <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-900/40 rounded-2xl">
              <div className="p-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm text-primary">
                <span className="material-icons-round">phone</span>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Telefon</p>
                <p className="font-bold text-slate-800 dark:text-white">{info.phone}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-900/40 rounded-2xl">
              <div className="p-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm text-primary">
                <span className="material-icons-round">alternate_email</span>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">E-posta</p>
                <p className="font-bold text-slate-800 dark:text-white">{info.email}</p>
              </div>
            </div>
          </div>
        </div>

        {/* 2. İSTATİSTİKLER */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-800 p-8 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-700/50 flex flex-col justify-center text-center">
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-2">Toplam İş</p>
            <h3 className="text-4xl font-black text-slate-800 dark:text-white tracking-tighter">{jobHistory.totalJobs}</h3>
          </div>
          <div className="bg-white dark:bg-slate-800 p-8 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-700/50 flex flex-col justify-center text-center">
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-2">Tamamlama</p>
            <h3 className="text-4xl font-black text-emerald-600 dark:text-emerald-400 tracking-tighter">{jobHistory.completionRate}</h3>
          </div>
          <div className="bg-white dark:bg-slate-800 p-8 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-700/50 flex flex-col justify-center text-center">
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-2">Puan</p>
            <h3 className="text-4xl font-black text-amber-500 tracking-tighter">4.8 <span className="text-base text-slate-400 font-medium font-sans">/ 5.0</span></h3>
          </div>
        </div>

        {/* 3. OPERASYON ALANI */}
        <div className="bg-white dark:bg-slate-800 p-10 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-700/50">
          <h4 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
            <span className="material-icons-round text-primary">public</span>
            Operasyon Alanı & Limanlar
          </h4>
          <div className="space-y-8">
            <div>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Hizmet Bölgeleri</p>
              <div className="flex flex-wrap gap-3">
                {opAreas.regions.map(r => (
                  <span key={r} className="px-6 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-700 rounded-2xl text-sm font-bold text-slate-700 dark:text-slate-200">
                    {r}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Limanlar</p>
              <div className="flex flex-wrap gap-3">
                {opAreas.ports.map(p => (
                  <span key={p} className="px-6 py-3 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-2xl text-sm font-bold border border-blue-100 dark:border-blue-800/50">
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 4. HİZMET KAPSAMI */}
        <div className="bg-white dark:bg-slate-800 p-10 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-700/50">
          <h4 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
            <span className="material-icons-round text-emerald-500">engineering</span>
            Hizmet Kapsamı
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {scopes.map(scope => (
              <div key={scope} className="flex items-center gap-4 p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-700/60 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 flex items-center justify-center text-primary shadow-sm">
                  <span className="material-icons-round">check_circle</span>
                </div>
                <span className="font-bold text-slate-700 dark:text-slate-200">{scope}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 5. GÜVEN ROZETLERİ */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-900 p-10 rounded-[2.5rem] shadow-xl shadow-blue-900/20 relative overflow-hidden border border-blue-500/30">
          <h4 className="text-sm font-bold text-blue-200 uppercase tracking-widest mb-8 font-mono">Güven Rozetleri</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            <div className="flex items-center gap-4 bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
              <span className="material-icons-round text-emerald-400 text-3xl">verified</span>
              <span className="font-bold text-white text-base">Onaylı Acente</span>
            </div>
            <div className="flex items-center gap-4 bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
              <span className="material-icons-round text-blue-300 text-3xl">description</span>
              <span className="font-bold text-white text-base">Belgeleri Tam</span>
            </div>
            <div className="flex items-center gap-4 bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm">
              <span className="material-icons-round text-amber-400 text-3xl">stars</span>
              <span className="font-bold text-white text-base">Premium İş ortağı</span>
            </div>
          </div>
          <span className="material-icons-round absolute -right-6 -bottom-6 text-[200px] text-white/5">workspace_premium</span>
        </div>

      </div>
    </div>
  );
};

export default AgentProfilePage;
