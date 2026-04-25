import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MessageBox from '../../../components/MessageBox';
import { agencyService, type AssignedJobDetailResponse } from '@/api/services/agencyService';

const AgentAssignedJobDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [messageBoxOpen, setMessageBoxOpen] = useState(false);
  const [isRequestingReport, setIsRequestingReport] = useState(false);
  const [reportRequested, setReportRequested] = useState(false);
  const [job, setJob] = useState<AssignedJobDetailResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCompleting, setIsCompleting] = useState(false);

  useEffect(() => {
    if (!id) return;
    const fetchDetail = async () => {
      try {
        const data = await agencyService.getAssignedJobDetail(id);
        setJob(data);
      } catch (error) {
        console.error('İş detayı çekilirken hata:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  const handleSendMessage = () => {
    setMessageBoxOpen(true);
  };

  const handleRequestReport = async () => {
    if (!id) return;
    setIsRequestingReport(true);
    try {
      await agencyService.requestReport(id);
      setReportRequested(true);
      setTimeout(() => setReportRequested(false), 3000);
    } catch (error) {
      console.error('Rapor istenirken hata:', error);
    } finally {
      setIsRequestingReport(false);
    }
  };

  const handleCompleteJob = async () => {
    if (!id) return;
    const confirmed = window.confirm('Bu işi tamamlandı olarak işaretlemek istediğinize emin misiniz?');
    if (!confirmed) return;

    setIsCompleting(true);
    try {
      await agencyService.updateAssignedJob(id, { status: 'completed' });
      alert('İş başarıyla tamamlandı.');
      navigate('/dashboard/agent/assigned');
    } catch (error) {
      console.error('İş tamamlanırken hata:', error);
      alert('Bir hata oluştu.');
    } finally {
      setIsCompleting(false);
    }
  };

  if (isLoading) {
    return <div className="py-12 text-center text-slate-500">Yükleniyor...</div>;
  }

  if (!job) {
    return <div className="py-12 text-center text-slate-500">İş bulunamadı.</div>;
  }

  return (
    <div className="flex flex-col gap-6 animate-fade-in pb-8">
      {/* Üst Kısım - Geri Dönüş ve Başlık */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-all shadow-sm shrink-0"
          >
            <span className="material-icons-round">arrow_back</span>
          </button>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white">{job.jobTitle}</h2>
              <span className="flex items-center gap-1.5 px-3 py-1 bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400 rounded-full text-xs font-bold border border-blue-200 dark:border-blue-500/30">
                <span className="material-icons-round text-[14px]">autorenew</span>
                {job.status === 'completed' ? 'Tamamlandı' : 'Devam Ediyor'}
              </span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-sm flex items-center gap-4">
              <span className="flex items-center gap-1"><span className="material-icons-round text-[16px]">tag</span>İş ID: #{job.id.substring(0, 8)}</span>
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {/* İşi Tamamla Butonu */}
          {job.status !== 'completed' && (
            <button 
              onClick={handleCompleteJob}
              disabled={isCompleting}
              className={`flex items-center gap-2 px-4 py-2 border rounded-xl font-bold shadow-sm transition-all text-sm bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-700/50 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 transition-colors`}
            >
              <span className="material-icons-round text-[18px]">check_circle</span>
              {isCompleting ? 'Tamamlanıyor...' : 'İşi Tamamla'}
            </button>
          )}

          {/* Rapor İste Butonu */}
          <button 
            onClick={handleRequestReport}
            disabled={isRequestingReport || reportRequested}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold shadow-sm transition-all text-sm ${
              reportRequested 
                ? 'bg-emerald-500 hover:bg-emerald-600 text-white'
                : 'bg-primary hover:bg-primary/90 text-white'
            }`}
          >
            {isRequestingReport ? (
              <span className="material-icons-round text-[18px] animate-spin">autorenew</span>
            ) : reportRequested ? (
              <span className="material-icons-round text-[18px]">done_all</span>
            ) : (
              <span className="material-icons-round text-[18px]">summarize</span>
            )}
            {isRequestingReport ? 'İsteniyor...' : reportRequested ? 'Rapor İstenildi' : 'Rapor İste'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sol Kolon - İş Özeti ve İlerleme */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          {/* İlerleme Durumu Modülü */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50 space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
                <span className="material-icons-round text-primary bg-primary/10 p-1.5 rounded-lg text-[20px]">show_chart</span>
                Genel İlerleme
              </h3>
              <span className="text-2xl font-black text-slate-800 dark:text-white">{job.progress}%</span>
            </div>
            
            <div className="w-full h-4 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-500 rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
                style={{ width: `${job.progress}%` }}
              >
                <div className="absolute inset-0 bg-white/20 animate-[shimmer_2s_infinite]"></div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-100 dark:border-slate-700/50 mt-4">
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-400 mb-1">Gemi Adı</span>
                <span className="text-sm font-semibold text-slate-800 dark:text-white flex items-center gap-1.5"><span className="material-icons-round text-[16px] text-slate-400">directions_boat</span> - </span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-400 mb-1">Başlama Tarihi</span>
                <span className="text-sm font-semibold text-slate-800 dark:text-white flex items-center gap-1.5"><span className="material-icons-round text-[16px] text-slate-400">today</span> {job.startDate || '-'}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-400 mb-1">Hedeflenen Bitiş</span>
                <span className="text-sm font-semibold text-slate-800 dark:text-white flex items-center gap-1.5"><span className="material-icons-round text-[16px] text-primary">event_busy</span> {job.dueDate || '-'}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-400 mb-1">Bütçe</span>
                <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5"><span className="material-icons-round text-[16px]">payments</span> - </span>
              </div>
            </div>
          </div>

          {/* İş Açıklaması */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
              <span className="material-icons-round text-slate-500 bg-slate-100 dark:bg-slate-700 p-1.5 rounded-lg text-[20px]">description</span>
              İş Açıklaması
            </h3>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
              Bu işe ait genel bir açıklama bulunmamaktadır.
            </p>
          </div>

          {/* Aşama Logları */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
              <span className="material-icons-round text-slate-500 bg-slate-100 dark:bg-slate-700 p-1.5 rounded-lg text-[20px]">history</span>
              Süreç Logları
            </h3>
            
            <div className="relative border-l border-slate-200 dark:border-slate-700 ml-3 space-y-6 pb-4">
              {job.logs && job.logs.length > 0 ? (
                job.logs.map((log, index) => (
                  <div key={log.id} className="relative pl-6">
                    <span className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full ${index === 0 ? 'bg-blue-500' : 'bg-slate-300 dark:bg-slate-600'} border-4 border-white dark:border-slate-800`}></span>
                    <p className={`text-xs font-bold ${index === 0 ? 'text-blue-500' : 'text-slate-500'} mb-1`}>
                      {new Date(log.createdAt).toLocaleString('tr-TR')}
                    </p>
                    <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-700/50 p-3 rounded-xl inline-block w-full">
                      <h4 className="text-sm font-bold text-slate-800 dark:text-white">{log.title}</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{log.description || '-'}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="pl-6 text-sm text-slate-500">Henüz süreç logu bulunmuyor.</div>
              )}
            </div>
          </div>

        </div>

        {/* Sağ Kolon - Taşeron & Dosyalar */}
        <div className="flex flex-col gap-6">
          
          {/* Taşeron Bilgi Kartı */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Atanan Taşeron</h3>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-bold text-xl border border-primary/20 shrink-0">
                {job.subcontractorCompanyName.charAt(0)}
              </div>
              <div className="overflow-hidden">
                <h4 className="text-lg font-bold text-slate-800 dark:text-white truncate">{job.subcontractorCompanyName}</h4>
                <div className="flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5">
                  <span className="material-icons-round text-[14px]">verified</span>
                  Onaylı Firma
                </div>
              </div>
            </div>

            <div className="space-y-3 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-700/50">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5"><span className="material-icons-round text-[16px]">star</span> Puanı</span>
                <span className="font-bold text-slate-800 dark:text-white">4.8 / 5.0</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5"><span className="material-icons-round text-[16px]">task_alt</span> Tamamlanan</span>
                <span className="font-bold text-slate-800 dark:text-white">42 İş</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5"><span className="material-icons-round text-[16px]">call</span> Telefon</span>
                <span className="font-bold text-slate-800 dark:text-white">+90 532 123 4567</span>
              </div>
            </div>
            
            <button className="w-full mt-4 py-2.5 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-50 dark:hover:bg-slate-600 transition-all text-sm flex items-center justify-center gap-2">
              <span className="material-icons-round text-[18px]">person</span>
              Profili İncele
            </button>
          </div>

          {/* Dosyalar ve Raporlar */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">İlgili Dosyalar</h3>
              <button className="text-primary hover:bg-primary/10 p-1 rounded transition-colors">
                <span className="material-icons-round text-[20px]">add</span>
              </button>
            </div>

            <div className="space-y-3">
              {job.reports && job.reports.length > 0 ? (
                job.reports.map((report) => (
                  <a key={report.id} href={report.fileUrl} target="_blank" rel="noreferrer" className="flex items-start gap-3 p-3 rounded-xl border border-slate-100 dark:border-slate-700/50 hover:border-primary/50 hover:bg-primary/5 transition-all group">
                    <div className="p-2 bg-blue-50 dark:bg-blue-900/20 text-blue-500 rounded-lg group-hover:bg-blue-100 transition-colors">
                      <span className="material-icons-round text-[20px]">description</span>
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <h4 className="text-sm font-bold text-slate-800 dark:text-white truncate">{report.fileName}</h4>
                      <p className="text-xs text-slate-500">{new Date(report.createdAt).toLocaleDateString('tr-TR')}</p>
                    </div>
                    <span className="material-icons-round text-slate-400 group-hover:text-primary transition-colors">download</span>
                  </a>
                ))
              ) : (
                <div className="text-sm text-slate-500">Henüz rapor dosyası bulunmuyor.</div>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Mesajlaşma Kutusu */}
      <MessageBox 
        isOpen={messageBoxOpen} 
        onClose={() => setMessageBoxOpen(false)}
        recipientName={job.subcontractorCompanyName}
        recipientRole="Taşeron"
        jobTitle={job.jobTitle}
      />
    </div>
  );
};

export default AgentAssignedJobDetail;
