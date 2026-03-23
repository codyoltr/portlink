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
            onClick={() => navigate('/')}
            className={`text-sm font-bold transition-all relative group ${location.pathname === '/' ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'}`}>
            Ana Sayfa
            <span className={`absolute -bottom-1 left-0 h-0.5 bg-blue-600 transition-all duration-300 ${location.pathname === '/' ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
          </button>

          <button
            onClick={() => navigate('/nasil-calisir')}
            className={`text-sm font-bold transition-all relative group ${location.pathname === '/nasil-calisir' ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'}`}>
            Portlink Nasıl Çalışır?
            <span className={`absolute -bottom-1 left-0 h-0.5 bg-blue-600 transition-all duration-300 ${location.pathname === '/nasil-calisir' ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
          </button>

          <button
            onClick={() => navigate('/hizmetler')}
            className={`text-sm font-bold transition-all relative group ${location.pathname === '/hizmetler' ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'}`}>
            Hizmetler
            <span className={`absolute -bottom-1 left-0 h-0.5 bg-blue-600 transition-all duration-300 ${location.pathname === '/hizmetler' ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
          </button>

          <button
            onClick={() => navigate('/neden-portlink')}
            className={`text-sm font-bold transition-all relative group ${location.pathname === '/neden-portlink' ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'}`}>
            Neden Portlink?
            <span className={`absolute -bottom-1 left-0 h-0.5 bg-blue-600 transition-all duration-300 ${location.pathname === '/neden-portlink' ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
          </button>

          <button
            onClick={() => navigate('/iletisim')}
            className={`text-sm font-bold transition-all relative group ${location.pathname === '/iletisim' ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'}`}>
            İletişim
            <span className={`absolute -bottom-1 left-0 h-0.5 bg-blue-600 transition-all duration-300 ${location.pathname === '/iletisim' ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
          </button>
        </nav>

        {/* Giriş Yap Butonu */}
        <button 
          onClick={() => navigate('/login')}
          className="hidden md:flex items-center gap-2 bg-blue-600 text-white px-7 py-2.5 rounded-xl font-semibold hover:bg-blue-700 hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5">
          Giriş Yap <ArrowRight size={18} />
        </button>

      </div>
    </header>
  );
};

export default Navbar;