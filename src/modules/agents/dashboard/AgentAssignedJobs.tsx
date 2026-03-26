import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface AssignedJob {
  id: string;
  title: string;
  shipName: string;
  subcontractor: string;
  subcontractorInitials: string;
  progress: number;
  status: 'planning' | 'in_progress' | 'review' | 'completed';
  startDate: string;
  dueDate: string;
}

const mockAssignedJobs: AssignedJob[] = [
  {
    id: '1',
    title: 'Ana Makine Rodaj ve Overhaul İşlemleri',
    shipName: 'M/V Ocean Explorer',
    subcontractor: 'Port Teknik A.Ş.',
    subcontractorInitials: 'PT',
    progress: 65,
    status: 'in_progress',
    startDate: '10 Mart 2026',
    dueDate: '20 Mart 2026',
  },
  {
    id: '2',
    title: 'Pervane ve Dümen Yelkeni Temizliği',
    shipName: 'M/V Pacific Star',
    subcontractor: 'Marine Destek Ltd.',
    subcontractorInitials: 'MD',
    progress: 100,
    status: 'completed',
    startDate: '05 Mart 2026',
    dueDate: '09 Mart 2026',
  },
  {
    id: '3',
    title: 'Seyir Cihazları ve Radar Kalibrasyonu',
    shipName: 'M/V Mediterranean',
    subcontractor: 'ElektroDeniz A.Ş.',
    subcontractorInitials: 'ED',
    progress: 25,
    status: 'planning',
    startDate: '16 Mart 2026',
    dueDate: '18 Mart 2026',
  },
  {
    id: '4',
    title: 'Güverte Boya ve Pas Giderme',
    shipName: 'S/S Atlantic',
    subcontractor: 'BoyaMarin Sanayi',
    subcontractorInitials: 'BM',
    progress: 80,
    status: 'review',
    startDate: '01 Mart 2026',
    dueDate: '15 Mart 2026',
  }
];

