import React from 'react';
import { useNavigate } from 'react-router-dom';

const UnderConstruction: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 dark:bg-slate-900">
      <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col items-center text-center max-w-md">
        <span className="material-icons-round text-6xl text-amber-500 mb-4">construction</span>
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">Yapım Aşamasında</h1>
        <p className="text-slate-600 dark:text-slate-400 mb-8">
          Bu sayfa şu anda yapım aşamasındadır. En kısa sürede hizmetinize sunulacaktır.
        </p>
        <button
          onClick={() => navigate(-1)}
          className="bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary/90 transition-colors"
        >
          Geri Dön
        </button>
      </div>
    </div>
  );
};

export default UnderConstruction;
