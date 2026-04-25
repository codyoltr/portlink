import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { agencyService, type AssignedJobResponse } from '@/api/services/agencyService';

const AgentAssignedJobs: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'planning' | 'in_progress' | 'review' | 'completed'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [assignedJobs, setAssignedJobs] = useState<AssignedJobResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchJobs = async () => {
      setIsLoading(true);
      try {
        const data = await agencyService.getAssignedJobs(filter === 'all' ? undefined : filter);
        setAssignedJobs(data);
      } catch (error) {
        console.error('Atanmış işler çekilirken hata:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchJobs();
  }, [filter]);

  const filteredJobs = assignedJobs.filter((job) => {
    const matchesSearch =
      job.jobTitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.subcontractorCompanyName?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'planning':
        return { label: 'Planlanıyor', color: 'text-indigo-600 dark:text-indigo-400', icon: 'event' };
      case 'in_progress':
        return { label: 'Devam Ediyor', color: 'text-blue-600 dark:text-blue-400', icon: 'autorenew' };
      case 'review':
        return { label: 'Kontrol Aşamasında', color: 'text-amber-600 dark:text-amber-400', icon: 'fact_check' };
      case 'completed':
        return { label: 'Tamamlandı', color: 'text-emerald-600 dark:text-emerald-400', icon: 'check_circle' };
      default:
        return { label: 'Bilinmiyor', color: 'text-slate-600 dark:text-slate-400', icon: 'help_outline' };
    }
  };

  return (
    <div className="flex flex-col gap-4 animate-fade-in">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-1">Devam Eden İşler</h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm">
          Atadığınız taşeronların anlık süreçlerini, aşamalarını ve tamamlanma oranlarını takip edin.
        </p>
      </div>

      {/* Filter Tabs & Search */}
      <div className="flex flex-col xl:flex-row gap-3 xl:items-center justify-between">
        <div className="flex bg-slate-200/50 dark:bg-slate-800/50 p-1.5 rounded-xl overflow-x-auto w-full xl:w-max">
          {[
            { id: 'all', label: 'Tümü' },
            { id: 'planning', label: 'Planlanıyor' },
            { id: 'in_progress', label: 'Devam Ediyor' },
            { id: 'review', label: 'Kontrol Aşamasında' },
            { id: 'completed', label: 'Tamamlandı' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as typeof filter)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${filter === tab.id
                  ? 'bg-white dark:bg-slate-700 text-primary shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
            >
              {tab.label}
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

      {/* Result count */}
      <p className="text-sm text-slate-600 dark:text-slate-400">
        Belirlenen kriterlerinize uyan{' '}
        <span className="font-bold text-slate-800 dark:text-slate-100">{filteredJobs.length} kayıtlı iş</span> listeleniyor.
      </p>

      {/* Table — single white bordered container */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700/60 shadow-sm overflow-hidden">

        {/* Column Headers */}
        <div className="grid grid-cols-[3fr_1.4fr_1fr_1fr] border-b border-slate-200 dark:border-slate-700/60 bg-white dark:bg-slate-800">
          <div className="px-6 py-4 text-sm font-bold text-slate-600 dark:text-slate-300 text-center">İş Başlığı</div>
          <div className="px-6 py-4 text-sm font-bold text-slate-600 dark:text-slate-300 text-center">Durum</div>
          <div className="px-6 py-4 text-sm font-bold text-slate-600 dark:text-slate-300 text-center">Başlama Tarihi</div>
          <div className="px-6 py-4 text-sm font-bold text-slate-600 dark:text-slate-300 text-center">Konum</div>
        </div>

        {/* Rows */}
        <div className="divide-y divide-slate-100 dark:divide-slate-700/40">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-16 text-slate-400">
              <span className="material-icons-round text-4xl mb-3 animate-spin">autorenew</span>
              <p className="text-sm font-medium">Yükleniyor...</p>
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-slate-400">
              <span className="material-icons-round text-4xl mb-3">search_off</span>
              <p className="text-sm font-medium">Sonuç bulunamadı</p>
            </div>
          ) : (
            filteredJobs.map((job) => {
              const statusInfo = getStatusInfo(job.status);
              return (
                <div
                  key={job.id}
                  onClick={() => navigate(`/dashboard/agent/assigned/${job.id}`)}
                  className="grid grid-cols-[3fr_1.4fr_1fr_1fr] items-center hover:bg-slate-50 dark:hover:bg-slate-700/20 cursor-pointer transition-colors"
                >
                  {/* İş Başlığı — thumbnail + bilgi */}
                  <div className="flex items-center gap-4 px-6 py-5">
                    <div className="w-20 h-[52px] rounded-lg bg-slate-200 dark:bg-slate-700 overflow-hidden shrink-0 flex items-center justify-center border border-slate-200 dark:border-slate-600">
                      <span className="material-icons-round text-slate-400 text-2xl">directions_boat</span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-slate-400 dark:text-slate-500 mb-0.5">#{job.id.substring(0, 8)}</p>
                      <p className="text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline line-clamp-1">{job.jobTitle}</p>
                      <div className="flex items-center gap-1 mt-1 flex-wrap">
                        <span className="material-icons-round text-amber-500 text-[14px]">stars</span>
                        <span className="text-xs font-semibold text-amber-600 dark:text-amber-400">{job.subcontractorCompanyName}</span>
                      </div>
                    </div>
                  </div>

                  {/* Durum */}
                  <div className="px-6 py-5 text-center">
                    <span className={`text-sm font-bold ${statusInfo.color}`}>{statusInfo.label}</span>
                  </div>
                  {/* Tarih */}
                  <div className="px-6 py-5 text-center">
                    <p className="text-sm font-bold text-slate-700 dark:text-slate-200">
                      {job.startDate || '-'}
                    </p>
                  </div>
                  {/* Konum */}
                  <div className="px-6 py-5 text-center">
                    <p className="text-sm font-bold text-slate-800 dark:text-white">-</p>
                    <p className="text-xs text-slate-400 dark:text-slate-500">-</p>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Pagination — inside the box */}
        <div className="flex items-center justify-center gap-2 py-4 border-t border-slate-100 dark:border-slate-700/40">
          <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 text-slate-400 hover:text-slate-700 hover:border-slate-300 transition-all">
            <span className="material-icons-round text-[18px]">chevron_left</span>
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary text-white text-sm font-bold shadow-sm">
            1
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 text-sm font-semibold hover:border-primary/50 hover:text-primary transition-all">
            2
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 text-slate-400 hover:text-slate-700 hover:border-slate-300 transition-all">
            <span className="material-icons-round text-[18px]">chevron_right</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgentAssignedJobs;