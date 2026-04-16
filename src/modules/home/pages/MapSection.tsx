import React from 'react';
import AgencyMap from '../../../components/ui/AgencyMap';

const MapSection: React.FC = () => {
  return (
    <section className="w-full py-24 bg-slate-50 border-t border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-black text-slate-900 mb-4 tracking-tight uppercase">
            ÜYE ACENTA AĞI HARİTAMIZ
          </h3>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg font-medium">
            Türkiye'nin dört bir yanındaki acentelerimizle operasyonlarınızı kesintisiz ve güvenilir bir şekilde yönetin.
          </p>
        </div>

        <div className="w-full relative z-0">
          <AgencyMap />
        </div>
      </div>
    </section>
  );
};

export default MapSection;
