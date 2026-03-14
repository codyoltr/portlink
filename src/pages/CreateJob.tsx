import React from "react";
import DashboardLayout from "@/features/dashboard/components/DashboardLayout";
import JobForm from "../components/JobForm";
import { useNavigate } from "react-router-dom";

const CreateJob: React.FC = () => {

  const navigate = useNavigate();

  return (
    <DashboardLayout role="agent">

      <div className="max-w-4xl mx-auto mt-10">

        <button
          onClick={() => navigate(-1)}
          className="text-sm text-primary mb-4"
        >
          ← Geri Dön
        </button>

        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight">
          Yeni İş İlanı Oluştur
        </h1>

        <JobForm />

      </div>

    </DashboardLayout>
  );
};

export default CreateJob;