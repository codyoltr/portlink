import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const TaseronEkle: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editId = searchParams.get('edit');

  const [formData, setFormData] = useState({
    name: '',
    category: 'Gemi İnşa',
    phone: '',
    email: '',
    location: '',
    status: 'Aktif',
    performance: 5, // Performans puanı eklendi
    documents: [] as string[] // Belgeler eklendi
  });

  // Düzenleme modunda verileri çek
  useEffect(() => {
    if (editId) {
      const localData = localStorage.getItem('taseronlar');
      if (localData) {
        const taseronlar = JSON.parse(localData);
        const bulunacak = taseronlar.find((t: any) => String(t.id) === String(editId));
        if (bulunacak) {
          setFormData({
            ...bulunacak,
            performance: bulunacak.performance || 5,
            documents: bulunacak.documents || []
          });
        }
      }
    }
  }, [editId]);

  const handleSave = () => {
    if (!formData.name) { alert("Lütfen Firma Adını giriniz."); return; }

    const currentData = localStorage.getItem('taseronlar');
    let taseronlar = currentData ? JSON.parse(currentData) : [];

    if (editId) {
      taseronlar = taseronlar.map((t: any) => 
        String(t.id) === String(editId) ? { ...formData, id: editId } : t
      );
    } else {
      taseronlar.push({ ...formData, id: Date.now().toString() });
    }

    localStorage.setItem('taseronlar', JSON.stringify(taseronlar));
    alert("Kayıt Başarıyla Tamamlandı!");
    navigate('/dashboard/agent/taseron-rehberi');
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 p-4 animate-in slide-in-from-bottom-4 duration-700">
      
      {/* Üst Başlık */}
      <div className="flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="w-12 h-12 flex items-center justify-center bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 hover:bg-primary hover:text-white transition-all">
          <span className="material-icons-round">arrow_back</span>
        </button>
        <h2 className="text-3xl font-black text-slate-800 dark:text-white tracking-tight">
          {editId ? 'Taşeron Bilgilerini Güncelle' : 'Yeni Taşeron Kaydı'}
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* SOL TARAF: ANA BİLGİLER */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white dark:bg-slate-800 p-10 rounded-[40px] shadow-sm border border-slate-100 dark:border-slate-700/50">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <span className="material-icons-round text-primary">business</span> Firma Bilgileri
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase ml-1">Firma Adı</label>
                <input 
                  type="text" 
                  className="w-full p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl outline-none font-bold focus:ring-4 focus:ring-primary/10 transition-all"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase ml-1">Kategori</label>
                <select 
                  className="w-full p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl outline-none font-bold"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                >
                  <option>Gemi İnşa</option>
                  <option>Motor Bakım</option>
                  <option>Elektrik & Elektronik</option>
                  <option>Lojistik</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase ml-1">İletişim (Tel)</label>
                <input 
                  type="text" 
                  className="w-full p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl outline-none"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase ml-1">Konum</label>
                <input 
                  type="text" 
                  className="w-full p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl outline-none"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                />
              </div>
            </div>
          </div>

          {/* BELGE YÜKLEME KISMI (GERİ GELDİ) */}
          <div className="bg-white dark:bg-slate-800 p-10 rounded-[40px] shadow-sm border border-slate-100 dark:border-slate-700/50">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <span className="material-icons-round text-primary">upload_file</span> Belgeler & Sertifikalar
            </h3>
            <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-[32px] p-12 text-center hover:border-primary transition-colors cursor-pointer group">
              <span className="material-icons-round text-5xl text-slate-300 group-hover:text-primary transition-colors">cloud_upload</span>
              <p className="mt-4 text-slate-500 font-medium text-sm">Belgeleri sürükleyin veya <span className="text-primary font-bold">göz atın</span></p>
              <p className="text-[10px] text-slate-400 mt-1">PDF, PNG, JPG (Maks. 10MB)</p>
            </div>
          </div>
        </div>

        {/* SAĞ TARAF: PERFORMANS VE DURUM */}
        <div className="space-y-8">
          {/* PERFORMANS (GERİ GELDİ) */}
          <div className="bg-slate-900 text-white p-8 rounded-[40px] shadow-xl relative overflow-hidden">
            <h3 className="text-sm font-bold opacity-60 uppercase tracking-widest mb-4">Firma Performansı</h3>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button 
                  key={star}
                  onClick={() => setFormData({...formData, performance: star})}
                  className="transition-transform hover:scale-125"
                >
                  <span className={`material-icons-round text-3xl ${formData.performance >= star ? 'text-amber-400' : 'text-slate-700'}`}>
                    star
                  </span>
                </button>
              ))}
            </div>
            <p className="mt-4 text-xs font-medium text-slate-400 italic">Bu puan taşeronun iş bitirme kalitesini temsil eder.</p>
            <span className="material-icons-round absolute -right-4 -bottom-4 text-8xl opacity-10">insights</span>
          </div>

          <div className="bg-white dark:bg-slate-800 p-8 rounded-[40px] shadow-sm border border-slate-100 dark:border-slate-700/50">
            <label className="text-xs font-bold text-slate-400 uppercase block mb-4">Çalışma Durumu</label>
            <div className="space-y-3">
              {['Aktif', 'Pasif', 'Değerlendirmede'].map((status) => (
                <button
                  key={status}
                  onClick={() => setFormData({...formData, status})}
                  className={`w-full p-4 rounded-2xl font-bold text-sm transition-all border ${
                    formData.status === status 
                    ? 'bg-primary/10 border-primary text-primary' 
                    : 'bg-slate-50 dark:bg-slate-900 border-transparent text-slate-400'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          <button 
            onClick={handleSave}
            className="w-full py-6 bg-primary text-white rounded-[32px] font-black text-xl shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
          >
            {editId ? 'Güncellemeyi Kaydet' : 'Sisteme Tanımla'}
          </button>
        </div>

      </div>
    </div>
  );
};

export default TaseronEkle;