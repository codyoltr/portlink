import React from 'react';
import DashboardLayout from '@/features/dashboard/components/DashboardLayout';
import { Link } from "react-router-dom";

const activeJobs = [
  {
    id: 1,
    title: 'Ana Makine Bakımı',
    company: 'Kuzey Denizcilik',
    location: 'Tuzla',
    status: 'Devam Ediyor',
    progress: 65,
    startDate: '10 Mart 2026',
    endDate: '18 Mart 2026',
    price: '₺48.000',
    description:
      'Ana makine periyodik bakım süreci devam ediyor. Ekip sahada aktif olarak çalışıyor.',
  },
  {
    id: 2,
    title: 'Güverte Boyama',
    company: 'Marmara Lojistik',
    location: 'Ambarlı',
    status: 'Planlandı',
    progress: 25,
    startDate: '15 Mart 2026',
    endDate: '22 Mart 2026',
    price: '₺36.500',
    description:
      'Gemi dış güverte kumlama ve boya işlemleri için hazırlık süreci sürüyor.',
  },
  {
    id: 3,
    title: 'Boru Hattı Onarımı',
    company: 'Deniz Yıldızı Gemi Servisi',
    location: 'Pendik',
    status: 'Tamamlanmak Üzere',
    progress: 90,
    startDate: '08 Mart 2026',
    endDate: '14 Mart 2026',
    price: '₺58.000',
    description:
      'Makine dairesindeki boru hattı bakım ve onarım işlemlerinde son aşamaya gelindi.',
  },
];

const getStatusStyles = (status: string) => {
  switch (status) {
    case 'Devam Ediyor':
      return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300';
    case 'Planlandı':
      return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300';
    case 'Tamamlanmak Üzere':
      return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300';
    default:
      return 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300';
  }
};

const SubcontractorActiveJobsPage: React.FC = () => {
  return (
    <DashboardLayout role="subcontractor">
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
            Aktif İşlerim
          </h2>
          <p className="text-slate-500 dark:text-slate-400">
            Onaylanmış ve şu anda yürütülen operasyonlarınızı buradan takip edebilirsiniz.
          </p>
        </div>

        <button className="bg-primary hover:bg-primary/90 text-white font-bold py-2.5 px-6 rounded-xl transition-all shadow-md shadow-primary/20 flex items-center gap-2">
          <span className="material-icons-round text-sm">assignment</span>
          Tüm İşleri Gör
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50">
          <div className="p-3 w-fit bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-xl mb-4">
            <span className="material-icons-round">work</span>
          </div>
          <h3 className="text-slate-500 dark:text-slate-400 text-sm font-semibold mb-1">
            Aktif İş Sayısı
          </h3>
          <p className="text-3xl font-extrabold text-slate-800 dark:text-white">3</p>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50">
          <div className="p-3 w-fit bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-xl mb-4">
            <span className="material-icons-round">payments</span>
          </div>
          <h3 className="text-slate-500 dark:text-slate-400 text-sm font-semibold mb-1">
            Toplam Hakediş
          </h3>
          <p className="text-3xl font-extrabold text-slate-800 dark:text-white">₺142.500</p>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50">
          <div className="p-3 w-fit bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-xl mb-4">
            <span className="material-icons-round">schedule</span>
          </div>
          <h3 className="text-slate-500 dark:text-slate-400 text-sm font-semibold mb-1">
            Devam Eden İş
          </h3>
          <p className="text-3xl font-extrabold text-slate-800 dark:text-white">1</p>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50">
          <div className="p-3 w-fit bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 rounded-xl mb-4">
            <span className="material-icons-round">event</span>
          </div>
          <h3 className="text-slate-500 dark:text-slate-400 text-sm font-semibold mb-1">
            Planlanan İş
          </h3>
          <p className="text-3xl font-extrabold text-slate-800 dark:text-white">1</p>
        </div>
      </div>

      {/* Active Job Cards */}
      <div className="space-y-5">
        {activeJobs.map((job) => (
          <div
            key={job.id}
            className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-sm"
          >
            <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-6">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    {job.title}
                  </h3>
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full ${getStatusStyles(job.status)}`}
                  >
                    {job.status}
                  </span>
                </div>

                <p className="text-slate-500 dark:text-slate-400 mb-4">
                  {job.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                  <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-4">
                    <p className="text-slate-400 mb-1">Firma</p>
                    <p className="font-semibold text-slate-800 dark:text-white">{job.company}</p>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-4">
                    <p className="text-slate-400 mb-1">Konum</p>
                    <p className="font-semibold text-slate-800 dark:text-white">{job.location}</p>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-4">
                    <p className="text-slate-400 mb-1">Başlangıç</p>
                    <p className="font-semibold text-slate-800 dark:text-white">{job.startDate}</p>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-4">
                    <p className="text-slate-400 mb-1">Bitiş</p>
                    <p className="font-semibold text-slate-800 dark:text-white">{job.endDate}</p>
                  </div>
                </div>
              </div>

              <div className="xl:w-72 w-full">
                <div className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-slate-500 dark:text-slate-400">İlerleme</span>
                    <span className="text-sm font-bold text-slate-800 dark:text-white">
                      %{job.progress}
                    </span>
                  </div>

                  <div className="w-full h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden mb-5">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${job.progress}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between mb-5">
                    <span className="text-sm text-slate-500 dark:text-slate-400">Hakediş</span>
                    <span className="text-lg font-extrabold text-slate-800 dark:text-white">
                      {job.price}
                    </span>
                  </div>

                  <Link
                    to={`/dashboard/subcontractor/active-jobs/${job.id}`}
                    className="block w-full text-center bg-primary hover:bg-primary/90 text-white font-bold py-3 rounded-xl transition-all"
                  >
                    İş Detayını Gör
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default SubcontractorActiveJobsPage;