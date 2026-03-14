import React from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '@/features/dashboard/components/DashboardLayout';

const SubcontractorDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <DashboardLayout role="subcontractor">
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Taşeron Özeti</h2>
          <p className="text-slate-500 dark:text-slate-400">Piyasadaki aktif işler, teklif performansınız ve kazançlarınız.</p>
        </div>
        <button
          onClick={() => navigate('/dashboard/subcontractor/jobs')}
          className="bg-primary hover:bg-primary/90 text-white font-bold py-2.5 px-6 rounded-xl transition-all shadow-md shadow-primary/20 flex items-center gap-2"
        >
          <span className="material-icons-round text-sm">search</span>
          Yeni İş Ara
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50 flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-xl">
              <span className="material-icons-round">send</span>
            </div>
          </div>
          <h3 className="text-slate-500 dark:text-slate-400 text-sm font-semibold mb-1">Verilen Teklifler</h3>
          <p className="text-3xl font-extrabold text-slate-800 dark:text-white">45</p>
          <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">
            <span className="text-emerald-500 font-bold">%30</span> Kabul Oranı
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50 flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-xl">
              <span className="material-icons-round">verified</span>
            </div>
            <span className="flex items-center gap-1 text-sm font-bold text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-1 rounded-md">
              <span className="material-icons-round text-[14px]">arrow_upward</span>
              Aktif 3 İş
            </span>
          </div>
          <h3 className="text-slate-500 dark:text-slate-400 text-sm font-semibold mb-1">Kazanılan İşler</h3>
          <p className="text-3xl font-extrabold text-slate-800 dark:text-white">14</p>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50 flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-xl">
              <span className="material-icons-round">payments</span>
            </div>
          </div>
          <h3 className="text-slate-500 dark:text-slate-400 text-sm font-semibold mb-1">Tahmini Hakediş</h3>
          <p className="text-3xl font-extrabold text-slate-800 dark:text-white">₺142.500</p>
        </div>
      </div>

      {/* Recommended Jobs */}
      <div className="mb-8">
        <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">Sizin İçin Önerilen İlanlar</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 hover:border-primary/50 transition-colors cursor-pointer group">
            <div className="flex justify-between items-start mb-3">
              <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">Ana Makine Bakımı (Tuzla)</h4>
              <span className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 text-[10px] font-bold px-2 py-1 rounded-md">
                Yeni İlan
              </span>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-4">
              Tuzla tersanesinde bulunan kuru yük gemimiz için 5 gün sürecek ana makine periyodik bakımı yapacak yetkili taşeron aranmaktadır.
            </p>
            <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-700 pt-4">
              <div className="flex items-center gap-1 text-sm font-medium text-slate-600 dark:text-slate-300">
                <span className="material-icons-round text-[16px] text-primary">apartment</span>
                Kuzey Denizcilik
              </div>
              <button className="text-sm font-bold text-primary hover:text-primary/80">Teklif Ver</button>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 hover:border-primary/50 transition-colors cursor-pointer group">
            <div className="flex justify-between items-start mb-3">
              <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">Güverte Boya İşi (Ambarlı)</h4>
              <span className="bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300 text-[10px] font-bold px-2 py-1 rounded-md">
                2 Gün Önce
              </span>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-4">
              Genel kargo gemisi dış ve iç güverte kumlama ve boyama işlemleri. Sadece alanında uzman ve sertifikalı ekiplerin teklif vermesi rica olunur.
            </p>
            <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-700 pt-4">
              <div className="flex items-center gap-1 text-sm font-medium text-slate-600 dark:text-slate-300">
                <span className="material-icons-round text-[16px] text-primary">apartment</span>
                Marmara Lojistik
              </div>
              <button className="text-sm font-bold text-primary hover:text-primary/80">Teklif Ver</button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SubcontractorDashboardPage;

