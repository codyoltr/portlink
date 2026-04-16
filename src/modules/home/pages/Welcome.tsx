import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useNavigate } from 'react-router-dom';
import FullPageLayout from '@/features/shell/components/FullPageLayout';
import heroImage from '@/assets/hero-image.png';
import StatsSection from './StatsSection';
import MapSection from './MapSection';
import TopAgencies from './TopAgencies';

// --- DUYURULAR ---
const announcements = [
  { id: 1, month: 'NİS', day: '14', text: 'İstanbul - Yalova Hattı Kapasitesi Artırıldı! Özel Entegrasyon Sağlandı - 14.04.2026' },
  { id: 2, month: 'NİS', day: '14', text: 'Ambarlı Limanı Yeni Acente Kayıtları Başladı - 14.04.2026' },
  { id: 3, month: 'NİS', day: '13', text: 'Yalova Tersaneler Bölgesi Özel Entegrasyonu Bitti - 13.04.2026' },
  { id: 4, month: 'NİS', day: '10', text: 'Marmara Denizi Gemi Geçiş Raporu ve Yapay Zeka Analizi Yayımlandı' },
  { id: 5, month: 'NİS', day: '08', text: 'Liman Otoritelerinin IT, İş ve Bireysel Gelişimlerinde Yeni Araçlar Yayında!' },
  { id: 6, month: 'NİS', day: '08', text: '2025-2026 Yılı Projeleri Liman İçi Öğrenim / Staj Seçme Sınav Sonuçları' },
  { id: 7, month: 'NİS', day: '06', text: 'Portlink Yeni Sayısı Çıktı! Dijital Dergi Platformumuzda İnceleyin.' },
  { id: 8, month: 'NİS', day: '03', text: 'Acente Memnuniyet Anketi Yayında!' },
];

