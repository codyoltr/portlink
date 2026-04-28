import React from 'react';
import { Subcontractor } from '../../types/agency.types';

interface SubcontractorCardProps {
  data: Subcontractor;
  onView: (id: string) => void;
}

const SubcontractorCard: React.FC<SubcontractorCardProps> = ({ data, onView }) => {
  return (
    <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm hover:shadow-md transition-all group relative overflow-hidden flex flex-col h-full">
      <div className="flex justify-between items-start mb-6">
        <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all overflow-hidden border border-slate-100">
          {data.logoUrl ? (
            <img src={data.logoUrl} alt={data.companyName} className="w-full h-full object-cover" />
          ) : (
            <span className="material-icons-round text-2xl">business</span>
          )}
        </div>
        <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${data.isVerified ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
          {data.isVerified ? 'Onaylı' : 'Beklemede'}
        </span>
      </div>
      
      <div className="flex-1">
        <h4 className="text-xl font-black text-slate-800 mb-1">{data.companyName}</h4>
        <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-4">
          {data.city && data.country ? `${data.city}, ${data.country}` : 'Konum Belirtilmedi'}
        </p>
        
        <div className="flex flex-wrap gap-1.5 mb-6">
          {data.expertiseTags.map((s, idx) => (
            <span key={idx} className="px-3 py-1 bg-slate-50 text-slate-500 rounded-lg text-[9px] font-bold uppercase border border-slate-100">
              {s}
            </span>
          ))}
        </div>
      </div>

      <div className="pt-6 border-t border-slate-50 flex justify-between items-center mt-auto">
        <div>
          <div className="flex items-center gap-1.5">
            <span className="material-icons-round text-amber-400 text-sm">star</span>
            <span className="text-xs font-black text-slate-700">{data.rating.toFixed(1)}</span>
          </div>
          <p className="text-[9px] text-slate-400 font-bold uppercase mt-1">{data.totalCompleted} İş Tamamlandı</p>
        </div>
        
        <button 
          onClick={() => onView(data.id)} 
          className="w-10 h-10 flex items-center justify-center rounded-xl bg-blue-50 text-blue-500 hover:bg-blue-500 hover:text-white transition-all shadow-sm"
        >
          <span className="material-icons-round">visibility</span>
        </button>
      </div>
    </div>
  );
};

export default SubcontractorCard;
