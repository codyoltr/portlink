import React from 'react';
import { useNavigate } from 'react-router-dom';
import FullPageLayout from '@/features/shell/components/FullPageLayout';

const Signup: React.FC = () => {
  const navigate = useNavigate();

  return (
    <FullPageLayout>
      <div className="min-h-screen bg-gradient-to-br from-sky-900 via-blue-800 to-indigo-800 text-white flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-xl bg-white/10 border border-white/20 backdrop-blur rounded-3xl shadow-2xl p-6 md:p-8">
          <div className="text-center mb-6">
            <p className="text-xs uppercase tracking-[0.2em] text-sky-200/80">Yeni Hesap</p>
            <h1 className="mt-2 text-3xl font-bold">Hangi rol ile kaydolmak istiyorsunuz?</h1>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            <button
              onClick={() => navigate('/signup/agent')}
              className="rounded-2xl border border-sky-200/30 bg-white/10 p-4 text-left text-left transition hover:-translate-y-0.5 hover:bg-sky-500/30"
            >
              <p className="text-xs uppercase tracking-wide text-cyan-100">Acente</p>
              <h2 className="mt-1 text-xl font-semibold">Acente Kaydı</h2>
              <p className="mt-1 text-slate-200/80 text-sm">Firma ve yetkili bilgilerinizi girin.</p>
            </button>
            <button
              onClick={() => navigate('/signup/subcontractor')}
              className="rounded-2xl border border-sky-200/30 bg-white/10 p-4 text-left transition hover:-translate-y-0.5 hover:bg-blue-500/30"
            >
              <p className="text-xs uppercase tracking-wide text-blue-100">Taşeron</p>
              <h2 className="mt-1 text-xl font-semibold">Taşeron Kaydı</h2>
              <p className="mt-1 text-slate-200/80 text-sm">Kişisel ve iletişim bilgilerinizi girin.</p>
            </button>
          </div>
          <button
            onClick={() => navigate('/login')}
            className="mt-5 w-full rounded-xl border border-white/30 bg-white/10 py-2 text-sm font-semibold text-white hover:bg-white/20"
          >
            Giriş sayfasına geri dön
          </button>
        </div>
      </div>
    </FullPageLayout>
  );
};

export default Signup;