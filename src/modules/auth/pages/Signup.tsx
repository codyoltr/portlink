import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Briefcase, UserCircle, ArrowRight, Ship } from 'lucide-react';
import FullPageLayout from '@/features/shell/components/FullPageLayout';

const Signup: React.FC = () => {
  const navigate = useNavigate();

  return (
    <FullPageLayout>
      <div className="min-h-screen bg-slate-50 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100 via-slate-50 to-white text-slate-800 flex flex-col items-center justify-center px-4 py-8 relative">
        
        {/* Dynamic Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[10%] right-[-5%] w-[30%] h-[30%] rounded-full bg-blue-400/10 blur-[100px]" />
          <div className="absolute bottom-[10%] left-[-5%] w-[30%] h-[30%] rounded-full bg-sky-400/10 blur-[100px]" />
        </div>

        <div className="w-full max-w-[560px] z-10 flex flex-col">
          
          {/* Back Button */}
          <button 
            onClick={() => navigate('/')} 
            className="group self-start flex items-center gap-2 text-slate-500 hover:text-blue-700 mb-6 transition-colors duration-200"
          >
            <div className="p-2 rounded-full bg-white shadow-sm border border-slate-200 group-hover:bg-blue-50 transition-colors">
              <ArrowLeft size={16} />
            </div>
            <span className="text-sm font-semibold tracking-wide">Ana Sayfaya Dön</span>
          </button>

          {/* Main Card */}
          <div className="rounded-[2.5rem] p-8 md:p-12 bg-white/80 backdrop-blur-xl border border-slate-200 shadow-[0_8px_32px_0_rgba(30,58,138,0.05)] relative overflow-hidden">
            
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-sky-500 to-blue-600" />

            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center p-3.5 rounded-2xl bg-gradient-to-tr from-blue-600 to-sky-500 shadow-lg shadow-blue-500/30 mb-5">
                <Ship size={28} className="text-white" strokeWidth={2.5} />
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 mb-3">Hesap Oluştur</h1>
              <p className="text-slate-500 text-sm font-medium">
                Denizcilik ağına katılmak için ilerlemek istediğiniz rolü seçin.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 mb-8">
              {/* Agent Card */}
              <button
                onClick={() => navigate('/signup/agent')}
                className="group relative flex flex-col text-left p-6 rounded-3xl border border-slate-200 bg-white hover:bg-slate-50 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300"
              >
                <div className="absolute top-4 right-4 text-slate-300 group-hover:text-blue-600 transition-colors">
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </div>
                <div className="p-3 bg-blue-50 w-fit rounded-xl mb-5 group-hover:bg-blue-100 transition-colors">
                  <Briefcase className="text-blue-600" size={24} />
                </div>
                <h2 className="text-lg font-bold text-slate-900 mb-2">Acente</h2>
                <p className="text-xs font-medium text-slate-500 leading-relaxed">
                  Firma ve yetkili bilgileriniz ile kurumsal ağımıza dahil olun.
                </p>
              </button>

              {/* Subcontractor Card */}
              <button
                onClick={() => navigate('/signup/subcontractor')}
                className="group relative flex flex-col text-left p-6 rounded-3xl border border-slate-200 bg-white hover:bg-slate-50 hover:border-sky-400 hover:shadow-lg hover:shadow-sky-500/10 transition-all duration-300"
              >
                <div className="absolute top-4 right-4 text-slate-300 group-hover:text-sky-600 transition-colors">
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </div>
                <div className="p-3 bg-sky-50 w-fit rounded-xl mb-5 group-hover:bg-sky-100 transition-colors">
                  <UserCircle className="text-sky-600" size={24} />
                </div>
                <h2 className="text-lg font-bold text-slate-900 mb-2">Taşeron</h2>
                <p className="text-xs font-medium text-slate-500 leading-relaxed">
                  Becerilerinizi belirterek projelere hızlıca teklif vermeye başlayın.
                </p>
              </button>
            </div>

            <div className="pt-6 border-t border-slate-100 text-center">
              <p className="text-sm font-medium text-slate-500">
                Zaten bir hesabınız var mı?
              </p>
              <button
                onClick={() => navigate('/login')}
                className="mt-2 text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors"
              >
                Giriş Yapın
              </button>
            </div>

          </div>
        </div>
      </div>
    </FullPageLayout>
  );
};

export default Signup;