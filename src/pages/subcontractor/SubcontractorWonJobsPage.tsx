import React from 'react';


const SubcontractorWonJobsPage: React.FC = () => {
  return (
    <>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Kazanılan İşler</h2>
        <p className="text-slate-500 dark:text-slate-400">
          Kazanmış olduğunuz işleri bu ekranda görüntüleyebileceksiniz.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-sm">
        <p className="text-slate-600 dark:text-slate-300">
          Bu alan henüz hazırlık aşamasında.
        </p>
      </div>
    </>
  );
};

export default SubcontractorWonJobsPage;