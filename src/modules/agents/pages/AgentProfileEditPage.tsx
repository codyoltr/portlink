import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

type DocumentItem = {
  id: number;
  name: string;
  status: 'Geçerli' | 'Yenileme Gerekli' | 'Eksik';
  expiry: string;
};

const AgentProfileEditPage: React.FC = () => {
  const navigate = useNavigate();

  // Temel Bilgiler State
  const [companyName, setCompanyName] = useState('Portlink Gemi Acentesi');
  const [phone, setPhone] = useState('+90 212 555 12 34');
  const [email, setEmail] = useState('ops@portlinkagency.com');
  const [bio, setBio] = useState(
    'Karadeniz ve Marmara havzasında 15 yılı aşkın süredir güvenilir ve hızlı acente hizmeti veren öncü firma. Transit geçişler, yükleme, tahliye operasyonlarında 7/24 kesintisiz hizmet sağlıyoruz.'
  );

  // Operasyon Alanları State
  const [regions, setRegions] = useState<string[]>(['Türkiye', 'Marmara Denizi']);
  const [newRegion, setNewRegion] = useState('');
  
  const [ports, setPorts] = useState<string[]>(['Ambarlı', 'Harem', 'Haydarpaşa', 'Tuzla', 'Yalova']);
  const [newPort, setNewPort] = useState('');

  // Hizmet Kapsamı State
  const [scopes, setScopes] = useState<string[]>([
    'Liman İşlemleri',
    'Crew (Mürettebat Değişimi)',
    'Teknik Koordinasyon',
    'Yedek Parça Tedariği'
  ]);
  const [newScope, setNewScope] = useState('');

  // Belgeler State
  const [documents, setDocuments] = useState<DocumentItem[]>([
    { id: 1, name: 'Acente Yetki Belgesi', status: 'Geçerli', expiry: '2026-12-12' },
    { id: 2, name: 'Banka Teminat Mektubu', status: 'Geçerli', expiry: '2026-08-03' }
  ]);
  const [newDocumentName, setNewDocumentName] = useState('');
  const [newDocumentStatus, setNewDocumentStatus] = useState<DocumentItem['status']>('Geçerli');
  const [newDocumentExpiry, setNewDocumentExpiry] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('agentProfileData');
    if (saved) {
      const data = JSON.parse(saved);
      if (data.info) {
        setCompanyName(data.info.companyName || '');
        setPhone(data.info.phone || '');
        setEmail(data.info.email || '');
        setBio(data.info.bio || '');
      }
      if (data.regions) setRegions(data.regions);
      if (data.ports) setPorts(data.ports);
      if (data.scopes) setScopes(data.scopes);
      if (data.documents) setDocuments(data.documents);
    }
  }, []);

  // Yardımcı Ekleme Fonksiyonları
  const addTag = (val: string, list: string[], setList: (v: string[]) => void, setVal: (v: string) => void) => {
    const trimmed = val.trim();
    if (!trimmed) return;
    if (list.includes(trimmed)) return;
    setList([...list, trimmed]);
    setVal('');
  };

  const removeTag = (item: string, list: string[], setList: (v: string[]) => void) => {
    setList(list.filter((x) => x !== item));
  };

  const addDocument = () => {
    const name = newDocumentName.trim();
    if (!name) return;
    const newDoc: DocumentItem = {
      id: Date.now(),
      name,
      status: newDocumentStatus,
      expiry: newDocumentExpiry,
    };
    setDocuments([...documents, newDoc]);
    setNewDocumentName('');
    setNewDocumentStatus('Geçerli');
    setNewDocumentExpiry('');
  };

  const updateDocument = (id: number, field: keyof Omit<DocumentItem, 'id'>, value: string) => {
    setDocuments(documents.map(doc => doc.id === id ? { ...doc, [field]: value } as DocumentItem : doc));
  };

  const removeDocument = (id: number) => {
    setDocuments(documents.filter(doc => doc.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const dataToSave = {
      info: {
        companyName,
        phone,
        email,
        bio,
        logo: 'directions_boat'
      },
      regions,
      ports,
      scopes,
      documents
    };

    localStorage.setItem('agentProfileData', JSON.stringify(dataToSave));

    alert('Acente profil bilgileri güncellendi. (Canlı Demo)');
    navigate('/dashboard/agent/profile');
  };

  return (
    <>
      <div className="mb-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex items-start gap-4">
          <button
            onClick={() => navigate('/dashboard/agent/profile')}
            className="mt-1 flex items-center gap-2 text-slate-500 hover:text-primary transition-colors"
          >
            <span className="material-icons-round text-[20px]">arrow_back</span>
            Geri Dön
          </button>
          <div>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
              Acente Profilini Düzenle
            </h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-3xl">
              Dış dünyada görünen firma vitrininizi, bilgilerinizi ve belgelerinizi buradan güncelleyebilirsiniz.
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Temel Bilgiler */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700/50 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-5">Temel Firma Bilgileri</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-slate-600 dark:text-slate-300 mb-2">Firma Adı</label>
              <input type="text" value={companyName} onChange={e => setCompanyName(e.target.value)} className="w-full rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 px-4 py-3 text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-600 dark:text-slate-300 mb-2">Telefon</label>
              <input type="text" value={phone} onChange={e => setPhone(e.target.value)} className="w-full rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 px-4 py-3 text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-600 dark:text-slate-300 mb-2">E-posta</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 px-4 py-3 text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-slate-600 dark:text-slate-300 mb-2">Firma Açıklaması (Bio)</label>
              <textarea rows={4} value={bio} onChange={e => setBio(e.target.value)} className="w-full rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 px-4 py-3 text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-primary/30" />
            </div>
          </div>
        </div>

        {/* Hizmet Verdiği Bölgeler & Limanlar */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700/50 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-5">Operasyon Alanları</h3>
          
          <div className="mb-8">
            <label className="block text-sm font-semibold text-slate-600 dark:text-slate-300 mb-2">Bölgeler / Ülkeler</label>
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <input type="text" value={newRegion} onChange={e => setNewRegion(e.target.value)} placeholder="Yeni bölge ekle (Örn: Karadeniz)" className="flex-1 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 px-4 py-3 text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-primary/30" />
              <button type="button" onClick={() => addTag(newRegion, regions, setRegions, setNewRegion)} className="bg-primary hover:bg-primary/90 text-white font-semibold px-5 py-3 rounded-xl transition">Ekle</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {regions.map(r => (
                <div key={r} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-sm">
                  <span>{r}</span>
                  <button type="button" onClick={() => removeTag(r, regions, setRegions)} className="hover:text-rose-500 transition"><span className="material-icons-round text-[16px]">close</span></button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-600 dark:text-slate-300 mb-2">Limanlar</label>
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <input type="text" value={newPort} onChange={e => setNewPort(e.target.value)} placeholder="Yeni liman ekle (Örn: Nemrut)" className="flex-1 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 px-4 py-3 text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-primary/30" />
              <button type="button" onClick={() => addTag(newPort, ports, setPorts, setNewPort)} className="bg-primary hover:bg-primary/90 text-white font-semibold px-5 py-3 rounded-xl transition">Ekle</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {ports.map(p => (
                <div key={p} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 font-semibold text-sm border border-blue-100 dark:border-blue-800">
                  <span>{p}</span>
                  <button type="button" onClick={() => removeTag(p, ports, setPorts)} className="hover:text-rose-500 transition"><span className="material-icons-round text-[16px]">close</span></button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Hizmet Kapsamı */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700/50 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-5">Hizmet Kapsamı</h3>
          <div className="flex flex-col sm:flex-row gap-3 mb-5">
            <input type="text" value={newScope} onChange={e => setNewScope(e.target.value)} placeholder="Örn: Evrak Takibi" className="flex-1 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 px-4 py-3 text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-primary/30" />
            <button type="button" onClick={() => addTag(newScope, scopes, setScopes, setNewScope)} className="bg-primary hover:bg-primary/90 text-white font-semibold px-5 py-3 rounded-xl transition">Ekle</button>
          </div>
          <div className="flex flex-col gap-2">
            {scopes.map(scope => (
              <div key={scope} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-700/50">
                <div className="flex items-center gap-3">
                  <span className="material-icons-round text-primary text-sm">check_circle</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-200 text-sm">{scope}</span>
                </div>
                <button type="button" onClick={() => removeTag(scope, scopes, setScopes)} className="text-rose-500 hover:text-rose-600 transition p-1">
                  <span className="material-icons-round text-[18px]">delete</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Belgeler */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700/50 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white">Resmî Belgeler ve Onaylar</h3>
            <span className="text-sm text-slate-400">{documents.length} belge</span>
          </div>

          <div className="space-y-4 mb-6">
            {documents.map((doc) => (
              <div key={doc.id} className="rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-700/50 p-4">
                <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_220px_180px_56px] gap-3 items-center">
                  <input type="text" value={doc.name} onChange={e => updateDocument(doc.id, 'name', e.target.value)} className="rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 px-4 py-3 text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-primary/30" />
                  <select value={doc.status} onChange={e => updateDocument(doc.id, 'status', e.target.value)} className="rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 px-4 py-3 text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-primary/30">
                    <option value="Geçerli">Geçerli</option>
                    <option value="Yenileme Gerekli">Yenileme Gerekli</option>
                    <option value="Eksik">Eksik</option>
                  </select>
                  <input type="date" value={doc.expiry} onChange={e => updateDocument(doc.id, 'expiry', e.target.value)} className="rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 px-4 py-3 text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-primary/30" />
                  <button type="button" onClick={() => removeDocument(doc.id)} className="w-12 h-12 rounded-xl bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-300 flex items-center justify-center">
                    <span className="material-icons-round">delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-700/50 p-4">
            <h4 className="font-semibold text-slate-800 dark:text-white mb-4">Yeni Belge Ekle</h4>
            <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_220px_180px_120px] gap-3">
              <input type="text" value={newDocumentName} onChange={e => setNewDocumentName(e.target.value)} placeholder="Belge adı" className="rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 px-4 py-3 text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-primary/30" />
              <select value={newDocumentStatus} onChange={e => setNewDocumentStatus(e.target.value as DocumentItem['status'])} className="rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 px-4 py-3 text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-primary/30">
                <option value="Geçerli">Geçerli</option>
                <option value="Yenileme Gerekli">Yenileme Gerekli</option>
                <option value="Eksik">Eksik</option>
              </select>
              <input type="date" value={newDocumentExpiry} onChange={e => setNewDocumentExpiry(e.target.value)} className="rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 px-4 py-3 text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-primary/30" />
              <button type="button" onClick={addDocument} className="bg-primary hover:bg-primary/90 text-white font-semibold px-5 py-3 rounded-xl transition">Ekle</button>
            </div>
          </div>
        </div>

        {/* Aksiyonlar */}
        <div className="flex flex-col sm:flex-row gap-3 justify-end pb-12">
          <button type="button" onClick={() => navigate('/dashboard/agent/profile')} className="px-6 py-3 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-white font-semibold">İptal</button>
          <button type="submit" className="px-6 py-3 rounded-xl bg-primary hover:bg-primary/90 text-white font-semibold shadow-md shadow-primary/20 transition">Değişiklikleri Kaydet</button>
        </div>
      </form>
    </>
  );
};

export default AgentProfileEditPage;
