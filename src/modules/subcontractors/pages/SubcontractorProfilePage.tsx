import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const subcontractorInfo = {
  companyName: 'Eren Marine Services',
  bio: 'Gemi bakım, onarım ve teknik operasyon alanlarında hizmet veren yetkin taşeron ekip. Mekanik bakım, montaj ve saha koordinasyonu alanlarında 7+ yıllık denizcilik sektörü tecrübesiyle aktif hizmet sunuyoruz.',
  logo: 'engineering',
  phone: '+90 555 222 11 00',
  email: 'info@erenmarine.com',
  score: 4.7,
  reviewsCount: 128
};

const serviceCategories = ['Mekanik Bakım', 'Boru ve Kaynak İşleri', 'Elektrik Sistemleri', 'Çelik İşleme'];
const expertiseAreas = ['Ana Makine Bakımı', 'Güverte Kumlama ve Boyama', 'Boru Hattı Yenileme', 'Otomasyon Arıza Tespiti'];
const serviceRegions = ['Tuzla', 'Pendik', 'Yalova', 'Ambarlı', 'Gebze'];

const certificates = [
  'ISO 9001 Kalite Yönetim Sistemi',
  'İş Sağlığı ve Güvenliği Sertifikası (OHSAS)',
  'Kaynak Operatörlüğü Yetki Belgesi',
  'Yüksekte Çalışma Sertifikaları'
];

const references = [
  { name: 'Akdeniz Gemi İşletmeciliği', year: '2026' },
  { name: 'Yıldız Tersanesi A.Ş', year: '2025' },
  { name: 'Deniz Yıldızı Lojistik', year: '2025' },
  { name: 'Kuzey Marine & Shipping', year: '2024' }
];

const defaultTeamStructure = [
  { title: 'Makine Teknikeri', count: 6, id: 1, icon: 'badge' },
  { title: 'Kaynak / Montaj Uzmanı', count: 5, id: 2, icon: 'badge' },
  { title: 'Elektrik Personeli', count: 3, id: 3, icon: 'badge' },
  { title: 'Saha Mühendisi / Sorumlusu', count: 2, id: 4, icon: 'badge' },
  { title: 'Destek Personeli', count: 2, id: 5, icon: 'badge' }
];

