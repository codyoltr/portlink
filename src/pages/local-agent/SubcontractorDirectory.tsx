import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SubcontractorDirectory: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const subcontractors = [
    { id: '101', name: 'Eren Marine Services', category: 'Marine Engineering', specialties: ['Main Engine', 'Hull Painting'], location: 'Tuzla', performance: 5, status: 'Active' },
    { id: '102', name: 'Port Tech', category: 'Electrical Systems', specialties: ['Automation', 'Wiring'], location: 'Yalova', performance: 4, status: 'Active' }
  ];

  const filteredData = subcontractors.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full space-y-8 animate-in fade-in duration-700 px-4">
      
      {/* BAŞLIK ALANI (Geri Dön Butonu Kaldırıldı) */}
      <div className="space-y-1 py-2">
        <h2 className="text-3xl font-black text-slate-800 tracking-tight">Taşeron Rehberi</h2>
        <p className="text-slate-500 text-sm font-medium">Kayıtlı hizmet sağlayıcıları ve uzmanlık envanterini buradan takip edebilirsiniz.</p>
      </div>

      {/* ÜST ÖZET KARTLARI */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm flex flex-col justify-between group">
          <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-4"><span className="material-icons-round">business</span></div>
          <div>
            <p className="text-slate-400 text-[9px] font-black uppercase tracking-widest mb-1">Toplam Taşeron</p>
            <h3 className="text-2xl font-black text-slate-800 tracking-tighter">{subcontractors.length}</h3>
          </div>
        </div>
        <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm flex flex-col justify-between">
          <div className="w-10 h-10 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center mb-4"><span className="material-icons-round">verified</span></div>
          <div>
            <p className="text-slate-400 text-[9px] font-black uppercase tracking-widest mb-1">Onaylı Belgeler</p>
            <h3 className="text-2xl font-black text-slate-800 tracking-tighter">142</h3>
          </div>
        </div>
        <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm flex flex-col justify-between">
          <div className="w-10 h-10 bg-amber-50 text-amber-500 rounded-xl flex items-center justify-center mb-4"><span className="material-icons-round">location_on</span></div>
          <div>
            <p className="text-slate-400 text-[9px] font-black uppercase tracking-widest mb-1">Hizmet Alanı</p>
            <h3 className="text-2xl font-black text-slate-800 tracking-tighter">12</h3>
          </div>
        </div>
        <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm flex flex-col justify-between">
          <div className="w-10 h-10 bg-indigo-50 text-indigo-500 rounded-xl flex items-center justify-center mb-4"><span className="material-icons-round">star</span></div>
          <div>
            <p className="text-slate-400 text-[9px] font-black uppercase tracking-widest mb-1">Ort. Performans</p>
            <h3 className="text-2xl font-black text-slate-800 tracking-tighter">4.8</h3>
          </div>
        </div>
      </div>

      {/* ARAMA BARI */}
      <div className="bg-white p-4 rounded-[24px] shadow-sm border border-slate-100">
        <div className="relative w-full">
          <span className="material-icons-round absolute left-4 top-1/2 -translate-y-1/2 text-slate-300">search</span>
          <input 
            type="text" 
            placeholder="Search company name, expertise or region..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-slate-50/50 rounded-xl outline-none text-sm font-medium border border-transparent focus:bg-white focus:border-primary/10 transition-all placeholder:text-slate-300"
          />
        </div>
      </div>

      {/* KARTLAR */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-10">
        {filteredData.map((item) => (
          <div key={item.id} className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
            <div className="flex justify-between items-start mb-6">
              <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                <span className="material-icons-round text-2xl">business</span>
              </div>
              <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[9px] font-black uppercase tracking-widest">{item.status}</span>
            </div>
            <h4 className="text-xl font-black text-slate-800 mb-1">{item.name}</h4>
            <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-6">{item.category}</p>
            <div className="flex flex-wrap gap-1.5 mb-8">
              {item.specialties.map((s) => (
                <span key={s} className="px-3 py-1 bg-slate-50 text-slate-500 rounded-lg text-[9px] font-bold uppercase border border-slate-100">{s}</span>
              ))}
            </div>
            <div className="pt-6 border-t border-slate-50 flex justify-between items-center">
              <div className="flex items-center gap-1.5"><span className="material-icons-round text-amber-400 text-sm">star</span><span className="text-xs font-black text-slate-700">{item.performance}.0</span></div>
              <button onClick={() => navigate(`/dashboard/agent/subcontractor-directory/${item.id}`)} className="w-10 h-10 flex items-center justify-center rounded-xl bg-blue-50 text-blue-500 hover:bg-blue-500 hover:text-white transition-all shadow-sm">
                <span className="material-icons-round">visibility</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubcontractorDirectory;