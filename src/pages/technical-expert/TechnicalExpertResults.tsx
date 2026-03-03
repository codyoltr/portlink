import React, { useState } from 'react';

const TechnicalExpertResults: React.FC = () => {
  const [isFiltering, setIsFiltering] = useState(false);
  const [filterCount, setFilterCount] = useState(2);

  // Notification states
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'Kpt. Ahmet Yılmaz teklifinizi yanıtladı.', read: false, time: '12 dk önce' },
    { id: 2, text: 'Yeni bir sörveyör bölgenizde müsait.', read: true, time: '3 saat önce' }
  ]);
  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const handleApplyFilters = () => {
    setIsFiltering(true);
    setTimeout(() => {
      setIsFiltering(false);
      setFilterCount(3); // Mock value
    }, 800);
  };

  const handleResetFilters = () => {
    setFilterCount(0);
  };

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-800 dark:text-slate-200 min-h-screen flex flex-col">
      <header className="w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50">
        <div className="px-8 py-4 flex justify-between items-center max-w-[1440px] mx-auto">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="bg-primary p-1.5 rounded-lg">
                <span className="material-icons-round text-white text-2xl">directions_boat</span>
              </div>
              <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                Portlink
              </span>
            </div>
            <nav className="hidden md:flex items-center gap-2 text-sm text-slate-400">
              <span className="hover:text-primary cursor-pointer">Ana Sayfa</span>
              <span className="material-icons-round text-xs">chevron_right</span>
              <span className="text-slate-900 dark:text-slate-200 font-medium">
                Teknik Uzman Arama
              </span>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <button
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full relative transition-colors"
                title="Bildirimler"
              >
                <span className="material-icons-round">notifications</span>
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white dark:border-slate-900" />
                )}
              </button>

              {isNotificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 py-2 z-[60] animate-in fade-in slide-in-from-top-2">
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
            <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden border border-slate-300">
              <img
                alt="User"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA4VCWTXRCQVG0YuMgGDKHf_PMe8wNVN9z8Lct1I2bDnHEKE-PiqWfqR_AInTqQWwAzd27jkZcoRDcdkBm3lTBR6zyTcf_22PFV6iX7dNsF5fCihNh_Qe7x40Xc0Hrz5D8nCuA6W6-CITF2s0p45CZuhS3OzUg08kq3i-CE9q6zv4Nn9AnNabMs43a5yo9lgv6zFiaIQChxjNfuGfsvj9IDcX0Sg-Qqq2TgTuer3Mpwr-SX5Hlo2STyfMDKpH57mEpFTmxpgBAcuR99"
              />
            </div>
          </div>
        </div>
      </header>

      <section className="w-full bg-primary py-4">
        <div className="max-w-[1440px] mx-auto px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-white">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="material-icons-round text-primary-200 opacity-70">search</span>
              <span className="text-sm font-medium tracking-wide">
                Sörvey &amp; Denetim | Tuzla Tersaneler Bölgesi | Aframax Tanker
              </span>
            </div>
          </div>
          <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg text-sm font-medium transition-colors border border-white/20">
            <span className="material-icons-round text-sm">edit</span>
            Aramayı Düzenle
          </button>
        </div>
      </section>

      <main className="max-w-[1440px] mx-auto w-full flex-grow px-8 py-8 flex gap-8">
        <aside className="w-64 flex-shrink-0 hidden lg:block space-y-8">
          <div className="flex items-center justify-between pb-2">
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
          <button onClick={handleResetFilters} className="text-sm text-primary hover:underline font-medium flex items-center transition-all -mt-4">
            <span className="material-icons-round text-sm mr-1">edit</span> Filtreleri Temizle
          </button>

          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
              Uzmanlık Seviyesi
            </h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  className="rounded border-slate-300 text-primary focus:ring-primary w-4 h-4"
                />
                <span className="text-sm text-slate-600 dark:text-slate-400 group-hover:text-primary">
                  Senior
                </span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded border-slate-300 text-primary focus:ring-primary w-4 h-4"
                />
                <span className="text-sm text-slate-600 dark:text-slate-400 group-hover:text-primary">
                  Expert
                </span>
              </label>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
              Sertifikalar
            </h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded border-slate-300 text-primary focus:ring-primary w-4 h-4"
                />
                <span className="text-sm text-slate-600 dark:text-slate-400 group-hover:text-primary">
                  ClassNK
                </span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  className="rounded border-slate-300 text-primary focus:ring-primary w-4 h-4"
                />
                <span className="text-sm text-slate-600 dark:text-slate-400 group-hover:text-primary">
                  ABS
                </span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded border-slate-300 text-primary focus:ring-primary w-4 h-4"
                />
                <span className="text-sm text-slate-600 dark:text-slate-400 group-hover:text-primary">
                  BV (Bureau Veritas)
                </span>
              </label>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
              Güven Skoru
            </h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="radio"
                  name="trust"
                  className="border-slate-300 text-primary focus:ring-primary w-4 h-4"
                />
                <span className="text-sm text-slate-600 dark:text-slate-400">9.5+ Olağanüstü</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="radio"
                  name="trust"
                  defaultChecked
                  className="border-slate-300 text-primary focus:ring-primary w-4 h-4"
                />
                <span className="text-sm text-slate-600 dark:text-slate-400">9.0+ Çok İyi</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="radio"
                  name="trust"
                  className="border-slate-300 text-primary focus:ring-primary w-4 h-4"
                />
                <span className="text-sm text-slate-600 dark:text-slate-400">8.0+ İyi</span>
              </label>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-4">
              Diller
            </h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded border-slate-300 text-primary focus:ring-primary w-4 h-4"
                />
                <span className="text-sm text-slate-600 dark:text-slate-400 group-hover:text-primary">
                  Türkçe
                </span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded border-slate-300 text-primary focus:ring-primary w-4 h-4"
                />
                <span className="text-sm text-slate-600 dark:text-slate-400 group-hover:text-primary">
                  İngilizce
                </span>
              </label>
            </div>
          </div>

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

        <div className="flex-grow space-y-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Uygun Teknik Uzmanlar{' '}
              <span className="text-slate-400 font-normal ml-2">(12 sonuç)</span>
            </h2>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Sıralama:
              </span>
              <select className="bg-transparent border-none text-sm font-semibold text-primary focus:ring-0 cursor-pointer">
                <option>En Yüksek Puan</option>
                <option>En Çok Deneyim</option>
                <option>Yakınlık</option>
              </select>
            </div>
          </div>

          {/* Expert Card 1 */}
          <article className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 hover:shadow-md transition-shadow">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-shrink-0 flex flex-col items-center">
                <div className="w-20 h-20 rounded-2xl overflow-hidden mb-3 border-2 border-slate-100 shadow-inner">
                  <img
                    alt="Kpt. Ahmet Yılmaz"
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZhDGw2VSpS3M0TPCZ2EP7RTcLHU7hmNe3PYNaJ9qU-TIPivI1UBy5xPtuEo_YUtkOnuLmQPcvYJOCH_hAKDotjgi3Wm2kxxIrYb2DvRXhjiDGmFH8EO2zo_yklWnudbmr196zE3sBoS2vSYZYNlkutLw7frbK8wR_PVVq64HeZOypRBIVdUHgbDrtY0r1n1UOAd1VORkQu4y4XJAqgrDbkjbAXDGdpM2z5l4IGzwTHiEWlCiGEapkrs7c7J_XmEFjePfBd5TAXbvI"
                  />
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">verified</span>
                  Müsait
                </div>
              </div>

              <div className="flex-grow">
                <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white leading-none">
                        Kpt. Ahmet Yılmaz
                      </h3>
                      <span className="bg-slate-100 dark:bg-slate-800 text-slate-500 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-tighter">
                        Kıdemli Sörveyör
                      </span>
                    </div>
                    <p className="text-sm text-slate-500 font-medium">
                      Gemi İnşa Mühendisi &amp; Sörveyör |{' '}
                      <span className="text-primary">20+ Yıl Tecrübe</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800/50 p-2 rounded-xl border border-slate-100 dark:border-slate-800">
                    <div className="text-right">
                      <p className="text-[10px] font-bold text-slate-400 uppercase leading-none mb-1">
                        Güven Skoru
                      </p>
                      <p className="text-xl font-black text-primary leading-none">
                        9.8 <span className="text-xs font-normal text-slate-400">/ 10</span>
                      </p>
                    </div>
                    <span className="material-icons-round text-yellow-400 text-2xl">stars</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="bg-primary/5 text-primary text-xs font-semibold px-3 py-1 rounded-lg border border-primary/10">
                    Gemi Denetim
                  </span>
                  <span className="bg-primary/5 text-primary text-xs font-semibold px-3 py-1 rounded-lg border border-primary/10">
                    Hasar Ekspertizi
                  </span>
                  <span className="bg-primary/5 text-primary text-xs font-semibold px-3 py-1 rounded-lg border border-primary/10">
                    Tanker Uzmanı
                  </span>
                  <span className="bg-primary/5 text-primary text-xs font-semibold px-3 py-1 rounded-lg border border-primary/10">
                    SIRE Denetimi
                  </span>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 border border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                    <span className="material-icons-round text-sm">history</span>
                    Son Tamamlanan Projeler
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 italic">
                    "Beşiktaş Tersanesi'nde Aframax tipi geminin periyodik sörveyi ve ClassNK
                    sertifikasyonu başarıyla tamamlandı."
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3 justify-center min-w-[160px]">
                <button className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 px-4 rounded-xl text-sm transition-all shadow-lg shadow-primary/20">
                  Teklif İste
                </button>
                <button className="w-full bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold py-3 px-4 rounded-xl text-sm border border-slate-200 dark:border-slate-700 transition-all">
                  Profili İncele
                </button>
              </div>
            </div>
          </article>

          {/* Expert Card 2 */}
          <article className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 hover:shadow-md transition-shadow">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-shrink-0 flex flex-col items-center">
                <div className="w-20 h-20 rounded-2xl overflow-hidden mb-3 border-2 border-slate-100 shadow-inner">
                  <img
                    alt="Müh. Can Berker"
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuA_828sEaNHK96CnaWBnYr1Ia0PuP2qB32EpvXqam-CLx8yZiAmM1diFeTGSzrj8sE9hDKZYDUbfZ1lyc1bycc2Z1G3XE0n9kbmGCx5pa3rqtKaXbl_BTstUCTaSaRhCOGObKFrizmBJZGN_J-53Ep4ad_7qvaSRyZJ28HjFFs3-JgpvuQonlOV4GkQd68uATR2okxrSDU1lNxjA5OihZVLTBjYanJQvQ9TPUd3vqhTcIvu7Da3UmxDVbh1_lQiN09UKHA0MvnkoXw9"
                  />
                </div>
                <div className="bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                  <span className="material-icons-round text-[14px]">schedule</span>
                  Meşgul
                </div>
              </div>

              <div className="flex-grow">
                <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white leading-none">
                        Müh. Can Berker
                      </h3>
                      <span className="bg-slate-100 dark:bg-slate-800 text-slate-500 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-tighter">
                        Uzman Denetçi
                      </span>
                    </div>
                    <p className="text-sm text-slate-500 font-medium">
                      Marin Makine Uzmanı |{' '}
                      <span className="text-primary">15+ Yıl Tecrübe</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800/50 p-2 rounded-xl border border-slate-100 dark:border-slate-800">
                    <div className="text-right">
                      <p className="text-[10px] font-bold text-slate-400 uppercase leading-none mb-1">
                        Güven Skoru
                      </p>
                      <p className="text-xl font-black text-primary leading-none">
                        9.4 <span className="text-xs font-normal text-slate-400">/ 10</span>
                      </p>
                    </div>
                    <span className="material-icons-round text-yellow-400 text-2xl">stars</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="bg-primary/5 text-primary text-xs font-semibold px-3 py-1 rounded-lg border border-primary/10">
                    Makine Dairesi Denetimi
                  </span>
                  <span className="bg-primary/5 text-primary text-xs font-semibold px-3 py-1 rounded-lg border border-primary/10">
                    Bunker Sörvey
                  </span>
                  <span className="bg-primary/5 text-primary text-xs font-semibold px-3 py-1 rounded-lg border border-primary/10">
                    PSC Hazırlık
                  </span>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4 border border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                    <span className="material-icons-round text-sm">history</span>
                    Son Tamamlanan Projeler
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 italic">
                    "Ambarlı Limanı'nda konteyner gemisi için detaylı ana makine performans analizi
                    raporu hazırlandı."
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3 justify-center min-w-[160px]">
                <button className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 px-4 rounded-xl text-sm transition-all shadow-lg shadow-primary/20">
                  Teklif İste
                </button>
                <button className="w-full bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold py-3 px-4 rounded-xl text-sm border border-slate-200 dark:border-slate-700 transition-all">
                  Profili İncele
                </button>
              </div>
            </div>
          </article>

          <div className="flex items-center justify-center gap-2 pt-4">
            <button className="w-10 h-10 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50">
              <span className="material-icons-round">chevron_left</span>
            </button>
            <button className="w-10 h-10 rounded-lg bg-primary text-white font-bold">1</button>
            <button className="w-10 h-10 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50">
              2
            </button>
            <button className="w-10 h-10 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50">
              3
            </button>
            <span className="text-slate-400 px-2">...</span>
            <button className="w-10 h-10 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50">
              <span className="material-icons-round">chevron_right</span>
            </button>
          </div>
        </div>
      </main>

      <footer className="w-full py-8 px-8 text-center text-slate-400 dark:text-slate-600 text-xs border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
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
      </footer>
    </div>
  );
};

export default TechnicalExpertResults;

