import React from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/features/dashboard/components/DashboardLayout';

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
    tagStyle:
      'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300',
  },
];

const SubcontractorJobSearchPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <DashboardLayout role="subcontractor">
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
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Yeni İş Ara</h2>
          <p className="text-slate-500 dark:text-slate-400">
            Size uygun ilanları inceleyin, filtreleyin ve hızlıca teklif verin.
          </p>
        </div>

        <button className="bg-primary hover:bg-primary/90 text-white font-bold py-2.5 px-6 rounded-xl transition-all shadow-md shadow-primary/20 flex items-center justify-center gap-2">
          <span className="material-icons-round text-sm">tune</span>
          Filtreleri Uygula
        </button>
      </div>

      <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/50 rounded-2xl p-5 md:p-6 shadow-sm mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
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
                placeholder="Örn. bakım, boya, elektrik"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40 text-slate-800 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
              Konum
            </label>
            <select className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all">
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
            <select className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all">
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
            <select className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all">
              <option>Tüm Bütçeler</option>
              <option>₺0 - ₺50.000</option>
              <option>₺50.000 - ₺100.000</option>
              <option>₺100.000 - ₺150.000</option>
              <option>₺150.000+</option>
            </select>
          </div>
        </div>
      </div>

      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold text-slate-800 dark:text-white">Uygun İlanlar</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Toplam 12 ilan bulundu
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 md:p-6 shadow-sm hover:border-primary/40 hover:shadow-md transition-all"
          >
            <div className="flex items-start justify-between gap-3 mb-4">
              <div>
                <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                  {job.title}
                </h4>
                <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                  <span className="material-icons-round text-[16px] text-primary">apartment</span>
                  {job.company}
                </div>
              </div>

              <span className={`text-[11px] font-bold px-2.5 py-1 rounded-md whitespace-nowrap ${job.tagStyle}`}>
                {job.tag}
              </span>
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
              <button className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-semibold hover:border-primary/40 hover:text-primary transition-all">
                <span className="material-icons-round text-[18px]">visibility</span>
                Detayları Gör
              </button>

              <button className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white font-bold shadow-md shadow-primary/20 hover:bg-primary/90 transition-all">
                <span className="material-icons-round text-[18px]">send</span>
                Teklif Ver
              </button>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default SubcontractorJobSearchPage;