import React, { useState, useEffect, useMemo } from 'react';

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
            needText: 'Tuzla tersanesinde bakıma girecek gemimiz için 10 kişilik tecrübeli boru donatım ve kaynak ekibine ihtiyacımız vardır. Klas onaylı kaynakçı sertifikası şarttır.',
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
            needText: 'İzmir Alsancak limanında operasyonlarımızı yürütecek, yerel resmi kurumlarla arası iyi ve tecrübeli alt acente partneri arıyoruz. Uzun dönemli sözleşme yapılacaktır.',
            fileNames: [],
            imageUrl: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&q=80&w=240&h=180'
        },
        {
            id: 'fake-3',
            title: 'Mersin Limanı - Yükleme Operasyon Desteği',
            shipName: 'MV Gökhan',
            location: 'Mersin Limanı',
            date: '08 Eki 2024',
            status: 'active',
            offerCount: 8,
            category: 'Yükleme – Boşaltma Operasyonu',
            listingType: 'subcontractor',
            selectedServices: ['Tahliye / yükleme organizasyonu', 'Konteyner işlemleri'],
            eta: '2024-10-12T06:00',
            needText: 'Konteyner gemimizin yükleme operasyonunu hızlandıracak donanımlı vinç operatörlerine ve liman içi lashing ekibine acil ihtiyaç var.',
            fileNames: [],
            imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=240&h=180'
        },
        {
            id: 'fake-4',
            title: 'Ambarlı Limanı - Çevre & Atık Alım Hizmeti',
            shipName: 'MSC Barbara',
            location: 'Ambarlı Limanı',
            date: '05 Eki 2024',
            status: 'active',
            offerCount: 1,
            category: 'Çevre & Atık Hizmetleri',
            listingType: 'subcontractor',
            selectedServices: ['Atık alımı', 'Sludge / çöp'],
            eta: '2024-10-09T18:00',
            needText: 'Ambarlı limanına yanaşacak gemimizdeki sludge atıkların tahliyesi için acil MARPOL standartlarında alım yapabilen firma aranmaktadır.',
            fileNames: [],
            imageUrl: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=240&h=180'
        },
        {
            id: 'fake-5',
            title: 'Samsun Limanı - Kumanya ve Yedek Parça İkmali',
            shipName: 'Star II',
            location: 'Samsun Limanı',
            date: '01 Eki 2024',
            status: 'active',
            offerCount: 4,
            category: 'Gemi İkmal Hizmetleri',
            listingType: 'subcontractor',
            selectedServices: ['Kumanya', 'Yedek parça'],
            eta: '2024-10-05T09:30',
            needText: 'Mürettebat değişimi esnasında verilecek toplu kumanya ile acil yedek parça teslimatını pürüzsüz halledecek profesyonel lojistik partneri.',
            fileNames: [],
            imageUrl: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80&w=240&h=180'
        }
    ];

    // States for list filtering
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

    // Derived states
    const filteredJobs = useMemo(() => {
        let result = jobs.filter(job => {
            if (filterType !== 'all' && job.listingType !== filterType) return false;
            if (filterCategory && job.category !== filterCategory) return false;
            if (filterPort && job.location !== filterPort) return false;
            return true;
        });

        if (sortBy === 'newest') {
            // Assumes newest first by default in our mock add. We could sort by date string actually.
            result.reverse();
        }
        return result;
    }, [jobs, filterType, filterCategory, filterPort, sortBy]);

    const handleSelectType = (type: ListingType) => {
        setFilterType(type);
    };

    const confirmTypeSelection = () => {
        if (filterType !== 'all') {
            setStep(2);
        }
    };

    const clearFilters = () => {
        setFilterCategory('');
        setFilterPort('');
        // Do not clear the filterType as that is the core segment they are viewing
    };

    // Render Step 1
    if (step === 1) {
        return (
            <div className="min-h-[calc(100vh-80px)] bg-slate-50 flex items-center justify-center p-4">
                <div className="max-w-[900px] w-full bg-white rounded-[2rem] shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-slate-100 p-10 md:p-16 text-center shadow-sm">
                    <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Nasıl bir destek arıyorsunuz?</h1>
                    <p className="text-slate-500 mb-12 text-lg">İhtiyaçlarınıza en uygun çözüm portalını listelememiz için lütfen size uygun olan seçeneği işaretleyin.</p>
                    
                    <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-12 text-left">
                        <button
                            onClick={() => handleSelectType('subcontractor')}
                            className={`relative rounded-2xl border-2 p-8 transition-all duration-300 text-left cursor-pointer overflow-hidden ${
                                filterType === 'subcontractor'
                                    ? 'border-blue-600 bg-blue-50/50 shadow-md ring-4 ring-blue-600/10'
                                    : 'border-slate-200 hover:border-blue-300 hover:bg-slate-50 shadow-sm'
                            }`}
                        >
                            {filterType === 'subcontractor' && (
                                <div className="absolute top-6 right-6 flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white">
                                    <span className="material-icons-round text-sm font-bold">check</span>
                                </div>
                            )}
                            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm">
                                <span className="material-icons-round text-2xl">people</span>
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Taşeron Arıyorum</h3>
                            <p className="text-slate-500 text-sm leading-relaxed font-medium">Liman hizmetleri, operasyonel destek ve iş gücü gereksinimleriniz için profesyonel ekiplerle eşleşin.</p>
                        </button>

                        <button
                            onClick={() => handleSelectType('agency-partnership')}
                            className={`relative rounded-2xl border-2 p-8 transition-all duration-300 text-left cursor-pointer overflow-hidden ${
                                filterType === 'agency-partnership'
                                    ? 'border-blue-600 bg-blue-50/50 shadow-md ring-4 ring-blue-600/10'
                                    : 'border-slate-200 hover:border-blue-300 hover:bg-slate-50 shadow-sm'
                            }`}
                        >
                            {filterType === 'agency-partnership' && (
                                <div className="absolute top-6 right-6 flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white">
                                    <span className="material-icons-round text-sm font-bold">check</span>
                                </div>
                            )}
                            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-violet-600 text-white shadow-sm">
                                <span className="material-icons-round text-2xl">handshake</span>
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">İş Ortaklığı / Acente Arıyorum</h3>
                            <p className="text-slate-500 text-sm leading-relaxed font-medium">Belirli bölge veya limanlarda gemi acenteliği ve geniş çaplı işbirlikleri için uzman partnerler bulun.</p>
                        </button>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
                        <button
                            onClick={() => window.history.back()}
                            className="px-10 py-4 bg-white text-slate-700 rounded-xl font-bold text-lg hover:bg-slate-50 border border-slate-200 transition duration-300 shadow-sm"
                        >
                            Ana Ekrana Dön
                        </button>
                        <button
                            onClick={confirmTypeSelection}
                            disabled={filterType === 'all'}
                            className="px-12 py-4 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_8px_20px_rgba(37,99,235,0.25)] hover:shadow-[0_12px_25px_rgba(37,99,235,0.35)] hover:-translate-y-0.5 active:translate-y-0 transform"
                        >
                            Devam Et
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Render Step 2 (List View)
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
            {/* Top Bar filtering display */}
            { (filterCategory || filterPort) && (
            <div className="bg-slate-100/80 border-b border-slate-200 px-6 lg:px-12 py-3 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-10 backdrop-blur-md">
                <div className="flex items-center gap-4 flex-wrap text-sm font-semibold">
                    <span className="text-slate-500 tracking-wider">ARAMA KRİTERLERİ:</span>
                    {filterCategory && (
                        <span className="inline-flex items-center gap-1.5 bg-white border border-slate-200 text-slate-700 px-3 py-1.5 rounded-full shadow-sm">
                            <span className="material-icons-round text-blue-500 text-sm">category</span>
                            Kategori: {filterCategory}
                        </span>
                    )}
                    {filterPort && (
                        <span className="inline-flex items-center gap-1.5 bg-white border border-slate-200 text-slate-700 px-3 py-1.5 rounded-full shadow-sm">
                            <span className="material-icons-round text-blue-500 text-sm">location_on</span>
                            Konum: {filterPort}
                        </span>
                    )}
                </div>
                
                <button onClick={clearFilters} className="text-blue-600 hover:text-blue-800 text-sm font-bold flex items-center gap-1 transition-colors">
                    <span className="material-icons-round text-[18px]">close</span>
                    Filtreleri Temizle
                </button>
            </div>
            )}

            {/* Main Content Area */}
            <div className="flex flex-col lg:flex-row flex-1 max-w-[1600px] w-full mx-auto p-4 lg:p-8 gap-8">
                
                {/* Sidebar Filters */}
                <aside className="w-full lg:w-72 flex-shrink-0">
                    <div className="bg-white rounded-2xl border border-slate-200 p-6 sticky top-24 shadow-sm">
                        <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2 border-b border-slate-100 pb-4">
                            <span className="material-icons-round text-blue-600">tune</span>
                            Filtreler
                        </h2>

                        {/* Category Filter */}
                        <div className="mb-8">
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">HİZMET KATEGORİSİ</h3>
                            <div className="space-y-3">
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <div className="relative flex items-center justify-center">
                                        <input 
                                            type="radio" 
                                            name="category"
                                            checked={filterCategory === ''}
                                            onChange={() => setFilterCategory('')}
                                            className="w-5 h-5 appearance-none rounded-full border border-slate-300 checked:border-blue-600 transition-colors"
                                        />
                                        {filterCategory === '' && <div className="absolute w-2.5 h-2.5 bg-blue-600 rounded-full pointer-events-none"></div>}
                                    </div>
                                    <span className={`text-sm font-medium ${filterCategory === '' ? 'text-blue-700' : 'text-slate-600 group-hover:text-slate-900 transition-colors'}`}>Tümü</span>
                                </label>
                                {serviceCategories.map(cat => (
                                    <label key={cat.id} className="flex items-center gap-3 cursor-pointer group">
                                        <div className="relative flex items-center justify-center">
                                            <input 
                                                type="radio" 
                                                name="category"
                                                checked={filterCategory === cat.title}
                                                onChange={() => setFilterCategory(cat.title)}
                                                className="w-5 h-5 appearance-none rounded-full border border-slate-300 checked:border-blue-600 transition-colors"
                                            />
                                            {filterCategory === cat.title && <div className="absolute w-2.5 h-2.5 bg-blue-600 rounded-full pointer-events-none"></div>}
                                        </div>
                                        <span className={`text-sm font-medium ${filterCategory === cat.title ? 'text-blue-700' : 'text-slate-600 group-hover:text-slate-900 transition-colors'}`}>{cat.title}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Port Filter */}
                        <div>
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">LİMAN ONAYI</h3>
                            <select 
                                value={filterPort}
                                onChange={(e) => setFilterPort(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-sm font-medium rounded-xl px-4 py-3 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors appearance-none"
                                style={{ backgroundImage: "url(\"data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e\")", backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1em' }}
                            >
                                <option value="">Tüm Limanlar</option>
                                {ports.map((port) => (
                                    <option key={port} value={port}>{port}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </aside>

                {/* Job Listing Main */}
                <div className="flex-1 min-w-0">
                    <div className="mb-4">
                        <button onClick={() => setStep(1)} className="flex items-center gap-1.5 text-slate-500 hover:text-blue-600 font-bold transition-colors mb-4 md:mb-0">
                            <span className="material-icons-round text-lg">arrow_back</span>
                            Seçime Geri Dön
                        </button>
                    </div>
                
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-800">
                                {filterType === 'subcontractor' ? 'Uygun Taşeron İlanları Bulundu' : 'Uygun Acente İlanları Bulundu'}
                            </h2>
                            <p className="text-slate-500 text-sm mt-1 font-medium">Belirlenen kriterlerinize uyan <strong className="text-slate-800">{filteredJobs.length} kayıtlı ilan</strong> listeleniyor.</p>
                        </div>
                        <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl px-4 py-2 shadow-sm shrink-0">
                            <span className="text-xs font-bold text-slate-400">SIRALA:</span>
                            <select 
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="bg-transparent text-sm font-bold text-slate-800 outline-none cursor-pointer pr-2"
                            >
                                <option value="newest">En Yeni İlanlar</option>
                                <option value="oldest">En Eski İlanlar</option>
                            </select>
                        </div>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden text-sm">
                        {/* Table Header */}
                        <div className="hidden md:grid grid-cols-[120px_1fr_140px_120px_140px] gap-4 bg-slate-50/80 border-b border-slate-200 px-4 py-2.5 font-bold text-slate-500 text-center items-center">
                            <div></div>
                            <div className="text-left">İlan Başlığı</div>
                            <div>Kategori</div>
                            <div>İlan Tarihi</div>
                            <div>Konum</div>
                        </div>

                        {/* Table Body */}
                        <div className="flex flex-col">
                            {filteredJobs.length === 0 ? (
                                <div className="py-16 text-center">
                                    <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <span className="material-icons-round text-3xl">search_off</span>
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-700 mb-2">Kriterlere uygun ilan bulunamadı</h3>
                                    <p className="text-slate-500">Filtrelerinizi değiştirerek veya temizleyerek yeniden deneyin.</p>
                                    <button 
                                        onClick={clearFilters}
                                        className="mt-6 text-blue-600 font-bold hover:text-blue-800 transition-colors underline underline-offset-4"
                                    >
                                        Filtreleri Temizle
                                    </button>
                                </div>
                            ) : (
                                filteredJobs.map((job, index) => (
                                    <div 
                                        key={job.id} 
                                        className={`flex flex-col md:grid md:grid-cols-[120px_1fr_140px_120px_140px] gap-4 items-center px-4 py-3 border-b last:border-0 border-slate-200 transition-colors hover:bg-blue-50/30 ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50/40'}`}
                                    >
                                        {/* Image Column */}
                                        <div className="w-[120px] h-[90px] bg-slate-200 rounded overflow-hidden shrink-0 hidden md:block border border-slate-200 relative">
                                            <img 
                                                src={job.imageUrl || "https://images.unsplash.com/photo-1596484394142-fbbc5b85a363?auto=format&fit=crop&q=80&w=240&h=180"} 
                                                alt="Ship" 
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        {/* Title Column */}
                                        <div className="flex flex-col justify-center min-w-0 w-full pr-4">
                                            <div className="text-[11px] font-semibold text-slate-400 mb-0.5">#{job.id.padStart(10, '0').replace('fake-', '13075')}</div>
                                            <h3 className="text-sm font-bold text-blue-800 hover:text-blue-600 cursor-pointer line-clamp-2 leading-tight mb-1">
                                                {job.title}
                                            </h3>
                                            <div className="text-xs font-semibold text-amber-500 truncate flex items-center gap-1">
                                                <span className="material-icons-round text-[14px]">stars</span>
                                                {job.listingType === 'subcontractor' ? 'Taşeron İlanı' : 'Acente İş Ortaklığı'}
                                                {job.selectedServices && job.selectedServices.length > 0 && (
                                                    <span className="text-slate-500 font-medium ml-1 truncate">
                                                        - {job.selectedServices.join(', ')}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Category Column */}
                                        <div className="text-sm font-bold text-red-600 md:text-center w-full md:w-auto flex flex-row md:flex-col justify-between md:justify-center items-center">
                                            <span className="md:hidden text-slate-500 font-normal">Kategori:</span>
                                            <span className="text-center">{job.category}</span>
                                        </div>

                                        {/* Date Column */}
                                        <div className="text-sm font-bold text-slate-700 md:text-center w-full md:w-auto flex flex-row md:flex-col justify-between md:justify-center items-center">
                                            <span className="md:hidden text-slate-500 font-normal">Tarih:</span>
                                            <div className="text-center flex flex-col">
                                                <span>{job.date.split(' ')[0]} {job.date.split(' ')[1]}</span>
                                                <span>{job.date.split(' ')[2] || '2026'}</span>
                                            </div>
                                        </div>

                                        {/* Location Column */}
                                        <div className="text-sm font-bold text-slate-700 md:text-center w-full md:w-auto flex flex-row md:flex-col justify-between md:justify-center items-center">
                                            <span className="md:hidden text-slate-500 font-normal">Konum:</span>
                                            <div className="text-center flex flex-col">
                                                <span>{job.location.split(' ')[0]}</span>
                                                <span className="text-xs font-semibold text-slate-500">{job.location.split(' ')[1] || ''}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                        
                        {filteredJobs.length > 0 && (
                            <div className="flex justify-center bg-slate-50/80 border-t border-slate-200 py-3">
                                <div className="flex gap-1 text-sm font-semibold">
                                    <button className="w-8 h-8 flex items-center justify-center rounded border border-slate-200 text-slate-500 hover:bg-white"><span className="material-icons-round text-[18px]">chevron_left</span></button>
                                    <button className="w-8 h-8 flex items-center justify-center rounded bg-blue-600 text-white shadow-sm border border-blue-600">1</button>
                                    <button className="w-8 h-8 flex items-center justify-center rounded border border-slate-200 text-slate-700 hover:bg-white transition-colors">2</button>
                                    <button className="w-8 h-8 flex items-center justify-center rounded border border-slate-200 text-slate-500 hover:bg-white"><span className="material-icons-round text-[18px]">chevron_right</span></button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AgentJobList;
