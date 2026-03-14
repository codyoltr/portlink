import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TaseronRehberi: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [taseronlar, setTaseronlar] = useState<any[]>([]);

  useEffect(() => {
    const localData = localStorage.getItem('taseronlar');
    if (localData) {
      setTaseronlar(JSON.parse(localData));
    } else {
      const varsayilan = [
        { id: '101', name: 'Port Teknik', category: 'Motor Bakım', phone: '0532 000 00 00', email: 'info@portteknik.com', location: 'İstanbul', status: 'Aktif', performance: 5, documents: ['sertifika.pdf'] },
        { id: '102', name: 'Mavi Lojistik', category: 'Lojistik', phone: '0544 111 22 33', email: 'mavi@lojistik.com', location: 'İzmir', status: 'Aktif', performance: 4, documents: [] },
        { id: '103', name: 'Delta Marine', category: 'Gemi İnşa', phone: '0212 555 44 33', email: 'delta@marine.com', location: 'Yalova', status: 'Pasif', performance: 3, documents: ['vergi_levhasi.jpg'] }
      ];
      setTaseronlar(varsayilan);
      localStorage.setItem('taseronlar', JSON.stringify(varsayilan));
    }
  }, []);

  const filteredData = taseronlar.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: string) => {
    if (window.confirm("Bu taşeronu silmek istediğinize emin misiniz?")) {
      const yeniListe = taseronlar.filter(t => String(t.id) !== String(id));
      setTaseronlar(yeniListe);
      localStorage.setItem('taseronlar', JSON.stringify(yeniListe));
    }
  };

  return (
    <div className="w-full space-y-8 animate-in fade-in duration-700">
      
      {/* 1. ÜST İSTATİSTİK KARTLARI */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900 dark:bg-white p-8 rounded-[32px] shadow-xl text-white dark:text-slate-900 relative overflow-hidden group">
          <div className="relative z-10">
            <p className="opacity-70 text-[10px] font-bold uppercase tracking-widest font-mono">Toplam Firma</p>
            <h3 className="text-4xl font-black mt-2 tracking-tighter">{taseronlar.length}</h3>
          </div>
          <span className="material-icons-round absolute -right-2 -bottom-2 text-8xl opacity-10">groups</span>
        </div>

        <div className="bg-white dark:bg-slate-800 p-8 rounded-[32px] shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest font-mono">Ortalama Performans</p>
            <div className="flex items-center gap-1 mt-1">
               <h3 className="text-3xl font-black text-slate-800 dark:text-white">4.8</h3>
               <span className="material-icons-round text-amber-400">star</span>
            </div>
          </div>
          <div className="w-12 h-12 bg-amber-50 text-amber-500 rounded-2xl flex items-center justify-center">
            <span className="material-icons-round">trending_up</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-8 rounded-[32px] shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest font-mono">Belge Durumu</p>
            <h3 className="text-3xl font-black text-slate-800 dark:text-white mt-1">
               {taseronlar.filter(t => t.documents?.length > 0).length} / {taseronlar.length}
            </h3>
          </div>
          <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center">
            <span className="material-icons-round">description</span>
          </div>
        </div>
      </div>

      {/* 2. BAŞLIK VE ARAMA */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-black text-slate-800 dark:text-white">Taşeron Rehberi</h2>
        <button 
          onClick={() => navigate('/dashboard/agent/taseron-ekle')}
          className="px-6 py-4 bg-primary text-white rounded-2xl font-bold shadow-lg hover:scale-[1.02] transition-all"
        >Yeni Taşeron Ekle</button>
      </div>

      <div className="bg-white dark:bg-slate-800 p-3 rounded-[24px] shadow-sm border border-slate-100 flex flex-col md:flex-row gap-3 items-center">
        <div className="flex-1 relative w-full">
          <span className="material-icons-round absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">search</span>
          <input 
            type="text" 
            placeholder="Firma adı veya kategori ara..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-900 rounded-xl outline-none text-sm font-medium"
          />
        </div>
        <button className="px-8 py-3 bg-slate-900 text-white rounded-xl font-bold text-sm">Filtrele</button>
      </div>

      {/* 3. TABLO (PERFORMANS VE BELGE SÜTUNLARI EKLENDİ) */}
      <div className="bg-white dark:bg-slate-800 rounded-[32px] shadow-sm border border-slate-100 overflow-hidden text-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50 border-b text-[10px] uppercase font-black text-slate-400 tracking-widest font-mono">
              <tr>
                <th className="px-8 py-5">Firma / Kategori</th>
                <th className="px-8 py-5 text-center">Performans</th>
                <th className="px-8 py-5 text-center">Belgeler</th>
                <th className="px-8 py-5">Durum</th>
                <th className="px-8 py-5 text-right">İşlem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredData.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 group transition-all">
                  <td className="px-8 py-6">
                    <span className="font-bold text-slate-900 dark:text-white block">{item.name}</span>
                    <span className="text-[10px] text-primary font-bold uppercase">{item.category}</span>
                  </td>
                  
                  {/* PERFORMANS YILDIZLARI */}
                  <td className="px-8 py-6 text-center">
                    <div className="flex items-center justify-center gap-0.5 text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="material-icons-round text-[16px]">
                          {i < (item.performance || 0) ? 'star' : 'star_border'}
                        </span>
                      ))}
                    </div>
                  </td>

                  {/* BELGE DURUMU */}
                  <td className="px-8 py-6 text-center">
                    {item.documents?.length > 0 ? (
                      <button className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg font-bold text-[10px] hover:bg-blue-100 transition-colors">
                        <span className="material-icons-round text-sm">attach_file</span>
                        {item.documents.length} BELGE
                      </button>
                    ) : (
                      <span className="text-slate-300 italic text-[10px]">Belge Yok</span>
                    )}
                  </td>

                  <td className="px-8 py-6">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${item.status === 'Aktif' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                      {item.status}
                    </span>
                  </td>
                  
                  <td className="px-8 py-6 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
                      <button 
                        onClick={() => navigate(`/dashboard/agent/taseron-ekle?edit=${item.id}`)}
                        className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-100 text-slate-400 hover:text-primary transition-all"
                      >
                        <span className="material-icons-round text-lg">edit</span>
                      </button>
                      <button 
                        onClick={() => handleDelete(item.id)}
                        className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-100 text-slate-400 hover:text-rose-500 transition-all"
                      >
                        <span className="material-icons-round text-lg">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TaseronRehberi;