function ProgressRow({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-2">
        <span className="font-medium text-slate-700 dark:text-slate-200">{label}</span>
        <span className="font-semibold text-slate-500 dark:text-slate-400">{value}%</span>
      </div>
      <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5">
        <div className={`${color} h-2.5 rounded-full`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

export default function DashboardPerformance() {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm h-full">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-slate-800 dark:text-white">
            Teklif Performansı
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Son 30 gün özeti
          </p>
        </div>

        <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-300">
          Son 30 Gün
        </span>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="rounded-xl bg-slate-50 dark:bg-slate-900/40 p-4">
          <p className="text-xs text-slate-400 dark:text-slate-500">Gönderildi</p>
          <p className="text-xl font-bold text-slate-800 dark:text-white mt-2">20</p>
        </div>
        <div className="rounded-xl bg-slate-50 dark:bg-slate-900/40 p-4">
          <p className="text-xs text-slate-400 dark:text-slate-500">Kabul</p>
          <p className="text-xl font-bold text-slate-800 dark:text-white mt-2">6</p>
        </div>
        <div className="rounded-xl bg-slate-50 dark:bg-slate-900/40 p-4">
          <p className="text-xs text-slate-400 dark:text-slate-500">Reddedildi</p>
          <p className="text-xl font-bold text-slate-800 dark:text-white mt-2">4</p>
        </div>
      </div>

      <div className="space-y-5 mb-6">
        <ProgressRow label="Kabul Oranı" value={30} color="bg-emerald-500" />
        <ProgressRow label="Bekleyen Teklifler" value={50} color="bg-amber-500" />
        <ProgressRow label="Tamamlanan İşler" value={72} color="bg-blue-500" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-xl bg-slate-50 dark:bg-slate-900/40 p-4">
          <p className="text-xs text-slate-400 dark:text-slate-500">En Güçlü Kategori</p>
          <p className="text-base font-bold text-slate-800 dark:text-white mt-2">
            Makine Bakımı
          </p>
          <p className="text-sm text-emerald-600 dark:text-emerald-400 mt-1">
            Bu alanda daha yüksek dönüş alıyorsun
          </p>
        </div>

        <div className="rounded-xl bg-slate-50 dark:bg-slate-900/40 p-4">
          <p className="text-xs text-slate-400 dark:text-slate-500">Ortalama Yanıt Süresi</p>
          <p className="text-base font-bold text-slate-800 dark:text-white mt-2">2.4 Gün</p>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Tekliflerine hızlı geri dönüş alıyorsun
          </p>
        </div>
      </div>
    </div>
  );
}