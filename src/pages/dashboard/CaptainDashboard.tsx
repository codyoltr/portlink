import React from 'react';
import DashboardLayout from '../../components/dashboard/DashboardLayout';

const CaptainDashboard: React.FC = () => {
    return (
        <DashboardLayout role="captain">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Kaptan Özeti</h2>
                <p className="text-slate-500 dark:text-slate-400">Aktif seferleriniz, bekleyen hizmet onayları ve liman durumları.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50 flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-sky-50 dark:bg-sky-900/20 text-sky-600 dark:text-sky-400 rounded-xl">
                            <span className="material-icons-round">sailing</span>
                        </div>
                        <span className="flex items-center gap-1 text-sm font-bold text-sky-500 bg-sky-50 dark:bg-sky-500/10 px-2 py-1 rounded-md">
                            <span className="material-icons-round text-[14px]">arrow_forward</span>
                            Seyirde
                        </span>
                    </div>
                    <h3 className="text-slate-500 dark:text-slate-400 text-sm font-semibold mb-1">Gemi Durumu</h3>
                    <p className="text-xl font-extrabold text-slate-800 dark:text-white">M/V Aegean Star</p>
                    <div className="mt-4 flex items-center justify-between text-sm text-slate-500 border-t border-slate-100 dark:border-slate-700 pt-3">
                        <span>Varış: Ambarlı</span>
                        <span className="font-semibold text-slate-700 dark:text-slate-300">Tahmini: 12 Saat</span>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50 flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 rounded-xl">
                            <span className="material-icons-round">rule</span>
                        </div>
                    </div>
                    <h3 className="text-slate-500 dark:text-slate-400 text-sm font-semibold mb-1">Bekleyen Onaylar</h3>
                    <p className="text-3xl font-extrabold text-slate-800 dark:text-white">4</p>
                    <div className="mt-4 text-sm text-amber-600 font-medium">
                        Tedarik ve Kumanya fişleri.
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50 flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 rounded-xl">
                            <span className="material-icons-round">history</span>
                        </div>
                    </div>
                    <h3 className="text-slate-500 dark:text-slate-400 text-sm font-semibold mb-1">Sertifika / Bakım Uyarısı</h3>
                    <p className="text-3xl font-extrabold text-slate-800 dark:text-white">1</p>
                    <div className="mt-4 text-sm text-rose-600 font-medium flex items-center gap-1">
                        <span className="material-icons-round text-[16px]">error</span>
                        Ana Makine Periyodik (Yaklaştı)
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50 overflow-hidden">
                <div className="p-6 border-b border-slate-100 dark:border-slate-700/50 flex justify-between items-center">
                    <h3 className="text-lg font-bold text-slate-800 dark:text-white">Sefer Notları & Liman Süreçleri</h3>
                    <button className="bg-primary hover:bg-primary/90 text-white font-bold py-2 px-4 rounded-lg text-sm transition-colors">
                        Yeni Rapor Ekle
                    </button>
                </div>
                <div className="p-6 space-y-6">
                    <div className="flex gap-4">
                        <div className="w-12 flex flex-col items-center">
                            <div className="w-4 h-4 rounded-full bg-emerald-500 border-4 border-emerald-100 dark:border-emerald-900 relative z-10" />
                            <div className="w-0.5 h-full bg-slate-200 dark:bg-slate-700 -mt-2" />
                        </div>
                        <div className="pb-6">
                            <h4 className="font-bold text-slate-900 dark:text-white">Pire Limanı Çıkışı</h4>
                            <p className="text-sm text-slate-500 mt-1">Gümrük işlemleri tamamlandı. Yakıt ikmali yapıldı.</p>
                            <span className="text-xs font-semibold text-slate-400 mt-2 block">Dün, 14:30</span>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <div className="w-12 flex flex-col items-center">
                            <div className="w-4 h-4 rounded-full bg-primary border-4 border-primary/20 relative z-10" />
                            <div className="w-0.5 h-full bg-slate-200 dark:bg-slate-700 -mt-2 opacity-0" />
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900 dark:text-white">Ambarlı Limanına Varış Bekleniyor</h4>
                            <p className="text-sm text-slate-500 mt-1">Hava muhalefeti yok. Planlanan hızda ilerleniyor (14 kts). Kumanya talebi acenteye geçildi.</p>
                            <span className="text-xs font-semibold text-slate-400 mt-2 block">Yarın, 08:00 (ETA)</span>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default CaptainDashboard;
