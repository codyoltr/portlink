import React from 'react';
import { useDemoMode } from '@/hooks/useDemoMode';

interface FullPageLayoutProps {
  children: React.ReactNode;
}

const FullPageLayout: React.FC<FullPageLayoutProps> = ({ children }) => {
  const { isDemo, exitDemo, pathname } = useDemoMode();

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-blue-50/20 to-slate-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 font-display text-slate-800 dark:text-slate-200 flex flex-col relative">
      {isDemo && pathname !== '/login' && pathname !== '/' && (
        <div className="bg-emerald-500 text-white text-xs font-bold px-4 py-2 flex items-center justify-center gap-2 relative z-[100] sticky top-0">
          <span className="material-icons-round text-[14px]">info</span>
          Şu anda Hızlı Demo Modu'ndasınız. İşlemler simüle edilmektedir.
          <button
            onClick={exitDemo}
            className="ml-4 underline hover:text-emerald-100 transition-colors"
          >
            Demo'dan Çık
          </button>
        </div>
      )}
      {children}
    </div>
  );
};

export default FullPageLayout;

