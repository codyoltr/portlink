import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const FinansEkle: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editId = searchParams.get('edit');

  const [formData, setFormData] = useState({
    title: '',
    type: 'Hakediş Kaydı',
    subcontractor: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    description: '',
    status: 'Beklemede'
  });

  useEffect(() => {
    if (editId) {
      const localData = localStorage.getItem('finans_kayitlari');
      if (localData) {
        const records = JSON.parse(localData);
        const recordToEdit = records.find((r: any) => String(r.id) === String(editId));
        if (recordToEdit) setFormData(recordToEdit);
      }
    }
  }, [editId]);

  const handleSave = () => {
    if (!formData.title || !formData.amount) {
      alert("Lütfen zorunlu alanları (Başlık ve Tutar) doldurun.");
      return;
    }
    const currentData = localStorage.getItem('finans_kayitlari');
    let records = currentData ? JSON.parse(currentData) : [];
    
    if (editId) {
      records = records.map((r: any) => String(r.id) === String(editId) ? { ...formData, id: editId } : r);
    } else {
      records.push({ ...formData, id: Date.now().toString() });
    }

    localStorage.setItem('finans_kayitlari', JSON.stringify(records));
    navigate('/dashboard/agent/archive-finance');
  };

  const typeOptions = [
    { name: 'Hakediş Kaydı', icon: 'payments', color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { name: 'Fatura Girişi', icon: 'receipt_long', color: 'text-blue-500', bg: 'bg-blue-50' },
    { name: 'Tamamlanan İş Onayı', icon: 'task_alt', color: 'text-purple-500', bg: 'bg-purple-50' },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto p-4 space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
      
      {/* ÜST BAŞLIK */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="w-12 h-12 flex items-center justify-center bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 hover:bg-primary hover:text-white transition-all">
            <span className="material-icons-round">arrow_back</span>
          </button>
          <div>
            <h2 className="text-3xl font-black text-slate-800 dark:text-white tracking-tight">
              {editId ? 'Kaydı Düzenle' : 'Yeni Finansal Hareket'}
            </h2>
            <p className="text-slate-500 font-medium">Sisteme yeni bir finansal döküman tanımlayın.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* SOL TARAF: FORM GİRİŞLERİ */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* KAYIT TÜRÜ SEÇİCİ (Kartlı Sistem) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {typeOptions.map((option) => (
              <button
                key={option.name}
                onClick={() => setFormData({...formData, type: option.name})}
                className={`p-6 rounded-[32px] border-2 transition-all flex flex-col items-center gap-3 ${
                  formData.type === option.name 
                  ? `border-primary bg-primary/5 shadow-lg shadow-primary/5` 
                  : 'border-transparent bg-white dark:bg-slate-800 hover:border-slate-200'
                }`}
              >
                <div className={`w-12 h-12 rounded-2xl ${option.bg} ${option.color} flex items-center justify-center`}>
                  <span className="material-icons-round text-2xl">{option.icon}</span>
                </div>
                <span className={`font-bold text-xs uppercase tracking-tight ${formData.type === option.name ? 'text-primary' : 'text-slate-500'}`}>
                  {option.name}
                </span>
              </button>
            ))}
          </div>

          {/* ANA FORM KUTUSU */}
          <div className="bg-white dark:bg-slate-800 p-8 md:p-10 rounded-[40px] shadow-sm border border-slate-100 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase ml-1 tracking-widest">Kayıt Başlığı</label>
                <div className="relative">
                  <span className="material-icons-round absolute left-4 top-1/2 -translate-y-1/2 text-slate-300">edit_note</span>
                  <input 
                    type="text" 
                    placeholder="Örn: Gemi Motor Revizyonu"
                    className="w-full pl-12 p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl outline-none focus:ring-4 focus:ring-primary/10 font-bold transition-all"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase ml-1 tracking-widest">İlgili Taşeron</label>
                <div className="relative">
                  <span className="material-icons-round absolute left-4 top-1/2 -translate-y-1/2 text-slate-300">business</span>
                  <input 
                    type="text" 
                    placeholder="Firma adını yazın..."
                    className="w-full pl-12 p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl outline-none font-bold"
                    value={formData.subcontractor}
                    onChange={(e) => setFormData({...formData, subcontractor: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase ml-1 tracking-widest">Kayıt Tarihi</label>
                <div className="relative">
                  <span className="material-icons-round absolute left-4 top-1/2 -translate-y-1/2 text-slate-300">calendar_today</span>
                  <input 
                    type="date" 
                    className="w-full pl-12 p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl outline-none font-bold text-slate-600"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase ml-1 tracking-widest">Toplam Tutar</label>
                <div className="relative">
                  <input 
                    type="number" 
                    placeholder="0.00"
                    className="w-full p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl outline-none font-black text-2xl text-primary"
                    value={formData.amount}
                    onChange={(e) => setFormData({...formData, amount: e.target.value})}
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 font-black text-primary/50 text-xl">₺</span>
                </div>
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase ml-1 tracking-widest">Detaylı Açıklama</label>
                <textarea 
                  rows={3}
                  placeholder="Kayıt ile ilgili ek notlar..."
                  className="w-full p-5 bg-slate-50 dark:bg-slate-900 rounded-[24px] outline-none font-medium resize-none"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
              </div>
            </div>
          </div>
        </div>

        {/* SAĞ TARAF: ÖZET VE AKSİYON */}
        <div className="space-y-6">
          <div className="bg-slate-900 text-white p-8 rounded-[40px] shadow-2xl relative overflow-hidden">
            <h4 className="text-sm font-bold opacity-50 uppercase tracking-widest mb-6 font-mono">Kayıt Önizleme</h4>
            <div className="space-y-6 relative z-10">
              <div>
                <p className="text-[10px] uppercase opacity-40 font-bold">Tür</p>
                <p className="font-bold text-lg text-primary-light italic">{formData.type}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase opacity-40 font-bold">Firma</p>
                <p className="font-bold text-xl tracking-tight">{formData.subcontractor || '---'}</p>
              </div>
              <div className="pt-6 border-t border-white/10">
                <p className="text-[10px] uppercase opacity-40 font-bold mb-1">Onaylanacak Tutar</p>
                <p className="text-4xl font-black text-emerald-400">₺{Number(formData.amount || 0).toLocaleString()}</p>
              </div>
            </div>
            {/* Arka plan deseni */}
            <span className="material-icons-round absolute -right-6 -bottom-6 text-[160px] opacity-5">payments</span>
          </div>

          <button 
            onClick={handleSave}
            className="w-full py-6 bg-primary text-white rounded-[32px] font-black text-xl shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
          >
            <span className="material-icons-round">check_circle</span>
            {editId ? 'Değişiklikleri Onayla' : 'Sisteme Kaydet'}
          </button>
          
          <button 
            onClick={() => navigate(-1)}
            className="w-full py-4 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded-[24px] font-bold hover:bg-slate-200 transition-all text-sm"
          >
            İşlemi İptal Et
          </button>
        </div>

      </div>
    </div>
  );
};

export default FinansEkle;