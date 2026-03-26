import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ArchiveFinance: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('HEPSİ');

  const financeData = [
    { id: '1', title: 'Makine Dairesi Bakımı', company: 'EREN MARINE', amount: '85.000', date: '18.03.2026', status: 'ONAYLANDI' },
    { id: '2', title: 'Güverte Boyama İşlemi', company: 'MAVİ LOJİSTİK', amount: '12.500', date: '15.03.2026', status: 'İŞLEMDE' },
    { id: '3', title: 'Elektrik Panosu Revizyon', company: 'PORT TECH', amount: '4.200', date: '10.03.2026', status: 'ÖDENDİ' }
  ];

  const filteredData = financeData.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         item.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'HEPSİ' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="w-full space-y-8 animate-in fade-in duration-700 px-4">
      
      {/* BAŞLIK ALANI (Geri Dön Butonu Kaldırıldı) */}
      <div className="flex justify-between items-end py-2">
        <div className="space-y-1">
          <h2 className="text-3xl font-black text-slate-800 tracking-tight">Arşiv & Finans</h2>
          <p className="text-slate-500 text-sm font-medium">Onaylanan teklifleri ve finansal detayları buradan takip edebilirsiniz.</p>
        </div>
        <button className="w-12 h-12 flex items-center justify-center bg-white rounded-2xl shadow-sm border border-slate-100 text-slate-400 hover:text-primary transition-all">
          <span className="material-icons-round">print</span>
        </button>
      </div>

      {/* ÜST ÖZET KARTLARI */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm flex flex-col justify-between group">
          <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"><span className="material-icons-round text-xl">account_balance_wallet</span></div>
          <div><p className="text-slate-400 text-[9px] font-black uppercase tracking-[0.2em] mb-1">Toplam Hacim</p><h3 className="text-2xl font-black text-slate-800 tracking-tighter">₺1.280.000</h3></div>
        </div>
        <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm flex flex-col justify-between text-amber-500">
          <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center mb-4 text-xl"><span className="material-icons-round">hourglass_empty</span></div>
          <div><p className="text-slate-400 text-[9px] font-black uppercase tracking-[0.2em] mb-1">Bekleyen</p><h3 className="text-2xl font-black text-slate-800 tracking-tighter">7 Kayıt</h3></div>
        </div>
        <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm flex flex-col justify-between text-emerald-500">
          <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center mb-4 text-xl"><span className="material-icons-round">done_all</span></div>
          <div><p className="text-slate-400 text-[9px] font-black uppercase tracking-[0.2em] mb-1">Tamamlanan</p><h3 className="text-2xl font-black text-slate-800 tracking-tighter">35 İş</h3></div>
        </div>
        <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm flex flex-col justify-between text-indigo-500">
          <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center mb-4 text-xl"><span className="material-icons-round">trending_up</span></div>
          <div><p className="text-slate-400 text-[9px] font-black uppercase tracking-[0.2em] mb-1">Başarı Oranı</p><h3 className="text-2xl font-black text-slate-800 tracking-tighter">%88</h3></div>
        </div>
      </div>

      {/* ARAMA VE DROPDOWN */}
      <div className="bg-white p-4 rounded-[28px] shadow-sm border border-slate-100 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <span className="material-icons-round absolute left-4 top-1/2 -translate-y-1/2 text-slate-300">search</span>
          <input type="text" placeholder="İş tanımı veya firma ara..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-12 pr-4 py-3 bg-slate-50/50 rounded-2xl outline-none text-sm font-medium border border-transparent focus:bg-white focus:border-primary/10 transition-all placeholder:text-slate-300" />
        </div>
        <div className="relative min-w-[200px]">
          <span className="material-icons-round absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg">filter_list</span>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="w-full pl-12 pr-10 py-3 bg-slate-50/50 rounded-2xl outline-none text-[11px] font-black uppercase tracking-widest border border-transparent focus:bg-white focus:border-primary/10 transition-all appearance-none cursor-pointer text-slate-600">
            <option value="HEPSİ">TÜM DURUMLAR</option><option value="İŞLEMDE">İŞLEMDE</option><option value="ONAYLANDI">ONAYLANDI</option><option value="ÖDENDİ">ÖDENDİ</option>
          </select>
          <span className="material-icons-round absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">expand_more</span>
        </div>
      </div>

      {/* LİSTE */}
      <div className="bg-white rounded-[40px] shadow-sm border border-slate-100 overflow-hidden mb-10">
        <table className="w-full text-left">
          <thead className="bg-slate-50/30 text-[9px] uppercase font-black text-slate-400 tracking-[0.2em] font-mono border-b border-slate-50">
            <tr><th className="px-10 py-6">İş / Firma Detayı</th><th className="px-8 py-6 text-center">Tutar</th><th className="px-8 py-6 text-center">Durum</th><th className="px-10 py-6 text-right">Detay</th></tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filteredData.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50/40 transition-all group">
                <td className="px-10 py-8"><span className="font-black text-slate-800 block text-base mb-1 group-hover:text-primary transition-colors">{item.title}</span><span className="text-[10px] font-black text-primary uppercase tracking-widest">{item.company}</span></td>
                <td className="px-8 py-8 text-center"><p className="font-black text-slate-900 text-lg tracking-tighter">₺{item.amount}</p><p className="text-[10px] text-slate-400 font-bold">18.03.2026</p></td>
                <td className="px-8 py-8 text-center"><span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${item.status === 'ÖDENDİ' ? 'bg-emerald-50 text-emerald-600' : item.status === 'ONAYLANDI' ? 'bg-blue-50 text-blue-600' : 'bg-amber-50 text-amber-600'}`}>{item.status}</span></td>
                <td className="px-10 py-8 text-right">
                  <button onClick={() => navigate(`/dashboard/agent/archive-finance/${item.id}`)} className="w-10 h-10 inline-flex items-center justify-center rounded-xl bg-blue-50 text-blue-500 hover:bg-primary hover:text-white transition-all shadow-sm"><span className="material-icons-round text-lg">visibility</span></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ArchiveFinance;