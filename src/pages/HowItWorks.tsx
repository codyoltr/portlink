"use client";

import { useRef } from "react";
import Navbar from "../components/Navbar"; 
import Footer from "../components/Footer";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  ClipboardCheck, 
  Users, 
  FileText, 
  ShieldCheck, 
  Anchor, 
  Ship,
  Globe
} from "lucide-react";

// 1. Adım Verileri
const steps = [
  {
    id: "1",
    title: "İhtiyacını Belirle",
    description: "Aradığınız hizmeti, lokasyonu ve detayları sisteme girerek talebinizi oluşturun.",
    icon: ClipboardCheck,
  },
  {
    id: "2",
    title: "Uzmanlarla Eşleş",
    description: "İhtiyacınıza en uygun, doğrulanmış profesyonel hizmet sağlayıcılarıyla anında eşleşin.",
    icon: Users,
  },
  {
    id: "3",
    title: "Teklifleri Değerlendir",
    description: "Gelen teklifleri karşılaştırın, kullanıcı profillerini ve referansları inceleyin.",
    icon: FileText,
  },
  {
    id: "4",
    title: "Güvenle Anlaş",
    description: "En uygun çözüm ortağınızı seçin ve Portlink güvencesiyle iş birliğine başlayın.",
    icon: ShieldCheck,
  },
];

// 2. İstatistik Verileri
const stats = [
  { id: 1, name: 'Aktif Hizmet Sağlayıcı', value: '500+', icon: Users },
  { id: 2, name: 'Başarılı Operasyon', value: '12.000+', icon: Ship },
  { id: 3, name: 'Desteklenen Liman', value: '45+', icon: Anchor },
  { id: 4, name: 'Küresel Ağ', value: '12 Ülke', icon: Globe },
];

// Tekil Kart Bileşeni
const StepCard = ({ step, index }: { step: any; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
      className="group relative bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_15px_40px_rgb(0,0,0,0.08)] transition-all duration-300 overflow-hidden flex flex-col h-full border border-gray-50"
    >
      <motion.div
        style={{ y: backgroundY }}
        className="absolute -top-4 right-4 text-[150px] font-black text-slate-50 leading-none select-none z-0 transition-transform duration-500 group-hover:scale-110"
      >
        {step.id}
      </motion.div>

      <div className="relative z-10">
        <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white">
          <step.icon size={28} strokeWidth={2} />
        </div>
        
        <h3 className="text-xl font-bold text-slate-800 mb-4 transform transition-transform duration-300 group-hover:scale-105 origin-left">
          {step.title}
        </h3>
        <p className="text-slate-500 leading-relaxed text-sm transform transition-transform duration-300 group-hover:scale-105 origin-left group-hover:text-slate-700">
          {step.description}
        </p>
      </div>
    </motion.div>
  );
};

export default function HowItWorksExpanded() {
  return (
    <div className="bg-slate-50/50 min-h-screen flex flex-col">
      {/* --- EN ÜST MENÜ (NAVBAR) --- */}
      <Navbar />

      {/* --- ANA İÇERİK BÖLÜMÜ --- */}
      <div className="flex-grow">
        {/* --- NASIL ÇALIŞIR BÖLÜMÜ --- */}
        <section className="pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-blue-600 font-semibold tracking-wider text-sm uppercase mb-3"
              >
                Kolay ve Hızlı Süreç
              </motion.p>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight"
              >
                Sistem Nasıl Çalışır?
              </motion.h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8">
              {steps.map((step, index) => (
                <StepCard key={step.id} step={step} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* --- İSTATİSTİKLER BÖLÜMÜ --- */}
        <section className="py-16 bg-white border-y border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div 
                  key={stat.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex flex-col items-center text-center group cursor-default"
                >
                  <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-blue-50 text-blue-600 mb-4 transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white group-hover:shadow-lg group-hover:-translate-y-1">
                    <stat.icon size={28} />
                  </div>
                  <dd className="text-4xl font-black text-slate-900 tracking-tight mb-2">
                    {stat.value}
                  </dd>
                  <dt className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
                    {stat.name}
                  </dt>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* --- ALT MENÜ (FOOTER) --- */}
      <Footer />
    </div>
  );
}