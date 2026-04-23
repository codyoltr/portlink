import { Settings, Lock, Bell, Shield, Database } from "lucide-react";

const AdminSettingsPage = () => {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-black text-gray-900 mb-2">Ayarlar</h1>
        <p className="text-gray-600 font-medium">Sistem ayarlarını ve tercihlerini yönetin</p>
      </div>

      <div className="space-y-6">
        {/* Genel Ayarlar */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-blue-100 p-3 rounded-lg text-blue-600">
              <Settings size={24} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">Genel Ayarlar</h2>
              <p className="text-sm text-gray-500">Sistem genel ayarlarını değiştirin</p>
            </div>
          </div>

          <div className="space-y-4 border-t border-gray-200 pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Sistem Adı</p>
                <p className="text-sm text-gray-500">PortLink</p>
              </div>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm">
                Değiştir
              </button>
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div>
                <p className="font-medium text-gray-900">Bakım Modu</p>
                <p className="text-sm text-gray-500">Sistem bakım modu durumu</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Güvenlik Ayarları */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-red-100 p-3 rounded-lg text-red-600">
              <Lock size={24} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">Güvenlik Ayarları</h2>
              <p className="text-sm text-gray-500">Admin şifresi ve güvenlik seçenekleri</p>
            </div>
          </div>

          <div className="space-y-4 border-t border-gray-200 pt-6">
            <button className="w-full px-4 py-3 border-2 border-gray-200 text-gray-900 rounded-lg hover:border-blue-600 hover:text-blue-600 transition-colors font-medium flex items-center gap-2 justify-center">
              <Shield size={18} />
              Admin Şifresi Değiştir
            </button>
            <button className="w-full px-4 py-3 border-2 border-gray-200 text-gray-900 rounded-lg hover:border-blue-600 hover:text-blue-600 transition-colors font-medium flex items-center gap-2 justify-center">
              <Lock size={18} />
              Oturumları Yönet
            </button>
          </div>
        </div>

        {/* Bildirim Ayarları */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-green-100 p-3 rounded-lg text-green-600">
              <Bell size={24} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">Bildirim Ayarları</h2>
              <p className="text-sm text-gray-500">E-posta bildirimlerini yönetin</p>
            </div>
          </div>

          <div className="space-y-4 border-t border-gray-200 pt-6">
            <div className="flex items-center justify-between">
              <label className="font-medium text-gray-900">Yeni başvuru bildirimleri</label>
              <input type="checkbox" defaultChecked className="w-5 h-5 text-blue-600 rounded" />
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <label className="font-medium text-gray-900">İlan güncellemeleri</label>
              <input type="checkbox" defaultChecked className="w-5 h-5 text-blue-600 rounded" />
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <label className="font-medium text-gray-900">Sistem hataları</label>
              <input type="checkbox" defaultChecked className="w-5 h-5 text-blue-600 rounded" />
            </div>
          </div>
        </div>

        {/* Veritabanı Ayarları */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-purple-100 p-3 rounded-lg text-purple-600">
              <Database size={24} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">Veritabanı Yönetimi</h2>
              <p className="text-sm text-gray-500">Veritabanı bakım işlemleri</p>
            </div>
          </div>

          <div className="space-y-4 border-t border-gray-200 pt-6">
            <button className="w-full px-4 py-3 border-2 border-gray-200 text-gray-900 rounded-lg hover:border-blue-600 hover:text-blue-600 transition-colors font-medium flex items-center gap-2 justify-center">
              <Database size={18} />
              Veritabanını Yedekle
            </button>
            <button className="w-full px-4 py-3 border-2 border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors font-medium flex items-center gap-2 justify-center">
              <Shield size={18} />
              Veritabanını Sıfırla
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettingsPage;