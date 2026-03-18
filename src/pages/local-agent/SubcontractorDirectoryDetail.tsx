import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const SubcontractorDirectoryDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const data = {
    companyName: 'Eren Marine Services',
    companyType: 'Marine Engineering',
    experience: '7+ Years',
    phone: '+90 555 222 11 00',
    email: 'info@erenmarine.com',
    description: 'Ship maintenance, mechanical repairs, and technical coordination expert team.',
    specialties: ['Main Engine', 'Hydraulics', 'Steel Work', 'Pipe Line'],
    regions: ['Tuzla', 'Yalova', 'Ambarli'],
    team: [
      { title: 'Engineer', count: 4, icon: 'engineering' },
      { title: 'Technician', count: 12, icon: 'precision_manufacturing' }
    ]
  };

  return (
    <div className="w-full space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center gap-2 text-slate-400 hover:text-primary transition-colors font-bold text-xs uppercase"
      >
        <span className="material-icons-round text-sm">arrow_back</span> Geri Dön
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm">
            <h2 className="text-4xl font-black text-slate-800 mb-2 tracking-tighter">{data.companyName}</h2>
            <p className="text-primary font-bold uppercase text-xs mb-8 tracking-widest">{data.companyType} • ID: {id}</p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
              <div className="p-4 bg-slate-50 rounded-2xl">
                <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Deneyim</p>
                <p className="font-bold text-slate-800">{data.experience}</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl">
                <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Hizmet Bölgesi</p>
                <p className="font-bold text-slate-800">{data.regions.length} Liman</p>
              </div>
            </div>

            <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4">Firma Açıklaması</h3>
            <p className="text-slate-600 leading-relaxed italic border-l-4 border-primary/20 pl-6 mb-10">"{data.description}"</p>

            <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4">Uzmanlık Alanları</h3>
            <div className="flex flex-wrap gap-2">
              {data.specialties.map(s => (
                <span key={s} className="px-6 py-2 bg-primary/5 text-primary rounded-xl font-bold text-xs border border-primary/10">{s}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900 text-white p-8 rounded-[40px] shadow-2xl relative overflow-hidden">
             <h3 className="text-xs font-black opacity-40 uppercase tracking-widest mb-6">İletişim Kanalları</h3>
             <div className="space-y-4 relative z-10">
               <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                 <span className="material-icons-round text-primary-light">phone</span>
                 <p className="font-bold text-sm tracking-tight">{data.phone}</p>
               </div>
               <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                 <span className="material-icons-round text-primary-light">email</span>
                 <p className="font-bold text-sm tracking-tight">{data.email}</p>
               </div>
             </div>
             <span className="material-icons-round absolute -right-4 -bottom-4 text-9xl opacity-5">contact_support</span>
          </div>

          <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm">
            <h3 className="text-xs font-black text-slate-400 uppercase mb-6 tracking-widest">Sertifikalar</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="material-icons-round text-emerald-500">verified</span>
                <p className="text-[11px] font-bold text-slate-700">ISO 9001:2015</p>
              </div>
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="material-icons-round text-emerald-500">verified</span>
                <p className="text-[11px] font-bold text-slate-700">Liman Giriş İzin Belgesi</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubcontractorDirectoryDetail;