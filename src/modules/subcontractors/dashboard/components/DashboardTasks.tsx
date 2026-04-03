function TaskItem({
  title,
  meta,
  tone,
}: {
  title: string;
  meta: string;
  tone: "red" | "yellow" | "green";
}) {
  const toneMap = {
    red: "bg-rose-500",
    yellow: "bg-amber-500",
    green: "bg-emerald-500",
  };

  const badgeMap = {
    red: "Acil",
    yellow: "Takip",
    green: "Fırsat",
  };

  return (
    <div className="flex items-start justify-between gap-3 p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40">
      <div className="flex items-start gap-3">
        <div className={`w-2.5 h-2.5 rounded-full mt-2 ${toneMap[tone]}`} />
        <div>
          <p className="font-semibold text-slate-800 dark:text-white">{title}</p>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{meta}</p>
        </div>
      </div>

      <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 whitespace-nowrap">
        {badgeMap[tone]}
      </span>
    </div>
  );
}

export default function DashboardTasks() {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm h-full">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-lg font-bold text-slate-800 dark:text-white">
          Bugün Yapman Gerekenler
        </h3>
        <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
          3 görev
        </span>
      </div>

      <div className="space-y-3">
        <TaskItem
          title="Elektrik kontrol işi için rapor yükle"
          meta="Teslime 2 gün kaldı"
          tone="red"
        />
        <TaskItem
          title="Bekleyen 3 teklifin durumunu takip et"
          meta="Bugün dönüş alma olasılığın yüksek"
          tone="yellow"
        />
        <TaskItem
          title="Yeni uygun ilanlara teklif ver"
          meta="Makine ve boya kategorisinde 5 yeni fırsat var"
          tone="green"
        />
      </div>
    </div>
  );
}