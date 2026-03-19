import React from 'react';


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

const SubcontractorWalletPage: React.FC = () => {
  return (
    <>
      <div className="mb-8 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
            Cüzdan ve Kazanç
          </h2>
          <p className="text-slate-500 dark:text-slate-400">
            Toplam kazançlarınızı, bekleyen ödemeleri ve son işlemlerinizi buradan takip edebilirsiniz.
          </p>
        </div>

        <button className="bg-primary hover:bg-primary/90 text-white font-bold py-2.5 px-6 rounded-xl transition-all shadow-md shadow-primary/20 flex items-center justify-center gap-2">
          <span className="material-icons-round text-sm">download</span>
          Ekstre İndir
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50">
          <div className="p-3 w-fit bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-xl mb-4">
            <span className="material-icons-round">wallet</span>
          </div>
          <h3 className="text-slate-500 dark:text-slate-400 text-sm font-semibold mb-1">
            Mevcut Bakiye
          </h3>
          <p className="text-3xl font-extrabold text-slate-800 dark:text-white">₺280.000</p>
          <p className="mt-3 text-sm text-emerald-500 font-semibold">Güncel kullanılabilir bakiye</p>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50">
          <div className="p-3 w-fit bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-xl mb-4">
            <span className="material-icons-round">payments</span>
          </div>
          <h3 className="text-slate-500 dark:text-slate-400 text-sm font-semibold mb-1">
            Toplam Kazanç
          </h3>
          <p className="text-3xl font-extrabold text-slate-800 dark:text-white">₺542.000</p>
          <p className="mt-3 text-sm text-blue-500 font-semibold">Tüm zamanlar toplamı</p>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50">
          <div className="p-3 w-fit bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 rounded-xl mb-4">
            <span className="material-icons-round">hourglass_top</span>
          </div>
          <h3 className="text-slate-500 dark:text-slate-400 text-sm font-semibold mb-1">
            Bekleyen Ödeme
          </h3>
          <p className="text-3xl font-extrabold text-slate-800 dark:text-white">₺128.000</p>
          <p className="mt-3 text-sm text-amber-500 font-semibold">Onay sürecindeki ödemeler</p>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50">
          <div className="p-3 w-fit bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-xl mb-4">
            <span className="material-icons-round">trending_up</span>
          </div>
          <h3 className="text-slate-500 dark:text-slate-400 text-sm font-semibold mb-1">
            Bu Ay Kazanç
          </h3>
          <p className="text-3xl font-extrabold text-slate-800 dark:text-white">₺154.000</p>
          <p className="mt-3 text-sm text-indigo-500 font-semibold">Geçen aya göre +%18</p>
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
            <button className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-primary text-white font-bold shadow-md shadow-primary/20 hover:bg-primary/90 transition-all">
              <span className="material-icons-round text-[18px]">account_balance</span>
              Ödeme Geçmişi
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SubcontractorWalletPage;