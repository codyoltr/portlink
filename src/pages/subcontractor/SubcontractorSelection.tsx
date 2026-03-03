import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FullPageLayout from '../../components/FullPageLayout';

const SubcontractorSelection: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['kaynak-yapisal']);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'kaynak-yapisal', icon: 'foundation', title: 'Kaynak & Yapısal', description: 'Gövde onarımı, sac yenileme ve sertifikalı kaynak işleri.' },
    { id: 'motor-mekanik', icon: 'settings_input_component', title: 'Motor & Mekanik', description: 'Ana makine, jeneratör revizyonu ve mekanik bakım hizmetleri.' },
    { id: 'hidrolik-pnomatik', icon: 'water_drop', title: 'Hidrolik & Pnömatik', description: 'Vinç sistemleri, kapak mekanizmaları ve piston onarımları.' },
    { id: 'elektrik-elektronik', icon: 'bolt', title: 'Elektrik & Elektronik', description: 'Navigasyon, otomasyon ve pano kurulum/onarım işleri.' },
    { id: 'boru-donatim', icon: 'mediation', title: 'Boru & Donatım', description: 'Balast sistemleri, yangın hatları ve vana değişimleri.' },
    { id: 'boya-raspa', icon: 'format_paint', title: 'Boya & Raspa', description: 'Yüzey hazırlığı, kumlama ve profesyonel boya uygulama.' },
    { id: 'sualti-hizmetleri', icon: 'scuba_diving', title: 'Sualtı Hizmetleri', description: 'Pervane temizliği, sualtı video sörvey ve kaynak onarımı.' }
  ];

  const filteredCategories = categories.filter(cat =>
    cat.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleCategory = (id: string) => {
    setSelectedCategories(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  return (
    <FullPageLayout>
      <header className="border-b border-slate-200 bg-white sticky top-0 z-50 flex-shrink-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
              <span className="material-icons-round text-white text-xl">directions_boat</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-[#0f172a] uppercase">Portlink</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-400 hover:text-primary transition-colors">
              <span className="material-icons-round">help_outline</span>
            </button>
            <div className="h-8 w-px bg-slate-200"></div>
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-medium text-slate-400">Giriş Yapıldı</p>
                <p className="text-sm font-semibold text-[#0f172a]">Global Ship Agency</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center overflow-hidden">
                <span className="text-primary font-bold text-xs">GS</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 overflow-y-auto">
        {/* Stepper */}
        <div className="mb-12">
          <div className="flex items-center justify-between relative">
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 -translate-y-1/2 z-0"></div>
            <div className="absolute top-1/2 left-0 w-1/3 h-0.5 bg-primary -translate-y-1/2 z-0"></div>
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center ring-4 ring-[#f8fafc]">
                <span className="material-icons-round text-xl">check</span>
              </div>
              <span className="absolute -bottom-7 text-xs font-semibold text-slate-500 whitespace-nowrap uppercase tracking-wider">Genel Bilgiler</span>
            </div>
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center ring-4 ring-[#f8fafc] shadow-[0_0_15px_rgba(15,73,189,0.3)]">
                <span className="text-lg font-bold">2</span>
              </div>
              <span className="absolute -bottom-7 text-xs font-bold text-primary whitespace-nowrap uppercase tracking-wider">Hizmet Seçimi</span>
            </div>
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-white text-slate-400 flex items-center justify-center border-2 border-slate-200 ring-4 ring-[#f8fafc]">
                <span className="text-lg font-bold">3</span>
              </div>
              <span className="absolute -bottom-7 text-xs font-semibold text-slate-400 whitespace-nowrap uppercase tracking-wider">Detaylar</span>
            </div>
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-white text-slate-400 flex items-center justify-center border-2 border-slate-200 ring-4 ring-[#f8fafc]">
                <span className="text-lg font-bold">4</span>
              </div>
              <span className="absolute -bottom-7 text-xs font-semibold text-slate-400 whitespace-nowrap uppercase tracking-wider">Özet</span>
            </div>
          </div>
        </div>

        <div className="text-center mb-10 mt-16">
          <h1 className="text-3xl font-extrabold text-[#0f172a] mb-3">Hangi Alanda Taşeron Arıyorsunuz?</h1>
          <p className="text-slate-500 max-w-2xl mx-auto">
            Talebinize en uygun servis sağlayıcıları listelememiz için ihtiyacınız olan kategorileri seçiniz. Birden fazla seçim yapabilirsiniz.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-10 relative">
          <span className="material-icons-round absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">search</span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-xl py-3.5 pl-12 pr-4 shadow-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-[#0f172a] placeholder:text-slate-400"
            placeholder="Kategori ara..."
          />
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredCategories.map((category) => (
            <label key={category.id} className="cursor-pointer group">
              <input
                type="checkbox"
                checked={selectedCategories.includes(category.id)}
                onChange={() => toggleCategory(category.id)}
                className="hidden peer"
                name="category"
              />
              <div
                className={`h-full p-6 bg-white border rounded-2xl shadow-sm transition-all flex flex-col items-center text-center ${selectedCategories.includes(category.id)
                    ? 'border-primary ring-2 ring-primary/5'
                    : 'border-slate-200 hover:border-primary/50'
                  }`}
              >
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-5 transition-colors ${selectedCategories.includes(category.id)
                      ? 'bg-primary/5'
                      : 'bg-slate-50 group-hover:bg-primary/5'
                    }`}
                >
                  <span
                    className={`material-icons-round text-3xl transition-colors ${selectedCategories.includes(category.id)
                        ? 'text-primary'
                        : 'text-slate-600 group-hover:text-primary'
                      }`}
                  >
                    {category.icon}
                  </span>
                </div>
                <h3 className="font-bold text-lg mb-2 text-[#0f172a]">{category.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{category.description}</p>
                <div
                  className={`mt-5 transition-opacity ${selectedCategories.includes(category.id) ? 'opacity-100' : 'opacity-0'
                    }`}
                >
                  <span className="material-icons-round text-primary">check_circle</span>
                </div>
              </div>
            </label>
          ))}
        </div>

        {/* Sticky Footer */}
        <div className="sticky bottom-8 left-0 right-0 max-w-2xl mx-auto z-40">
          <div className="bg-white/90 backdrop-blur-xl p-4 rounded-2xl shadow-2xl border border-slate-200/60 flex items-center justify-between gap-4">
            <button
              onClick={() => navigate('/')}
              className="px-6 py-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 font-semibold text-slate-600 transition-colors flex items-center gap-2"
            >
              <span className="material-icons-round text-sm">arrow_back</span>
              Geri
            </button>
            <div className="flex-grow flex flex-col justify-center items-center">
              <span className="text-sm font-medium text-slate-400 hidden sm:block">
                {selectedCategories.length} Kategori Seçildi
              </span>
              {selectedCategories.length === 0 && (
                <span className="text-xs font-semibold text-rose-500 mt-0.5">Lütfen en az bir kategori seçin</span>
              )}
            </div>
            <button
              disabled={selectedCategories.length === 0}
              onClick={() => navigate('/subcontractor/details')}
              className="px-10 py-3 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold shadow-lg shadow-primary/30 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
            >
              Devam Et
              <span className="material-icons-round text-sm">arrow_forward</span>
            </button>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-slate-200 py-8 flex-shrink-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] text-slate-400 uppercase tracking-widest font-bold">
          <div className="flex items-center gap-8">
            <a className="hover:text-primary transition-colors" href="#">
              KVKK Aydınlatma
            </a>
            <a className="hover:text-primary transition-colors" href="#">
              Kullanım Koşulları
            </a>
            <a className="hover:text-primary transition-colors" href="#">
              Bize Ulaşın
            </a>
          </div>
          <div className="flex items-center gap-2 opacity-80">
            <span>© 2024 PORTLINK MARITIME SOLUTIONS</span>
          </div>
        </div>
      </footer>
    </FullPageLayout>
  );
};

export default SubcontractorSelection;

