import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Users, Ship, Map } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const REGION_MAP: Record<string, string> = {
  // AKDENİZ (8 İl)
  'Adana': 'AKDENIZ', 'Osmaniye': 'AKDENIZ', 'Hatay': 'AKDENIZ', 'Kahramanmaraş': 'AKDENIZ', 'Mersin': 'AKDENIZ', 'İçel': 'AKDENIZ', 'Antalya': 'AKDENIZ', 'Isparta': 'AKDENIZ', 'Burdur': 'AKDENIZ',
  // KARADENİZ (18 İl)
  'Artvin': 'KARADENIZ', 'Rize': 'KARADENIZ', 'Trabzon': 'KARADENIZ', 'Giresun': 'KARADENIZ', 'Ordu': 'KARADENIZ', 'Samsun': 'KARADENIZ', 'Sinop': 'KARADENIZ', 'Kastamonu': 'KARADENIZ', 'Bartın': 'KARADENIZ', 'Zonguldak': 'KARADENIZ', 'Düzce': 'KARADENIZ', 'Bolu': 'KARADENIZ', 'Karabük': 'KARADENIZ', 'Amasya': 'KARADENIZ', 'Tokat': 'KARADENIZ', 'Çorum': 'KARADENIZ', 'Bayburt': 'KARADENIZ', 'Gümüşhane': 'KARADENIZ',
  // EGE (8 İl)
  'İzmir': 'EGE', 'Manisa': 'EGE', 'Aydın': 'EGE', 'Denizli': 'EGE', 'Muğla': 'EGE', 'Uşak': 'EGE', 'Afyonkarahisar': 'EGE', 'Afyon': 'EGE', 'Kütahya': 'EGE',
  // GÜNEYDOĞU ANADOLU (9 İl)
  'Gaziantep': 'GUNEYDOGU_ANADOLU', 'Şanlıurfa': 'GUNEYDOGU_ANADOLU', 'Diyarbakır': 'GUNEYDOGU_ANADOLU', 'Mardin': 'GUNEYDOGU_ANADOLU', 'Batman': 'GUNEYDOGU_ANADOLU', 'Siirt': 'GUNEYDOGU_ANADOLU', 'Şırnak': 'GUNEYDOGU_ANADOLU', 'Kilis': 'GUNEYDOGU_ANADOLU', 'Adıyaman': 'GUNEYDOGU_ANADOLU',
  // DOĞU ANADOLU (14 İl)
  'Erzurum': 'DOGU_ANADOLU', 'Erzincan': 'DOGU_ANADOLU', 'Kars': 'DOGU_ANADOLU', 'Ağrı': 'DOGU_ANADOLU', 'Iğdır': 'DOGU_ANADOLU', 'Ardahan': 'DOGU_ANADOLU', 'Van': 'DOGU_ANADOLU', 'Hakkari': 'DOGU_ANADOLU', 'Muş': 'DOGU_ANADOLU', 'Bitlis': 'DOGU_ANADOLU', 'Bingöl': 'DOGU_ANADOLU', 'Tunceli': 'DOGU_ANADOLU', 'Malatya': 'DOGU_ANADOLU', 'Elazığ': 'DOGU_ANADOLU',
  // İÇ ANADOLU (13 İl)
  'Ankara': 'IC_ANADOLU', 'Konya': 'IC_ANADOLU', 'Eskişehir': 'IC_ANADOLU', 'Kayseri': 'IC_ANADOLU', 'Sivas': 'IC_ANADOLU', 'Kırıkkale': 'IC_ANADOLU', 'Aksaray': 'IC_ANADOLU', 'Kırşehir': 'IC_ANADOLU', 'Niğde': 'IC_ANADOLU', 'Nevşehir': 'IC_ANADOLU', 'Yozgat': 'IC_ANADOLU', 'Çankırı': 'IC_ANADOLU', 'Karaman': 'IC_ANADOLU',
  // MARMARA (11 İl)
  'İstanbul': 'MARMARA', 'Edirne': 'MARMARA', 'Kırklareli': 'MARMARA', 'Tekirdağ': 'MARMARA', 'Çanakkale': 'MARMARA', 'Kocaeli': 'MARMARA', 'Yalova': 'MARMARA', 'Sakarya': 'MARMARA', 'Bilecik': 'MARMARA', 'Bursa': 'MARMARA', 'Balıkesir': 'MARMARA'
};

const REGION_STATS: Record<string, { id: string; name: string; agencies: number; ships: number; color: string; center: [number, number] }> = {
  MARMARA: { id: 'MARMARA', name: 'Marmara Bölgesi', agencies: 124, ships: 45, color: '#1d4ed8', center: [40.5, 28.5] }, // Tema Mavisi Koyu (Coastal)
  EGE: { id: 'EGE', name: 'Ege Bölgesi', agencies: 86, ships: 24, color: '#3b82f6', center: [38.5, 28.2] }, // Tema Mavisi Açık (Coastal)
  AKDENIZ: { id: 'AKDENIZ', name: 'Akdeniz Bölgesi', agencies: 92, ships: 30, color: '#0369a1', center: [37.2, 33.0] }, // Koyu Gök Mavisi (Coastal)
  KARADENIZ: { id: 'KARADENIZ', name: 'Karadeniz Bölgesi', agencies: 45, ships: 15, color: '#0f766e', center: [41.0, 37.0] }, // Deniz Yeşili/Mavi (Coastal)
  IC_ANADOLU: { id: 'IC_ANADOLU', name: 'İç Anadolu Bölgesi', agencies: 14, ships: 0, color: '#64748b', center: [39.0, 33.5] }, // Gri-Mavi Orta (Inland)
  DOGU_ANADOLU: { id: 'DOGU_ANADOLU', name: 'Doğu Anadolu Bölgesi', agencies: 5, ships: 0, color: '#94a3b8', center: [39.5, 41.5] }, // Gri-Mavi Açık (Inland)
  GUNEYDOGU_ANADOLU: { id: 'GUNEYDOGU_ANADOLU', name: 'Güneydoğu Anadolu Bölgesi', agencies: 12, ships: 0, color: '#475569', center: [37.3, 40.0] } // Gri-Mavi Koyu (Inland)
};

