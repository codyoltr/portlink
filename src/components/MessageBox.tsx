import React, { useState, useRef, useEffect } from 'react';

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: string;
  isOwn: boolean;
}

interface MessageBoxProps {
  isOpen: boolean;
  onClose: () => void;
  recipientName: string;
  recipientRole?: string;
  jobTitle?: string;
  layout?: 'popup' | 'embedded';
}

const MessageBox: React.FC<MessageBoxProps> = ({ 
  isOpen, 
  onClose, 
  recipientName, 
  recipientRole = "Taşeron",
  jobTitle,
  layout = 'popup'
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      senderId: 'sys',
      senderName: 'Sistem',
      text: 'İletişim kanalı oluşturuldu. Lütfen kurallara uygun mesajlaşınız.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isOwn: false
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: 'me',
      senderName: 'Ben',
      text: inputValue,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isOwn: true
    };

    setMessages([...messages, newMessage]);
    setInputValue('');

    // Simulate response
    setTimeout(() => {
      const responseMessage: Message = {
        id: (Date.now() + 1).toString(),
        senderId: 'other',
        senderName: recipientName,
        text: 'Mesajınızı aldım, en kısa sürede dönüş yapacağım.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isOwn: false
      };
      setMessages(prev => [...prev, responseMessage]);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) return null;

  const content = (
    <>
      {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700/50 bg-slate-50 dark:bg-slate-800/80 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary font-bold text-lg border border-primary/20">
                {recipientName.substring(0, 2).toUpperCase()}
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white dark:border-slate-800 rounded-full"></span>
            </div>
            <div>
              <h3 className="font-bold text-slate-800 dark:text-white text-lg leading-tight">{recipientName}</h3>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                Çevrimiçi • {recipientRole}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
          >
            <span className="material-icons-round text-[20px]">close</span>
          </button>
        </div>

        {/* Info Banner */}
        {jobTitle && (
          <div className="px-6 py-2 bg-blue-50/50 dark:bg-blue-900/10 border-b border-blue-100 dark:border-blue-900/30 flex items-center gap-2 text-xs font-medium text-blue-700 dark:text-blue-400 shrink-0">
            <span className="material-icons-round text-[16px]">info</span>
            <span>Bu görüşme <strong>{jobTitle}</strong> ilanı hakkındadır.</span>
          </div>
        )}

        {/* Message List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/50 dark:bg-slate-900/20 scroll-smooth">
          {messages.map((msg, index) => {
            const isSystem = msg.senderId === 'sys';
            return (
              <div key={msg.id} className={`flex flex-col ${isSystem ? 'items-center' : msg.isOwn ? 'items-end' : 'items-start'} gap-1.5`}>
                
                {!isSystem && index > 0 && messages[index - 1].senderId !== msg.senderId && (
                  <span className={`text-[11px] font-semibold text-slate-400 dark:text-slate-500 mx-2`}>
                    {msg.senderName}
                  </span>
                )}

                {isSystem ? (
                  <div className="bg-slate-200/50 dark:bg-slate-700/30 text-slate-500 dark:text-slate-400 text-xs px-4 py-1.5 rounded-full mb-2">
                    {msg.text}
                  </div>
                ) : (
                  <div className={`relative max-w-[80%] px-4 py-2.5 rounded-2xl text-sm shadow-sm ${
                    msg.isOwn 
                      ? 'bg-primary text-white rounded-tr-sm' 
                      : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-100 dark:border-slate-600 rounded-tl-sm'
                  }`}>
                    <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                    <span className={`text-[10px] block text-right mt-1.5 opacity-70 ${msg.isOwn ? 'text-blue-100' : 'text-slate-400'}`}>
                      {msg.timestamp}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white dark:bg-slate-800 border-t border-slate-100 dark:border-slate-700/50 shrink-0">
          <div className="flex items-end gap-2 bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-2 border border-slate-200 dark:border-slate-700/50 focus-within:border-primary/50 focus-within:bg-white dark:focus-within:bg-slate-800 transition-all shadow-sm">
            <button className="p-2 text-slate-400 hover:text-primary transition-colors shrink-0">
              <span className="material-icons-round">attach_file</span>
            </button>
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Mesajınızı yazın..."
              className="flex-1 max-h-32 bg-transparent border-none focus:ring-0 resize-none text-sm text-slate-800 dark:text-white placeholder:text-slate-400 py-2.5 px-2"
              rows={1}
              style={{ minHeight: '44px' }}
            />
            <button 
              onClick={handleSend}
              disabled={!inputValue.trim()}
              className="w-11 h-11 rounded-xl bg-primary text-white flex items-center justify-center shrink-0 hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:hover:bg-primary"
            >
              <span className="material-icons-round text-[20px] ml-1">send</span>
            </button>
          </div>
          <div className="text-center mt-2">
            <span className="text-[10px] text-slate-400 dark:text-slate-500 flex items-center justify-center gap-1">
              <span className="material-icons-round text-[12px]">lock</span>
              Uçtan uca şifreli iletişim kanalı
            </span>
          </div>
        </div>
    </>
  );

  if (layout === 'embedded') {
    return (
      <div className="flex-1 flex flex-col h-full bg-white dark:bg-slate-800 border-none overflow-hidden animate-fade-in">
        {content}
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-800 w-full max-w-lg rounded-2xl shadow-2xl flex flex-col h-[600px] max-h-[90vh] overflow-hidden border border-slate-200 dark:border-slate-700">
        {content}
      </div>
    </div>
  );
};

export default MessageBox;
