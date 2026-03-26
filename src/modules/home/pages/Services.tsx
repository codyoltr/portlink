import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion, AnimatePresence } from "framer-motion";

const services = [
  { id: 1, title: 'Acentelik', image: '/images/acentelik.jpg', description: 'Liman operasyonlarınız için profesyonel yerel acentelik çözümleri.' },
  { id: 2, title: 'Teknik Servis', image: '/images/teknik-servis.jpg', description: 'Gemi bakım, onarım ve teknik destek süreçlerinde uzman ekipler.' },
  { id: 3, title: 'Lojistik', image: '/images/lojistik.jpg', description: 'Küresel ölçekte güvenilir ve hızlı yük taşımacılığı operasyonları.' },
  { id: 4, title: 'Danışmanlık', image: '/images/danismanlik.jpg', description: 'Denizcilik mevzuatı ve operasyonel verimlilik üzerine uzman danışmanlık.' },
];

const faqs = [
  { 
    question: "Hizmet sağlayıcılar nasıl doğrulanıyor?", 
    answer: "Portlink ekibi, platforma katılan her taşeron ve acenteyi sertifikaları, geçmiş referansları ve yasal belgeleri üzerinden titizlikle kontrol eder. Sadece yüksek puanlı ve güvenilir firmalar ağımıza dahil edilir.",
    icon: "verified_user",
  },
  { 
    question: "Ödemeler nasıl güvence altına alınıyor?", 
    answer: "Portlink Güvenli Ödeme Sistemi sayesinde, hizmet tamamlanıp onaylanana kadar ödemeniz havuz hesabında güvenle tutulur. İş bitiminde onayınızla transfer gerçekleşir.",
    icon: "payments",
  },
  { 
    question: "Acil teknik servis ihtiyacımda ne yapmalıyım?", 
    answer: "7/24 destek hattımız veya platform üzerindeki 'Acil Talep' butonu ile en yakın teknik ekibe 30 dakika içinde ulaşabilirsiniz. Sistem lokasyonunuza en yakın ekipleri otomatik listeler.",
    icon: "support_agent",
  },
  { 
    question: "Küresel operasyonlarda dil desteği var mı?", 
    answer: "Evet, Portlink üzerinden yapılan tüm yazışmalar otomatik çeviri desteğine sahiptir. Ayrıca uluslararası operasyonlar için çok dilli destek ekibimiz her an yanınızdadır.",
    icon: "translate",
  }
];

