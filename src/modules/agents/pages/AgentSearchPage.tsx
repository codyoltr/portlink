import React, { useMemo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const getTagStyle = (tag: string) => {
  if (tag === 'Acil') {
    return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300';
  }
  if (tag === 'Yeni İlan') {
    return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
  }
  return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300';
};

const AgentSearchPage: React.FC = () => {
  const navigate = useNavigate();

  // GERÇEK VERİLER İÇİN EKLENEN STATE'LER
  const [jobs, setJobs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState('Tümü');
  const [selectedPort, setSelectedPort] = useState('Tüm Limanlar');
  const [selectedBudget, setSelectedBudget] = useState('Tüm Bütçeler');
  const [sortBy, setSortBy] = useState('Acil Öncelikli');
  const [onlyUrgent, setOnlyUrgent] = useState(false);
  const [onlyNew, setOnlyNew] = useState(false);

  const [selectedJob, setSelectedJob] = useState<any | null>(null);
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);

  const openActionModal = (job: any) => {
    setSelectedJob(job);
    setIsActionModalOpen(true);
  };

  const closeModals = () => {
    setIsActionModalOpen(false);
    setSelectedJob(null);
  };

  // SAYFA AÇILDIĞINDA BACKEND'DEN VERİ ÇEKEN KOD
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_URL;
        const token = localStorage.getItem('accessToken'); 

        const response = await fetch(`${baseUrl}/agent/jobs`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }); 
        
        if (response.ok) {
          const data = await response.json();
          // ÇÖZÜM 1: Gelen verinin bir liste olduğundan emin oluyoruz. Değilse boş liste yapıyoruz.
          if (Array.isArray(data)) {
            setJobs(data);
          } else if (data && Array.isArray(data.data)) {
            setJobs(data.data);
          } else if (data && Array.isArray(data.items)) {
            setJobs(data.items);
          } else {
            setJobs([]); 
          }
        } else {
          console.error("Hata! Sunucu kapıyı açmadı, durum kodu:", response.status);
        }
      } catch (error) {
        console.error("Bağlantı hatası:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const filteredJobs = useMemo(() => {
    // ÇÖZÜM 2: jobs değişkeni her ne olursa olsun, bir liste değilse beyaz ekran vermemesi için korumaya alıyoruz.
    let result = Array.isArray(jobs) ? [...jobs] : [];

    if (selectedCategory !== 'Tümü') {
      result = result.filter((job) => job.category === selectedCategory || job.serviceType === selectedCategory);
    }

    if (selectedPort !== 'Tüm Limanlar') {
      result = result.filter((job) => job.port === selectedPort);
    }

    if (selectedBudget !== 'Tüm Bütçeler') {
      result = result.filter((job) => {
        if (selectedBudget === '₺0 - ₺50.000') return job.budgetValue <= 50000;
        if (selectedBudget === '₺50.000 - ₺100.000') return job.budgetValue > 50000 && job.budgetValue <= 100000;
        if (selectedBudget === '₺100.000 - ₺150.000') return job.budgetValue > 100000 && job.budgetValue <= 150000;
        if (selectedBudget === '₺150.000+') return job.budgetValue > 150000;
        return true;
      });
    }

    if (onlyUrgent) {
      result = result.filter((job) => job.tag === 'Acil');
    }

    if (onlyNew) {
      result = result.filter((job) => job.tag === 'Yeni İlan');
    }

    result.sort((a, b) => {
      if (sortBy === 'Acil Öncelikli') {
        if (a.tag === 'Acil' && b.tag !== 'Acil') return -1;
        if (a.tag !== 'Acil' && b.tag === 'Acil') return 1;
        return b.createdOrder - a.createdOrder;
      }

      if (sortBy === 'En Yeni') {
        return b.createdOrder - a.createdOrder;
      }

      if (sortBy === 'En Yüksek Bütçe') {
        return b.budgetValue - a.budgetValue;
      }

      if (sortBy === 'En Düşük Bütçe') {
        return a.budgetValue - b.budgetValue;
      }

      return 0;
    });

    return result;
  }, [jobs, selectedCategory, selectedPort, selectedBudget, sortBy, onlyUrgent, onlyNew]);

  return (
    <>
      <div className="mb-8 flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div>
          <button
            onClick={() => navigate('/dashboard/agent')}
            className="inline-flex items-center gap-1 text-sm font-semibold text-slate-500 hover:text-primary transition-colors mb-3"
          >
            <span className="material-icons-round text-[18px]">arrow_back</span>
            Seçime Geri Dön
          </button>

          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Uygun Acente İlanları Bulundu
          </h2>
          <p className="text-slate-500 dark:text-slate-400">
            {filteredJobs.length} kayıtlı ilan listeleniyor.
          </p>
        </div>

        <button
          onClick={() => navigate('/dashboard/agent/offers')}
          className="bg-primary hover:bg-primary/90 text-white font-bold py-3 px-6 rounded-2xl transition-all shadow-md shadow-primary/20 flex items-center justify-center gap-2"
        >
          <span className="material-icons-round text-[18px]">add</span>
          Hızlı İlan Ver
        </button>
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
                {[
                  'Tümü',
                  'Liman İşlemleri',
                  'Yükleme – Boşaltma Operasyonu',
                  'Gemi İkmal Hizmetleri',
                  'Teknik & Tamir Hizmetleri',
                  'Acentelik',
                  'Lojistik',
                ].map((item) => (
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

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400 mb-3">
                Liman
              </p>
              <select
                value={selectedPort}
                onChange={(e) => setSelectedPort(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              >
                <option>Tüm Limanlar</option>
                <option>İzmir</option>
                <option>Yalova</option>
                <option>Mersin</option>
              </select>
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400 mb-3">
                Bütçe Aralığı
              </p>
              <select
                value={selectedBudget}
                onChange={(e) => setSelectedBudget(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              >
                <option>Tüm Bütçeler</option>
                <option>₺0 - ₺50.000</option>
                <option>₺50.000 - ₺100.000</option>
                <option>₺100.000 - ₺150.000</option>
                <option>₺150.000+</option>
              </select>
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

            <button
              onClick={() => {
                setSelectedCategory('Tümü');
                setSelectedPort('Tüm Limanlar');
                setSelectedBudget('Tüm Bütçeler');
                setSortBy('Acil Öncelikli');
                setOnlyUrgent(false);
                setOnlyNew(false);
              }}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-semibold hover:border-primary/40 hover:text-primary transition-all"
            >
              <span className="material-icons-round text-[18px]">restart_alt</span>
              Filtreleri Sıfırla
            </button>
          </div>
        </aside>

        <section className="min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                Uygun İş Fırsatları
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Acente profilinize uygun iş fırsatları aşağıda listeleniyor.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
                Sırala:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all min-w-[180px]"
              >
                <option>Acil Öncelikli</option>
                <option>En Yeni</option>
                <option>En Yüksek Bütçe</option>
                <option>En Düşük Bütçe</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {isLoading ? (
              <div className="text-center py-10 text-slate-500">
                İlanlar yükleniyor...
              </div>
            ) : filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <div
                  key={job.id}
                  className={`bg-white dark:bg-slate-800 border rounded-3xl p-5 shadow-sm hover:shadow-md transition-all ${
                    job.tag === 'Acil'
                      ? 'border-red-200 dark:border-red-800/40 bg-red-50/40 dark:bg-red-900/10'
                      : 'border-slate-200 dark:border-slate-700 hover:border-primary/40'
                  }`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center gap-5">
                    <div className="flex items-center gap-4 min-w-0 lg:w-[38%]">
                      <img
                        src={job.image || 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=300&q=80'}
                        alt={job.title}
                        className="w-24 h-20 rounded-2xl object-cover border border-slate-200 dark:border-slate-700 shrink-0"
                      />

                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="text-xs font-bold text-slate-400 uppercase">ID: {130750 + job.id}</span>
                        </div>

                        <h4 className={`text-xl font-bold leading-snug mb-1 ${
                          job.tag === 'Acil'
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

                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-4 gap-3 lg:flex-1">
                      <div className="rounded-2xl bg-slate-50 dark:bg-slate-900/40 px-4 py-3 border border-slate-100 dark:border-slate-700/60">
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">
                          Kategori
                        </p>
                        <p className="text-sm font-bold text-slate-700 dark:text-slate-200">
                          {job.category}
                        </p>
                      </div>

                      <div className="rounded-2xl bg-slate-50 dark:bg-slate-900/40 px-4 py-3 border border-slate-100 dark:border-slate-700/60">
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">
                          Konum
                        </p>
                        <p className="text-sm font-bold text-slate-700 dark:text-slate-200">
                          {job.location}
                        </p>
                      </div>

                      <div className="rounded-2xl bg-slate-50 dark:bg-slate-900/40 px-4 py-3 border border-slate-100 dark:border-slate-700/60">
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">
                          Bütçe
                        </p>
                        <p className="text-sm font-bold text-slate-700 dark:text-slate-200">
                          {job.budget}
                        </p>
                      </div>

                      <div className="rounded-2xl bg-slate-50 dark:bg-slate-900/40 px-4 py-3 border border-slate-100 dark:border-slate-700/60">
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">
                          Deadline
                        </p>
                        <p className="text-sm font-bold text-slate-700 dark:text-slate-200">
                          {job.deadline}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3 lg:min-w-[210px]">
                      {job.tag === 'Acil' ? (
                        <span className={`inline-flex items-center justify-center gap-1.5 text-[11px] font-bold px-2.5 py-2 rounded-xl whitespace-nowrap ${getTagStyle(job.tag)}`}>
                          <span className="material-icons-round text-[14px]">warning</span>
                          Acil
                        </span>
                      ) : (
                        <span className={`inline-flex items-center justify-center text-[11px] font-bold px-2.5 py-2 rounded-xl whitespace-nowrap ${getTagStyle(job.tag)}`}>
                          {job.tag}
                        </span>
                      )}

                      <button
                        onClick={() => navigate(`/dashboard/agent/listing/${job.id}`)}
                        className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-semibold hover:border-primary/40 hover:text-primary transition-all"
                      >
                        <span className="material-icons-round text-[18px]">visibility</span>
                        Detayı Gör
                      </button>

                      <button
                        onClick={() => openActionModal(job)}
                        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-primary text-white font-bold shadow-md shadow-primary/20 hover:bg-primary/90 transition-all"
                      >
                        <span className="material-icons-round text-[18px]">handshake</span>
                        İş Birliği Başlat
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-3xl p-10 shadow-sm text-center">
                <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
                  <span className="material-icons-round text-slate-400">search_off</span>
                </div>
                <h4 className="text-lg font-bold text-slate-800 dark:text-white mb-2">
                  Uygun ilan bulunamadı
                </h4>
                <p className="text-slate-500 dark:text-slate-400">
                  Filtrelerinize uygun iş fırsatı bulunamadı.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>



      {isActionModalOpen && selectedJob && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 backdrop-blur-[2px] px-4">
          <div className="w-full max-w-2xl bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-700 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 dark:border-slate-700">
              <div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-white">
                  İş Birliği Başlat
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                  {selectedJob.title} fırsatı için başvuru oluşturun
                </p>
              </div>

              <button
                onClick={closeModals}
                className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all"
              >
                <span className="material-icons-round">close</span>
              </button>
            </div>

            <div className="p-6 space-y-5">
              <div className="rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-700/60 p-4">
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">İlan</p>
                <p className="font-bold text-slate-800 dark:text-white">{selectedJob.title}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{selectedJob.company}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Temsilci Adı"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40"
                />
                <input
                  type="text"
                  placeholder="İrtibat Telefonu"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40"
                />
              </div>

              <textarea
                rows={5}
                placeholder="İş birliği talebinize dair kısa açıklama ekleyin..."
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40 resize-none"
              />

              <div className="flex justify-end gap-3">
                <button
                  onClick={closeModals}
                  className="px-5 py-3 rounded-xl border border-slate-200 dark:border-slate-700 font-semibold"
                >
                  Vazgeç
                </button>

                <button
                  onClick={closeModals}
                  className="px-5 py-3 rounded-xl bg-primary text-white font-bold shadow-md shadow-primary/20 hover:bg-primary/90 transition-all"
                >
                  Başvuruyu Gönder
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AgentSearchPage;