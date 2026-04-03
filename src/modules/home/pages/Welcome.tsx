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

const steps = [
  { id: '01', title: 'İlan Oluştur', description: 'Gemi veya proje detaylarınızı girerek güvenilir bir iş ilanı açın.', icon: <span className="material-icons-round text-[32px]">post_add</span> },
  { id: '02', title: 'Teklif Al', description: 'Bölgedeki en uygun taşeron ve uzmanlardan anında rekabetçi teklifler toplayın.', icon: <span className="material-icons-round text-[32px]">local_offer</span> },
  { id: '03', title: 'Değerlendir & Seç', description: 'Profil ve puanları inceleyerek projenize en uygun ekibi seçip süreci başlatın.', icon: <span className="material-icons-round text-[32px]">touch_app</span> },
  { id: '04', title: 'Operasyonu Yönet', description: 'Tek panelden ilerlemeyi takip edin, raporları alın ve süreci güvenle tamamlayın.', icon: <span className="material-icons-round text-[32px]">dashboard_customize</span> }
];

const services = [
  { id: 1, title: 'Acentelik', image: '/images/acentelik.jpg', description: 'Liman operasyonlarınız için profesyonel yerel acentelik çözümleri.' },
  { id: 2, title: 'Teknik Servis', image: '/images/teknik-servis.jpg', description: 'Gemi bakım, onarım ve teknik destek süreçlerinde uzman ekipler.' },
  { id: 3, title: 'Lojistik', image: '/images/lojistik.jpg', description: 'Küresel ölçekte güvenilir ve hızlı yük taşımacılığı operasyonları.' },
  { id: 4, title: 'Danışmanlık', image: '/images/danismanlik.jpg', description: 'Denizcilik mevzuatı ve operasyonel verimlilik üzerine uzman danışmanlık.' },
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
            <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-amber-200/60 font-medium">

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
          {/* Subtle Dynamic Backgrounds */}
          <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[70%] bg-blue-50/50 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-[-10%] left-[-5%] w-[30%] h-[50%] bg-sky-50/50 rounded-full blur-3xl pointer-events-none"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative z-10">
            <div className="grid xl:grid-cols-2 gap-16 items-center">

              <div className="space-y-8">
                {/* ÜST KÜÇÜK BAŞLIK */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-full text-blue-700 font-bold text-xs tracking-wide uppercase hover:bg-blue-100 transition-colors cursor-default shadow-sm">
                  <span className="material-icons-round text-base text-blue-500 animate-pulse">rocket_launch</span>
                  Denizcilikte İş Eşleştirme Platformu
                </div>

                {/* ANA SLOGAN */}
                <h1 className="text-5xl lg:text-[4rem] font-extrabold text-slate-900 leading-[1.1] tracking-tight">
                  Gemi İhtiyacını <br />
                  <span className="bg-gradient-to-r from-blue-700 via-sky-600 to-blue-500 bg-clip-text text-transparent">Doğru Ekiplerle Anında Buluştur</span>
                </h1>

                {/* ALT AÇIKLAMA 1 */}
                <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-xl font-medium">
                  Tüm gemi operasyonlarınızı tek platformdan yönetin, en uygun ekiplerle hızla eşleşip teklif alın.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full max-w-3xl">
                  {/* 1. Buton Grubu */}
                  <div className="flex flex-col items-center flex-1">
                    <button
                      onClick={() => navigate('/login')}
                      className="w-full group px-4 py-4 bg-transparent text-blue-700 border-2 border-blue-600 rounded-2xl font-bold text-base hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
                    >
                      İş Talebi Aç
                    </button>
                  </div>

                  {/* 2. Buton Grubu */}
                  <div className="flex flex-col items-center flex-1">
                    <button
                      onClick={() => navigate('/login')}
                      className="w-full group px-4 py-4 bg-transparent text-blue-700 border-2 border-blue-600 rounded-2xl font-bold text-base hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
                    >
                      İş Ortaklığı Ara
                    </button>
                  </div>

                  {/* 3. Buton Grubu */}
                  <div className="flex flex-col items-center flex-1">
                    <button
                      onClick={() => navigate('/login')}
                      className="w-full group px-4 py-4 bg-transparent text-blue-700 border-2 border-blue-600 rounded-2xl font-bold text-base hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
                    >
                      İş Bul
                    </button>
                  </div>
                </div>

                {/* İstatistikler */}
                <div className="flex flex-wrap items-center gap-10 pt-8 mt-10 border-t border-slate-200">
                  <div className="group hover:-translate-y-1 transition-transform">
                    <div className="text-3xl font-black text-slate-900 group-hover:text-blue-600 transition-colors">450+</div>
                    <div className="text-sm text-slate-500 font-semibold tracking-wide uppercase mt-1">Aktif Liman</div>
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
                      className="w-full h-full object-cover transform duration-1000 group-hover:scale-105 animate-float"
                    />
                    {/* Glassmorphic Gradient Overlay on Image */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/10 to-transparent"></div>
                  </div>
                </div>
                {/* Dekoratif Halkalar */}
                <div className="absolute -top-10 -right-10 w-full h-full border-2 border-blue-50 rounded-[3rem] -z-10 transform rotate-3"></div>
                <div className="absolute -bottom-8 -left-8 w-full h-full border-2 border-sky-50 rounded-[3rem] -z-10 transform -rotate-3"></div>
              </div>

            </div>
          </div>
        </section>

        {/* --- DUYURULAR --- (KORUNAN ALAN) */}
        <section className="w-full py-24 bg-white border-b border-slate-100">
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
              {/* ALT AÇIKLAMA 2 */}
              <p className="text-slate-600 max-w-2xl mx-auto text-lg">
                Gemiye gereken tüm hizmetler için ilan açın, doğru ekiplerden teklif alın ve operasyonu tek platformdan yönetin.
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

        {/* --- HARİTA --- (KORUNAN ALAN) */}
        <MapSection />

        {/* --- NEDEN PORTLINK? SECTION (BENTOS) --- */}
        <section id="about" className="w-full py-24 bg-white scroll-mt-16 border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row justify-between items-end mb-16 gap-8">
              <div className="max-w-2xl">
                <h3 className="text-xs font-bold text-blue-600 uppercase tracking-[0.25em] mb-4">
                  Avantajlarımız
                </h3>
                <h2 className="text-4xl font-extrabold text-slate-900">
                  Limanda Gücünüz: <br />Portlink ile Daima İlerde
                </h2>
              </div>
              {/* ALT AÇIKLAMA 3 */}
              <p className="text-lg text-slate-600 max-w-lg font-medium border-l-4 border-blue-500 pl-6">
                Teknik servislerden kumanyaya, crew işlemlerinden liman operasyonlarına kadar tüm ihtiyaçlar tek yerden yönetilir, teklif alınır ve iş birliği kurulur.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

              {/* Sol Büyük Kutu */}
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

              {/* Sağ Üst Yatay Kutu */}
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

              {/* Sağ Alt Kutu 1 */}
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
              {/* Sağ Alt Kutu 2 */}
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
        <section id="services" className="w-full py-24 bg-slate-50 border-b border-slate-200 scroll-mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-extrabold text-slate-900 tracking-tight">
                Hizmet <span className="text-blue-500">Dallarımız</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service) => (
                <div key={service.id} className="relative group h-[500px] w-full rounded-[2.5rem] overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500">
                  <div className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110" style={{ backgroundImage: `url(${service.image})` }}></div>
                  <div className="absolute inset-0 bg-slate-900/40 transition-opacity duration-500 group-hover:opacity-0"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/95 via-blue-900/60 to-transparent opacity-0 translate-y-10 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500"></div>

                  <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col justify-end h-full">
                    <h3 className="text-3xl font-bold text-white tracking-wide mb-2 group-hover:-translate-y-4 transition-transform duration-500">
                      {service.title}
                    </h3>
                    <div className="overflow-hidden">
                      <p className="text-blue-100 text-sm font-medium leading-relaxed opacity-0 translate-y-10 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                        {service.description}
                      </p>
                      <div className="w-0 h-1 bg-blue-400 mt-4 opacity-0 transition-all duration-500 delay-200 group-hover:w-16 group-hover:opacity-100 rounded-full"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- STATS --- (KORUNAN ALAN) */}
        <StatsSection />

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

                <h2 className="text-4xl lg:text-5xl font-extrabold mb-6 tracking-tight text-white">Doğru Ekip, Sorunsuz Operasyon</h2>
                <p className="text-lg lg:text-xl mb-12 text-slate-400 max-w-2xl font-medium">
                  Limanlardaki en güçlü dijital çözüm ortağınızla tanışın. İhtiyacınıza en uygun hizmet sağlayıcısını bulmak ve süreci tek ekrandan yönetmek artık çok kolay.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => navigate('/login')}
                    className="group px-10 py-4 bg-blue-600 text-white rounded-2xl font-bold text-lg hover:bg-blue-500 transition-all duration-300 shadow-[0_0_30px_rgba(37,99,235,0.4)] hover:shadow-[0_0_40px_rgba(37,99,235,0.6)] transform hover:-translate-y-1 flex items-center gap-2"
                  >
                    Ücretsiz Kaydol
                    <span className="material-icons-round group-hover:translate-x-1 transition-transform">rocket_launch</span>
                  </button>
                  <button
                    onClick={() => navigate('/contact')}
                    className="px-10 py-4 bg-white/5 text-white rounded-2xl font-bold text-lg border border-white/10 hover:bg-white/10 transition-all duration-300"
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