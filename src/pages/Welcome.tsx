import React from 'react';
import { useNavigate } from 'react-router-dom';
import FullPageLayout from '@/features/shell/components/FullPageLayout';
import heroImage from '@/assets/hero-image.png';

// --- BÜTÜN VERİ LİSTELERİ (Karmaşayı önlemek için en üste taşıdık) ---

const services = [
  { id: 1, title: 'Acentelik', image: '/images/acentelik.jpg' },
  { id: 2, title: 'Teknik Servis', image: '/images/teknik-servis.jpg' },
  { id: 3, title: 'Lojistik', image: '/images/lojistik.jpg' },
  { id: 4, title: 'Danışmanlık', image: '/images/danismanlik.jpg' },
  { id: 5, title: 'Sörveyör', image: '/images/sorveyor.jpg' },
];

const steps = [
  {
    id: 1,
    title: 'İhtiyacını Belirle',
    description: 'Aradığınız hizmeti, lokasyonu ve detayları sisteme girerek talebinizi oluşturun.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    id: 2,
    title: 'Uzmanlarla Eşleş',
    description: 'İhtiyacınıza en uygun, doğrulanmış profesyonel hizmet sağlayıcılarıyla anında eşleşin.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    id: 3,
    title: 'Teklifleri Değerlendir',
    description: 'Gelen teklifleri karşılaştırın, kullanıcı profillerini ve referansları inceleyin.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    id: 4,
    title: 'Güvenle Anlaş',
    description: 'En uygun çözüm ortağınızı seçin ve Portlink güvencesiyle iş birliğine başlayın.',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  }
];