const SubcontractorProfilePage: React.FC = () => {
  const navigate = useNavigate();

  const [info, setInfo] = useState(subcontractorInfo);
  const [expAreas, setExpAreas] = useState(expertiseAreas);
  const [regions, setRegions] = useState(serviceRegions);
  const [refs, setRefs] = useState(references);
  const [team, setTeam] = useState(defaultTeamStructure);

  useEffect(() => {
    const saved = localStorage.getItem('subcontractorProfileData');
    if (saved) {
      const data = JSON.parse(saved);
      if (data.info) setInfo(data.info);
      if (data.expertiseAreas) setExpAreas(data.expertiseAreas);
      if (data.serviceRegions) setRegions(data.serviceRegions);
      if (data.team) setTeam(data.team);
      if (data.references) setRefs(data.references);
    }
  }, []);

  const totalTeamSize = team.reduce((acc, curr) => acc + curr.count, 0);

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-700/50">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-[2rem] bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 flex items-center justify-center shadow-inner ring-4 ring-slate-50 dark:ring-slate-900/20">
            <span className="material-icons-round text-5xl">{info.logo}</span>
          </div>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">{info.companyName}</h2>
              <span className="bg-emerald-100 text-emerald-800 font-bold px-3 py-1 rounded-full text-[10px] uppercase tracking-widest">Onaylı Taşeron</span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 font-medium flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="material-icons-round text-amber-400 text-[18px]">star</span>
                {info.score} ({info.reviewsCount} Değerlendirme)
              </span>
              <span className="w-1 h-1 rounded-full bg-slate-300" />
              <span>{info.email}</span>
            </p>
          </div>
        </div>
        <button 
          onClick={() => navigate('/dashboard/subcontractor/profile-edit')}
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

        {/* 2. HİZMET & UZMANLIK */}
        <div className="bg-white dark:bg-slate-800 p-10 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-700/50">
          <h4 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
            <span className="material-icons-round text-emerald-500">military_tech</span>
            Hizmet & Uzmanlık Kapsamı
          </h4>
          <div className="space-y-10">
            <div>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">Hizmet Kategorileri</p>
              <div className="flex flex-wrap gap-3">
                {serviceCategories.map(cat => (
                  <span key={cat} className="px-6 py-3 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 rounded-2xl font-bold text-sm border border-emerald-100 dark:border-emerald-800/50">
                    {cat}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">Uzmanlık Alanları</p>
              <div className="flex flex-wrap gap-3">
                {expAreas.map(exp => (
                  <span key={exp} className="px-6 py-3 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-2xl font-bold text-sm border border-blue-100 dark:border-blue-800/50">
                    {exp}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 3. LİMANLAR */}
        <div className="bg-white dark:bg-slate-800 p-10 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-700/50">
          <h4 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
            <span className="material-icons-round text-blue-500">anchor</span>
            Hizmet Verdiği Limanlar
          </h4>
          <div className="flex flex-wrap gap-4">
            {regions.map(region => (
              <div key={region} className="flex items-center gap-3 px-6 py-4 bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-700/60 rounded-[1.5rem] group hover:border-primary/40 transition-colors">
                <span className="material-icons-round text-primary/40 group-hover:text-primary transition-colors">location_on</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{region}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 4. EKİP YAPISI */}
        <div className="bg-white dark:bg-slate-800 p-10 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-700/50">
          <div className="flex items-center justify-between mb-8">
            <h4 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
              <span className="material-icons-round text-amber-500">groups</span>
              Ekip Yapısı & Kapasite
            </h4>
            <div className="px-4 py-2 bg-slate-100 dark:bg-slate-900 rounded-xl font-black text-slate-800 dark:text-white">
              TOPLAM: {totalTeamSize} KİŞİ
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {team.map(b => (
              <div key={b.title} className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{b.title}</p>
                  <p className="text-xl font-black text-slate-800 dark:text-white">{b.count} Personel</p>
                </div>
                <div className="p-3 bg-white dark:bg-slate-800 rounded-xl shadow-sm text-amber-500">
                  <span className="material-icons-round">engineering</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 5. SERTİFİKALAR */}
        <div className="bg-white dark:bg-slate-800 p-10 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-700/50">
          <h4 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
            <span className="material-icons-round text-emerald-500">workspace_premium</span>
            Sertifikalar & Yetkinlikler
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {certificates.map(cert => (
              <div key={cert} className="flex items-center gap-4 p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-700/60 group hover:bg-emerald-50/50 dark:hover:bg-emerald-900/10 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-white dark:bg-slate-800 flex items-center justify-center text-emerald-500 shadow-sm group-hover:scale-110 transition-transform">
                  <span className="material-icons-round">verified</span>
                </div>
                <span className="font-bold text-slate-700 dark:text-slate-200">{cert}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 6. REFERANSLAR */}
        <div className="bg-white dark:bg-slate-800 p-10 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-700/50">
          <h4 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
            <span className="material-icons-round text-indigo-500">business</span>
            Referanslar
          </h4>
          <div className="space-y-4">
            {refs.map(ref => (
              <div key={ref.name} className="flex items-center justify-between p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-700/60 group hover:border-indigo-400 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                    <span className="material-icons-round text-sm">home_work</span>
                  </div>
                  <span className="font-black text-slate-800 dark:text-white text-lg">{ref.name}</span>
                </div>
                <div className="px-4 py-2 bg-white dark:bg-slate-800 rounded-xl shadow-sm text-sm font-black text-slate-400 tracking-widest">
                  {ref.year}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default SubcontractorProfilePage;
