import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Users, Globe2, ArrowUpRight, ShieldCheck } from 'lucide-react';

// Görsel importu
import TurkeyMap from '../../../assets/turkiyeMap.png';

const StatsSection = () => {
  const navigate = useNavigate();

  // Bakanlık Linki
  const handleLimanClick = () => {
    window.open("https://ticaret.gov.tr/gumruk-islemleri/dijital-gumruk-uygulamalari/edi-xml-referans-mesajlari/liman-kodlariturkiye-limanlari", "_blank");
  };

  // İletişim yönlendirmesi ve scroll reset
  const handleContactNavigate = () => {
    window.scrollTo(0, 0);
    navigate('/contact');
  };

  return (
    <div className="w-full py-24 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

          {/* SOL TARAF: Harita Paneli (Geniş ve Dengeli) */}
          <div className="lg:col-span-7 relative group">
            {/* Arka plan yumuşatma */}
            <div className="absolute -inset-4 bg-blue-500/5 rounded-[3rem] blur-2xl group-hover:bg-blue-500/10 transition-colors duration-700"></div>

            <div className="relative bg-white border border-slate-100 rounded-[3rem] p-10 shadow-2xl shadow-blue-900/5 z-10 overflow-hidden">
              <div className="mb-10">
                <span className="text-blue-600 font-bold text-xs uppercase tracking-widest mb-2 block">Lojistik Ağımız</span>
                <h3 className="text-3xl font-black text-slate-900 tracking-tight leading-tight">Operasyonel Kapsama Alanı</h3>
                <p className="text-slate-500 text-base mt-2 max-w-lg">Türkiye'nin stratejik tüm kıyı şeridinde yerel ekiplerimizle saniyeler içinde aksiyon alıyoruz.</p>
              </div>

             {/* Harita Alanı ve Dinamik Noktalar */}
              <div className="relative aspect-[16/10] flex items-center justify-center">
                <img 
                  src={TurkeyMap} 
                  alt="Türkiye Haritası" 
                  className="w-full h-auto object-contain p-2 drop-shadow-[0_20px_40px_rgba(30,58,138,0.1)] transition-transform duration-700 group-hover:scale-[1.02]"
                />
                
                {/* --- TÜMÜ PİNG EFEKTLİ NOKTALAR --- */}
                
                {/* Marmara / İstanbul */}
                <div className="absolute top-[32%] left-[18%]">
                  <div className="w-6 h-6 bg-blue-600/20 rounded-full animate-ping absolute"></div>
                  <div className="relative w-3.5 h-3.5 bg-blue-600 rounded-full border-2 border-white shadow-lg"></div>
                </div>

                {/* Ege / İzmir */}
                <div className="absolute bottom-[42%] left-[10%]">
                  <div className="w-6 h-6 bg-blue-500/20 rounded-full animate-ping absolute"></div>
                  <div className="relative w-3 h-3 bg-blue-500 rounded-full border-2 border-white shadow-md"></div>
                </div>

                {/* Akdeniz / Mersin-İskenderun 1 */}
                <div className="absolute bottom-[25%] right-[48%]">
                  <div className="w-6 h-6 bg-blue-600/20 rounded-full animate-ping absolute"></div>
                  <div className="relative w-3.5 h-3.5 bg-blue-600 rounded-full border-2 border-white shadow-lg"></div>
                </div>

                {/* Akdeniz / Mersin-İskenderun 2 */}
                <div className="absolute bottom-[27%] right-[68%]">
                  <div className="w-6 h-6 bg-blue-600/20 rounded-full animate-ping absolute"></div>
                  <div className="relative w-3.5 h-3.5 bg-blue-600 rounded-full border-2 border-white shadow-lg"></div>
                </div>

                {/* Karadeniz / Samsun 1 */}
                <div className="absolute top-[31%] right-[35%]">
                  <div className="w-6 h-6 bg-blue-500/20 rounded-full animate-ping absolute"></div>
                  <div className="relative w-3 h-3 bg-blue-500 rounded-full border-2 border-white shadow-md"></div>
                </div>

                {/* Karadeniz / Samsun 2 */}
                <div className="absolute top-[27%] right-[65%]">
                  <div className="w-6 h-6 bg-blue-500/20 rounded-full animate-ping absolute"></div>
                  <div className="relative w-3 h-3 bg-blue-500 rounded-full border-2 border-white shadow-md"></div>
                </div>

              </div>
            </div>
          </div>

          {/* SAĞ TARAF: Kartlar Grubu (Net ve Okunabilir) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="h-[2px] w-8 bg-blue-600"></div>
                <span className="text-blue-600 font-bold text-xs uppercase tracking-[0.2em]">PortLink Ekosistemi</span>
              </div>
              <h2 className="text-4xl xl:text-5xl font-black text-slate-950 leading-tight tracking-tight">
                Dijital <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Denizcilik Ağı</span>
              </h2>
            </div>

            {/* Kart 1: Limanlar Rehberi */}
            <button
              onClick={handleLimanClick}
              className="group bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-blue-900/5 hover:-translate-y-1 transition-all duration-300 flex items-center gap-6 text-left"
            >
              <div className="w-16 h-16 shrink-0 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                <MapPin size={28} />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-xl text-slate-950">Limanlar Rehberi</h4>
                <p className="text-sm text-slate-500 font-medium">Bakanlık onaylı güncel veri ve kodlar.</p>
              </div>
              <ArrowUpRight className="text-slate-200 group-hover:text-blue-600 transition-all" size={20} />
            </button>

            {/* Kart 2: İş Ortaklığı */}
            <button
              onClick={handleContactNavigate}
              className="group bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-orange-900/5 hover:-translate-y-1 transition-all duration-300 flex items-center gap-6 text-left"
            >
              <div className="w-16 h-16 shrink-0 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center group-hover:bg-orange-500 group-hover:text-white transition-all duration-500">
                <Users size={28} />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-xl text-slate-950">İş Ortaklığı</h4>
                <p className="text-sm text-slate-500 font-medium">Servis ağımıza hemen dahil olun.</p>
              </div>
              <ArrowUpRight className="text-slate-200 group-hover:text-orange-500 transition-all" size={20} />
            </button>

            {/* Kart 3: Uluslararası Hizmet (Premium ve Okunabilir) */}
            <div className="mt-2 p-8 rounded-[2.5rem] bg-slate-950 text-white relative overflow-hidden group/card shadow-2xl">
              {/* İç Işıklandırma */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-blue-600/20 blur-[80px] rounded-full"></div>

              <div className="relative z-10 flex flex-col gap-5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-md border border-white/5 shadow-inner">
                    <Globe2 size={24} className="text-blue-400" />
                  </div>
                  <h4 className="font-bold text-2xl tracking-tight">Uluslararası Hizmet</h4>
                </div>

                <p className="text-slate-400 text-base leading-relaxed max-w-[400px]">
                  Tüm çözüm ortaklarımız <span className="text-white font-semibold">IMO ve yerel mevzuat</span> standartlarına tam uyumlu, sertifikalı hizmet sunar.
                </p>

                <div className="mt-2 pt-6 border-t border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-blue-500 uppercase tracking-widest">
                    <ShieldCheck size={16} /> Global Güvenlik Standartı
                  </div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse shadow-[0_0_10px_#3b82f6]"></div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default StatsSection;