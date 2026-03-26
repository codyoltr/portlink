import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FullPageLayout from '@/features/shell/components/FullPageLayout';

const SignupSubcontractor: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [company, setCompany] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [port, setPort] = useState('');
  const [workType, setWorkType] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !email || !password || !company || !serviceType || !port || !workType) {
      setMessage('Lütfen tüm alanları doldurun.');
      return;
    }
    if (!acceptedTerms) {
      setMessage('Kullanım Şartlarını kabul etmelisiniz.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate('/login');
    }, 700);
  };

  return (
    <FullPageLayout>
      <div className="min-h-screen bg-gradient-to-br from-sky-900 via-blue-800 to-indigo-900 text-white flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-2xl bg-white/10 border border-white/20 backdrop-blur rounded-3xl p-6 md:p-8 shadow-2xl">
          <div className="mb-4">
            <p className="text-xs uppercase tracking-[0.2em] text-sky-200/80">Taşeron Kayıt</p>
            <h1 className="mt-2 text-3xl font-bold">Taşeron Hesabı Oluştur</h1>
            <p className="text-slate-200/80 mt-1">Aşağıdaki adımları doldurun ve kaydınızı tamamlayın.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-slate-100">
            <div className="rounded-2xl bg-sky-900/30 border border-white/20 p-4">
              <h2 className="text-lg font-semibold">👤 Kullanıcı Bilgileri</h2>
              <div className="mt-2 grid gap-2 md:grid-cols-2">
                <input
                  placeholder="Ad Soyad"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="rounded-xl border border-white/20 bg-slate-900/50 px-3 py-2 outline-none"
                  required
                />
                <input
                  placeholder="Telefon"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="rounded-xl border border-white/20 bg-slate-900/50 px-3 py-2 outline-none"
                  required
                />
                <input
                  type="email"
                  placeholder="E-posta"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-xl border border-white/20 bg-slate-900/50 px-3 py-2 outline-none"
                  required
                />
                <input
                  type="password"
                  placeholder="Şifre"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="rounded-xl border border-white/20 bg-slate-900/50 px-3 py-2 outline-none"
                  required
                />
              </div>
            </div>

            <div className="rounded-2xl bg-sky-900/30 border border-white/20 p-4">
              <h2 className="text-lg font-semibold">🏢 Firma / Servis</h2>
              <div className="mt-2 grid gap-2 md:grid-cols-2">
                <input
                  placeholder="Firma Adı"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="rounded-xl border border-white/20 bg-slate-900/50 px-3 py-2 outline-none"
                  required
                />
                <input
                  placeholder="Hizmet Türleri"
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                  className="rounded-xl border border-white/20 bg-slate-900/50 px-3 py-2 outline-none"
                  required
                />
                <input
                  placeholder="Hizmet Verilen Liman"
                  value={port}
                  onChange={(e) => setPort(e.target.value)}
                  className="rounded-xl border border-white/20 bg-slate-900/50 px-3 py-2 outline-none"
                  required
                />
                <input
                  placeholder="Çalışma Türü"
                  value={workType}
                  onChange={(e) => setWorkType(e.target.value)}
                  className="rounded-xl border border-white/20 bg-slate-900/50 px-3 py-2 outline-none"
                  required
                />
              </div>
            </div>

            <div className="rounded-2xl bg-sky-900/30 border border-white/20 p-4">
              <h2 className="text-lg font-semibold">📄 Onay</h2>
              <div className="mt-2 flex items-start gap-2">
                <input
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-white/50 text-sky-500 focus:ring-2 focus:ring-sky-300"
                />
                <label className="text-sm">
                  Kullanım Şartları'nı ve Gizlilik Politikası'nı okudum, kabul ediyorum.
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl py-2 bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold hover:opacity-90"
            >
              {loading ? 'Kaydediliyor...' : 'Kaydet ve Girişe Dön'}
            </button>

            {message && <p className="text-rose-200 text-sm">{message}</p>}
          </form>

          <div className="mt-3 flex gap-2 text-xs text-sky-200">
            <button onClick={() => navigate('/signup')} className="hover:text-white">Rol seçimine dön</button>
            <button onClick={() => navigate('/login')} className="hover:text-white">Giriş sayfasına dön</button>
          </div>
        </div>
      </div>
    </FullPageLayout>
  );
};

export default SignupSubcontractor;