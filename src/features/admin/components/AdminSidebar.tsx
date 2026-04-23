import { NavLink, useNavigate } from "react-router-dom";
import { Ship, LogOut, Settings, Home, Users, Briefcase, FileText, AlertCircle } from "lucide-react";

const menuItems = [
  { label: "Dashboard", path: "/dashboard/admin", icon: Home },
  { label: "Kullanıcılar", path: "/dashboard/admin/users", icon: Users },
  { label: "İlanlar", path: "/dashboard/admin/jobs", icon: Briefcase },
  { label: "Başvurular", path: "/dashboard/admin/applications", icon: FileText },
  { label: "Raporlar", path: "/dashboard/admin/reports", icon: AlertCircle },
  { label: "Ayarlar", path: "/dashboard/admin/settings", icon: Settings },
];

const AdminSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminLoginTime");
    navigate("/dashboard/admin/login");
  };

  return (
    <aside className="w-64 bg-gradient-to-b from-slate-900 to-slate-800 text-white min-h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-2.5 rounded-lg shadow-lg">
            <Ship size={24} strokeWidth={2.5} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tight">Portlink</h1>
            <p className="text-xs text-slate-400 font-medium">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 group ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg"
                    : "text-slate-300 hover:bg-slate-700 hover:text-white"
                }`
              }
            >
              <IconComponent size={20} className="flex-shrink-0" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-slate-700">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-slate-300 hover:bg-red-600 hover:text-white transition-all duration-200 group"
        >
          <LogOut size={20} className="flex-shrink-0" />
          <span>Çıkış Yap</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;