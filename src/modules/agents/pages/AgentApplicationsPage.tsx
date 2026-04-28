import React, { useState, useEffect } from 'react';
import { agencyService } from '../../../services/agencyService';
import { Application } from '../../../types/agency.types';
import ApplicationCard from '../../../components/ui/ApplicationCard';

const AgentApplicationsPage: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'accepted' | 'rejected'>('all');

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    setLoading(true);
    const data = await agencyService.getAllApplications();
    setApplications(data);
    setLoading(false);
  };

  const handleAccept = async (id: string) => {
    const success = await agencyService.acceptApplication(id);
    if (success) {
      setApplications(prev => prev.map(app => 
        app.id === id ? { ...app, status: 'accepted' } : 
        app.jobId === applications.find(a => a.id === id)?.jobId ? { ...app, status: 'rejected' } : app
      ));
      alert('Başvuru kabul edildi. Diğer başvurular otomatik olarak reddedildi.');
    } else {
      alert('Bir hata oluştu.');
    }
  };

  const handleReject = async (id: string) => {
    const success = await agencyService.rejectApplication(id);
    if (success) {
      setApplications(prev => prev.map(app => app.id === id ? { ...app, status: 'rejected' } : app));
    } else {
      alert('Bir hata oluştu.');
    }
  };

  const filteredApplications = applications.filter(app => filter === 'all' || app.status === filter);

  return (
    <div className="w-full space-y-8 animate-in fade-in duration-700 px-4">
      {/* BAŞLIK */}
      <div className="space-y-1 py-2 flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight">Gelen Başvurular</h2>
          <p className="text-slate-500 text-sm font-medium">İlanlarınıza yapılan tüm teklifleri ve başvuruları buradan yönetebilirsiniz.</p>
        </div>
        <div className="flex bg-slate-100 p-1 rounded-xl">
          {['all', 'pending', 'accepted', 'rejected'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={`px-4 py-2 rounded-lg text-xs font-bold capitalize transition-all ${
                filter === f ? 'bg-white shadow-sm text-primary' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {f === 'all' ? 'Tümü' : f === 'pending' ? 'Bekleyenler' : f === 'accepted' ? 'Kabul Edilenler' : 'Reddedilenler'}
            </button>
          ))}
        </div>
      </div>

      {/* KARTLAR */}
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-10">
          {filteredApplications.map(app => (
            <ApplicationCard 
              key={app.id}
              application={app}
              onAccept={handleAccept}
              onReject={handleReject}
            />
          ))}
          {filteredApplications.length === 0 && (
            <div className="col-span-full py-20 text-center text-slate-500 bg-white rounded-3xl border border-slate-100 shadow-sm">
              <span className="material-icons-round text-4xl mb-2 text-slate-300">inbox</span>
              <p>Bu kategoriye ait başvuru bulunamadı.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AgentApplicationsPage;
