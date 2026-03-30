import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

type ListingType = 'subcontractor' | 'agency-partnership' | 'all';

interface JobListing {
    id: string;
    title: string;
    shipName: string;
    location: string;
    date: string;
    status: 'active' | 'completed' | 'cancelled';
    offerCount: number;
    category: string;
    listingType: 'subcontractor' | 'agency-partnership';
    selectedServices: string[];
    eta: string;
    needText: string;
    fileNames: string[];
    imageUrl?: string;
}

const serviceCategories = [
    { id: 'port-operations', title: 'Liman İşlemleri' },
    { id: 'loading-discharge', title: 'Yükleme – Boşaltma Operasyonu' },
    { id: 'ship-supply', title: 'Gemi İkmal Hizmetleri' },
    { id: 'technical-repair', title: 'Teknik & Tamir Hizmetleri' },
    { id: 'crew-services', title: 'Personel (Crew) Hizmetleri' },
    { id: 'environment-waste', title: 'Çevre & Atık Hizmetleri' },
    { id: 'document-courier', title: 'Evrak & Kurye Hizmetleri' },
];

const ports = [
    'Ambarlı Limanı',
    'Haydarpaşa Limanı',
    'Mersin Limanı',
    'İzmir Alsancak Limanı',
    'Gemlik Limanı',
    'Samsun Limanı',
    'İskenderun Limanı',
    'Yalova Tersanesi',
    'Tuzla Tersanesi',
];