const createRegionBadgeIcon = (agencies: number, isActive: boolean) => {
  return L.divIcon({
    className: 'custom-region-badge',
    html: `
      <div class="relative flex items-center justify-center p-2 min-w-[36px] h-8 bg-white/95 rounded-full shadow-lg border border-slate-200 transition-all duration-300 ease-in-out ${isActive ? 'scale-125 z-50 ring-4 ring-primary/30' : 'scale-100 z-10 hover:scale-110'} backdrop-blur-md cursor-pointer">
        <span class="text-xs font-bold text-slate-800 flex items-center gap-1.5">
          <svg class="w-3.5 h-3.5 text-primary" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          ${agencies}
        </span>
      </div>
    `,
    iconSize: [40, 32],
    iconAnchor: [20, 16],
  });
};

export default function AgencyMap() {
  const [geoData, setGeoData] = useState<any>(null);
  const [activeRegionId, setActiveRegionId] = useState<string | null>(null);

  useEffect(() => {
    fetch('/tr-cities.json')
      .then(res => res.json())
      .then(data => setGeoData(data))
      .catch(err => console.error("Could not load borders:", err));
  }, []);

  const getFeatureRegion = (feature: any) => {
    const cityName = feature.properties.name === 'İçel' ? 'Mersin' : feature.properties.name;
    return REGION_MAP[cityName] || 'MARMARA';
  };

  const styleFeature = (feature: any) => {
    const regionId = getFeatureRegion(feature);
    const regionInfo = REGION_STATS[regionId];
    return {
      fillColor: regionInfo.color,
      weight: 1.5,
      opacity: 1,
      color: activeRegionId === regionId ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.4)',
      fillOpacity: activeRegionId === regionId ? 0.85 : 0.65
    };
  };

  const onEachFeature = (feature: any, layer: any) => {
    const regionId = getFeatureRegion(feature);
    
    layer.on({
      mouseover: () => setActiveRegionId(regionId),
      mouseout: () => setActiveRegionId(null)
    });
    
    // Yalnızca bölge vurgusu yapıp gereksiz ufak il tooltiplerini kaldırıyoruz 
    // veya dilerseniz sadece isim verebiliriz ancak bölge rozeti daha şık.
  };

  const activeStats = activeRegionId ? REGION_STATS[activeRegionId] : null;

  return (
    <div className="relative w-full aspect-[4/3] lg:aspect-[16/9] max-w-6xl mx-auto rounded-3xl overflow-hidden shadow-xl border border-slate-200 z-0 bg-blue-50/50">
      <MapContainer 
        center={[39.2, 35.0]} 
        zoom={6.3} 
        style={{ height: '100%', width: '100%', zIndex: 0 }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution=""
          url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"
        />

        {geoData && (
          <GeoJSON 
            key={activeRegionId || 'default'}
            data={geoData} 
            style={styleFeature} 
            onEachFeature={onEachFeature} 
          />
        )}

        {/* Bölge Özel Pop-up Badge'leri */}
        {Object.values(REGION_STATS).map((region) => (
          <Marker 
            key={region.id} 
            position={region.center}
            icon={createRegionBadgeIcon(region.agencies, activeRegionId === region.id)}
            // Markers act dynamically when hovered matching the active region
            eventHandlers={{
              mouseover: () => setActiveRegionId(region.id),
              mouseout: () => setActiveRegionId(null)
            }}
          />
        ))}

      </MapContainer>

      {/* Floating Info Overlay for Active Region */}
      <AnimatePresence>
        {activeStats && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-6 right-6 z-20 pointer-events-none"
          >
            <div className="bg-white/95 backdrop-blur-xl border border-slate-100 p-5 rounded-2xl shadow-2xl min-w-[280px]">
              <div className="flex items-center gap-3 mb-4 border-b border-slate-100 pb-3">
                 <div className="w-4 h-4 rounded-full shadow-inner border border-white" style={{ backgroundColor: activeStats.color }} />
                 <h3 className="text-lg font-extrabold text-slate-800 tracking-tight">{activeStats.name}</h3>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[11px] text-slate-500 font-bold mb-1 uppercase tracking-wider flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-primary"/> Acentalar
                  </span>
                  <span className="text-3xl font-black text-slate-800">{activeStats.agencies}</span>
                </div>
                <div className="h-10 w-px bg-slate-200" />
                <div className="flex flex-col items-end">
                  <span className="text-[11px] text-slate-500 font-bold mb-1 uppercase tracking-wider flex items-center gap-1.5">
                    <Ship className="w-3.5 h-3.5 text-emerald-600"/> Gemiler
                  </span>
                  <span className="text-3xl font-black text-slate-800">{activeStats.ships}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!activeStats && (
        <AnimatePresence>
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="absolute top-6 left-6 z-10 pointer-events-none"
          >
            <div className="bg-white/90 backdrop-blur-md px-5 py-3 rounded-2xl border border-slate-200 text-slate-700 text-sm font-semibold flex items-center gap-3 shadow-lg">
               <div className="bg-primary/10 p-1.5 rounded-full"><Map className="w-4 h-4 text-primary" /></div>
               Detayları görmek için bölgelerin üzerinde gezinin
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}
