import React, { useState } from 'react';
import DashboardLayout from '../components/dashboard/DashboardLayout';

const Home: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'agent' | 'subcontractor'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Dummy İlan Verileri
  const jobs = [
    {
      id: 1,
      type: 'agent',
      title: 'Port Agency Service (Bulk Carrier)',
      company: 'Kuzey Denizcilik',
      location: 'İstanbul (Ambarlı)',
      date: '2 Saat Önce',
      description: 'Gelecek hafta Ambarlı limanına yanaşacak yük gemimiz için tam kapsamlı acente hizmeti aranmaktadır.',
      status: 'Yeni'
    },
    {
      id: 2,
      type: 'subcontractor',
      title: 'Ana Makine Periyodik Bakımı',
      company: 'M/V Aegean Star',
      location: 'İzmir (Aliağa)',
      date: '1 Gün Önce',
      description: 'Tersanede bulunan gemimiz için 5 gün sürecek ana makine periyodik bakımı yapacak yetkili taşeron aranmaktadır.',
      status: 'Acil'
    },
    {
      id: 3,
      type: 'subcontractor',
      title: 'Güverte Kumlama ve Boya',
      company: 'Marmara Lojistik',
      location: 'Kocaeli (Derince)',
      date: '3 Gün Önce',
      description: 'Genel kargo gemisi dış ve iç güverte kumlama ve boyama işlemleri. Sadece sertifikalı ekiplerin teklif vermesi rica olunur.',
      status: 'Aktif'
    },
    {
      id: 4,
      type: 'agent',
      title: 'Gümrükleme ve Kumanya Desteği',
      company: 'Global Shipping Ltd.',
      location: 'Mersin',
      date: '4 Gün Önce',
      description: 'Mersin limanında beklemede olan gemimiz için acil kumanya tedariği ve gümrükleme işlemlerini yürütecek acente arıyoruz.',
      status: 'Aktif'
    }
  ];

  const filteredJobs = jobs.filter(job => {
    const matchesTab = activeTab === 'all' || job.type === activeTab;
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <DashboardLayout role="agent"> {/* Varsayılan rol olarak agent geçiyoruz, header/sidebar yapısal tamlığı için */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2 tracking-tight">İş İlanları Panosu</h1>
        <p className="text-slate-600 dark:text-slate-400 text-lg">Platformdaki tüm güncel hizmet taleplerini ve iş fırsatlarını inceleyin.</p>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex bg-slate-100 dark:bg-slate-800/50 p-1.5 rounded-xl border border-slate-200 dark:border-slate-700 w-full md:w-auto">
          <button
            onClick={() => setActiveTab('all')}
            className={`flex-1 md:flex-none px-6 py-2.5 text-sm font-bold rounded-lg transition-all ${activeTab === 'all' ? 'bg-white dark:bg-slate-700 text-primary shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'}`}
          >
            Tüm İlanlar
          </button>
          <button
            onClick={() => setActiveTab('agent')}
            className={`flex-1 md:flex-none px-6 py-2.5 text-sm font-bold rounded-lg transition-all ${activeTab === 'agent' ? 'bg-white dark:bg-slate-700 text-primary shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'}`}
          >
            Acente Arayanlar
          </button>
          <button
            onClick={() => setActiveTab('subcontractor')}
            className={`flex-1 md:flex-none px-6 py-2.5 text-sm font-bold rounded-lg transition-all ${activeTab === 'subcontractor' ? 'bg-white dark:bg-slate-700 text-primary shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'}`}
          >
            Taşeron Arayanlar
          </button>
        </div>

        <div className="relative w-full md:w-72">
          <span className="material-icons-round absolute left-3 top-2.5 text-slate-400">search</span>
          <input
            type="text"
            placeholder="İlan veya firma ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all dark:text-white"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <div key={job.id} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all cursor-pointer group flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-2.5 rounded-xl ${job.type === 'agent' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' : 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400'}`}>
                  <span className="material-icons-round">{job.type === 'agent' ? 'support_agent' : 'engineering'}</span>
                </div>
                <span className={`text-[10px] uppercase font-bold px-2.5 py-1 rounded-md tracking-wider ${job.status === 'Yeni' ? 'bg-primary/10 text-primary' :
                    job.status === 'Acil' ? 'bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400' :
                      'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                  }`}>
                  {job.status}
                </span>
              </div>

              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1 group-hover:text-primary transition-colors line-clamp-1">{job.title}</h3>
              <p className="text-sm font-semibold text-slate-500 mb-4">{job.company}</p>

              <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-6 flex-grow">
                {job.description}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                  <span className="material-icons-round text-[16px]">location_on</span>
                  {job.location}
                </div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                  <span className="material-icons-round text-[16px]">schedule</span>
                  {job.date}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-16 text-center bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 border-dashed dark:border-slate-700">
            <div className="w-16 h-16 bg-white dark:bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border border-slate-100 dark:border-slate-800">
              <span className="material-icons-round text-3xl text-slate-400">search_off</span>
            </div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">İlan Bulunamadı</h3>
            <p className="text-slate-500 text-sm max-w-md mx-auto">
              Arama kriterlerinize uygun aktif bir iş ilanı maalesef bulunmamaktadır. Lütfen arama teriminizi değiştirin veya daha sonra tekrar kontrol edin.
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Home;
