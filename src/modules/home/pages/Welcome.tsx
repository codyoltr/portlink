import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useNavigate } from 'react-router-dom';
import FullPageLayout from '@/features/shell/components/FullPageLayout';
import heroImage from '@/assets/hero-image.png';
import StatsSection from './StatsSection';
import MapSection from './MapSection';

// --- DUYURULAR ---
const announcements = [
  { id: 1, date: 'Bugün', title: 'İstanbul - Yalova Hattı Kapasitesi Artırıldı!', type: 'Operasyon', icon: 'speed' },
  { id: 2, date: 'Dün', title: 'Ambarlı Limanı Yeni Acente Kayıtları Başladı', type: 'Sistem', icon: 'domain' },
  { id: 3, date: '15 Mart', title: 'Yalova Tersaneler Bölgesi Özel Entegrasyonu', type: 'Duyuru', icon: 'anchor' },
];

const Welcome: React.FC = () => {
  const navigate = useNavigate();
  const [showRoleBar, setShowRoleBar] = useState(true);

  return (
    <FullPageLayout>
      {/* --- ÜST ROL SEÇİM ÇUBUĞU --- */}
      {showRoleBar && (
        <section className="w-full bg-amber-50/60 border-b border-amber-100 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <button
              onClick={() => setShowRoleBar(false)}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-lg text-amber-600 hover:bg-amber-200/50 transition"
            >
              <span className="material-icons-round text-[18px]">close</span>
            </button>
            <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-amber-200/60 font-medium">
              <div 
                onClick={() => navigate('/signup/agent')} 
                className="flex-1 flex items-center justify-between px-6 py-5 cursor-pointer hover:bg-amber-100/70 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                    <span className="material-icons-round text-lg">business</span>
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-sm">Portlink Acentesi Ol</div>
                    <div className="text-xs text-slate-600">Hizmet ver & iş al</div>
                  </div>
                </div>
                <span className="material-icons-round text-amber-500 group-hover:translate-x-1 transition">arrow_forward</span>
              </div>
              <div 
                onClick={() => navigate('/signup/subcontractor')} 
                className="flex-1 flex items-center justify-between px-6 py-5 cursor-pointer hover:bg-amber-100/70 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                    <span className="material-icons-round text-lg">engineering</span>
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-sm">Portlink Taşeronu Ol</div>
                    <div className="text-xs text-slate-600">İş bul & teklif ver</div>
                  </div>
                </div>
                <span className="material-icons-round text-amber-500 group-hover:translate-x-1 transition">arrow_forward</span>
              </div>
            </div>
          </div>
        </section>
      )}
     
      <Navbar />
      <main className="flex-1 w-full bg-slate-50 text-slate-800">
       
        {/* --- HERO SECTION --- */}
        <section className="relative overflow-hidden w-full bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative z-10">
            <div className="grid xl:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <h1 className="text-5xl lg:text-[4.5rem] font-black text-slate-900 leading-[1] tracking-tighter">
                  Denizcilik Ağı İçin <br />
                  <span className="bg-gradient-to-r from-blue-700 to-sky-500 bg-clip-text text-transparent">Doğru Bağlantı</span>
                </h1>
               
                <div className="flex flex-row items-center gap-4 pt-6 overflow-x-auto sm:overflow-visible">
                  <button 
                    onClick={() => navigate('/login')} 
                    className="flex-1 sm:flex-none px-10 py-5 bg-blue-600 text-white rounded-2xl font-black text-sm hover:bg-blue-700 transition shadow-lg"
                  >
                    İş Bul
                  </button>
                  <button 
                    onClick={() => navigate('/login')} 
                    className="flex-1 sm:flex-none px-10 py-5 bg-white text-slate-900 border-2 border-slate-200 rounded-2xl font-black text-sm hover:bg-slate-50 transition"
                  >
                    Taşeron Arıyorum
                  </button>
                  <button 
                    onClick={() => navigate('/login')} 
                    className="flex-1 sm:flex-none px-10 py-5 bg-white text-blue-700 border-2 border-blue-600 rounded-2xl font-black text-sm hover:bg-blue-50 transition"
                  >
                    İş Ortaklığı Arıyorum
                  </button>
                </div>
              </div>
              <div className="hidden xl:block">
                <img src={heroImage} alt="Hero" className="rounded-[3rem] shadow-xl" />
              </div>
            </div>
          </div>
        </section>

        {/* --- DUYURULAR --- */}
        <section className="w-full py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <h3 className="text-3xl font-black text-slate-900 mb-12 text-center tracking-tight uppercase">Duyurular & Sektörel Haberler</h3>
            <div className="grid md:grid-cols-3 gap-10">
               {announcements.map((ann) => (
                 <div key={ann.id} className="group p-10 bg-slate-50 rounded-[3rem] border border-slate-100 hover:bg-white hover:shadow-xl transition-all cursor-pointer">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-blue-600 shadow-sm mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all">
                        <span className="material-icons-round text-2xl">{ann.icon}</span>
                    </div>
                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{ann.type}</span>
                    <h4 className="text-xl font-bold text-slate-900 mt-2 mb-4 leading-tight group-hover:text-blue-600 transition-colors">{ann.title}</h4>
                    <p className="text-slate-500 text-sm mt-auto font-medium">Güncel veriler ve operasyonel detaylar için tıklayın.</p>
                 </div>
               ))}
            </div>
          </div>
        </section>

        <MapSection />
        <StatsSection />
      </main>
      <Footer />
    </FullPageLayout>
  );
};

export default Welcome;   