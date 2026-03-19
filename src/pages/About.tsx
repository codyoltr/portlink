import React from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 flex flex-col overflow-x-hidden">
      <Navbar />

      <main className="flex-grow pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* --- 1. HERO BAŞLIK --- */}
          <div className="text-center mb-20">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-widest mb-6"
            >
              <span className="material-icons-round text-sm">explore</span>
              Geleceğin Denizcilik Ekosistemi
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-8 tracking-tighter">
              Neden <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">Portlink?</span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              Türkiye'nin stratejik konumunu dijital güçle birleştiriyoruz. Geleneksel denizcilik süreçlerini 
              hızlı, şeffaf ve küresel bir ağa dönüştürmek için buradayız.
            </p>
          </div>

          {/* --- 2. DEVASA STRATEJİK HARİTA BÖLÜMÜ --- */}
          <div className="relative mb-32">
            <div className="absolute inset-0 bg-blue-500/5 blur-[120px] rounded-full"></div>
            
            <div className="relative bg-slate-900 border border-slate-800 rounded-[3rem] p-4 md:p-10 shadow-2xl overflow-hidden group">
              {/* Başlık Paneli */}
              <div className="absolute top-8 left-8 z-30 hidden md:block">
                <div className="bg-slate-800/80 backdrop-blur-md p-4 rounded-2xl border border-slate-700 shadow-xl">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="text-white font-bold text-sm">Canlı Şebeke Analizi</span>
                  </div>
                  <div className="text-xs text-slate-400">Aktif Rotalar: <span className="text-blue-400">1,240+</span></div>
                </div>
              </div>

              {/* HARİTA SVG (Canlı Animasyonlu) */}
              <svg className="w-full h-auto aspect-[21/9] z-20" viewBox="0 0 1000 450" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <radialGradient id="mapGradient" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
                  </radialGradient>
                  {/* Gemi İkonu */}
                  <symbol id="ship-icon" viewBox="0 0 24 24">
                    <path d="M20 21c-1.39 0-2.78-.47-4-1.32-2.44 1.71-5.56 1.71-8 0C6.78 20.53 5.39 21 4 21H2v2h2c1.38 0 2.74-.35 4-.99 2.52 1.29 5.48 1.29 8 0 1.26.64 2.62.99 4 .99h2v-2h-2zM3.95 19H4c1.6 0 3.02-.88 4-2 .98 1.12 2.4 2 4 2s3.02-.88 4-2c.98 1.12 2.4 2 4 2h.05l1.89-6.68c.08-.26.06-.54-.06-.78s-.34-.42-.6-.5L20 10.62V6c0-1.1-.9-2-2-2h-3V1H9v3H6c-1.1 0-2 .9-2 2v4.62l-1.29.37c-.26.08-.48.26-.6.5s-.14.52-.06.78L3.95 19zM6 6h12v3.97L12 8 6 9.97V6z" fill="currentColor"/>
                  </symbol>
                </defs>

                {/* Dünya Haritası Arka Planı (Temsili Noktalar) */}
                <circle cx="500" cy="225" r="300" fill="url(#mapGradient)" />
                
                {/* STRATEJİK ROTALAR */}
                <g stroke="#3b82f6" strokeWidth="0.5" strokeDasharray="2 4" opacity="0.4">
                  <path d="M 485 190 Q 200 150 50 100" /> {/* Amerika Hattı */}
                  <path d="M 485 190 Q 700 350 900 400" /> {/* Uzak Doğu Hattı */}
                  <path d="M 485 190 Q 600 50 850 80" />  {/* Avrupa Hattı */}
                </g>

                {/* İSTANBUL MERKEZ NOKTASI */}
                <g transform="translate(485, 190)">
                  <circle r="25" fill="none" stroke="#3b82f6" strokeWidth="0.5" className="animate-[ping_3s_linear_infinite]" />
                  <circle r="8" fill="#3b82f6" fillOpacity="0.4" className="animate-pulse" />
                  <circle r="4" fill="#3b82f6" />
                </g>

                {/* DİĞER LİMANLAR (Noktalar) */}
                {[
                  {x: 200, y: 150, n: "Rotterdam"},
                  {x: 750, y: 120, n: "Shanghai"},
                  {x: 350, y: 350, n: "Suez"},
                  {x: 850, y: 300, n: "Singapore"}
                ].map((p, i) => (
                  <g key={i} transform={`translate(${p.x}, ${p.y})`}>
                    <circle r="2" fill="#64748b" />
                    <text y="-10" textAnchor="middle" fontSize="8" className="fill-slate-500 font-bold">{p.n}</text>
                  </g>
                ))}
              </svg>

              {/* Harita Altı Bilgi Çubuğu */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-slate-900 to-transparent flex justify-around items-center border-t border-slate-800/50">
                <div className="text-center">
                  <div className="text-blue-400 font-black text-2xl">85+</div>
                  <div className="text-slate-500 text-[10px] uppercase font-bold tracking-widest">Global Liman</div>
                </div>
                <div className="w-px h-8 bg-slate-800"></div>
                <div className="text-center">
                  <div className="text-blue-400 font-black text-2xl">24/7</div>
                  <div className="text-slate-500 text-[10px] uppercase font-bold tracking-widest">Operasyon</div>
                </div>
                <div className="w-px h-8 bg-slate-800"></div>
                <div className="text-center">
                  <div className="text-blue-400 font-black text-2xl">%100</div>
                  <div className="text-slate-500 text-[10px] uppercase font-bold tracking-widest">Dijital Takip</div>
                </div>
              </div>
            </div>
          </div>

          {/* --- 3. NEDEN BİZ? BENTO GRID --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
            {[
              { 
                t: "Stratejik Konum", 
                d: "İstanbul merkezli yapımızla, Doğu ve Batı arasındaki ticaretin tam kalbinde dijital bir köprü kuruyoruz.",
                i: "location_searching",
                c: "from-blue-600 to-indigo-600"
              },
              { 
                t: "Şeffaf Teknoloji", 
                d: "Tüm süreçler akıllı algoritmalarla yönetilir. Gizli maliyet yok, sadece verimlilik ve güven var.",
                i: "auto_awesome",
                c: "from-cyan-500 to-blue-500"
              },
              { 
                t: "Küresel Bağlantı", 
                d: "Sadece Türkiye değil, dünyanın dört bir yanındaki limanlarla entegre bir hizmet ağı sunuyoruz.",
                i: "public",
                c: "from-indigo-500 to-purple-600"
              }
            ].map((f, i) => (
              <div key={i} className="group p-8 rounded-[2.5rem] bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${f.c} text-white flex items-center justify-center mb-6 shadow-lg shadow-blue-500/20`}>
                  <span className="material-icons-round text-3xl">{f.i}</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{f.t}</h3>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                  {f.d}
                </p>
              </div>
            ))}
          </div>

          {/* --- 4. CTA BÖLÜMÜ --- */}
          <div className="p-12 md:p-20 rounded-[4rem] bg-slate-900 relative overflow-hidden text-center border border-slate-800">
             <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_#1e3a8a_0%,_transparent_70%)] opacity-20"></div>
             <div className="relative z-10">
                <h2 className="text-3xl md:text-5xl font-black text-white mb-8 tracking-tighter">
                  Denizciliğin Geleceğine <br /> Siz de Katılın
                </h2>
                <p className="text-slate-400 text-lg mb-12 max-w-2xl mx-auto">
                  Portlink ağına dahil olarak işinizi dijitalleştirin ve küresel fırsatlara kapı açın.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="px-10 py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20">
                    Ağa Katıl
                  </button>
                  <button className="px-10 py-4 bg-slate-800 text-white rounded-2xl font-bold hover:bg-slate-700 transition-all">
                    Bize Ulaşın
                  </button>
                </div>
             </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;