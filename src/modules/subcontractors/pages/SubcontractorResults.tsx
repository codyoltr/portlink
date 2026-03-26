import React, { useState } from 'react';
import Toast from '@/components/Toast';

const SubcontractorResults: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  // Filter states
  const [isFiltering, setIsFiltering] = useState(false);
  const [filterCount, setFilterCount] = useState(2);
  const [region, setRegion] = useState('tuzla');
  const [shipType, setShipType] = useState('bulk-carrier');

  // Notification states
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'Tuzla Gemi Onarım size yeni bir teklif gönderdi.', read: false, time: '5 dk önce' },
    { id: 2, text: 'Profiliniz başarıyla onaylandı.', read: true, time: '1 saat önce' }
  ]);
  const unreadCount = notifications.filter(n => !n.read).length;

  const [toastMessage, setToastMessage] = useState('');

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const handleApplyFilters = () => {
    setIsFiltering(true);
    setTimeout(() => {
      setIsFiltering(false);
      let count = 0;
      if (region) count++;
      if (shipType) count++;
      // add some for other checkboxes assuming mock
      setFilterCount(count + 2);
      setToastMessage('Filtreler başarıyla uygulandı.');
    }, 800);
  };

  const handleResetFilters = () => {
    setRegion('');
    setShipType('');
    setFilterCount(0);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!acceptedTerms) {
      setNewsletterStatus('error');
      return;
    }
    if (newsletterEmail.includes('@')) {
      setNewsletterStatus('success');
      setNewsletterEmail('');
    } else {
      setNewsletterStatus('error');
    }
  };

  return (
    <div className="font-display bg-background-light dark:bg-background-dark text-slate-800 dark:text-slate-100 min-h-screen">
      {/* Top Navigation Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <div className="bg-primary p-1.5 rounded-lg">
                <span className="material-icons-round text-white">anchor</span>
              </div>
              <span className="text-xl font-bold tracking-tight text-primary dark:text-white">PORTLINK</span>
            </div>
            <nav className="hidden md:flex space-x-8 items-center">
              <a
                href="/home"
                className="text-slate-500 dark:text-slate-400 hover:text-primary transition-colors px-1 pt-1"
              >
                İş İlanları
              </a>
              <a
                href="#"
                className="text-primary font-semibold border-b-2 border-primary px-1 pt-1"
              >
                Taşeronlar
              </a>
              <span
                className="text-slate-400 cursor-not-allowed px-1 pt-1 text-sm"
                title="Gemi Profilimi Oluştur"
              >
                Gemi Profilim (Yakında)
              </span>
            </nav>
            <div className="flex items-center gap-4">
              <div className="relative">
                <button
                  onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                  className="p-2 text-slate-400 hover:text-primary transition-colors relative"
                >
                  <span className="material-icons-round">notifications</span>
                  {unreadCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white dark:border-slate-900"></span>
                  )}
                </button>

                {isNotificationsOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                    <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
                      <h3 className="font-bold text-slate-800 dark:text-white">Bildirimler</h3>
                      {unreadCount > 0 && (
                        <button onClick={markAllAsRead} className="text-xs text-primary hover:underline font-medium">Tümünü Okundu İşaretle</button>
                      )}
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <div className="px-4 py-8 text-center text-slate-500">Bildirim bulunmuyor.</div>
                      ) : (
                        notifications.map(notif => (
                          <div key={notif.id} className={`px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer transition-colors border-b border-slate-50 dark:border-slate-700/50 last:border-0 ${!notif.read ? 'bg-primary/5' : ''}`}>
                            <p className={`text-sm ${!notif.read ? 'text-slate-900 dark:text-white font-semibold' : 'text-slate-600 dark:text-slate-300'}`}>{notif.text}</p>
                            <span className="text-xs text-slate-400 mt-1 block">{notif.time}</span>
                          </div>
                        ))
                      )}
                    </div>
                    <div className="px-4 py-2 border-t border-slate-100 dark:border-slate-700 text-center">
                      <button className="text-sm text-primary hover:text-primary/80 font-semibold">Tüm Bildirimleri Gör</button>
                    </div>
                  </div>
                )}
              </div>
              <div className="h-8 w-8 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden border border-slate-300 dark:border-slate-600">
                <img
                  alt="User Profile"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDM03JJSaI3bUNGEbNnWDTV5nvk60ckVby-VE8XBT_oKdHhLIqgypgQhyBQ_wb_-41QPd7xSFKW4iK-BlT_VtbVMzEWdvGEAMXyVw0TRh9GlcVnQzFZ3mx_3gd7dknpIhN0TYREJoK7123nTtb17M6NlIREDr5rYlPTKXRQFbHyGE9iXOW8xmpwQC5ILmZIJPROQyqLOnUFEylTrlzOjWec31VZd8ZoCZ1sBGxTJSvIDqWvqanD-iYxKw5TQcKhHJsplTG2H_sHSAUL"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Context Summary Banner */}
      <div className="bg-primary/5 dark:bg-primary/10 border-b border-primary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Arama Kriterleri:
              </span>
              <div className="inline-flex items-center bg-white dark:bg-slate-800 px-3 py-1.5 rounded-full border border-primary/20 shadow-sm">
                <span className="material-icons-round text-primary text-sm mr-2">settings_suggest</span>
                <span className="text-sm font-semibold">Kategori: Motor &amp; Mekanik</span>
              </div>
              <div className="inline-flex items-center bg-white dark:bg-slate-800 px-3 py-1.5 rounded-full border border-primary/20 shadow-sm">
                <span className="material-icons-round text-primary text-sm mr-2">location_on</span>
                <span className="text-sm font-semibold">Konum: Tuzla</span>
              </div>
            </div>
            <button onClick={handleResetFilters} className="text-sm text-primary hover:underline font-medium flex items-center transition-all">
              <span className="material-icons-round text-sm mr-1">edit</span> Filtreleri Temizle
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-64 flex-shrink-0 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <span className="material-icons-round text-primary">filter_list</span>
                Filtreler
              </h2>
              {filterCount > 0 && (
                <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-1 rounded-full">
                  {filterCount} Filtre
                </span>
              )}
            </div>

            {/* Region Filter */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold uppercase text-slate-400 tracking-wider">
                Bölge
              </h3>
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg py-2.5 px-3 text-sm focus:ring-primary focus:border-primary appearance-none font-medium"
              >
                <option value="">Tümü</option>
                <option value="tuzla">Tuzla Tersaneler Bölgesi</option>
                <option value="yalova">Yalova Tersaneler Bölgesi</option>
                <option value="aliaga">Aliağa Limanı</option>
              </select>
            </div>

            <hr className="border-slate-200 dark:border-slate-800" />

            {/* Ship Type Filter */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold uppercase text-slate-400 tracking-wider">
                Gemi Tipi
              </h3>
              <select
                value={shipType}
                onChange={(e) => setShipType(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg py-2.5 px-3 text-sm focus:ring-primary focus:border-primary appearance-none font-medium"
              >
                <option value="">Tümü</option>
                <option value="bulk-carrier">Bulk Carrier</option>
                <option value="container">Konteyner</option>
                <option value="tanker">Tanker</option>
                <option value="ro-ro">Ro-Ro</option>
              </select>
            </div>

            <hr className="border-slate-200 dark:border-slate-800" />

            {/* Certificate Type Filter */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold uppercase text-slate-400 tracking-wider">
                Sertifika Tipi
              </h3>
              <div className="space-y-2">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="rounded border-slate-300 text-primary focus:ring-primary h-4 w-4"
                  />
                  <span className="text-sm group-hover:text-primary transition-colors">
                    Klas Sertifikalı (IACS)
                  </span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    className="rounded border-slate-300 text-primary focus:ring-primary h-4 w-4"
                  />
                  <span className="text-sm group-hover:text-primary transition-colors">
                    ISO 9001:2015
                  </span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    className="rounded border-slate-300 text-primary focus:ring-primary h-4 w-4"
                  />
                  <span className="text-sm group-hover:text-primary transition-colors">
                    Yalın Tersane Belgesi
                  </span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    className="rounded border-slate-300 text-primary focus:ring-primary h-4 w-4"
                  />
                  <span className="text-sm group-hover:text-primary transition-colors">
                    Yerel Liman Onayı
                  </span>
                </label>
              </div>
            </div>

            <hr className="border-slate-200 dark:border-slate-800" />

            {/* Team Size Filter */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold uppercase text-slate-400 tracking-wider">
                Ekip Büyüklüğü
              </h3>
              <div className="grid grid-cols-2 gap-2">
                <button className="px-3 py-2 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 hover:border-primary hover:text-primary dark:hover:border-primary transition-all">
                  1-5 Kişi
                </button>
                <button className="px-3 py-2 text-xs font-semibold rounded-lg bg-primary text-white border border-primary shadow-sm shadow-primary/20">
                  6-15 Kişi
                </button>
                <button className="px-3 py-2 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 hover:border-primary hover:text-primary dark:hover:border-primary transition-all">
                  16-30 Kişi
                </button>
                <button className="px-3 py-2 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 hover:border-primary hover:text-primary dark:hover:border-primary transition-all">
                  30+ Kişi
                </button>
              </div>
            </div>

            <hr className="border-slate-200 dark:border-slate-800" />

            {/* Star Rating Filter */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold uppercase text-slate-400 tracking-wider">
                Yıldız Puanı
              </h3>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors">
                  <input
                    type="radio"
                    name="rating"
                    className="text-primary focus:ring-primary h-4 w-4"
                  />
                  <div className="flex text-warning">
                    <span className="material-icons-round text-sm">star</span>
                    <span className="material-icons-round text-sm">star</span>
                    <span className="material-icons-round text-sm">star</span>
                    <span className="material-icons-round text-sm">star</span>
                    <span className="material-icons-round text-sm">star</span>
                  </div>
                  <span className="text-xs text-slate-500">(4.5+)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors">
                  <input
                    type="radio"
                    name="rating"
                    className="text-primary focus:ring-primary h-4 w-4"
                  />
                  <div className="flex text-warning">
                    <span className="material-icons-round text-sm">star</span>
                    <span className="material-icons-round text-sm">star</span>
                    <span className="material-icons-round text-sm">star</span>
                    <span className="material-icons-round text-sm">star</span>
                    <span className="material-icons-round text-sm text-slate-300 dark:text-slate-700">
                      star
                    </span>
                  </div>
                  <span className="text-xs text-slate-500">(4.0+)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors">
                  <input
                    type="radio"
                    name="rating"
                    className="text-primary focus:ring-primary h-4 w-4"
                  />
                  <div className="flex text-warning">
                    <span className="material-icons-round text-sm">star</span>
                    <span className="material-icons-round text-sm">star</span>
                    <span className="material-icons-round text-sm">star</span>
                    <span className="material-icons-round text-sm text-slate-300 dark:text-slate-700">
                      star
                    </span>
                    <span className="material-icons-round text-sm text-slate-300 dark:text-slate-700">
                      star
                    </span>
                  </div>
                  <span className="text-xs text-slate-500">(3.0+)</span>
                </label>
              </div>
            </div>

            <div className="bg-primary/5 p-4 rounded-xl border border-primary/10">
              <p className="text-xs text-slate-500 leading-relaxed">
                <span className="font-bold text-primary block mb-1 uppercase tracking-tighter">
                  İpucu
                </span>
                Güven puanı yüksek olan firmalar genellikle %20 daha hızlı geri dönüş sağlar.
              </p>
            </div>

            {/* Apply Filters Button */}
            <div className="pt-2 sticky bottom-4 z-10">
              <button
                onClick={handleApplyFilters}
                disabled={isFiltering}
                className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed"
              >
                {isFiltering ? (
                  <>
                    <span className="material-icons-round text-sm animate-spin">refresh</span>
                    Uygulanıyor...
                  </>
                ) : (
                  <>
                    <span className="material-icons-round text-sm">filter_alt</span>
                    Filtreleri Uygula
                  </>
                )}
              </button>
            </div>
          </aside>

          {/* Main Content Area */}
          <div className="flex-1 space-y-6">
            {/* Main Header & Sort */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                  Uygun Taşeronlar Bulundu
                </h1>
                <p className="text-slate-500 dark:text-slate-400 text-sm">
                  Tuzla bölgesinde 14 kayıtlı servis sağlayıcı kriterlerinize uyuyor.
                </p>
              </div>
              <div className="flex items-center gap-2 bg-white dark:bg-slate-800 p-1 rounded-lg border border-slate-200 dark:border-slate-800">
                <span className="text-xs font-bold px-2 text-slate-400">SIRALA:</span>
                <select className="border-none bg-transparent text-sm font-semibold focus:ring-0 cursor-pointer">
                  <option>Güven Puanı (Yüksek)</option>
                  <option>Yıldız Puanı (Yüksek)</option>
                  <option>Ekip Büyüklüğü</option>
                </select>
              </div>
            </div>

            {/* Result Cards */}
            <div className="space-y-4">
              {/* Company Card 1 */}
              <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow p-5">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="w-full md:w-48 h-32 rounded-lg bg-slate-100 dark:bg-slate-800 overflow-hidden relative">
                    <img
                      className="w-full h-full object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBcwHiOfQawL5EC9sJfaTLZ6ZFnFzFzAGiamKaSbkBDgNo7rasg6-O4EbluYDl5SZVowUatJQp7eOGL6-6k_asD3gv2n_CAi1naioKYWeKLLuZgBOMwp-YdgIasC_3dtcnbzgbuzBdgr0TdAf_t9JGzRzVDPElvjxsy47DWhLo_3qBp30UL8OJNrxNFAXr_WxER55sekhxwa1Wzzj4qroS_wraVJQDS59RktCVqQCDZwxF5dr-ZmCrtTR2ZX2zB-LOhfV2VYzzzYjEs"
                      alt="Workshop"
                    />
                    <div className="absolute top-2 left-2 bg-success text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-tighter">
                      Onaylı
                    </div>
                  </div>
                  <div className="flex-1 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                      <div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                          Tuzla Gemi Onarım
                          <span className="material-icons-round text-primary text-sm">verified</span>
                        </h3>
                        <div className="flex items-center gap-3 mt-1 text-sm text-slate-500">
                          <div className="flex items-center text-warning">
                            <span className="material-icons-round text-base">star</span>
                            <span className="font-bold ml-1 text-slate-700 dark:text-slate-300">
                              4.9
                            </span>
                            <span className="text-xs ml-1">(124 Değerlendirme)</span>
                          </div>
                          <span className="text-slate-300">|</span>
                          <div className="flex items-center gap-1">
                            <span className="material-icons-round text-base">groups</span>
                            <span>12 Kişilik Ekip</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                          GÜVEN PUANI
                        </span>
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                            <div className="h-full bg-success rounded-full w-[96%]"></div>
                          </div>
                          <span className="text-sm font-bold text-success">96%</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-primary/10 text-primary text-xs font-semibold px-2.5 py-1 rounded-full">
                        Ana Makine
                      </span>
                      <span className="bg-primary/10 text-primary text-xs font-semibold px-2.5 py-1 rounded-full">
                        Kaynak
                      </span>
                      <span className="bg-primary/10 text-primary text-xs font-semibold px-2.5 py-1 rounded-full">
                        Boru Tesisatı
                      </span>
                      <span className="bg-slate-100 dark:bg-slate-800 text-slate-500 text-xs font-semibold px-2.5 py-1 rounded-full">
                        +4 Hizmet
                      </span>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">
                      20 yılı aşkın tecrübemizle Tuzla tersaneler bölgesinde ana makine revizyonu ve
                      boru işlerinde uzman ekibimizle 7/24 hizmet vermekteyiz. Klas onaylı
                      kaynakçılarımız mevcuttur.
                    </p>
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-4">
                  <div className="flex gap-4">
                    <div className="flex items-center gap-1 text-xs text-slate-500">
                      <span className="material-icons-round text-sm text-slate-400">schedule</span>
                      <span>Geri dönüş süresi: ~2 saat</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-slate-500">
                      <span className="material-icons-round text-sm text-slate-400">description</span>
                      <span>5 Aktif Teklif</span>
                    </div>
                  </div>
                  <button className="bg-primary text-white hover:bg-primary/90 transition-all px-6 py-2.5 rounded-lg font-bold text-sm flex items-center gap-2 shadow-lg shadow-primary/20">
                    <span className="material-icons-round text-sm">send</span>
                    Teklif İste
                  </button>
                </div>
              </div>

              {/* Company Card 2 */}
              <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow p-5">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="w-full md:w-48 h-32 rounded-lg bg-slate-100 dark:bg-slate-800 overflow-hidden relative">
                    <img
                      className="w-full h-full object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCEhnlc3uH9DDWU_-pt8m50Z0KmFoAQqVZ_S_fK_OUaVD6Jv4gYmE1afRl0WglKOe0UItPjCas_xSdSxWPCilpFhC577iV97f3tvk9bqrqi_XDX1pMOf5uhSfaglTnBIxH_Iy4KZY_zBYZZcy_wNShmEUMNkoan6duvT99sSg3eCUrCZ-voYQ1siIa1p6diHBbl9QYiyEfQJ42RtpNRktS9I9c2yOuRR0-pcK2yNGt2VNP_6H8qo92PTTn1Nq6XrcoXp-Z2bcFfF5Uo"
                      alt="Hydraulic work"
                    />
                  </div>
                  <div className="flex-1 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                      <div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                          Mavi Deniz Teknik
                        </h3>
                        <div className="flex items-center gap-3 mt-1 text-sm text-slate-500">
                          <div className="flex items-center text-warning">
                            <span className="material-icons-round text-base">star</span>
                            <span className="font-bold ml-1 text-slate-700 dark:text-slate-300">
                              4.7
                            </span>
                            <span className="text-xs ml-1">(86 Değerlendirme)</span>
                          </div>
                          <span className="text-slate-300">|</span>
                          <div className="flex items-center gap-1">
                            <span className="material-icons-round text-base">groups</span>
                            <span>8 Kişilik Ekip</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                          GÜVEN PUANI
                        </span>
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                            <div className="h-full bg-warning rounded-full w-[82%]"></div>
                          </div>
                          <span className="text-sm font-bold text-warning">82%</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-primary/10 text-primary text-xs font-semibold px-2.5 py-1 rounded-full">
                        Hidrolik
                      </span>
                      <span className="bg-primary/10 text-primary text-xs font-semibold px-2.5 py-1 rounded-full">
                        Pervane Onarımı
                      </span>
                      <span className="bg-primary/10 text-primary text-xs font-semibold px-2.5 py-1 rounded-full">
                        Klas Sertifikalı
                      </span>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">
                      Gemi hidrolik sistemleri ve pervane bakım-tutumu konularında ihtisaslaşmış
                      ekibimizle tüm liman ve tersanelerde hizmetinizdeyiz. Hızlı yedek parça temini
                      imkanı.
                    </p>
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-4">
                  <div className="flex gap-4">
                    <div className="flex items-center gap-1 text-xs text-slate-500">
                      <span className="material-icons-round text-sm text-slate-400">schedule</span>
                      <span>Geri dönüş süresi: ~5 saat</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-slate-500">
                      <span className="material-icons-round text-sm text-slate-400">description</span>
                      <span>2 Aktif Teklif</span>
                    </div>
                  </div>
                  <button className="bg-primary text-white hover:bg-primary/90 transition-all px-6 py-2.5 rounded-lg font-bold text-sm flex items-center gap-2 shadow-lg shadow-primary/20">
                    <span className="material-icons-round text-sm">send</span>
                    Teklif İste
                  </button>
                </div>
              </div>

              {/* Company Card 3 */}
              <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow p-5">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="w-full md:w-48 h-32 rounded-lg bg-slate-100 dark:bg-slate-800 overflow-hidden relative">
                    <img
                      className="w-full h-full object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXY6Z3bz8go1S2BU6zI076o3YQupWOgeGXWisrfPZEm43JZ2kLwkjMRMpmaMwWUJE1F3m3-fjzj05peecuqqH7kpetV5-iTSc1kXK0r4xTjb4DLvq6c7cTJXCDGc5fOyaKQela9pu48tsC6vQRANbFOqtkUApRiBUgCRp9urfEtJShpBOCGdfthJrYFgAhcD4EwaeZfMeCAdtCS42dyQ0HMbePY4hROnYQnjfnbf6dVnF2ABb2N1vW583fD7zk6m5cSY1gYUs8cnlC"
                      alt="Ship Engine"
                    />
                    <div className="absolute top-2 left-2 bg-slate-800 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-tighter">
                      Yeni Üye
                    </div>
                  </div>
                  <div className="flex-1 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                      <div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                          Ege Gemi Mühendislik
                        </h3>
                        <div className="flex items-center gap-3 mt-1 text-sm text-slate-500">
                          <div className="flex items-center text-slate-300 dark:text-slate-700">
                            <span className="material-icons-round text-base">star</span>
                            <span className="font-bold ml-1 text-slate-400">Yeterli veri yok</span>
                          </div>
                          <span className="text-slate-300">|</span>
                          <div className="flex items-center gap-1">
                            <span className="material-icons-round text-base">groups</span>
                            <span>20+ Kişilik Ekip</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                          GÜVEN PUANI
                        </span>
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                            <div className="h-full bg-slate-300 rounded-full w-[45%]"></div>
                          </div>
                          <span className="text-sm font-bold text-slate-400">45%</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-primary/10 text-primary text-xs font-semibold px-2.5 py-1 rounded-full">
                        Mekanik
                      </span>
                      <span className="bg-primary/10 text-primary text-xs font-semibold px-2.5 py-1 rounded-full">
                        Teşhis &amp; Diyagnostik
                      </span>
                      <span className="bg-primary/10 text-primary text-xs font-semibold px-2.5 py-1 rounded-full">
                        Sürvey
                      </span>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">
                      Mühendis ağırlıklı kadromuzla gemi makineleri teşhisi ve performans
                      iyileştirme konularında profesyonel raporlama ve servis hizmeti sunuyoruz.
                    </p>
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-4">
                  <div className="flex gap-4">
                    <div className="flex items-center gap-1 text-xs text-slate-500">
                      <span className="material-icons-round text-sm text-slate-400">schedule</span>
                      <span>Geri dönüş süresi: ~24 saat</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-slate-500">
                      <span className="material-icons-round text-sm text-slate-400">description</span>
                      <span>0 Aktif Teklif</span>
                    </div>
                  </div>
                  <button className="bg-primary text-white hover:bg-primary/90 transition-all px-6 py-2.5 rounded-lg font-bold text-sm flex items-center gap-2 shadow-lg shadow-primary/20">
                    <span className="material-icons-round text-sm">send</span>
                    Teklif İste
                  </button>
                </div>
              </div>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center py-6">
              <nav className="flex items-center gap-2">
                <button className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-400 hover:text-primary transition-colors">
                  <span className="material-icons-round">chevron_left</span>
                </button>
                <button className="w-10 h-10 rounded-lg bg-primary text-white font-bold text-sm">
                  1
                </button>
                <button className="w-10 h-10 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-500 hover:border-primary hover:text-primary transition-all font-bold text-sm">
                  2
                </button>
                <button className="w-10 h-10 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-500 hover:border-primary hover:text-primary transition-all font-bold text-sm">
                  3
                </button>
                <span className="px-2 text-slate-400">...</span>
                <button className="w-10 h-10 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-500 hover:border-primary hover:text-primary transition-all font-bold text-sm">
                  8
                </button>
                <button className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-400 hover:text-primary transition-colors">
                  <span className="material-icons-round">chevron_right</span>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-slate-900 text-slate-400 py-12 mt-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="bg-primary p-1 rounded">
                  <span className="material-icons-round text-white text-sm">anchor</span>
                </div>
                <span className="text-white font-bold tracking-tight">PORTLINK</span>
              </div>
              <p className="text-sm leading-relaxed">
                Denizcilik sektöründe güvenilir taşeron ve gemi acentesi buluşma noktası.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-widest">
                Platform
              </h4>
              <ul className="space-y-2 text-sm">
                <li><span className="text-slate-500 cursor-not-allowed">Nasıl Çalışır? (Yakında)</span></li>
                <li><span className="text-slate-500 cursor-not-allowed">Taşeron Listeleme (Yakında)</span></li>
                <li><span className="text-slate-500 cursor-not-allowed">Güven Puanı Nedir? (Yakında)</span></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-widest">
                Kurumsal
              </h4>
              <ul className="space-y-2 text-sm">
                <li><span className="text-slate-500 cursor-not-allowed">Hakkımızda (Yakında)</span></li>
                <li><span className="text-slate-500 cursor-not-allowed">İletişim (Yakında)</span></li>
                <li><span className="text-slate-500 cursor-not-allowed">KVKK Aydınlatma (Yakında)</span></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-widest">
                Bülten
              </h4>
              <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                <div className="flex">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="bg-slate-800 border-none rounded-l-lg text-sm focus:ring-1 focus:ring-primary w-full"
                    placeholder="E-posta adresi"
                    required
                  />
                  <button type="submit" className="bg-primary text-white px-4 rounded-r-lg hover:bg-primary/90 transition-colors">
                    <span className="material-icons-round text-sm pt-1">arrow_forward</span>
                  </button>
                </div>
                <div className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={acceptedTerms}
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                    className="mt-1 rounded border-slate-700 bg-slate-800 text-primary focus:ring-primary h-3 w-3"
                  />
                  <label htmlFor="terms" className="text-xs text-slate-500">
                    Gizlilik ve KVKK Politikası'nı okudum, iletişim kurallarına onay veriyorum.
                  </label>
                </div>
                {newsletterStatus === 'success' && (
                  <div className="text-emerald-400 text-xs font-semibold flex items-center gap-1">
                    <span className="material-icons-round text-[14px]">check_circle</span>
                    Başarıyla abone oldunuz!
                  </div>
                )}
                {newsletterStatus === 'error' && (
                  <div className="text-rose-400 text-xs font-semibold flex items-center gap-1">
                    <span className="material-icons-round text-[14px]">error</span>
                    Lütfen geçerli bir e-posta girin ve KVKK metnini onaylayın.
                  </div>
                )}
              </form>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-slate-800 text-center text-xs">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
              <p>© 2024 Portlink Maritime Marketplace. Tüm hakları saklıdır.</p>
              <div className="flex gap-6">
                <a href="#" className="hover:text-primary">
                  Kullanım Koşulları
                </a>
                <a href="#" className="hover:text-primary">
                  Gizlilik Politikası
                </a>
                <a href="#" className="hover:text-primary">
                  Destek
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage('')} />
      )}
    </div>
  );
};

export default SubcontractorResults;
