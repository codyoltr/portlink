import { useNavigate } from "react-router-dom";

export default function DashboardAiInsights() {
  const navigate = useNavigate();

  return (
    <div className="rounded-2xl p-6 border border-primary/10 bg-gradient-to-br from-primary/10 to-white dark:from-primary/10 dark:to-slate-800 shadow-sm h-full">
      <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-4">
        <span className="material-icons-round">auto_awesome</span>
      </div>

      <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">
        AI Önerisi
      </h3>

      <p className="text-sm text-slate-600 dark:text-slate-300 leading-6 mb-4">
        Bu hafta makine bakımı ve boya kategorisinde daha fazla ilan var.
        Özellikle Tuzla bölgesinde teklif vermen önerilir.
      </p>

      <div className="space-y-3">
        <div className="rounded-xl bg-white/70 dark:bg-slate-900/40 border border-white/70 dark:border-slate-700 px-4 py-3 text-sm text-slate-700 dark:text-slate-200">
          Makine bakım ilanlarında uyum puanın yüksek.
        </div>
        <div className="rounded-xl bg-white/70 dark:bg-slate-900/40 border border-white/70 dark:border-slate-700 px-4 py-3 text-sm text-slate-700 dark:text-slate-200">
          Yüksek bütçeli iki yeni ilan bugün yayınlandı.
        </div>

        <button
          onClick={() => navigate("/dashboard/subcontractor/jobs")}
          className="w-full mt-2 bg-primary text-white py-3 rounded-xl font-semibold hover:bg-primary/90 transition"
        >
          Uygun İlanları Gör
        </button>
      </div>
    </div>
  );
}