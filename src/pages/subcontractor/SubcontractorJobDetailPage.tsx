import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";

const timelineItems = [
  {
    title: "İş Onaylandı",
    date: "08 Mart 2026",
    description: "Acente tarafından teklif onaylandı ve iş taşeron ekibine atandı.",
    icon: "check_circle",
    color: "emerald",
  },
  {
    title: "Saha Hazırlığı Tamamlandı",
    date: "09 Mart 2026",
    description: "Ekipman, personel ve güvenlik kontrolleri tamamlandı.",
    icon: "build_circle",
    color: "blue",
  },
  {
    title: "Bakım Süreci Başladı",
    date: "10 Mart 2026",
    description: "Ana makine bakım operasyonu sahada aktif olarak başlatıldı.",
    icon: "engineering",
    color: "indigo",
  },
  {
    title: "Ara Kontrol Yapıldı",
    date: "13 Mart 2026",
    description: "Parça değişimleri ve performans kontrolleri ara rapora işlendi.",
    icon: "fact_check",
    color: "amber",
  },
];

const teamMembers = [
  { name: "Ahmet Kaya", role: "Saha Sorumlusu", phone: "+90 555 111 22 33" },
  { name: "Mehmet Demir", role: "Makine Teknikeri", phone: "+90 555 444 55 66" },
  { name: "Ali Çetin", role: "Kaynak / Montaj Uzmanı", phone: "+90 555 777 88 99" },
];

const documents = [
  { name: "İş Emri Formu.pdf", type: "PDF", status: "Yüklendi" },
  { name: "Güvenlik Kontrol Listesi.xlsx", type: "Excel", status: "Yüklendi" },
  { name: "Ara Kontrol Raporu.docx", type: "Word", status: "Hazırlanıyor" },
];

const getTimelineStyles = (color: string) => {
  switch (color) {
    case "emerald":
      return {
        wrapper: "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-300",
        line: "bg-emerald-200 dark:bg-emerald-800",
      };
    case "blue":
      return {
        wrapper: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-300",
        line: "bg-blue-200 dark:bg-blue-800",
      };
    case "indigo":
      return {
        wrapper: "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-300",
        line: "bg-indigo-200 dark:bg-indigo-800",
      };
    case "amber":
      return {
        wrapper: "bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-300",
        line: "bg-amber-200 dark:bg-amber-800",
      };
    default:
      return {
        wrapper: "bg-slate-50 dark:bg-slate-700/30 text-slate-600 dark:text-slate-300",
        line: "bg-slate-200 dark:bg-slate-700",
      };
  }
};

const infoCards = [
  { label: "Firma", value: "Kuzey Denizcilik", icon: "apartment" },
  { label: "Konum", value: "Tuzla", icon: "location_on" },
  { label: "Başlangıç", value: "10 Mart 2026", icon: "event" },
  { label: "Bitiş", value: "18 Mart 2026", icon: "event_available" },
  { label: "Hakediş", value: "₺48.000", icon: "payments" },
  { label: "Öncelik", value: "Yüksek", icon: "priority_high" },
];

const reportContent = {
  reportNo: "RPT-2026-001",
  preparedAt: "14 Mart 2026",
  approvedBy: "Kuzey Denizcilik Operasyon Birimi",
  summary:
    "Ana makine bakım operasyonu planlanan takvime uygun şekilde ilerlemektedir. Kritik arıza tespit edilmemiş, ara kontroller başarıyla tamamlanmıştır.",
  completedWorks: [
    "Ana makine genel görsel kontrolü tamamlandı",
    "Bağlantı ve montaj noktaları kontrol edildi",
    "Sızdırmazlık testleri uygulandı",
    "Parça performans ölçümleri raporlandı",
  ],
  nextSteps: [
    "Son titreşim testi yapılacak",
    "Nihai kontrol formu hazırlanacak",
    "Kapanış raporu sisteme yüklenecek",
  ],
};

