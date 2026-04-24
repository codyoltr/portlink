import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, UserCircle, CheckCircle2 } from 'lucide-react';
import FullPageLayout from '@/features/shell/components/FullPageLayout';
import { useAuthStore } from '../../../store/useAuthStore';

const SignupSubcontractor: React.FC = () => {
  const navigate = useNavigate();
  const { registerSubcontractor } = useAuthStore();
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    if (!name || !phone || !email || !password || !company || !serviceType || !port || !workType) {
      setMessage('Lütfen tüm alanları doldurun.');
      return;
    }
    if (!acceptedTerms) {
      setMessage('Kullanım Şartlarını kabul etmelisiniz.');
      return;
    }
    setLoading(true);
    try {
      // Split service types or tags by comma if user enters them that way, or just send what we have
      const tags = [serviceType, workType].filter(Boolean);
      
      await registerSubcontractor({
        email,
        password,
        fullName: name,
        companyName: company,
        phone,
        expertiseTags: tags
      });
      // After successful registration, navigate to dashboard
      navigate('/dashboard/subcontractor');
    } catch (err: any) {
      setLoading(false);
      setMessage(err.response?.data?.message || 'Kayıt işlemi başarısız.');
    }
  };

  return (
    <FullPageLayout>
      <div className="min-h-screen bg-slate-50 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-100 via-slate-50 to-white text-slate-800 flex flex-col items-center justify-center px-4 py-8 relative">
        
        {/* Dynamic Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[20%] right-[-10%] w-[30%] h-[30%] rounded-full bg-blue-400/10 blur-[120px]" />
          <div className="absolute bottom-[20%] left-[-10%] w-[30%] h-[30%] rounded-full bg-sky-400/10 blur-[120px]" />
        </div>

        <div className="w-full max-w-[640px] z-10 flex flex-col pt-8 pb-12">
          
          {/* Back Button */}
          <button 
            onClick={() => navigate('/signup')} 
            className="group self-start flex items-center gap-2 text-slate-500 hover:text-sky-700 mb-6 transition-colors duration-200"
          >
            <div className="p-2 rounded-full bg-white shadow-sm border border-slate-200 group-hover:bg-sky-50 transition-colors">
              <ArrowLeft size={16} />
            </div>
            <span className="text-sm font-semibold tracking-wide">Geri Dön</span>
          </button>

          {/* Main Card */}
          <div className="rounded-[2.5rem] p-8 md:p-10 bg-white/90 backdrop-blur-xl border border-slate-200 shadow-[0_8px_32px_0_rgba(14,165,233,0.05)] relative overflow-hidden">
            
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sky-400 via-blue-400 to-sky-500" />

            <div className="mb-8 border-b border-slate-100 pb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-xs font-bold uppercase tracking-wide text-sky-700 mb-4">
                <UserCircle size={14} />
                Taşeron Kayıt
              </div>
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Kayıt Formu</h1>
              <p className="text-slate-500 text-sm mt-2 font-medium">Aşağıdaki adımları doldurarak taşeron profilinizi tamamlayın.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="space-y-4">
                <h2 className="text-sm font-extrabold text-slate-600 uppercase tracking-widest flex items-center gap-2">
                  <span className="w-6 h-1 bg-sky-500 rounded-full"></span> 
                  Kullanıcı Bilgileri
                </h2>
                <div className="grid gap-4 md:grid-cols-2">
                  <input placeholder="Ad Soyad" value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 transition-all outline-none shadow-sm" required />
                  <input placeholder="Telefon" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 transition-all outline-none shadow-sm" required />
                  <input type="email" placeholder="E-posta" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 transition-all outline-none shadow-sm" required />
                  <input type="password" placeholder="Şifre" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 transition-all outline-none shadow-sm" required />
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-100">
                <h2 className="text-sm font-extrabold text-slate-600 uppercase tracking-widest flex items-center gap-2">
                  <span className="w-6 h-1 bg-sky-500 rounded-full"></span> 
                  Firma / Servis
                </h2>
                <div className="grid gap-4 md:grid-cols-2">
                  <input placeholder="Firma Adı" value={company} onChange={(e) => setCompany(e.target.value)} className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 transition-all outline-none shadow-sm" required />
                  <input placeholder="Hizmet Türleri" value={serviceType} onChange={(e) => setServiceType(e.target.value)} className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 transition-all outline-none shadow-sm" required />
                  <input placeholder="Hizmet Verilen Liman" value={port} onChange={(e) => setPort(e.target.value)} className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 transition-all outline-none shadow-sm" required />
                  <input placeholder="Çalışma Türü" value={workType} onChange={(e) => setWorkType(e.target.value)} className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-sm font-medium text-slate-800 placeholder:text-slate-400 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 transition-all outline-none shadow-sm" required />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <div className="relative flex items-center justify-center mt-1">
                    <input type="checkbox" checked={acceptedTerms} onChange={(e) => setAcceptedTerms(e.target.checked)} className="peer appearance-none w-5 h-5 rounded border border-slate-300 bg-white checked:bg-sky-500 checked:border-sky-500 transition-colors shadow-sm" />
                    <CheckCircle2 size={14} className="absolute text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" strokeWidth={3} />
                  </div>
                  <span className="text-sm text-slate-600 font-medium leading-relaxed">
                    <a href="#" className="text-sky-600 hover:text-sky-800 hover:underline underline-offset-2">Kullanım Şartları</a>'nı ve <a href="#" className="text-sky-600 hover:text-sky-800 hover:underline underline-offset-2">Gizlilik Politikası</a>'nı okudum, kabul ediyorum.
                  </span>
                </label>
              </div>

              <button type="submit" disabled={loading} className="w-full mt-4 py-4 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold shadow-lg shadow-sky-500/30 transition-all duration-300 transform hover:-translate-y-0.5">
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

export default SignupSubcontractor;