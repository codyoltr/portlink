import { useNavigate, useLocation } from "react-router-dom";
import { Ship, ArrowRight } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <header className="w-full bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
      <div className="w-full px-6 md:px-8 lg:px-16 h-20 flex items-center justify-between">

        {/* Logo Alanı */}
        <div onClick={() => navigate('/')} className="flex items-center gap-3 cursor-pointer">
          <div className="bg-blue-600 text-white p-2.5 rounded-xl shadow-sm">
            <Ship size={24} strokeWidth={2.5} />
          </div>
          <span className="text-2xl font-black text-blue-900 tracking-tight">Portlink</span>
        </div>

        {/* Menü Linkleri */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-12">

          <button
            onClick={() => {
              if (location.pathname !== '/') navigate('/');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`text-sm font-bold transition-all relative group ${location.pathname === '/' ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'}`}>
            Ana Sayfa
            <span className={`absolute -bottom-1 left-0 h-0.5 bg-blue-600 transition-all duration-300 ${location.pathname === '/' ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
          </button>

          <button
            onClick={() => navigate('/how-it-works')}
            className={`text-sm font-bold transition-all relative group ${location.pathname === '/how-it-works' ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'}`}>
            Portlink Nasıl Çalışır?
            <span className={`absolute -bottom-1 left-0 h-0.5 bg-blue-600 transition-all duration-300 ${location.pathname === '/how-it-works' ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
          </button>

          <button
            onClick={() => navigate('/services')}
            className={`text-sm font-bold transition-all relative group ${location.pathname === '/services' ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'}`}>
            Hizmetler
            <span className={`absolute -bottom-1 left-0 h-0.5 bg-blue-600 transition-all duration-300 ${location.pathname === '/services' ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
          </button>

          <button
            onClick={() => navigate('/about')}
            className={`text-sm font-bold transition-all relative group ${location.pathname === '/about' ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'}`}>
            Neden Portlink?
            <span className={`absolute -bottom-1 left-0 h-0.5 bg-blue-600 transition-all duration-300 ${location.pathname === '/about' ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
          </button>

          <button
            onClick={() => navigate('/contact')}
            className={`text-sm font-bold transition-all relative group ${location.pathname === '/contact' ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'}`}>
            İletişim
            <span className={`absolute -bottom-1 left-0 h-0.5 bg-blue-600 transition-all duration-300 ${location.pathname === '/contact' ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
          </button>
        </nav>

        {/* Giriş Yap Dropdown */}
        <div className="relative group hidden md:block">
          <button className="relative flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-blue-600 px-7 py-2.5 font-bold text-white shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] active:translate-y-0">
            <span className="relative z-10 flex items-center gap-2">
              Giriş Yap <ArrowRight size={18} className="group-hover:rotate-90 transition-transform duration-300" />
            </span>
            <div className="absolute inset-0 z-0 h-full w-full bg-gradient-to-r from-blue-600 via-blue-500 to-sky-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
          </button>

          {/* Dropdown Menu */}
          <div className="absolute right-0 mt-3 w-64 bg-white/95 backdrop-blur-xl rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.08)] border border-white/20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-right scale-95 group-hover:scale-100 z-50 overflow-hidden ring-1 ring-slate-900/5">
            <div className="p-3 space-y-1">
              <button
                onClick={() => navigate('/login/agent')}
                className="w-full text-left px-4 py-3 text-sm font-bold text-slate-700 hover:text-blue-700 hover:bg-blue-50/80 rounded-xl transition-all duration-200 flex items-center gap-4 group/btn"
              >
                <div className="bg-blue-100 text-blue-600 p-2.5 rounded-xl group-hover/btn:bg-blue-600 group-hover/btn:text-white transition-colors duration-300 shadow-sm group-hover/btn:shadow-md">
                  <span className="material-icons-round text-[20px]">business</span>
                </div>
                <div className="flex flex-col">
                  <span>Acente Girişi</span>
                  <span className="text-[10px] text-slate-400 font-medium group-hover/btn:text-blue-400 transition-colors">Hizmet ver & İş al</span>
                </div>
              </button>
              <button
                onClick={() => navigate('/login/subcontractor')}
                className="w-full text-left px-4 py-3 text-sm font-bold text-slate-700 hover:text-blue-700 hover:bg-blue-50/80 rounded-xl transition-all duration-200 flex items-center gap-4 group/btn"
              >
                <div className="bg-blue-100 text-blue-600 p-2.5 rounded-xl group-hover/btn:bg-blue-600 group-hover/btn:text-white transition-colors duration-300 shadow-sm group-hover/btn:shadow-md">
                  <span className="material-icons-round text-[20px]">engineering</span>
                </div>
                <div className="flex flex-col">
                  <span>Taşeron Girişi</span>
                  <span className="text-[10px] text-slate-400 font-medium group-hover/btn:text-blue-400 transition-colors">İş bul & Teklif ver</span>
                </div>
              </button>
            </div>
          </div>
        </div>

      </div>
    </header>
  );
};

export default Navbar;