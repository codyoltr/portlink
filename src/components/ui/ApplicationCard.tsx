import React from 'react';
import { Application } from '../../types/agency.types';

interface ApplicationCardProps {
  application: Application;
  onAccept: (id: string) => void;
  onReject: (id: string) => void;
}

const ApplicationCard: React.FC<ApplicationCardProps> = ({ application, onAccept, onReject }) => {
  return (
    <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col gap-4">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-primary overflow-hidden border border-slate-100">
            {application.subcontractorLogoUrl ? (
              <img src={application.subcontractorLogoUrl} alt={application.subcontractorCompanyName} className="w-full h-full object-cover" />
            ) : (
              <span className="material-icons-round text-xl">precision_manufacturing</span>
            )}
          </div>
          <div>
            <h4 className="text-lg font-black text-slate-800 leading-tight">{application.subcontractorCompanyName}</h4>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex items-center gap-1">
                <span className="material-icons-round text-amber-400 text-[14px]">star</span>
                <span className="text-[10px] font-black text-slate-700">{application.subcontractorRating.toFixed(1)}</span>
              </div>
              <span className="w-1 h-1 rounded-full bg-slate-200"></span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{application.jobTitle}</span>
            </div>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
          application.status === 'pending' ? 'bg-amber-50 text-amber-600' :
          application.status === 'accepted' ? 'bg-emerald-50 text-emerald-600' :
          'bg-rose-50 text-rose-600'
        }`}>
          {application.status === 'pending' ? 'Bekliyor' : application.status === 'accepted' ? 'Kabul Edildi' : 'Reddedildi'}
        </span>
      </div>

      <div className="bg-slate-50/50 rounded-2xl p-4 border border-slate-50">
        <div className="grid grid-cols-2 gap-4 mb-3">
          <div>
            <p className="text-[9px] font-black text-slate-400 uppercase mb-1">Teklif Tutarı</p>
            <p className="font-bold text-slate-800">{application.price.toLocaleString()} {application.currency}</p>
          </div>
          <div>
            <p className="text-[9px] font-black text-slate-400 uppercase mb-1">Tahmini Süre</p>
            <p className="font-bold text-slate-800">{application.estimatedDays} Gün</p>
          </div>
        </div>
        {application.coverNote && (
          <div>
            <p className="text-[9px] font-black text-slate-400 uppercase mb-1">Ön Yazı</p>
            <p className="text-xs text-slate-600 leading-relaxed italic border-l-2 border-primary/20 pl-2">"{application.coverNote}"</p>
          </div>
        )}
      </div>

      {application.status === 'pending' && (
        <div className="flex gap-2 mt-2">
          <button 
            onClick={() => onReject(application.id)}
            className="flex-1 py-3 bg-slate-50 hover:bg-rose-50 text-slate-500 hover:text-rose-600 rounded-xl font-bold text-xs transition-colors"
          >
            Reddet
          </button>
          <button 
            onClick={() => onAccept(application.id)}
            className="flex-1 py-3 bg-primary hover:bg-primary-dark text-white rounded-xl font-bold text-xs shadow-md shadow-primary/20 transition-all hover:shadow-lg hover:-translate-y-0.5"
          >
            Kabul Et
          </button>
        </div>
      )}
    </div>
  );
};

export default ApplicationCard;
