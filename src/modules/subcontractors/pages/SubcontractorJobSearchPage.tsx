import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';


const jobs = [
  {
    id: 1,
    title: 'Makine Dairesi Bakım İşi',
    company: 'Kuzey Denizcilik',
    location: 'Tuzla / İstanbul',
    budget: '₺75.000 - ₺95.000',
    deadline: 'Son Başvuru: 18 Mart 2026',
    description:
      'Kuru yük gemisi için makine dairesi genel bakım, ekipman kontrolü ve raporlama hizmeti verecek deneyimli taşeron ekip aranmaktadır.',
    tag: 'Yeni İlan',
    category: 'Makine Bakımı',
    tagStyle:
      'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
  },
  {
    id: 2,
    title: 'Güverte Kumlama ve Boya',
    company: 'Marmara Lojistik',
    location: 'Ambarlı / İstanbul',
    budget: '₺110.000 - ₺145.000',
    deadline: 'Son Başvuru: 20 Mart 2026',
    description:
      'Genel kargo gemisi dış yüzey kumlama ve boya operasyonu için uzman taşeron ekipler değerlendirilecektir.',
    tag: 'Popüler',
    category: 'Boya / Kumlama',
    tagStyle:
      'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
  },
  {
    id: 3,
    title: 'Elektrik Tesisat Kontrolü',
    company: 'Delta Marine',
    location: 'Yalova',
    budget: '₺60.000 - ₺80.000',
    deadline: 'Son Başvuru: 22 Mart 2026',
    description:
      'Gemi elektrik hatlarının kontrolü, arıza tespiti ve bakım işlemleri için sertifikalı teknik ekip ihtiyacı bulunmaktadır.',
    tag: 'Acil',
    category: 'Elektrik',
    tagStyle:
      'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300',
  },
];

