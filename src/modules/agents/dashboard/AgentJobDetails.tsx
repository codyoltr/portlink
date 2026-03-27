import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

interface Job {
  id: string;
  title: string;
  shipName: string;
  location: string;
  date: string;
  status: 'active' | 'reviewing' | 'completed';
  offerCount: number;
  category: string;
  listingType?: 'subcontractor' | 'agency-partnership';
  selectedServices?: string[];
  eta?: string;
  needText?: string;
  fileNames?: string[];
}

const AgentJobDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [job, setJob] = useState<Job | null>(null);

  useEffect(() => {
    const savedJobs = localStorage.getItem('jobs');

    if (!savedJobs) {
      setJob(null);
      return;
    }

    const jobs: Job[] = JSON.parse(savedJobs);
    const foundJob = jobs.find((item) => item.id === id);

    if (foundJob) {
      setJob(foundJob);
    } else {
      setJob(null);
    }
  }, [id]);

  const handleDeleteJob = () => {
    if (!job) return;

    const confirmed = window.confirm('Bu ilanı kaldırmak istediğinize emin misiniz?');

    if (!confirmed) return;

    const savedJobs = localStorage.getItem('jobs');
    const jobs: Job[] = savedJobs ? JSON.parse(savedJobs) : [];

    const updatedJobs = jobs.filter((item) => item.id !== job.id);

    localStorage.setItem('jobs', JSON.stringify(updatedJobs));
    alert('İlan kaldırıldı.');
    navigate('/dashboard/agent/jobs');
  };

  const handleEditJob = () => {
    if (!job) return;
    navigate(`/dashboard/agent/quick-post/${job.id}`);
  };

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

  if (!job) {
    return (
      <div className="flex flex-col gap-6 animate-fade-in">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/dashboard/agent/jobs')}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-primary/10 hover:text-primary transition-colors"
          >
            <span className="material-icons-round">arrow_back</span>
          </button>
          <div>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
              İlan Bulunamadı
            </h2>
            <p className="text-slate-500 dark:text-slate-400">
              Bu ilana ait kayıt bulunamadı.
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50 p-10 text-center">
          <div className="w-20 h-20 mx-auto rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-400 mb-4">
            <span className="material-icons-round text-4xl">error_outline</span>
          </div>
          <p className="text-slate-600 dark:text-slate-400">
            İlan silinmiş olabilir ya da henüz kayıtlı değildir.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/dashboard/agent/jobs')}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-primary/10 hover:text-primary transition-colors"
          >
            <span className="material-icons-round">arrow_back</span>
          </button>
          <div>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
              {job.title}
            </h2>
            <p className="text-slate-500 dark:text-slate-400">
              İlanınızla ilgili tüm detaylar ve gelen teklifleri inceleyin.
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleDeleteJob}
            className="flex items-center gap-2 bg-rose-50 text-rose-600 hover:bg-rose-100 dark:bg-rose-500/10 dark:text-rose-400 dark:hover:bg-rose-500/20 px-5 py-2.5 rounded-xl font-bold transition-all whitespace-nowrap"
          >
            <span className="material-icons-round text-[20px]">delete_outline</span>
            İlanı Kaldır
          </button>

          <button
            onClick={handleEditJob}
            className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-sm hover:shadow-md whitespace-nowrap"
          >
            <span className="material-icons-round text-[20px]">edit</span>
            Düzenle
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50 overflow-hidden">
            <div className="p-6 border-b border-slate-100 dark:border-slate-700/50 flex justify-between items-center">
              <h3 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
                <span className="material-icons-round text-primary">info</span>
                Genel Bilgiler
              </h3>
              {getStatusBadge(job.status)}
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-5">
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                    İş Başlığı
                  </h4>
                  <p className="text-slate-800 dark:text-white font-semibold">
                    {job.title}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Gemi Adı
                  </h4>
                  <p className="text-slate-800 dark:text-white font-semibold flex items-center gap-2">
                    <span className="material-icons-round text-slate-400 text-[18px]">
                      directions_boat
                    </span>
                    {job.shipName || '-'}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                    ETA
                  </h4>
                  <p className="text-slate-800 dark:text-white font-semibold flex items-center gap-2">
                    <span className="material-icons-round text-slate-400 text-[18px]">
                      schedule
                    </span>
                    {job.eta || '-'}
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Konum
                  </h4>
                  <p className="text-slate-800 dark:text-white font-semibold flex items-center gap-2">
                    <span className="material-icons-round text-slate-400 text-[18px]">
                      location_on
                    </span>
                    {job.location || '-'}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Yayın Tarihi
                  </h4>
                  <p className="text-slate-800 dark:text-white font-semibold flex items-center gap-2">
                    <span className="material-icons-round text-slate-400 text-[18px]">
                      calendar_today
                    </span>
                    {job.date || '-'}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                    İlan Tipi
                  </h4>
                  <p className="text-slate-800 dark:text-white font-semibold flex items-center gap-2">
                    <span className="material-icons-round text-slate-400 text-[18px]">
                      work
                    </span>
                    {job.listingType === 'agency-partnership'
                      ? 'İş ortaklığı için acente arıyorum'
                      : 'Taşeron arıyorum'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50 overflow-hidden">
            <div className="p-6 border-b border-slate-100 dark:border-slate-700/50">
              <h3 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
                <span className="material-icons-round text-primary">category</span>
                Kategori ve Hizmetler
              </h3>
            </div>

            <div className="p-6">
              <div className="mb-5">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Kategori
                </h4>
                <p className="text-slate-800 dark:text-white font-semibold">
                  {job.category || '-'}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                  Seçilen Hizmetler
                </h4>

                {job.selectedServices && job.selectedServices.length > 0 ? (
                  <div className="flex flex-wrap gap-3">
                    {job.selectedServices.map((service, index) => (
                      <div
                        key={`${service}-${index}`}
                        className="px-3 py-2 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-700 dark:text-slate-300 font-medium"
                      >
                        {service}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-slate-500 dark:text-slate-400 text-sm">
                    Hizmet seçimi bulunmuyor.
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50 overflow-hidden">
            <div className="p-6 border-b border-slate-100 dark:border-slate-700/50">
              <h3 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
                <span className="material-icons-round text-primary">description</span>
                İhtiyaç Açıklaması
              </h3>
            </div>

            <div className="p-6">
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6 whitespace-pre-line">
                {job.needText || 'İhtiyaç açıklaması girilmemiş.'}
              </p>

              {job.fileNames && job.fileNames.length > 0 && (
                <div className="flex flex-wrap gap-3">
                  {job.fileNames.map((fileName, index) => (
                    <div
                      key={`${fileName}-${index}`}
                      className="flex items-center gap-2 px-3 py-2 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-600 dark:text-slate-300"
                    >
                      <span className="material-icons-round text-blue-500">attach_file</span>
                      <span className="font-medium">{fileName}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50 overflow-hidden">
            <div className="p-6 border-b border-slate-100 dark:border-slate-700/50 flex justify-between items-center">
              <h3 className="text-lg font-bold text-slate-800 dark:text-white">
                Gelen Teklifler
              </h3>
              <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-1 rounded-md">
                {job.offerCount} Teklif
              </span>
            </div>

            <div className="p-6">
              {job.offerCount > 0 ? (
                <div className="space-y-4">
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
                    Bu ilan için {job.offerCount} teklif bulunuyor.
                  </div>
                </div>
              ) : (
                <div className="text-center py-10">
                  <div className="w-16 h-16 mx-auto rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-400 mb-4">
                    <span className="material-icons-round text-3xl">mail_outline</span>
                  </div>
                  <h4 className="text-base font-bold text-slate-800 dark:text-white mb-2">
                    Henüz teklif yok
                  </h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Yayındaki ilanınıza teklif geldikçe burada görünecek.
                  </p>
                </div>
              )}
            </div>

            <div className="p-4 text-center bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-700/50">
              <button className="text-sm font-bold text-primary hover:text-primary/80 transition-colors">
                Tüm Teklifleri Görüntüle
              </button>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50 overflow-hidden">
            <div className="p-6 border-b border-slate-100 dark:border-slate-700/50">
              <h3 className="text-lg font-bold text-slate-800 dark:text-white">
                Hızlı Özet
              </h3>
            </div>

            <div className="p-6 space-y-4">
              <div className="rounded-xl bg-slate-50 dark:bg-slate-900/50 p-4">
                <p className="text-xs text-slate-400 uppercase font-bold">Durum</p>
                <div className="mt-2">{getStatusBadge(job.status)}</div>
              </div>

              <div className="rounded-xl bg-slate-50 dark:bg-slate-900/50 p-4">
                <p className="text-xs text-slate-400 uppercase font-bold">Kategori</p>
                <p className="mt-2 text-sm font-semibold text-slate-800 dark:text-white">
                  {job.category || '-'}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 dark:bg-slate-900/50 p-4">
                <p className="text-xs text-slate-400 uppercase font-bold">Dosya Sayısı</p>
                <p className="mt-2 text-sm font-semibold text-slate-800 dark:text-white">
                  {job.fileNames ? job.fileNames.length : 0} dosya
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 dark:bg-slate-900/50 p-4">
                <p className="text-xs text-slate-400 uppercase font-bold">Teklif Sayısı</p>
                <p className="mt-2 text-sm font-semibold text-slate-800 dark:text-white">
                  {job.offerCount}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentJobDetails;