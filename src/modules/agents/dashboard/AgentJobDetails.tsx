import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { agencyService, type JobListingDetailResponse, type OfferResponse } from '@/api/services/agencyService';

type Job = JobListingDetailResponse;

const AgentJobDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [job, setJob] = useState<Job | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [offers, setOffers] = useState<OfferResponse[]>([]);

  useEffect(() => {
    if (!id) return;

    const fetchDetail = async () => {
      setIsLoading(true);
      try {
        const data = await agencyService.getJobDetail(id);
        setJob(data);

        const offersData = await agencyService.getJobOffers(id);
        setOffers(offersData);
      } catch (error) {
        console.error('İlan detayı çekilirken hata:', error);
        setJob(null);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  const handleDeleteJob = async () => {
    if (!job) return;

    const confirmed = window.confirm('Bu ilanı kaldırmak istediğinize emin misiniz?');

    try {
      await agencyService.deleteJob(job.id);
      alert('İlan kaldırıldı.');
      navigate('/dashboard/agent/jobs');
    } catch (error) {
      console.error('İlan silinirken hata:', error);
      alert('İlan silinirken bir hata oluştu.');
    }
  };

  const handleAcceptOffer = async (offerId: string) => {
    if (!window.confirm('Bu teklifi onaylamak istediğinize emin misiniz?')) return;
    try {
      await agencyService.acceptOffer(offerId);
      alert('Teklif başarıyla onaylandı ve iş taşerona atandı.');
      navigate('/dashboard/agent/assigned');
    } catch (error) {
      console.error('Teklif onaylanırken hata:', error);
      alert('Teklif onaylanırken hata oluştu.');
    }
  };

  const handleRejectOffer = async (offerId: string) => {
    if (!window.confirm('Bu teklifi reddetmek istediğinize emin misiniz?')) return;
    try {
      await agencyService.rejectOffer(offerId);
      alert('Teklif reddedildi.');
      setOffers(offers.filter(o => o.id !== offerId));
    } catch (error) {
      console.error('Teklif reddedilirken hata:', error);
      alert('Teklif reddedilirken hata oluştu.');
    }
  };

  const handleEditJob = () => {
    if (!job) return;
    navigate(`/dashboard/agent/quick-post/${job.id}`);
  };

  const getStatusBadge = (status: string) => {
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

  if (isLoading) {
    return <div className="py-12 text-center text-slate-500">Yükleniyor...</div>;
  }

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
                    {job.eta ? new Date(job.eta).toLocaleString('tr-TR') : '-'}
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
                    {new Date(job.createdAt).toLocaleDateString('tr-TR')}
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

              {job.files && job.files.length > 0 && (
                <div className="flex flex-wrap gap-3">
                  {job.files.map((file, index) => (
                    <div
                      key={file.id || index}
                      className="flex items-center gap-2 px-3 py-2 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-600 dark:text-slate-300"
                    >
                      <span className="material-icons-round text-blue-500">attach_file</span>
                      <span className="font-medium">{file.fileName}</span>
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
              {offers.length > 0 ? (
                <div className="space-y-4">
                  {offers.map(offer => (
                    <div key={offer.id} className="rounded-xl border border-slate-200 bg-slate-50 p-4 flex flex-col gap-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm font-bold text-slate-700">{offer.subcontractorCompanyName}</p>
                          <p className="text-xs text-slate-500">{offer.price} {offer.currency} • {offer.estimatedDays ? `${offer.estimatedDays} Gün` : 'Süre belirtilmedi'}</p>
                          {offer.coverLetter && (
                            <p className="text-xs text-slate-600 mt-2 bg-white p-2 rounded border border-slate-100">{offer.coverLetter}</p>
                          )}
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${offer.status === 'pending' ? 'bg-amber-100 text-amber-700' : offer.status === 'accepted' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                          {offer.status === 'pending' ? 'Bekliyor' : offer.status === 'accepted' ? 'Kabul Edildi' : 'Reddedildi'}
                        </span>
                      </div>

                      {offer.status === 'pending' && (
                        <div className="flex justify-end gap-2 mt-2 pt-3 border-t border-slate-200">
                          <button
                            onClick={() => handleRejectOffer(offer.id)}
                            className="text-xs bg-white border border-slate-200 px-3 py-1.5 rounded-lg text-rose-600 font-semibold hover:bg-rose-50 transition-colors"
                          >
                            Reddet
                          </button>
                          <button
                            onClick={() => handleAcceptOffer(offer.id)}
                            className="text-xs bg-primary text-white px-3 py-1.5 rounded-lg font-semibold hover:bg-primary/90 transition-colors shadow-sm"
                          >
                            Kabul Et
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
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
                  {job.files ? job.files.length : 0} dosya
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