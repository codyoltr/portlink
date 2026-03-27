import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

interface DashboardLayoutProps {
  children: React.ReactNode;
  role: 'agent' | 'subcontractor' | 'captain';
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, role }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

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
      <aside className={`${isSidebarCollapsed ? 'w-24' : 'w-80'} transition-all duration-300 h-full bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 flex flex-col flex-shrink-0 z-40 hidden lg:flex`}>
        <div className={`h-20 flex flex-shrink-0 items-center border-b border-slate-100 dark:border-slate-700/50 ${isSidebarCollapsed ? 'justify-center px-0' : 'px-6'}`}>
          <Link to="/" className="flex items-center gap-3">
            <div className="bg-primary p-2.5 rounded-xl flex-shrink-0">
              <span className="material-icons-round text-white text-xl">directions_boat</span>
            </div>
            {!isSidebarCollapsed && <span className="text-xl font-bold text-slate-900 dark:text-white tracking-tight truncate">Portlink CRM</span>}
          </Link>
        </div>

        <div className={`flex-1 overflow-y-auto ${isSidebarCollapsed ? 'p-3' : 'p-6'}`}>
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center ${isSidebarCollapsed ? 'justify-center px-0' : 'gap-3 px-4'} py-3.5 rounded-xl font-semibold transition-all ${
                    isActive
                      ? 'bg-primary text-white shadow-lg shadow-primary/20'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:text-slate-900 dark:hover:text-white'
                  }`}
                  title={isSidebarCollapsed ? item.label : undefined}
                >
                  <span className="material-icons-round text-[20px]">{item.icon}</span>
                  {!isSidebarCollapsed && <span className="truncate">{item.label}</span>}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* SIDEBAR ÇIKIŞ YAP (GERİ GETİRİLDİ) */}
        <div className={`p-6 border-t border-slate-100 dark:border-slate-700/50 flex flex-shrink-0 ${isSidebarCollapsed ? 'justify-center p-3' : ''}`}>
          <button
            onClick={() => navigate('/login')}
            className={`flex items-center ${isSidebarCollapsed ? 'justify-center px-0 w-12 h-12' : 'gap-3 px-4 w-full'} py-3 rounded-xl font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors`}
            title={isSidebarCollapsed ? "Çıkış Yap" : undefined}
          >
            <span className="material-icons-round text-[20px]">logout</span>
            {!isSidebarCollapsed && <span>Çıkış Yap</span>}
          </button>
        </div>
      </aside>

      {/* ANA İÇERİK ALANI */}
      <main className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        <header className="h-20 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between px-8 flex-shrink-0 z-30 shadow-sm relative">
          
          {/* HEADER SOL KISIM - HEADER BAŞLIĞI VE COLLAPSE BUTTON */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 border border-slate-100 dark:border-slate-700 dark:bg-slate-800 text-slate-500 hover:text-primary hover:bg-white transition-colors"
            >
              <span className="material-icons-round">{isSidebarCollapsed ? 'menu_open' : 'menu'}</span>
            </button>
            <h1 className="text-xl font-bold text-slate-800 dark:text-white tracking-tight hidden md:block">
              {getRoleDisplayName()} Paneli
            </h1>
          </div>

          {/* HEADER SAĞ KISIM - AYARLAR VE PROFİL */}
          <div className="flex items-center gap-4 relative">

            {/* PROFİL WIDGET */}
            <div className="relative">
              <button 
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center gap-3 p-1.5 pr-3 rounded-full border border-transparent hover:border-slate-200 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                onBlur={() => setTimeout(() => setIsProfileMenuOpen(false), 200)}
              >
                <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-200 flex-shrink-0">
                  <img src="https://i.pravatar.cc/150?img=11" alt="Profile" className="w-full h-full object-cover" />
                </div>
                <div className="hidden md:flex flex-col items-start min-w-0 text-left">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white truncate">Mehmet Yılmaz</h3>
                  <span className={`inline-flex items-center px-1.5 py-0.5 mt-0.5 rounded-md text-[9px] font-black uppercase tracking-widest ${getRoleBadgeColor()}`}>
                    {getRoleDisplayName()}
                  </span>
                </div>
                <span className="material-icons-round text-slate-400">arrow_drop_down</span>
              </button>

              {/* DROPDOWN OPTIONS */}
              {isProfileMenuOpen && (
                <div className="absolute right-0 top-14 mt-1 w-56 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <button 
                    onClick={() => {
                      setIsProfileMenuOpen(false);
                      navigate(role === 'agent' ? '/dashboard/agent/profile' : '/dashboard/subcontractor/profile');
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                  >
                    <span className="material-icons-round text-lg text-slate-400">person</span>
                    Kişisel Profil
                  </button>
                  <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                    <span className="material-icons-round text-lg text-slate-400">settings</span>
                    Sistem Ayarları
                  </button>
                  <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                    <span className="material-icons-round text-lg text-slate-400">help_outline</span>
                    Yardım & Destek
                  </button>
                  <div className="h-px bg-slate-100 dark:bg-slate-700/50 my-1"></div>
                  <button 
                    onClick={() => navigate('/login')}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors"
                  >
                    <span className="material-icons-round text-lg">logout</span>
                    Sistemden Çıkış
                  </button>
                </div>
              )}
            </div>
            
          </div>
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