import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
// @ts-ignore
import L from 'leaflet';

// Fix for default marker icons in react-leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
});

L.Marker.prototype.options.icon = DefaultIcon;

const agents = [
  { id: 1, name: 'İstanbul Merkez Acente', lat: 41.0082, lng: 28.9784, type: 'Ana Acente', contact: '+90 212 555 0000' },
  { id: 2, name: 'İzmir Liman Ofisi', lat: 38.4237, lng: 27.1428, type: 'Liman Acentesi', contact: '+90 232 555 1111' },
  { id: 3, name: 'Mersin Lojistik Merkez', lat: 36.8121, lng: 34.6415, type: 'Bölge Acentesi', contact: '+90 324 555 2222' },
  { id: 4, name: 'Antalya Şube', lat: 36.8969, lng: 30.7133, type: 'Şube', contact: '+90 242 555 3333' },
  { id: 5, name: 'Bursa Operasyon', lat: 40.1824, lng: 29.0671, type: 'Operasyon Merkezi', contact: '+90 224 555 4444' },
];

const MapSection: React.FC = () => {
  return (
    <section className="w-full py-24 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-black text-slate-900 mb-4 tracking-tight uppercase">
            Acente Ağımız
          </h3>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg font-medium">
            Türkiye'nin dört bir yanındaki acentelerimizle operasyonlarınızı kesintisiz ve güvenilir bir şekilde yönetin.
          </p>
        </div>

        <div className="w-full h-[500px] rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white relative z-0">
          {/* @ts-ignore */}
          <MapContainer 
            center={[39.0, 35.0]} 
            zoom={6} 
            scrollWheelZoom={false} 
            className="w-full h-full z-0"
          >
            {/* @ts-ignore */}
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            />
            {agents.map((agent) => (
              // @ts-ignore
              <Marker key={agent.id} position={[agent.lat, agent.lng]}>
                {/* @ts-ignore */}
                <Popup className="rounded-xl">
                  <div className="p-1 min-w-[200px]">
                    <h4 className="font-bold text-slate-900 mb-1 text-base">{agent.name}</h4>
                    <span className="inline-block px-2 py-0.5 bg-blue-100 text-blue-700 text-[10px] uppercase font-bold rounded mb-3">
                      {agent.type}
                    </span>
                    <div className="flex items-center gap-2 text-sm text-slate-600 font-medium bg-slate-50 p-2 rounded-lg border border-slate-100">
                      <span className="material-icons-round text-blue-600 text-[16px]">phone</span>
                      {agent.contact}
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </section>
  );
};

export default MapSection;
