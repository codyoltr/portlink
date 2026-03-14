import React from 'react';
import { useNavigate } from 'react-router-dom';


const companyInfo = {
  companyName: 'Eren Marine Services',
  companyType: 'Taşeron Hizmet Sağlayıcı',
  phone: '+90 555 222 11 00',
  email: 'info@erenmarine.com',
  foundedYear: '2018',
  experience: '7+ Yıl',
  description:
    'Gemi bakım, onarım ve teknik operasyon alanlarında hizmet veren taşeron ekip. Mekanik bakım, montaj ve saha koordinasyonu alanlarında aktif hizmet vermektedir.',
};

const expertiseAreas = [
  'Ana Makine Bakımı',
  'Güverte Boyama',
  'Boru Hattı Onarımı',
  'Kaynak ve Montaj',
  'Elektrik Sistemleri',
];

const serviceRegions = ['Tuzla', 'Pendik', 'Yalova', 'Ambarlı', 'Gebze'];

const teamStructure = [
  { title: 'Saha Sorumlusu', count: 2, icon: 'manage_accounts' },
  { title: 'Makine Teknikeri', count: 6, icon: 'precision_manufacturing' },
  { title: 'Kaynak / Montaj Uzmanı', count: 5, icon: 'construction' },
  { title: 'Elektrik Teknik Personeli', count: 3, icon: 'electrical_services' },
  { title: 'Destek Personeli', count: 2, icon: 'groups' },
];

const documents = [
  {
    name: 'ISO 9001 Kalite Yönetimi',
    status: 'Geçerli',
    expiry: '12 Aralık 2026',
  },
  {
    name: 'İş Güvenliği Yetki Belgesi',
    status: 'Geçerli',
    expiry: '03 Ağustos 2026',
  },
  {
    name: 'Kaynak Operasyon Sertifikası',
    status: 'Yenileme Gerekli',
    expiry: '18 Nisan 2025',
  },
  {
    name: 'Personel Yeterlilik Listesi',
    status: 'Eksik',
    expiry: '-',
  },
];

const totalTeamCount = teamStructure.reduce((sum, item) => sum + item.count, 0);
const problematicDocumentCount = documents.filter(
  (doc) => doc.status === 'Yenileme Gerekli' || doc.status === 'Eksik'
).length;

const summaryCards = [
  { label: 'Profil Tamamlanma', value: '%92', icon: 'task_alt' },
  { label: 'Toplam Personel', value: String(totalTeamCount), icon: 'groups' },
  { label: 'Aynı Anda İş Kapasitesi', value: '5', icon: 'work_history' },
  { label: 'Belge Sorunu', value: String(problematicDocumentCount), icon: 'warning' },
];

const getDocumentBadge = (status: string) => {
  switch (status) {
    case 'Geçerli':
      return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300';
    case 'Yenileme Gerekli':
      return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300';
    case 'Eksik':
      return 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300';
    default:
      return 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-200';
  }
};

const SubcontractorProfileCapacityPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Header */}
      <div className="mb-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
            Profil ve Kapasite
          </h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-3xl">
            Profil durumunuzu, ekip kapasitenizi, belge yeterliliğinizi ve yeni iş almaya uygunluk
            seviyenizi buradan takip edebilirsiniz.
          </p>
        </div>

        <button
          onClick={() => navigate('/dashboard/subcontractor/profile-edit')}
          className="bg-primary hover:bg-primary/90 text-white font-bold py-2.5 px-6 rounded-xl shadow-md flex items-center gap-2 transition-all"
        >
          <span className="material-icons-round text-sm">edit</span>
          Profili Düzenle
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
        {summaryCards.map((item) => (
          <div
            key={item.label}
            className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50"
          >
            <div className="p-3 w-fit bg-primary/10 text-primary rounded-xl mb-4">
              <span className="material-icons-round">{item.icon}</span>
            </div>
            <h3 className="text-slate-500 dark:text-slate-400 text-sm font-semibold mb-2">
              {item.label}
            </h3>
            <p className="text-3xl font-extrabold text-slate-800 dark:text-white">
              {item.value}
            </p>
          </div>
        ))}
      </div>

      {/* Operational Status */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
        <div className="xl:col-span-2 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-6">
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h3 className="text-xl font-bold text-slate-800 dark:text-white">
                  Operasyonel Uygunluk
                </h3>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
                  İş Almaya Uygun
                </span>
              </div>

              <p className="text-slate-500 dark:text-slate-400 max-w-2xl">
                Taşeron ekip mevcut yoğunluğa rağmen yeni işler almaya uygundur. İki ayrı ekip kısa
                sürede sahaya yönlendirilebilir.
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 dark:bg-slate-900/50 p-4 min-w-[220px] border border-slate-100 dark:border-slate-700/50">
              <p className="text-sm text-slate-400 mb-1">Tahmini Yeni İş Başlangıcı</p>
              <p className="text-lg font-bold text-slate-800 dark:text-white">2 Gün İçinde</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            <div className="rounded-xl bg-slate-50 dark:bg-slate-900/50 p-4 border border-slate-100 dark:border-slate-700/50">
              <p className="text-sm text-slate-400 mb-1">Mevcut Yoğunluk</p>
              <p className="text-lg font-bold text-slate-800 dark:text-white">%60</p>
            </div>

            <div className="rounded-xl bg-slate-50 dark:bg-slate-900/50 p-4 border border-slate-100 dark:border-slate-700/50">
              <p className="text-sm text-slate-400 mb-1">Aktif Saha Ekibi</p>
              <p className="text-lg font-bold text-slate-800 dark:text-white">3</p>
            </div>

            <div className="rounded-xl bg-slate-50 dark:bg-slate-900/50 p-4 border border-slate-100 dark:border-slate-700/50">
              <p className="text-sm text-slate-400 mb-1">Boş Ekip</p>
              <p className="text-lg font-bold text-slate-800 dark:text-white">2</p>
            </div>

            <div className="rounded-xl bg-slate-50 dark:bg-slate-900/50 p-4 border border-slate-100 dark:border-slate-700/50">
              <p className="text-sm text-slate-400 mb-1">Son Güncelleme</p>
              <p className="text-lg font-bold text-slate-800 dark:text-white">14 Mart 2026</p>
            </div>
          </div>

          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-slate-500 dark:text-slate-400">Kapasite Kullanımı</p>
              <p className="text-sm font-bold text-slate-800 dark:text-white">%60</p>
            </div>

            <div className="w-full h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full" style={{ width: '60%' }} />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50">
          <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-5">
            Dikkat Gerektirenler
          </h3>

          <div className="space-y-4">
            <div className="rounded-2xl bg-amber-50 dark:bg-amber-900/20 p-4 border border-amber-100 dark:border-amber-800/40">
              <div className="flex items-start gap-3">
                <span className="material-icons-round text-amber-600 dark:text-amber-300">
                  warning
                </span>
                <div>
                  <p className="font-bold text-amber-800 dark:text-amber-200">
                    1 belge yenilenmeli
                  </p>
                  <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
                    Kaynak Operasyon Sertifikası için yenileme tarihi geçmiş durumda.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-rose-50 dark:bg-rose-900/20 p-4 border border-rose-100 dark:border-rose-800/40">
              <div className="flex items-start gap-3">
                <span className="material-icons-round text-rose-600 dark:text-rose-300">
                  error
                </span>
                <div>
                  <p className="font-bold text-rose-800 dark:text-rose-200">
                    1 belge eksik
                  </p>
                  <p className="text-sm text-rose-700 dark:text-rose-300 mt-1">
                    Personel Yeterlilik Listesi sisteme henüz yüklenmemiş görünüyor.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 p-4 border border-emerald-100 dark:border-emerald-800/40">
              <div className="flex items-start gap-3">
                <span className="material-icons-round text-emerald-600 dark:text-emerald-300">
                  check_circle
                </span>
                <div>
                  <p className="font-bold text-emerald-800 dark:text-emerald-200">
                    Yeni iş için uygun
                  </p>
                  <p className="text-sm text-emerald-700 dark:text-emerald-300 mt-1">
                    Mevcut kapasite ve ekip yapısı yeni iş kabul etmek için yeterli.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50">
          <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-5">
            Uzmanlık ve Hizmet Kapsamı
          </h3>

          <div className="mb-5">
            <p className="text-sm text-slate-400 mb-3">Uzmanlık Alanları</p>
            <div className="flex flex-wrap gap-3">
              {expertiseAreas.map((area) => (
                <span
                  key={area}
                  className="px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold text-sm"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm text-slate-400 mb-3">Hizmet Bölgeleri</p>
            <div className="flex flex-wrap gap-3">
              {serviceRegions.map((region) => (
                <span
                  key={region}
                  className="px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-sm"
                >
                  {region}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-5 rounded-2xl bg-slate-50 dark:bg-slate-900/50 p-4 border border-slate-100 dark:border-slate-700/50">
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-6">
              {companyInfo.description}
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50">
          <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-5">
            Firma Bilgileri
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-xl bg-slate-50 dark:bg-slate-900/50 p-4 border border-slate-100 dark:border-slate-700/50">
              <p className="text-sm text-slate-400 mb-1">Firma Adı</p>
              <p className="font-semibold text-slate-800 dark:text-white">{companyInfo.companyName}</p>
            </div>

            <div className="rounded-xl bg-slate-50 dark:bg-slate-900/50 p-4 border border-slate-100 dark:border-slate-700/50">
              <p className="text-sm text-slate-400 mb-1">Firma Türü</p>
              <p className="font-semibold text-slate-800 dark:text-white">{companyInfo.companyType}</p>
            </div>

            <div className="rounded-xl bg-slate-50 dark:bg-slate-900/50 p-4 border border-slate-100 dark:border-slate-700/50">
              <p className="text-sm text-slate-400 mb-1">Kuruluş Yılı</p>
              <p className="font-semibold text-slate-800 dark:text-white">{companyInfo.foundedYear}</p>
            </div>

            <div className="rounded-xl bg-slate-50 dark:bg-slate-900/50 p-4 border border-slate-100 dark:border-slate-700/50">
              <p className="text-sm text-slate-400 mb-1">Deneyim</p>
              <p className="font-semibold text-slate-800 dark:text-white">{companyInfo.experience}</p>
            </div>

            <div className="rounded-xl bg-slate-50 dark:bg-slate-900/50 p-4 border border-slate-100 dark:border-slate-700/50">
              <p className="text-sm text-slate-400 mb-1">Ana İletişim</p>
              <p className="font-semibold text-slate-800 dark:text-white">{companyInfo.phone}</p>
            </div>

            <div className="rounded-xl bg-slate-50 dark:bg-slate-900/50 p-4 border border-slate-100 dark:border-slate-700/50">
              <p className="text-sm text-slate-400 mb-1">E-posta</p>
              <p className="font-semibold text-slate-800 dark:text-white">{companyInfo.email}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Documents */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50 mb-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-bold text-slate-800 dark:text-white">
            Belge Durumu
          </h3>
          <span className="text-sm text-slate-400">{documents.length} belge</span>
        </div>

        <div className="space-y-4">
          {documents.map((item) => (
            <div
              key={item.name}
              className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-700/50 p-4"
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-primary/10 text-primary">
                  <span className="material-icons-round text-[18px]">description</span>
                </div>

                <div>
                  <p className="font-semibold text-slate-800 dark:text-white">{item.name}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Son Geçerlilik: {item.expiry}
                  </p>
                </div>
              </div>

              <span
                className={`text-xs font-bold px-3 py-1 rounded-full w-fit ${getDocumentBadge(
                  item.status
                )}`}
              >
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Team Structure */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-bold text-slate-800 dark:text-white">
            Ekip Yapısı
          </h3>
          <span className="text-sm text-slate-400">{totalTeamCount} toplam personel</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {teamStructure.map((member) => (
            <div
              key={member.title}
              className="rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-700/50 p-4"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-xl bg-primary/10 text-primary">
                  <span className="material-icons-round text-[18px]">{member.icon}</span>
                </div>
                <p className="font-semibold text-slate-800 dark:text-white">{member.title}</p>
              </div>

              <p className="text-sm text-slate-400 mb-1">Kişi Sayısı</p>
              <p className="text-2xl font-extrabold text-slate-800 dark:text-white">
                {member.count}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SubcontractorProfileCapacityPage;