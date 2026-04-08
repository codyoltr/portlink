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

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-700/50 dark:bg-slate-800">
        {/* Table Header */}
        <div className="hidden grid-cols-12 gap-4 border-b border-slate-200 bg-slate-50 px-6 py-4 text-sm font-semibold text-slate-500 md:grid dark:border-slate-700/50 dark:bg-slate-800/80">
          <div className="col-span-6 pl-32">İlan Başlığı</div>
          <div className="col-span-2 text-center">Kategori</div>
          <div className="col-span-2 text-center">İlan Tarihi</div>
          <div className="col-span-2 text-center">Konum</div>
        </div>

        {/* List */}
        <div className="flex flex-col divide-y divide-slate-100 dark:divide-slate-700/50">
          {filteredJobs.map((job) => {
            const dateParts = job.date.split('.');
            const formattedDate = dateParts.length === 3 
                ? { top: `${dateParts[0]} Eki`, bottom: dateParts[2] || '2024' } 
                : { top: job.date.substring(0, 6) || job.date, bottom: job.date.substring(6) || '2024' };
            
            const locationParts = job.location.split(' ');
            const locTop = locationParts[0] || job.location;
            const locBottom = locationParts.slice(1).join(' ') || 'Limanı';

            return (
              <div
                key={job.id}
                onClick={() => navigate(`/dashboard/agent/jobs/${job.id}`)}
                className="group flex cursor-pointer flex-col gap-4 p-6 transition-colors hover:bg-slate-50/50 md:grid md:grid-cols-12 md:items-center dark:hover:bg-slate-700/30"
              >
                {/* Image & Title */}
                <div className="col-span-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                  <div className="h-[90px] w-[140px] shrink-0 overflow-hidden rounded-md border border-slate-200 dark:border-slate-700">
                    <img
                      src={`https://picsum.photos/seed/${job.id || 'ship'}/280/180`}
                      alt={job.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  
                  <div className="flex flex-col items-start gap-1">
                    <span className="text-xs font-medium text-slate-400">#{job.id.padStart(10, '0')}</span>
                    <h3 className="line-clamp-2 text-base font-bold text-blue-700 transition-colors group-hover:text-blue-600 dark:text-blue-400">
                      {job.title}
                    </h3>
                    <div className="mt-1 flex flex-wrap items-center gap-2">
                      <span className="flex items-center gap-1 rounded bg-orange-50 px-2 py-0.5 text-[11px] font-bold text-orange-600 dark:bg-orange-500/10 dark:text-orange-500">
                        <span className="material-icons-round text-[12px]">stars</span>
                        Taşeron İlanı
                      </span>
                      <span className="line-clamp-1 text-xs text-slate-500 dark:text-slate-400">
                        - {job.category.length > 30 ? job.category.substring(0, 30) + "..." : job.category}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Category */}
                <div className="col-span-2 flex items-center justify-start md:justify-center">
                  <span className="text-left text-sm font-bold leading-tight text-slate-700 dark:text-slate-200 md:text-center">
                    {job.category}
                  </span>
                </div>

                {/* Date */}
                <div className="col-span-2 flex items-center justify-start text-sm font-bold text-slate-700 md:flex-col md:justify-center dark:text-slate-300">
                  <span className="mr-2 md:mr-0">{formattedDate.top}</span>
                  <span className="text-xs font-medium text-slate-500">{formattedDate.bottom}</span>
                </div>

                {/* Location */}
                <div className="col-span-2 flex items-center justify-start text-sm font-bold text-slate-700 md:flex-col md:justify-center md:text-center dark:text-slate-300">
                  <span className="mr-2 md:mr-0">{locTop}</span>
                  <span className="text-xs font-medium text-slate-500">{locBottom}</span>
                </div>
              </div>
            );
          })}
        </div>
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