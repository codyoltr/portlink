import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

interface DashboardLayoutProps {
  children: React.ReactNode;
  role: 'agent' | 'subcontractor' | 'captain';
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, role }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const getRoleDisplayName = () => {
    switch (role) {
      case 'agent': return 'Acente';
      case 'subcontractor': return 'Taşeron';
      case 'captain': return 'Kaptan';
      default: return '';
    }
  };

  const getRoleBadgeColor = () => {
    switch (role) {
      case 'agent': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'subcontractor': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300';
      case 'captain': return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  const agentNavItems = [
    { label: 'Özet (Dashboard)', path: `/dashboard/agent`, icon: 'dashboard' },
    { label: 'Hızlı İlan Ver', path: `/dashboard/agent/quick-post`, icon: 'rocket_launch' },    { label: 'Gelen Teklifler', path: `/dashboard/agent/offers`, icon: 'receipt_long' },
    { label: 'Devam Eden İşler', path: `/dashboard/agent/assigned`, icon: 'autorenew' },
    { label: 'Aktif İlanlarım', path: `/dashboard/agent/jobs`, icon: 'work' },
    { label: 'Taşeron Rehberi', path: `/dashboard/agent/subcontractor-directory`, icon: 'contact_page' },
    { label: 'Arşiv ve Finans', path: `/dashboard/agent/archive-finance`, icon: 'account_balance_wallet' },
  ];

  const subNavItems = [
    { label: 'Özet (Dashboard)', path: `/dashboard/subcontractor`, icon: 'dashboard' },
    { label: 'İş Ara', path: `/dashboard/subcontractor/jobs`, icon: 'search' },
    { label: 'Verilen Teklifler', path: `/dashboard/subcontractor/offers`, icon: 'send' },
    { label: 'Aktif İşlerim', path: `/dashboard/subcontractor/active-jobs`, icon: 'autorenew' },
    { label: 'Cüzdan ve Kazanç', path: `/dashboard/subcontractor/wallet`, icon: 'account_balance_wallet' },
    { label: 'Profil ve Kapasite', path: `/dashboard/subcontractor/profile-capacity`, icon: 'badge' },
    
  ];

  const captainNavItems = [
    { label: 'Özet (Dashboard)', path: `/dashboard/captain`, icon: 'dashboard' },
    { label: 'Planlanan Seferler', path: `/dashboard/captain/voyages`, icon: 'directions_boat' },
    { label: 'Bekleyen Onaylar', path: `/dashboard/captain/approvals`, icon: 'rule' },
  ];

  const navItems = role === 'agent' ? agentNavItems : role === 'subcontractor' ? subNavItems : captainNavItems;

  return (
    <div className="flex h-screen w-full bg-slate-50 dark:bg-slate-900 font-display overflow-hidden">
      
      {/* SIDEBAR */}
      <aside className="w-80 h-full bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 flex flex-col flex-shrink-0 z-40 hidden lg:flex">
        <div className="h-20 flex items-center px-6 border-b border-slate-100 dark:border-slate-700/50 flex-shrink-0">
          <Link to="/" className="flex items-center gap-3">
            <div className="bg-primary p-2.5 rounded-xl flex-shrink-0">
              <span className="material-icons-round text-white text-xl">directions_boat</span>
            </div>
            <span className="text-xl font-bold text-slate-900 dark:text-white tracking-tight truncate">Portlink CRM</span>
          </Link>
        </div>

        <div className="p-6 flex-1 overflow-y-auto">
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-700/50 mb-6 flex-shrink-0">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-200 flex-shrink-0">
              <img src="https://i.pravatar.cc/150?img=11" alt="Profile" className="w-full h-full object-cover" />
            </div>
            <div className="min-w-0">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white truncate">Mehmet Yılmaz</h3>
              <span className={`inline-flex items-center px-2 py-0.5 mt-1 rounded-md text-[10px] font-bold ${getRoleBadgeColor()}`}>
                {getRoleDisplayName()}
              </span>
            </div>
          </div>

          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3.5 rounded-xl font-semibold transition-all ${
                    isActive
                      ? 'bg-primary text-white shadow-lg shadow-primary/20'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <span className="material-icons-round text-[20px]">{item.icon}</span>
                  <span className="truncate">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-6 border-t border-slate-100 dark:border-slate-700/50 flex-shrink-0">
          <button
            onClick={() => navigate('/login')}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors"
          >
            <span className="material-icons-round text-[20px]">logout</span>
            <span>Çıkış Yap</span>
          </button>
        </div>
      </aside>

      {/* ANA İÇERİK ALANI */}
      <main className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        <header className="h-20 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between px-8 flex-shrink-0 z-30 shadow-sm">
          <h1 className="text-xl font-bold text-slate-800 dark:text-white tracking-tight">
            {getRoleDisplayName()} Paneli
          </h1>
        </header>

        {/* --- GENİŞLİK AYARI YAPILAN YER --- */}
        <div className="flex-1 overflow-auto bg-slate-50 dark:bg-slate-900 p-4 md:p-8 lg:p-12">
          <div className="mx-auto w-full max-w-full 2xl:max-w-[1600px]">
             {children}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;