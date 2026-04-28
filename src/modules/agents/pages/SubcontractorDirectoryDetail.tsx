import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { agencyService } from '../../../services/agencyService';
import { Subcontractor } from '../../../types/agency.types';

const SubcontractorDirectoryDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [data, setData] = useState<Subcontractor | null>(null);
  const [loading, setLoading] = useState(true);
  const [ratingInput, setRatingInput] = useState<number>(0);
  const [isRating, setIsRating] = useState(false);

  useEffect(() => {
    if (id) fetchDetail(id);
  }, [id]);

  const fetchDetail = async (subId: string) => {
    setLoading(true);
    // In a real app, there would be a getSubcontractorById endpoint.
    // Here we fetch all and find the one.
    const all = await agencyService.getSubcontractors();
    const found = all.find(s => s.id === subId);
    if (found) setData(found);
    setLoading(false);
  };

  const handleRate = async () => {
    if (!id || ratingInput < 1 || ratingInput > 5) return;
    setIsRating(true);
    const success = await agencyService.rateSubcontractor(id, ratingInput);
    if (success) {
      alert("Puanınız başarıyla kaydedildi.");
      fetchDetail(id);
    } else {
      alert("Puanlama sırasında bir hata oluştu.");
    }
    setIsRating(false);
  };

  if (loading) {
    return <div className="p-20 text-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div></div>;
  }

  if (!data) {
    return <div className="p-20 text-center">Taşeron bulunamadı.</div>;
  }



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
            <p className="text-primary font-bold uppercase text-xs mb-8 tracking-widest">{data.city || 'Konum Belirtilmedi'} • Puan: {data.rating.toFixed(1)}</p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
              <div className="p-4 bg-slate-50 rounded-2xl">
                <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Tamamlanan İş</p>
                <p className="font-bold text-slate-800">{data.totalCompleted}</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl">
                <p className="text-[10px] font-black text-slate-400 uppercase mb-1">Konum</p>
                <p className="font-bold text-slate-800">{data.city || '-'}, {data.country || '-'}</p>
              </div>
            </div>

            <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4">Firma Açıklaması</h3>
            <p className="text-slate-600 leading-relaxed italic border-l-4 border-primary/20 pl-6 mb-10">
              "{data.fullName} yetkilisine sahip bu firma, sektördeki deneyimiyle öne çıkmaktadır. {data.isVerified ? 'Portlink tarafından onaylanmış bir hizmet sağlayıcıdır.' : ''}"
            </p>

            <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4">Uzmanlık Alanları</h3>
            <div className="flex flex-wrap gap-2">
              {data.expertiseTags.map(s => (
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
                 <p className="font-bold text-sm tracking-tight">{data.phone || 'Belirtilmedi'}</p>
               </div>
               <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                 <span className="material-icons-round text-primary-light">person</span>
                 <p className="font-bold text-sm tracking-tight">{data.fullName}</p>
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

          {/* TAŞERON PUANLAMA SİSTEMİ */}
          <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm mt-6">
            <h3 className="text-xs font-black text-slate-400 uppercase mb-4 tracking-widest flex items-center gap-2">
              <span className="material-icons-round text-amber-400">star_rate</span> Taşeronu Puanla
            </h3>
            <p className="text-xs text-slate-500 mb-4">Bu taşeronla çalıştıysanız performansını değerlendirebilirsiniz.</p>
            
            <div className="flex gap-2 mb-4">
              {[1, 2, 3, 4, 5].map(star => (
                <button 
                  key={star}
                  onClick={() => setRatingInput(star)}
                  className={`material-icons-round text-3xl transition-colors ${ratingInput >= star ? 'text-amber-400' : 'text-slate-200 hover:text-amber-200'}`}
                >
                  star
                </button>
              ))}
            </div>
            
            <button 
              onClick={handleRate}
              disabled={ratingInput === 0 || isRating}
              className="w-full py-3 bg-primary text-white rounded-xl font-bold text-sm shadow-md shadow-primary/20 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isRating ? 'Kaydediliyor...' : 'Puanı Gönder'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubcontractorDirectoryDetail;