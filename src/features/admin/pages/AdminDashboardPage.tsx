import { useEffect, useState } from "react";
import StatsCard from "../components/StatsCard";
import { getAdminStats } from "../services/adminService";
import type { AdminStat } from "../types/admin.types";

const AdminDashboardPage = () => {
  const [stats, setStats] = useState<AdminStat[]>([]);

  useEffect(() => {
    const fetchStats = async () => {
      const data = await getAdminStats();
      setStats(data);
    };

    fetchStats();
  }, []);

  return (
    <div>
      {/* Başlık */}
      <div className="mb-8">
        <h1 className="text-4xl font-black text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600 font-medium">Portlink Yönetim Sistemine Hoş Geldiniz</p>
      </div>

      {/* İstatistik Kartları */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <StatsCard key={stat.title} title={stat.title} value={stat.value} change={stat.change} />
        ))}
      </div>

      {/* Alt Bölüm - Yakında Eklenecek İçerik */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Yakın Etkinlikler */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Son Aktiviteler</h2>
          <div className="space-y-4">
            <p className="text-gray-500 text-sm text-center py-8">Henüz aktivite yok</p>
          </div>
        </div>

        {/* Sistem Durumu */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Sistem Durumu</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Veritabanı</span>
              <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-xs font-bold rounded-full">Aktif</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">API Sunucusu</span>
              <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-xs font-bold rounded-full">Aktif</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Yedekleme</span>
              <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-xs font-bold rounded-full">Tamam</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;