const AgentJobList: React.FC = () => {
    const [step, setStep] = useState<number>(1);
    const navigate = useNavigate();

    // Fake Initial Jobs Data
    const fakeJobs: JobListing[] = [
        {
            id: 'fake-1',
            title: 'Tuzla Tersanesi - Boru Donatım Ekibi Aranıyor',
            shipName: 'MV Anadolu',
            location: 'Tuzla Tersanesi',
            date: '12 Eki 2024',
            status: 'active',
            offerCount: 5,
            category: 'Teknik & Tamir Hizmetleri',
            listingType: 'subcontractor',
            selectedServices: ['Boru & Donatım', 'Kaynak & Yapısal'],
            eta: '2024-10-15T08:00',
            needText: 'Tuzla tersanesinde bakıma girecek gemimiz için 10 kişilik tecrübeli boru donatım ve kaynak ekibine ihtiyacımız vardır.',
            fileNames: [],
            imageUrl: 'https://images.unsplash.com/photo-1596484394142-fbbc5b85a363?auto=format&fit=crop&q=80&w=240&h=180'
        },
        {
            id: 'fake-2',
            title: 'İzmir Limanı - Acente İş Ortaklığı',
            shipName: 'Genel',
            location: 'İzmir Alsancak Limanı',
            date: '10 Eki 2024',
            status: 'active',
            offerCount: 2,
            category: 'Liman İşlemleri',
            listingType: 'agency-partnership',
            selectedServices: ['Giriş / çıkış izinleri', 'Gümrük & liman evrakları'],
            eta: '2024-10-20T12:00',
            needText: 'İzmir Alsancak limanında operasyonlarımızı yürütecek tecrübeli alt acente partneri arıyoruz.',
            fileNames: [],
            imageUrl: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&q=80&w=240&h=180'
        }
    ];

    const [jobs, setJobs] = useState<JobListing[]>(fakeJobs);
    const [filterType, setFilterType] = useState<ListingType>('all');
    const [filterCategory, setFilterCategory] = useState<string>('');
    const [filterPort, setFilterPort] = useState<string>('');
    const [sortBy, setSortBy] = useState<string>('newest');

    useEffect(() => {
        const storedJobs = localStorage.getItem('jobs');
        if (storedJobs) {
            const parsed = JSON.parse(storedJobs);
            if (parsed && Array.isArray(parsed)) {
                setJobs([...parsed, ...fakeJobs]);
            }
        }
    }, []);

    const filteredJobs = useMemo(() => {
        let result = jobs.filter(job => {
            if (filterType !== 'all' && job.listingType !== filterType) return false;
            if (filterCategory && job.category !== filterCategory) return false;
            if (filterPort && job.location !== filterPort) return false;
            return true;
        });
        if (sortBy === 'newest') result.reverse();
        return result;
    }, [jobs, filterType, filterCategory, filterPort, sortBy]);

    const confirmTypeSelection = () => {
        if (filterType === 'subcontractor') {
            // İlan Ver seçilirse doğrudan hızlı post sayfasına git
            navigate('/dashboard/agent/quick-post');
        } else if (filterType === 'agency-partnership') {
            // Acente ortaklığı seçilirse liste görünümüne (Step 2) devam et
            setStep(2);
        }
    };

    const clearFilters = () => {
        setFilterCategory('');
        setFilterPort('');
    };

    // Render Step 1: Decision Page
    if (step === 1) {
        return (
            <div className="min-h-[calc(100vh-80px)] bg-slate-50 flex items-center justify-center p-4">
                <div className="max-w-[900px] w-full bg-white rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-slate-100 p-12 md:p-16 text-center">
                    <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 tracking-tight">Nasıl bir destek arıyorsunuz?</h1>
                    <p className="text-slate-500 mb-12 text-lg font-medium">İhtiyaçlarınıza en uygun çözüm portalını başlatmak için lütfen size uygun olan seçeneği işaretleyin.</p>

                    <div className="grid md:grid-cols-2 gap-8 mb-12 text-left">
                        {/* SOL KART: İLAN VER */}
                        <button
                            onClick={() => setFilterType('subcontractor')}
                            className={`relative rounded-[2.5rem] border-2 p-10 transition-all duration-500 text-left cursor-pointer overflow-hidden flex flex-col h-full group ${
                                filterType === 'subcontractor'
                                    ? 'border-blue-600 bg-blue-50/30 shadow-xl ring-4 ring-blue-600/5'
                                    : 'border-slate-100 bg-white hover:border-blue-200 hover:shadow-lg'
                            }`}
                        >
                            {filterType === 'subcontractor' && (
                                <div className="absolute top-8 right-8 flex items-center justify-center w-7 h-7 rounded-full bg-blue-600 text-white animate-in zoom-in">
                                    <span className="material-icons-round text-sm font-bold">check</span>
                                </div>
                            )}
                            <div className={`mb-8 flex h-16 w-16 items-center justify-center rounded-2xl transition-all duration-500 shadow-sm ${
                                filterType === 'subcontractor' ? 'bg-blue-600 text-white scale-110' : 'bg-slate-100 text-slate-400 group-hover:text-blue-600 group-hover:bg-blue-50'
                            }`}>
                                <span className="material-icons-round text-3xl">post_add</span>
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-3">İlan Ver</h3>
                            <p className="text-slate-500 text-sm leading-relaxed font-medium">
                                Liman hizmetleri veya operasyonel destek için hızlıca iş talebi oluşturun ve profesyonel ekiplerden teklif toplayın.
                            </p>
                        </button>

                        {/* SAĞ KART: ACENTE ORTAKLIĞI */}
                        <button
                            onClick={() => setFilterType('agency-partnership')}
                            className={`relative rounded-[2.5rem] border-2 p-10 transition-all duration-500 text-left cursor-pointer overflow-hidden flex flex-col h-full group ${
                                filterType === 'agency-partnership'
                                    ? 'border-violet-600 bg-violet-50/30 shadow-xl ring-4 ring-violet-600/5'
                                    : 'border-slate-100 bg-white hover:border-violet-200 hover:shadow-lg'
                            }`}
                        >
                            {filterType === 'agency-partnership' && (
                                <div className="absolute top-8 right-8 flex items-center justify-center w-7 h-7 rounded-full bg-violet-600 text-white animate-in zoom-in">
                                    <span className="material-icons-round text-sm font-bold">check</span>
                                </div>
                            )}
                            <div className={`mb-8 flex h-16 w-16 items-center justify-center rounded-2xl transition-all duration-500 shadow-sm ${
                                filterType === 'agency-partnership' ? 'bg-violet-600 text-white scale-110' : 'bg-slate-100 text-slate-400 group-hover:text-violet-600 group-hover:bg-violet-50'
                            }`}>
                                <span className="material-icons-round text-3xl">handshake</span>
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-3">Acente Ortaklığı Ara</h3>
                            <p className="text-slate-500 text-sm leading-relaxed font-medium">
                                Belirli bölge veya limanlarda gemi acenteliği ve geniş çaplı işbirlikleri için uzman partnerleri sistemde listeleyin.
                            </p>
                        </button>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
                        <button
                            onClick={confirmTypeSelection}
                            disabled={filterType === 'all'}
                            className="px-12 py-4 bg-blue-600 text-white rounded-2xl font-bold text-lg hover:bg-blue-700 transition duration-300 disabled:opacity-50 shadow-xl hover:-translate-y-1 active:translate-y-0 transform"
                        >
                            Devam Et
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Render Step 2: List View (Acente Ortaklığı seçilince burası gelir)
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
            {(filterCategory || filterPort) && (
                <div className="bg-slate-100/80 border-b border-slate-200 px-6 lg:px-12 py-3 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-10 backdrop-blur-md">
                    <div className="flex items-center gap-4 flex-wrap text-sm font-semibold">
                        <span className="text-slate-500 tracking-wider uppercase">Filtreler:</span>
                        {filterCategory && <span className="bg-white border border-slate-200 text-slate-700 px-3 py-1.5 rounded-full shadow-sm">Kategori: {filterCategory}</span>}
                        {filterPort && <span className="bg-white border border-slate-200 text-slate-700 px-3 py-1.5 rounded-full shadow-sm">Konum: {filterPort}</span>}
                    </div>
                    <button onClick={clearFilters} className="text-blue-600 hover:text-blue-800 text-sm font-bold flex items-center gap-1">Filtreleri Temizle</button>
                </div>
            )}

            <div className="flex flex-col lg:flex-row flex-1 max-w-[1600px] w-full mx-auto p-4 lg:p-8 gap-8">
                <aside className="w-full lg:w-72 flex-shrink-0">
                    <div className="bg-white rounded-2xl border border-slate-200 p-6 sticky top-24 shadow-sm">
                        <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2 border-b border-slate-100 pb-4">
                            <span className="material-icons-round text-blue-600">tune</span> Filtreler
                        </h2>
                        <div className="mb-8">
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Hizmet Kategorisi</h3>
                            <div className="space-y-3">
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <input type="radio" checked={filterCategory === ''} onChange={() => setFilterCategory('')} className="w-5 h-5 accent-blue-600" />
                                    <span className="text-sm font-medium text-slate-600">Tümü</span>
                                </label>
                                {serviceCategories.map(cat => (
                                    <label key={cat.id} className="flex items-center gap-3 cursor-pointer group">
                                        <input type="radio" checked={filterCategory === cat.title} onChange={() => setFilterCategory(cat.title)} className="w-5 h-5 accent-blue-600" />
                                        <span className="text-sm font-medium text-slate-600">{cat.title}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Liman</h3>
                            <select value={filterPort} onChange={(e) => setFilterPort(e.target.value)} className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-xl px-4 py-3 outline-none">
                                <option value="">Tüm Limanlar</option>
                                {ports.map((port) => <option key={port} value={port}>{port}</option>)}
                            </select>
                        </div>
                    </div>
                </aside>

                <div className="flex-1 min-w-0">
                    <div className="mb-4">
                        <button onClick={() => setStep(1)} className="flex items-center gap-1.5 text-slate-500 hover:text-blue-600 font-bold transition-colors">
                            <span className="material-icons-round text-lg">arrow_back</span> Seçime Geri Dön
                        </button>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-800">Uygun Acente İlanları Bulundu</h2>
                            <p className="text-slate-500 text-sm mt-1 font-medium">{filteredJobs.length} kayıtlı ilan listeleniyor.</p>
                        </div>
                        <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl px-4 py-2 shadow-sm">
                            <span className="text-xs font-bold text-slate-400 tracking-wider">SIRALA:</span>
                            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="bg-transparent text-sm font-bold text-slate-800 outline-none">
                                <option value="newest">En Yeni</option>
                                <option value="oldest">En Eski</option>
                            </select>
                        </div>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                        <div className="flex flex-col">
                            {filteredJobs.length === 0 ? (
                                <div className="py-20 text-center">
                                    <h3 className="text-lg font-bold text-slate-700">İlan bulunamadı</h3>
                                </div>
                            ) : (
                                filteredJobs.map((job) => (
                                    <div key={job.id} onClick={() => navigate(`/dashboard/agent/listing/${job.id}`)} className="flex flex-col md:grid md:grid-cols-[120px_1fr_140px_140px] gap-4 items-center px-6 py-5 border-b last:border-0 hover:bg-slate-50 transition-colors cursor-pointer">
                                        <div className="w-[120px] h-[90px] bg-slate-100 rounded-lg overflow-hidden shrink-0 border border-slate-200 hidden md:block">
                                            <img src={job.imageUrl} alt="Ship" className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex flex-col justify-center w-full">
                                            <div className="text-[11px] font-bold text-slate-400 mb-1">ID: {job.id.replace('fake-', '13075')}</div>
                                            <h3 className="text-base font-bold text-blue-900 leading-tight mb-1">{job.title}</h3>
                                            <div className="text-xs font-bold text-amber-600 flex items-center gap-1 uppercase tracking-wider">
                                                <span className="material-icons-round text-xs">stars</span> {job.listingType === 'subcontractor' ? 'İlan Ver' : 'İş Ortaklığı'}
                                            </div>
                                        </div>
                                        <div className="text-sm font-bold text-slate-600 text-center">{job.category}</div>
                                        <div className="text-sm font-bold text-slate-900 text-center flex flex-col">
                                            <span className="text-slate-500 font-normal text-xs uppercase tracking-tighter mb-1">Konum:</span>
                                            {job.location}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AgentJobList;