import React, { useState } from 'react';
import MessageBox from '../components/MessageBox';

const MessagesPage: React.FC = () => {
  // Demo veri
  const conversations = [
    {
      id: '1',
      name: 'Port Teknik A.Ş.',
      role: 'Taşeron',
      lastMessage: 'İşlemler başarıyla tamamlandı, raporu gönderiyorum.',
      time: '14:30',
      unread: 2,
      online: true,
      jobTitle: 'Ana Makine Rodaj ve Overhaul İşlemleri'
    },
    {
      id: '2',
      name: 'Marine Solutions Ltd.',
      role: 'Taşeron',
      lastMessage: 'Teşekkürler, ödeme alındı.',
      time: 'Dün',
      unread: 0,
      online: false,
      jobTitle: 'Güverte Bakım Onarımı'
    },
    {
      id: '3',
      name: 'Global Lojistik',
      role: 'Acente',
      lastMessage: 'Yarın sabah gemiye geçeceğiz.',
      time: 'Pzt',
      unread: 0,
      online: true,
      jobTitle: 'Gümrük Müşavirliği İşlemleri'
    }
  ];

  const [activeChat, setActiveChat] = useState<string | null>(null);

  const handleOpenChat = (id: string) => {
    setActiveChat(id);
  };

  const closeChat = () => {
    setActiveChat(null);
  };

  const selectedConversation = conversations.find(c => c.id === activeChat);

  return (
    <div className="h-[calc(100vh-140px)] flex bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
      
      {/* Sol Panel - Mesaj Listesi */}
      <div className="w-full md:w-1/3 lg:w-1/4 border-r border-slate-100 dark:border-slate-700/50 flex flex-col bg-slate-50 dark:bg-slate-900/20">
        <div className="p-6 border-b border-slate-100 dark:border-slate-700/50 bg-white dark:bg-slate-800">
          <h2 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <span className="material-icons-round text-primary">chat</span>
            Mesajlar
          </h2>
          <div className="mt-4 relative">
            <span className="material-icons-round absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">search</span>
            <input 
              type="text" 
              placeholder="Mesajlarda ara..." 
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:border-primary/50 focus:ring-0 outline-none text-slate-800 dark:text-slate-200 placeholder:text-slate-400 transition-all"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto overflow-x-hidden">
          {conversations.map((chat) => (
            <div 
              key={chat.id}
              onClick={() => handleOpenChat(chat.id)}
              className="px-6 py-4 border-b border-slate-100 dark:border-slate-700/30 hover:bg-slate-100 dark:hover:bg-slate-700/40 cursor-pointer transition-colors relative group"
            >
              <div className="flex gap-4 items-center">
                <div className="relative shrink-0">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                    {chat.name.substring(0,2).toUpperCase()}
                  </div>
                  {chat.online && (
                    <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white dark:border-slate-800 rounded-full"></span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-slate-800 dark:text-white text-sm truncate pr-2">{chat.name}</h3>
                    <span className="text-[11px] font-semibold text-slate-400 shrink-0">{chat.time}</span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate pr-6">{chat.lastMessage}</p>
                </div>
              </div>
              {chat.unread > 0 && (
                <div className="absolute right-6 bottom-4 w-5 h-5 bg-primary text-white rounded-full flex items-center justify-center text-[10px] font-bold">
                  {chat.unread}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Sağ Panel - Boş Durum veya Chat UI */}
      {selectedConversation ? (
        <div className="hidden md:flex flex-1 relative bg-white dark:bg-slate-800">
          <MessageBox 
            isOpen={true}
            onClose={closeChat}
            recipientName={selectedConversation.name}
            recipientRole={selectedConversation.role}
            jobTitle={selectedConversation.jobTitle}
            layout="embedded"
          />
        </div>
      ) : (
        <div className="hidden md:flex flex-1 items-center justify-center bg-slate-50/50 dark:bg-slate-900/50 relative">
          <div className="text-center p-8">
            <div className="w-24 h-24 bg-blue-50 dark:bg-blue-900/20 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white dark:border-slate-800 shadow-sm">
              <span className="material-icons-round text-4xl">forum</span>
            </div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Mesajlarınız Burada Görünür</h3>
            <p className="text-slate-500 text-sm max-w-sm mx-auto">
              Sol taraftaki listeden bir konuşma seçerek mesajlaşmaya başlayabilirsiniz veya yeni mesaj alırsanız bildirim eklenecektir.
            </p>
          </div>
        </div>
      )}

      {/* Sadece mobilde popup olmasi istenirse eklenecek, burası şimdilik sade bırakıldı. Whatsapp Web görünümü hedeflendi. */}
    </div>
  );
};

export default MessagesPage;
