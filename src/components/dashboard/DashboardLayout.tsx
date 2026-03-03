import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';

interface DashboardLayoutProps {
    children: React.ReactNode;
    role: 'agent' | 'subcontractor' | 'captain';
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, role }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

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

    const baseNavItems = [
        { label: 'Özet (Dashboard)', path: `/dashboard/${role}`, icon: 'dashboard' },
    ];

    const agentNavItems = [
        ...baseNavItems,
        { label: 'Gelen Teklifler', path: `/dashboard/${role}/offers`, icon: 'receipt_long' },
        { label: 'Aktif İlanlarım', path: `/dashboard/${role}/jobs`, icon: 'work' },
    ];

    const subNavItems = [
        ...baseNavItems,
        { label: 'Verilen Teklifler', path: `/dashboard/${role}/offers`, icon: 'send' },
        { label: 'Kazanılan İşler', path: `/dashboard/${role}/jobs`, icon: 'verified' },
    ];

    const captainNavItems = [
        ...baseNavItems,
        { label: 'Planlanan Seferler', path: `/dashboard/${role}/voyages`, icon: 'directions_boat' },
        { label: 'Bekleyen Onaylar', path: `/dashboard/${role}/approvals`, icon: 'rule' },
    ];

    const navItems = role === 'agent' ? agentNavItems : role === 'subcontractor' ? subNavItems : captainNavItems;

    return (
        <div className="flex h-screen bg-slate-50 dark:bg-slate-900 font-display overflow-hidden">
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 transform transition-transform duration-300 lg:transform-none flex flex-col ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="h-20 flex items-center justify-between px-6 border-b border-slate-100 dark:border-slate-700/50">
                    <Link to="/" className="flex items-center gap-3">
                        <div className="bg-primary p-2.5 rounded-xl">
                            <span className="material-icons-round text-white text-xl">directions_boat</span>
                        </div>
                        <span className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Portlink CRM</span>
                    </Link>
                    <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-slate-500 hover:text-slate-700 p-2">
                        <span className="material-icons-round">close</span>
                    </button>
                </div>

                <div className="p-6">
                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-700/50 mb-6">
                        <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-200">
                            <img src="https://i.pravatar.cc/150?img=11" alt="Profile" className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Mehmet Yılmaz</h3>
                            <span className={`inline-flex items-center px-2 py-0.5 mt-1 rounded-md text-[10px] font-bold ${getRoleBadgeColor()}`}>
                                {getRoleDisplayName()}
                            </span>
                        </div>
                    </div>

                    <nav className="space-y-1">
                        {navItems.map((item) => {
                            const isActive = location.pathname === item.path;
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    onClick={() => setIsSidebarOpen(false)}
                                    className={`flex items-center gap-3 px-4 py-3.5 rounded-xl font-semibold transition-all ${isActive
                                            ? 'bg-primary text-white shadow-md shadow-primary/20'
                                            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:text-slate-900 dark:hover:text-slate-200'
                                        }`}
                                >
                                    <span className="material-icons-round text-[20px]">{item.icon}</span>
                                    {item.label}
                                </Link>
                            );
                        })}

                        <div className="h-px w-full bg-slate-200 dark:bg-slate-700 my-4" />

                        <Link
                            to="/settings"
                            className="flex items-center gap-3 px-4 py-3.5 rounded-xl font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:text-slate-900 transition-all"
                        >
                            <span className="material-icons-round text-[20px]">settings</span>
                            Hesap Ayarları
                        </Link>
                    </nav>
                </div>

                <div className="mt-auto p-6 border-t border-slate-100 dark:border-slate-700/50">
                    <button
                        onClick={() => navigate('/login')}
                        className="flex items-center gap-3 w-full px-4 py-3 rounded-xl font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors"
                    >
                        <span className="material-icons-round text-[20px]">logout</span>
                        Çıkış Yap
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col min-w-0 bg-slate-50 dark:bg-slate-900 overflow-hidden">
                {/* Top Header */}
                <header className="h-20 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between px-4 sm:px-6 lg:px-8 z-30">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className="lg:hidden p-2 -ml-2 text-slate-500 hover:text-slate-900 dark:hover:text-white rounded-lg"
                        >
                            <span className="material-icons-round">menu</span>
                        </button>
                        <h1 className="text-xl font-bold text-slate-800 dark:text-white hidden sm:block tracking-tight">
                            {getRoleDisplayName()} Paneli
                        </h1>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <button
                                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                                className="p-2 text-slate-400 hover:text-primary transition-colors relative"
                            >
                                <span className="material-icons-round">notifications</span>
                                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white dark:border-slate-800"></span>
                            </button>

                            {isNotificationsOpen && (
                                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 py-2 z-50">
                                    <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-700">
                                        <h3 className="font-bold text-slate-800 dark:text-white">Bildirimler</h3>
                                    </div>
                                    <div className="max-h-80 overflow-y-auto">
                                        <div className="px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer border-b border-slate-50 dark:border-slate-700/50 bg-primary/5">
                                            <p className="text-sm text-slate-900 dark:text-white font-semibold">Sisteme başarıyla giriş yaptınız.</p>
                                            <span className="text-xs text-slate-400 mt-1 block">Şimdi</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                {/* Page Content Scrollable Area */}
                <div className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;
