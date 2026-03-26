import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Toast from '@/components/Toast';

const TechnicalExpertJobDetails: React.FC = () => {
  const navigate = useNavigate();
  const [fileError, setFileError] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 25 * 1024 * 1024) {
        setFileError('Dosya boyutu 25MB sınırını aşıyor.');
      } else if (!file.name.match(/\.(pdf|jpg|jpeg|png|dxf|dwg)$/i)) {
        setFileError('Desteklenmeyen dosya formatı.');
      } else {
        setFileError('');
        // handle selected file
      }
    }
  };

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-800 dark:text-slate-200 min-h-screen flex flex-col">
      <header className="w-full py-4 px-8 flex justify-between items-center bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="bg-primary p-1.5 rounded-lg">
            <span className="material-icons-round text-white text-2xl">directions_boat</span>
          </div>
          <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Portlink
          </span>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-green-500/10 text-green-600 flex items-center justify-center text-xs font-bold border border-green-500/20">
                <span className="material-icons-round text-sm">check</span>
              </div>
              <span className="text-xs font-semibold text-slate-400">Hizmet Seçimi</span>
            </div>
            <div className="w-8 h-[2px] bg-green-500/20" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-green-500/10 text-green-600 flex items-center justify-center text-xs font-bold border border-green-500/20">
                <span className="material-icons-round text-sm">check</span>
              </div>
              <span className="text-xs font-semibold text-slate-400">Şirket Bilgileri</span>
            </div>
            <div className="w-8 h-[2px] bg-primary/20" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold">
                3
              </div>
              <span className="text-xs font-semibold text-slate-900 dark:text-white">
                İş Detayları
              </span>
            </div>
            <div className="w-8 h-[2px] bg-slate-200 dark:bg-slate-700" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center text-xs font-bold">
                4
              </div>
              <span className="text-xs font-semibold text-slate-400">Onay</span>
            </div>
          </div>
          <div className="h-6 w-[1px] bg-slate-200 dark:bg-slate-700 hidden md:block" />
          <div className="flex items-center gap-4 text-sm font-medium text-slate-500">
            <span className="flex items-center gap-1">
              <span className="material-icons-round text-base">language</span> TR
            </span>
          </div>
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center py-12 px-4">
        <div className="max-w-3xl w-full">
          <div className="mb-8">
            <button
              type="button"
              onClick={() => navigate('/technical-expert')}
              className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors mb-4 group"
            >
              <span className="material-icons-round text-lg group-hover:-translate-x-1 transition-transform">
                arrow_back
              </span>
              <span className="text-sm font-medium">Geri Dön</span>
            </button>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2">
              Uzman Talebi Detayları
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              İhtiyacınız olan teknik uzmanlık için iş detaylarını eksiksiz doldurunuz.
            </p>
          </div>

          <form className="space-y-8 bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  <span className="material-icons-round text-primary text-sm">place</span>
                  Hizmet Lokasyonu (Liman/Tersane) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Örn: Tuzla Tersaneler Bölgesi veya Ambarlı Limanı"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-slate-400 text-sm invalid:border-rose-500 invalid:ring-rose-500"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  <span className="material-icons-round text-primary text-sm">calendar_today</span>
                  Tahmini Başlangıç Tarihi <span className="text-rose-500">*</span>
                </label>
                <input
                  type="date"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all text-sm invalid:border-rose-500 invalid:ring-rose-500"
                />
              </div>

              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  <span className="material-icons-round text-primary text-sm">directions_boat</span>
                  Gemi Tipi &amp; Tonajı <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Örn: Aframax Tanker - 115,000 DWT"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-slate-400 text-sm invalid:border-rose-500 invalid:ring-rose-500"
                />
              </div>

              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  <span className="material-icons-round text-primary text-sm">description</span>
                  İşin Kapsamı <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={5}
                  required
                  placeholder="Gerçekleştirilecek teknik denetim, onarım veya sörvey detaylarını buraya yazınız..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-slate-400 text-sm resize-none invalid:border-rose-500 invalid:ring-rose-500"
                />
              </div>

              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  <span className="material-icons-round text-primary text-sm">attachment</span>
                  Teknik Çizim veya Gemi Belgeleri
                </label>
                <div className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center gap-3 transition-colors group relative ${fileError ? 'border-rose-500 bg-rose-50 dark:bg-rose-500/10' : 'border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/20 hover:border-primary cursor-pointer'}`}>
                  <input
                    type="file"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept=".pdf,.jpg,.jpeg,.png,.dxf,.dwg"
                  />
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-sm transition-transform ${fileError ? 'bg-rose-100 text-rose-500' : 'bg-white dark:bg-slate-800 text-primary group-hover:scale-110'}`}>
                    <span className="material-icons-round text-2xl">{fileError ? 'error_outline' : 'cloud_upload'}</span>
                  </div>
                  <div className="text-center">
                    <p className={`text-sm font-semibold ${fileError ? 'text-rose-600 dark:text-rose-400 font-bold' : 'text-slate-700 dark:text-slate-300'}`}>
                      {fileError || 'Dosyaları buraya sürükleyin veya tıklayın'}
                    </p>
                    <p className="text-xs text-slate-500 mt-1 mb-4">
                      PDF, JPG, PNG, DXF veya DWG (Maks. 25MB)
                    </p>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold px-5 py-2.5 rounded-lg hover:border-primary hover:text-primary transition-colors shadow-sm"
                    >
                      Bilgisayandan Seç
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-slate-400">
                <span className="material-icons-round text-sm">info</span>
                <span className="text-xs">
                  İş ilanı yayınlandıktan sonra teklifler panelinize düşecektir.
                </span>
              </div>
              <button
                type="button"
                onClick={(e) => { e.preventDefault(); setToastMessage('İlan başarıyla yayınlandı!'); setTimeout(() => navigate('/technical-expert/results'), 2000); }}
                className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white font-bold py-4 px-10 rounded-xl text-md transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-primary/25 flex items-center justify-center gap-2"
              >
                <span>Yayınla ve Teklif Topla</span>
                <span className="material-icons-round text-xl">send</span>
              </button>
            </div>
          </form>
        </div>
      </main>

      <footer className="w-full py-8 px-8 text-center text-slate-400 dark:text-slate-600 text-xs border-t border-slate-200 dark:border-slate-800">
        <p>© 2024 Portlink Maritime Marketplace. Tüm hakları saklıdır.</p>
      </footer>

      {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage('')} />}
    </div>
  );
};

export default TechnicalExpertJobDetails;

