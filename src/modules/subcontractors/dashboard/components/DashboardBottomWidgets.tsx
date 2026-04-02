import { useNavigate } from "react-router-dom";

function FinanceRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-slate-50 dark:bg-slate-900/40 p-4">
      <span className="text-slate-500 dark:text-slate-400 text-sm">{label}</span>
      <span className="font-bold text-slate-800 dark:text-white">{value}</span>
    </div>
  );
}

function ActivityItem({
  icon,
  title,
  time,
}: {
  icon: string;
  title: string;
  time: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300">
        <span className="material-icons-round text-[18px]">{icon}</span>
      </div>
      <div>
        <p className="font-semibold text-slate-800 dark:text-white">{title}</p>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{time}</p>
      </div>
    </div>
  );
}

function QuickAction({
  icon,
  label,
  onClick,
}: {
  icon: string;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 rounded-xl border border-slate-200 dark:border-slate-700 px-4 py-3 text-left font-semibold text-slate-700 dark:text-slate-200 hover:border-primary/40 hover:text-primary transition"
    >
      <span className="material-icons-round text-[20px]">{icon}</span>
      <span>{label}</span>
    </button>
  );
}

export default function DashboardBottomWidgets() {
  const navigate = useNavigate();

  return (
    <section className="grid grid-cols-1 2xl:grid-cols-3 gap-6">
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
        <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-5">Finans Özeti</h3>
        <div className="space-y-3">
          <FinanceRow label="Kullanılabilir Bakiye" value="₺12.400" />
          <FinanceRow label="Bekleyen Ödeme" value="₺30.000" />
          <FinanceRow label="Bu Ay Hakediş" value="₺42.000" />
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
        <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-5">Son Aktiviteler</h3>
        <div className="space-y-4">
          <ActivityItem
            icon="visibility"
            title="Makine Bakımı teklifin görüntülendi"
            time="2 saat önce"
          />
          <ActivityItem
            icon="payments"
            title="₺8.500 ödeme cüzdanına yansıdı"
            time="Bugün"
          />
          <ActivityItem
            icon="campaign"
            title="Sana uygun yeni ilan yayınlandı"
            time="Dün"
          />
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
        <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-5">Hızlı Erişim</h3>
        <div className="space-y-3">
          <QuickAction
            icon="search"
            label="Yeni iş ara"
            onClick={() => navigate("/dashboard/subcontractor/jobs")}
          />
          <QuickAction
            icon="send"
            label="Verilen teklifleri görüntüle"
            onClick={() => navigate("/dashboard/subcontractor/offers")}
          />
          <QuickAction
            icon="engineering"
            label="Aktif işlerime git"
            onClick={() => navigate("/dashboard/subcontractor/active-jobs")}
          />
          <QuickAction
            icon="person"
            label="Profilimi güncelle"
            onClick={() => navigate("/dashboard/subcontractor/profile")}
          />
        </div>
      </div>
    </section>
  );
}