import React, { useMemo, useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ports from "@/data/ports.json";

interface Job {
    id: string | number;
    title: string;
    company: string;
    location: string;
    port: string;
    budget: string;
    budgetValue: number;
    deadline: string;
    description: string;
    tag: string;
    category: string;
    serviceType: string;
    image: string;
    isUrgent: boolean;
}

const defaultJobs: Job[] = [
  {
    id: 1,
    title: 'Makine Dairesi Bakım İşi',
    company: 'Kuzey Denizcilik',
    location: 'Tuzla / İstanbul',
    port: 'Tuzla',
    budget: '₺75.000 - ₺95.000',
    budgetValue: 95000,
    deadline: '18 Mart 2026',
    description:
      'Kuru yük gemisi için makine dairesi genel bakım, ekipman kontrolü ve raporlama hizmeti verecek deneyimli taşeron ekip aranmaktadır.',
    tag: 'Yeni İlan',
    category: 'Makine Bakımı',
    serviceType: 'Liman Operasyonları',
    image:
      'https://images.unsplash.com/photo-1566375637385-2fb5a61b1b03?auto=format&fit=crop&w=300&q=80',
    isUrgent: false,
  },
  {
    id: 2,
    title: 'Güverte Kumlama ve Boya',
    company: 'Marmara Lojistik',
    location: 'Ambarlı / İstanbul',
    port: 'Ambarlı',
    budget: '₺110.000 - ₺145.000',
    budgetValue: 145000,
    deadline: '20 Mart 2026',
    description:
      'Genel kargo gemisi dış yüzey kumlama ve boya operasyonu için uzman taşeron ekipler değerlendirilecektir.',
    tag: 'Popüler',
    category: 'Boya / Kumlama',
    serviceType: 'Teknik Servis',
    image:
      'https://images.unsplash.com/photo-1494412519320-aa613dfb7738?auto=format&fit=crop&w=300&q=80',
    isUrgent: false,
  },
];

const SubcontractorJobSearchPage: React.FC = () => {
  const navigate = useNavigate();

  const [allJobs, setAllJobs] = useState<Job[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('Tümü');
  const [selectedPort, setSelectedPort] = useState('Tüm Limanlar');
  const [sortBy] = useState('Acil Öncelikli');
  const [onlyUrgent, setOnlyUrgent] = useState(false);
  const [onlyNew, setOnlyNew] = useState(false);

  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);
  
  // Offer Form States
  const [offerFile, setOfferFile] = useState<File | null>(null);
  const [qualificationConfirmed, setQualificationConfirmed] = useState(false);

  // Searchable Port States
  const [portSearch, setPortSearch] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const normalize = (text: string) =>
    text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/ı/g, "i");

  const filteredPorts = useMemo(() => {
    const search = normalize(portSearch.trim());
    if (!search && !showDropdown) return []; 
    
    return ports
        .filter((p) => {
            const name = normalize(p.name);
            const code = normalize(p.code);
            return name.includes(search) || code.includes(search);
        })
        .slice(0, 100); // Limit results for performance
  }, [portSearch, showDropdown]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setShowDropdown(false);
        }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const storedJobs = localStorage.getItem('jobs');
    if (storedJobs) {
      const parsed = JSON.parse(storedJobs);
      const normalized: Job[] = parsed.map((j: any) => {
        // Resolve port name from code if necessary
        const portObj = ports.find(p => p.code === j.location);
        const resolvedPortName = portObj ? portObj.name : (j.location || 'Belirtilmemiş');

        return {
          id: j.id,
          title: j.title,
          company: 'Portlink Acentesi',
          location: resolvedPortName,
          port: resolvedPortName,
          budget: 'Belirlenmedi',
          budgetValue: 0,
          deadline: j.eta || 'Belirtilmemiş',
          description: j.needText || '',
          tag: j.listingType === 'subcontractor' ? 'Taşeron İlanı' : 'İş Ortaklığı',
          category: j.category || 'Genel',
          serviceType: 'Liman Operasyonları',
          image: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?auto=format&fit=crop&w=300&q=80',
          isUrgent: false,
        };
      });
      setAllJobs([...normalized, ...defaultJobs]);
    } else {
      setAllJobs(defaultJobs);
    }
  }, []);

  const openOfferModal = (job: Job) => {
    setSelectedJob(job);
    setIsOfferModalOpen(true);
    setOfferFile(null);
    setQualificationConfirmed(false);
  };

  const closeModals = () => {
    setIsOfferModalOpen(false);
    setSelectedJob(null);
  };

  const filteredJobs = useMemo(() => {
    let result = [...allJobs];

    if (selectedCategory !== 'Tümü') {
      result = result.filter((job) => job.serviceType === selectedCategory || job.category === selectedCategory);
    }

    if (selectedPort !== 'Tüm Limanlar') {
      result = result.filter((job) => job.port === selectedPort);
    }

    if (onlyUrgent) {
      result = result.filter((job) => job.tag === 'Acil' || job.isUrgent);
    }

    if (onlyNew) {
      result = result.filter((job) => job.tag === 'Yeni İlan');
    }

    result.sort((a, b) => {
        if (sortBy === 'Acil Öncelikli') {
          if (a.isUrgent && !b.isUrgent) return -1;
          if (!a.isUrgent && b.isUrgent) return 1;
          return 0;
        }
        return 0;
    });

    return result;
  }, [allJobs, selectedCategory, selectedPort, sortBy, onlyUrgent, onlyNew]);

  return (
    <>
      <div className="mb-8 flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div>
          <button
            onClick={() => navigate('/dashboard/subcontractor')}
            className="inline-flex items-center gap-1 text-sm font-semibold text-slate-500 hover:text-primary transition-colors mb-3"
          >
            <span className="material-icons-round text-[18px]">arrow_back</span>
            Geri Dön
          </button>

          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            İlanlar
          </h2>
          <p className="text-slate-500 dark:text-slate-400">
            {filteredJobs.length} aktif ilan arasından size uygun olanı bulun.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => navigate('/dashboard/subcontractor/active-jobs')}
            className="bg-primary hover:bg-primary/90 text-white font-bold py-3 px-6 rounded-2xl transition-all shadow-md shadow-primary/20 flex items-center justify-center gap-2"
          >
            <span className="material-icons-round text-[18px]">receipt_long</span>
            Aktif İşlerim
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[280px_minmax(0,1fr)] gap-6">
        <aside className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-5 shadow-sm h-fit sticky top-6">
          <div className="flex items-center gap-2 mb-6">
            <span className="material-icons-round text-primary">tune</span>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Filtreler</h3>
          </div>

          <div className="border-t border-slate-100 dark:border-slate-700 pt-5 space-y-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400 mb-3">
                Hizmet Kategorisi
              </p>
              <div className="space-y-3">
                {['Tümü', 'Liman Operasyonları', 'Teknik Servis', 'Makine Bakımı', 'Boya / Kumlama', 'Elektrik'].map((item) => (
                  <label key={item} className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-200 cursor-pointer">
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategory === item}
                      onChange={() => setSelectedCategory(item)}
                      className="w-4 h-4 accent-primary"
                    />
                    <span>{item}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="relative" ref={dropdownRef}>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400 mb-3">
                Liman
              </p>
              
              <div className="relative">
                <input
                  type="text"
                  placeholder="Liman ara (Örn: Ambarlı)"
                  value={showDropdown ? portSearch : (selectedPort === 'Tüm Limanlar' ? '' : selectedPort)}
                  onFocus={() => setShowDropdown(true)}
                  onChange={(e) => {
                    setPortSearch(e.target.value);
                    setShowDropdown(true);
                  }}
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all pr-10"
                />
                <span className="material-icons-round absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                  search
                </span>
              </div>

              {showDropdown && (
                <div className="absolute z-[60] left-0 right-0 mt-2 max-h-60 overflow-y-auto bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
                  <div 
                    onClick={() => {
                      setSelectedPort('Tüm Limanlar');
                      setPortSearch('');
                      setShowDropdown(false);
                    }}
                    className="px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer border-b border-slate-100 dark:border-slate-700 font-bold text-primary text-sm"
                  >
                    Tüm Limanlar
                  </div>
                  {filteredPorts.map((p) => (
                    <div
                      key={p.code}
                      onClick={() => {
                        setSelectedPort(p.name);
                        setPortSearch(p.name);
                        setShowDropdown(false);
                      }}
                      className="px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer text-sm text-slate-700 dark:text-slate-200 flex flex-col"
                    >
                      <span className="font-bold">{p.name}</span>
                      <span className="text-[10px] text-slate-400 uppercase tracking-widest">{p.code}</span>
                    </div>
                  ))}
                  {filteredPorts.length === 0 && portSearch && (
                    <div className="px-4 py-8 text-center text-slate-400 text-sm">
                      Liman bulunamadı
                    </div>
                  )}
                </div>
              )}
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400 mb-3">
                Hızlı Filtreler
              </p>
              <div className="space-y-3">
                <label className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={onlyUrgent}
                    onChange={(e) => setOnlyUrgent(e.target.checked)}
                    className="w-4 h-4 accent-primary"
                  />
                  <span>Sadece Acil İlanlar</span>
                </label>

                <label className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={onlyNew}
                    onChange={(e) => setOnlyNew(e.target.checked)}
                    className="w-4 h-4 accent-primary"
                  />
                  <span>Sadece Yeni İlanlar</span>
                </label>
              </div>
            </div>
          </div>
        </aside>

        <section className="min-w-0">
          <div className="flex flex-col gap-4">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <div
                  key={job.id}
                  className={`bg-white dark:bg-slate-800 border rounded-3xl p-5 shadow-sm hover:shadow-md transition-all ${
                    job.isUrgent
                      ? 'border-red-200 dark:border-red-800/40 bg-red-50/40 dark:bg-red-900/10'
                      : 'border-slate-200 dark:border-slate-700 hover:border-primary/40'
                  }`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center gap-5">
                    <div className="flex items-center gap-4 min-w-0 lg:w-[38%]">
                      <img
                        src={job.image}
                        alt={job.title}
                        className="w-24 h-20 rounded-2xl object-cover border border-slate-200 dark:border-slate-700 shrink-0"
                      />

                      <div className="min-w-0">
                        <h4 className={`text-xl font-bold leading-snug mb-1 ${
                          job.isUrgent
                            ? 'text-red-700 dark:text-red-300'
                            : 'text-slate-900 dark:text-white'
                        }`}>
                          {job.title}
                        </h4>

                        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-2">
                          <span className="material-icons-round text-[16px] text-primary">apartment</span>
                          {job.company}
                        </div>

                        <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">
                          {job.description}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 lg:flex-1 gap-3">
                      <div className="rounded-2xl bg-slate-50 dark:bg-slate-900/40 px-4 py-3 border border-slate-100 dark:border-slate-700/60">
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">Konum</p>
                        <p className="text-sm font-bold text-slate-700 dark:text-slate-200">{job.location}</p>
                      </div>
                      <div className="rounded-2xl bg-slate-50 dark:bg-slate-900/40 px-4 py-3 border border-slate-100 dark:border-slate-700/60">
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">Bütçe</p>
                        <p className="text-sm font-bold text-slate-700 dark:text-slate-200">{job.budget}</p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3 lg:min-w-[190px]">
                      <button
                        onClick={() => navigate(`/dashboard/subcontractor/active-jobs/${job.id}`)}
                        className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-white font-semibold hover:border-primary/40 hover:text-primary transition-all"
                      >
                        <span className="material-icons-round text-[18px]">visibility</span>
                        Detayı Gör
                      </button>

                      <button
                        onClick={() => openOfferModal(job)}
                        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-primary text-white font-bold shadow-md shadow-primary/20 hover:bg-primary/90 transition-all"
                      >
                        <span className="material-icons-round text-[18px]">send</span>
                        Teklif Ver
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-10 shadow-sm text-center">
                <h4 className="text-lg font-bold text-slate-800 dark:text-white mb-2">İlan bulunamadı</h4>
              </div>
            )}
          </div>
        </section> section
      </div>

      {isOfferModalOpen && selectedJob && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 backdrop-blur-[2px] px-4">
          <div className="w-full max-w-2xl bg-white dark:bg-slate-800 rounded-[2rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between px-8 py-6 border-b border-slate-100 dark:border-slate-700">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Teklif Ver</h3>
                <p className="text-slate-500 text-sm">{selectedJob.title}</p>
              </div>
              <button 
                onClick={closeModals}
                className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition"
              >
                <span className="material-icons-round">close</span>
              </button>
            </div>

            <div className="p-8 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Teklif Fiyatı (₺)</label>
                  <input type="number" placeholder="0.00" className="w-full px-5 py-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:ring-4 focus:ring-primary/10 outline-none transition" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Tamamlama Süresi</label>
                  <input type="text" placeholder="Örn: 5 Gün" className="w-full px-5 py-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:ring-4 focus:ring-primary/10 outline-none transition" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Mesajınız</label>
                <textarea rows={3} placeholder="Teklifinizle ilgili detayları buraya yazın..." className="w-full px-5 py-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:ring-4 focus:ring-primary/10 outline-none transition resize-none" />
              </div>

              {/* DOCUMENT UPLOAD */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Teklif Belgesi / Sertifika *</label>
                <div className={`relative flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-2xl transition ${
                  offerFile ? 'border-emerald-500 bg-emerald-50/30' : 'border-slate-300 bg-slate-50 hover:bg-slate-100'
                }`}>
                  <input 
                    type="file" 
                    onChange={(e) => setOfferFile(e.target.files?.[0] || null)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                  />
                  <span className="material-icons-round text-3xl text-slate-400 mb-2">
                    {offerFile ? 'check_circle' : 'cloud_upload'}
                  </span>
                  <p className="text-sm font-semibold text-slate-600">
                    {offerFile ? offerFile.name : 'Dosyayı Sürükleyin veya Seçin'}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">PDF, JPG veya PNG (Maks 10MB)</p>
                </div>
              </div>

              {/* QUALIFICATION CHECK */}
              <label className="flex items-start gap-3 p-4 rounded-2xl bg-blue-50 border border-blue-100 cursor-pointer group">
                <input 
                  type="checkbox" 
                  checked={qualificationConfirmed}
                  onChange={(e) => setQualificationConfirmed(e.target.checked)}
                  className="mt-1 h-5 w-5 rounded border-slate-300 text-primary focus:ring-primary" 
                />
                <span className="text-sm text-blue-900 font-medium leading-relaxed">
                  Taşeron olarak bu iş için gerekli tüm teknik yeterliliğe, ekipmana ve yasal belgelere sahip olduğumu beyan ve taahhüt ederim.
                </span>
              </label>

              <div className="flex gap-3 pt-4">
                <button 
                  onClick={closeModals}
                  className="flex-1 py-4 font-bold text-slate-600 rounded-2xl hover:bg-slate-100 transition"
                >
                  Vazgeç
                </button>
                <button 
                  disabled={!offerFile || !qualificationConfirmed}
                  onClick={() => {
                    alert('Teklifiniz başarıyla gönderildi!');
                    closeModals();
                  }}
                  className={`flex-[2] py-4 rounded-2xl font-bold shadow-lg transition-all ${
                    offerFile && qualificationConfirmed 
                      ? 'bg-primary text-white shadow-primary/30 hover:-translate-y-1' 
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  Teklifi Gönder
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SubcontractorJobSearchPage;