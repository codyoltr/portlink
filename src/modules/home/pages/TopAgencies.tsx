import { Trophy, Star, ShieldCheck, Ship, MapPin } from 'lucide-react';

const topAgencies = [
  {
    id: 1,
    name: "Atlas Marine A.Ş.",
    location: "Ambarlı Limanı, İstanbul",
    rating: 4.9,
    jobsCompleted: 142,
    badge: "1. Kategori Birincisi",
    rankStr: "1",
    bgColor: "bg-gradient-to-br from-amber-50 to-amber-100/50",
    borderColor: "border-amber-200",
    badgeColor: "bg-amber-100 text-amber-800 border-amber-200",
    iconColor: "text-amber-500",
    rankBg: "bg-amber-400"
  },
  {
    id: 2,
    name: "Ege Lojistik",
    location: "Aliağa Limanı, İzmir",
    rating: 4.8,
    jobsCompleted: 98,
    badge: "Bölgesel Lider",
    rankStr: "2",
    bgColor: "bg-gradient-to-br from-slate-50 to-slate-100/50",
    borderColor: "border-slate-300",
    badgeColor: "bg-slate-200 text-slate-800 border-slate-300",
    iconColor: "text-slate-500",
    rankBg: "bg-slate-400"
  },
  {
    id: 3,
    name: "Mersin Denizcilik",
    location: "Mersin Limanı, Mersin",
    rating: 4.8,
    jobsCompleted: 85,
    badge: "Yükselen Acenta",
    rankStr: "3",
    bgColor: "bg-gradient-to-br from-orange-50 to-orange-100/50",
    borderColor: "border-orange-200",
    badgeColor: "bg-orange-100 text-orange-800 border-orange-200",
    iconColor: "text-orange-500",
    rankBg: "bg-orange-400"
  }
];

export default function TopAgencies() {
  return (
    <section className="w-full pb-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight flex justify-center items-center gap-3">
            <Trophy className="w-10 h-10 text-amber-500" />
            Ayın En İyileri
          </h2>
          <p className="mt-4 text-slate-600 font-medium text-lg max-w-2xl mx-auto">
            Gemi operasyonlarında gösterdikleri üstün başarı ve yüksek müşteri memnuniyeti ile öne çıkan en iyi 3 acentamız.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 px-0 sm:px-4">
          {topAgencies.map((agency) => (
            <div 
              key={agency.id} 
              className={`relative rounded-[2rem] p-8 border hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group cursor-pointer ${agency.bgColor} ${agency.borderColor}`}
            >
              <div className={`absolute -top-6 -right-6 w-16 h-16 rounded-[1.25rem] transform rotate-12 group-hover:rotate-0 transition-transform duration-300 flex items-center justify-center text-white font-black text-2xl shadow-lg border-4 border-white ${agency.rankBg}`}>
                #{agency.rankStr}
              </div>

              <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider mb-6 border ${agency.badgeColor} shadow-sm`}>
                <ShieldCheck className="w-3.5 h-3.5" />
                {agency.badge}
              </div>

              <h4 className="text-2xl font-black text-slate-900 mb-3 group-hover:text-primary transition-colors">
                {agency.name}
              </h4>

              <div className="flex items-center gap-2 text-slate-600 font-bold text-sm mb-10">
                <MapPin className="w-4 h-4 text-slate-400" />
                {agency.location}
              </div>

              <div className="flex items-center justify-between border-t border-black/10 pt-6 mt-auto">
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1">Operasyon</span>
                  <div className="flex items-center gap-2 text-slate-800 font-black">
                    <Ship className={`w-5 h-5 ${agency.iconColor}`} />
                    <span className="text-2xl">{agency.jobsCompleted}</span>
                  </div>
                </div>

                <div className="w-px h-10 bg-black/10"></div>

                <div className="flex flex-col items-end">
                  <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1">Menuniyet</span>
                  <div className="flex items-center gap-1.5 text-slate-800 font-black">
                    <span className="text-2xl">{agency.rating}</span>
                    <Star className={`w-5 h-5 fill-amber-400 text-amber-400`} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
