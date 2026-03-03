import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Toast from '../../components/Toast';

const SubcontractorJobDetails: React.FC = () => {
  const navigate = useNavigate();
  const [fileErrors, setFileErrors] = useState<Record<string, string>>({});
  const [toastMessage, setToastMessage] = useState('');

  const technicalDrawingRef = useRef<HTMLInputElement>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);

  const handleDrawingUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 25 * 1024 * 1024) {
        setFileErrors(prev => ({ ...prev, drawing: 'Dosya boyutu 25MB sınırını aşıyor.' }));
      } else if (!file.name.endsWith('.pdf') && !file.name.endsWith('.dwg') && !file.name.endsWith('.cad')) {
        setFileErrors(prev => ({ ...prev, drawing: 'Desteklenmeyen dosya formatı.' }));
      } else {
        setFileErrors(prev => ({ ...prev, drawing: '' }));
        // file selected success logic
      }
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setFileErrors(prev => ({ ...prev, photo: 'Sadece PNG, JPG, JPEG desteklenir.' }));
      } else {
        setFileErrors(prev => ({ ...prev, photo: '' }));
        // file selected success logic
      }
    }
  };

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-800 dark:text-slate-100 min-h-screen">
      {/* Navigation Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-primary/10 py-4 px-6 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-primary p-1.5 rounded-lg">
              <span className="material-icons-round text-white">anchor</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-primary">PORTLINK</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-slate-500 dark:text-slate-400 hover:text-primary transition-colors">
              <span className="material-icons-round">notifications_none</span>
            </button>
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
              <span className="text-xs font-bold text-primary">KA</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto py-8 px-4 mb-12">
        {/* Progress Stepper */}
        <div className="mb-10">
          <div className="flex items-center justify-between relative mb-4">
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 dark:bg-slate-800 -z-10 -translate-y-1/2"></div>

            {/* Step 1 (Completed) */}
            <div className="flex flex-col items-center gap-2 bg-background-light dark:bg-background-dark px-2">
              <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-sm">
                <span className="material-icons-round text-sm">check</span>
              </div>
              <span className="text-xs font-medium text-emerald-500">Hizmet Türü</span>
            </div>

            {/* Step 2 (Completed) */}
            <div className="flex flex-col items-center gap-2 bg-background-light dark:bg-background-dark px-2">
              <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-sm">
                <span className="material-icons-round text-sm">check</span>
              </div>
              <span className="text-xs font-medium text-emerald-500">Taşeron Tipi</span>
            </div>

            {/* Step 3 (Current) */}
            <div className="flex flex-col items-center gap-2 bg-background-light dark:bg-background-dark px-2">
              <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center shadow-md ring-4 ring-primary/10">
                <span className="text-sm font-bold">3</span>
              </div>
              <span className="text-xs font-bold text-primary">İş Detayları</span>
            </div>

            {/* Step 4 (Pending) */}
            <div className="flex flex-col items-center gap-2 bg-background-light dark:bg-background-dark px-2">
              <div className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-slate-400 flex items-center justify-center">
                <span className="text-sm font-bold">4</span>
              </div>
              <span className="text-xs font-medium text-slate-400">Onay ve Yayın</span>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-primary/5 overflow-hidden">
          <div className="p-6 border-b border-primary/5">
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white">İş Detaylarını Belirleyin</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">
              Lütfen gemi ve yapılacak işe dair detaylı bilgileri giriniz.
            </p>
          </div>
          <div className="p-8">
            <form className="space-y-8">
              {/* General Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                    <span className="material-icons-round text-xs">location_on</span> Liman / Tersane Seçimi <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <select required className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg py-3 px-4 focus:ring-primary focus:border-primary appearance-none invalid:border-rose-500 invalid:ring-rose-500">
                      <option value="">Liman seçiniz...</option>
                      <option value="tuzla">Tuzla Tersaneler Bölgesi</option>
                      <option value="yalova">Yalova Tersaneler Bölgesi</option>
                      <option value="izmir">İzmir Aliağa Limanı</option>
                      <option value="mersin">Mersin Uluslararası Limanı</option>
                    </select>
                    <span className="material-icons-round absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                      expand_more
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                    <span className="material-icons-round text-xs">directions_boat</span> Gemi Adı &amp; Tipi <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg py-3 px-4 focus:ring-primary focus:border-primary invalid:border-rose-500 invalid:ring-rose-500"
                    placeholder="Örn: MV Blue Wave - Bulk Carrier"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                    <span className="material-icons-round text-xs">schedule</span> İşin Tahmini Süresi <span className="text-rose-500">*</span>
                  </label>
                  <div className="flex gap-4">
                    <input
                      type="number"
                      className="flex-1 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg py-3 px-4 focus:ring-primary focus:border-primary"
                      placeholder="Sayı giriniz"
                    />
                    <select className="w-32 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg py-3 px-4 focus:ring-primary focus:border-primary">
                      <option>Gün</option>
                      <option>Hafta</option>
                      <option>Ay</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Technical Details */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Teknik Şartname / Detaylar
                </label>
                <textarea
                  rows={5}
                  className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg py-3 px-4 focus:ring-primary focus:border-primary"
                  placeholder="Hizmet kapsamını, teknik gereksinimleri ve özel notlarınızı buraya yazınız..."
                />
              </div>

              {/* File Upload Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Technical Drawings */}
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Teknik Çizimler (PDF, CAD)
                  </label>
                  <div
                    className={`border-2 border-dashed rounded-xl p-6 text-center transition-colors group relative ${fileErrors['drawing'] ? 'border-rose-500 bg-rose-50 dark:bg-rose-500/10' : 'border-primary/20 bg-primary/5 hover:bg-primary/10'}`}
                  >
                    <input
                      type="file"
                      className="hidden"
                      ref={technicalDrawingRef}
                      onChange={handleDrawingUpload}
                      accept=".pdf,.dwg,.cad"
                    />
                    <span className={`material-icons-round text-4xl mb-2 transition-colors ${fileErrors['drawing'] ? 'text-rose-500' : 'text-primary/40 group-hover:text-primary'}`}>
                      {fileErrors['drawing'] ? 'error_outline' : 'cloud_upload'}
                    </span>
                    <p className={`text-xs font-medium ${fileErrors['drawing'] ? 'text-rose-600 dark:text-rose-400 font-bold' : 'text-slate-600 dark:text-slate-400'}`}>
                      {fileErrors['drawing'] || 'PDF veya DWG dosyalarını sürükleyin'}
                    </p>
                    <p className="text-[10px] text-slate-400 mt-1 mb-4">Maksimum dosya boyutu: 25MB</p>
                    <button
                      type="button"
                      onClick={() => technicalDrawingRef.current?.click()}
                      className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold px-4 py-2 rounded-lg hover:border-primary hover:text-primary transition-colors shadow-sm"
                    >
                      Bilgisayardan Göz At
                    </button>
                  </div>
                </div>

                {/* Damage Photos */}
                <div className="space-y-3">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Hasar / Mevcut Durum Fotoğrafları
                  </label>
                  <div
                    className={`border-2 border-dashed rounded-xl p-6 text-center transition-colors group relative ${fileErrors['photo'] ? 'border-rose-500 bg-rose-50 dark:bg-rose-500/10' : 'border-primary/20 bg-primary/5 hover:bg-primary/10'}`}
                  >
                    <input
                      type="file"
                      className="hidden"
                      ref={photoInputRef}
                      onChange={handlePhotoUpload}
                      accept="image/png, image/jpeg, image/jpg"
                    />
                    <span className={`material-icons-round text-4xl mb-2 transition-colors ${fileErrors['photo'] ? 'text-rose-500' : 'text-primary/40 group-hover:text-primary'}`}>
                      {fileErrors['photo'] ? 'error_outline' : 'add_a_photo'}
                    </span>
                    <p className={`text-xs font-medium ${fileErrors['photo'] ? 'text-rose-600 dark:text-rose-400 font-bold' : 'text-slate-600 dark:text-slate-400'}`}>
                      {fileErrors['photo'] || 'Görüntüleri sürükleyin veya seçin'}
                    </p>
                    <p className="text-[10px] text-slate-400 mt-1 mb-4">PNG, JPG, JPEG desteklenir</p>
                    <button
                      type="button"
                      onClick={() => photoInputRef.current?.click()}
                      className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold px-4 py-2 rounded-lg hover:border-primary hover:text-primary transition-colors shadow-sm"
                    >
                      Bilgisayardan Göz At
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* Footer Actions */}
          <div className="p-6 bg-slate-50 dark:bg-slate-800/50 flex flex-col md:flex-row justify-between items-center gap-4">
            <button
              type="button"
              onClick={() => navigate('/subcontractor')}
              className="flex items-center gap-2 px-6 py-3 font-semibold text-slate-600 dark:text-slate-400 hover:text-primary transition-colors"
            >
              <span className="material-icons-round text-sm">arrow_back</span>
              Geri Dön
            </button>
            <div className="flex gap-4 w-full md:w-auto">
              <button
                type="button"
                onClick={(e) => { e.preventDefault(); setToastMessage('İlan başarıyla yayınlandı!'); setTimeout(() => navigate('/subcontractor/results'), 2000); }}
                className="flex-1 md:flex-initial bg-primary hover:bg-primary/90 text-white font-bold py-3 px-10 rounded-lg shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2"
              >
                Uygun Taşeronları Listele
                <span className="material-icons-round text-sm">chevron_right</span>
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar Info (Helper) */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-slate-900 p-4 rounded-lg border border-primary/10 flex items-start gap-3">
            <span className="material-icons-round text-primary/60">verified</span>
            <div>
              <h4 className="text-xs font-bold text-slate-700 dark:text-slate-200">Onaylı Taşeronlar</h4>
              <p className="text-[10px] text-slate-500 mt-1">
                Sadece Portlink tarafından doğrulanmış firmalar teklif verebilir.
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-900 p-4 rounded-lg border border-primary/10 flex items-start gap-3">
            <span className="material-icons-round text-primary/60">security</span>
            <div>
              <h4 className="text-xs font-bold text-slate-700 dark:text-slate-200">Güvenli Veri Paylaşımı</h4>
              <p className="text-[10px] text-slate-500 mt-1">
                Yüklediğiniz teknik belgeler sadece seçtiğiniz adaylar ile paylaşılır.
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-900 p-4 rounded-lg border border-primary/10 flex items-start gap-3">
            <span className="material-icons-round text-primary/60">support_agent</span>
            <div>
              <h4 className="text-xs font-bold text-slate-700 dark:text-slate-200">7/24 Teknik Destek</h4>
              <p className="text-[10px] text-slate-500 mt-1">
                Form doldururken yardıma mı ihtiyacınız var? Bize her an ulaşabilirsiniz.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Map Visualization Mockup */}
      <section className="max-w-4xl mx-auto px-4 mb-20">
        <div className="relative rounded-xl overflow-hidden h-48 border border-slate-200 dark:border-slate-800">
          <img
            className="w-full h-full object-cover opacity-50 grayscale dark:invert"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCmwfHtx3YftZdujIBrJwh446Jz0iLSjUAsIjVcCLWKymkMhQmIFG5EFdzFOtkISSYr-VXP533j7D67rKpi1GL2U1CgZrLm4lJePgFTu2vtIKRn2QQY_qLiW_brD-yekASYTb_H2XfGRUwjWiBNEJE1WyaOzO7coIeCCQlQPDXQi2Wk8dXn3fjFK5QeNOH5QRy7hN7PUBiUMq-hsPOx8TuW-rR9qNDjg2_R1mvaKsWOPe3bKtYxqzvKef1jINVg0Abgv-U5vnMwaKok"
            alt="Maritime Port Map"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background-light dark:from-background-dark to-transparent"></div>
          <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-white dark:bg-slate-9 00 py-1.5 px-3 rounded-full shadow-sm border border-primary/10">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
              Bölgenizdeki 124 müsait taşeron aranacak
            </span>
          </div>
        </div>
      </section>
      {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage('')} />}
    </div>
  );
};

export default SubcontractorJobDetails;

