import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Toast from '@/components/Toast';
import CreateOfferModal from '@/features/offers/components/CreateOfferModal';

const LocalAgentResults: React.FC = () => {
    const navigate = useNavigate();
    const [isFiltering, setIsFiltering] = useState(false);
    const [filterCount, setFilterCount] = useState(1);
    const [toastMessage, setToastMessage] = useState('');
    const [region, setRegion] = useState('istanbul');
    const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);

    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const [notifications, setNotifications] = useState([
        { id: 1, text: 'Yeni bir acente talebinizi inceledi.', read: false, time: '10 dk önce' }
    ]);
    const unreadCount = notifications.filter(n => !n.read).length;

    const markAllAsRead = () => {
        setNotifications(notifications.map(n => ({ ...n, read: true })));
    };

    const handleApplyFilters = () => {
        setIsFiltering(true);
        setTimeout(() => {
            setIsFiltering(false);
            setFilterCount(region ? 1 : 0);
            setToastMessage('Filtreler başarıyla uygulandı.');
        }, 800);
    };

    const handleResetFilters = () => {
        setRegion('');
        setFilterCount(0);
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 font-display flex flex-col">
            {/* Header */}
            <header className="w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-[50]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <div className="flex items-center gap-3">
                            <div className="bg-primary p-2.5 rounded-xl">
                                <span className="material-icons-round text-white">directions_boat</span>
                            </div>
                            <span className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                                Portlink
                            </span>
                        </div>
                        <nav className="hidden md:flex items-center gap-1 bg-slate-100/50 dark:bg-slate-800/50 p-1.5 rounded-xl border border-slate-200 dark:border-slate-700">
                            <button onClick={() => navigate('/home')} className="px-4 py-2 text-sm font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
                                İş İlanları
                            </button>
                            <button className="px-4 py-2 text-sm font-bold bg-white dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg shadow-sm border border-slate-200 dark:border-slate-600">
                                Acenteler
                            </button>
                            <button disabled className="px-4 py-2 text-sm font-semibold text-slate-400 dark:text-slate-500 cursor-not-allowed flex items-center gap-2">
                                Gemi Profilim
                                <span className="text-[10px] bg-slate-200 dark:bg-slate-700 px-2 py-0.5 rounded-full">Yakında</span>
                            </button>
                        </nav>
                    </div>
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
                                className="w-full h-full object-cover"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC9FOS72IJi0p5KqMnas8IyOL61iNFogXtsYYQbNPNsSQ_xcVFF1scvDW0bcmVsQiiw5O9-dEv6I0-SjNio48vnLWxGafqh_di5b7ikOuKKbPTiQvVgfkaIqNkBf415P_gAJAGaAvuaeJ786swyNsiS4szijbG9n3rXoKjycpYfvqCpbLNCgzI0kOCMIvrh1R4jz69POMfVJ6yxKEIPEVKyzHq1K0FxIFq90nuLopUE7kf-SE8wOoSroo_eux2HqvQr74LcsNcNAtsk"
                            />
                        </div>
                    </div>
                </div>
            </header>

            <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex gap-8 relative">
                {/* Sidebar Filters */}
                <aside className="w-80 flex-shrink-0 hidden lg:block sticky top-28 h-[calc(100vh-8rem)] overflow-hidden">
                    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 h-full flex flex-col shadow-sm">
                        <div className="p-5 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50 rounded-t-2xl">
                            <h2 className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
                                <span className="material-icons-round text-primary text-xl">tune</span>
                                Filtreler
                                {filterCount > 0 && (
                                    <span className="bg-primary text-white text-xs px-2 py-0.5 rounded-full ml-1">
                                        {filterCount}
                                    </span>
                                )}
                            </h2>
                            <button onClick={handleResetFilters} className="text-xs font-semibold text-slate-500 hover:text-primary transition-colors">
                                Temizle
                            </button>
                        </div>
                        <div className="p-6 overflow-y-auto flex-grow flex flex-col gap-6">
                            <div className="space-y-3">
                                <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">Hizmet Bölgesi</h3>
                                <div className="relative">
                                    <span className="material-icons-round absolute left-3 top-2.5 text-slate-400 text-[20px]">location_on</span>
                                    <select
                                        value={region}
                                        onChange={(e) => setRegion(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary appearance-none transition-all"
                                    >
                                        <option value="">Tümü</option>
                                        <option value="istanbul">İstanbul (Ambarlı)</option>
                                        <option value="izmir">İzmir (Aliağa)</option>
                                        <option value="mersin">Mersin</option>
                                    </select>
                                    <span className="material-icons-round absolute right-3 top-2.5 text-slate-400 pointer-events-none">expand_more</span>
                                </div>
                            </div>
                        </div>
                        <div className="p-5 border-t border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 rounded-b-2xl">
                            <button
                                onClick={handleApplyFilters}
                                disabled={isFiltering}
                                className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-md shadow-primary/20 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-wait"
                            >
                                {isFiltering ? (
                                    <>
                                        <span className="material-icons-round animate-spin">refresh</span>
                                        Uygulanıyor...
                                    </>
                                ) : (
                                    'Filtreleri Uygula'
                                )}
                            </button>
                        </div>
                    </div>
                </aside>

                {/* List Content */}
                <div className="flex-grow">
                    <div className="flex justify-between items-end mb-6">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight">
                                Acente İş İlanları
                            </h1>
                            <p className="text-slate-500 dark:text-slate-400 font-medium">
                                Seçimlerinize uygun son yayınlanan acente talepleri ({region ? region : 'tümü'})
                            </p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 flex flex-col md:flex-row gap-6 shadow-sm hover:border-primary/50 transition-colors">
                            <div className="flex-grow">
                                <div className="flex justify-between items-start mb-2">
                                    <div className="flex items-center gap-3">
                                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">Port Agency Service</h3>
                                        <span className="bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs font-bold px-2.5 py-1 rounded-md flex items-center gap-1">
                                            <span className="material-icons-round text-[14px]">bolt</span> Yeni
                                        </span>
                                    </div>
                                    <span className="text-slate-500 dark:text-slate-400 text-sm font-medium">2 saat önce</span>
                                </div>

                                <div className="flex flex-wrap gap-4 text-sm text-slate-600 dark:text-slate-300 mb-4 bg-slate-50 dark:bg-slate-900/50 inline-flex p-3 rounded-xl border border-slate-100 dark:border-slate-700">
                                    <div className="flex items-center gap-1.5"><span className="material-icons-round text-primary text-[18px]">location_on</span> İstanbul (Ambarlı)</div>
                                    <div className="w-px bg-slate-300 dark:bg-slate-700"></div>
                                    <div className="flex items-center gap-1.5"><span className="material-icons-round text-primary text-[18px]">directions_boat</span> Bulk Carrier</div>
                                    <div className="w-px bg-slate-300 dark:bg-slate-700"></div>
                                    <div className="flex items-center gap-1.5"><span className="material-icons-round text-primary text-[18px]">event</span> 25 Ekim 2024</div>
                                </div>

                                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6">
                                    Gelecek hafta Ambarlı limanına yanaşacak yük gemimiz için tam kapsamlı acente hizmeti aranmaktadır. Gümrükleme, personel değişimi ve yakıt ikmali desteği gerekecektir.
                                </p>

                                <div className="flex gap-3">
                                    <button
                                        onClick={() => setIsOfferModalOpen(true)}
                                        className="flex-1 bg-primary hover:bg-primary/90 text-white font-bold py-2.5 px-4 rounded-xl transition-all shadow-md shadow-primary/20 text-sm"
                                    >
                                        Hemen Teklif Ver
                                    </button>
                                    <button 
                                        onClick={() => navigate('/dashboard/agent/listing/1')}
                                        className="flex-1 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-600 transition-colors text-sm"
                                    >
                                        Detayları Görüntüle
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 border-dashed dark:border-slate-700 p-8 text-center mt-6">
                            <div className="w-16 h-16 bg-white dark:bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border border-slate-100 dark:border-slate-800">
                                <span className="material-icons-round text-3xl text-slate-400">search_off</span>
                            </div>
                            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">Başka İlan Bulunamadı</h3>
                            <p className="text-slate-500 text-sm max-w-md mx-auto">
                                Arama kriterlerinize uygun başka aktif acente ilanı bulunmamaktadır. Filtreleri değiştirerek yeniden arama yapabilirsiniz.
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage('')} />}

            <CreateOfferModal
                isOpen={isOfferModalOpen}
                onClose={() => setIsOfferModalOpen(false)}
                jobTitle="Port Agency Service (Bulk Carrier)"
                companyName="Kuzey Denizcilik"
            />
        </div>
    );
};

export default LocalAgentResults;
