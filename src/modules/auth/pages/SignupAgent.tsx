import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Briefcase, CheckCircle2 } from 'lucide-react';
import FullPageLayout from '@/features/shell/components/FullPageLayout';

const SignupAgent: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [company, setCompany] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [taxNumber, setTaxNumber] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !password || !company || !country || !city || !taxNumber) {
      setMessage('Lütfen tüm alanları doldurun.');
      return;
    }
    if (!acceptedTerms) {
      setMessage('Kullanım Şartları ve Gizlilik Politikası\'nı kabul etmelisiniz.');
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
      <div className="min-h-screen bg-slate-50 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100 via-slate-50 to-white text-slate-800 flex flex-col items-center justify-center px-4 py-8 relative">
        
        {/* Dynamic Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[20%] left-[-10%] w-[30%] h-[30%] rounded-full bg-blue-400/10 blur-[120px]" />
          <div className="absolute bottom-[20%] right-[-10%] w-[30%] h-[30%] rounded-full bg-sky-400/10 blur-[120px]" />
        </div>

        <div className="w-full max-w-[640px] z-10 flex flex-col pt-8 pb-12">
          
          {/* Back Button */}
          <button 
            onClick={() => navigate('/signup')} 
            className="group self-start flex items-center gap-2 text-slate-500 hover:text-blue-700 mb-6 transition-colors duration-200"
          >
            <div className="p-2 rounded-full bg-white shadow-sm border border-slate-200 group-hover:bg-blue-50 transition-colors">
              <ArrowLeft size={16} />
            </div>
            <span className="text-sm font-semibold tracking-wide">Geri Dön</span>
          </button>

          {/* Main Card */}
          <div className="rounded-[2.5rem] p-8 md:p-10 bg-white/90 backdrop-blur-xl border border-slate-200 shadow-[0_8px_32px_0_rgba(30,58,138,0.05)] relative overflow-hidden">
            
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-sky-500 to-blue-600" />

            <div className="mb-8 border-b border-slate-100 pb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-bold uppercase tracking-wide text-blue-700 mb-4">
                <Briefcase size={14} />
                Acente Kayıt
              </div>
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Kayıt Formu</h1>
              <p className="text-slate-500 text-sm mt-2 font-medium">Aşağıdaki bilgileri eksiksiz doldurarak acente profilinizi oluşturun.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="space-y-4">
                <h2 className="text-sm font-extrabold text-slate-600 uppercase tracking-widest flex items-center gap-2">
                  <span className="w-6 h-1 bg-blue-600 rounded-full"></span> 
                  Kullanıcı Bilgileri
                </h2>
                <div className="grid gap-4 md:grid-cols-2">
                  <input placeholder="Ad Soyad" value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none shadow-sm" required />
                  <input placeholder="Telefon" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none shadow-sm" required />
                  <input type="email" placeholder="E-posta" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none shadow-sm" required />
                  <input type="password" placeholder="Şifre" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none shadow-sm" required />
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-100">
                <h2 className="text-sm font-extrabold text-slate-600 uppercase tracking-widest flex items-center gap-2">
                  <span className="w-6 h-1 bg-blue-600 rounded-full"></span> 
                  Firma Bilgileri
                </h2>
                <div className="grid gap-4 md:grid-cols-2">
                  <input placeholder="Firma Adı" value={company} onChange={(e) => setCompany(e.target.value)} className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none shadow-sm" required />
                  <input placeholder="Ülke" value={country} onChange={(e) => setCountry(e.target.value)} className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none shadow-sm" required />
                  <input placeholder="Şehir" value={city} onChange={(e) => setCity(e.target.value)} className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none shadow-sm" required />
                  <input placeholder="Vergi No" value={taxNumber} onChange={(e) => setTaxNumber(e.target.value)} className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none shadow-sm" required />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <div className="relative flex items-center justify-center mt-1">
                    <input type="checkbox" checked={acceptedTerms} onChange={(e) => setAcceptedTerms(e.target.checked)} className="peer appearance-none w-5 h-5 rounded border border-slate-300 bg-white checked:bg-blue-600 checked:border-blue-600 transition-colors shadow-sm" />
                    <CheckCircle2 size={14} className="absolute text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" strokeWidth={3} />
                  </div>
                  <span className="text-sm text-slate-600 font-medium leading-relaxed">
                    <a href="#" className="text-blue-600 hover:text-blue-800 hover:underline underline-offset-2">Kullanım Şartları</a>'nı ve <a href="#" className="text-blue-600 hover:text-blue-800 hover:underline underline-offset-2">Gizlilik Politikası</a>'nı okudum, kabul ediyorum.
                  </span>
                </label>
              </div>

              <button type="submit" disabled={loading} className="w-full mt-4 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold shadow-lg shadow-blue-500/30 transition-all duration-300 transform hover:-translate-y-0.5">
                {loading ? 'Kaydediliyor...' : 'Kaydet ve İlerle'}
              </button>

              {message && (
                <div className="mt-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-sm text-center font-bold">
                  {message}
                </div>
              )}
            </form>

          </div>
        </div>
      </div>
    </FullPageLayout>
  );
};

export default SignupAgent;