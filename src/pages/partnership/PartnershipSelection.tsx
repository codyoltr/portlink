import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FullPageLayout from '../../components/FullPageLayout';

const PartnershipSelection: React.FC = () => {
  const navigate = useNavigate();
  const [selectedPartnerships, setSelectedPartnerships] = useState<string[]>(['revenue-share']);

  const partnerships = [
    {
      id: 'revenue-share',
      icon: 'monetization_on',
      title: 'Gelir Paylaşımı',
      subtitle: 'Revenue Share',
      description: 'Tamamlanan projeler ve yönlendirmeler üzerinden komisyon bazlı iş birliği modeli.'
    },
    {
      id: 'regional-representation',
      icon: 'public',
      title: 'Bölgesel Temsilcilik',
      subtitle: 'Regional Representation',
      description: 'Belirli bir coğrafi bölge veya liman kümesinde Portlink\'in tek yetkili temsilcisi olun.'
    },
    {
      id: 'strategic-alliance',
      icon: 'hub',
      title: 'Stratejik İttifak',
      subtitle: 'Strategic Alliance',
      description: 'Ortak pazarlama faaliyetleri ve teknoloji entegrasyonu içeren derinlemesine iş birliği.'
    },
    {
      id: 'technical-service',
      icon: 'build_circle',
      title: 'Teknik Servis Partnerliği',
      subtitle: 'Technical Service Partnership',
      description: 'Ağımızdaki gemilere teknik servis, bakım ve onarım desteği sunan onaylı çözüm ortağı olun.'
    }
  ];

  const togglePartnership = (id: string) => {
    setSelectedPartnerships(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  return (
    <FullPageLayout>
      <header className="w-full py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center bg-white/50 dark:bg-slate-900/50 backdrop-blur-md sticky top-0 z-50 flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="bg-primary p-1.5 rounded-lg">
            <span className="material-icons-round text-white text-2xl">directions_boat</span>
          </div>
          <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Portlink</span>
        </div>
        <div className="flex items-center gap-4 text-sm font-medium text-slate-500">
          <span className="flex items-center gap-1">
            <span className="material-icons-round text-base">language</span> TR
          </span>
          <div className="h-4 w-[1px] bg-slate-300 dark:bg-slate-700"></div>
          <button className="hover:text-primary transition-colors">Yardım</button>
        </div>
      </header>

      <main className="flex-1 w-full flex flex-col items-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12 overflow-y-auto">
        <div className="max-w-4xl w-full">
          {/* Stepper */}
          <div className="mb-12">
            <div className="flex items-center justify-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center shadow-sm">
                  <span className="material-icons-round text-lg">check</span>
                </div>
                <span className="text-sm font-semibold text-slate-900 dark:text-white">İş Modeli Seç</span>
              </div>
              <div className="w-12 h-[2px] bg-slate-200 dark:bg-slate-700"></div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shadow-md">
                  <span className="text-sm">2</span>
                </div>
                <span className="text-sm font-semibold text-primary">Ortaklık Tipi</span>
              </div>
              <div className="w-12 h-[2px] bg-slate-200 dark:bg-slate-700"></div>
              <div className="flex items-center gap-2 opacity-40">
                <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
                  <span className="text-sm text-slate-500">3</span>
                </div>
                <span className="text-sm font-medium text-slate-500">Detaylar</span>
              </div>
            </div>
            <p className="text-center text-xs text-slate-400 mt-4 uppercase tracking-widest font-bold">Adım 2 / 4</p>
          </div>

          {/* Page Title */}
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4">
              İş Ortaklığı Modeli Seçin
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
              Birden fazla seçenek belirleyerek iş birliği kapsamınızı genişletebilirsiniz.
            </p>
          </div>

          {/* Partnership Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
            {partnerships.map((partnership) => (
              <button
                key={partnership.id}
                onClick={() => togglePartnership(partnership.id)}
                className={`group relative flex flex-col p-6 rounded-xl text-left transition-all duration-300 ${
                  selectedPartnerships.includes(partnership.id)
                    ? 'bg-white dark:bg-slate-800 border-2 border-primary ring-2 ring-primary/10 shadow-lg shadow-primary/5'
                    : 'bg-white/60 dark:bg-slate-800/60 border-2 border-slate-200 dark:border-slate-700 hover:border-primary/50'
                }`}
              >
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-colors ${
                  selectedPartnerships.includes(partnership.id)
                    ? 'bg-primary/10 dark:bg-primary/20 text-primary'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 group-hover:bg-primary/10 group-hover:text-primary'
                }`}>
                  <span className="material-icons-round text-2xl">{partnership.icon}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">{partnership.title}</h3>
                <span className={`text-xs font-medium mb-2 ${
                  selectedPartnerships.includes(partnership.id)
                    ? 'text-primary/70'
                    : 'text-slate-400'
                }`}>
                  {partnership.subtitle}
                </span>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                  {partnership.description}
                </p>
                <div className={`absolute top-4 right-4 transition-opacity ${
                  selectedPartnerships.includes(partnership.id)
                    ? 'opacity-100'
                    : 'opacity-0 group-hover:opacity-40'
                }`}>
                  <span className={`material-icons-round text-2xl ${
                    selectedPartnerships.includes(partnership.id)
                      ? 'text-primary'
                      : 'text-slate-300'
                  }`}>
                    check_circle
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col items-center gap-6">
            <button className="bg-primary hover:bg-primary/90 text-white font-bold py-4 px-20 rounded-xl text-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-primary/25">
              Devam Et
            </button>
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-sm font-medium transition-colors"
            >
              <span className="material-icons-round text-base">arrow_back</span>
              Önceki Adıma Dön
            </button>
          </div>
        </div>
      </main>

      <div className="fixed bottom-0 left-0 w-full h-1/4 pointer-events-none opacity-20 -z-10 bg-gradient-to-t from-primary/10 to-transparent"></div>

      <footer className="w-full py-6 sm:py-8 px-4 sm:px-6 lg:px-8 text-center text-slate-400 dark:text-slate-600 text-xs border-t border-slate-200 dark:border-slate-800 flex-shrink-0">
        <p>© 2024 Portlink Maritime Marketplace. Tüm hakları saklıdır.</p>
      </footer>
    </FullPageLayout>
  );
};

export default PartnershipSelection;
