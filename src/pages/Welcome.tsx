import React from 'react';
import { useNavigate } from 'react-router-dom';
import FullPageLayout from '../components/FullPageLayout';

const Welcome: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: 'anchor',
      title: 'Güvenilir Ağ',
      description: 'Denizcilik sektöründe güvenilir ve profesyonel hizmet sağlayıcıları ile bağlantı kurun.'
    },
    {
      icon: 'speed',
      title: 'Hızlı Eşleştirme',
      description: 'İhtiyaçlarınıza en uygun çözüm ortağını hızlı ve kolay bir şekilde bulun.'
    },
    {
      icon: 'verified',
      title: 'Doğrulanmış Profiller',
      description: 'Tüm hizmet sağlayıcıları titizlikle incelenmiş ve doğrulanmış profesyonellerdir.'
    },
    {
      icon: 'language',
      title: 'Global Kapsam',
      description: 'Dünya çapında limanlar ve denizcilik hizmetlerine erişim sağlayın.'
    }
  ];

  return (
    <FullPageLayout>
      {/* Header */}
      <header className="w-full py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200/50 dark:border-slate-700/50 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="bg-primary p-2 rounded-xl shadow-lg shadow-primary/20">
            <span className="material-icons-round text-white text-3xl">directions_boat</span>
          </div>
          <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            Portlink
          </span>
        </div>
        <div className="flex items-center gap-6">
          <button
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-slate-600 dark:text-slate-300 hover:text-primary transition-colors font-medium">
            Hakkımızda
          </button>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-slate-600 dark:text-slate-300 hover:text-primary transition-colors font-medium">
            İletişim
          </button>
          <button
            onClick={() => navigate('/login')}
            className="px-6 py-2.5 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-all shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 transform hover:scale-105"
          >
            Giriş Yap
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 dark:bg-primary/20 rounded-full text-primary font-semibold text-sm">
              <span className="material-icons-round text-base">rocket_launch</span>
              Denizcilik Sektörünün Dijital Platformu
            </div>
            <h1 className="text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white leading-tight">
              Denizcilik Hizmetlerinde
              <span className="block bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                Doğru Eşleştirme
              </span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
              Taşeron, yerel acente, teknik uzman ve iş ortaklığı ihtiyaçlarınız için profesyonel çözüm ortağı bulun.
              Portlink ile denizcilik sektöründe güvenilir bağlantılar kurun.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigate('/login')}
                className="px-8 py-4 bg-primary text-white rounded-xl font-bold text-lg hover:bg-primary/90 transition-all shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/30 transform hover:scale-105"
              >
                Hemen Başla
                <span className="material-icons-round ml-2 align-middle">arrow_forward</span>
              </button>
              <button className="px-8 py-4 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-xl font-semibold text-lg border-2 border-slate-200 dark:border-slate-700 hover:border-primary transition-all">
                Daha Fazla Bilgi
              </button>
            </div>
            <div className="flex items-center gap-8 pt-4">
              <div>
                <div className="text-3xl font-bold text-slate-900 dark:text-white">500+</div>
                <div className="text-sm text-slate-500 dark:text-slate-400">Aktif Kullanıcı</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-slate-900 dark:text-white">1000+</div>
                <div className="text-sm text-slate-500 dark:text-slate-400">Tamamlanan Proje</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-slate-900 dark:text-white">50+</div>
                <div className="text-sm text-slate-500 dark:text-slate-400">Ülke</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="relative z-10 bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-2xl border border-slate-200/50 dark:border-slate-700/50">
              <div className="aspect-square bg-gradient-to-br from-primary/10 to-blue-500/10 rounded-2xl flex items-center justify-center">
                <span className="material-icons-round text-9xl text-primary/30">directions_boat</span>
              </div>
            </div>
            <div className="absolute -top-6 -right-6 w-72 h-72 bg-primary/20 rounded-full blur-3xl -z-10"></div>
            <div className="absolute -bottom-6 -left-6 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl -z-10"></div>
          </div>
        </div>

        {/* Features Section */}
        <div id="about" className="mb-24 scroll-mt-24">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Neden Portlink? (Hakkımızda)
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Denizcilik sektöründe ihtiyacınız olan tüm hizmetlere tek platformdan erişin
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-primary transition-all hover:shadow-xl hover:shadow-primary/5 group"
              >
                <div className="w-14 h-14 bg-primary/10 dark:bg-primary/20 rounded-xl flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                  <span className="material-icons-round text-3xl">{feature.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-primary to-blue-600 rounded-3xl p-12 text-center text-white relative overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
          <div className="relative z-10">
            <h2 className="text-4xl font-bold mb-4">Hazır mısınız?</h2>
            <p className="text-xl mb-8 opacity-90">
              Portlink'e katılın ve denizcilik sektöründe yeni fırsatlar keşfedin
            </p>
            <button
              onClick={() => navigate('/login')}
              className="px-10 py-4 bg-white text-primary rounded-xl font-bold text-lg hover:bg-slate-50 transition-all shadow-xl transform hover:scale-105"
            >
              Ücretsiz Başlayın
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer id="contact" className="w-full bg-slate-900 text-slate-400 py-12 mt-auto flex-shrink-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-primary p-1.5 rounded-lg">
                  <span className="material-icons-round text-white text-xl">directions_boat</span>
                </div>
                <span className="text-xl font-bold text-white">Portlink</span>
              </div>
              <p className="text-sm leading-relaxed">
                Denizcilik sektöründe güvenilir bağlantılar kuran dijital platform.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Hızlı Linkler</h4>
              <ul className="space-y-2 text-sm">
                <li><button onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors">Hakkımızda</button></li>
                <li><span className="text-slate-500 cursor-not-allowed" title="Çok Yakında">Hizmetler (Yakında)</span></li>
                <li><span className="text-slate-500 cursor-not-allowed" title="Çok Yakında">Fiyatlandırma (Yakında)</span></li>
                <li><span className="text-slate-500 cursor-not-allowed" title="Çok Yakında">Blog (Yakında)</span></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Destek</h4>
              <ul className="space-y-2 text-sm">
                <li><span className="text-slate-500 cursor-not-allowed" title="Çok Yakında">Yardım Merkezi (Yakında)</span></li>
                <li><button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors">İletişim</button></li>
                <li><span className="text-slate-500 cursor-not-allowed" title="Çok Yakında">Gizlilik Politikası (Yakında)</span></li>
                <li><span className="text-slate-500 cursor-not-allowed" title="Çok Yakında">Kullanım Koşulları (Yakında)</span></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">İletişim Bilgileri</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <span className="material-icons-round text-base">email</span>
                  <a href="mailto:info@portlink.com" className="hover:text-white transition-colors">info@portlink.com</a>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-icons-round text-base">phone</span>
                  <a href="tel:+902121234567" className="hover:text-white transition-colors">+90 (212) 123 45 67</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center text-sm">
            <p>© 2024 Portlink Maritime Marketplace. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </footer>
    </FullPageLayout>
  );
};

export default Welcome;
