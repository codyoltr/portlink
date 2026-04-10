import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MapPin,
  Users,
  Globe2,
  ArrowUpRight,
  ShieldCheck,
  Trophy,
  Star,
  BriefcaseBusiness,
  BadgeCheck,
} from 'lucide-react';
import TurkeyMap from '../../../assets/turkiyeMap.png';

type Agency = {
  id: number;
  name: string;
  region: string;
  jobs: number;
  score: number;
  responseRate: number;
  status: string;
};

const topAgencies: Agency[] = [
  {
    id: 1,
    name: 'Marmara Elite Agency',
    region: 'İstanbul / Marmara',
    jobs: 326,
    score: 4.9,
    responseRate: 98,
    status: 'Premium',
  },
  {
    id: 2,
    name: 'Ege Port Services',
    region: 'İzmir / Ege',
    jobs: 301,
    score: 4.9,
    responseRate: 97,
    status: 'Premium',
  },
  {
    id: 3,
    name: 'Akdeniz Marine Ops',
    region: 'Mersin / Akdeniz',
    jobs: 285,
    score: 4.8,
    responseRate: 96,
    status: 'Premium',
  },
];

const StatsSection = () => {
  const navigate = useNavigate();

  const handleLimanClick = () => {
    window.open(
      'https://ticaret.gov.tr/gumruk-islemleri/dijital-gumruk-uygulamalari/edi-xml-referans-mesajlari/liman-kodlariturkiye-limanlari',
      '_blank'
    );
  };

  const handleContactNavigate = () => {
    window.scrollTo(0, 0);
    navigate('/contact');
  };

  const averageScore = useMemo(() => {
    return (
      topAgencies.reduce((acc, item) => acc + item.score, 0) / topAgencies.length
    ).toFixed(1);
  }, []);

  const averageResponseRate = useMemo(() => {
    return Math.round(
      topAgencies.reduce((acc, item) => acc + item.responseRate, 0) / topAgencies.length
    );
  }, []);

  const totalJobs = useMemo(() => {
    return topAgencies.reduce((acc, item) => acc + item.jobs, 0);
  }, []);

  return (
    <div className="w-full py-24 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-6">
        {/* ÜST GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center mb-20">
          {/* SOL TARAF */}
          <div className="lg:col-span-7 relative group">
            <div className="absolute -inset-4 bg-blue-500/5 rounded-[3rem] blur-2xl group-hover:bg-blue-500/10 transition-colors duration-700"></div>

            <div className="relative bg-white border border-slate-100 rounded-[3rem] p-10 shadow-2xl shadow-blue-900/5 z-10 overflow-hidden">
              <div className="mb-10">
                <span className="text-blue-600 font-bold text-xs uppercase tracking-widest mb-2 block">
                  Lojistik Ağımız
                </span>
                <h3 className="text-3xl font-black text-slate-900 tracking-tight leading-tight">
                  Operasyonel Kapsama Alanı
                </h3>
                <p className="text-slate-500 text-base mt-2 max-w-lg">
                  Türkiye'nin stratejik tüm kıyı şeridinde yerel ekiplerimizle saniyeler içinde aksiyon alıyoruz.
                </p>
              </div>

              <div className="relative aspect-[16/10] flex items-center justify-center">
                <img
                  src={TurkeyMap}
                  alt="Türkiye Haritası"
                  className="w-full h-auto object-contain p-2 drop-shadow-[0_20px_40px_rgba(30,58,138,0.1)] transition-transform duration-700 group-hover:scale-[1.02]"
                />

                <div className="absolute top-[32%] left-[18%]">
                  <div className="w-6 h-6 bg-blue-600/20 rounded-full animate-ping absolute"></div>
                  <div className="relative w-3.5 h-3.5 bg-blue-600 rounded-full border-2 border-white shadow-lg"></div>
                </div>

                <div className="absolute bottom-[42%] left-[10%]">
                  <div className="w-6 h-6 bg-blue-500/20 rounded-full animate-ping absolute"></div>
                  <div className="relative w-3 h-3 bg-blue-500 rounded-full border-2 border-white shadow-md"></div>
                </div>

                <div className="absolute bottom-[25%] right-[48%]">
                  <div className="w-6 h-6 bg-blue-600/20 rounded-full animate-ping absolute"></div>
                  <div className="relative w-3.5 h-3.5 bg-blue-600 rounded-full border-2 border-white shadow-lg"></div>
                </div>

                <div className="absolute bottom-[27%] right-[68%]">
                  <div className="w-6 h-6 bg-blue-600/20 rounded-full animate-ping absolute"></div>
                  <div className="relative w-3.5 h-3.5 bg-blue-600 rounded-full border-2 border-white shadow-lg"></div>
                </div>

                <div className="absolute top-[31%] right-[35%]">
                  <div className="w-6 h-6 bg-blue-500/20 rounded-full animate-ping absolute"></div>
                  <div className="relative w-3 h-3 bg-blue-500 rounded-full border-2 border-white shadow-md"></div>
                </div>

                <div className="absolute top-[27%] right-[65%]">
                  <div className="w-6 h-6 bg-blue-500/20 rounded-full animate-ping absolute"></div>
                  <div className="relative w-3 h-3 bg-blue-500 rounded-full border-2 border-white shadow-md"></div>
                </div>
              </div>
            </div>
          </div>

          {/* SAĞ TARAF */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="h-[2px] w-8 bg-blue-600"></div>
                <span className="text-blue-600 font-bold text-xs uppercase tracking-[0.2em]">
                  PortLink Ekosistemi
                </span>
              </div>
              <h2 className="text-4xl xl:text-5xl font-black text-slate-950 leading-tight tracking-tight">
                Dijital <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  Denizcilik Ağı
                </span>
              </h2>
            </div>

            <button
              onClick={handleLimanClick}
              className="group bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-blue-900/5 hover:-translate-y-1 transition-all duration-300 flex items-center gap-6 text-left"
            >
              <div className="w-16 h-16 shrink-0 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                <MapPin size={28} />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-xl text-slate-950">Limanlar Rehberi</h4>
                <p className="text-sm text-slate-500 font-medium">
                  Bakanlık onaylı güncel veri ve kodlar.
                </p>
              </div>
              <ArrowUpRight
                className="text-slate-200 group-hover:text-blue-600 transition-all"
                size={20}
              />
            </button>

            <button
              onClick={handleContactNavigate}
              className="group bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-orange-900/5 hover:-translate-y-1 transition-all duration-300 flex items-center gap-6 text-left"
            >
              <div className="w-16 h-16 shrink-0 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center group-hover:bg-orange-500 group-hover:text-white transition-all duration-500">
                <Users size={28} />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-xl text-slate-950">İş Ortaklığı</h4>
                <p className="text-sm text-slate-500 font-medium">
                  Servis ağımıza hemen dahil olun.
                </p>
              </div>
              <ArrowUpRight
                className="text-slate-200 group-hover:text-orange-500 transition-all"
                size={20}
              />
            </button>

            <div className="mt-2 p-8 rounded-[2.5rem] bg-slate-950 text-white relative overflow-hidden group/card shadow-2xl">
              <div className="absolute top-0 right-0 w-40 h-40 bg-blue-600/20 blur-[80px] rounded-full"></div>

              <div className="relative z-10 flex flex-col gap-5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-md border border-white/5 shadow-inner">
                    <Globe2 size={24} className="text-blue-400" />
                  </div>
                  <h4 className="font-bold text-2xl tracking-tight">Uluslararası Hizmet</h4>
                </div>

                <p className="text-slate-400 text-base leading-relaxed max-w-[400px]">
                  Tüm çözüm ortaklarımız{' '}
                  <span className="text-white font-semibold">IMO ve yerel mevzuat</span>{' '}
                  standartlarına tam uyumlu, sertifikalı hizmet sunar.
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

        {/* TOP 3 ACENTE */}
        <section className="mt-4">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-black uppercase tracking-[0.2em] mb-5">
              <Trophy size={14} />
              Puanlama Sistemi
            </span>
            <h3 className="text-4xl font-black text-slate-950 tracking-tight">
              Top 3 İş Yapan Acente
            </h3>
            <p className="text-slate-600 text-lg max-w-3xl mx-auto mt-4 leading-8">
              En yüksek iş hacmi, güçlü kullanıcı puanı ve hızlı geri dönüş performansına sahip
              en başarılı 3 acenteyi öne çıkarıyoruz.
            </p>
          </div>

          {/* Özet kartları */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
            <div className="bg-white rounded-[2rem] border border-slate-200 p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <BriefcaseBusiness size={22} />
                </div>
                <div className="text-xs font-black uppercase tracking-[0.2em] text-blue-600">
                  Toplam İş
                </div>
              </div>
              <div className="text-3xl font-black text-slate-900">{totalJobs}+</div>
            </div>

            <div className="bg-white rounded-[2rem] border border-slate-200 p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  <Star size={22} />
                </div>
                <div className="text-xs font-black uppercase tracking-[0.2em] text-amber-600">
                  Ortalama Puan
                </div>
              </div>
              <div className="text-3xl font-black text-slate-900">{averageScore}/5</div>
            </div>

            <div className="bg-white rounded-[2rem] border border-slate-200 p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <BadgeCheck size={22} />
                </div>
                <div className="text-xs font-black uppercase tracking-[0.2em] text-emerald-600">
                  Geri Dönüş Oranı
                </div>
              </div>
              <div className="text-3xl font-black text-slate-900">%{averageResponseRate}</div>
            </div>
          </div>

          {/* TOP 3 KARTLARI */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {topAgencies.map((agency, index) => {
              const styles = [
                {
                  badge: 'bg-amber-100 text-amber-700',
                  ring: 'ring-amber-200',
                  glow: 'from-amber-400/20 to-yellow-300/10',
                  label: '1. Sıra',
                },
                {
                  badge: 'bg-slate-200 text-slate-700',
                  ring: 'ring-slate-200',
                  glow: 'from-slate-300/30 to-slate-100/10',
                  label: '2. Sıra',
                },
                {
                  badge: 'bg-orange-100 text-orange-700',
                  ring: 'ring-orange-200',
                  glow: 'from-orange-300/20 to-amber-100/10',
                  label: '3. Sıra',
                },
              ][index];

              return (
                <div
                  key={agency.id}
                  className={`relative overflow-hidden bg-white rounded-[2.5rem] border border-slate-200 p-8 shadow-sm hover:shadow-xl transition-all duration-300 ring-1 ${styles.ring}`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${styles.glow}`}></div>

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-6">
                      <span
                        className={`px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-[0.2em] ${styles.badge}`}
                      >
                        {styles.label}
                      </span>
                      <div className="text-amber-500 font-black text-sm flex items-center gap-1">
                        <Star size={14} fill="currentColor" />
                        {agency.score}
                      </div>
                    </div>

                    <h4 className="text-2xl font-black text-slate-950 mb-2">{agency.name}</h4>
                    <p className="text-slate-500 font-medium mb-6">{agency.region}</p>

                    <div className="grid grid-cols-2 gap-4 mb-5">
                      <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4">
                        <div className="text-[10px] uppercase tracking-widest font-black text-slate-500 mb-1">
                          Tamamlanan İş
                        </div>
                        <div className="text-xl font-black text-slate-900">{agency.jobs}</div>
                      </div>
                      <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4">
                        <div className="text-[10px] uppercase tracking-widest font-black text-slate-500 mb-1">
                          Dönüş Oranı
                        </div>
                        <div className="text-xl font-black text-slate-900">%{agency.responseRate}</div>
                      </div>
                    </div>

                    <div className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-blue-50 text-blue-700 text-xs font-black uppercase tracking-[0.18em]">
                      <BadgeCheck size={14} />
                      {agency.status}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};

export default StatsSection;