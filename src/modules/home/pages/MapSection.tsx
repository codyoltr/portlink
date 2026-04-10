import React, { useMemo, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
// @ts-ignore
import L from 'leaflet';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

L.Marker.prototype.options.icon = DefaultIcon;

type RegionKey = 'all' | 'marmara' | 'ege' | 'akdeniz' | 'karadeniz';

type Agent = {
  id: number;
  name: string;
  lat: number;
  lng: number;
  type: string;
  contact: string;
  city: string;
  port: string;
  region: Exclude<RegionKey, 'all'>;
  jobs: number;
  score: number;
};

const agents: Agent[] = [
  {
    id: 1,
    name: 'İstanbul Merkez Acente',
    lat: 41.0082,
    lng: 28.9784,
    type: 'Ana Acente',
    contact: '+90 212 555 0000',
    city: 'İstanbul',
    port: 'Ambarlı / Haydarpaşa',
    region: 'marmara',
    jobs: 248,
    score: 4.9,
  },
  {
    id: 2,
    name: 'İzmir Liman Ofisi',
    lat: 38.4237,
    lng: 27.1428,
    type: 'Liman Acentesi',
    contact: '+90 232 555 1111',
    city: 'İzmir',
    port: 'Alsancak Limanı',
    region: 'ege',
    jobs: 196,
    score: 4.8,
  },
  {
    id: 3,
    name: 'Mersin Lojistik Merkez',
    lat: 36.8121,
    lng: 34.6415,
    type: 'Bölge Acentesi',
    contact: '+90 324 555 2222',
    city: 'Mersin',
    port: 'Mersin Limanı',
    region: 'akdeniz',
    jobs: 221,
    score: 4.9,
  },
  {
    id: 4,
    name: 'Antalya Şube',
    lat: 36.8969,
    lng: 30.7133,
    type: 'Şube',
    contact: '+90 242 555 3333',
    city: 'Antalya',
    port: 'Antalya Limanı',
    region: 'akdeniz',
    jobs: 118,
    score: 4.7,
  },
  {
    id: 5,
    name: 'Bursa Operasyon',
    lat: 40.1824,
    lng: 29.0671,
    type: 'Operasyon Merkezi',
    contact: '+90 224 555 4444',
    city: 'Bursa',
    port: 'Gemlik Limanı',
    region: 'marmara',
    jobs: 142,
    score: 4.6,
  },
  {
    id: 6,
    name: 'Samsun Kıyı Operasyon',
    lat: 41.2867,
    lng: 36.33,
    type: 'Liman Acentesi',
    contact: '+90 362 555 4545',
    city: 'Samsun',
    port: 'Samsun Limanı',
    region: 'karadeniz',
    jobs: 131,
    score: 4.7,
  },
  {
    id: 7,
    name: 'Trabzon Deniz Hizmetleri',
    lat: 41.0015,
    lng: 39.7178,
    type: 'Bölge Ofisi',
    contact: '+90 462 555 5656',
    city: 'Trabzon',
    port: 'Trabzon Limanı',
    region: 'karadeniz',
    jobs: 109,
    score: 4.5,
  },
];

const regionMeta = [
  {
    key: 'all' as RegionKey,
    label: 'Tümü',
    subtitle: 'Tüm limanlar',
    gradient: 'from-slate-900 to-slate-700',
  },
  {
    key: 'marmara' as RegionKey,
    label: 'Marmara',
    subtitle: 'İstanbul, Bursa, Yalova',
    gradient: 'from-blue-700 to-sky-500',
  },
  {
    key: 'ege' as RegionKey,
    label: 'Ege',
    subtitle: 'İzmir çevresi',
    gradient: 'from-cyan-600 to-blue-500',
  },
  {
    key: 'akdeniz' as RegionKey,
    label: 'Akdeniz',
    subtitle: 'Antalya, Mersin',
    gradient: 'from-indigo-700 to-blue-500',
  },
  {
    key: 'karadeniz' as RegionKey,
    label: 'Karadeniz',
    subtitle: 'Samsun, Trabzon',
    gradient: 'from-sky-700 to-cyan-500',
  },
];

const MapSection: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<RegionKey>('all');

  const filteredAgents = useMemo(() => {
    if (selectedRegion === 'all') return agents;
    return agents.filter((agent) => agent.region === selectedRegion);
  }, [selectedRegion]);

  const totalJobs = filteredAgents.reduce((sum, item) => sum + item.jobs, 0);
  const avgScore =
    filteredAgents.length > 0
      ? (filteredAgents.reduce((sum, item) => sum + item.score, 0) / filteredAgents.length).toFixed(1)
      : '0.0';

  return (
    <section className="w-full py-24 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-black uppercase tracking-[0.2em] mb-5">
            <span className="w-2 h-2 rounded-full bg-blue-600"></span>
            Bölgesel Ağ Yapısı
          </span>

          <h3 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">
            Denizlere ve Limanlara Göre Ayrılmış Acente Haritası
          </h3>
          <p className="text-slate-600 max-w-3xl mx-auto text-lg font-medium leading-8">
            Haritayı Marmara, Ege, Akdeniz ve Karadeniz bölgelerine ayırarak liman bazlı operasyon görünürlüğü sağladık.
            Böylece kullanıcılar doğrudan kendi kıyı hattına uygun acenteleri filtreleyebilir.
          </p>
        </div>

        {/* Bölge filtreleri */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4 mb-10">
          {regionMeta.map((region) => {
            const active = selectedRegion === region.key;
            const count =
              region.key === 'all'
                ? agents.length
                : agents.filter((item) => item.region === region.key).length;

            return (
              <button
                key={region.key}
                onClick={() => setSelectedRegion(region.key)}
                className={`relative overflow-hidden rounded-[1.75rem] border transition-all duration-300 text-left p-5 ${active
                    ? 'border-transparent shadow-xl -translate-y-1'
                    : 'border-slate-200 bg-white hover:border-blue-300 hover:shadow-md'
                  }`}
              >
                {active && (
                  <div className={`absolute inset-0 bg-gradient-to-br ${region.gradient} opacity-100`}></div>
                )}
                <div className="relative z-10">
                  <div className={`text-xs font-black uppercase tracking-[0.2em] ${active ? 'text-white/80' : 'text-blue-600'}`}>
                    {region.label}
                  </div>
                  <div className={`text-lg font-extrabold mt-2 ${active ? 'text-white' : 'text-slate-900'}`}>
                    {count} aktif nokta
                  </div>
                  <div className={`text-sm mt-1 font-medium ${active ? 'text-white/80' : 'text-slate-500'}`}>
                    {region.subtitle}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Özet kutuları */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
          <div className="bg-white rounded-[2rem] border border-slate-200 p-6 shadow-sm">
            <div className="text-xs font-black uppercase tracking-[0.2em] text-blue-600 mb-2">Seçili Bölge</div>
            <div className="text-3xl font-black text-slate-900">
              {regionMeta.find((item) => item.key === selectedRegion)?.label}
            </div>
          </div>

          <div className="bg-white rounded-[2rem] border border-slate-200 p-6 shadow-sm">
            <div className="text-xs font-black uppercase tracking-[0.2em] text-blue-600 mb-2">Toplam İş Hacmi</div>
            <div className="text-3xl font-black text-slate-900">{totalJobs}+</div>
          </div>

          <div className="bg-white rounded-[2rem] border border-slate-200 p-6 shadow-sm">
            <div className="text-xs font-black uppercase tracking-[0.2em] text-blue-600 mb-2">Ortalama Puan</div>
            <div className="text-3xl font-black text-slate-900">{avgScore} / 5</div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          {/* Sol taraf: Harita */}
          <div className="xl:col-span-8">
            <div className="w-full h-[560px] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white relative z-0">
              <MapContainer
                center={[39.0, 35.0]}
                zoom={6}
                scrollWheelZoom={false}
                className="w-full h-full z-0"
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                />

                {filteredAgents.map((agent) => (
                  <Marker key={agent.id} position={[agent.lat, agent.lng]}>
                    <Popup className="rounded-xl">
                      <div className="p-1 min-w-[230px]">
                        <h4 className="font-bold text-slate-900 mb-1 text-base">{agent.name}</h4>

                        <div className="flex flex-wrap gap-2 mb-3">
                          <span className="inline-block px-2 py-0.5 bg-blue-100 text-blue-700 text-[10px] uppercase font-bold rounded">
                            {agent.type}
                          </span>
                          <span className="inline-block px-2 py-0.5 bg-slate-100 text-slate-700 text-[10px] uppercase font-bold rounded">
                            {agent.port}
                          </span>
                        </div>

                        <div className="space-y-2 text-sm text-slate-600 font-medium">
                          <div className="flex items-center justify-between bg-slate-50 p-2 rounded-lg border border-slate-100">
                            <span>İl</span>
                            <span className="font-bold text-slate-900">{agent.city}</span>
                          </div>

                          <div className="flex items-center justify-between bg-slate-50 p-2 rounded-lg border border-slate-100">
                            <span>Tamamlanan İş</span>
                            <span className="font-bold text-slate-900">{agent.jobs}</span>
                          </div>

                          <div className="flex items-center justify-between bg-slate-50 p-2 rounded-lg border border-slate-100">
                            <span>Puan</span>
                            <span className="font-bold text-amber-500">{agent.score} ★</span>
                          </div>

                          <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-lg border border-slate-100">
                            <span className="material-icons-round text-blue-600 text-[16px]">phone</span>
                            {agent.contact}
                          </div>
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          </div>

          {/* Sağ taraf: liman/il kartları */}
          <div className="xl:col-span-4">
            <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm h-full p-6">
              <div className="mb-6">
                <div className="text-xs font-black uppercase tracking-[0.2em] text-blue-600 mb-2">
                  Liman Bazlı Liste
                </div>
                <h4 className="text-2xl font-black text-slate-900">
                  Seçili Bölgedeki Aktif Noktalar
                </h4>
                <p className="text-sm text-slate-500 font-medium mt-2 leading-6">
                  Kullanıcı önce deniz bölgesini seçer, ardından il ve liman bazlı en uygun acenteleri görür.
                </p>
              </div>

              <div className="space-y-4 max-h-[430px] overflow-y-auto pr-1">
                {filteredAgents.map((agent) => (
                  <div
                    key={agent.id}
                    className="rounded-[1.5rem] border border-slate-200 p-4 hover:border-blue-300 hover:shadow-md transition-all bg-slate-50/60"
                  >
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <h5 className="text-base font-extrabold text-slate-900">{agent.name}</h5>
                        <p className="text-sm text-slate-500 font-medium">
                          {agent.city} • {agent.port}
                        </p>
                      </div>
                      <div className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-black">
                        {agent.score} ★
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div className="rounded-xl bg-white border border-slate-200 p-3">
                        <div className="text-[10px] uppercase tracking-widest text-slate-500 font-black mb-1">Tip</div>
                        <div className="text-sm font-bold text-slate-900">{agent.type}</div>
                      </div>
                      <div className="rounded-xl bg-white border border-slate-200 p-3">
                        <div className="text-[10px] uppercase tracking-widest text-slate-500 font-black mb-1">İş Sayısı</div>
                        <div className="text-sm font-bold text-slate-900">{agent.jobs}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-slate-600 bg-white border border-slate-200 rounded-xl p-3">
                      <span className="material-icons-round text-blue-600 text-[18px]">phone</span>
                      {agent.contact}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapSection;