import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ArchiveFinanceDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Tüm kayıtların olduğu bir havuz oluşturuyoruz
  const allData: any = {
    '1': {
      title: 'Makine Dairesi Bakımı',
      company: 'EREN MARINE SERVICES',
      contractorName: 'Ahmet Yılmaz (Baş Tekniker)',
      contractorPhone: '+90 532 000 00 00',
      amount: '85.000',
      date: '18.03.2026',
      startDate: '12.03.2026',
      endDate: '18.03.2026',
      duration: '6 Gün',
      status: 'ONAYLANDI',
      invoiceNo: 'INV-2026-001',
      description: 'Ana makine dairesi periyodik bakımı ve filtre değişim operasyonu tamamlanmıştır.',
    },
    '2': {
      title: 'Güverte Boyama İşlemi',
      company: 'MAVİ LOJİSTİK',
      contractorName: 'Mehmet Demir',
      contractorPhone: '+90 544 111 22 33',
      amount: '12.500',
      date: '15.03.2026',
      startDate: '13.03.2026',
      endDate: '15.03.2026',
      duration: '2 Gün',
      status: 'İŞLEMDE',
      invoiceNo: 'INV-2026-002',
      description: 'Sancak tarafı güverte boyama ve kumlama hazırlık süreci.',
    },
    '3': {
      title: 'Elektrik Panosu Revizyon',
      company: 'PORT TECH',
      contractorName: 'Caner Aydın',
      contractorPhone: '+90 212 555 44 33',
      amount: '4.200',
      date: '10.03.2026',
      startDate: '09.03.2026',
      endDate: '10.03.2026',
      duration: '1 Gün',
      status: 'ÖDENDİ',
      invoiceNo: 'INV-2026-003',
      description: 'Ana pano sigorta değişimi ve kablo düzenleme işlemleri.',
    }
  };

  // Tıklanan ID'ye göre veriyi seçiyoruz, eğer ID yoksa varsayılan olarak 1'i gösteriyoruz
  const detail = allData[id || '1'] || allData['1'];

  return (
    <div className="w-full space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* ÜST NAVİGASYON */}
      <div className="flex items-center gap-4 px-2">
        <button onClick={() => navigate(-1)} className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white shadow-sm border border-slate-100 text-slate-400 hover:text-primary transition-all">
          <span className="material-icons-round">arrow_back</span>
        </button>
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight">{detail.title}</h2>
          <p className="text-primary font-bold uppercase text-[10px] tracking-widest">{detail.company} • Kayıt ID: {id}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm space-y-10">
            <div className="flex justify-between items-start">
               <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Toplam Hakediş</p>
                  <p className="text-5xl font-black text-slate-900 tracking-tighter">₺{detail.amount}</p>
               </div>
               <span className={`px-4 py-2 rounded-full font-black text-[10px] uppercase tracking-widest ${
                 detail.status === 'ÖDENDİ' || detail.status === 'ONAYLANDI' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
               }`}>
                 {detail.status}
               </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-y border-slate-50 py-10">
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase mb-2 tracking-tighter">İşi Yapan Personel</p>
                <div className="flex items-center gap-2 text-slate-800">
                   <span className="material-icons-round text-sm text-primary">person</span>
                   <p className="font-bold">{detail.contractorName}</p>
                </div>
                <p className="text-[11px] text-slate-400 font-medium ml-6">{detail.contractorPhone}</p>
              </div>
              
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase mb-2 tracking-tighter">Tamamlanma Süresi</p>
                <div className="flex items-center gap-2 text-slate-800">
                   <span className="material-icons-round text-sm text-amber-500">timer</span>
                   <p className="font-black text-lg">{detail.duration}</p>
                </div>
                <p className="text-[10px] text-slate-400 font-bold ml-6 tracking-tighter">{detail.startDate} - {detail.endDate}</p>
              </div>

              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase mb-2 tracking-tighter">Fatura Bilgisi</p>
                <p className="font-bold text-slate-800 bg-slate-100 w-fit px-2 py-1 rounded-lg text-sm">{detail.invoiceNo}</p>
              </div>
            </div>

            <div>
               <p className="text-[10px] font-black text-slate-400 uppercase mb-3 tracking-widest">İş Açıklaması & Notlar</p>
               <p className="text-slate-600 leading-relaxed italic bg-slate-50/50 p-6 rounded-3xl border border-slate-100">
                  "{detail.description}"
               </p>
            </div>
          </div>
        </div>

        {/* SAĞ KOLON */}
        <div className="space-y-6">
           <div className="bg-slate-900 text-white p-10 rounded-[40px] shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[350px]">
              <div>
                <h3 className="text-[10px] font-black opacity-30 uppercase tracking-widest mb-10 tracking-[0.2em]">Döküman Aksiyonları</h3>
                <div className="space-y-4 relative z-10">
                   <button onClick={() => alert("Fatura İndiriliyor...")} className="w-full py-4 bg-primary text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-lg">FATURA İNDİR</button>
                   <button onClick={() => window.print()} className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl font-black text-[10px] uppercase tracking-widest">YAZDIR</button>
                </div>
              </div>
              <div className="relative z-10 p-6 bg-white/5 rounded-3xl border border-white/10">
                  <p className="text-[9px] font-black text-white/40 uppercase mb-2">Bilgi</p>
                  <p className="text-[11px] text-white/60 leading-tight">Bu döküman dijital olarak imzalanmış ve arşivlenmiştir.</p>
              </div>
              <span className="material-icons-round absolute -right-6 -bottom-6 text-[160px] opacity-5">receipt_long</span>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ArchiveFinanceDetail;