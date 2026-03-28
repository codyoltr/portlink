import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface AssignedJob {
  id: string;
  jobNumber: string;
  title: string;
  shipName: string;
  subcontractor: string;
  description: string;
  progress: number;
  status: 'planning' | 'in_progress' | 'review' | 'completed';
  startDate: string;
  dueDate: string;
  location: string;
  locationDetail: string;
}

const mockAssignedJobs: AssignedJob[] = [
  {
    id: '1',
    jobNumber: '#0000000001',
    title: 'Ana Makine Rodaj ve Overhaul İşlemleri',
    shipName: 'M/V Ocean Explorer',
    subcontractor: 'Port Teknik A.Ş.',
    description: 'Motor sökümü, parça kontrolü ve yeniden montaj işlemleri',
    progress: 65,
    status: 'in_progress',
    startDate: '10 Mart 2026',
    dueDate: '20 Mart 2026',
    location: 'İzmir',
    locationDetail: 'Alsancak',
  },
  {
    id: '2',
    jobNumber: '#0000000002',
    title: 'Pervane ve Dümen Yelkeni Temizliği',
    shipName: 'M/V Pacific Star',
    subcontractor: 'Marine Destek Ltd.',
    description: 'Su altı temizlik, boya ve koruyucu kaplama işlemleri',
    progress: 100,
    status: 'completed',
    startDate: '05 Mart 2026',
    dueDate: '09 Mart 2026',
    location: 'İstanbul',
    locationDetail: 'Tuzla',
  },
  {
    id: '3',
    jobNumber: '#0000000003',
    title: 'Seyir Cihazları ve Radar Kalibrasyonu',
    shipName: 'M/V Mediterranean',
    subcontractor: 'ElektroDeniz A.Ş.',
    description: 'GPS, AIS ve radar sistemlerinin test ve kalibrasyonu',
    progress: 25,
    status: 'planning',
    startDate: '16 Mart 2026',
    dueDate: '18 Mart 2026',
    location: 'İzmir',
    locationDetail: 'Çiğli',
  },
  {
    id: '4',
    jobNumber: '#0000000004',
    title: 'Güverte Boya ve Pas Giderme',
    shipName: 'S/S Atlantic',
    subcontractor: 'BoyaMarin Sanayi',
    description: 'Sandblast, astar ve boya uygulamaları',
    progress: 80,
    status: 'review',
    startDate: '01 Mart 2026',
    dueDate: '15 Mart 2026',
    location: 'Mersin',
    locationDetail: 'Liman',
  },
];

const AgentAssignedJobs: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'planning' | 'in_progress' | 'review' | 'completed'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const filteredJobs = mockAssignedJobs.filter((job) => {
    const matchesFilter = filter === 'all' ? true : job.status === filter;
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.shipName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.subcontractor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusInfo = (status: AssignedJob['status']) => {
    switch (status) {
      case 'planning':
        return { label: 'Planlanıyor', color: 'text-indigo-600 dark:text-indigo-400', icon: 'event' };
      case 'in_progress':
        return { label: 'Devam Ediyor', color: 'text-blue-600 dark:text-blue-400', icon: 'autorenew' };
      case 'review':
        return { label: 'Kontrol Aşamasında', color: 'text-amber-600 dark:text-amber-400', icon: 'fact_check' };
      case 'completed':
        return { label: 'Tamamlandı', color: 'text-emerald-600 dark:text-emerald-400', icon: 'check_circle' };
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
            { id: 'all', label: 'Tümü', count: mockAssignedJobs.length },
            { id: 'planning', label: 'Planlanıyor', count: mockAssignedJobs.filter((j) => j.status === 'planning').length },
            { id: 'in_progress', label: 'Devam Ediyor', count: mockAssignedJobs.filter((j) => j.status === 'in_progress').length },
            { id: 'review', label: 'Kontrol Aşamasında', count: mockAssignedJobs.filter((j) => j.status === 'review').length },
            { id: 'completed', label: 'Tamamlandı', count: mockAssignedJobs.filter((j) => j.status === 'completed').length },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as typeof filter)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${
                filter === tab.id
                  ? 'bg-white dark:bg-slate-700 text-primary shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              {tab.label}
              <span className={`px-2 py-0.5 rounded-md text-[10px] ${filter === tab.id ? 'bg-primary/10 text-primary' : 'bg-slate-200 dark:bg-slate-800 text-slate-500'}`}>
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
          {filteredJobs.length === 0 ? (
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
                      <p className="text-xs text-slate-400 dark:text-slate-500 mb-0.5">{job.jobNumber}</p>
                      <p className="text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline line-clamp-1">{job.title}</p>
                      <div className="flex items-center gap-1 mt-1 flex-wrap">
                        <span className="material-icons-round text-amber-500 text-[14px]">stars</span>
                        <span className="text-xs font-semibold text-amber-600 dark:text-amber-400">{job.subcontractor}</span>
                        <span className="text-xs text-slate-400 dark:text-slate-500">— {job.description}</span>
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
    {job.startDate}
  </p>
</div>
                  {/* Konum */}
                  <div className="px-6 py-5 text-center">
                    <p className="text-sm font-bold text-slate-800 dark:text-white">{job.location}</p>
                    <p className="text-xs text-slate-400 dark:text-slate-500">{job.locationDetail}</p>
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