import React from "react";
import DashboardLayout from "@/features/dashboard/components/DashboardLayout";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useNavigate } from "react-router-dom";

const data = [
  { day: "Pzt", teklifler: 3 },
  { day: "Sal", teklifler: 5 },
  { day: "Çar", teklifler: 2 },
  { day: "Per", teklifler: 6 },
  { day: "Cum", teklifler: 4 },
  { day: "Cts", teklifler: 7 },
  { day: "Paz", teklifler: 3 },
];

const AgentDashboardPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <DashboardLayout role="agent">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-10">

        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
            Merhaba Mehmet <span className="text-xl">👋</span>
          </h2>

          <p className="text-slate-500 dark:text-slate-400">
            Bugün <span className="text-primary font-semibold">5 yeni teklif</span> aldınız
          </p>
        </div>

        <button
          onClick={() => navigate("/create-job")}
          className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary/90 transition"
        >
          + Yeni İlan
        </button>

      </div>


      {/* STAT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">

        {/* CARD */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700/50 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">

          <div className="flex justify-between items-start mb-4">

            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-xl">
              <span className="material-icons-round">work_history</span>
            </div>

            <span className="flex items-center gap-1 text-xs font-bold text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-1 rounded-md">
              <span className="material-icons-round text-[14px]">trending_up</span>
              12%
            </span>

          </div>

          <h3 className="text-sm text-slate-500 dark:text-slate-400 font-semibold">
            Aylık Açılan İlanlar
          </h3>

          <p className="text-3xl font-extrabold text-slate-800 dark:text-white mt-1">
            24
          </p>

        </div>


        {/* CARD */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700/50 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">

          <div className="p-3 w-fit mb-4 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-xl">
            <span className="material-icons-round">task_alt</span>
          </div>

          <h3 className="text-sm text-slate-500 dark:text-slate-400 font-semibold">
            Tamamlanan İşler
          </h3>

          <p className="text-3xl font-extrabold text-slate-800 dark:text-white mt-1">
            18
          </p>

        </div>


        {/* CARD */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700/50 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">

          <div className="flex justify-between items-start mb-4">

            <div className="p-3 bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 rounded-xl">
              <span className="material-icons-round">pending_actions</span>
            </div>

            <span className="flex items-center gap-1 text-xs font-bold text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-1 rounded-md">
              <span className="material-icons-round text-[14px]">warning</span>
              5 Yeni
            </span>

          </div>

          <h3 className="text-sm text-slate-500 dark:text-slate-400 font-semibold">
            Bekleyen Teklifler
          </h3>

          <p className="text-3xl font-extrabold text-slate-800 dark:text-white mt-1">
            12
          </p>

        </div>

      </div>


      {/* CHART */}
      <div className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-700/50 shadow-sm mb-10">

        <div className="flex justify-between items-center mb-4">

          <h3 className="text-lg font-bold text-slate-800 dark:text-white">
            Son 7 Günlük Teklif Aktivitesi
          </h3>

          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-md font-semibold">
            Weekly
          </span>

        </div>

        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data}>
            <XAxis dataKey="day" />
            <YAxis />

            <Tooltip
              contentStyle={{
                borderRadius: "10px",
                border: "none",
                boxShadow: "0 4px 14px rgba(0,0,0,0.1)"
              }}
            />

            <Line
              type="monotone"
              dataKey="teklifler"
              stroke="#6366f1"
              strokeWidth={3}
            />

          </LineChart>
        </ResponsiveContainer>

      </div>


      {/* QUICK ACTIONS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">

        <div
          onClick={() => navigate("/create-job")}
     className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700/50 
hover:shadow-lg hover:-translate-y-1 cursor-pointer transition 
flex items-center justify-center gap-4 text-center"
        >

          <div className="w-10 h-10 bg-primary/10 text-primary flex items-center justify-center rounded-xl">
            <span className="material-icons-round">add</span>
          </div>

          <div>
            <h4 className="font-bold text-slate-800 dark:text-white">
              Yeni İlan Oluştur
            </h4>

            <p className="text-sm text-slate-500">
              Yeni bir hizmet talebi aç
            </p>
          </div>

        </div>


        <div
          onClick={() => navigate("/offers")}
         className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700/50 
hover:shadow-lg hover:-translate-y-1 cursor-pointer transition 
flex items-center justify-center gap-4 text-center">
          <div className="w-10 h-10 bg-primary/10 text-primary flex items-center justify-center rounded-xl">
            <span className="material-icons-round">mail</span>
          </div>
          <div>
            <h4 className="font-bold text-slate-800 dark:text-white">
              Gelen Teklifler
            </h4>

            <p className="text-sm text-slate-500">
              Tüm teklifleri görüntüle
            </p>
          </div>
        </div>


       
      </div>


      {/* TABLE */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50 overflow-hidden">

        <div className="p-6 border-b border-slate-100 dark:border-slate-700/50 flex justify-between items-center">

          <h3 className="text-lg font-bold text-slate-800 dark:text-white">
            Son Gelen Teklifler
          </h3>

          <button className="text-sm font-semibold text-primary hover:text-primary/80">
            Tümünü Gör
          </button>

        </div>


        <div className="overflow-x-auto">

          <table className="w-full text-left text-sm text-slate-500 dark:text-slate-400">

            <thead className="bg-slate-50 dark:bg-slate-900/60 text-slate-600 dark:text-slate-300 font-semibold border-b border-slate-100 dark:border-slate-700/50">

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

              <tr className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-all duration-200 cursor-pointer">

                <td className="px-6 py-4 font-medium text-slate-900 dark:text-white flex items-center gap-3">

                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                    PT
                  </div>

                  Port Teknik A.Ş.

                </td>

                <td className="px-6 py-4">Güverte Bakım Onarımı</td>

                <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white">
                  ₺45,000
                </td>

                <td className="px-6 py-4">3 Gün</td>

                <td className="px-6 py-4">

                  <span className="bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 text-xs font-bold px-2.5 py-1 rounded-md">
                    Bekliyor
                  </span>

                </td>

                <td className="px-6 py-4 text-right">

                  <button className="text-primary hover:text-primary/80 font-semibold transition-colors">
                    İncele
                  </button>

                </td>

              </tr>

            </tbody>

          </table>

        </div>

      </div>

    </DashboardLayout>
  );
};

export default AgentDashboardPage;