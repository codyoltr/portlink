import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Toast from '@/components/Toast';

const LocalAgentDetails: React.FC = () => {
  const navigate = useNavigate();
  const [fileError, setFileError] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 20 * 1024 * 1024) {
        setFileError('Maksimum boyut (20MB) aşıldı.');
      } else {
        setFileError('');
        // handle file
      }
    }
  };

  return (
    <>
      {/* Navigation Bar */}
      <nav className="bg-white dark:bg-slate-900 border-b border-primary/10 px-6 py-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="material-icons-round text-white text-xl">
              anchor
            </span>
          </div>
          <span className="text-xl font-bold tracking-tight text-primary">
            PORTLINK
          </span>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 text-slate-500 hover:text-primary transition-colors">
            <span className="material-icons-round">
              notifications
            </span>
          </button>
          <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center overflow-hidden">
            <img
              alt="Agent Profile"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC9FOS72IJi0p5KqMnas8IyOL61iNFogXtsYYQbNPNsSQ_xcVFF1scvDW0bcmVsQiiw5O9-dEv6I0-SjNio48vnLWxGafqh_di5b7ikOuKKbPTiQvVgfkaIqNkBf415P_gAJAGaAvuaeJ786swyNsiS4szijbG9n3rXoKjycpYfvqCpbLNCgzI0kOCMIvrh1R4jz69POMfVJ6yxKEIPEVKyzHq1K0FxIFq90nuLopUE7kf-SE8wOoSroo_eux2HqvQr74LcsNcNAtsk"
            />
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto py-10 px-6">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold mb-2">
            Yeni İş İlanı Oluştur
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            Servis sağlayıcılardan teklif almak için detayları eksiksiz doldurun.
          </p>
        </div>

        {/* Stepper */}
        <div className="mb-12 relative">
          <div className="flex justify-between items-center relative z-10">
            {/* Step 1 Complete */}
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center mb-2">
                <span className="material-icons-round text-sm">
                  check
                </span>
              </div>
              <span className="text-xs font-medium text-slate-500">
                Genel Bilgiler
              </span>
            </div>
            {/* Step 2 Complete */}
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center mb-2">
                <span className="material-icons-round text-sm">
                  check
                </span>
              </div>
              <span className="text-xs font-medium text-slate-500">
                Hizmet Seçimi
              </span>
            </div>
            {/* Step 3 Active */}
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-primary ring-4 ring-primary/20 text-white flex items-center justify-center mb-2">
                <span className="font-bold">
                  3
                </span>
              </div>
              <span className="text-xs font-bold text-primary">
                Detay Gir
              </span>
            </div>
          </div>
          {/* Progress Line */}
          <div className="absolute top-5 left-0 w-full h-[2px] bg-primary/20 -z-0">
            <div className="h-full bg-primary w-2/3" />
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-primary/5 p-8">
          <form action="#" className="space-y-8" method="POST">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* ETA Field */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="eta">
                  Tahmini Varış (ETA) <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <span className="material-icons-round absolute left-3 top-2.5 text-slate-400 text-lg">
                    event
                  </span>
                  <input required className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all invalid:border-rose-500 invalid:ring-rose-500" id="eta" name="eta" type="datetime-local" />
                </div>
              </div>

              {/* Port Searchable Dropdown */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="liman">
                  Liman <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <span className="material-icons-round absolute left-3 top-2.5 text-slate-400 text-lg">
                    location_on
                  </span>
                  <select required defaultValue="" className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none appearance-none transition-all invalid:border-rose-500 invalid:ring-rose-500" id="liman" name="liman">
                    <option disabled value="">
                      Liman seçin veya arayın
                    </option>
                    <option value="istanbul">Istanbul (Ambarlı)</option>
                    <option value="izmir">Izmir (Aliağa)</option>
                    <option value="mersin">Mersin Uluslararası Limanı</option>
                    <option value="kocaeli">Kocaeli (Derince)</option>
                    <option value="iskenderun">İskenderun</option>
                  </select>
                  <span className="material-icons-round absolute right-3 top-2.5 text-slate-400 pointer-events-none">
                    expand_more
                  </span>
                </div>
              </div>

              {/* Vessel Name */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="vessel_name">
                  Gemi Adı <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <span className="material-icons-round absolute left-3 top-2.5 text-slate-400 text-lg">
                    directions_boat
                  </span>
                  <input required className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all invalid:border-rose-500 invalid:ring-rose-500" id="vessel_name" name="vessel_name" placeholder="Örn: MV Blue Ocean" type="text" />
                </div>
              </div>

              {/* Vessel Type */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="vessel_type">
                  Gemi Tipi <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <span className="material-icons-round absolute left-3 top-2.5 text-slate-400 text-lg">
                    category
                  </span>
                  <select required className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none appearance-none transition-all invalid:border-rose-500 invalid:ring-rose-500" id="vessel_type" name="vessel_type">
                    <option value="container">Container Ship</option>
                    <option value="tanker">Oil/Chemical Tanker</option>
                    <option value="bulker">Bulk Carrier</option>
                    <option value="roro">Ro-Ro Cargo</option>
                    <option value="tug">Tug / Supply Ship</option>
                  </select>
                  <span className="material-icons-round absolute right-3 top-2.5 text-slate-400 pointer-events-none">
                    expand_more
                  </span>
                </div>
              </div>
            </div>

            {/* Description Textarea */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="description">
                İhtiyaç Açıklaması <span className="text-rose-500">*</span>
              </label>
              <textarea required className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all invalid:border-rose-500 invalid:ring-rose-500" id="description" name="description" placeholder="Hizmet talebinizle ilgili teknik detayları..." rows={5} />
            </div>

            {/* Upload Section */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                Görsel ve Video (Opsiyonel)
              </label>
              <div className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center transition-colors group relative ${fileError ? 'border-rose-500 bg-rose-50 dark:bg-rose-500/10' : 'border-primary/20 bg-primary/5 hover:bg-primary/10 cursor-pointer'}`}>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-sm mb-3 transition-transform ${fileError ? 'bg-rose-100 text-rose-500' : 'bg-white dark:bg-slate-800 text-primary group-hover:scale-110'}`}>
                  <span className="material-icons-round">
                    {fileError ? 'error_outline' : 'cloud_upload'}
                  </span>
                </div>
                <p className={`text-sm font-semibold mb-1 ${fileError ? 'text-rose-600 dark:text-rose-400 font-bold' : 'text-slate-700 dark:text-slate-300'}`}>
                  {fileError || 'Dosyaları buraya sürükleyin veya tıklayın'}
                </p>
                <p className="text-xs text-slate-500 mb-4">
                  Maksimum 5 fotoğraf veya video (her biri maks. 20MB)
                </p>
                <input
                  className="hidden"
                  multiple
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/*,video/*"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold px-5 py-2.5 rounded-lg hover:border-primary hover:text-primary transition-colors shadow-sm"
                >
                  Cihazdan Seç
                </button>
              </div>

              {/* Preview Placeholders */}
              <div className="flex gap-4 mt-4">
                <div className="w-16 h-16 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 overflow-hidden relative group">
                  <img alt="Preview 1" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB_eZHVbtmi5Bk4byDh0TNz5JDzvfqFTm31jXw00FPzu27ouzTEezBfTzE26o-6q3cyjjeIGV1ZwyJc7dQJ7fgmwEVXbRwJGAWEg8jRzgnI5TUvaH3nW96lvDOqxHJoD41nR35tt6uncRtHATwc8fXNgzUIK34oGkdvb4CfCX38ipcI3F0F_erlmutZaokRDOisEGbIhDMY9bQ0n_eN1RXCNfibgEP2nmFuof0_WtOe5r3EXD1tiQhiFmtdeNPk63cv2YAi6vNWgZ_N" />
                  <button className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity" type="button">
                    <span className="material-icons-round text-white text-sm">
                      close
                    </span>
                  </button>
                </div>
                <div className="w-16 h-16 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center">
                  <span className="material-icons-round text-slate-300">
                    add
                  </span>
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
              <button onClick={() => navigate(-1)} className="px-6 py-2.5 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors flex items-center gap-2" type="button">
                <span className="material-icons-round text-sm">
                  arrow_back
                </span>
                Geri
              </button>
              <div className="flex gap-3">
                <button
                  onClick={() => setToastMessage('Taslak başarıyla kaydedildi.')}
                  className="px-6 py-2.5 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-primary transition-colors"
                  type="button"
                >
                  Taslağı Kaydet
                </button>
                <button
                  onClick={(e) => { e.preventDefault(); setToastMessage('İlan başarıyla yayınlandı. Uygun sağlayıcılara bildirim gönderiliyor.'); }}
                  className="px-10 py-2.5 bg-primary hover:bg-blue-700 text-white font-bold rounded-lg shadow-lg shadow-primary/20 transition-all flex items-center gap-2"
                  type="submit"
                >
                  <span>
                    Yayınla
                  </span>
                  <span className="material-icons-round text-sm">
                    send
                  </span>
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Info Notice */}
        <div className="mt-8 flex items-start gap-3 p-4 bg-primary/5 border border-primary/10 rounded-lg">
          <span className="material-icons-round text-primary text-xl">
            info
          </span>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            İlanınız yayınlandıktan sonra uygun servis sağlayıcılara anlık bildirim gönderilecektir. Teklifleri "İlanlarım" sekmesinden takip edebilirsiniz.
          </p>
        </div>
      </main>

      {/* Map Placeholder */}
      <div className="hidden" data-location="Istanbul" />

      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage('')} />
      )}
    </>
  );
};

export default LocalAgentDetails;