const SubcontractorJobSearchPage: React.FC = () => {
  const navigate = useNavigate();
const [selectedJob, setSelectedJob] = useState<(typeof jobs)[number] | null>(null);
const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
const [isOfferModalOpen, setIsOfferModalOpen] = useState(false);

const openDetailModal = (job: (typeof jobs)[number]) => {
  setSelectedJob(job);
  setIsOfferModalOpen(false);
  setIsDetailModalOpen(true);
};

const openOfferModal = (job: (typeof jobs)[number]) => {
  setSelectedJob(job);
  setIsDetailModalOpen(false);
  setIsOfferModalOpen(true);
};

const closeModals = () => {
  setIsDetailModalOpen(false);
  setIsOfferModalOpen(false);
  setSelectedJob(null);
};
  const [keywordInput, setKeywordInput] = useState('');
  const [locationInput, setLocationInput] = useState('Tüm Lokasyonlar');
  const [jobTypeInput, setJobTypeInput] = useState('Tüm Kategoriler');
  const [budgetInput, setBudgetInput] = useState('Tüm Bütçeler');

  const [appliedKeyword, setAppliedKeyword] = useState('');
  const [appliedLocation, setAppliedLocation] = useState('Tüm Lokasyonlar');
  const [appliedJobType, setAppliedJobType] = useState('Tüm Kategoriler');
  const [appliedBudget, setAppliedBudget] = useState('Tüm Bütçeler');
  
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesKeyword =
        job.title.toLowerCase().includes(appliedKeyword.toLowerCase()) ||
        job.company.toLowerCase().includes(appliedKeyword.toLowerCase()) ||
        job.description.toLowerCase().includes(appliedKeyword.toLowerCase());
  
      const matchesLocation =
        appliedLocation === 'Tüm Lokasyonlar' ||
        job.location.toLowerCase().includes(appliedLocation.toLowerCase());
  
      const matchesJobType =
        appliedJobType === 'Tüm Kategoriler' ||
        job.category === appliedJobType;
  
      const matchesBudget =
        appliedBudget === 'Tüm Bütçeler' ||
        (appliedBudget === '₺50.000 - ₺100.000' &&
          ['₺75.000 - ₺95.000', '₺60.000 - ₺80.000'].includes(job.budget)) ||
        (appliedBudget === '₺100.000 - ₺150.000' &&
          ['₺110.000 - ₺145.000'].includes(job.budget));
  
      return matchesKeyword && matchesLocation && matchesJobType && matchesBudget;
    });
  }, [appliedKeyword, appliedLocation, appliedJobType, appliedBudget]);
  
  const sortedJobs = [...filteredJobs].sort((a, b) => {
    if (a.tag === 'Acil' && b.tag !== 'Acil') return -1;
    if (a.tag !== 'Acil' && b.tag === 'Acil') return 1;
    return 0;
  });

  return (
    <>
      <div className="mb-8 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <button
              onClick={() => navigate('/dashboard/subcontractor')}
              className="inline-flex items-center gap-1 text-sm font-semibold text-slate-500 hover:text-primary transition-colors"
            >
              <span className="material-icons-round text-[18px]">arrow_back</span>
              Geri Dön
            </button>
          </div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Bana Uygun İlanlar</h2>
          <p className="text-slate-500 dark:text-slate-400">
            Size uygun ilanları inceleyin, filtreleyin ve hızlıca teklif verin.
          </p>
        </div>

        <button
          onClick={() => navigate('/dashboard/subcontractor/active-jobs')}
          className="bg-primary hover:bg-primary/90 text-white font-bold py-2.5 px-6 rounded-xl transition-all shadow-md shadow-primary/20 flex items-center gap-2"
        >
          <span className="material-icons-round text-[18px]">receipt_long</span>
          Aktif İşlerim
        </button>
      </div>

      <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/50 rounded-2xl p-5 md:p-6 shadow-sm mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
              Anahtar Kelime
            </label>
            <div className="relative">
              <span className="material-icons-round absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">
                search
              </span>
              <input
                type="text"
                value={keywordInput}
                onChange={(e) => setKeywordInput(e.target.value)}
                placeholder="Örn. bakım, boya, elektrik"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40 text-slate-800 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
              Konum
            </label>
            <select
              value={locationInput}
              onChange={(e) => setLocationInput(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all">
              <option>Tüm Lokasyonlar</option>
              <option>Tuzla</option>
              <option>Yalova</option>
              <option>Ambarlı</option>
              <option>İzmit</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
              İş Türü
            </label>
            <select
              value={jobTypeInput}
              onChange={(e) => setJobTypeInput(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all">
              <option>Tüm Kategoriler</option>
              <option>Makine Bakımı</option>
              <option>Boya / Kumlama</option>
              <option>Elektrik</option>
              <option>Mekanik</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
              Bütçe Aralığı
            </label>
            <select
              value={budgetInput}
              onChange={(e) => setBudgetInput(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all">
              <option>Tüm Bütçeler</option>
              <option>₺0 - ₺50.000</option>
              <option>₺50.000 - ₺100.000</option>
              <option>₺100.000 - ₺150.000</option>
              <option>₺150.000+</option>
            </select>
          </div>
          <div className="flex items-end gap-2">
            {/* Filtreleri Sıfırla */}
            <button
              onClick={() => {
                setKeywordInput('');
                setLocationInput('Tüm Lokasyonlar');
                setJobTypeInput('Tüm Kategoriler');
                setBudgetInput('Tüm Bütçeler');
          
                setAppliedKeyword('');
                setAppliedLocation('Tüm Lokasyonlar');
                setAppliedJobType('Tüm Kategoriler');
                setAppliedBudget('Tüm Bütçeler');
              }}
              className="px-3 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:text-red-500 hover:border-red-300 dark:hover:border-red-600 transition-all flex items-center justify-center"
            >
              <span className="material-icons-round text-[18px]">restart_alt</span>
            </button>
          
            {/* Filtreleri Uygula */}
            <button
              onClick={() => {
                setAppliedKeyword(keywordInput);
                setAppliedLocation(locationInput);
                setAppliedJobType(jobTypeInput);
                setAppliedBudget(budgetInput);
              }}
              className="flex-1 bg-primary hover:bg-primary/90 text-white font-bold py-3 px-5 rounded-xl transition-all shadow-md shadow-primary/20 flex items-center justify-center gap-2"
            >
              <span className="material-icons-round text-sm">filter_alt</span>
              Filtreleri Uygula
            </button>
          </div>
        </div>
      </div>

      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold text-slate-800 dark:text-white">Uygun İlanlar</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Toplam {filteredJobs.length} ilan bulundu
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        {sortedJobs.map((job) => (
          <div
            key={job.id}
            className={`
            rounded-2xl p-5 md:p-6 shadow-sm transition-all border
            ${
              job.tag === 'Acil'
                ? 'bg-red-50/60 dark:bg-red-900/10 border-red-200 dark:border-red-800/40 hover:border-red-300 dark:hover:border-red-700/50'
                : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-primary/40 hover:shadow-md'
            }
          `}
>
            <div className="flex items-start justify-between gap-3 mb-4">
              <div>
                <h4
                  className={`text-lg font-bold mb-1 ${
                    job.tag === 'Acil'
                      ? 'text-red-700 dark:text-red-300'
                      : 'text-slate-900 dark:text-white'
                  }`}
                >
                  {job.title}
                </h4>
                <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                  <span className="material-icons-round text-[16px] text-primary">apartment</span>
                  {job.company}
                </div>
              </div>

              {job.tag === 'Acil' ? (
                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-md whitespace-nowrap bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300">
                  <span className="material-icons-round text-[14px]">warning</span>
                  Acil
                </span>
              ) : (
                <span className={`text-[11px] font-bold px-2.5 py-1 rounded-md whitespace-nowrap ${job.tagStyle}`}>
                  {job.tag}
                </span>
              )}
            </div>

            <p className="text-sm leading-6 text-slate-500 dark:text-slate-400 mb-5">
              {job.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
              <div className="rounded-xl bg-slate-50 dark:bg-slate-900/40 px-4 py-3 border border-slate-100 dark:border-slate-700/60">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">Konum</p>
                <p className="text-sm font-bold text-slate-700 dark:text-slate-200">{job.location}</p>
              </div>

              <div className="rounded-xl bg-slate-50 dark:bg-slate-900/40 px-4 py-3 border border-slate-100 dark:border-slate-700/60">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">Bütçe</p>
                <p className="text-sm font-bold text-slate-700 dark:text-slate-200">{job.budget}</p>
              </div>

              <div className="rounded-xl bg-slate-50 dark:bg-slate-900/40 px-4 py-3 border border-slate-100 dark:border-slate-700/60">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">Tarih</p>
                <p className="text-sm font-bold text-slate-700 dark:text-slate-200">{job.deadline}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <button
                onClick={() => openDetailModal(job)}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-semibold hover:border-primary/40 hover:text-primary transition-all"
              >
                <span className="material-icons-round text-[18px]">visibility</span>
                Detayları Gör
              </button>

              <button
                onClick={() => openOfferModal(job)}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white font-bold shadow-md shadow-primary/20 hover:bg-primary/90 transition-all"
              >
                <span className="material-icons-round text-[18px]">send</span>
                Teklif Ver
              </button>
            </div>
          </div>
        ))}
      </div>
{isDetailModalOpen && selectedJob && (
  <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 backdrop-blur-[2px] px-4">
    <div className="w-full max-w-2xl bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-700 overflow-hidden max-h-[90vh] flex flex-col">
      <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 dark:border-slate-700 shrink-0">
        <div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-white">
            İlan Detayı
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Seçilen ilana ait detay bilgiler
          </p>
        </div>

        <button
          onClick={closeModals}
          className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all"
        >
          <span className="material-icons-round">close</span>
        </button>
      </div>

      <div className="p-6 overflow-y-auto">
        <div className="flex items-start justify-between gap-3 mb-5">
          <div>
            <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              {selectedJob.title}
            </h4>
            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <span className="material-icons-round text-[16px] text-primary">apartment</span>
              {selectedJob.company}
            </div>
          </div>

          <span className={`text-[11px] font-bold px-2.5 py-1 rounded-md whitespace-nowrap ${selectedJob.tagStyle}`}>
            {selectedJob.tag}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          <div className="rounded-xl bg-slate-50 dark:bg-slate-900/40 px-4 py-3 border border-slate-100 dark:border-slate-700/60">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">Konum</p>
            <p className="text-sm font-bold text-slate-700 dark:text-slate-200">{selectedJob.location}</p>
          </div>

          <div className="rounded-xl bg-slate-50 dark:bg-slate-900/40 px-4 py-3 border border-slate-100 dark:border-slate-700/60">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">Bütçe</p>
            <p className="text-sm font-bold text-slate-700 dark:text-slate-200">{selectedJob.budget}</p>
          </div>

          <div className="rounded-xl bg-slate-50 dark:bg-slate-900/40 px-4 py-3 border border-slate-100 dark:border-slate-700/60">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">Son Tarih</p>
            <p className="text-sm font-bold text-slate-700 dark:text-slate-200">{selectedJob.deadline}</p>
          </div>
        </div>

        <div className="rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-700/60 p-5">
          <h5 className="text-sm font-bold text-slate-800 dark:text-white mb-2">İş Açıklaması</h5>
          <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">
            {selectedJob.description}
          </p>
        </div>
      </div>

        <div className="flex flex-col sm:flex-row justify-end gap-3 p-6 pt-4 border-t border-slate-100 dark:border-slate-700 shrink-0 bg-white dark:bg-slate-800">
          <button
            onClick={closeModals}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-semibold hover:border-primary/40 hover:text-primary transition-all"
          >
            Kapat
          </button>

          <button
  onClick={() => {
    if (selectedJob) {
      openOfferModal(selectedJob);
    }
  }}
  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-primary text-white font-bold shadow-md shadow-primary/20 hover:bg-primary/90 transition-all"
>
  <span className="material-icons-round text-[18px]">send</span>
  Bu İlan İçin Teklif Ver
</button>
        </div>
    </div>
  </div>
      )}
      {isOfferModalOpen && selectedJob && (
  <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 backdrop-blur-[2px] px-4">
    <div className="w-full max-w-3xl bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-700 overflow-hidden max-h-[90vh] flex flex-col">
      
      {/* HEADER */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 dark:border-slate-700 shrink-0">
        <div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-white">
            Teklif Ver
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {selectedJob.title} ilanı için teklif oluşturun
          </p>
        </div>

        <button
          onClick={closeModals}
          className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all"
        >
          <span className="material-icons-round">close</span>
        </button>
      </div>

      <div className="p-6 space-y-6 overflow-y-auto">

        {/* İLAN BİLGİ */}
        <div className="rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-700/60 p-4 space-y-2">
          <p className="font-bold text-slate-800 dark:text-white">
            {selectedJob.title}
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {selectedJob.company}
          </p>

          {/* ⭐ ACENTE PUANI */}
          <div className="flex items-center gap-1 text-sm mt-2">
            <span className="material-icons-round text-yellow-400 text-[18px]">star</span>
            <span className="font-semibold text-slate-700 dark:text-slate-200">
              4.6 / 5
            </span>
            <span className="text-slate-400 text-xs">(Acenta puanı)</span>
          </div>
        </div>

        {/* DETAY BİLGİLER */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          <input
            type="text"
            placeholder="Liman (örn: Tuzla)"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40"
          />

          <input
            type="text"
            placeholder="Gemi Tipi (opsiyonel)"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40"
          />

          <input
            type="text"
            placeholder="İş Kategorisi (örn: Elektrik, Boya)"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40"
          />

          <input
            type="date"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40"
          />
        </div>

        {/* TEKLİF BİLGİLERİ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Teklif Tutarı (₺)"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40"
          />

          <input
            type="text"
            placeholder="Tahmini Süre (örn: 5 gün)"
            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40"
          />
        </div>

        {/* AÇIKLAMA */}
        <textarea
          rows={4}
          placeholder="Kısa açıklama / teklif notu"
          className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40 resize-none"
        />

        {/* FOTO / VİDEO */}
        <div className="border border-dashed border-slate-300 dark:border-slate-600 rounded-xl p-5 text-center cursor-pointer hover:border-primary transition-all">
          <span className="material-icons-round text-3xl text-slate-400 mb-2 block">
            upload
          </span>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Fotoğraf / video yükle (opsiyonel)
          </p>
        </div>
      </div>

        {/* BUTTONS */}
        <div className="flex justify-end gap-3 p-6 pt-4 border-t border-slate-100 dark:border-slate-700 shrink-0 bg-white dark:bg-slate-800">
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
            Teklifi Gönder
          </button>
        </div>

    </div>
  </div>
)}
    </>
  );
};

export default SubcontractorJobSearchPage;