const Services: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 flex flex-col overflow-x-hidden">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          {/* 1. BAŞLIK VE HİZMET KARTLARI */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight">
              Hizmet <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">Dallarımız</span>
            </h1>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-32">
            {services.map((service) => (
              <div key={service.id} className="group relative h-[450px] rounded-[2.5rem] overflow-hidden cursor-pointer shadow-xl border border-slate-200 dark:border-slate-800 transition-all duration-500 hover:shadow-2xl">
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110" style={{ backgroundImage: `url(${service.image})` }}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent transition-all duration-500 group-hover:from-blue-900/90"></div>
                <div className="absolute inset-0 p-8 flex flex-col justify-end transform transition-transform duration-500 group-hover:-translate-y-2">
                  <h3 className="text-2xl font-bold text-white mb-3 tracking-wide">{service.title}</h3>
                  <p className="text-slate-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500">{service.description}</p>
                  <div className="w-0 h-1 bg-blue-400 mt-4 transition-all duration-500 group-hover:w-16 rounded-full"></div>
                </div>
              </div>
            ))}
          </div>

          {/* 2. MODERN STATS (YENİLENDİ ✨) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-32">
            {[
              { label: 'Doğrulanmış İş Ortağı', value: '450+', icon: 'verified_user', color: 'from-blue-600 to-cyan-500' },
              { label: 'Yıllık Başarılı Operasyon', value: '12K+', icon: 'speed', color: 'from-indigo-600 to-blue-500' },
              { label: 'Global Liman Ağı', value: '85+', icon: 'language', color: 'from-blue-700 to-indigo-500' }
            ].map((stat, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="relative group p-10 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.05)] overflow-hidden transition-all duration-500"
              >
                <div className={`absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br ${stat.color} opacity-[0.03] group-hover:opacity-[0.08] rounded-full blur-3xl transition-opacity duration-500`}></div>

                <div className="relative flex flex-col items-center text-center gap-6">
                  <div className={`w-20 h-20 rounded-[1.5rem] bg-gradient-to-br ${stat.color} text-white flex items-center justify-center shadow-2xl shadow-blue-500/20 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500`}>
                    <span className="material-icons-round text-4xl">{stat.icon}</span>
                  </div>

                  <div className="space-y-2">
                    <div className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter">
                      {stat.value}
                    </div>
                    <div className="text-xs font-black text-blue-600 dark:text-blue-400 uppercase tracking-[0.2em] opacity-80">
                      {stat.label}
                    </div>
                  </div>

                  <div className="w-12 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      transition={{ duration: 1, delay: 0.5 + (i * 0.2) }}
                      className={`h-full bg-gradient-to-r ${stat.color}`}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* 3. MERAK EDİLENLER (SPLIT LAYOUT) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-32 items-start">
            <div className="lg:col-span-5 sticky top-32">
              <h2 className="text-blue-600 font-bold tracking-widest text-sm uppercase mb-4">Sıkça Sorulanlar</h2>
              <h3 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 leading-tight">
                Aklınıza Takılan <br /> Her Şey Burada.
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-lg mb-8">
                Portlink ekosistemi hakkında daha fazla bilgi edinin. Aradığınız cevabı bulamazsanız destek ekibimiz 7/24 yanınızda.
              </p>
            </div>

            <div className="lg:col-span-7 space-y-6">
              {faqs.map((faq, index) => (
                <div 
                  key={index}
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className={`relative p-8 rounded-[2rem] cursor-pointer transition-all duration-500 border-2 ${
                    openFaq === index 
                    ? 'bg-white dark:bg-slate-900 border-blue-500 shadow-2xl shadow-blue-500/10' 
                    : 'bg-slate-50/50 dark:bg-slate-900/30 border-transparent hover:border-slate-200 dark:hover:border-slate-800'
                  }`}
                >
                  <div className="flex items-start gap-6">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                      openFaq === index ? 'bg-blue-600 text-white' : 'bg-white dark:bg-slate-800 text-slate-400'
                    }`}>
                      <span className="material-icons-round">{faq.icon}</span>
                    </div>
                    <div className="flex-1">
                      <h4 className={`text-xl font-bold transition-colors ${
                        openFaq === index ? 'text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-400'
                      }`}>
                        {faq.question}
                      </h4>
                      <AnimatePresence>
                        {openFaq === index && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                            <p className="mt-4 text-slate-500 dark:text-slate-400 leading-relaxed">{faq.answer}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    <div className={`mt-2 transition-transform duration-300 ${openFaq === index ? 'rotate-180 text-blue-600' : 'text-slate-400'}`}>
                      <span className="material-icons-round">expand_more</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 4. ALT CTA */}
          <div className="p-12 rounded-[3rem] bg-gradient-to-br from-blue-600 to-blue-800 text-center text-white relative overflow-hidden shadow-2xl shadow-blue-500/20">
             <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
             <h2 className="text-3xl font-bold mb-4 relative z-10">Aradığınız hizmeti bulamadınız mı?</h2>
             <p className="text-blue-100 mb-8 max-w-xl mx-auto relative z-10">Özel talepleriniz veya iş ortaklığı için bize ulaşın.</p>
             <button className="px-10 py-4 bg-white text-blue-600 rounded-2xl font-bold relative z-10 hover:shadow-xl transition-all transform hover:-translate-y-1">
               İletişime Geçin
             </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Services;