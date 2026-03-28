import React, { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

type ListingType = 'subcontractor' | 'agency-partnership';

type ServiceCategory = {
    id: string;
    title: string;
    description: string;
    items: string[];
};

const serviceCategories: ServiceCategory[] = [
    {
        id: 'port-operations',
        title: 'Liman İşlemleri',
        description: 'Gemi geliş–kalkış resmi işlemler',
        items: [
            'Giriş / çıkış izinleri',
            'Gümrük & liman evrakları',
            'VTS / trafik bildirimleri',
            'Sertifika & resmi yazışmalar',
        ],
    },
    {
        id: 'loading-discharge',
        title: 'Yükleme – Boşaltma Operasyonu',
        description: 'Terminal ve saha koordinasyonu',
        items: [
            'Yanaşma planı',
            'Tahliye / yükleme organizasyonu',
            'Konteyner işlemleri',
            'Olay çizelgesi (SOF)',
        ],
    },
    {
        id: 'ship-supply',
        title: 'Gemi İkmal Hizmetleri',
        description: 'Gemiye verilen fiziksel hizmetler',
        items: ['Yakıt (bunker)', 'Su', 'Kumanya', 'Yedek parça', 'Sarf malzemeleri'],
    },
    {
        id: 'technical-repair',
        title: 'Teknik & Tamir Hizmetleri',
        description: 'Bakım / onarım / survey',
        items: ['Tamir & bakım', 'Sörvey', 'Sertifika yenileme', 'Teknik servis'],
    },
    {
        id: 'crew-services',
        title: 'Personel (Crew) Hizmetleri',
        description: 'Tayfa ve kaptan işlemleri',
        items: ['Crew change', 'Vize / pasaport', 'Hastane / sağlık', 'Transfer / otel', 'Kaptan avansı'],
    },
    {
        id: 'environment-waste',
        title: 'Çevre & Atık Hizmetleri',
        description: 'MARPOL & çevre',
        items: ['Atık alımı', 'Sludge / çöp', 'Çevre işlemleri'],
    },
    {
        id: 'document-courier',
        title: 'Evrak & Kurye Hizmetleri',
        description: 'Doküman lojistiği / evrak taşımacılığı',
        items: ['Posta / kurye', 'Gemi evrak teslimi', 'Gümrüklü gönderi'],
    },
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

const steps = ['İlan Tipi', 'Hizmet Kategorisi', 'Kısa İlan', 'Önizleme & Yayın'];

const QuickPostPage: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const isEditMode = !!id;

    const [step, setStep] = useState<number>(1);
    const [listingType, setListingType] = useState<ListingType | null>(null);

    const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([]);
    const [selectedServicesByCategory, setSelectedServicesByCategory] = useState<Record<string, string[]>>({});

    const [eta, setEta] = useState<string>('');
    const [port, setPort] = useState<string>('');
    const [ship, setShip] = useState<string>('');
    const [needText, setNeedText] = useState<string>('');
    const [files, setFiles] = useState<File[]>([]);

    const selectedCategories = useMemo(
        () => serviceCategories.filter((cat) => selectedCategoryIds.includes(cat.id)),
        [selectedCategoryIds]
    );

    const totalSelectedServices = useMemo(
        () => Object.values(selectedServicesByCategory).flat(),
        [selectedServicesByCategory]
    );

    const canGoStep2 = !!listingType;
    const canGoStep3 = selectedCategoryIds.length > 0 && totalSelectedServices.length > 0;
    const canGoStep4 =
        !!eta.trim() &&
        !!port.trim() &&
        !!ship.trim() &&
        !!needText.trim() &&
        selectedCategoryIds.length > 0 &&
        totalSelectedServices.length > 0 &&
        !!listingType;

    const toggleCategory = (categoryId: string) => {
        const exists = selectedCategoryIds.includes(categoryId);

        if (exists) {
            setSelectedCategoryIds((prev) => prev.filter((id) => id !== categoryId));
            
            setSelectedServicesByCategory((prevServices) => {
                const updated = { ...prevServices };
                delete updated[categoryId];
                return updated;
            });
        } else {
            setSelectedCategoryIds((prev) => [...prev, categoryId]);
        }
    };

    const toggleService = (categoryId: string, service: string) => {
        setSelectedServicesByCategory((prev) => {
            const currentServices = prev[categoryId] || [];
            const exists = currentServices.includes(service);

            return {
                ...prev,
                [categoryId]: exists
                    ? currentServices.filter((item) => item !== service)
                    : [...currentServices, service],
            };
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const incoming = e.target.files ? Array.from(e.target.files) : [];
        setFiles((prev) => [...prev, ...incoming]);
    };

    const nextStep = () => {
        if (step === 1 && canGoStep2) setStep(2);
        if (step === 2 && canGoStep3) setStep(3);
        if (step === 3 && canGoStep4) setStep(4);
    };

    const prevStep = () => {
        if (step > 1) setStep((prev) => prev - 1);
    };

    const publishListing = () => {
        const newJob = {
            id: Date.now().toString(),
            title:
                listingType === 'agency-partnership'
                    ? `${selectedCategories.length > 1
                        ? 'Çoklu Hizmet Talebi'
                        : selectedCategories[0]?.title || 'Yeni İlan'
                    } - İş Ortaklığı`
                    : selectedCategories.length > 1
                        ? 'Çoklu Hizmet Talebi'
                        : selectedCategories[0]?.title || 'Yeni İlan',
            shipName: ship,
            location: port,
            date: new Date().toLocaleDateString('tr-TR'),
            status: 'active' as const,
            offerCount: 0,
            category: selectedCategories.map((cat) => cat.title).join(', '),
            categories: selectedCategories.map((cat) => ({
                id: cat.id,
                title: cat.title,
                services: selectedServicesByCategory[cat.id] || [],
            })),
            listingType,
            selectedServices: totalSelectedServices,
            eta,
            needText,
            fileNames: files.map((file) => file.name),
        };

        const existingJobs = localStorage.getItem('jobs');
        const jobs = existingJobs ? JSON.parse(existingJobs) : [];

        jobs.unshift(newJob);

        localStorage.setItem('jobs', JSON.stringify(jobs));

        alert('İlan başarıyla yayınlandı.');
        navigate('/dashboard/agent/jobs');
    };

    return (
        <div className="min-h-screen bg-slate-50 px-4 py-8 md:px-8 lg:px-12">
            <div className="mx-auto max-w-6xl">
                <div className="mb-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="flex items-center gap-4">
                            {isEditMode && (
                                <button
                                    onClick={() => navigate(`/dashboard/agent/jobs/${id}`)}
                                    className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition-all hover:scale-105 hover:bg-primary/10 hover:text-primary"
                                >
                                    <span className="material-icons-round text-[22px]">arrow_back</span>
                                </button>
                            )}

                            <div>
                                <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                                    {isEditMode ? 'İlanı Düzenle' : 'Hızlı İlan Ver'}
                                </h1>
                                <p className="mt-2 text-slate-500">
                                    {isEditMode
                                        ? 'Mevcut ilan bilgilerinizi güncelleyin.'
                                        : 'Taşeron ya da iş ortaklığı için birkaç adımda ilan oluşturun.'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mb-8 rounded-3xl border border-slate-200 bg-white px-4 py-6 shadow-sm md:px-8">
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                        {steps.map((label, index) => {
                            const current = index + 1;
                            const isCompleted = current < step;
                            const isActive = current === step;

                            return (
                                <div key={label} className="flex flex-col items-center text-center">
                                    <div
                                        className={`flex h-12 w-12 items-center justify-center rounded-full border-2 text-sm font-bold transition-all ${
                                            isCompleted
                                                ? 'border-emerald-500 bg-emerald-500 text-white'
                                                : isActive
                                                    ? 'border-primary bg-primary text-white'
                                                    : 'border-slate-300 bg-white text-slate-500'
                                        }`}
                                    >
                                        {isCompleted ? '✓' : current}
                                    </div>
                                    <span
                                        className={`mt-3 text-sm font-medium ${
                                            isActive
                                                ? 'text-primary'
                                                : isCompleted
                                                    ? 'text-emerald-600'
                                                    : 'text-slate-500'
                                        }`}
                                    >
                                        {label}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
                    {step === 1 && (
                        <div className="p-6 md:p-8">
                            <h2 className="text-2xl font-bold text-slate-900">İlan Tipini Seçin</h2>
                            <p className="mt-2 text-slate-500">
                                Aradığınız hizmet yapısına göre ilan türünü seçin.
                            </p>

                            <div className="mt-8 grid gap-5 md:grid-cols-2">
                                <button
                                    type="button"
                                    onClick={() => setListingType('subcontractor')}
                                    className={`rounded-3xl border p-6 text-left transition-all ${
                                        listingType === 'subcontractor'
                                            ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
                                            : 'border-slate-200 hover:border-primary/40 hover:bg-slate-50'
                                    }`}
                                >
                                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                                        <span className="material-icons-round">engineering</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900">Taşeron arıyorum</h3>
                                    <p className="mt-2 text-slate-500">
                                        Teknik işi yapacak ekip, saha operasyonu, bakım, servis veya destek ekibi arıyorum.
                                    </p>
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setListingType('agency-partnership')}
                                    className={`rounded-3xl border p-6 text-left transition-all ${
                                        listingType === 'agency-partnership'
                                            ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
                                            : 'border-slate-200 hover:border-primary/40 hover:bg-slate-50'
                                    }`}
                                >
                                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-50 text-violet-600">
                                        <span className="material-icons-round">handshake</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900">
                                        İş ortaklığı için acente arıyorum
                                    </h3>
                                    <p className="mt-2 text-slate-500">
                                        Gelir paylaşımı, ortak acentelik veya operasyonel iş birliği için acente partner arıyorum.
                                    </p>
                                </button>
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="p-6 md:p-8">
                            <h2 className="text-2xl font-bold text-slate-900">Hizmet Kategorisi Seçin</h2>
                            <p className="mt-2 text-slate-500">
                                İlanınıza en uygun ana kategorileri ve alt hizmetleri işaretleyin.
                            </p>

                            <div className="mt-8 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
                                <div className="space-y-4">
    {serviceCategories.map((category) => {
        const isSelected = selectedCategoryIds.includes(category.id);
        const selectedServiceCount = selectedServicesByCategory[category.id]?.length || 0;

        return (
            <label
                key={category.id}
                className={`flex w-full cursor-pointer items-start justify-between gap-4 rounded-2xl border p-5 transition-all ${
                    isSelected
                        ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
                        : 'border-slate-200 hover:border-primary/30 hover:bg-slate-50'
                }`}
            >
                <div className="flex flex-1 items-start gap-3">
                    <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleCategory(category.id)}
                        className="mt-1 h-5 w-5 shrink-0 rounded border-slate-300 text-primary focus:ring-primary"
                    />

                    <div className="flex-1">
                        <h3 className="text-lg font-bold text-slate-900">
                            {category.title}
                        </h3>

                        <p className="mt-1 text-sm text-slate-500">
                            {category.description}
                        </p>

                        {isSelected && (
                            <div className="mt-3 flex flex-wrap gap-2">
                                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                                    Seçildi
                                </span>

                                {selectedServiceCount > 0 && (
                                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                                        {selectedServiceCount} alt hizmet seçildi
                                    </span>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </label>
        );
    })}
</div>

                                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                                    <h3 className="text-lg font-bold text-slate-900">Alt Hizmetler</h3>
                                    <p className="mt-1 text-sm text-slate-500">
                                        Seçilen kategorilere göre detay hizmetleri işaretleyin.
                                    </p>

                                    {selectedCategories.length === 0 ? (
                                        <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-white p-6 text-sm text-slate-500">
                                            Önce soldan en az bir hizmet kategorisi seçin.
                                        </div>
                                    ) : (
                                        <div className="mt-6 space-y-5">
                                            {selectedCategories.map((category) => (
                                                <div
                                                    key={category.id}
                                                    className="rounded-2xl border border-slate-200 bg-white p-4"
                                                >
                                                    <h4 className="text-base font-bold text-slate-900">
                                                        {category.title}
                                                    </h4>
                                                    <p className="mt-1 text-sm text-slate-500">
                                                        {category.description}
                                                    </p>

                                                    <div className="mt-4 space-y-3">
                                                        {category.items.map((item) => {
                                                            const checked =
                                                                selectedServicesByCategory[category.id]?.includes(item) || false;

                                                            return (
                                                                <label
                                                                    key={`${category.id}-${item}`}
                                                                    className={`flex cursor-pointer items-center gap-3 rounded-2xl border p-4 transition-all ${
                                                                        checked
                                                                            ? 'border-primary bg-primary/5'
                                                                            : 'border-slate-200 hover:border-primary/30'
                                                                    }`}
                                                                >
                                                                    <input
                                                                        type="checkbox"
                                                                        checked={checked}
                                                                        onChange={() => toggleService(category.id, item)}
                                                                        className="h-5 w-5 rounded border-slate-300 text-primary focus:ring-primary"
                                                                    />
                                                                    <span className="font-medium text-slate-700">{item}</span>
                                                                </label>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="p-6 md:p-8">
                            <div className="mb-8 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                                <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                                    Seçilen Hizmetler Özeti
                                </h3>
                                <div className="space-y-4">
                                    {selectedCategories.map((category) => (
                                        <div key={category.id}>
                                            <p className="font-semibold text-slate-800">{category.title}</p>
                                            <div className="mt-2 flex flex-wrap gap-2">
                                                {(selectedServicesByCategory[category.id] || []).map((service) => (
                                                    <span
                                                        key={`${category.id}-${service}`}
                                                        className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700 shadow-sm"
                                                    >
                                                        {service}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <h2 className="text-2xl font-bold text-slate-900">Kısa İlan Formu Girin</h2>
                            <p className="mt-2 text-slate-500">
                                ETA, liman, gemi ve ihtiyaç detaylarını hızlıca girin.
                            </p>

                            <div className="mt-8 grid gap-5 md:grid-cols-2">
                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                                        ETA (Tahmini Varış Zamanı)
                                    </label>
                                    <input
                                        type="datetime-local"
                                        value={eta}
                                        onChange={(e) => setEta(e.target.value)}
                                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-primary"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                                        Liman
                                    </label>
                                    <select
                                        value={port}
                                        onChange={(e) => setPort(e.target.value)}
                                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-primary"
                                    >
                                        <option value="">Liman seçiniz...</option>
                                        {ports.map((item) => (
                                            <option key={item} value={item}>
                                                {item}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="md:col-span-2">
                                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                                        Gemi
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Örn: MV Blue Wave - Bulk Carrier"
                                        value={ship}
                                        onChange={(e) => setShip(e.target.value)}
                                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-primary"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                                        İhtiyaç
                                    </label>
                                    <textarea
                                        rows={6}
                                        placeholder="İhtiyacı kısa ve net şekilde yazın."
                                        value={needText}
                                        onChange={(e) => setNeedText(e.target.value)}
                                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-primary"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="mb-2 block text-sm font-semibold text-slate-700">
                                        Resim / Video Yükle
                                    </label>

                                    <label className="flex min-h-[170px] cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-primary/30 bg-primary/5 px-6 py-8 text-center transition hover:border-primary hover:bg-primary/10">
                                        <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-white text-primary shadow-sm">
                                            <span className="material-icons-round">cloud_upload</span>
                                        </div>
                                        <p className="font-semibold text-slate-800">
                                            Dosyaları sürükleyin veya seçin
                                        </p>
                                        <p className="mt-1 text-sm text-slate-500">
                                            JPG, PNG, MP4, MOV desteklenir
                                        </p>
                                        <input
                                            type="file"
                                            multiple
                                            accept="image/*,video/*"
                                            onChange={handleFileChange}
                                            className="hidden"
                                        />
                                    </label>

                                    {files.length > 0 && (
                                        <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
                                            <h4 className="mb-3 font-semibold text-slate-800">Yüklenen Dosyalar</h4>
                                            <div className="space-y-2">
                                                {files.map((file, index) => (
                                                    <div
                                                        key={`${file.name}-${index}`}
                                                        className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3"
                                                    >
                                                        <span className="truncate text-sm text-slate-700">
                                                            {file.name}
                                                        </span>
                                                        <span className="text-xs text-slate-500">
                                                            {(file.size / 1024 / 1024).toFixed(2)} MB
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 4 && (
                        <div className="p-6 md:p-8">
                            <h2 className="text-2xl font-bold text-slate-900">İlan Önizleme</h2>
                            <p className="mt-2 text-slate-500">
                                İlan bilgilerinizi kontrol edin ve yayına alın.
                            </p>

                            <div className="mt-8 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
                                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                                    <div className="mb-5 flex items-center justify-between gap-4">
                                        <div>
                                            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                                                {listingType === 'subcontractor'
                                                    ? 'Taşeron Aranıyor'
                                                    : 'İş Ortaklığı / Acente Aranıyor'}
                                            </span>
                                            <h3 className="mt-3 text-2xl font-bold text-slate-900">
                                                {selectedCategories.length > 1
                                                    ? 'Çoklu Hizmet Talebi'
                                                    : selectedCategories[0]?.title || '-'}
                                            </h3>
                                        </div>
                                    </div>

                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div className="rounded-2xl bg-white p-4">
                                            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                                                ETA
                                            </p>
                                            <p className="mt-2 font-medium text-slate-800">{eta || '-'}</p>
                                        </div>

                                        <div className="rounded-2xl bg-white p-4">
                                            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                                                Liman
                                            </p>
                                            <p className="mt-2 font-medium text-slate-800">{port || '-'}</p>
                                        </div>

                                        <div className="rounded-2xl bg-white p-4 md:col-span-2">
                                            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                                                Gemi
                                            </p>
                                            <p className="mt-2 font-medium text-slate-800">{ship || '-'}</p>
                                        </div>

                                        <div className="rounded-2xl bg-white p-4 md:col-span-2">
                                            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                                                Seçilen Kategoriler ve Hizmetler
                                            </p>

                                            <div className="mt-3 space-y-3">
                                                {selectedCategories.map((category) => (
                                                    <div key={category.id}>
                                                        <p className="font-semibold text-slate-800">{category.title}</p>
                                                        <div className="mt-2 flex flex-wrap gap-2">
                                                            {(selectedServicesByCategory[category.id] || []).map((service) => (
                                                                <span
                                                                    key={`${category.id}-${service}`}
                                                                    className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700"
                                                                >
                                                                    {service}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="rounded-2xl bg-white p-4 md:col-span-2">
                                            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                                                İhtiyaç Açıklaması
                                            </p>
                                            <p className="mt-2 whitespace-pre-line text-slate-700">
                                                {needText || '-'}
                                            </p>
                                        </div>

                                        {files.length > 0 && (
                                            <div className="rounded-2xl bg-white p-4 md:col-span-2">
                                                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                                                    Eklenen Dosyalar
                                                </p>
                                                <div className="mt-3 flex flex-wrap gap-2">
                                                    {files.map((file, index) => (
                                                        <span
                                                            key={`${file.name}-${index}`}
                                                            className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700"
                                                        >
                                                            {file.name}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="rounded-3xl border border-slate-200 bg-white p-6">
                                    <h3 className="text-lg font-bold text-slate-900">Yayın Özeti</h3>

                                    <div className="mt-5 space-y-4">
                                        <div className="rounded-2xl bg-slate-50 p-4">
                                            <p className="text-sm text-slate-500">İlan tipi</p>
                                            <p className="mt-1 font-semibold text-slate-800">
                                                {listingType === 'subcontractor'
                                                    ? 'Taşeron Arıyorum'
                                                    : 'İş Ortaklığı İçin Acente Arıyorum'}
                                            </p>
                                        </div>

                                        <div className="rounded-2xl bg-slate-50 p-4">
                                            <p className="text-sm text-slate-500">Ana kategoriler</p>
                                            <div className="mt-2 flex flex-wrap gap-2">
                                                {selectedCategories.map((category) => (
                                                    <span
                                                        key={category.id}
                                                        className="rounded-full bg-white px-3 py-1 text-sm font-semibold text-slate-800"
                                                    >
                                                        {category.title}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="rounded-2xl bg-slate-50 p-4">
                                            <p className="text-sm text-slate-500">Dosya sayısı</p>
                                            <p className="mt-1 font-semibold text-slate-800">
                                                {files.length} dosya
                                            </p>
                                        </div>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={publishListing}
                                        className="mt-6 w-full rounded-2xl bg-primary px-5 py-4 text-center text-base font-bold text-white shadow-lg shadow-primary/20 transition hover:opacity-95"
                                    >
                                        İlanı Yayınla
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="flex flex-col gap-3 border-t border-slate-200 p-6 md:flex-row md:items-center md:justify-between">
                        <button
                            type="button"
                            onClick={prevStep}
                            disabled={step === 1}
                            className="rounded-2xl border border-slate-200 px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            Geri Dön
                        </button>

                        <button
                            type="button"
                            onClick={nextStep}
                            disabled={
                                (step === 1 && !canGoStep2) ||
                                (step === 2 && !canGoStep3) ||
                                (step === 3 && !canGoStep4) ||
                                step === 4
                            }
                            className="rounded-2xl bg-primary px-6 py-3 font-semibold text-white shadow-lg shadow-primary/20 transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {step === 3 ? 'Önizlemeye Geç' : step === 4 ? 'Hazır' : 'Devam Et'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuickPostPage;