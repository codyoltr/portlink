import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FullPageLayout from '@/features/shell/components/FullPageLayout';

const TechnicalExpertSelection: React.FC = () => {
  const navigate = useNavigate();
  const [selectedExpertise, setSelectedExpertise] = useState<string[]>(['survey']);

  const expertiseAreas = [
    { id: 'survey', icon: 'visibility', title: 'Sörvey (Survey)' },
    { id: 'inspection', icon: 'fact_check', title: 'Gemi Denetim (Inspection)' },
    { id: 'consulting', icon: 'psychology', title: 'Teknik Danışmanlık' },
    { id: 'project-management', icon: 'assignment_turned_in', title: 'Proje Yönetimi' },
    { id: 'supervision', icon: 'construction', title: 'Yeni İnşa Gözetim' },
    { id: 'damage-assessment', icon: 'report_problem', title: 'Hasar Ekspertizi' }
  ];

  const toggleExpertise = (id: string) => {
    setSelectedExpertise(prev =>
      prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]
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

      <main className="flex-1 w-full flex flex-col items-center justify-start px-4 sm:px-6 lg:px-8 py-8 sm:py-12 overflow-y-auto">
        <div className="max-w-4xl w-full">
          {/* Stepper */}
          <div className="mb-12 flex justify-center items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white">
                <span className="material-icons-round text-sm">check</span>
              </div>
              <span className="text-sm font-semibold text-slate-900 dark:text-white">İş Modeli Seç</span>
            </div>
            <div className="w-12 h-[2px] bg-slate-200 dark:bg-slate-700"></div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white ring-4 ring-primary/20">
                <span className="text-sm font-bold">2</span>
              </div>
              <span className="text-sm font-bold text-primary">Uzmanlık Seç</span>
            </div>
            <div className="w-12 h-[2px] bg-slate-200 dark:bg-slate-700"></div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-500">
                <span className="text-sm font-bold">3</span>
              </div>
              <span className="text-sm font-medium text-slate-500">Detaylar</span>
            </div>
          </div>

          {/* Page Title */}
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-3">
              Teknik Uzmanlık Alanı Seç
            </h1>
            <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
              Hangi alanlarda teknik desteğe ihtiyacınız var? Birden fazla seçim yapabilirsiniz.
            </p>
          </div>

          {/* Expertise Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            {expertiseAreas.map((expertise) => (
              <button
                key={expertise.id}
                onClick={() => toggleExpertise(expertise.id)}
                className={`group relative flex flex-col items-center p-6 rounded-xl text-center transition-all duration-300 ${selectedExpertise.includes(expertise.id)
                    ? 'bg-white dark:bg-slate-800 border-2 border-primary ring-2 ring-primary/10 shadow-lg shadow-primary/5'
                    : 'bg-white/60 dark:bg-slate-800/60 border-2 border-slate-200 dark:border-slate-700 hover:border-primary/50 hover:bg-white'
                  }`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 transition-colors ${selectedExpertise.includes(expertise.id)
                    ? 'bg-primary/10 dark:bg-primary/20 text-primary'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-500 group-hover:text-primary group-hover:bg-primary/10'
                  }`}>
                  <span className="material-icons-round text-2xl">{expertise.icon}</span>
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white">{expertise.title}</h3>
                <div className={`absolute top-3 right-3 transition-opacity ${selectedExpertise.includes(expertise.id) ? 'opacity-100' : 'opacity-0 group-hover:opacity-40'
                  }`}>
                  <span className={`material-icons-round text-xl ${selectedExpertise.includes(expertise.id) ? 'text-primary' : 'text-primary'
                    }`}>
                    {selectedExpertise.includes(expertise.id) ? 'check_circle' : 'radio_button_unchecked'}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col items-center gap-2 mt-4">
            {selectedExpertise.length === 0 && (
              <span className="text-sm font-semibold text-rose-500 animate-pulse">Lütfen en az bir uzmanlık alanı seçin</span>
            )}
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 w-full">
              <button
                onClick={() => navigate('/')}
                className="w-full md:w-auto text-slate-500 hover:text-slate-900 font-bold py-4 px-12 transition-colors"
              >
                Geri Dön
              </button>
              <button
                disabled={selectedExpertise.length === 0}
                onClick={() => navigate('/technical-expert/details')}
                className="w-full md:w-auto bg-primary hover:bg-primary/90 text-white font-bold py-4 px-16 rounded-xl text-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-primary/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none disabled:transform-none"
              >
                Devam Et
              </button>
            </div>
          </div>
        </div>
      </main>

      <div className="fixed bottom-0 left-0 w-full h-1/3 pointer-events-none opacity-20 -z-10 bg-gradient-to-t from-primary/10 to-transparent"></div>

      <footer className="w-full py-6 sm:py-8 px-4 sm:px-6 lg:px-8 text-center text-slate-400 dark:text-slate-600 text-xs border-t border-slate-200 dark:border-slate-800 mt-auto flex-shrink-0">
        <p>© 2024 Portlink Maritime Marketplace. Tüm hakları saklıdır.</p>
      </footer>
    </FullPageLayout>
  );
};

export default TechnicalExpertSelection;

