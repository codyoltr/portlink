import React from 'react';

const Footer = () => {
  return (
    <footer id="contact" className="w-full bg-slate-900 border-t border-slate-800 text-slate-400 py-16 mt-auto flex-shrink-0 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          <div className="space-y-6">
            <div className="flex items-center gap-3 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <div className="bg-primary/10 p-2.5 rounded-xl border border-primary/20 group-hover:bg-primary group-hover:border-primary transition-all duration-300">
                <span className="material-icons-round text-primary group-hover:text-white text-2xl transition-colors">directions_boat</span>
              </div>
              <span className="text-2xl font-bold text-white tracking-tight">Portlink</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
              Denizcilik sektöründe güvenilir bağlantılar kuran, operasyonlarınızı hızlandıran dijital pazar yeri.
            </p>

            <div className="flex gap-4 pt-2">
              <a href="#" aria-label="Instagram" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-pink-600 hover:text-white transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-pink-500/25">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" aria-label="LinkedIn" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-blue-500/25">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" aria-label="X (Twitter)" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-slate-900 hover:text-white transition-all duration-300 hover:-translate-y-1 shadow-lg border border-transparent hover:border-slate-700">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.005 4.15H5.059z" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6 flex items-center gap-2">
              <span className="w-3 h-px bg-primary"></span> Hızlı Linkler
            </h4>
            <ul className="space-y-4 text-sm">
              <li>
                <button onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-primary transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-primary transition-colors"></span> Hakkımızda
                </button>
              </li>
              <li>
                <span className="text-slate-500 cursor-not-allowed flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-700"></span> Hizmetler 
                  <span className="text-[10px] font-medium bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full ml-1 border border-slate-700">Yakında</span>
                </span>
              </li>
              <li>
                <span className="text-slate-500 cursor-not-allowed flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-700"></span> Fiyatlandırma 
                  <span className="text-[10px] font-medium bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full ml-1 border border-slate-700">Yakında</span>
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6 flex items-center gap-2">
              <span className="w-3 h-px bg-primary"></span> Destek
            </h4>
            <ul className="space-y-4 text-sm">
              <li>
                <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-primary transition-colors flex items-center gap-2 group">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-primary transition-colors"></span> İletişim
                </button>
              </li>
              <li>
                <span className="text-slate-500 cursor-not-allowed flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-700"></span> Yardım Merkezi
                </span>
              </li>
              <li>
                <span className="text-slate-500 cursor-not-allowed flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-700"></span> SSS
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6 flex items-center gap-2">
              <span className="w-3 h-px bg-primary"></span> İletişim Bilgileri
            </h4>
            <ul className="space-y-5 text-sm">
              <li className="flex items-start gap-3 group cursor-pointer">
                <div className="mt-0.5 w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center group-hover:bg-primary/20 group-hover:text-primary transition-colors flex-shrink-0">
                  <span className="material-icons-round text-[18px]">email</span>
                </div>
                <div>
                  <p className="text-slate-500 text-xs mb-0.5 font-medium">E-Posta</p>
                  <a href="mailto:info@portlink.com" className="text-slate-300 hover:text-white transition-colors">info@portlink.com</a>
                </div>
              </li>
              <li className="flex items-start gap-3 group cursor-pointer">
                <div className="mt-0.5 w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center group-hover:bg-primary/20 group-hover:text-primary transition-colors flex-shrink-0">
                  <span className="material-icons-round text-[18px]">phone</span>
                </div>
                <div>
                  <p className="text-slate-500 text-xs mb-0.5 font-medium">Müşteri Hizmetleri</p>
                  <a href="tel:+902121234567" className="text-slate-300 hover:text-white transition-colors">+90 (212) 123 45 67</a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800/60 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <p>© Copyright |  Portlink Maritime Marketplace. | © 2026 all rights reserved. Made by Codyol </p>
          <div className="flex gap-6">
            <span className="hover:text-white cursor-pointer transition-colors">Gizlilik Politikası</span>
            <span className="hover:text-white cursor-pointer transition-colors">Kullanım Koşulları</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;