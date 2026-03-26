import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from "framer-motion";

const Contact: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 flex flex-col overflow-x-hidden">
      <Navbar />

      <main className="flex-grow pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* --- 1. BAŞLIK ALANI --- */}
          <div className="text-center mb-20">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tighter"
            >
              Bizimle <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">İletişime Geçin</span>
            </motion.h1>
            <p className="text-slate-500 dark:text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Dümeni bize kırın! Sorularınız, iş birliği talepleriniz veya teknik destek ihtiyaçlarınız için her zaman buradayız.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* --- 2. SOL TARAF: İLETİŞİM FORMU --- */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-7 bg-slate-50 dark:bg-slate-900/50 rounded-[2.5rem] p-8 md:p-12 border border-slate-100 dark:border-slate-800 shadow-2xl shadow-blue-500/5"
            >
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Adınız Soyadınız</label>
                    <input type="text" placeholder="..." className="w-full px-6 py-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-blue-500 outline-none transition-all dark:text-white" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">E-Posta Adresiniz</label>
                    <input type="email" placeholder="ornek@portlink.com" className="w-full px-6 py-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-blue-500 outline-none transition-all dark:text-white" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Konu</label>
                  <input type="text" placeholder="Nasıl yardımcı olabiliriz?" className="w-full px-6 py-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-blue-500 outline-none transition-all dark:text-white" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Mesajınız</label>
                  <textarea rows={5} placeholder="Talebinizi buraya yazabilirsiniz..." className="w-full px-6 py-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-blue-500 outline-none transition-all dark:text-white resize-none"></textarea>
                </div>
                <button className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold text-lg shadow-xl shadow-blue-500/20 transition-all transform hover:-translate-y-1">
                  Mesajı Gönder
                </button>
              </form>
            </motion.div>

            {/* --- 3. SAĞ TARAF: BİLGİ KARTLARI --- */}
            <div className="lg:col-span-5 space-y-8">
              
              {/* Yapay Zeka Kartı (ÖZEL) */}
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="p-8 rounded-[2rem] bg-gradient-to-br from-indigo-600 to-blue-700 text-white relative overflow-hidden group"
              >
                <div className="absolute -right-4 -top-4 w-32 h-32 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                      <span className="material-icons-round">psychology</span>
                    </div>
                    <h3 className="text-xl font-bold">Portlink AI Asistan</h3>
                  </div>
                  <p className="text-blue-100 text-sm mb-6 leading-relaxed">
                    Beklemek istemiyor musunuz? AI asistanımız 7/24 operasyonel sorularınızı yanıtlamaya hazır.
                  </p>
                  <button className="px-6 py-2 bg-white text-blue-600 rounded-xl font-bold text-sm hover:shadow-lg transition-all">
                    Sohbeti Başlat
                  </button>
                </div>
              </motion.div>

              {/* Ofis Adres Kartı */}
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="p-8 rounded-[2rem] bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-start gap-6"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center shrink-0">
                  <span className="material-icons-round">location_on</span>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white mb-2">Merkez Ofis</h4>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                    Denizcilik Plaza, No:12 <br />
                    Yalova / Türkiye
                  </p>
                </div>
              </motion.div>

              {/* İletişim Detayları */}
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="p-8 rounded-[2rem] bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 space-y-6"
              >
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 flex items-center justify-center shrink-0">
                    <span className="material-icons-round">phone</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">Bizi Arayın</h4>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">+90 (212) 555 00 00</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 flex items-center justify-center shrink-0">
                    <span className="material-icons-round">alternate_email</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">E-Posta Gönderin</h4>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">info@portlink.com</p>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;