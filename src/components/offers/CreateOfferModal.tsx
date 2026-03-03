import React, { useState } from 'react';

interface CreateOfferModalProps {
    isOpen: boolean;
    onClose: () => void;
    jobTitle: string;
    companyName: string;
}

const CreateOfferModal: React.FC<CreateOfferModalProps> = ({ isOpen, onClose, jobTitle, companyName }) => {
    const [price, setPrice] = useState('');
    const [duration, setDuration] = useState('');
    const [note, setNote] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSuccess(true);

            setTimeout(() => {
                setIsSuccess(false);
                onClose();
            }, 2000);
        }, 1500);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 dark:bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div
                className="w-full max-w-lg bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {isSuccess ? (
                    <div className="p-8 flex flex-col items-center justify-center text-center space-y-4">
                        <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mb-2">
                            <span className="material-icons-round text-3xl">check_circle</span>
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Teklifiniz İletildi!</h3>
                        <p className="text-slate-500 dark:text-slate-400">
                            <span className="font-semibold text-slate-700 dark:text-slate-300">{companyName}</span> firmasına <span className="font-semibold text-slate-700 dark:text-slate-300">{jobTitle}</span> işi için teklifiniz başarıyla gönderildi. Süreci &quot;Dashboard &gt; Verilen Teklifler&quot; adımından takip edebilirsiniz.
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
                            <h2 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
                                <span className="material-icons-round text-primary">send</span>
                                Teklif Oluştur
                            </h2>
                            <button
                                onClick={onClose}
                                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors p-1"
                            >
                                <span className="material-icons-round">close</span>
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-5">
                            <div className="bg-primary/5 dark:bg-primary/10 border border-primary/20 rounded-xl p-4 mb-2">
                                <p className="text-xs font-bold text-primary mb-1 uppercase tracking-wider">İlgili İlan</p>
                                <p className="text-sm font-semibold text-slate-800 dark:text-white">{jobTitle}</p>
                                <p className="text-xs text-slate-500 mt-0.5">{companyName}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Teklif Tutarı (₺)</label>
                                    <div className="relative">
                                        <span className="material-icons-round absolute left-3 top-2.5 text-slate-400 text-lg">payments</span>
                                        <input
                                            type="number"
                                            required
                                            value={price}
                                            onChange={(e) => setPrice(e.target.value)}
                                            className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all dark:text-white"
                                            placeholder="Örn. 15000"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Tahmini Süre (Gün)</label>
                                    <div className="relative">
                                        <span className="material-icons-round absolute left-3 top-2.5 text-slate-400 text-lg">calendar_month</span>
                                        <input
                                            type="number"
                                            required
                                            value={duration}
                                            onChange={(e) => setDuration(e.target.value)}
                                            className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all dark:text-white"
                                            placeholder="Örn. 3"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Açıklama & Notlar (Opsiyonel)</label>
                                <textarea
                                    rows={3}
                                    value={note}
                                    onChange={(e) => setNote(e.target.value)}
                                    className="w-full px-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none dark:text-white placeholder:text-slate-400"
                                    placeholder="Teklifinizle ilgili detayları, kullanılacak malzemeleri veya ek şartları belirtebilirsiniz..."
                                ></textarea>
                            </div>

                            <div className="pt-4 flex gap-3 border-t border-slate-100 dark:border-slate-700">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="flex-1 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold rounded-xl transition-colors"
                                >
                                    İptal
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="flex-1 px-4 py-2.5 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-wait"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <span className="material-icons-round animate-spin text-sm">refresh</span>
                                            Gönderiliyor...
                                        </>
                                    ) : (
                                        <>
                                            <span>Gönder</span>
                                            <span className="material-icons-round text-sm">send</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
};

export default CreateOfferModal;
