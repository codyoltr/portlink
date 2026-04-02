import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Mail, Lock, Ship, ArrowRight, UserCircle, Briefcase } from 'lucide-react';
import FullPageLayout from '@/features/shell/components/FullPageLayout';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [role, setRole] = useState<'agent' | 'subcontractor'>(location.state?.role || 'agent');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      localStorage.setItem('is_authenticated', 'true');
      localStorage.setItem('role', role);
      if (role === 'agent') navigate('/dashboard/agent/job-list');
      else navigate('/dashboard/subcontractor');
    }, 600);
  };

  return (
    <FullPageLayout>
      {/* Light Maritime Theme Background */}
      <div className="min-h-screen bg-slate-50 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100 via-slate-50 to-white text-slate-800 flex items-center justify-center px-4 py-8 relative">
        
        {/* Dynamic Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-400/10 blur-[100px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-sky-400/10 blur-[100px]" />
        </div>

        <div className="w-full max-w-[420px] z-10">
          {/* Back Button */}
          <button 
            onClick={() => navigate('/')} 
            className="group flex items-center gap-2 text-slate-500 hover:text-blue-700 mb-6 transition-colors duration-200"
          >
            <div className="p-2 rounded-full bg-white shadow-sm border border-slate-200 group-hover:bg-blue-50 transition-colors">
              <ArrowLeft size={16} />
            </div>
            <span className="text-sm font-semibold tracking-wide">Ana Sayfaya Dön</span>
          </button>

          {/* Main Card */}
          <div className="rounded-[2rem] p-8 md:p-10 bg-white/80 backdrop-blur-xl border border-slate-200 shadow-[0_8px_32px_0_rgba(30,58,138,0.05)] relative overflow-hidden">
            
            {/* Subtle top highlight */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-sky-500 to-blue-600" />

            <div className="flex flex-col items-center mb-8">
              <div className="bg-gradient-to-tr from-blue-600 to-sky-500 p-3.5 rounded-2xl shadow-lg shadow-blue-500/30 mb-5">
                <Ship size={28} className="text-white" strokeWidth={2.5} />
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Hoş Geldiniz</h1>
              <p className="mt-2 text-sm text-slate-500 text-center font-medium">
                Denizcilik ağına giriş yapmak için rolünüzü seçin ve bilgilerinizi girin.
              </p>
            </div>

            {/* Role Switcher */}
            <div className="flex gap-2 mb-8 p-1.5 bg-slate-100/80 rounded-2xl border border-slate-200">
              <button
                type="button"
                onClick={() => setRole('agent')}
                className={`flex-1 flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition-all duration-300 ${
                  role === 'agent' 
                    ? 'bg-white text-blue-700 shadow-md border border-slate-200/50' 
                    : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
                }`}
              >
                <Briefcase size={16} />
                Acente
              </button>
              <button
                type="button"
                onClick={() => setRole('subcontractor')}
                className={`flex-1 flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition-all duration-300 ${
                  role === 'subcontractor' 
                    ? 'bg-white text-blue-700 shadow-md border border-slate-200/50' 
                    : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
                }`}
              >
                <UserCircle size={16} />
                Taşeron
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1.5">
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
                    className="w-full rounded-xl border border-slate-300 bg-white pl-11 pr-4 py-3.5 text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none font-medium shadow-sm"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 ml-1 uppercase tracking-wider">Şifre</label>
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
                    className="w-full rounded-xl border border-slate-300 bg-white pl-11 pr-4 py-3.5 text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none font-medium shadow-sm"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full group mt-4 py-4 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold shadow-lg shadow-blue-500/30 transition-all duration-300 transform hover:-translate-y-0.5"
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

            <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col items-center gap-2">
              <p className="text-sm font-medium text-slate-500">
                Portlink'te henüz hesabınız yok mu?
              </p>
              <button
                type="button"
                onClick={() => navigate('/signup')}
                className="text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors"
              >
                Yeni Hesap Oluşturun
              </button>
            </div>

          </div>
        </div>
      </div>
    </FullPageLayout>
  );
};

export default Login;
