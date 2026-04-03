import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

type RecommendedJob = {
  id: number;
  title: string;
  company: string;
  category: string;
  location: string;
  budget: string;
  deadline: string;
  match: string;
  tag: string;
  description: string;
  requirements: string[];
};

function RecommendedListItem({
  job,
  onOpenDetail,
}: {
  job: RecommendedJob;
  onOpenDetail: (job: RecommendedJob) => void;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-4 md:p-5 hover:border-primary/40 transition">
      <div className="flex flex-col xl:flex-row xl:items-center gap-4 xl:gap-6">
        <div className="flex items-center gap-4 min-w-0 xl:w-[340px]">
          <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center flex-shrink-0">
            <span className="material-icons-round text-slate-500 dark:text-slate-300 text-[28px]">
              directions_boat
            </span>
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="text-[11px] font-bold px-2 py-1 rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300">
                {job.tag}
              </span>
              <span className="text-[11px] font-bold px-2 py-1 rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-300">
                {job.match}
              </span>
            </div>

            <h4 className="font-bold text-slate-800 dark:text-white truncate">{job.title}</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 truncate">
              {job.company}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 flex-1">
          <InfoBox label="Kategori" value={job.category} />
          <InfoBox label="Konum" value={job.location} />
          <InfoBox label="Bütçe" value={job.budget} />
          <InfoBox label="Son Tarih" value={job.deadline} />
        </div>

        <div className="flex items-center justify-end gap-3 xl:w-[220px]">
          <button
            onClick={() => onOpenDetail(job)}
            className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-semibold hover:border-primary/40 hover:text-primary transition"
          >
            Detay Gör
          </button>
          <button className="px-4 py-2.5 rounded-xl bg-primary text-white font-semibold hover:bg-primary/90 transition">
            Teklif Ver
          </button>
        </div>
      </div>
    </div>
  );
}

function InfoBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-slate-50 dark:bg-slate-900/40 p-3">
      <p className="text-[11px] uppercase tracking-wide text-slate-400 dark:text-slate-500">
        {label}
      </p>
      <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 mt-1">
        {value}
      </p>
    </div>
  );
}

function JobDetailModal({
  job,
  onClose,
}: {
  job: RecommendedJob | null;
  onClose: () => void;
}) {
  if (!job) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-[2px]" onClick={onClose} />

      <div className="relative z-[101] w-full max-w-3xl rounded-3xl bg-white dark:bg-slate-800 shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="flex items-start justify-between gap-4 px-6 py-5 border-b border-slate-200 dark:border-slate-700">
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-2">
              <span className="text-[11px] font-bold px-2 py-1 rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300">
                {job.tag}
              </span>
              <span className="text-[11px] font-bold px-2 py-1 rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-300">
                {job.match}
              </span>
            </div>

            <h3 className="text-2xl font-bold text-slate-800 dark:text-white">{job.title}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{job.company}</p>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-500 hover:text-rose-500 hover:border-rose-200 transition"
          >
            <span className="material-icons-round">close</span>
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <InfoBox label="Kategori" value={job.category} />
            <InfoBox label="Konum" value={job.location} />
            <InfoBox label="Bütçe" value={job.budget} />
            <InfoBox label="Son Başvuru" value={job.deadline} />
          </div>

          <div>
            <h4 className="text-base font-bold text-slate-800 dark:text-white mb-2">İş Açıklaması</h4>
            <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">
              {job.description}
            </p>
          </div>

          <div>
            <h4 className="text-base font-bold text-slate-800 dark:text-white mb-3">
              Beklenen Gereksinimler
            </h4>

            <div className="space-y-2">
              {job.requirements.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 rounded-xl bg-slate-50 dark:bg-slate-900/40 px-4 py-3"
                >
                  <span className="material-icons-round text-[18px] text-emerald-500 mt-0.5">
                    check_circle
                  </span>
                  <p className="text-sm text-slate-700 dark:text-slate-200">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="px-6 py-5 border-t border-slate-200 dark:border-slate-700 flex justify-end bg-slate-50 dark:bg-slate-900/30">
          <button
            onClick={onClose}
            className="px-5 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-semibold hover:border-primary/40 hover:text-primary transition"
          >
            Kapat
          </button>
        </div>
      </div>
    </div>
  );
}

export default function DashboardRecommendedJobs() {
  const navigate = useNavigate();
  const [selectedJob, setSelectedJob] = useState<RecommendedJob | null>(null);

  const jobs = useMemo<RecommendedJob[]>(
    () => [
      {
        id: 1,
        title: "Ana Makine Bakımı",
        company: "Kuzey Denizcilik",
        category: "Makine Hizmetleri",
        location: "Tuzla / İstanbul",
        budget: "₺75.000 - ₺95.000",
        deadline: "22 Mart 2026",
        match: "%92 Uyum",
        tag: "Yeni İlan",
        description:
          "Kuru yük gemisi için ana makine bakım süreci yürütülecektir. Taşeron ekipten periyodik bakım, temel arıza kontrolü, ekipman testi ve raporlama desteği beklenmektedir.",
        requirements: [
          "Gemi makine bakımında deneyimli ekip",
          "Sertifikalı teknik personel",
          "Saha raporlama ve teslim dokümantasyonu",
          "Teslim süresine uyum ve vardiyalı çalışma",
        ],
      },
      {
        id: 2,
        title: "Güverte Kumlama ve Boya",
        company: "Marmara Lojistik",
        category: "Boya & Yüzey İşleri",
        location: "Ambarlı / İstanbul",
        budget: "₺60.000 - ₺80.000",
        deadline: "18 Mart 2026",
        match: "%84 Uyum",
        tag: "Popüler",
        description:
          "Geminin dış güverte alanlarında kumlama, yüzey temizliği ve boya uygulaması yapılacaktır. İşi üstlenecek ekipten iş güvenliği kurallarına tam uyum beklenmektedir.",
        requirements: [
          "Kumlama ve boya tecrübesi",
          "Yüzey hazırlık bilgisi",
          "İSG kurallarına uygun çalışma",
          "Malzeme ve ekipman planlaması",
        ],
      },
      {
        id: 3,
        title: "Elektrik Tesisat Kontrolü",
        company: "Delta Marine",
        category: "Elektrik Hizmetleri",
        location: "Yalova",
        budget: "₺50.000 - ₺65.000",
        deadline: "20 Mart 2026",
        match: "%88 Uyum",
        tag: "Acil",
        description:
          "Gemi içi elektrik hatlarının kontrolü, arıza noktalarının tespiti ve gerekli bakım işlemlerinin yapılması istenmektedir.",
        requirements: [
          "Elektrik bakım tecrübesi",
          "Arıza tespit ve onarım bilgisi",
          "Saha güvenliği ve test süreçleri",
          "Kısa sürede mobilize olabilen ekip",
        ],
      },
    ],
    []
  );

  return (
    <section className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-3 mb-6">
        <div>
          <h3 className="text-lg font-bold text-slate-800 dark:text-white">Sana Uygun İlanlar</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Profiline ve geçmiş işlerine göre önerilen ilanlar
          </p>
        </div>

        <button
          onClick={() => navigate("/dashboard/subcontractor/jobs")}
          className="text-primary font-semibold hover:text-primary/80"
        >
          Tüm ilanları gör
        </button>
      </div>

      <div className="space-y-4">
        {jobs.map((job) => (
          <RecommendedListItem key={job.id} job={job} onOpenDetail={setSelectedJob} />
        ))}
      </div>

      <JobDetailModal job={selectedJob} onClose={() => setSelectedJob(null)} />
    </section>
  );
}