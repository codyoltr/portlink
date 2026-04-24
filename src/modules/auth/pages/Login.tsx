import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Mail, Lock, Ship, ArrowRight, UserCircle, Briefcase, Anchor } from 'lucide-react';
import { useAuthStore } from '../../../store/useAuthStore';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  
  // URL'den rolü kesin olarak belirliyoruz (Artık sekme yok)
  const role = pathname.includes('/subcontractor') ? 'subcontractor' : 'agent';

  const { login, logout } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const user = await login({ email, password });
      
      // Kullanıcının seçtiği rol (sekme) ile backend'den dönen gerçek rol uyuşmuyorsa:
      if (user.role !== role) {
        logout(false); // Yanlış sekmeden girdiği için token'ı temizle, ancak sayfayı yönlendirme!
        setLoading(false);
        setError(`Bu hesap bir ${user.role === 'agent' ? 'Acente' : 'Taşeron'} hesabıdır. Lütfen doğru giriş sekmesini kullanın.`);
        return;
      }
      
      // Rol uyuyorsa kendi paneline yönlendir:
      if (user.role === 'agent') navigate('/dashboard/agent/job-list');
      else navigate('/dashboard/subcontractor');
      
    } catch (err: any) {
      setLoading(false);
      setError(err.response?.data?.message || 'Giriş başarısız, bilgileri kontrol edin.');
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-white text-slate-800">
      {/* Left Panel - Branding & Welcome Message */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 p-12 bg-gradient-to-br from-blue-900 via-blue-800 to-sky-900 text-white relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-400/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-sky-400/20 blur-[120px]" />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-10">
            <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20">
              <Ship size={32} className="text-white" strokeWidth={2.5} />
            </div>
            <span className="text-3xl font-black tracking-tight">Portlink</span>
          </div>

          <div className="mt-20">
            <h1 className="text-5xl font-extrabold tracking-tight leading-tight mb-6">
              Portlink'e<br />Hoş Geldiniz
            </h1>
            <p className="text-lg text-blue-100 font-medium max-w-md leading-relaxed">
              Denizcilik sektöründeki tüm operasyonlarınızı ve iletişim ağınızı tek bir noktadan, güvenle yönetin.
            </p>
          </div>
        </div>

        <div className="relative z-10 flex items-center gap-4 text-blue-200/80 text-sm font-medium">
          <Anchor size={20} />
          <span>Güvenilir Liman Çözümleri</span>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex flex-col justify-center w-full lg:w-1/2 px-6 sm:px-12 md:px-24 py-12">
        <div className="w-full max-w-[440px] mx-auto">
          {/* Back Button */}
          <button 
            onClick={() => navigate('/')} 
            className="group flex items-center gap-2 text-slate-500 hover:text-blue-700 mb-10 transition-colors duration-200 w-fit"
          >
            <div className="p-2 rounded-full bg-slate-50 border border-slate-200 group-hover:bg-blue-50 transition-colors">
              <ArrowLeft size={16} />
            </div>
            <span className="text-sm font-semibold tracking-wide">Ana Sayfaya Dön</span>
          </button>

          <div className="mb-8">
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 mb-2">
              {role === 'agent' ? 'Acente Girişi' : 'Taşeron Girişi'}
            </h2>
            <p className="text-slate-500 font-medium">Hizmetlerinize erişmek için lütfen giriş yapın.</p>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm font-semibold">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-600 ml-1 uppercase tracking-wider">E-posta Adresi</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="ornek@sirket.com"
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 pl-11 pr-4 py-4 text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none font-medium"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between ml-1">
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Şifre</label>
                <a href="#" className="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors">Şifremi Unuttum</a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 pl-11 pr-4 py-4 text-slate-800 placeholder:text-slate-400 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none font-medium"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full group mt-2 py-4 flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg shadow-blue-500/20 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              {loading ? (
                <span className="animate-pulse">Giriş Yapılıyor...</span>
              ) : (
                <>
                  Giriş Yap
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-10 flex items-center justify-center gap-2 font-medium">
            <span className="text-slate-500">Portlink'te yeni misiniz?</span>
            <button
              type="button"
              onClick={() => navigate('/signup')}
              className="font-bold text-blue-600 hover:text-blue-800 transition-colors bg-blue-50 px-3 py-1.5 rounded-lg"
            >
              Kayıt Ol
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

