import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FullPageLayout from '@/features/shell/components/FullPageLayout';


const LocalAgentSelection: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['gemi-ikmal', 'crew']);

  const categories = [
    { id: 'gemi-ikmal', icon: 'inventory', title: 'Gemi İkmal', description: 'Gıda, kumanya ve genel gemi ihtiyaçları tedariği.' },
    { id: 'teknik-tamir', icon: 'build', title: 'Teknik Tamir', description: 'Motor, gövde, elektronik ve mekanik onarım hizmetleri.' },
    { id: 'crew', icon: 'groups', title: 'Crew (Mürettebat)', description: 'Personel değişimi, ulaşım ve konaklama hizmetleri.' },
    { id: 'liman-islemleri', icon: 'directions_boat', title: 'Liman İşlemleri', description: 'Gümrük, acentelik ve resmi otorite işlemleri.' },
    { id: 'atik-yonetimi', icon: 'delete_sweep', title: 'Atık Yönetimi', description: 'MARPOL uyumlu katı ve sıvı atık alım hizmetleri.' },
    { id: 'evrak-dokuman', icon: 'description', title: 'Evrak & Doküman', description: 'Sertifikasyon, çeviri ve lojistik evrak yönetimi.' }
  ];

  const toggleCategory = (id: string) => {
    setSelectedCategories(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  return (
    <FullPageLayout>
      {/* Navigation / Header */}
      <header className="border-b border-primary/10 bg-white dark:bg-slate-900/50 sticky top-0 z-50 flex-shrink-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="material-icons-round text-white text-xl">anchor</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-primary dark:text-white">PORTLINK</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-500 hover:text-primary transition-colors">
              <span className="material-icons-round">help_outline</span>
            </button>
            <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold text-xs">
              MK
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 overflow-y-auto">
        {/* Stepper */}
        <div className="mb-12">
          <div className="flex items-center justify-center gap-4 md:gap-8">
            {/* Step 1: Completed */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20">
                <span className="material-icons-round text-lg">check</span>
              </div>
              <div className="hidden md:block">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Adım 1</p>
                <p className="text-sm font-bold text-slate-700 dark:text-slate-300">İş Modeli Seç</p>
              </div>
            </div>
            <div className="h-px w-12 md:w-24 bg-primary/30"></div>
            {/* Step 2: Active */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center ring-4 ring-primary/10 shadow-lg shadow-primary/20">
                <span className="font-bold">2</span>
              </div>
              <div className="hidden md:block">
                <p className="text-xs font-semibold text-primary uppercase tracking-wider">Adım 2</p>
                <p className="text-sm font-bold text-primary">Hizmet Seç</p>
              </div>
            </div>
            <div className="h-px w-12 md:w-24 bg-slate-200 dark:bg-slate-800"></div>
            {/* Step 3: Future */}
            <div className="flex items-center gap-3 opacity-50">
              <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-500 flex items-center justify-center">
                <span className="font-bold">3</span>
              </div>
              <div className="hidden md:block">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Adım 3</p>
                <p className="text-sm font-bold text-slate-500">Profil Detayı</p>
              </div>
            </div>
          </div>
        </div>

        {/* Page Introduction */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">Hizmet Kategorilerini Seçin</h1>
          <p className="text-slate-500 dark:text-slate-400 max-w-lg mx-auto leading-relaxed">
            Platform üzerinde sunduğunuz veya talep edeceğiniz hizmet alanlarını belirleyin. Birden fazla seçim yapabilirsiniz.
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((category) => (
            <label key={category.id} className="group relative cursor-pointer">
              <input
                type="checkbox"
                checked={selectedCategories.includes(category.id)}
                onChange={() => toggleCategory(category.id)}
                className="peer sr-only"
              />
              <div className={`h-full border-2 rounded-xl p-6 transition-all duration-200 group-hover:shadow-xl ${selectedCategories.includes(category.id)
                ? 'border-primary bg-primary/5 dark:bg-primary/10 ring-1 ring-primary'
                : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 group-hover:border-primary/50'
                }`}>
                <div className={`mb-4 w-12 h-12 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110 ${selectedCategories.includes(category.id)
                  ? 'bg-primary text-white'
                  : 'bg-primary/10 dark:bg-primary/20 text-primary'
                  }`}>
                  <span className="material-icons-round text-2xl">{category.icon}</span>
                </div>
                <h3 className="text-lg font-bold mb-2 dark:text-white">{category.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-snug">{category.description}</p>
                <div className={`absolute top-4 right-4 transition-all duration-200 ${selectedCategories.includes(category.id) ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                  }`}>
                  <span className="material-icons-round text-primary text-2xl drop-shadow-sm">check_circle</span>
                </div>
              </div>
            </label>
          ))}
        </div>

        {/* Illustration / Support Info */}
        <div className="mt-16 p-8 rounded-2xl bg-primary/5 border border-primary/10 flex flex-col md:flex-row items-center gap-8">
          <div className="relative w-32 h-32 flex-shrink-0">
            <div className="absolute inset-0 bg-primary/20 rounded-full animate-pulse"></div>
            <div className="relative z-10 w-full h-full flex items-center justify-center">
              <span className="material-icons-round text-6xl text-primary/50">anchor</span>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Hizmetinizi Bulamadınız mı?</h4>
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">
              Listede uzmanlık alanınızı göremiyorsanız endişelenmeyin. Genel kategorinizi seçin, profil sayfanızda özel hizmet başlıkları oluşturabileceksiniz.
            </p>
            <a className="text-primary font-semibold text-sm hover:underline inline-flex items-center gap-1" href="#">
              Destek ile İletişime Geçin <span className="material-icons-round text-sm">north_east</span>
            </a>
          </div>
        </div>
      </main>

      {/* Footer Action Bar */}
      <footer className="bg-white dark:bg-slate-900 border-t border-primary/10 py-6 px-4 sm:px-6 lg:px-8 flex-shrink-0">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors inline-flex items-center gap-2"
          >
            <span className="material-icons-round text-sm">arrow_back</span>
            Geri Dön
          </button>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex flex-col items-end">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                {selectedCategories.length} kategori seçildi
              </span>
              {selectedCategories.length === 0 && (
                <span className="text-xs text-rose-500 font-medium">Lütfen en az bir kategori seçin</span>
              )}
            </div>
            <button
              disabled={selectedCategories.length === 0}
              onClick={() => navigate('/local-agent/details')}
              className="px-10 py-3 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold shadow-lg shadow-primary/30 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
            >
              Devam Et
              <span className="material-icons-round text-sm">arrow_forward</span>
            </button>
          </div>
        </div>
      </footer>
    </FullPageLayout>
  );
};

export default LocalAgentSelection;
