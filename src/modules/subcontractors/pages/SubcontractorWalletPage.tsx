import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SubcontractorWalletPage: React.FC = () => {
  const navigate = useNavigate();

  const [isStatementModalOpen, setIsStatementModalOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);

  const openStatementModal = () => {
    setIsHistoryModalOpen(false);
    setIsStatementModalOpen(true);
  };

  const openHistoryModal = () => {
    setIsStatementModalOpen(false);
    setIsHistoryModalOpen(true);
  };

  const closeModals = () => {
    setIsStatementModalOpen(false);
    setIsHistoryModalOpen(false);
  };

const transactions = [
  {
    id: 1,
    title: 'Makine Dairesi Bakım İşi',
    company: 'Kuzey Denizcilik',
    amount: '+₺82.500',
    date: '14 Mart 2026',
    status: 'Ödeme Alındı',
    statusStyle: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300',
  },
  {
    id: 2,
    title: 'Güverte Kumlama ve Boya',
    company: 'Marmara Lojistik',
    amount: '+₺128.000',
    date: '11 Mart 2026',
    status: 'Beklemede',
    statusStyle: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
  },
  {
    id: 3,
    title: 'Elektrik Tesisat Kontrolü',
    company: 'Delta Marine',
    amount: '+₺69.500',
    date: '07 Mart 2026',
    status: 'İşlemde',
    statusStyle: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
  },
];

  return (
    <>
      <div className="mb-8 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <button
              onClick={() => navigate('/dashboard/subcontractor')}
              className="inline-flex items-center gap-1 text-sm font-semibold text-slate-500 hover:text-primary transition-colors">
              <span className="material-icons-round text-[18px]">arrow_back</span>
              Geri Dön
            </button>
          </div>

          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
            Cüzdan ve Kazanç
          </h2>
          <p className="text-slate-500 dark:text-slate-400">
            Toplam kazançlarınızı, bekleyen ödemeleri ve son işlemlerinizi buradan takip edebilirsiniz.
          </p>
        </div>

        <button
          onClick={openStatementModal}
          className="bg-primary hover:bg-primary/90 text-white font-bold py-2.5 px-6 rounded-xl transition-all shadow-md shadow-primary/20 flex items-center justify-center gap-2">
          <span className="material-icons-round text-sm">download</span>
          Ekstre İndir
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-8 rounded-[2rem] shadow-xl shadow-blue-500/20 text-white relative overflow-hidden group">
          <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[150%] bg-white/10 blur-[60px] rotate-12 group-hover:rotate-45 transition-transform duration-700" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md">
                <span className="material-icons-round text-white">account_balance_wallet</span>
              </div>
              <span className="text-xs font-bold bg-white/20 px-3 py-1 rounded-full backdrop-blur-md">Aktif Bakiye</span>
            </div>
            <h3 className="text-blue-100 text-sm font-bold uppercase tracking-widest mb-1">Kullanılabilir Tutar</h3>
            <p className="text-4xl font-black italic tracking-tight">₺280.000</p>
            <div className="mt-8 flex items-center gap-2 text-xs font-bold text-blue-100/80">
              <span className="material-icons-round text-sm">verified</span>
              Otomatik Faturalandırma Aktif
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-8 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-700/50 relative overflow-hidden group">
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div className="p-3 bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 rounded-2xl">
                <span className="material-icons-round">hourglass_empty</span>
              </div>
              <span className="text-xs font-bold bg-amber-100 text-amber-700 px-3 py-1 rounded-full">Havuzda</span>
            </div>
            <h3 className="text-slate-500 dark:text-slate-400 text-sm font-bold uppercase tracking-widest mb-1">Havuzdaki Bekleyen Tutar</h3>
            <p className="text-4xl font-black text-slate-800 dark:text-white tracking-tight">₺128.000</p>
            <p className="mt-8 text-xs font-medium text-slate-400 leading-relaxed">
              Bu tutar Portlink havuzunda güvence altındadır. İş onaylandığında otomatik olarak bakiyenize aktarılacaktır.
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-8 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-700/50 relative">
          <div className="flex items-center justify-between mb-6">
            <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-2xl">
              <span className="material-icons-round">insights</span>
            </div>
          </div>
          <h3 className="text-slate-500 dark:text-slate-400 text-sm font-bold uppercase tracking-widest mb-1">Toplam Ciro</h3>
          <p className="text-4xl font-black text-slate-800 dark:text-white tracking-tight">₺542.000</p>
          <div className="mt-8 flex items-center gap-2">
            <span className="flex items-center text-emerald-500 font-bold text-sm">
              <span className="material-icons-round text-sm">trending_up</span> %12
            </span>
            <span className="text-xs text-slate-400 font-medium">geçen aya göre artış</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
        <div className="xl:col-span-2 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/50 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between gap-3 mb-5">
            <div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-white">Son İşlemler</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Son ödeme hareketleriniz aşağıda listelenmektedir.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {transactions.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border border-slate-200 dark:border-slate-700 p-4 hover:border-primary/40 transition-all"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white mb-1">{item.title}</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{item.company}</p>
                    <p className="text-xs text-slate-400 mt-2">{item.date}</p>
                  </div>

                  <div className="flex flex-col items-start md:items-end gap-2">
                    <p className="text-lg font-extrabold text-slate-800 dark:text-white">{item.amount}</p>
                    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-md ${item.statusStyle}`}>
                      {item.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700/50 rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">Ödeme Özeti</h3>

          <div className="space-y-4">
            <div className="rounded-xl bg-slate-50 dark:bg-slate-900/40 px-4 py-4 border border-slate-100 dark:border-slate-700/60">
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Tamamlanan İşler</p>
              <p className="text-xl font-bold text-slate-800 dark:text-white">8</p>
            </div>

            <div className="rounded-xl bg-slate-50 dark:bg-slate-900/40 px-4 py-4 border border-slate-100 dark:border-slate-700/60">
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Bekleyen Tahsilat</p>
              <p className="text-xl font-bold text-slate-800 dark:text-white">3</p>
            </div>

            <div className="rounded-xl bg-slate-50 dark:bg-slate-900/40 px-4 py-4 border border-slate-100 dark:border-slate-700/60">
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Ortalama Tahsil Süresi</p>
              <p className="text-xl font-bold text-slate-800 dark:text-white">12 Gün</p>
            </div>
          </div>

          <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-700">
            <button
              onClick={openHistoryModal}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-primary text-white font-bold shadow-md shadow-primary/20 hover:bg-primary/90 transition-all">
              <span className="material-icons-round text-[18px]">account_balance</span>
              Ödeme Geçmişi
            </button>
          </div>
        </div>
      </div>
      {isStatementModalOpen && (
  <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 backdrop-blur-[2px] px-4">
    <div className="w-full max-w-xl bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-700 overflow-hidden">
      <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 dark:border-slate-700">
        <div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-white">
            Ekstre İndir
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            İndirmek istediğiniz ekstre ayarlarını seçin
          </p>
        </div>

        <button
          onClick={closeModals}
          className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all"
        >
          <span className="material-icons-round">close</span>
        </button>
      </div>

      <div className="p-6 space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
              Başlangıç Tarihi
            </label>
            <input
              type="date"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
              Bitiş Tarihi
            </label>
            <input
              type="date"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
            Dosya Formatı
          </label>
          <select className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all">
            <option>PDF</option>
            <option>Excel</option>
            <option>CSV</option>
          </select>
        </div>

        <div className="rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-700/60 p-4">
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Seçtiğiniz tarih aralığındaki ödeme hareketleri indirilebilir ekstre olarak hazırlanacaktır.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-end gap-3 pt-2">
          <button
            onClick={closeModals}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-semibold hover:border-primary/40 hover:text-primary transition-all"
          >
            Vazgeç
          </button>

          <button
            onClick={closeModals}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-primary text-white font-bold shadow-md shadow-primary/20 hover:bg-primary/90 transition-all"
          >
            <span className="material-icons-round text-[18px]">download</span>
            İndirmeyi Başlat
          </button>
        </div>
      </div>
    </div>
  </div>
      )}
      {isHistoryModalOpen && (
  <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 backdrop-blur-[2px] px-4">
    <div className="w-full max-w-3xl bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-700 overflow-hidden">
      <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 dark:border-slate-700">
        <div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-white">
            Ödeme Geçmişi
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Son ödeme hareketlerinizi detaylı olarak görüntüleyin
          </p>
        </div>

        <button
          onClick={closeModals}
          className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all"
        >
          <span className="material-icons-round">close</span>
        </button>
      </div>

      <div className="p-6">
        <div className="space-y-4">
          {transactions.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-slate-200 dark:border-slate-700 p-4 hover:border-primary/40 transition-all"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white mb-1">{item.title}</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{item.company}</p>
                  <p className="text-xs text-slate-400 mt-2">{item.date}</p>
                </div>

                <div className="flex flex-col items-start md:items-end gap-2">
                  <p className="text-lg font-extrabold text-slate-800 dark:text-white">{item.amount}</p>
                  <span className={`text-[11px] font-bold px-2.5 py-1 rounded-md ${item.statusStyle}`}>
                    {item.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end pt-6">
          <button
            onClick={closeModals}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-primary text-white font-bold shadow-md shadow-primary/20 hover:bg-primary/90 transition-all"
          >
            Kapat
          </button>
        </div>
      </div>
    </div>
  </div>
      )}
      
    </>
  );
};

export default SubcontractorWalletPage;