const SubcontractorJobDetailPage: React.FC = () => {
  const { id } = useParams();
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [contactMessage, setContactMessage] = useState("");
  const [contactSubject, setContactSubject] = useState("İş Süreci Hakkında Bilgi Talebi");

  const handleDownloadReport = () => {
    const content = `
PORTLINK CRM - İŞ RAPORU

Rapor No: ${reportContent.reportNo}
İş No: #${id}
İş Adı: Ana Makine Bakımı
Firma: Kuzey Denizcilik
Konum: Tuzla
Hazırlanma Tarihi: ${reportContent.preparedAt}
Onaylayan: ${reportContent.approvedBy}
Genel İlerleme: %65
Toplam Hakediş: ₺48.000
Tahmini Tamamlanma: 18 Mart 2026

ÖZET
${reportContent.summary}

TAMAMLANAN İŞLER
- ${reportContent.completedWorks.join("\n- ")}

SONRAKİ ADIMLAR
- ${reportContent.nextSteps.join("\n- ")}

OPERASYON NOTU
Saha ekibi tarafından iletilen son bilgiye göre planlanan bakım adımları zamanında ilerlemektedir.
`.trim();

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `is-raporu-${id}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleSendMessage = () => {
    alert("Mesaj gönderildi. (Demo)");
    setIsContactModalOpen(false);
    setContactMessage("");
    setContactSubject("İş Süreci Hakkında Bilgi Talebi");
  };

  return (
    <>
      <div className="mb-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
              Ana Makine Bakımı
            </h2>
            <span className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 text-xs font-bold px-3 py-1 rounded-full">
              Devam Ediyor
            </span>
            <span className="bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-200 text-xs font-bold px-3 py-1 rounded-full">
              İş No: #{id}
            </span>
          </div>

          <p className="text-slate-500 dark:text-slate-400 max-w-3xl">
            Tuzla tersanesinde bulunan gemi için ana makine bakım süreci yürütülmektedir.
            Operasyon sahada aktif olarak devam etmekte olup, bakım planı ve ara kontroller
            takvime uygun şekilde ilerlemektedir.
          </p>
        </div>

        <div className="flex gap-3">
          <Link
            to="/dashboard/subcontractor/active-jobs"
            className="px-4 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-white font-semibold transition"
          >
            Geri Dön
          </Link>
          <button
            onClick={handleDownloadReport}
            className="px-4 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-white font-semibold transition shadow-md shadow-primary/20"
          >
            Rapor İndir
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
        <div className="xl:col-span-2 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white">
              İş Genel Bilgileri
            </h3>
            <span className="text-sm text-slate-400">Son güncelleme: 14 Mart 2026</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {infoCards.map((item) => (
              <div
                key={item.label}
                className="rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-700/50 p-4"
              >
                <div className="flex items-center gap-2 mb-2 text-slate-400">
                  <span className="material-icons-round text-[18px]">{item.icon}</span>
                  <span className="text-sm">{item.label}</span>
                </div>
                <p className="font-bold text-slate-800 dark:text-white">{item.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-700/50 p-5">
            <h4 className="font-bold text-slate-800 dark:text-white mb-3">İş Açıklaması</h4>
            <p className="text-slate-600 dark:text-slate-300 leading-7">
              Bu iş kapsamında ana makine üzerinde planlı periyodik bakım, performans düşüklüğüne
              sebep olan parçaların kontrolü, gerekli sızdırmazlık testleri, bağlantı ve montaj
              kontrolleri ile operasyon sonrası çalışma doğrulama adımları uygulanmaktadır.
              İş güvenliği prosedürleri doğrultusunda saha erişimi kısıtlı tutulmuş ve günlük
              ilerleme raporu üzerinden süreç takip edilmektedir.
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-5">
            İş Durumu Özeti
          </h3>

          <div className="mb-5">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-slate-500 dark:text-slate-400">Genel İlerleme</span>
              <span className="font-bold text-slate-800 dark:text-white">%65</span>
            </div>
            <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3 overflow-hidden">
              <div className="bg-primary h-3 rounded-full" style={{ width: "65%" }} />
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-xl bg-slate-50 dark:bg-slate-900/50 p-4">
              <p className="text-sm text-slate-400 mb-1">Toplam Hakediş</p>
              <p className="text-2xl font-extrabold text-slate-800 dark:text-white">₺48.000</p>
            </div>

            <div className="rounded-xl bg-slate-50 dark:bg-slate-900/50 p-4">
              <p className="text-sm text-slate-400 mb-1">Tahmini Tamamlanma</p>
              <p className="text-lg font-bold text-slate-800 dark:text-white">18 Mart 2026</p>
            </div>

            <div className="rounded-xl bg-slate-50 dark:bg-slate-900/50 p-4">
              <p className="text-sm text-slate-400 mb-1">Saha Durumu</p>
              <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">Operasyon Aktif</p>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <button
              onClick={() => setIsReportModalOpen(true)}
              className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 rounded-xl transition"
            >
              İş Raporu Gör
            </button>
            <button
              onClick={() => setIsContactModalOpen(true)}
              className="w-full bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-white font-bold py-3 rounded-xl transition"
            >
              Acente ile İletişim
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm">
          <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-5">
            İş Zaman Çizelgesi
          </h3>

          <div className="space-y-5">
            {timelineItems.map((item, index) => {
              const styles = getTimelineStyles(item.color);
              return (
                <div key={item.title} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${styles.wrapper}`}>
                      <span className="material-icons-round text-[18px]">{item.icon}</span>
                    </div>
                    {index !== timelineItems.length - 1 && (
                      <div className={`w-0.5 flex-1 mt-2 ${styles.line}`} />
                    )}
                  </div>

                  <div className="pb-3">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h4 className="font-bold text-slate-800 dark:text-white">{item.title}</h4>
                      <span className="text-xs text-slate-400">{item.date}</span>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-5">
              Atanan Ekip
            </h3>

            <div className="space-y-4">
              {teamMembers.map((member) => (
                <div
                  key={member.name}
                  className="flex items-center justify-between rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-700/50 p-4"
                >
                  <div>
                    <p className="font-bold text-slate-800 dark:text-white">{member.name}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{member.role}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-slate-400">İletişim</p>
                    <p className="font-semibold text-slate-700 dark:text-slate-200">{member.phone}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-5">
              Evrak ve Dosyalar
            </h3>

            <div className="space-y-3">
              {documents.map((doc) => (
                <div
                  key={doc.name}
                  className="flex items-center justify-between rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-700/50 p-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-primary/10 text-primary">
                      <span className="material-icons-round text-[18px]">description</span>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800 dark:text-white">{doc.name}</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">{doc.type}</p>
                    </div>
                  </div>

                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-200">
                    {doc.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-sm">
        <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">
          Operasyon Notları
        </h3>
        <div className="rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-700/50 p-5">
          <p className="text-slate-600 dark:text-slate-300 leading-7">
            Saha ekibi tarafından iletilen son bilgiye göre planlanan bakım adımları zamanında
            ilerlemektedir. Yedek parça bekleyen kritik bir durum bulunmamaktadır. Ara kontrol
            sonrasında makine titreşim değerlerinde iyileşme gözlemlenmiştir. Nihai testten sonra
            kapanış raporu sisteme yüklenecektir.
          </p>
        </div>
      </div>

      {/* İş Raporu Modal */}
      {isReportModalOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-slate-900/60 p-4">
          <div className="w-full max-w-3xl rounded-3xl bg-white dark:bg-slate-800 shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200 dark:border-slate-700">
              <div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-white">İş Raporu</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  İş No: #{id} • Rapor No: {reportContent.reportNo}
                </p>
              </div>

              <button
                onClick={() => setIsReportModalOpen(false)}
                className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-200 flex items-center justify-center"
              >
                <span className="material-icons-round">close</span>
              </button>
            </div>

            <div className="p-6 max-h-[75vh] overflow-y-auto space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-2xl bg-slate-50 dark:bg-slate-900/50 p-4">
                  <p className="text-sm text-slate-400 mb-1">İş Adı</p>
                  <p className="font-bold text-slate-800 dark:text-white">Ana Makine Bakımı</p>
                </div>
                <div className="rounded-2xl bg-slate-50 dark:bg-slate-900/50 p-4">
                  <p className="text-sm text-slate-400 mb-1">Firma</p>
                  <p className="font-bold text-slate-800 dark:text-white">Kuzey Denizcilik</p>
                </div>
                <div className="rounded-2xl bg-slate-50 dark:bg-slate-900/50 p-4">
                  <p className="text-sm text-slate-400 mb-1">Hazırlanma Tarihi</p>
                  <p className="font-bold text-slate-800 dark:text-white">{reportContent.preparedAt}</p>
                </div>
                <div className="rounded-2xl bg-slate-50 dark:bg-slate-900/50 p-4">
                  <p className="text-sm text-slate-400 mb-1">Onaylayan</p>
                  <p className="font-bold text-slate-800 dark:text-white">{reportContent.approvedBy}</p>
                </div>
              </div>

              <div className="rounded-2xl bg-slate-50 dark:bg-slate-900/50 p-5">
                <h4 className="font-bold text-slate-800 dark:text-white mb-3">Rapor Özeti</h4>
                <p className="text-slate-600 dark:text-slate-300 leading-7">{reportContent.summary}</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="rounded-2xl bg-slate-50 dark:bg-slate-900/50 p-5">
                  <h4 className="font-bold text-slate-800 dark:text-white mb-3">Tamamlanan İşler</h4>
                  <ul className="space-y-2">
                    {reportContent.completedWorks.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-slate-600 dark:text-slate-300">
                        <span className="material-icons-round text-primary text-[18px] mt-0.5">check_circle</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl bg-slate-50 dark:bg-slate-900/50 p-5">
                  <h4 className="font-bold text-slate-800 dark:text-white mb-3">Sonraki Adımlar</h4>
                  <ul className="space-y-2">
                    {reportContent.nextSteps.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-slate-600 dark:text-slate-300">
                        <span className="material-icons-round text-amber-500 text-[18px] mt-0.5">schedule</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-end gap-3 px-6 py-5 border-t border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-900/30">
              <button
                onClick={() => setIsReportModalOpen(false)}
                className="px-5 py-3 rounded-xl bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-white font-semibold transition"
              >
                Kapat
              </button>
              <button
                onClick={handleDownloadReport}
                className="px-5 py-3 rounded-xl bg-primary hover:bg-primary/90 text-white font-semibold transition shadow-md shadow-primary/20"
              >
                Raporu İndir
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Acente İletişim Modal */}
      {isContactModalOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-slate-900/60 p-4">
          <div className="w-full max-w-2xl rounded-3xl bg-white dark:bg-slate-800 shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200 dark:border-slate-700">
              <div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-white">Acente ile İletişim</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  İş süreciyle ilgili mesaj gönderebilirsiniz.
                </p>
              </div>

              <button
                onClick={() => setIsContactModalOpen(false)}
                className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-200 flex items-center justify-center"
              >
                <span className="material-icons-round">close</span>
              </button>
            </div>

            <div className="p-6 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-2xl bg-slate-50 dark:bg-slate-900/50 p-4">
                  <p className="text-sm text-slate-400 mb-1">Acente Yetkilisi</p>
                  <p className="font-bold text-slate-800 dark:text-white">Ayşe Demir</p>
                </div>
                <div className="rounded-2xl bg-slate-50 dark:bg-slate-900/50 p-4">
                  <p className="text-sm text-slate-400 mb-1">Firma</p>
                  <p className="font-bold text-slate-800 dark:text-white">Kuzey Denizcilik</p>
                </div>
                <div className="rounded-2xl bg-slate-50 dark:bg-slate-900/50 p-4">
                  <p className="text-sm text-slate-400 mb-1">Telefon</p>
                  <p className="font-bold text-slate-800 dark:text-white">+90 555 333 44 55</p>
                </div>
                <div className="rounded-2xl bg-slate-50 dark:bg-slate-900/50 p-4">
                  <p className="text-sm text-slate-400 mb-1">E-posta</p>
                  <p className="font-bold text-slate-800 dark:text-white">operasyon@kuzeydenizcilik.com</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
                  Konu
                </label>
                <input
                  type="text"
                  value={contactSubject}
                  onChange={(e) => setContactSubject(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900/50 px-4 py-3 text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
                  Mesaj
                </label>
                <textarea
                  rows={6}
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  placeholder="Acente yetkilisine iletmek istediğiniz mesajı yazın..."
                  className="w-full rounded-2xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-900/50 px-4 py-3 text-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-primary/30 resize-none"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-end gap-3 px-6 py-5 border-t border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-900/30">
              <button
                onClick={() => setIsContactModalOpen(false)}
                className="px-5 py-3 rounded-xl bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-white font-semibold transition"
              >
                Kapat
              </button>
              <button
                onClick={handleSendMessage}
                className="px-5 py-3 rounded-xl bg-primary hover:bg-primary/90 text-white font-semibold transition shadow-md shadow-primary/20"
              >
                Mesaj Gönder
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SubcontractorJobDetailPage;