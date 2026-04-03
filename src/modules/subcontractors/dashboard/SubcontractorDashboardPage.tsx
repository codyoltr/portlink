import { useNavigate } from "react-router-dom";
import DashboardStats from "./components/DashboardStats";
import DashboardTasks from "./components/DashboardTasks";
import DashboardPerformance from "./components/DashboardPerformance";
import DashboardAiInsights from "./components/DashboardAiInsights";
import DashboardRecommendedJobs from "./components/DashboardRecommendedJobs";
import DashboardBottomWidgets from "./components/DashboardBottomWidgets";

export default function SubcontractorDashboardPage() {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      <section className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 dark:text-white">
            Taşeron Özeti
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2">
            Aktif işleriniz, teklif performansınız ve size özel fırsatlar burada.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => navigate("/dashboard/subcontractor/jobs")}
            className="bg-primary text-white px-5 py-3 rounded-xl font-semibold shadow-sm hover:bg-primary/90 flex items-center gap-2"
          >
            <span className="material-icons-round text-[18px]">search</span>
            Yeni İş Ara
          </button>

          <button
            onClick={() => navigate("/dashboard/subcontractor/offers")}
            className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 px-5 py-3 rounded-xl font-semibold hover:border-primary/40 hover:text-primary flex items-center gap-2"
          >
            <span className="material-icons-round text-[18px]">description</span>
            Tekliflerim
          </button>
        </div>
      </section>

      <DashboardStats />

      <section className="grid grid-cols-1 2xl:grid-cols-12 gap-6">
        <div className="2xl:col-span-4">
          <DashboardTasks />
        </div>

        <div className="2xl:col-span-5">
          <DashboardPerformance />
        </div>

        <div className="2xl:col-span-3">
          <DashboardAiInsights />
        </div>
      </section>

      <DashboardRecommendedJobs />

      <DashboardBottomWidgets />
    </div>
  );
}