import { useNavigate } from "react-router-dom";
import { LogOut, Bell, User } from "lucide-react";

const AdminTopbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminLoginTime");
    navigate("/dashboard/admin/login");
  };

  return (
    <div className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8 shadow-sm">
      {/* Sol Taraf */}
      <div>
        <h2 className="text-xl font-bold text-gray-900">Admin Paneli</h2>
        <p className="text-sm text-gray-500 font-medium mt-1">PortLink Yönetim Sistemi</p>
      </div>

      {/* Sağ Taraf - İkonlar ve Profil */}
      <div className="flex items-center gap-6">
        {/* Bildirim İkonu */}
        <button className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors rounded-lg hover:bg-gray-100">
          <Bell size={22} strokeWidth={1.8} />
          <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
        </button>

        {/* Profil */}
        <div className="flex items-center gap-3 pl-6 border-l border-gray-200">
          <div className="text-right">
            <p className="text-sm font-bold text-gray-900">Yönetici</p>
            <p className="text-xs text-gray-500">Admin Paneli</p>
          </div>
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold shadow-md">
            A
          </div>
        </div>

        {/* Çıkış Butonu */}
        <button
          onClick={handleLogout}
          className="ml-4 p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 transition-colors rounded-lg font-medium flex items-center gap-2"
          title="Çıkış Yap"
        >
          <LogOut size={20} strokeWidth={1.8} />
        </button>
      </div>
    </div>
  );
};

export default AdminTopbar;