const AgentAssignedJobs: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'planning' | 'in_progress' | 'review' | 'completed'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const filteredJobs = mockAssignedJobs.filter(job => {
    const matchesFilter = filter === 'all' ? true : job.status === filter;
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          job.shipName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          job.subcontractor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusInfo = (status: AssignedJob['status']) => {
    switch (status) {
      case 'planning':
        return {
          label: 'Planlanıyor',
          color: 'text-indigo-700 bg-indigo-100 dark:bg-indigo-500/20 dark:text-indigo-400 border-indigo-200 dark:border-indigo-500/30',
          icon: 'event',
          barColor: 'bg-indigo-500'
        };
      case 'in_progress':
        return {
          label: 'Devam Ediyor',
          color: 'text-blue-700 bg-blue-100 dark:bg-blue-500/20 dark:text-blue-400 border-blue-200 dark:border-blue-500/30',
          icon: 'autorenew',
          barColor: 'bg-blue-500'
        };
      case 'review':
        return {
          label: 'Kontrol Aşamasında',
          color: 'text-amber-700 bg-amber-100 dark:bg-amber-500/20 dark:text-amber-400 border-amber-200 dark:border-amber-500/30',
          icon: 'fact_check',
          barColor: 'bg-amber-500'
        };
      case 'completed':
        return {
          label: 'Tamamlandı',
          color: 'text-emerald-700 bg-emerald-100 dark:bg-emerald-500/20 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/30',
          icon: 'check_circle',
          barColor: 'bg-emerald-500'
        };
    }
  };

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Devam Eden İşler</h2>
          <p className="text-slate-500 dark:text-slate-400">Atadığınız taşeronların anlık süreçlerini, aşamalarını ve tamamlanma oranlarını takip edin.</p>
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div className="flex flex-col xl:flex-row gap-4 xl:items-center justify-between mb-2">
        <div className="flex bg-slate-200/50 dark:bg-slate-800/50 p-1 rounded-xl overflow-x-auto w-full xl:w-max p-1.5">
          {[
            { id: 'all', label: 'Tümü', count: mockAssignedJobs.length },
            { id: 'planning', label: 'Planlanıyor', count: mockAssignedJobs.filter(j => j.status === 'planning').length },
            { id: 'in_progress', label: 'Devam Ediyor', count: mockAssignedJobs.filter(j => j.status === 'in_progress').length },
            { id: 'review', label: 'Kontrol Aşamasında', count: mockAssignedJobs.filter(j => j.status === 'review').length },
            { id: 'completed', label: 'Tamamlandı', count: mockAssignedJobs.filter(j => j.status === 'completed').length },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as 'all' | 'planning' | 'in_progress' | 'review' | 'completed')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${
                filter === tab.id
                  ? 'bg-white dark:bg-slate-700 text-primary shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              {tab.label}
              <span className={`px-2 py-0.5 rounded-md text-[10px] ${
                filter === tab.id ? 'bg-primary/10 text-primary' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        <div className="relative w-full xl:w-72">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="İşlerde veya taşeronlarda ara..."
            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-slate-800 dark:text-white font-medium placeholder-slate-400"
          />
          <span className="material-icons-round absolute left-3 top-2.5 text-slate-400 text-[20px]">search</span>
        </div>
      </div>

      {/* Jobs List View */}
      <div className="flex flex-col gap-4">
        {filteredJobs.map((job) => {
          const statusInfo = getStatusInfo(job.status);
          
          return (
            <div key={job.id} className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm hover:shadow-md border border-slate-100 dark:border-slate-700/50 transition-all">
              <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center">
                
                {/* Title and Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${statusInfo.color}`}>
                      <span className="material-icons-round text-[14px]">{statusInfo.icon}</span>
                      {statusInfo.label}
                    </span>
                    <h3 className="text-lg font-bold text-slate-800 dark:text-white truncate">{job.title}</h3>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <span className="material-icons-round text-[16px]">directions_boat</span>
                      <span className="font-semibold text-slate-700 dark:text-slate-300">{job.shipName}</span>
                    </div>
                    <div className="hidden sm:block w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600"></div>
                    <div className="flex items-center gap-1.5">
                      <span className="material-icons-round text-[16px]">today</span>
                      <span>Başlama: <span className="font-semibold">{job.startDate}</span></span>
                    </div>
                    <div className="hidden sm:block w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600"></div>
                    <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                      <span className="material-icons-round text-[16px] text-primary">event_busy</span>
                      <span>Bitiş: <span className="font-semibold">{job.dueDate}</span></span>
                    </div>
                  </div>
                </div>

                {/* Subcontractor details */}
                <div className="flex items-center gap-3 lg:w-48 shrink-0 bg-slate-50 dark:bg-slate-700/30 p-3 rounded-xl">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm border border-primary/20 shrink-0">
                    {job.subcontractorInitials}
                  </div>
                  <div className="overflow-hidden">
                    <div className="text-xs font-semibold text-slate-400 mb-0.5">Atanan Taşeron</div>
                    <div className="text-sm font-bold text-slate-800 dark:text-white truncate">{job.subcontractor}</div>
                  </div>
                </div>

                {/* Progress Bar & Actions */}
                <div className="w-full lg:w-64 shrink-0 flex items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex justify-between items-end mb-1.5">
                      <span className="text-xs font-bold text-slate-500 dark:text-slate-400">İlerleme</span>
                      <span className="text-sm font-black text-slate-800 dark:text-white">{job.progress}%</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-1000 ease-out ${statusInfo.barColor} ${job.progress > 0 && job.progress < 100 ? 'relative overflow-hidden' : ''}`}
                        style={{ width: `${job.progress}%` }}
                      >
                         {job.progress > 0 && job.progress < 100 && (
                           <div className="absolute inset-0 bg-white/20 animate-[shimmer_2s_infinite]"></div>
                         )}
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => navigate(`/dashboard/agent/assigned/${job.id}`)}
                    className="w-10 h-10 rounded-xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-all shrink-0"
                  >
                    <span className="material-icons-round">keyboard_arrow_right</span>
                  </button>
                </div>

              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};

export default AgentAssignedJobs;
