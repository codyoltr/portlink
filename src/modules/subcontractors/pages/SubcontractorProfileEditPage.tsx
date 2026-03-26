import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


type TeamMember = {
  id: number;
  title: string;
  count: number;
  icon: string;
};

type DocumentItem = {
  id: number;
  name: string;
  status: 'Geçerli' | 'Yenileme Gerekli' | 'Eksik';
  expiry: string;
};

const SubcontractorProfileEditPage: React.FC = () => {
  const navigate = useNavigate();

  const [companyName, setCompanyName] = useState('Eren Marine Services');
  const [companyType, setCompanyType] = useState('Taşeron Hizmet Sağlayıcı');
  const [phone, setPhone] = useState('+90 555 222 11 00');
  const [email, setEmail] = useState('info@erenmarine.com');
  const [foundedYear, setFoundedYear] = useState('2018');
  const [experience, setExperience] = useState('7+ Yıl');
  const [description, setDescription] = useState(
    'Gemi bakım, onarım ve teknik operasyon alanlarında hizmet veren taşeron ekip. Mekanik bakım, montaj ve saha koordinasyonu alanlarında aktif hizmet vermektedir.'
  );

  const [expertiseAreas, setExpertiseAreas] = useState<string[]>([
    'Ana Makine Bakımı',
    'Güverte Boyama',
    'Boru Hattı Onarımı',
    'Kaynak ve Montaj',
    'Elektrik Sistemleri',
  ]);
  const [newExpertise, setNewExpertise] = useState('');

  const [serviceRegions, setServiceRegions] = useState<string[]>([
    'Tuzla',
    'Pendik',
    'Yalova',
    'Ambarlı',
    'Gebze',
  ]);
  const [newRegion, setNewRegion] = useState('');

  const [teamStructure, setTeamStructure] = useState<TeamMember[]>([
    { id: 1, title: 'Saha Sorumlusu', count: 2, icon: 'manage_accounts' },
    { id: 2, title: 'Makine Teknikeri', count: 6, icon: 'precision_manufacturing' },
    { id: 3, title: 'Kaynak / Montaj Uzmanı', count: 5, icon: 'construction' },
    { id: 4, title: 'Elektrik Teknik Personeli', count: 3, icon: 'electrical_services' },
    { id: 5, title: 'Destek Personeli', count: 2, icon: 'groups' },
  ]);
  const [newTeamTitle, setNewTeamTitle] = useState('');
  const [newTeamCount, setNewTeamCount] = useState('1');

  const [documents, setDocuments] = useState<DocumentItem[]>([
    { id: 1, name: 'ISO 9001 Kalite Yönetimi', status: 'Geçerli', expiry: '2026-12-12' },
    { id: 2, name: 'İş Güvenliği Yetki Belgesi', status: 'Geçerli', expiry: '2026-08-03' },
    {
      id: 3,
      name: 'Kaynak Operasyon Sertifikası',
      status: 'Yenileme Gerekli',
      expiry: '2025-04-18',
    },
    { id: 4, name: 'Personel Yeterlilik Listesi', status: 'Eksik', expiry: '' },
  ]);

  const [newDocumentName, setNewDocumentName] = useState('');
  const [newDocumentStatus, setNewDocumentStatus] =
    useState<DocumentItem['status']>('Geçerli');
  const [newDocumentExpiry, setNewDocumentExpiry] = useState('');

  const addExpertise = () => {
    const value = newExpertise.trim();
    if (!value) return;
    if (expertiseAreas.includes(value)) return;
    setExpertiseAreas((prev) => [...prev, value]);
    setNewExpertise('');
  };

  const removeExpertise = (item: string) => {
    setExpertiseAreas((prev) => prev.filter((x) => x !== item));
  };

  const addRegion = () => {
    const value = newRegion.trim();
    if (!value) return;
    if (serviceRegions.includes(value)) return;
    setServiceRegions((prev) => [...prev, value]);
    setNewRegion('');
  };

  const removeRegion = (item: string) => {
    setServiceRegions((prev) => prev.filter((x) => x !== item));
  };

  const increaseTeamCount = (id: number) => {
    setTeamStructure((prev) =>
      prev.map((member) =>
        member.id === id ? { ...member, count: member.count + 1 } : member
      )
    );
  };

  const decreaseTeamCount = (id: number) => {
    setTeamStructure((prev) =>
      prev.map((member) =>
        member.id === id
          ? { ...member, count: Math.max(0, member.count - 1) }
          : member
      )
    );
  };

  const removeTeamMember = (id: number) => {
    setTeamStructure((prev) => prev.filter((member) => member.id !== id));
  };

  const addTeamMember = () => {
    const title = newTeamTitle.trim();
    const count = Number(newTeamCount);

    if (!title) return;
    if (Number.isNaN(count) || count < 0) return;

    const newMember: TeamMember = {
      id: Date.now(),
      title,
      count,
      icon: 'badge',
    };

    setTeamStructure((prev) => [...prev, newMember]);
    setNewTeamTitle('');
    setNewTeamCount('1');
  };

  const updateDocument = (
    id: number,
    field: keyof Omit<DocumentItem, 'id'>,
    value: string
  ) => {
    setDocuments((prev) =>
      prev.map((doc) =>
        doc.id === id ? { ...doc, [field]: value } as DocumentItem : doc
      )
    );
  };

  const removeDocument = (id: number) => {
    setDocuments((prev) => prev.filter((doc) => doc.id !== id));
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

    setDocuments((prev) => [...prev, newDoc]);
    setNewDocumentName('');
    setNewDocumentStatus('Geçerli');
    setNewDocumentExpiry('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log({
      companyName,
      companyType,
      phone,
      email,
      foundedYear,
      experience,
      description,
      expertiseAreas,
      serviceRegions,
      teamStructure,
      documents,
    });

    alert('Profil bilgileri güncellendi. (Demo kayıt)');
    navigate('/dashboard/subcontractor/profile-capacity');
  };

  return (
    <>
      <div className="mb-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex items-start gap-4">
          <button
            onClick={() => navigate('/dashboard/subcontractor/profile-capacity')}
            className="mt-1 flex items-center gap-2 text-slate-500 hover:text-primary transition-colors"
          >
            <span className="material-icons-round text-[20px]">arrow_back</span>
            Geri Dön
          </button>

          <div>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
              Profili Düzenle
            </h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-3xl">
              Firma bilgilerinizi, uzmanlık alanlarınızı, hizmet bölgelerinizi,
              ekip yapınızı ve belge durumlarınızı buradan güncelleyebilirsiniz.
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Temel Bilgiler */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700/50 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-5">
            Temel Firma Bilgileri
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-slate-600 dark:text-slate-300 mb-2">
                Firma Adı
              </label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 px-4 py-3 text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-600 dark:text-slate-300 mb-2">
                Firma Türü
              </label>
              <input
                type="text"
                value={companyType}
                onChange={(e) => setCompanyType(e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 px-4 py-3 text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-600 dark:text-slate-300 mb-2">
                Telefon
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 px-4 py-3 text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-600 dark:text-slate-300 mb-2">
                E-posta
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 px-4 py-3 text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-600 dark:text-slate-300 mb-2">
                Kuruluş Yılı
              </label>
              <input
                type="text"
                value={foundedYear}
                onChange={(e) => setFoundedYear(e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 px-4 py-3 text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-600 dark:text-slate-300 mb-2">
                Deneyim
              </label>
              <input
                type="text"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 px-4 py-3 text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-slate-600 dark:text-slate-300 mb-2">
                Firma Açıklaması
              </label>
              <textarea
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 px-4 py-3 text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>
          </div>
        </div>

        {/* Uzmanlık Alanları */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700/50 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-5">
            Uzmanlık Alanları
          </h3>

          <div className="flex flex-col sm:flex-row gap-3 mb-5">
            <input
              type="text"
              value={newExpertise}
              onChange={(e) => setNewExpertise(e.target.value)}
              placeholder="Yeni uzmanlık alanı ekle"
              className="flex-1 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 px-4 py-3 text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-primary/30"
            />
            <button
              type="button"
              onClick={addExpertise}
              className="bg-primary hover:bg-primary/90 text-white font-semibold px-5 py-3 rounded-xl transition"
            >
              Ekle
            </button>
          </div>

          <div className="flex flex-wrap gap-3">
            {expertiseAreas.map((area) => (
              <div
                key={area}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold text-sm"
              >
                <span>{area}</span>
                <button
                  type="button"
                  onClick={() => removeExpertise(area)}
                  className="hover:text-rose-500 transition"
                >
                  <span className="material-icons-round text-[18px]">close</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Hizmet Bölgeleri */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700/50 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-5">
            Hizmet Bölgeleri
          </h3>

          <div className="flex flex-col sm:flex-row gap-3 mb-5">
            <input
              type="text"
              value={newRegion}
              onChange={(e) => setNewRegion(e.target.value)}
              placeholder="Yeni hizmet bölgesi ekle"
              className="flex-1 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 px-4 py-3 text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-primary/30"
            />
            <button
              type="button"
              onClick={addRegion}
              className="bg-primary hover:bg-primary/90 text-white font-semibold px-5 py-3 rounded-xl transition"
            >
              Ekle
            </button>
          </div>

          <div className="flex flex-wrap gap-3">
            {serviceRegions.map((region) => (
              <div
                key={region}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-sm"
              >
                <span>{region}</span>
                <button
                  type="button"
                  onClick={() => removeRegion(region)}
                  className="hover:text-rose-500 transition"
                >
                  <span className="material-icons-round text-[18px]">close</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Ekip Yapısı */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700/50 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white">
              Ekip Yapısı
            </h3>
            <span className="text-sm text-slate-400">
              {teamStructure.length} rol
            </span>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mb-6">
            {teamStructure.map((member) => (
              <div
                key={member.id}
                className="rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-700/50 p-4"
              >
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-primary/10 text-primary">
                      <span className="material-icons-round text-[18px]">
                        {member.icon}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800 dark:text-white">
                        {member.title}
                      </p>
                      <p className="text-sm text-slate-400">Rol</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeTeamMember(member.id)}
                    className="text-rose-500 hover:text-rose-600 transition"
                  >
                    <span className="material-icons-round">delete</span>
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Kişi Sayısı
                  </p>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => decreaseTeamCount(member.id)}
                      className="w-9 h-9 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-white flex items-center justify-center"
                    >
                      <span className="material-icons-round text-[18px]">remove</span>
                    </button>

                    <span className="min-w-[24px] text-center font-bold text-slate-800 dark:text-white">
                      {member.count}
                    </span>

                    <button
                      type="button"
                      onClick={() => increaseTeamCount(member.id)}
                      className="w-9 h-9 rounded-lg bg-primary text-white flex items-center justify-center"
                    >
                      <span className="material-icons-round text-[18px]">add</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-700/50 p-4">
            <h4 className="font-semibold text-slate-800 dark:text-white mb-4">
              Yeni Ekip Rolü Ekle
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-[1fr_140px_120px] gap-3">
              <input
                type="text"
                value={newTeamTitle}
                onChange={(e) => setNewTeamTitle(e.target.value)}
                placeholder="Örn: Boru Montaj Uzmanı"
                className="rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 px-4 py-3 text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-primary/30"
              />

              <input
                type="number"
                min="0"
                value={newTeamCount}
                onChange={(e) => setNewTeamCount(e.target.value)}
                className="rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 px-4 py-3 text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-primary/30"
              />

              <button
                type="button"
                onClick={addTeamMember}
                className="bg-primary hover:bg-primary/90 text-white font-semibold px-5 py-3 rounded-xl transition"
              >
                Rol Ekle
              </button>
            </div>
          </div>
        </div>

        {/* Belgeler */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700/50 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white">
              Belgeler
            </h3>
            <span className="text-sm text-slate-400">{documents.length} belge</span>
          </div>

          <div className="space-y-4 mb-6">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-700/50 p-4"
              >
                <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_220px_180px_56px] gap-3 items-center">
                  <input
                    type="text"
                    value={doc.name}
                    onChange={(e) => updateDocument(doc.id, 'name', e.target.value)}
                    className="rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 px-4 py-3 text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-primary/30"
                  />

                  <select
                    value={doc.status}
                    onChange={(e) => updateDocument(doc.id, 'status', e.target.value)}
                    className="rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 px-4 py-3 text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-primary/30"
                  >
                    <option value="Geçerli">Geçerli</option>
                    <option value="Yenileme Gerekli">Yenileme Gerekli</option>
                    <option value="Eksik">Eksik</option>
                  </select>

                  <input
                    type="date"
                    value={doc.expiry}
                    onChange={(e) => updateDocument(doc.id, 'expiry', e.target.value)}
                    className="rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 px-4 py-3 text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-primary/30"
                  />

                  <button
                    type="button"
                    onClick={() => removeDocument(doc.id)}
                    className="w-12 h-12 rounded-xl bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-300 flex items-center justify-center"
                  >
                    <span className="material-icons-round">delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-700/50 p-4">
            <h4 className="font-semibold text-slate-800 dark:text-white mb-4">
              Yeni Belge Ekle
            </h4>

            <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_220px_180px_120px] gap-3">
              <input
                type="text"
                value={newDocumentName}
                onChange={(e) => setNewDocumentName(e.target.value)}
                placeholder="Belge adı"
                className="rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 px-4 py-3 text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-primary/30"
              />

              <select
                value={newDocumentStatus}
                onChange={(e) =>
                  setNewDocumentStatus(e.target.value as DocumentItem['status'])
                }
                className="rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 px-4 py-3 text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-primary/30"
              >
                <option value="Geçerli">Geçerli</option>
                <option value="Yenileme Gerekli">Yenileme Gerekli</option>
                <option value="Eksik">Eksik</option>
              </select>

              <input
                type="date"
                value={newDocumentExpiry}
                onChange={(e) => setNewDocumentExpiry(e.target.value)}
                className="rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 px-4 py-3 text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-primary/30"
              />

              <button
                type="button"
                onClick={addDocument}
                className="bg-primary hover:bg-primary/90 text-white font-semibold px-5 py-3 rounded-xl transition"
              >
                Belge Ekle
              </button>
            </div>
          </div>
        </div>

        {/* Aksiyonlar */}
        <div className="flex flex-col sm:flex-row gap-3 justify-end">
          <button
            type="button"
            onClick={() => navigate('/dashboard/subcontractor/profile-capacity')}
            className="px-6 py-3 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-white font-semibold"
          >
            İptal
          </button>

          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-primary hover:bg-primary/90 text-white font-semibold shadow-md shadow-primary/20 transition"
          >
            Değişiklikleri Kaydet
          </button>
        </div>
      </form>
    </>
  );
};

export default SubcontractorProfileEditPage;