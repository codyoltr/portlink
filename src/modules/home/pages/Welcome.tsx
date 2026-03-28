import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useNavigate } from 'react-router-dom';
import FullPageLayout from '@/features/shell/components/FullPageLayout';
import heroImage from '@/assets/hero-image.png';

// --- BÜTÜN VERİ LİSTELERİ ---

const services = [
  { id: 1, title: 'Acentelik', image: '/images/acentelik.jpg' },
  { id: 2, title: 'Teknik Servis', image: '/images/teknik-servis.jpg' },
  { id: 3, title: 'Lojistik', image: '/images/lojistik.jpg' },
  { id: 4, title: 'Danışmanlık', image: '/images/danismanlik.jpg' },
];

const steps = [
  {
    id: 1,
    title: 'İhtiyacını Belirle',
    description: 'Aradığınız hizmeti, lokasyonu ve detayları sisteme girerek hızla talebinizi oluşturun.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    id: 2,
    title: 'Hemen Eşleş',
    description: 'Sistemimiz sizi en uygun, doğrulanmış profesyonel hizmet sağlayıcılarıyla saniyeler içinde eşleştirsin.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    id: 3,
    title: 'Teklifleri Karşılaştır',
    description: 'Farklı sağlayıcılardan gelen teklifleri, referansları ve puanları şeffaf bir şekilde kıyaslayın.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    id: 4,
    title: 'Güvenle Anlaş',
    description: 'En uygun çözüm ortağınızı seçerek projelerinizi global Portlink güvencesiyle başlatın.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  }
];

const features = [
  {
    id: 'guvenilir',
    title: 'Güvenilir Ağ',
    description: 'Sadece doğrulanmış, lisanslı ve sektörde bilinen premium hizmet sağlayıcılarıyla çalışıyoruz.',
    icon: (
      <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
      </svg>
    ),
    bgColor: 'bg-blue-50/80',
    borderColor: 'border-blue-100',
  },
  {
    id: 'global',
    title: 'Global Kapsam',
    description: 'Dünya çapındaki limanlar ve uluslararası sularda denizcilik operasyonlarınızı kesintisiz yürütün.',
    icon: (
      <svg className="w-8 h-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    bgColor: 'bg-indigo-50/80',
    borderColor: 'border-indigo-100',
  },
  {
    id: 'hizli',
    title: 'Hızlı Teklif Sistemi',
    description: 'Zaman kayıplarını minimuma indirin. İhtiyacınıza en hızlı cevap veren tedarikçilerden anında teklif alın.',
    icon: (
      <svg className="w-8 h-8 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    bgColor: 'bg-sky-50/80',
    borderColor: 'border-sky-100',
  },
  {
    id: 'dogrulanmis',
    title: 'Kalite Kontrolü',
    description: 'Hizmet sonrasında detaylı raporlama ve puanlama sistemiyle tüm süreci güvence altına alıyoruz.',
    icon: (
      <svg className="w-8 h-8 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    bgColor: 'bg-cyan-50/80',
    borderColor: 'border-cyan-100',
  }
];

// --- HARİTA NOKTALARI (Kıyı/Deniz Üzerine Taşındı) ---
const mapPoints = [
  { id: 1, name: 'İstanbul (Marmara)', x: '28%', y: '30%', stats: '150+ İşlemi' },
  { id: 2, name: 'İzmir (Ege)', x: '15%', y: '53%', stats: '85+ İşlem' },
  { id: 3, name: 'Mersin (Akdeniz)', x: '55%', y: '78%', stats: '120+ İşlem' },
  { id: 4, name: 'İskenderun (Akdeniz)', x: '62%', y: '80%', stats: '40+ İşlem' },
  { id: 5, name: 'Trabzon (Karadeniz)', x: '75%', y: '18%', stats: '30+ İşlem' },
];

const Welcome: React.FC = () => {
  const navigate = useNavigate();
  const [showRoleBar, setShowRoleBar] = useState(true);
  
  return (
    <FullPageLayout>
{/* --- QUICK ROLE BAR (WARNING STYLE) --- */}
{showRoleBar && (
<section className="w-full bg-amber-50/60 border-b border-amber-100 relative">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <button
      onClick={() => setShowRoleBar(false)}
      className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-lg text-amber-600 hover:bg-amber-200/50 transition"
    >
      <span className="material-icons-round text-[18px]">close</span>
    </button>
    <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-amber-200/60">
      
      {/* ACENTE */}
      <div
        onClick={() => navigate('/signup/agent')}
        className="flex-1 flex items-center justify-between px-6 py-5 cursor-pointer hover:bg-amber-100/70 transition-all group"
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
            <span className="material-icons-round text-lg">business</span>
          </div>

          <div>
            <div className="font-bold text-slate-900 text-sm">
              Portlink Acentesi Ol
            </div>
            <div className="text-xs text-slate-600">
              Hizmet ver & iş al
            </div>
          </div>
        </div>

        <span className="material-icons-round text-amber-500 group-hover:translate-x-1 transition">
          arrow_forward
        </span>
      </div>

      {/* TAŞERON */}
      <div
        onClick={() => navigate('/signup/subcontractor')}
        className="flex-1 flex items-center justify-between px-6 py-5 cursor-pointer hover:bg-amber-100/70 transition-all group"
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
            <span className="material-icons-round text-lg">engineering</span>
          </div>

          <div>
            <div className="font-bold text-slate-900 text-sm">
              Portlink Taşeronu Ol
            </div>
            <div className="text-xs text-slate-600">
              İş bul & teklif ver
            </div>
          </div>
        </div>

        <span className="material-icons-round text-amber-500 group-hover:translate-x-1 transition">
          arrow_forward
        </span>
      </div>

    </div>

  </div>
</section>
)}
      <Navbar />

      {/* Ana İçerik */}
      <main className="flex-1 w-full bg-slate-50 text-slate-800">
        
        {/* --- PREMIUM HERO SECTION --- */}
        <section className="relative overflow-hidden w-full bg-white border-b border-slate-100">
          <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[70%] bg-blue-50/50 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-[-10%] left-[-5%] w-[30%] h-[50%] bg-sky-50/50 rounded-full blur-3xl pointer-events-none"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative z-10">
            <div className="grid xl:grid-cols-2 gap-16 items-center">
              
              <div className="space-y-8 animate-[fade-in-up_1s_ease-out]">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-full text-blue-700 font-bold text-xs tracking-wide uppercase hover:bg-blue-100 transition-colors cursor-default shadow-sm">
                  <span className="material-icons-round text-base text-blue-500 animate-pulse">rocket_launch</span>
                  Liman Operasyonlarının Geleceği
                </div>
                
                <h1 className="text-5xl lg:text-[4rem] font-extrabold text-slate-900 leading-[1.1] tracking-tight">
                  Denizcilik Ağı İçin <br/>
                  <span className="bg-gradient-to-r from-blue-700 via-sky-600 to-blue-500 bg-clip-text text-transparent">Doğru Bağlantı</span>
                </h1>
                
                <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-xl font-medium">
                  Uluslararası standartlarda hizmet arayan gemiler ile güvenilir acente ve taşeronları bir araya getiren yegane premium platform. Ticaretinizi hızlandırın, maliyetinizi optimize edin.
                </p>
                
                {/* 3'LÜ ŞEFFAF BUTON GRUBU */}
                <div className="flex flex-col sm:flex-row flex-wrap gap-5 pt-4">
                  <div className="flex flex-col items-center sm:items-start flex-1 sm:flex-none">
                    <button
                      onClick={() => navigate('/login')}
                      className="group w-full px-6 py-3.5 bg-transparent text-blue-700 border-2 border-blue-600 rounded-2xl font-bold text-[15px] hover:bg-blue-50 transition-all duration-300 shadow-sm transform hover:-translate-y-1 flex items-center justify-center gap-2 whitespace-nowrap"
                    >
                      İş Talebi Aç
                      <span className="material-icons-round text-base group-hover:translate-x-1 transition-transform text-blue-500">add_circle</span>
                    </button>
                    <span className="text-sm text-slate-500 italic mt-2.5 font-medium text-center sm:text-left w-full">"Gemi için hizmet al"</span>
                  </div>

                  <div className="flex flex-col items-center sm:items-start flex-1 sm:flex-none">
                    <button 
                      onClick={() => navigate('/login')}
                      className="group w-full px-6 py-3.5 bg-transparent text-blue-700 border-2 border-blue-600 rounded-2xl font-bold text-[15px] hover:bg-blue-50 transition-all duration-300 shadow-sm transform hover:-translate-y-1 flex items-center justify-center gap-2 whitespace-nowrap"
                    >
                      İş Ortaklığı Ara
                      <span className="material-icons-round text-base group-hover:translate-x-1 transition-transform text-blue-500">handshake</span>
                    </button>
                    <span className="text-sm text-slate-500 italic mt-2.5 font-medium text-center sm:text-left w-full">"Başka acentelerle çalış"</span>
                  </div>

                  <div className="flex flex-col items-center sm:items-start flex-1 sm:flex-none">
                    <button 
                      onClick={() => navigate('/login')}
                      className="group w-full px-6 py-3.5 bg-transparent text-blue-700 border-2 border-blue-600 rounded-2xl font-bold text-[15px] hover:bg-blue-50 transition-all duration-300 shadow-sm transform hover:-translate-y-1 flex items-center justify-center gap-2 whitespace-nowrap"
                    >
                      İş Bul
                      <span className="material-icons-round text-base group-hover:translate-x-1 transition-transform text-blue-500">work</span>
                    </button>
                    <span className="text-sm text-slate-500 italic mt-2.5 font-medium text-center sm:text-left w-full">"İşlere teklif ver"</span>
                  </div>
                </div>
                
                {/* İstatistikler */}
                <div className="flex flex-wrap items-center gap-10 pt-8 mt-10 border-t border-slate-200">
                  <div className="group hover:-translate-y-1 transition-transform">
                    <div className="text-3xl font-black text-slate-900 group-hover:text-blue-600 transition-colors">450+</div>
                    <div className="text-sm text-slate-500 font-semibold tracking-wide uppercase mt-1">Aktif Lİman</div>
                  </div>
                  <div className="w-px h-10 bg-slate-200 hidden sm:block"></div>
                  <div className="group hover:-translate-y-1 transition-transform">
                    <div className="text-3xl font-black text-slate-900 group-hover:text-blue-600 transition-colors">2K+</div>
                    <div className="text-sm text-slate-500 font-semibold tracking-wide uppercase mt-1">Doğrulanmış Üye</div>
                  </div>
                  <div className="w-px h-10 bg-slate-200 hidden sm:block"></div>
                  <div className="group hover:-translate-y-1 transition-transform">
                    <div className="text-3xl font-black text-slate-900 group-hover:text-blue-600 transition-colors">10K+</div>
                    <div className="text-sm text-slate-500 font-semibold tracking-wide uppercase mt-1">Hizmet Kaydı</div>
                  </div>
                </div>
              </div>

              {/* Sağ Görsel Alanı */}
              <div className="relative group perspective-1000 hidden xl:block">
                <div className="relative z-10 bg-white/60 backdrop-blur-md rounded-[2.5rem] p-4 shadow-[0_20px_50px_rgba(15,23,42,0.06)] border border-white/80 transform transition-transform duration-700 group-hover:scale-[1.03]">
                  <div className="aspect-[4/3] rounded-[2rem] relative overflow-hidden bg-slate-100">
                    <img
                      src={heroImage}
                      alt="Denizcilik lojistik operasyonları"
                      className="w-full h-full object-cover transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/10 to-transparent"></div>
                  </div>
                </div>
                <div className="absolute -top-10 -right-10 w-full h-full border-2 border-blue-50 rounded-[3rem] -z-10 transform rotate-3"></div>
                <div className="absolute -bottom-8 -left-8 w-full h-full border-2 border-sky-50 rounded-[3rem] -z-10 transform -rotate-3"></div>
              </div>

            </div>
          </div>
        </section>


        {/* --- YENİ PREMİUM NASIL ÇALIŞIR BÖLÜMÜ --- */}
        <section id="how-it-works" className="w-full py-24 bg-slate-50 border-b border-slate-100 scroll-mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h3 className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/50 text-blue-700 text-xs font-bold uppercase tracking-[0.2em] mb-4">
                <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                Operasyon Akışı
              </h3>
              <h2 className="text-4xl font-extrabold text-slate-900 mb-4">
                Mükemmel Sonuç İçin Dört Adım
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto text-lg">
                Yüzlerce arama ve e-posta trafiğinden kurtulun. Portlink altyapısı sayesinde doğru hizmete ulaşmak tahmin ettiğinizden çok daha kolaydır.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((step) => (
                <div key={step.id} className="group relative bg-white rounded-3xl p-8 border border-slate-200/60 shadow-sm hover:shadow-[0_20px_40px_rgba(15,23,42,0.06)] hover:-translate-y-2 transition-all duration-300 overflow-hidden">
                  <div className="absolute top-0 right-0 p-6 text-7xl font-black text-slate-50 transition-colors duration-500 group-hover:text-blue-50 select-none z-0">
                    {step.id}
                  </div>
                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-8 border border-blue-100 transition-all duration-500 group-hover:bg-blue-600 group-hover:text-white group-hover:shadow-[0_8px_20px_rgba(37,99,235,0.3)]">
                      {step.icon}
                    </div>
                    <h4 className="text-xl font-bold text-slate-900 mb-3">
                      {step.title}
                    </h4>
                    <p className="text-slate-500 leading-relaxed text-sm font-medium">
                      {step.description}
                    </p>
                  </div>
                  <div className="absolute bottom-0 left-0 w-0 h-1.5 bg-gradient-to-r from-blue-500 to-sky-400 transition-all duration-500 group-hover:w-full"></div>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* --- NEDEN PORTLINK? SECTION (BENTOS) --- */}
        <section id="about" className="w-full py-24 bg-white scroll-mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row justify-between items-end mb-16 gap-8">
              <div className="max-w-2xl">
                <h3 className="text-xs font-bold text-blue-600 uppercase tracking-[0.25em] mb-4">
                  Avantajlarımız
                </h3>
                <h2 className="text-4xl font-extrabold text-slate-900">
                  Limanda Gücünüz: <br/>Portlink ile Daima İlerde
                </h2>
              </div>
              <p className="text-lg text-slate-600 max-w-lg font-medium border-l-4 border-blue-500 pl-6">
                Sürekli değişen küresel pazar şartlarında doğru partnerlerle çalışarak maliyetlerinizi düşürün, güvenliği artırın.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className={`lg:col-span-1 lg:row-span-2 group relative rounded-[2.5rem] p-10 flex flex-col justify-between overflow-hidden border transition-all duration-300 min-h-[440px] bg-slate-50 border-slate-200 hover:border-blue-300 hover:shadow-2xl`}>
                <div className="relative z-10">
                  <div className={`w-16 h-16 rounded-[1.25rem] flex items-center justify-center mb-8 ${features[0].bgColor} ${features[0].borderColor} border transition-transform duration-500 group-hover:scale-110 shadow-sm`}>
                    {features[0].icon}
                  </div>
                  <h3 className="text-3xl font-extrabold text-slate-900 mb-4 leading-tight">
                    {features[0].title}
                  </h3>
                  <p className="text-slate-600 text-lg leading-relaxed font-medium">
                    {features[0].description}
                  </p>
                </div>
              </div>

              <div className={`lg:col-span-2 group rounded-[2.5rem] p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center gap-8 border transition-all duration-300 bg-slate-50 border-slate-200 hover:border-indigo-300 hover:shadow-xl`}>
                <div className={`w-20 h-20 rounded-[1.25rem] flex items-center justify-center flex-shrink-0 ${features[1].bgColor} ${features[1].borderColor} border transition-transform duration-500 group-hover:-rotate-6 shadow-sm`}>
                  {features[1].icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">
                    {features[1].title}
                  </h3>
                  <p className="text-slate-600 text-lg font-medium leading-relaxed">
                    {features[1].description}
                  </p>
                </div>
              </div>

              <div className={`lg:col-span-1 group rounded-[2.5rem] p-8 flex flex-col justify-center border transition-all duration-300 min-h-[220px] bg-slate-50 border-slate-200 hover:border-sky-300 hover:shadow-xl`}>
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 ${features[2].bgColor} ${features[2].borderColor} border shadow-sm`}>
                  {features[2].icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {features[2].title}
                </h3>
                <p className="text-slate-600 text-sm font-medium">
                  {features[2].description}
                </p>
              </div>

              <div className={`lg:col-span-1 group rounded-[2.5rem] p-8 flex flex-col justify-center border transition-all duration-300 min-h-[220px] bg-slate-50 border-slate-200 hover:border-cyan-300 hover:shadow-xl`}>
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 ${features[3].bgColor} ${features[3].borderColor} border shadow-sm`}>
                  {features[3].icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {features[3].title}
                </h3>
                <p className="text-slate-600 text-sm font-medium">
                  {features[3].description}
                </p>
              </div>
            </div>
          </div>
        </section>


        {/* --- HİZMET SEÇİMİ KARTLARI --- */}
        <section id="services" className="w-full py-24 bg-slate-50 border-t border-slate-200 scroll-mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h3 className="text-xs font-bold text-blue-600 uppercase tracking-[0.3em] mb-4">
                EKOSİSTEMİMİZ
              </h3>
              <h2 className="text-4xl font-extrabold text-slate-900">
                Liman Hizmetleri Platformu
              </h2>
            </div>
            <div className="flex flex-wrap justify-center gap-6">
              {services.map((service) => (
                <div key={service.id} className="relative group h-[400px] w-full sm:w-[calc(50%-1rem)] lg:w-[calc(25%-1.2rem)] rounded-[2rem] overflow-hidden cursor-pointer shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
                  <div className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110" style={{ backgroundImage: `url(${service.image})` }}></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent transition-opacity duration-500 group-hover:from-blue-900/95"></div>
                  
                  <div className="absolute top-6 left-6 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="material-icons-round text-lg">arrow_outward</span>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col justify-end h-full transform transition-transform duration-500">
                    <h3 className="text-2xl font-bold text-white tracking-wide">
                      {service.title}
                    </h3>
                    <div className="w-0 h-1 bg-blue-400 mt-4 transition-all duration-500 group-hover:w-16 rounded-full"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* --- YENİ BÖLÜM: HARİTA VE İSTATİSTİKLER --- */}
        <section className="w-full py-24 bg-white border-t border-slate-200 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Üst Başlıklar */}
            <div className="text-center mb-16">
              <h2 className="text-4xl font-extrabold text-slate-800 mb-4">
                Denizcilik Operasyonlarında Aktif Ağ
              </h2>
              <p className="text-xl text-slate-600 font-medium">
                Doğru İş, Doğru Ekip, Doğru Limanda
              </p>
            </div>

            {/* İstatistikler */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
              <div className="flex flex-col items-center text-center">
                <span className="text-sm font-bold text-slate-700 mb-3">Açık İş Talepleri</span>
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg">
                  <span className="font-bold">125</span>
                </div>
              </div>
              <div className="flex flex-col items-center text-center">
                <span className="text-sm font-bold text-slate-700 mb-3">Aktif Acenteler</span>
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg">
                  <span className="font-bold">89</span>
                </div>
              </div>
              <div className="flex flex-col items-center text-center">
                <span className="text-sm font-bold text-slate-700 mb-3">Servis Sağlayıcılar</span>
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg">
                  <span className="font-bold">64</span>
                </div>
              </div>
              <div className="flex flex-col items-center text-center">
                <span className="text-sm font-bold text-slate-700 mb-3">Hangi limanlarda aktifiz?</span>
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg">
                  <span className="material-icons-round text-xl">map</span>
                </div>
              </div>
            </div>

            {/* Türkiye Haritası Alanı (ARKA PLAN ŞEFFAF YAPILDI) */}
            <div className="relative max-w-5xl mx-auto bg-transparent p-4 sm:p-8">
              <div className="relative w-full aspect-[2/1] mx-auto">
                <img 
                  src="/world-map.svg" 
                  alt="Türkiye Operasyon Haritası" 
                  className="w-full h-full object-contain opacity-80"
                />
                
                {/* Harita Üzerindeki Noktalar (DENİZE TAŞINDI) */}
                {mapPoints.map((point) => (
                  <div 
                    key={point.id}
                    className="absolute group"
                    style={{ left: point.x, top: point.y }}
                  >
                    {/* Pulsing Dot */}
                    <div className="relative flex items-center justify-center">
                      <div className="absolute w-4 h-4 bg-blue-400 rounded-full animate-ping opacity-75"></div>
                      <div className="relative w-3 h-3 bg-blue-600 rounded-full border border-white shadow-sm cursor-pointer hover:scale-150 transition-transform"></div>
                    </div>
                    
                    {/* Tooltip (Hover olduğunda gözüken kutucuk) */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 hidden group-hover:flex flex-col items-center animate-in fade-in slide-in-from-bottom-2 z-10 w-max">
                      <div className="bg-slate-800 text-white text-xs rounded-lg py-1.5 px-3 shadow-xl text-center">
                        <div className="font-bold">{point.name}</div>
                        <div className="text-slate-300">{point.stats}</div>
                      </div>
                      <div className="w-2 h-2 bg-slate-800 rotate-45 -mt-1"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>


        {/* --- HARİKA PREMIUM ÇAĞRI (Gemi ve Harita) BÖLÜMÜ --- */}
        <section className="w-full py-24 bg-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-slate-900 rounded-[3rem] text-center text-white relative overflow-hidden shadow-[0_20px_50px_rgba(15,23,42,0.2)] border border-slate-800">
              
              {/* Harita Arka Plan (Opak) */}
              <div 
                className="absolute inset-0 opacity-[0.05] pointer-events-none bg-center bg-no-repeat bg-[length:70%] z-0"
                style={{ backgroundImage: "url('/world-map.svg')" }}
              ></div>

              {/* Canlı Mavi Işıklar */}
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 z-0 pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/3 z-0 pointer-events-none"></div>

              <div className="relative z-10 flex flex-col items-center px-6 py-20 lg:py-24">
                <div className="p-4 bg-white/5 backdrop-blur rounded-full border border-white/10 mb-8 inline-block shadow-lg">
                  <span className="material-icons-round text-5xl text-blue-400">directions_boat</span>
                </div>
                
                <h2 className="text-4xl lg:text-5xl font-extrabold mb-6 tracking-tight text-white">Denizlerde Yalnız Değilsiniz</h2>
                <p className="text-lg lg:text-xl mb-12 text-slate-400 max-w-2xl font-medium">
                  Portlink ağına hemen dahil olun. Güvenilir sağlayıcılar, anında teklifler ve premium deneyim ile okyanus ötesi rahatlığa ulaşın.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => navigate('/signup')}
                    className="group px-10 py-4 bg-transparent text-blue-700 border-2 border-blue-600 rounded-2xl font-bold text-lg hover:bg-blue-50 transition-all duration-300 shadow-sm transform hover:-translate-y-1 flex items-center gap-2"
                  >
                    Ücretsiz Kaydol
                    <span className="material-icons-round group-hover:translate-x-1 transition-transform text-blue-500">rocket_launch</span>
                  </button>
                  <button 
                    onClick={() => navigate('/contact')}
                    className="group px-10 py-4 bg-transparent text-blue-700 border-2 border-blue-600 rounded-2xl font-bold text-lg hover:bg-blue-50 transition-all duration-300 shadow-sm transform hover:-translate-y-1 flex items-center gap-2"
                  >
                    Bizimle İletişime Geçin
                  </button>
                </div>
              </div>

            </div>
          </div>
        </section>

      </main>
     <Footer />
    </FullPageLayout>
  );
};

export default Welcome;