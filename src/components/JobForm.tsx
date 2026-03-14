import React, { useMemo, useState } from "react";
import {
  Anchor,
  Ship,
  MapPin,
  Calendar,
  DollarSign,
  Paperclip,
  Wrench,
  Truck,
  FileText,
  CheckCircle2
} from "lucide-react";

/* -----------------------------------------
   Step Tanımı
----------------------------------------- */

const steps = [
  { id: 1, title: "Hizmet", icon: Anchor },
  { id: 2, title: "Gemi & Lokasyon", icon: Ship },
  { id: 3, title: "Detay & Bütçe", icon: DollarSign },
  { id: 4, title: "Özet", icon: CheckCircle2 }
];

/* -----------------------------------------
   Component
----------------------------------------- */

const JobForm = () => {
  const [step, setStep] = useState(1);
  const [files, setFiles] = useState<File[]>([]);

  const [formData, setFormData] = useState({
    serviceType: "",
    title: "",
    vessel: "",
    imo: "",
    location: "",
    startDate: "",
    deadline: "",
    budget: "",
    description: ""
  });

  const progress = useMemo(
    () => ((step - 1) / (steps.length - 1)) * 100,
    [step]
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const next = () => setStep((s) => Math.min(s + 1, steps.length));
  const prev = () => setStep((s) => Math.max(s - 1, 1));

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setFiles([...files, ...Array.from(e.target.files)]);
  };

  const removeFile = (index: number) => {
    const arr = [...files];
    arr.splice(index, 1);
    setFiles(arr);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("JOB DATA:", formData);
    console.log("FILES:", files);
  };

  /* -----------------------------------------
     Stepper
  ----------------------------------------- */

  const Stepper = () => (
    <div className="mb-10">
      <div className="flex justify-between items-center">
        {steps.map((s) => {
          const Icon = s.icon;

          const active = step === s.id;
          const completed = step > s.id;

          return (
            <div key={s.id} className="flex flex-col items-center flex-1">
              <div
                className={`
                w-10 h-10 flex items-center justify-center rounded-full border
                ${
                  completed
                    ? "bg-blue-600 border-blue-600 text-white"
                    : active
                    ? "border-blue-600 text-blue-600"
                    : "border-slate-300 text-slate-400"
                }
              `}
              >
                <Icon size={18} />
              </div>

              <span
                className={`text-xs mt-2 ${
                  active ? "text-blue-600 font-medium" : "text-slate-400"
                }`}
              >
                {s.title}
              </span>
            </div>
          );
        })}
      </div>

      <div className="w-full h-2 bg-slate-200 rounded-full mt-6 overflow-hidden">
        <div
          className="h-full bg-blue-600 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );

  /* -----------------------------------------
     Layout
  ----------------------------------------- */

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-10 min-h-[600px] flex flex-col">
      <Stepper />

      <form
        onSubmit={handleSubmit}
        className="flex flex-col flex-1 justify-between"
      >
        <div className="flex-1 space-y-8 flex flex-col justify-center">
          
          {/* STEP 1 */}

          {step === 1 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Anchor size={18} />
                Hizmet Türü
              </h3>

              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: "Acente", icon: Anchor },
                  { label: "Teknik", icon: Wrench },
                  { label: "Lojistik", icon: Truck }
                ].map((item) => {
                  const Icon = item.icon;
                  const active = formData.serviceType === item.label;

                  return (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, serviceType: item.label })
                      }
                      className={`border rounded-xl p-6 flex flex-col items-center gap-2 transition
                        ${
                          active
                            ? "border-blue-600 bg-blue-50"
                            : "hover:border-slate-400 hover:bg-slate-50"
                        }`}
                    >
                      <Icon size={22} />
                      {item.label}
                    </button>
                  );
                })}
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  İş Başlığı
                </label>

                <input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Örn: Port Agency Service"
                  className="w-full border rounded-lg p-3"
                />
              </div>
            </div>
          )}

          {/* STEP 2 */}

          {step === 2 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Ship size={18} />
                Gemi Bilgileri
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <input
                  name="vessel"
                  value={formData.vessel}
                  onChange={handleChange}
                  placeholder="Gemi Adı"
                  className="border rounded-lg p-3"
                />

                <input
                  name="imo"
                  value={formData.imo}
                  onChange={handleChange}
                  placeholder="IMO Numarası"
                  className="border rounded-lg p-3"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-semibold mb-2">
                  <MapPin size={16} />
                  Lokasyon
                </label>

                <input
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Örn: İzmir (Aliağa)"
                  className="w-full border rounded-lg p-3"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium mb-1">
                    <Calendar size={16} className="text-slate-500" />
                    Başlangıç Tarihi
                  </label>

                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium mb-1">
                    <Calendar size={16} className="text-slate-500" />
                    Son Teklif Tarihi
                  </label>

                  <input
                    type="date"
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3 */}

          {step === 3 && (
            <div className="space-y-6">
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold mb-2">
                  <DollarSign size={16} />
                  Bütçe
                </label>

                <input
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  placeholder="Örn: 1500 USD"
                  className="w-full border rounded-lg p-3"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-semibold mb-2">
                  <FileText size={16} />
                  İş Açıklaması
                </label>

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={5}
                  placeholder="İş detaylarını yazın..."
                  className="w-full border rounded-lg p-3"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-semibold mb-2">
                  <Paperclip size={16} />
                  Dosya
                </label>

                <label className="flex flex-col items-center justify-center w-full border-2 border-dashed border-slate-300 rounded-lg p-10 cursor-pointer hover:border-blue-500 hover:bg-slate-50 transition">
                  <Paperclip size={22} />

                  <span className="text-sm mt-2">
                    Dosya yüklemek için tıklayın
                  </span>

                  <input
                    type="file"
                    multiple
                    onChange={handleFile}
                    className="hidden"
                  />
                </label>

                {files.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {files.map((file, i) => (
                      <div
                        key={i}
                        className="flex justify-between text-sm bg-slate-50 p-2 rounded"
                      >
                        {file.name}

                        <button
                          type="button"
                          onClick={() => removeFile(i)}
                          className="text-red-500"
                        >
                          kaldır
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 4 */}

          {step === 4 && (
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-slate-50 p-4 rounded-lg">
                <p className="text-xs text-slate-500">Hizmet Türü</p>
                <p className="font-semibold">{formData.serviceType}</p>
              </div>

              <div className="bg-slate-50 p-4 rounded-lg">
                <p className="text-xs text-slate-500">İş Başlığı</p>
                <p className="font-semibold">{formData.title}</p>
              </div>

              <div className="bg-slate-50 p-4 rounded-lg">
                <p className="text-xs text-slate-500">Gemi</p>
                <p className="font-semibold">{formData.vessel}</p>
              </div>

              <div className="bg-slate-50 p-4 rounded-lg">
                <p className="text-xs text-slate-500">IMO</p>
                <p className="font-semibold">{formData.imo}</p>
              </div>

              <div className="bg-slate-50 p-4 rounded-lg">
                <p className="text-xs text-slate-500">Lokasyon</p>
                <p className="font-semibold">{formData.location}</p>
              </div>

              <div className="bg-slate-50 p-4 rounded-lg">
                <p className="text-xs text-slate-500">Bütçe</p>
                <p className="font-semibold">{formData.budget}</p>
              </div>
            </div>
          )}
        </div>

        {/* NAVIGATION */}

        <div className="flex justify-between pt-6 border-t">
          {step > 1 && (
            <button
              type="button"
              onClick={prev}
              className="border px-6 py-3 rounded-lg hover:bg-slate-50"
            >
              Geri
            </button>
          )}

          {step < steps.length && (
            <button
              type="button"
              onClick={next}
              className="ml-auto bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            >
              Devam Et
            </button>
          )}

          {step === steps.length && (
            <button
              type="submit"
              className="ml-auto bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            >
              İlanı Yayınla
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default JobForm;