// Harita bölümü için kullanılan eski kategori listesi (Güvende, dışarıda)
const categories = [
  { icon: 'anchor', title: 'Acentelik', color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { icon: 'build', title: 'Teknik Servis', color: 'text-orange-500', bg: 'bg-orange-500/10' },
  { icon: 'inventory_2', title: 'Lojistik', color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  { icon: 'support_agent', title: 'Danışmanlık', color: 'text-purple-500', bg: 'bg-purple-500/10' },
  { icon: 'shutter_speed', title: 'Sörveyör', color: 'text-red-500', bg: 'bg-red-500/10' },
];

// Yeni Bento Box (Neden Portlink) için güncellenmiş özellikler listesi
const features = [
  {
    id: 'guvenilir',
    title: 'Güvenilir Ağ',
    description: 'Denizcilik sektöründe güvenilir ve profesyonel hizmet sağlayıcıları ile bağlantı kurun.',
    icon: (
      <svg className="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
      </svg>
    ),
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
  },
  {
    id: 'global',
    title: 'Global Kapsam',
    description: 'Dünya çapında limanlar ve denizcilik hizmetlerine kesintisiz erişim sağlayın.',
    icon: (
      <svg className="w-8 h-8 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    bgColor: 'bg-indigo-50 dark:bg-indigo-900/20',
  },
  {
    id: 'hizli',
    title: 'Hızlı Eşleştirme',
    description: 'İhtiyaçlarınıza en uygun çözüm ortağını hızlı ve kolay bir şekilde bulun.',
    icon: (
      <svg className="w-8 h-8 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    bgColor: 'bg-amber-50 dark:bg-amber-900/20',
  },
  {
    id: 'dogrulanmis',
    title: 'Doğrulanmış Profiller',
    description: 'Tüm hizmet sağlayıcıları titizlikle incelenmiş profesyonellerdir.',
    icon: (
      <svg className="w-8 h-8 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    bgColor: 'bg-emerald-50 dark:bg-emerald-900/20',
  }
];


const Welcome: React.FC = () => {
  const navigate = useNavigate();

  return (
    <FullPageLayout>
     {/* --- YENİLENEN HEADER (ORTALANMIŞ MENÜ) --- */}
      <header className="w-full py-5 px-4 sm:px-6 lg:px-8 flex items-center justify-between bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200/50 dark:border-slate-700/50 flex-shrink-0 transition-all duration-300 shadow-sm">
        
        {/* Sol Kısım: Logo */}
        <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="bg-blue-600 p-2 rounded-xl shadow-lg shadow-blue-600/20 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
            <span className="material-icons-round text-white text-2xl">directions_boat</span>
          </div>
          <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600 bg-clip-text text-transparent">
            Portlink
          </span>
        </div>

        {/* Orta Kısım: Sayfa İçi Linkler (Boşluğu dolduran kısım) */}
        <nav className="hidden md:flex items-center gap-8">
          <button
            onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-blue-600 after:transition-all hover:after:w-full">
            Nasıl Çalışır?
          </button>
          <button
            onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-blue-600 after:transition-all hover:after:w-full">
            Hizmetler
          </button>
          <button
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-blue-600 after:transition-all hover:after:w-full">
            Neden Portlink?
          </button>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-blue-600 after:transition-all hover:after:w-full">
            İletişim
          </button>
        </nav>

        {/* Sağ Kısım: Giriş Butonu */}
        <div className="flex items-center">
          <button
            onClick={() => navigate('/login')}
            className="px-6 py-2.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all duration-300 shadow-md shadow-blue-600/20 hover:shadow-xl hover:shadow-blue-600/40 transform hover:-translate-y-0.5 flex items-center gap-2"
          >
            Giriş Yap
            <span className="material-icons-round text-sm">login</span>
          </button>
        </div>
      </header>

      {/* Ana İçerik */}
      <main className="flex-1 w-full">
        
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-8">
            <div className="space-y-8 animate-[fade-in-up_1s_ease-out]">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 dark:bg-primary/20 rounded-full text-primary font-semibold text-sm hover:bg-primary/20 transition-colors cursor-default">
                <span className="material-icons-round text-base animate-pulse">rocket_launch</span>
                Denizcilik Sektörünün Dijital Platformu
              </div>
              <h1 className="text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white leading-tight">
                Denizcilik Hizmetlerinde
                <span className="block bg-gradient-to-r from-primary via-blue-500 to-blue-700 bg-clip-text text-transparent bg-300% animate-gradient">
                  Doğru Eşleştirme
                </span>
              </h1>
              <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-lg">
                Taşeron, yerel acente, teknik uzman ve iş ortaklığı ihtiyaçlarınız için profesyonel çözüm ortağı bulun.
                Portlink ile denizcilik sektöründe güvenilir bağlantılar kurun.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => navigate('/login')}
                  className="group px-8 py-4 bg-primary text-white rounded-xl font-bold text-lg hover:bg-blue-600 transition-all duration-300 shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-blue-500/40 transform hover:-translate-y-1 flex items-center justify-center gap-2"
                >
                  Hemen Başla
                  <span className="material-icons-round group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </button>
                <button 
                  onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-4 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-xl font-semibold text-lg border-2 border-slate-200 dark:border-slate-700 hover:border-primary hover:text-primary transition-all duration-300 hover:shadow-lg">
                  Daha Fazla Bilgi
                </button>
              </div>
              
              {/* İstatistikler */}
              <div className="flex flex-wrap items-center gap-8 pt-6 border-t border-slate-100 dark:border-slate-800 mt-8">
                <div className="group hover:-translate-y-1 transition-transform">
                  <div className="text-3xl font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">500+</div>
                  <div className="text-sm text-slate-500 dark:text-slate-400 font-medium">Aktif Kullanıcı</div>
                </div>
                <div className="w-px h-12 bg-slate-200 dark:bg-slate-700 hidden sm:block"></div>
                <div className="group hover:-translate-y-1 transition-transform">
                  <div className="text-3xl font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">1000+</div>
                  <div className="text-sm text-slate-500 dark:text-slate-400 font-medium">Tamamlanan Proje</div>
                </div>
                <div className="w-px h-12 bg-slate-200 dark:bg-slate-700 hidden sm:block"></div>
                <div className="group hover:-translate-y-1 transition-transform">
                  <div className="text-3xl font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">50+</div>
                  <div className="text-sm text-slate-500 dark:text-slate-400 font-medium">Ülke</div>
                </div>
              </div>
            </div>

            {/* Sağdaki Görsel Alanı */}
            <div className="relative group perspective-1000">
              <div className="relative z-10 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/50 dark:border-slate-700/50 transform transition-transform duration-700 group-hover:scale-[1.02] animate-[float_6s_ease-in-out_infinite]">
                <div className="aspect-square rounded-2xl relative overflow-hidden group-hover:shadow-inner transition-shadow flex items-center justify-center">
                  <img
                    src={heroImage}
                    alt="Denizcilik lojistik operasyonları"
                    className="w-full h-full object-cover rounded-2xl shadow-inner group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                </div>
              </div>
              <div className="absolute -top-6 -right-6 w-72 h-72 bg-primary/30 rounded-full blur-3xl -z-10 group-hover:bg-primary/40 transition-colors duration-700"></div>
              <div className="absolute -bottom-6 -left-6 w-72 h-72 bg-blue-500/30 rounded-full blur-3xl -z-10 group-hover:bg-blue-400/40 transition-colors duration-700 animate-[pulse_4s_ease-in-out_infinite]"></div>
            </div>
          </div>
        </section>

        {/* --- YENİ PREMİUM NASIL ÇALIŞIR BÖLÜMÜ --- */}
        <section id="how-it-works" className="w-full py-10 bg-slate-50 dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 scroll-mt-20"></section>
        <section className="w-full py-10 bg-slate-50 dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h3 className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-[0.3em] mb-4">
                KOLAY VE HIZLI SÜREÇ
              </h3>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 dark:text-white">
                Portlink Nasıl Çalışır?
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step) => (
                <div key={step.id} className="group relative bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-slate-100 dark:border-slate-700 overflow-hidden">
                  <div className="absolute top-4 right-6 text-6xl font-black text-slate-50 dark:text-slate-700/30 transition-colors duration-300 group-hover:text-blue-50 dark:group-hover:text-blue-900/20 z-0 select-none">
                    {step.id}
                  </div>
                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-slate-700/50 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-6 transition-colors duration-300 group-hover:bg-blue-600 group-hover:text-white shadow-sm">
                      {step.icon}
                    </div>
                    <h4 className="text-xl font-bold text-slate-800 dark:text-white mb-3">
                      {step.title}
                    </h4>
                    <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-sm">
                      {step.description}
                    </p>
                  </div>
                  <div className="absolute bottom-0 left-0 w-0 h-1 bg-blue-600 transition-all duration-300 group-hover:w-full"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- HİZMET SEÇİMİ KARTLARI SECTION --- */}
        <section className="w-full py-20 bg-white dark:bg-slate-950">
           <section id="services" className="w-full py-20 bg-white dark:bg-slate-950 scroll-mt-20"></section>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h3 className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-[0.3em] mb-4">
                HIZLI ERİŞİM
              </h3>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 dark:text-white">
                İhtiyacınız Olan Hizmet Dalını Seçin
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {services.map((service) => (
                <div key={service.id} className="relative group h-96 lg:h-80 rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300">
                  <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url(${service.image})` }}></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent transition-opacity duration-300 group-hover:from-blue-900/90"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col items-center justify-end h-full transform transition-transform duration-300 group-hover:-translate-y-2">
                    <h3 className="text-xl font-bold text-white tracking-wide text-center">
                      {service.title}
                    </h3>
                    <div className="w-0 h-1 bg-blue-400 mt-3 transition-all duration-300 group-hover:w-12 rounded-full"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- PREMIUM GLOBAL MARITIME NETWORK SECTION --- */}
        <section className="w-full py-24 bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 relative overflow-hidden">
          <div className="text-center mb-12">
            <h2 className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-[0.3em] mb-4">Türkiye'nin Stratejik Limanları</h2>
            <p className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 flex items-center justify-center gap-3 tracking-tight">
              <span className="animate-pulse">🌍</span> Küresel Denizcilik Ağı
            </p>
            <div className="flex flex-col items-center justify-center font-medium text-slate-500 dark:text-slate-400 text-sm md:text-base">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_10px_#3b82f6] animate-pulse"></span>
                <span className="text-slate-800 dark:text-slate-200 font-bold">Istanbul (Merkez)</span>
              </div>
              <div className="flex gap-12 mt-2">
                <span className="relative before:absolute before:w-px before:h-6 before:bg-slate-300 dark:before:bg-slate-700 before:-top-8 before:left-1/2 before:-rotate-[30deg]">Avrupa</span>
                <span className="relative before:absolute before:w-px before:h-6 before:bg-slate-300 dark:before:bg-slate-700 before:-top-8 before:left-1/2">Asya</span>
                <span className="relative before:absolute before:w-px before:h-6 before:bg-slate-300 dark:before:bg-slate-700 before:-top-8 before:left-1/2 before:rotate-[30deg]">Orta Doğu</span>
              </div>
            </div>
          </div>

          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative w-full aspect-[21/9] md:aspect-[24/10] rounded-[2.5rem] bg-gradient-to-br from-[#020b18] via-[#061836] to-[#020b18] border border-[#1e3a8a]/40 shadow-[0_30px_80px_rgba(2,11,24,0.7)] overflow-hidden group">
              <div className="absolute inset-0 opacity-40 mix-blend-screen pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[150%] bg-[radial-gradient(ellipse_at_center,_rgba(29,78,216,0.15)_0%,_transparent_70%)] animate-[pulse_8s_ease-in-out_infinite]"></div>
                <div className="absolute top-[10%] right-[-10%] w-[50%] h-[120%] bg-[radial-gradient(ellipse_at_center,_rgba(14,165,233,0.1)_0%,_transparent_70%)] animate-[pulse_10s_ease-in-out_infinite_2s]"></div>
              </div>
              <div className="absolute top-[30%] left-[20%] w-1 h-1 bg-blue-300 rounded-full opacity-30 animate-ping" style={{ animationDuration: '4s' }}></div>
              <div className="absolute top-[70%] left-[60%] w-1.5 h-1.5 bg-blue-400 rounded-full opacity-20 animate-ping" style={{ animationDuration: '6s', animationDelay: '1s' }}></div>
              <div className="absolute top-[40%] right-[20%] w-1 h-1 bg-cyan-300 rounded-full opacity-40 animate-ping" style={{ animationDuration: '5s', animationDelay: '2s' }}></div>

              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 450" preserveAspectRatio="xMidYMid slice">
                <defs>
                  <linearGradient id="route-glow" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgba(56, 189, 248, 0.1)" />
                    <stop offset="50%" stopColor="rgba(56, 189, 248, 0.6)" />
                    <stop offset="100%" stopColor="rgba(56, 189, 248, 0.1)" />
                  </linearGradient>
                  <linearGradient id="wake-gradient" x1="1" y1="0" x2="0" y2="0">
                    <stop offset="0%" stopColor="rgba(224, 242, 254, 0.5)" />
                    <stop offset="100%" stopColor="rgba(224, 242, 254, 0)" />
                  </linearGradient>
                  <g id="premium-ship" transform="scale(0.85)">
                    <path d="M -18 -6 L -45 -16 L -45 16 L -18 6 Z" fill="url(#wake-gradient)" opacity="0.7"/>
                    <rect x="-24" y="-8" width="52" height="16" rx="3" fill="#0f172a" stroke="#38bdf8" strokeWidth="0.7"/>
                    <path d="M 28 -8 L 40 0 L 28 8 Z" fill="#0f172a" stroke="#38bdf8" strokeWidth="0.7" strokeLinejoin="round"/>
                    <rect x="-18" y="-7" width="7" height="14" rx="1.5" fill="#94a3b8" />
                    <rect x="-16" y="-6" width="3" height="12" fill="#334155" />
                    <rect x="-8" y="-6" width="6" height="5" fill="#ef4444" rx="0.5"/>
                    <rect x="-8" y="1" width="6" height="5" fill="#3b82f6" rx="0.5"/>
                    <rect x="0" y="-6" width="6" height="5" fill="#10b981" rx="0.5"/>
                    <rect x="0" y="1" width="6" height="5" fill="#f59e0b" rx="0.5"/>
                    <rect x="8" y="-6" width="6" height="5" fill="#8b5cf6" rx="0.5"/>
                    <rect x="8" y="1" width="6" height="5" fill="#0ea5e9" rx="0.5"/>
                    <rect x="16" y="-6" width="6" height="5" fill="#f59e0b" rx="0.5"/>
                    <rect x="16" y="1" width="6" height="5" fill="#ef4444" rx="0.5"/>
                    <rect x="24" y="-6" width="6" height="5" fill="#3b82f6" rx="0.5"/>
                    <rect x="24" y="1" width="6" height="5" fill="#10b981" rx="0.5"/>
                  </g>
                  <path id="route-europe" d="M 480 200 C 350 220, 250 120, 100 150" />
                  <path id="route-europe-return" d="M 100 150 C 250 120, 350 220, 480 200" />
                  <path id="route-asia" d="M 480 200 C 600 280, 750 350, 950 250" />
                  <path id="route-asia-return" d="M 950 250 C 750 350, 600 280, 480 200" />
                  <path id="route-middle-east" d="M 480 200 C 500 280, 480 380, 600 420" />
                  <path id="route-middle-east-return" d="M 600 420 C 480 380, 500 280, 480 200" />
                  <path id="route-americas" d="M 480 200 C 300 260, 150 300, -50 220" />
                  <path id="route-americas-return" d="M -50 220 C 150 300, 300 260, 480 200" />
                </defs>
                <g fill="rgba(30, 64, 175, 0.15)" stroke="rgba(56, 189, 248, 0.1)" strokeWidth="1">
                  <path d="M 450 180 C 400 140, 300 150, 250 100 C 300 50, 500 80, 700 100 C 900 120, 950 200, 850 300 C 750 400, 650 350, 600 300 C 550 380, 480 400, 400 350 C 380 300, 420 250, 450 230 Z" />
                  <path d="M 150 150 C 100 120, 50 150, 20 200 C 50 300, 100 350, 150 300 C 120 250, 180 200, 150 150 Z" />
                </g>
                <g fill="none" stroke="url(#route-glow)" strokeWidth="2.5" strokeDasharray="6 8" className="opacity-60">
                  <path d="M 480 200 C 350 220, 250 120, 100 150" />
                  <path d="M 480 200 C 600 280, 750 350, 950 250" />
                  <path d="M 480 200 C 500 280, 480 380, 600 420" />
                  <path d="M 480 200 C 300 260, 150 300, -50 220" />
                </g>
                <use href="#premium-ship">
                  <animateMotion dur="18s" repeatCount="indefinite" rotate="auto">
                    <mpath href="#route-europe" />
                  </animateMotion>
                </use>
                <use href="#premium-ship">
                  <animateMotion dur="20s" repeatCount="indefinite" rotate="auto" begin="8s">
                    <mpath href="#route-europe-return" />
                  </animateMotion>
                </use>
                <use href="#premium-ship">
                  <animateMotion dur="25s" repeatCount="indefinite" rotate="auto" begin="2s">
                    <mpath href="#route-asia" />
                  </animateMotion>
                </use>
                <use href="#premium-ship">
                  <animateMotion dur="22s" repeatCount="indefinite" rotate="auto" begin="12s">
                    <mpath href="#route-asia-return" />
                  </animateMotion>
                </use>
                <use href="#premium-ship">
                  <animateMotion dur="15s" repeatCount="indefinite" rotate="auto" begin="5s">
                    <mpath href="#route-middle-east" />
                  </animateMotion>
                </use>
                <use href="#premium-ship">
                  <animateMotion dur="16s" repeatCount="indefinite" rotate="auto" begin="1s">
                    <mpath href="#route-middle-east-return" />
                  </animateMotion>
                </use>
                <use href="#premium-ship">
                  <animateMotion dur="28s" repeatCount="indefinite" rotate="auto" begin="4s">
                    <mpath href="#route-americas" />
                  </animateMotion>
                </use>
                <g transform="translate(480, 200)">
                  <circle cx="0" cy="0" r="40" fill="none" stroke="#38bdf8" strokeWidth="1" className="animate-[ping_3s_ease-out_infinite]" opacity="0.5"/>
                  <circle cx="0" cy="0" r="60" fill="none" stroke="#38bdf8" strokeWidth="0.5" className="animate-[ping_3s_ease-out_infinite]" style={{ animationDelay: '1s' }} opacity="0.3"/>
                  <circle cx="0" cy="0" r="12" fill="rgba(56, 189, 248, 0.3)" className="animate-pulse" />
                  <circle cx="0" cy="0" r="6" fill="#38bdf8" style={{ filter: 'drop-shadow(0 0 20px #38bdf8)' }}/>
                  <circle cx="0" cy="0" r="2" fill="#ffffff" />
                </g>
                <circle cx="100" cy="150" r="4" fill="#38bdf8" opacity="0.8" className="animate-pulse"/>
                <circle cx="950" cy="250" r="4" fill="#38bdf8" opacity="0.8" className="animate-pulse"/>
                <circle cx="600" cy="420" r="4" fill="#38bdf8" opacity="0.8" className="animate-pulse"/>
              </svg>
            </div>
          </div>
        </section>

        {/* --- YENİ BENTO BOX: NEDEN PORTLİNK BÖLÜMÜ --- */}
        <section id="about" className="w-full py-24 bg-white dark:bg-slate-950 scroll-mt-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-extrabold text-slate-800 dark:text-white mb-4 relative inline-block">
                Neden Portlink?
                <span className="absolute -bottom-2 left-1/4 right-1/4 h-1.5 bg-gradient-to-r from-transparent via-blue-600 to-transparent rounded-full opacity-50"></span>
              </h2>
              <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mt-4">
                Denizcilik sektöründe ihtiyacınız olan tüm hizmetlere tek platformdan, güvenle erişin.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-2 gap-6 auto-rows-[200px] lg:auto-rows-auto">
              {/* 1. Sol Büyük Dikey Kutu (Güvenilir Ağ) */}
              <div className="lg:col-span-1 lg:row-span-2 group relative bg-slate-50 dark:bg-slate-900 rounded-3xl p-8 md:p-10 flex flex-col justify-between overflow-hidden border border-slate-100 dark:border-slate-800 hover:shadow-2xl hover:border-blue-200 transition-all duration-300 min-h-[400px]">
                <div>
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 ${features[0].bgColor} transition-transform duration-500 group-hover:scale-110`}>
                    {features[0].icon}
                  </div>
                  <h3 className="text-3xl font-bold text-slate-800 dark:text-white mb-4">
                    {features[0].title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                    {features[0].description}
                  </p>
                </div>
                <div className="absolute -bottom-10 -right-10 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                  <svg width="200" height="200" fill="currentColor" className="text-blue-900" viewBox="0 0 24 24">
                    <path d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/>
                  </svg>
                </div>
              </div>

              {/* 2. Sağ Üst Uzun Yatay Kutu (Global Kapsam) */}
              <div className="lg:col-span-2 lg:row-span-1 group bg-slate-50 dark:bg-slate-900 rounded-3xl p-8 flex flex-col md:flex-row items-start md:items-center gap-6 border border-slate-100 dark:border-slate-800 hover:shadow-xl hover:border-indigo-200 transition-all duration-300">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 ${features[1].bgColor} transition-transform duration-500 group-hover:-rotate-12`}>
                  {features[1].icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
                    {features[1].title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-base">
                    {features[1].description}
                  </p>
                </div>
              </div>

              {/* 3. Sağ Alt Sol Küçük Kutu (Hızlı Eşleştirme) */}
              <div className="lg:col-span-1 lg:row-span-1 group bg-slate-50 dark:bg-slate-900 rounded-3xl p-8 flex flex-col justify-center border border-slate-100 dark:border-slate-800 hover:shadow-xl hover:border-amber-200 transition-all duration-300 min-h-[200px]">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 ${features[2].bgColor}`}>
                  {features[2].icon}
                </div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
                  {features[2].title}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm">
                  {features[2].description}
                </p>
              </div>

              {/* 4. Sağ Alt Sağ Küçük Kutu (Doğrulanmış Profiller) */}
              <div className="lg:col-span-1 lg:row-span-1 group bg-slate-50 dark:bg-slate-900 rounded-3xl p-8 flex flex-col justify-center border border-slate-100 dark:border-slate-800 hover:shadow-xl hover:border-emerald-200 transition-all duration-300 min-h-[200px]">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 ${features[3].bgColor}`}>
                  {features[3].icon}
                </div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
                  {features[3].title}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm">
                  {features[3].description}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* --- HARİKA CTA (Gemi Animasyonlu) BÖLÜMÜ --- */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-gradient-to-br from-primary via-blue-600 to-indigo-700 rounded-3xl text-center text-white relative overflow-hidden shadow-2xl mb-12">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 animate-[pulse_6s_ease-in-out_infinite]"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3 animate-[pulse_6s_ease-in-out_infinite_2s]"></div>

            <style>
              {`
                @keyframes sail-right {
                  0% { left: -10%; transform: translateY(0px) rotate(-2deg); opacity: 0; }
                  10% { opacity: 0.25; }
                  50% { transform: translateY(15px) rotate(2deg); opacity: 0.25; }
                  90% { opacity: 0.25; }
                  100% { left: 110%; transform: translateY(-5px) rotate(-1deg); opacity: 0; }
                }
                @keyframes sail-left {
                  0% { right: -10%; transform: translateY(0px) rotate(2deg); opacity: 0; }
                  10% { opacity: 0.2; }
                  50% { transform: translateY(15px) rotate(-2deg); opacity: 0.2; }
                  90% { opacity: 0.2; }
                  100% { right: 110%; transform: translateY(-5px) rotate(1deg); opacity: 0; }
                }
              `}
            </style>

            <div className="absolute top-[20%] z-0 pointer-events-none" style={{ animation: 'sail-right 25s linear infinite' }}>
              <span className="material-icons-round text-5xl text-white">directions_boat</span>
            </div>

            <div className="absolute bottom-[25%] z-0 pointer-events-none" style={{ animation: 'sail-left 30s linear infinite 5s' }}>
              <div style={{ transform: 'scaleX(-1)' }}>
                <span className="material-icons-round text-6xl text-white">directions_boat</span>
              </div>
            </div>

            <div className="absolute top-[65%] z-0 pointer-events-none" style={{ animation: 'sail-right 35s linear infinite 12s' }}>
              <span className="material-icons-round text-3xl text-white">directions_boat</span>
            </div>

            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-30 mix-blend-overlay">
              <svg className="w-full h-full" viewBox="0 0 1200 400" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
                <g stroke="white" strokeWidth="1" strokeOpacity="0.15" fill="none">
                  <path d="M0,100 C400,120 800,80 1200,100" strokeDasharray="4 4" />
                  <path d="M0,200 C400,220 800,180 1200,200" strokeDasharray="4 4" />
                  <path d="M0,300 C400,320 800,280 1200,300" strokeDasharray="4 4" />
                  <path d="M300,0 Q320,200 300,400" strokeDasharray="4 4" />
                  <path d="M600,0 Q620,200 600,400" strokeDasharray="4 4" />
                  <path d="M900,0 Q920,200 900,400" strokeDasharray="4 4" />
                </g>

                <path d="M-100,300 Q200,150 500,250 T1300,150" fill="none" stroke="white" strokeWidth="2" strokeDasharray="8 8" strokeOpacity="0.4" className="animate-[pulse_4s_ease-in-out_infinite]" />
                <path d="M-50,50 Q400,250 800,100 T1300,250" fill="none" stroke="white" strokeWidth="1.5" strokeDasharray="4 6" strokeOpacity="0.25" />

                <g transform="translate(250, 195)">
                  <circle cx="0" cy="0" r="4" fill="white" fillOpacity="0.8" />
                  <circle cx="0" cy="0" r="14" fill="none" stroke="white" strokeWidth="1" strokeOpacity="0.6" className="animate-ping" style={{ animationDuration: '3s' }} />
                </g>
                
                <g transform="translate(800, 130)">
                  <circle cx="0" cy="0" r="6" fill="white" fillOpacity="0.9" />
                  <circle cx="0" cy="0" r="14" fill="none" stroke="white" strokeWidth="1" strokeOpacity="0.5" />
                  <circle cx="0" cy="0" r="24" fill="none" stroke="white" strokeWidth="0.5" strokeOpacity="0.3" />
                </g>
                
                <g transform="translate(1000, 215)">
                  <circle cx="0" cy="0" r="3" fill="white" fillOpacity="0.6" />
                  <circle cx="0" cy="0" r="8" fill="none" stroke="white" strokeWidth="1" strokeOpacity="0.4" />
                </g>
              </svg>
            </div>

            <div className="relative z-10 flex flex-col items-center p-12 lg:p-16">
              <span className="material-icons-round text-5xl mb-4 text-white/80 animate-bounce">anchor</span>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 tracking-tight">Hazır mısınız?</h2>
              <p className="text-xl lg:text-2xl mb-10 text-blue-100 max-w-2xl font-light">
                Portlink'e katılın ve denizcilik sektöründe yepyeni dijital fırsatlar keşfedin.
              </p>
              <button
                onClick={() => navigate('/login')}
                className="group px-10 py-4 bg-white text-primary rounded-xl font-bold text-lg hover:bg-slate-50 transition-all duration-300 shadow-xl shadow-black/10 hover:shadow-2xl transform hover:-translate-y-1 flex items-center gap-2"
              >
                Ücretsiz Başlayın
                <span className="material-icons-round group-hover:translate-x-1 transition-transform">rocket_launch</span>
              </button>
            </div>
          </div>
        </section>

      </main>
 
      {/* --- FOOTER BÖLÜMÜ --- */}
      <footer id="contact" className="w-full bg-slate-900 border-t border-slate-800 text-slate-400 py-16 mt-auto flex-shrink-0 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            
            <div className="space-y-6">
              <div className="flex items-center gap-3 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                <div className="bg-primary/10 p-2.5 rounded-xl border border-primary/20 group-hover:bg-primary group-hover:border-primary transition-all duration-300">
                  <span className="material-icons-round text-primary group-hover:text-white text-2xl transition-colors">directions_boat</span>
                </div>
                <span className="text-2xl font-bold text-white tracking-tight">Portlink</span>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
                Denizcilik sektöründe güvenilir bağlantılar kuran, operasyonlarınızı hızlandıran dijital pazar yeri.
              </p>

              <div className="flex gap-4 pt-2">
                <a href="#" aria-label="Instagram" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-pink-600 hover:text-white transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-pink-500/25">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" aria-label="LinkedIn" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-blue-500/25">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" aria-label="X (Twitter)" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-slate-900 hover:text-white transition-all duration-300 hover:-translate-y-1 shadow-lg border border-transparent hover:border-slate-700">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.005 4.15H5.059z" />
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-6 flex items-center gap-2">
                <span className="w-3 h-px bg-primary"></span> Hızlı Linkler
              </h4>
              <ul className="space-y-4 text-sm">
                <li>
                  <button onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-primary transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-primary transition-colors"></span> Hakkımızda
                  </button>
                </li>
                <li>
                  <span className="text-slate-500 cursor-not-allowed flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-700"></span> Hizmetler 
                    <span className="text-[10px] font-medium bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full ml-1 border border-slate-700">Yakında</span>
                  </span>
                </li>
                <li>
                  <span className="text-slate-500 cursor-not-allowed flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-700"></span> Fiyatlandırma 
                    <span className="text-[10px] font-medium bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full ml-1 border border-slate-700">Yakında</span>
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-6 flex items-center gap-2">
                <span className="w-3 h-px bg-primary"></span> Destek
              </h4>
              <ul className="space-y-4 text-sm">
                <li>
                  <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-primary transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-primary transition-colors"></span> İletişim
                  </button>
                </li>
                <li>
                  <span className="text-slate-500 cursor-not-allowed flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-700"></span> Yardım Merkezi
                  </span>
                </li>
                <li>
                  <span className="text-slate-500 cursor-not-allowed flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-700"></span> SSS
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-6 flex items-center gap-2">
                <span className="w-3 h-px bg-primary"></span> İletişim Bilgileri
              </h4>
              <ul className="space-y-5 text-sm">
                <li className="flex items-start gap-3 group cursor-pointer">
                  <div className="mt-0.5 w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center group-hover:bg-primary/20 group-hover:text-primary transition-colors flex-shrink-0">
                    <span className="material-icons-round text-[18px]">email</span>
                  </div>
                  <div>
                    <p className="text-slate-500 text-xs mb-0.5 font-medium">E-Posta</p>
                    <a href="mailto:info@portlink.com" className="text-slate-300 hover:text-white transition-colors">info@portlink.com</a>
                  </div>
                </li>
                <li className="flex items-start gap-3 group cursor-pointer">
                  <div className="mt-0.5 w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center group-hover:bg-primary/20 group-hover:text-primary transition-colors flex-shrink-0">
                    <span className="material-icons-round text-[18px]">phone</span>
                  </div>
                  <div>
                    <p className="text-slate-500 text-xs mb-0.5 font-medium">Müşteri Hizmetleri</p>
                    <a href="tel:+902121234567" className="text-slate-300 hover:text-white transition-colors">+90 (212) 123 45 67</a>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800/60 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
            <p>© Copyright |  Portlink Maritime Marketplace. | © 2026 all rights reserved. Made by Codyol </p>
            <div className="flex gap-6">
              <span className="hover:text-white cursor-pointer transition-colors">Gizlilik Politikası</span>
              <span className="hover:text-white cursor-pointer transition-colors">Kullanım Koşulları</span>
            </div>
          </div>
        </div>
      </footer>
    </FullPageLayout>
  );
};

export default Welcome;