const steps = [
  { id: '01', title: 'İlan Oluştur', description: 'Gemi veya proje detaylarınızı girerek güvenilir bir iş ilanı açın.', icon: <span className="material-icons-round text-[32px]">post_add</span> },
  { id: '02', title: 'Teklif Al', description: 'Bölgedeki en uygun taşeron ve uzmanlardan anında rekabetçi teklifler toplayın.', icon: <span className="material-icons-round text-[32px]">local_offer</span> },
  { id: 3, title: 'Değerlendir & Seç', description: 'Profil ve puanları inceleyerek projenize en uygun ekibi seçip süreci başlatın.', icon: <span className="material-icons-round text-[32px]">touch_app</span> },
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
                      onClick={() => navigate('/login/agent')}
                      className="group relative w-full overflow-hidden rounded-2xl bg-white px-4 py-4 text-base font-bold text-blue-700 shadow-[0_4px_20px_rgba(37,99,235,0.1)] ring-2 ring-blue-600/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(37,99,235,0.2)] hover:ring-blue-600 flex items-center justify-center gap-2"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-sky-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                      <span className="material-icons-round relative z-10 text-[22px] transition-colors duration-300 group-hover:text-white">post_add</span>
                      <span className="relative z-10 transition-colors duration-300 group-hover:text-white tracking-wide">İş Talebi</span>
                    </button>
                  </div>

                  {/* 2. Buton Grubu */}
                  <div className="flex flex-col items-center flex-1">
                    <button
                      onClick={() => navigate('/login/agent')}
                      className="group relative w-full overflow-hidden rounded-2xl bg-white px-4 py-4 text-base font-bold text-blue-700 shadow-[0_4px_20px_rgba(37,99,235,0.1)] ring-2 ring-blue-600/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(37,99,235,0.2)] hover:ring-blue-600 flex items-center justify-center gap-2"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-sky-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                      <span className="material-icons-round relative z-10 text-[22px] transition-colors duration-300 group-hover:text-white">handshake</span>
                      <span className="relative z-10 transition-colors duration-300 group-hover:text-white tracking-wide">İş Ortaklığı</span>
                    </button>
                  </div>

                  {/* 3. Buton Grubu */}
                  <div className="flex flex-col items-center flex-1">
                    <button
                      onClick={() => navigate('/login/subcontractor')}
                      className="group relative w-full overflow-hidden rounded-2xl bg-white px-4 py-4 text-base font-bold text-blue-700 shadow-[0_4px_20px_rgba(37,99,235,0.1)] ring-2 ring-blue-600/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(37,99,235,0.2)] hover:ring-blue-600 flex items-center justify-center gap-2"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-sky-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                      <span className="material-icons-round relative z-10 text-[22px] transition-colors duration-300 group-hover:text-white">work_outline</span>
                      <span className="relative z-10 transition-colors duration-300 group-hover:text-white tracking-wide">İş Bul</span>
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
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/10 to-transparent"></div>
                  </div>
                </div>
                <div className="absolute -top-10 -right-10 w-full h-full border-2 border-blue-50 rounded-[3rem] -z-10 transform rotate-3"></div>
                <div className="absolute -bottom-8 -left-8 w-full h-full border-2 border-sky-50 rounded-[3rem] -z-10 transform -rotate-3"></div>
              </div>

            </div>
          </div>
        </section>

        {/* --- YENİ PREMİUM NASIL ÇALIŞIR BÖLÜMÜ (ÖNCE GÖSTERİLİYOR) --- */}
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

        {/* --- DUYURULAR (RESTYLED WITH IMAGE DESIGN) --- */}
        <section className="w-full py-24 bg-[#FAF9F6] border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4">
            <h3 className="text-4xl font-black text-[#2e1b65] mb-12 text-center tracking-tighter uppercase">Duyurular</h3>
            
            <div className="grid lg:grid-cols-2 gap-x-8 gap-y-4">
              {announcements.map((ann) => (
                <div key={ann.id} className="group flex items-stretch bg-white cursor-pointer shadow-[0_2px_15px_rgba(0,0,0,0.03)] hover:shadow-[0_4px_25px_rgba(0,0,0,0.07)] transition-all">
                  <div className="bg-[#122336] text-white w-[90px] flex flex-col items-center justify-center py-5 flex-shrink-0">
                    <span className="text-[13px] font-bold tracking-[0.15em] leading-none mb-1 text-slate-200">{ann.month}</span>
                    <span className="text-[28px] font-bold leading-none">{ann.day}</span>
                  </div>
                  <div className="p-5 flex items-center text-[#4a5568] font-medium text-[14px] md:text-[15px] leading-relaxed group-hover:text-blue-700 transition-colors w-full border border-slate-50 border-l-0">
                    {ann.text}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- HARİTA --- */}
        <MapSection />

        {/* --- AYIN EN İYİLERİ --- */}
        <TopAgencies />

        {/* --- HİZMET SEÇİMİ KARTLARI --- */}
        <section id="services" className="w-full py-24 bg-slate-50 border-y border-slate-200 scroll-mt-16">
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

        {/* --- STATS --- */}
        <StatsSection />

        {/* --- YENİ EKLENEN DENİZCİLİK İSTATİSTİKLERİ BÖLÜMÜ --- */}
        <section className="w-full py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-black text-slate-900 tracking-tight">
                Ülke Geneli Denizcilik İstatistikleri
              </h2>
              <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto font-medium">
                Ulaştırma ve Altyapı Bakanlığı'nın resmi veritabanlarına tek tıkla erişerek sektördeki büyümeyi yakından takip edin.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <a 
                href="https://denizcilikistatistikleri.uab.gov.tr/yuk-istatistikleri" 
                target="_blank" 
                rel="noopener noreferrer"
               className="group flex flex-col items-center text-center bg-white p-10 rounded-[2rem] border border-slate-200 hover:border-blue-400 hover:shadow-[0_20px_40px_rgba(37,99,235,0.1)] hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all transform group-hover:scale-110 shadow-sm">
                  <span className="material-icons-round text-3xl">scale</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">Yük İstatistikleri</h3>
                <p className="text-slate-500 font-medium text-sm leading-relaxed">
                  Limanlarımızda elleçlenen yük verilerine ait veri kümesi ve yıllık değişim oranları.
                </p>
              </a>

              <a 
                href="https://denizcilikistatistikleri.uab.gov.tr/konteyner-istatistikleri" 
                target="_blank" 
                rel="noopener noreferrer"
               className="group flex flex-col items-center text-center bg-white p-10 rounded-[2rem] border border-slate-200 hover:border-indigo-400 hover:shadow-[0_20px_40px_rgba(79,70,229,0.1)] hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-all transform group-hover:scale-110 shadow-sm">
                  <span className="material-icons-round text-3xl">inventory_2</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">Konteyner İstatistikleri</h3>
                <p className="text-slate-500 font-medium text-sm leading-relaxed">
                  Türkiye geneli liman konteyner hacmi (TEU) ve transit operasyon bilgileri.
                </p>
              </a>

              <a 
                href="https://denizcilikistatistikleri.uab.gov.tr/turk-bogazlari-gemi-gecis-istatistikleri" 
                target="_blank" 
                rel="noopener noreferrer"
               className="group flex flex-col items-center text-center bg-white p-10 rounded-[2rem] border border-slate-200 hover:border-cyan-400 hover:shadow-[0_20px_40px_rgba(6,182,212,0.1)] hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center mb-6 group-hover:bg-cyan-600 group-hover:text-white transition-all transform group-hover:scale-110 shadow-sm">
                  <span className="material-icons-round text-3xl">directions_boat</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-cyan-600 transition-colors">Türk Boğazları</h3>
                <p className="text-slate-500 font-medium text-sm leading-relaxed">
                  İstanbul ve Çanakkale boğazlarında gerçekleşen ticari gemi geçiş verileri.
                </p>
              </a>
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

                <h2 className="text-4xl lg:text-5xl font-extrabold mb-6 tracking-tight text-white">Doğru Ekip, Sorunsuz Operasyon</h2>
                <p className="text-lg lg:text-xl mb-12 text-slate-400 max-w-2xl font-medium">
                  Limanlardaki en güçlü dijital çözüm ortağınızla tanışın. İhtiyacınıza en uygun hizmet sağlayıcısını bulmak ve süreci tek ekrandan yönetmek artık çok kolay.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={() => navigate('/signup')}
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