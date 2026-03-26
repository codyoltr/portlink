import React from 'react';
// DashboardLayout importunu siliyoruz çünkü artık App.tsx'te sarmaladık.

const AgentDashboardPage: React.FC = () => {
  return (
    // DashboardLayout etiketini buradan KALDIRDIK. 
    // Sadece asıl içerik kalıyor.
    <>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Acente Özeti</h2>
        <p className="text-slate-500 dark:text-slate-400">Son 30 günlük işlem hacminiz ve aktif süreçleriniz.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Stat Cards */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50 flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-xl">
              <span className="material-icons-round">work_history</span>
            </div>
            <span className="flex items-center gap-1 text-sm font-bold text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-1 rounded-md">
              <span className="material-icons-round text-[14px]">trending_up</span>
              12%
            </span>
          </div>
          <h3 className="text-slate-500 dark:text-slate-400 text-sm font-semibold mb-1">Aylık Açılan İlanlar</h3>
          <p className="text-3xl font-extrabold text-slate-800 dark:text-white">24</p>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50 flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-xl">
              <span className="material-icons-round">task_alt</span>
            </div>
          </div>
          <h3 className="text-slate-500 dark:text-slate-400 text-sm font-semibold mb-1">Tamamlanan İşler</h3>
          <p className="text-3xl font-extrabold text-slate-800 dark:text-white">18</p>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50 flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 rounded-xl">
              <span className="material-icons-round">pending_actions</span>
            </div>
            <span className="flex items-center gap-1 text-sm font-bold text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-1 rounded-md">
              <span className="material-icons-round text-[14px]">warning</span>
              5 Yeni
            </span>
          </div>
          <h3 className="text-slate-500 dark:text-slate-400 text-sm font-semibold mb-1">Bekleyen Teklifler</h3>
          <p className="text-3xl font-extrabold text-slate-800 dark:text-white">12</p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50 overflow-hidden">
        <div className="p-6 border-b border-slate-100 dark:border-slate-700/50 flex justify-between items-center">
          <h3 className="text-lg font-bold text-slate-800 dark:text-white">Son Gelen Teklifler</h3>
          <button className="text-sm font-semibold text-primary hover:text-primary/80">Tümünü Gör</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-500 dark:text-slate-400">
            <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-600 dark:text-slate-300 font-semibold border-b border-slate-100 dark:border-slate-700/50">
              <tr>
                <th className="px-6 py-4">Taşeron Firma</th>
                <th className="px-6 py-4">İlgili İlan</th>
                <th className="px-6 py-4">Teklif Edilen Ücret</th>
                <th className="px-6 py-4">Süre</th>
                <th className="px-6 py-4">Durum</th>
                <th className="px-6 py-4 text-right">İşlem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/20 transition-colors">
                <td className="px-6 py-4 font-medium text-slate-900 dark:text-white flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">PT</div>
                  Port Teknik A.Ş.
                </td>
                <td className="px-6 py-4">Güverte Bakım Onarımı</td>
                <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white">₺45,000</td>
                <td className="px-6 py-4">3 Gün</td>
                <td className="px-6 py-4">
                  <span className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 text-xs font-bold px-2.5 py-1 rounded-md">Bekliyor</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-primary hover:text-primary/80 font-semibold transition-colors">İncele</button>
                </td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/20 transition-colors">
                <td className="px-6 py-4 font-medium text-slate-900 dark:text-white flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">MD</div>
                  Marine Destek Ltd.
                </td>
                <td className="px-6 py-4">Gümrük Müşavirliği</td>
                <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white">₺12,500</td>
                <td className="px-6 py-4">1 Gün</td>
                <td className="px-6 py-4">
                  <span className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 text-xs font-bold px-2.5 py-1 rounded-md">Kabul Edildi</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 font-semibold transition-colors">Detay</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </> // DashboardLayout etiketini buradan KALDIRDIK.
  );
};

export default AgentDashboardPage;