import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Job {
  id: string;
  title: string;
  shipName: string;
  location: string;
  date: string;
  status: 'active' | 'reviewing' | 'completed';
  offerCount: number;
  category: string;
}

const AgentJobs: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'active' | 'reviewing' | 'completed'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [jobs, setJobs] = useState<Job[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedJobs = localStorage.getItem('jobs');

    if (savedJobs) {
      setJobs(JSON.parse(savedJobs));
    } else {
      setJobs([]);
    }
  }, []);

  const filteredJobs = jobs.filter((job) => {
    const matchesFilter = filter === 'all' ? true : job.status === filter;
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.shipName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const getStatusBadge = (status: Job['status']) => {
    switch (status) {
      case 'active':
        return (
          <span className="flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400 rounded-full text-xs font-bold border border-emerald-200 dark:border-emerald-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Yayında
          </span>
        );
      case 'reviewing':
        return (
          <span className="flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400 rounded-full text-xs font-bold border border-amber-200 dark:border-amber-500/30">
            <span className="material-icons-round text-[12px]">schedule</span>
            Değerlendiriliyor
          </span>
        );
      case 'completed':
        return (
          <span className="flex items-center gap-1.5 px-3 py-1 bg-slate-100 text-slate-700 dark:bg-slate-500/20 dark:text-slate-400 rounded-full text-xs font-bold border border-slate-200 dark:border-slate-500/30">
            <span className="material-icons-round text-[12px]">check_circle</span>
            Tamamlandı
          </span>
        );
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Mekanik':
        return 'engineering';
      case 'Boya':
        return 'format_paint';
      case 'Dalış':
        return 'scuba_diving';
      case 'Elektronik':
        return 'memory';
      case 'Liman İşlemleri':
        return 'sailing';
      case 'Yükleme – Boşaltma Operasyonu':
        return 'local_shipping';
      case 'Gemi İkmal Hizmetleri':
        return 'inventory_2';
      case 'Teknik & Tamir Hizmetleri':
        return 'build';
      case 'Personel (Crew) Hizmetleri':
        return 'groups';
      case 'Çevre & Atık Hizmetleri':
        return 'recycling';
      case 'Evrak & Kurye Hizmetleri':
        return 'description';
      default:
        return 'build';
    }
  };

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Aktif İlanlarım</h2>
          <p className="text-slate-500 dark:text-slate-400">
            Platformdaki taşeron ilanlarınızı buradan yönetin ve teklifleri inceleyin.
          </p>
        </div>

        <button
          onClick={() => navigate('/dashboard/agent/quick-post')}
          className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-sm hover:shadow-md whitespace-nowrap"
        >
          <span className="material-icons-round text-[20px]">add</span>
          Yeni İlan Oluştur
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex bg-slate-200/50 dark:bg-slate-800/50 rounded-xl overflow-x-auto w-full sm:w-auto p-1.5">
          {[
            { id: 'all', label: 'Tümü', count: jobs.length },
            { id: 'active', label: 'Yayında', count: jobs.filter((j) => j.status === 'active').length },
            { id: 'reviewing', label: 'Değerlendiriliyor', count: jobs.filter((j) => j.status === 'reviewing').length },
            { id: 'completed', label: 'Tamamlandı', count: jobs.filter((j) => j.status === 'completed').length },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as 'all' | 'active' | 'reviewing' | 'completed')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${
                filter === tab.id
                  ? 'bg-white dark:bg-slate-700 text-primary shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              {tab.label}
              <span
                className={`px-2 py-0.5 rounded-md text-[10px] ${
                  filter === tab.id ? 'bg-primary/10 text-primary' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="İlanlarda ara..."
            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-slate-800 dark:text-white font-medium placeholder-slate-400"
          />
          <span className="material-icons-round absolute left-3 top-2.5 text-slate-400 text-[20px]">search</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredJobs.map((job) => (
          <div
            key={job.id}
            className="group flex flex-col bg-white dark:bg-slate-800 rounded-2xl shadow-sm hover:shadow-xl border border-slate-100 dark:border-slate-700/50 overflow-hidden transition-all duration-300 hover:-translate-y-1"
          >
            <div className="p-6 flex-1 flex flex-col gap-4">
              <div className="flex justify-between items-start">
                <div className="flex gap-3 items-start">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-700 flex items-center justify-center border border-slate-100 dark:border-slate-600 shrink-0 text-slate-500 dark:text-slate-400 group-hover:bg-primary/5 group-hover:text-primary transition-colors">
                    <span className="material-icons-round">{getCategoryIcon(job.category)}</span>
                  </div>

                  <div>
                    {getStatusBadge(job.status)}
                    <h3 className="text-lg font-bold text-slate-800 dark:text-white mt-2 leading-tight group-hover:text-primary transition-colors">
                      {job.title}
                    </h3>
                  </div>
                </div>

           
              </div>

              <div className="flex flex-col gap-2 mt-2">
                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <span className="material-icons-round text-[16px] text-primary/70">directions_boat</span>
                  <span className="font-semibold">{job.shipName}</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-500">
                  <span className="material-icons-round text-[16px] text-slate-400">location_on</span>
                  <span>{job.location}</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-500">
                  <span className="material-icons-round text-[16px] text-slate-400">calendar_today</span>
                  <span>Yayın: {job.date}</span>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-700/50 flex justify-between items-center group-hover:bg-primary/5 transition-colors">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {job.offerCount > 0 ? (
                    <>
                      {[...Array(Math.min(3, job.offerCount))].map((_, i) => (
                        <div
                          key={i}
                          className="w-7 h-7 rounded-full bg-slate-200 border-2 border-white dark:border-slate-800 overflow-hidden shrink-0 shadow-sm"
                        >
                          <img
                            src={`https://i.pravatar.cc/150?img=${i + job.offerCount * 2}`}
                            alt="Bidder"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}

                      {job.offerCount > 3 && (
                        <div className="w-7 h-7 rounded-full bg-primary text-white text-[10px] font-bold border-2 border-white dark:border-slate-800 flex items-center justify-center shrink-0 z-10">
                          +{job.offerCount - 3}
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 ml-1">
                      Henüz teklif yok
                    </div>
                  )}
                </div>

                {job.offerCount > 0 && (
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-300 ml-2">
                    {job.offerCount} Teklif
                  </span>
                )}
              </div>

              <button
                onClick={() => navigate(`/dashboard/agent/jobs/${job.id}`)}
                className="text-sm font-bold text-primary group-hover:text-primary/80 transition-colors flex items-center gap-1"
              >
                İncele
                <span className="material-icons-round text-[16px]">arrow_forward</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredJobs.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700/50 text-center px-4">
          <div className="w-24 h-24 rounded-full bg-slate-50 dark:bg-slate-700 flex items-center justify-center text-slate-300 dark:text-slate-600 mb-4">
            <span className="material-icons-round text-5xl">search_off</span>
          </div>

          <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">İlan Bulunamadı</h3>
          <p className="text-slate-500 dark:text-slate-400 max-w-sm mb-6">
            Seçtiğiniz duruma uygun aktif bir ilanınız bulunmamaktadır. Yeni bir ilan oluşturarak başlayabilirsiniz.
          </p>

          <button
            onClick={() => navigate('/dashboard/agent/quick-post')}
            className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2"
          >
            <span className="material-icons-round text-[20px]">add</span>
            İlan Oluştur
          </button>
        </div>
      )}
    </div>
  );
};

export default AgentJobs;