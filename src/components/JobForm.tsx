import React, { useState } from "react";
import { Anchor, Ship, MapPin, Calendar, DollarSign, Paperclip, Wrench, Truck, FileText } from "lucide-react";

const JobForm = () => {

    const [formData, setFormData] = useState({
        title: "",
        serviceType: "",
        vessel: "",
        imo: "",
        location: "",
        startDate: "",
        deadline: "",
        eta: "",
        budget: "",
        description: ""
    });

    const handleChange = (e: any) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Yeni ilan:", formData);
    };

    return (

        <div className="max-w-2xl mx-auto bg-white dark:bg-slate-800 border border-slate-200  dark:border-slate-700 rounded-2xl p-8 shadow-sm">

            <form onSubmit={handleSubmit} className="space-y-8">

                {/* SERVICE TYPE */}

                <div>

                    <h3 className="flex items-center gap-2 font-semibold text-lg">
                        <Anchor size={18} />
                        Hizmet Türü
                    </h3>

                    <div className="grid grid-cols-3 gap-3">

                        <button
                            type="button"
                            onClick={() =>
                                setFormData({ ...formData, serviceType: "Acente" })
                            }
                            className={`flex items-center justify-center gap-2 border rounded-xl p-3 text-sm ${formData.serviceType === "Acente"
                                ? "border-blue-500 bg-blue-50"
                                : "hover:border-slate-400 hover:bg-slate-50"
                                }`}
                        >
                            <Anchor size={18} className="text-slate-500" />
                            Acente
                        </button>


                        <button
                            type="button"
                            onClick={() =>
                                setFormData({ ...formData, serviceType: "Teknik" })
                            }
                            className={`flex items-center justify-center gap-2 border rounded-xl p-3 text-sm ${formData.serviceType === "Teknik"
                                ? "border-blue-500 bg-blue-50"
                                : "hover:border-slate-400 hover:bg-slate-50"
                                }`}
                        >
                            <Wrench size={18} className="text-slate-500" />
                            Teknik
                        </button>


                        <button
                            type="button"
                            onClick={() =>
                                setFormData({ ...formData, serviceType: "Lojistik" })
                            }
                            className={`flex items-center justify-center gap-2 border rounded-xl p-3 text-sm ${formData.serviceType === "Lojistik"
                                ? "border-blue-500 bg-blue-50"
                                : "hover:border-slate-400 hover:bg-slate-50"
                                }`}
                        >
                            <Truck size={18} className="text-slate-500" />
                            Lojistik
                        </button>

                    </div>

                </div>

                {/* JOB TITLE */}

                <div>

                    <label className="block text-sm font-semibold mb-2">
                        İş Başlığı
                    </label>

                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Örn: Port Agency Service"
                        className="w-full border rounded-lg p-3"
                    />

                </div>

                {/* VESSEL */}

                <div>

                    <h3 className="flex items-center gap-2 font-semibold text-lg">
                        <Ship size={18} />
                        Gemi Bilgileri
                    </h3>

                    <div className="space-y-3">

                        <input
                            type="text"
                            name="vessel"
                            value={formData.vessel}
                            onChange={handleChange}
                            placeholder="Gemi Adı (Örn: M/V Aegean Star)"
                            className="w-full border rounded-lg p-3"
                        />

                        <input
                            type="text"
                            name="imo"
                            value={formData.imo}
                            onChange={handleChange}
                            placeholder="IMO Numarası"
                            className="w-full border rounded-lg p-3"
                        />

                    </div>

                </div>

                {/* LOCATION */}

                <div>

                    <h3 className="flex items-center gap-2 font-semibold text-lg">
                        <MapPin size={18} />
                        Lokasyon
                    </h3>

                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="Örn: İzmir (Aliağa)"
                        className="w-full border rounded-lg p-3"
                    />

                </div>

                {/* DATES */}

                <div>

                    <h3 className="flex items-center gap-2 font-semibold text-lg">
                        <Calendar size={18} />
                        Tarihler
                    </h3>

                    <div className="grid grid-cols-2 gap-4">

                        <input
                            type="date"
                            name="startDate"
                            value={formData.startDate}
                            onChange={handleChange}
                            className="border rounded-lg p-3"
                        />

                        <input
                            type="date"
                            name="deadline"
                            value={formData.deadline}
                            onChange={handleChange}
                            className="border rounded-lg p-3"
                        />

                    </div>

                </div>

                {/* BUDGET */}

                <div>

                    <h3 className="flex items-center gap-2 font-semibold text-lg">
                        <DollarSign size={18} />
                        Budget
                    </h3>

                    <input
                        type="text"
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        placeholder="Örn: 1500 USD"
                        className="w-full border rounded-lg p-3"
                    />

                </div>

                {/* DESCRIPTION */}

                <div>

                    <h3 className="flex items-center gap-2 font-semibold">
                        <FileText size={18} />
                        İş Açıklaması
                    </h3>

                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={5}
                        placeholder="İş ile ilgili detayları yazın..."
                        className="w-full border rounded-lg p-3"
                    />

                </div>

                {/* FILE UPLOAD */}

                <div>

                    <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                        <Paperclip size={18} className="text-slate-500" />
                        Dosya Yükleme
                    </h3>

                    <label className="mt-3 flex flex-col items-center justify-center w-full border-2 border-dashed border-slate-300 rounded-lg p-6 cursor-pointer hover:border-blue-500 hover:bg-slate-50 transition">

                        <Paperclip size={22} className="text-slate-400 mb-2" />

                        <span className="text-sm text-slate-600">
                            Dosya sürükleyin veya yüklemek için tıklayın
                        </span>

                        <span className="text-xs text-slate-400 mt-1">
                            PNG, JPG, PDF (max 10MB)
                        </span>

                        <input
                            type="file"
                            className="hidden"
                        />

                    </label>

                </div>
                {/* BUTTONS */}

                <div className="flex justify-end gap-3 pt-6 border-t">

                    <button
                        type="button"
                        className="px-5 py-2 border rounded-lg"
                    >
                        Vazgeç
                    </button>

                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold"
                    >
                        İlanı Yayınla
                    </button>

                </div>

            </form>

        </div>

    );
};

export default JobForm;