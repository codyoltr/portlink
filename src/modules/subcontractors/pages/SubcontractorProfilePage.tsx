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
    <div className="w-full space-y-8 animate-in fade-in duration-700">
      {/* Header */}
      <div className="mb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-800 dark:text-white tracking-tight">Kişisel Profil (Dış Görünüm)</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium">Bu sayfa, diğer firmaların ve acentelerin sizin profilinizi nasıl gördüğünü temsil eder.</p>
        </div>
        <button 
          onClick={() => navigate('/dashboard/subcontractor/profile-edit')}
          className="bg-primary hover:bg-primary/90 text-white font-bold py-3 px-6 rounded-xl shadow-md shadow-primary/20 flex items-center gap-2 transition-all w-fit"
        >
          <span className="material-icons-round text-sm">edit</span>
          Profili Düzenle
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Sol Kolon - Temel Bilgi ve Puan */}
        <div className="lg:col-span-1 space-y-8">
          
          {/* Firma Kimliği Kartı */}
          <div className="bg-white dark:bg-slate-800 p-8 rounded-[40px] shadow-sm border border-slate-100 dark:border-slate-700/50 flex flex-col items-center text-center relative overflow-hidden">
            <div className="w-32 h-32 rounded-[24px] bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 flex items-center justify-center mb-6 shadow-inner ring-4 ring-white dark:ring-slate-800">
              <span className="material-icons-round text-6xl">{info.logo}</span>
            </div>
            
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2">{info.companyName}</h3>
            <span className="bg-emerald-100 text-emerald-800 font-bold px-4 py-1.5 rounded-full text-[10px] uppercase tracking-widest mb-6">Taşeron (Subcontractor)</span>
            
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

          {/* Hizmet Puanı Kartı */}
          <div className="bg-gradient-to-br from-emerald-600 to-emerald-900 p-8 rounded-[40px] shadow-xl shadow-emerald-900/20 relative overflow-hidden text-center flex flex-col items-center border border-emerald-500/30">
            <h4 className="text-sm font-bold text-emerald-200 uppercase tracking-widest mb-6 font-mono w-full text-left">Hizmet Puanı</h4>
            <div className="flex items-center gap-1 text-amber-400 text-3xl mb-4 relative z-10">
              <span className="material-icons-round">star</span>
              <span className="material-icons-round">star</span>
              <span className="material-icons-round">star</span>
              <span className="material-icons-round">star</span>
              <span className="material-icons-round">star_half</span>
            </div>
            <div className="relative z-10">
              <h3 className="text-6xl font-black text-white tracking-tighter">
                {info.score}
              </h3>
              <p className="text-slate-400 text-sm font-medium mt-2">{info.reviewsCount} Değerlendirme</p>
            </div>
            <span className="material-icons-round absolute -right-6 -bottom-6 text-[160px] text-white/5">stars</span>
          </div>

        </div>

        {/* Sağ Kolon - Detaylar (İstenen 7 Kategori) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* 1. Hizmet Kategorileri & 2. Uzmanlık Alanları */}
          <div className="bg-white dark:bg-slate-800 p-8 rounded-[32px] shadow-sm border border-slate-100 dark:border-slate-700/50">
            <h4 className="text-lg font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
              <span className="material-icons-round text-emerald-500">category</span>
              Hizmet & Uzmanlık Kapsamı
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Hizmet Kategorileri</p>
                <div className="flex flex-col gap-2">
                  {serviceCategories.map(cat => (
                    <div key={cat} className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{cat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Uzmanlık Alanları</p>
                <div className="flex flex-col gap-2">
                  {expAreas.map(exp => (
                    <div key={exp} className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                      <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{exp}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 3. Hizmet Verdiği Limanlar & 4. Ekip Büyüklüğü */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Limanlar */}
            <div className="bg-white dark:bg-slate-800 p-8 rounded-[32px] shadow-sm border border-slate-100 dark:border-slate-700/50">
              <h4 className="text-lg font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
                <span className="material-icons-round text-blue-500">location_on</span>
                Hizmet Verdiği Limanlar
              </h4>
              <div className="flex flex-wrap gap-2">
                {regions.map(region => (
                  <span key={region} className="px-3 py-1.5 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-700 rounded-lg text-sm font-bold text-slate-700 dark:text-slate-300">
                    {region}
                  </span>
                ))}
              </div>
            </div>

            {/* Ekip Büyüklüğü */}
            <div className="bg-white dark:bg-slate-800 p-8 rounded-[32px] shadow-sm border border-slate-100 dark:border-slate-700/50">
              <h4 className="text-lg font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
                <span className="material-icons-round text-amber-500">groups</span>
                Ekip Büyüklüğü
              </h4>
              
              <div className="flex items-center justify-between mb-4 border-b border-slate-100 dark:border-slate-700/50 pb-4">
                <span className="text-sm font-black text-slate-400 uppercase tracking-widest">Toplam Personel</span>
                <span className="text-3xl font-black text-slate-800 dark:text-white">{totalTeamSize}</span>
              </div>
              
              <div className="space-y-2">
                {team.map(b => (
                  <div key={b.title} className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-slate-600 dark:text-slate-400">{b.title}</span>
                    <span className="font-bold text-slate-800 dark:text-white">{b.count} Kişi</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* 5. Sertifikalar & 6. Referanslar */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Sertifikalar */}
            <div className="bg-white dark:bg-slate-800 p-8 rounded-[32px] shadow-sm border border-slate-100 dark:border-slate-700/50">
              <h4 className="text-lg font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
                <span className="material-icons-round text-emerald-500">workspace_premium</span>
                Sertifikalar
              </h4>
              <ul className="space-y-3">
                {certificates.map(cert => (
                  <li key={cert} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-900/50">
                    <span className="material-icons-round text-emerald-500 text-lg">verified</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-200 text-sm leading-tight">{cert}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Referanslar */}
            <div className="bg-white dark:bg-slate-800 p-8 rounded-[32px] shadow-sm border border-slate-100 dark:border-slate-700/50">
              <h4 className="text-lg font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
                <span className="material-icons-round text-indigo-500">handshake</span>
                Referanslar
              </h4>
              <div className="space-y-3">
                {refs.map(ref => (
                  <div key={ref.name} className="flex items-center justify-between p-3 rounded-xl border border-slate-100 dark:border-slate-700/50">
                    <span className="font-bold text-slate-800 dark:text-white text-sm">{ref.name}</span>
                    <span className="text-[10px] font-black uppercase text-slate-400 bg-slate-50 dark:bg-slate-900 px-2 py-1 rounded-md">{ref.year}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default SubcontractorProfilePage;
