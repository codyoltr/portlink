import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ArsivFinans: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Hakediş Kaydı');
  const [searchTerm, setSearchTerm] = useState('');
  const [kayitlar, setKayitlar] = useState<any[]>([]);

  // 1. VERİLERİ YÜKLE
  useEffect(() => {
    const localData = localStorage.getItem('finans_kayitlari');
    const staticData = [
      { id: 'f1', type: 'Tamamlanan İş Onayı', title: 'Gemi Motor Bakımı', subcontractor: 'Port Teknik', date: '2024-03-10', amount: '45000', status: 'Onaylandı' },
      { id: 'f2', type: 'Hakediş Kaydı', title: 'Lojistik Hakedişi', subcontractor: 'Mavi Lojistik', date: '2024-03-12', amount: '12500', status: 'Beklemede' },
      { id: 'f3', type: 'Fatura Girişi', title: 'Kumanya Tedariği', subcontractor: 'Delta Marine', date: '2024-03-15', amount: '8200', status: 'Ödendi' }
    ];

    if (localData) {
      setKayitlar([...staticData, ...JSON.parse(localData)]);
    } else {
      setKayitlar(staticData);
    }
  }, []);

  // 2. FİLTRELEME MANTIĞI
  const filteredData = kayitlar.filter(item => 
    item.type === activeTab && 
    (item.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
     item.subcontractor?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleDelete = (id: any) => {
    if (window.confirm("Bu finansal kaydı silmek istediğinize emin misiniz?")) {
      const updated = kayitlar.filter(item => String(item.id) !== String(id));
      setKayitlar(updated);
      const onlyLocal = updated.filter(item => !String(item.id).startsWith('f'));
      localStorage.setItem('finans_kayitlari', JSON.stringify(onlyLocal));
    }
  };

  // Türlere göre ikon ve renk belirleme fonksiyonu
  const getTypeStyle = (type: string) => {
    switch (type) {
      case 'Fatura Girişi': return { icon: 'receipt_long', color: 'text-blue-500', bg: 'bg-blue-50' };
      case 'Hakediş Kaydı': return { icon: 'payments', color: 'text-emerald-500', bg: 'bg-emerald-50' };
      default: return { icon: 'assignment_turned_in', color: 'text-purple-500', bg: 'bg-purple-50' };
    }
  };

  return (
    <div className="w-full space-y-8 animate-in fade-in duration-700">
      
      {/* ÜST İSTATİSTİK KARTLARI */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900 dark:bg-white p-8 rounded-[32px] shadow-xl text-white dark:text-slate-900 relative overflow-hidden">
          <p className="opacity-70 text-[10px] font-bold uppercase tracking-widest font-mono">Toplam Hacim</p>
          <h3 className="text-3xl font-black mt-2 tracking-tighter italic">₺{kayitlar.reduce((acc, curr) => acc + Number(curr.amount), 0).toLocaleString()}</h3>
          <span className="material-icons-round absolute -right-2 -bottom-2 text-8xl opacity-10">account_balance_wallet</span>
        </div>

        <div className="bg-white dark:bg-slate-800 p-8 rounded-[32px] shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest font-mono">Aktif Süreçler</p>
            <h3 className="text-3xl font-black text-slate-800 dark:text-white mt-1">{kayitlar.length} Kayıt</h3>
          </div>
          <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center">
            <span className="material-icons-round">query_stats</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-8 rounded-[32px] shadow-sm border border-slate-100 flex items-center justify-between text-right">
            <div className="flex-1">
                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest font-mono">Bekleyen Ödemeler</p>
                <h3 className="text-3xl font-black text-rose-500 mt-1">₺{kayitlar.filter(i => i.status === 'Beklemede').reduce((acc, curr) => acc + Number(curr.amount), 0).toLocaleString()}</h3>
            </div>
        </div>
      </div>

      {/* BAŞLIK VE BUTON */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight">Arşiv & Finans Yönetimi</h2>
          <p className="text-slate-500 text-sm font-medium italic">Hakediş, fatura ve iş onay süreçleri takibi.</p>
        </div>
        <button 
          onClick={() => navigate('/dashboard/agent/finans-ekle')}
          className="flex items-center gap-2 px-6 py-4 bg-primary text-white rounded-[20px] font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all"
        >
          <span className="material-icons-round text-xl">add_chart</span>
          Yeni Kayıt Ekle
        </button>
      </div>

      {/* SEKME VE ARAMA (REHBER STİLİ) */}
      <div className="flex flex-col space-y-4">
        <div className="flex gap-1.5 p-1.5 bg-slate-100 dark:bg-slate-900/50 rounded-2xl w-fit border border-slate-200/50">
          {['Hakediş Kaydı', 'Fatura Girişi', 'Tamamlanan İş Onayı'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded-xl font-bold text-[11px] uppercase transition-all ${
                activeTab === tab ? 'bg-white dark:bg-slate-800 text-primary shadow-sm' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="bg-white dark:bg-slate-800 p-3 rounded-[24px] shadow-sm border border-slate-100 flex flex-col md:flex-row gap-3 items-center">
          <div className="flex-1 relative w-full text-slate-400 focus-within:text-primary transition-colors">
            <span className="material-icons-round absolute left-4 top-1/2 -translate-y-1/2">search</span>
            <input 
              type="text" 
              placeholder={`${activeTab} içinde ara...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-900 rounded-xl border-none outline-none text-sm font-medium"
            />
          </div>
          <button className="w-full md:w-auto px-8 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold text-sm">Filtrele</button>
        </div>
      </div>

      {/* ANA TABLO */}
      <div className="bg-white dark:bg-slate-800 rounded-[32px] shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50/50 border-b text-[10px] uppercase font-black text-slate-400 tracking-widest font-mono">
              <tr>
                <th className="px-8 py-5">Kayıt Detayı</th>
                <th className="px-8 py-5">Firma</th>
                <th className="px-8 py-5 text-center">Durum</th>
                <th className="px-8 py-5">Tutar</th>
                <th className="px-8 py-5 text-right">İşlem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredData.map((item) => {
                const style = getTypeStyle(item.type);
                return (
                  <tr key={item.id} className="hover:bg-slate-50/40 group transition-all">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className={`w-11 h-11 rounded-2xl ${style.bg} ${style.color} flex items-center justify-center shadow-sm`}>
                          <span className="material-icons-round text-xl">{style.icon}</span>
                        </div>
                        <div>
                          <span className="font-bold text-slate-900 dark:text-white block text-base">{item.title}</span>
                          <span className="text-[10px] text-slate-400 font-mono italic">{item.date}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-slate-600 dark:text-slate-300 font-bold">{item.subcontractor}</span>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                        item.status === 'Ödendi' || item.status === 'Onaylandı' 
                        ? 'bg-emerald-50 text-emerald-600' 
                        : 'bg-amber-50 text-amber-600'
                      }`}>
                        {item.status || 'Beklemede'}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <span className="font-black text-slate-900 dark:text-white text-lg tracking-tight">₺{Number(item.amount).toLocaleString()}</span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
                        <button 
                          onClick={() => navigate(`/dashboard/agent/finans-ekle?edit=${item.id}`)}
                          className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 text-slate-400 hover:text-primary transition-all"
                          title="Düzenle"
                        >
                          <span className="material-icons-round text-lg">edit</span>
                        </button>
                        <button 
                          onClick={() => handleDelete(item.id)}
                          className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 text-slate-400 hover:text-rose-500 transition-all"
                          title="Sil"
                        >
                          <span className="material-icons-round text-lg">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ArsivFinans;