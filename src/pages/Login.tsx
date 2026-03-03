import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FullPageLayout from '../components/FullPageLayout';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [selectedRole, setSelectedRole] = useState<'agent' | 'subcontractor' | 'captain'>('agent');

  const handleRoleSelectionAndLogin = (role: 'agent' | 'subcontractor' | 'captain') => {
    setSelectedRole(role);
    setIsLoading(true);
    let autoEmail = '';

    if (role === 'agent') autoEmail = 'acente@portlink.com';
    else if (role === 'subcontractor') autoEmail = 'taseron@portlink.com';
    else if (role === 'captain') autoEmail = 'kaptan@portlink.com';

    setEmail(autoEmail);
    setPassword('demo1234');

    localStorage.removeItem('demoMode');

    setTimeout(() => {
      setIsLoading(false);
      if (role === 'agent') navigate('/dashboard/agent');
      else if (role === 'subcontractor') navigate('/dashboard/subcontractor');
      else if (role === 'captain') navigate('/dashboard/captain');
    }, 1000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (isForgotPassword) {
      setTimeout(() => {
        setIsLoading(false);
        setResetSent(true);
      }, 1000);
      return;
    }

    localStorage.removeItem('demoMode'); // Normal girişte demo modunu kapat

    // Simüle edilmiş login işlemi
    setTimeout(() => {
      setIsLoading(false);
      if (selectedRole === 'agent') {
        navigate('/dashboard/agent');
      } else if (selectedRole === 'subcontractor') {
        navigate('/dashboard/subcontractor');
      } else if (selectedRole === 'captain') {
        navigate('/dashboard/captain');
      } else {
        navigate('/home');
      }
    }, 1000);
  };

  return (
    <FullPageLayout>
      <main className="flex-1 w-full flex items-center justify-center px-4 sm:px-6 py-8 sm:py-12 overflow-y-auto">
        <div className="w-full max-w-md">
          {/* Logo and Back Button */}
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-slate-600 dark:text-slate-300 hover:text-primary transition-colors"
            >
              <span className="material-icons-round">arrow_back</span>
              <span className="font-medium">Ana Sayfa</span>
            </button>
          </div>

          {/* Login Card */}
          <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-slate-200/50 dark:border-slate-700/50 p-8 md:p-10 transition-all duration-300">
            {/* Logo */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-primary rounded-2xl shadow-lg shadow-primary/20 mb-4">
                <span className="material-icons-round text-white text-4xl">
                  {isForgotPassword ? 'lock_reset' : 'directions_boat'}
                </span>
              </div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                {isForgotPassword ? 'Şifremi Unuttum' : 'Hoş Geldiniz'}
              </h1>
              <p className="text-slate-600 dark:text-slate-400">
                {isForgotPassword
                  ? 'E-posta adresinizi girin, size sıfırlama bağlantısı gönderelim.'
                  : 'Hesabınıza giriş yapın veya yeni hesap oluşturun'}
              </p>
            </div>

            {/* Role Selection Tabs */}
            {!isForgotPassword && !resetSent && (
              <div className="flex bg-slate-100 dark:bg-slate-700/50 p-1.5 rounded-xl mb-8">
                <button
                  type="button"
                  onClick={() => handleRoleSelectionAndLogin('agent')}
                  className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${selectedRole === 'agent'
                    ? 'bg-white dark:bg-slate-800 text-primary shadow-sm'
                    : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
                    }`}
                >
                  Acente
                </button>
                <button
                  type="button"
                  onClick={() => handleRoleSelectionAndLogin('subcontractor')}
                  className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${selectedRole === 'subcontractor'
                    ? 'bg-white dark:bg-slate-800 text-primary shadow-sm'
                    : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
                    }`}
                >
                  Taşeron
                </button>
                <button
                  type="button"
                  onClick={() => handleRoleSelectionAndLogin('captain')}
                  className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${selectedRole === 'captain'
                    ? 'bg-white dark:bg-slate-800 text-primary shadow-sm'
                    : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
                    }`}
                >
                  Kaptan
                </button>
              </div>
            )}

            {resetSent ? (
              <div className="text-center space-y-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full mb-2">
                  <span className="material-icons-round text-3xl">mark_email_read</span>
                </div>
                <h3 className="text-xl font-bold dark:text-white">Bağlantı Gönderildi!</h3>
                <p className="text-slate-500 text-sm">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">{email}</span> adresine şifre sıfırlama talimatlarını gönderdik. Lütfen gelen kutunuzu kontrol edin.
                </p>
                <button
                  onClick={() => {
                    setResetSent(false);
                    setIsForgotPassword(false);
                  }}
                  className="w-full py-4 bg-slate-100 dark:bg-slate-700/50 text-slate-700 dark:text-slate-300 rounded-xl font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
                >
                  Giriş Ekranına Dön
                </button>
              </div>
            ) : (
              <>
                {/* Login Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                      E-posta Adresi
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 material-icons-round text-slate-400">
                        email
                      </span>
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-slate-900 dark:text-white placeholder:text-slate-400"
                        placeholder="ornek@email.com"
                      />
                    </div>
                  </div>

                  {!isForgotPassword && (
                    <div>
                      <label htmlFor="password" className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                        Şifre
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 material-icons-round text-slate-400">
                          lock
                        </span>
                        <input
                          id="password"
                          type={showPassword ? 'text' : 'password'}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          className="w-full pl-12 pr-12 py-3.5 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none text-slate-900 dark:text-white placeholder:text-slate-400"
                          placeholder="••••••••"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                        >
                          <span className="material-icons-round">
                            {showPassword ? 'visibility_off' : 'visibility'}
                          </span>
                        </button>
                      </div>
                    </div>
                  )}

                  {!isForgotPassword && (
                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary/20"
                        />
                        <span className="text-sm text-slate-600 dark:text-slate-400">Beni hatırla</span>
                      </label>
                      <button
                        type="button"
                        onClick={() => setIsForgotPassword(true)}
                        className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                        Şifremi Unuttum
                      </button>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-4 bg-primary text-white rounded-xl font-bold text-lg hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <span className="material-icons-round animate-spin">refresh</span>
                        {isForgotPassword ? 'Gönderiliyor...' : 'Giriş yapılıyor...'}
                      </>
                    ) : (
                      <>
                        {isForgotPassword ? 'Sıfırlama Bağlantısı Gönder' : 'Giriş Yap'}
                        <span className="material-icons-round">
                          {isForgotPassword ? 'send' : 'arrow_forward'}
                        </span>
                      </>
                    )}
                  </button>

                  {isForgotPassword && (
                    <button
                      type="button"
                      onClick={() => setIsForgotPassword(false)}
                      className="w-full py-4 bg-transparent text-slate-600 dark:text-slate-400 font-semibold hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
                    >
                      İptal Et ve Geri Dön
                    </button>
                  )}
                </form>
              </>
            )}

            {!isForgotPassword && (
              <>
                {/* Divider */}
                <div className="relative my-8">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200 dark:border-slate-700"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white dark:bg-slate-800 text-slate-500">veya</span>
                  </div>
                </div>

                {/* Social Login and Demo */}
                <div className="space-y-3">
                  <button
                    type="button"
                    onClick={() => {
                      setIsLoading(true);
                      localStorage.setItem('demoMode', 'true');
                      setTimeout(() => {
                        setIsLoading(false);
                        navigate('/home');
                      }, 500);
                    }}
                    className="w-full py-3.5 bg-emerald-50 dark:bg-emerald-900/30 border-2 border-emerald-200 dark:border-emerald-800 rounded-xl font-semibold text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-all flex items-center justify-center gap-3"
                  >
                    <span className="material-icons-round">play_circle</span>
                    Hızlı Demo Girişi (Şifresiz)
                  </button>
                  <button type="button" className="w-full py-3.5 bg-white dark:bg-slate-700 border-2 border-slate-200 dark:border-slate-600 rounded-xl font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-600 transition-all flex items-center justify-center gap-3">
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    Google ile Giriş Yap
                  </button>
                </div>

                {/* Sign Up Link */}
                <div className="mt-8 text-center">
                  <p className="text-slate-600 dark:text-slate-400">
                    Hesabınız yok mu?{' '}
                    <button
                      onClick={() => navigate('/home')}
                      className="font-semibold text-primary hover:text-primary/80 transition-colors"
                    >
                      Hemen Kaydolun
                    </button>
                  </p>
                </div>
              </>
            )}
            {/* End of !isForgotPassword block */}
          </div>

          {/* Additional Info */}
          <div className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
            <p>
              Giriş yaparak{' '}
              <a href="#" className="text-primary hover:underline">Kullanım Koşulları</a>
              {' '}ve{' '}
              <a href="#" className="text-primary hover:underline">Gizlilik Politikası</a>
              'nı kabul etmiş olursunuz.
            </p>
          </div>
        </div>
      </main>
    </FullPageLayout >
  );
};

export default Login;
