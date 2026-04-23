import { BarChart3, Users, Briefcase, TrendingUp } from "lucide-react";

const AdminReportsPage = () => {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-black text-gray-900 mb-2">Raporlar</h1>
        <p className="text-gray-600 font-medium">Sistem istatistiklerini ve raporlarını görüntüleyin</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Kullanıcılar Raporu */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">Kullanıcılar</h3>
            <div className="bg-blue-100 p-3 rounded-lg text-blue-600">
              <Users size={24} />
            </div>
          </div>
          <p className="text-3xl font-black text-gray-900">1,234</p>
          <p className="text-sm text-gray-500 mt-2">+12% geçen aya göre</p>
        </div>

        {/* İlanlar Raporu */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">İlanlar</h3>
            <div className="bg-green-100 p-3 rounded-lg text-green-600">
              <Briefcase size={24} />
            </div>
          </div>
          <p className="text-3xl font-black text-gray-900">567</p>
          <p className="text-sm text-gray-500 mt-2">+8% geçen aya göre</p>
        </div>

        {/* Başvurular Raporu */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">Başvurular</h3>
            <div className="bg-yellow-100 p-3 rounded-lg text-yellow-600">
              <BarChart3 size={24} />
            </div>
          </div>
          <p className="text-3xl font-black text-gray-900">2,891</p>
          <p className="text-sm text-gray-500 mt-2">+24% geçen aya göre</p>
        </div>

        {/* Trend Raporu */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">Trend</h3>
            <div className="bg-purple-100 p-3 rounded-lg text-purple-600">
              <TrendingUp size={24} />
            </div>
          </div>
          <p className="text-3xl font-black text-gray-900">↑ 18%</p>
          <p className="text-sm text-gray-500 mt-2">Genel büyüme</p>
        </div>
      </div>

      {/* Detaylı Raporlar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Aylık Kullanıcı Artışı</h2>
          <p className="text-gray-500 text-center py-12">Grafik gösterilecek</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">İlan Kategorileri</h2>
          <p className="text-gray-500 text-center py-12">Grafik gösterilecek</p>
        </div>
      </div>
    </div>
  );
};

export default AdminReportsPage;