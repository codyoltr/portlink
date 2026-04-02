const statToneMap = {
  blue: "bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-900/30",
  emerald:
    "bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-300 dark:border-emerald-900/30",
  amber:
    "bg-amber-50 text-amber-600 border-amber-100 dark:bg-amber-900/20 dark:text-amber-300 dark:border-amber-900/30",
  violet:
    "bg-violet-50 text-violet-600 border-violet-100 dark:bg-violet-900/20 dark:text-violet-300 dark:border-violet-900/30",
};

function StatCard({
  title,
  value,
  subtitle,
  icon,
  tone,
}: {
  title: string;
  value: string;
  subtitle: string;
  icon: string;
  tone: keyof typeof statToneMap;
}) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-sm border border-slate-200 dark:border-slate-700">
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-xl border ${statToneMap[tone]}`}>
          <span className="material-icons-round text-[20px]">{icon}</span>
        </div>
      </div>

      <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">{title}</p>
      <h3 className="text-3xl font-bold text-slate-800 dark:text-white">{value}</h3>
      <p className="text-sm text-slate-400 dark:text-slate-500 mt-3">{subtitle}</p>
    </div>
  );
}

export default function DashboardStats() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-5">
      <StatCard
        title="Verilen Teklifler"
        value="45"
        subtitle="%30 kabul oranı"
        icon="send"
        tone="blue"
      />
      <StatCard
        title="Bekleyen Teklif"
        value="10"
        subtitle="3 tanesi bugün sonuçlanabilir"
        icon="schedule"
        tone="amber"
      />
      <StatCard
        title="Aktif İşler"
        value="3"
        subtitle="2 iş teslim aşamasında"
        icon="engineering"
        tone="emerald"
      />
      <StatCard
        title="Bu Ay Kazanç"
        value="₺42.000"
        subtitle="Toplam hakediş: ₺142.500"
        icon="payments"
        tone="violet"
      />
    </section>
  );
}