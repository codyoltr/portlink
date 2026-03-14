import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FullPageLayout from '@/features/shell/components/FullPageLayout';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState<'agent' | 'subcontractor'>('agent');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (role === 'agent') navigate('/dashboard/agent');
      else navigate('/dashboard/subcontractor');
    }, 600);
  };

  return (
    <FullPageLayout>
      <div className="min-h-screen bg-gradient-to-br from-sky-800 via-blue-700 to-indigo-800 text-white flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md">
          <div className="rounded-3xl p-6 md:p-8 bg-white/10 backdrop-blur border border-white/20 shadow-2xl">
            <div className="mb-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-xs font-semibold uppercase tracking-wide">
                <span className="h-2 w-2 rounded-full bg-emerald-300 animate-pulse" />
                Portlink
              </div>
              <h1 className="mt-4 text-3xl font-bold tracking-tight">Hoşgeldiniz!</h1>
              <p className="mt-2 text-slate-200/90">Acente ya da taşeron olarak giriş yapın.</p>
            </div>

            <div className="flex gap-2 mb-4">
              <button
                type="button"
                onClick={() => setRole('agent')}
                className={`flex-1 rounded-xl px-3 py-2 font-semibold ${role === 'agent' ? 'bg-blue-500 text-white' : 'bg-white/20 text-slate-100 hover:bg-white/30'}`}
              >
                Acente
              </button>
              <button
                type="button"
                onClick={() => setRole('subcontractor')}
                className={`flex-1 rounded-xl px-3 py-2 font-semibold ${role === 'subcontractor' ? 'bg-blue-500 text-white' : 'bg-white/20 text-slate-100 hover:bg-white/30'}`}
              >
                Taşeron
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm text-slate-100">E-posta</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1 w-full rounded-xl border border-white/20 bg-slate-900/40 px-3 py-2 text-white placeholder:text-slate-300 focus:border-blue-300 focus:ring-2 focus:ring-blue-400 outline-none"
                />
              </div>
              <div>
                <label className="text-sm text-slate-100">Şifre</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="mt-1 w-full rounded-xl border border-white/20 bg-slate-900/40 px-3 py-2 text-white placeholder:text-slate-300 focus:border-blue-300 focus:ring-2 focus:ring-blue-400 outline-none"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-1 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold shadow-lg hover:opacity-95"
              >
                {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
              </button>
            </form>

            <p className="mt-4 text-xs text-slate-200/90 text-center">
              Hesabınız yok mu?{' '}
              <button
                type="button"
                onClick={() => navigate('/signup')}
                className="font-semibold text-sky-200 hover:text-white"
              >
                Hemen Kaydolun
              </button>
            </p>
          </div>
        </div>
      </div>
    </FullPageLayout>
  );
};

export default Login;
