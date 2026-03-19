import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { text: "Merhaba! Portlink AI asistanı olarak liman operasyonları, lojistik ve acentelik konularında size rehberlik edebilirim. Ne sormak istersiniz?", sender: 'bot' }
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Yeni mesaj geldiğinde otomatik aşağı kaydır
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // 1. Kullanıcı mesajını ekle
    const userMsg: Message = { text: inputValue, sender: 'user' };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');

    // 2. Bot cevabı (Simülasyon)
    setTimeout(() => {
      const botMsg: Message = { 
        text: "Mesajınızı aldım! Kaptan, bu konuyla ilgili verileri hemen kontrol ediyorum. Lütfen bekleyin...", 
        sender: 'bot' 
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[999] flex flex-col items-end gap-4">
      
      {/* ⚓ Sadece kapalıyken görünen klasik balon ve ana buton */}
      <AnimatePresence>
        {!isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.8, x: 20 }}
              className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 px-5 py-3 rounded-2xl shadow-2xl text-sm font-bold text-slate-700 dark:text-slate-200"
            >
              ⚓ Canlı Destek
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(true)}
              className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-2xl flex items-center justify-center relative group"
            >
              <div className="absolute inset-0 rounded-full bg-blue-400 animate-ping opacity-20"></div>
              <span className="material-icons-round text-3xl group-hover:rotate-12 transition-transform">psychology</span>
            </motion.button>
          </>
        )}
      </AnimatePresence>

      {/* 📱 Sohbet Penceresi */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="w-[350px] md:w-[400px] h-[550px] bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.2)] border border-slate-100 dark:border-slate-800 flex flex-col overflow-hidden"
          >
            {/* Header: Sadece buradaki küçük X butonu kapatır */}
            <div className="p-6 bg-gradient-to-r from-blue-600 to-indigo-700 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                  <span className="material-icons-round">anchor</span>
                </div>
                <div>
                  <h3 className="font-bold">Portlink AI</h3>
                  <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest font-black text-blue-100">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    Çevrimiçi
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors">
                <span className="material-icons-round text-xl">close</span>
              </button>
            </div>

            {/* Mesaj Alanı */}
            <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-slate-50/30 dark:bg-transparent">
              {messages.map((msg, index) => (
                <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
                    msg.sender === 'user' 
                    ? 'bg-blue-600 text-white rounded-br-none shadow-lg' 
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-bl-none shadow-sm border border-slate-100 dark:border-slate-700'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Giriş Alanı */}
            <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
              <div className="flex gap-2 bg-slate-50 dark:bg-slate-800 p-2 rounded-2xl border border-slate-200 dark:border-slate-700">
                <input 
                  type="text" 
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Mesajınızı buraya yazın..." 
                  className="flex-1 px-3 py-2 text-sm bg-transparent outline-none dark:text-white"
                />
                <button 
                  onClick={handleSendMessage}
                  className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 shadow-lg transition-all"
                >
                  <span className="material-icons-round">send</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatBot;