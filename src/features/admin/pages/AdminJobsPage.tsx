import { useEffect, useState } from "react";
import JobsTable from "../components/JobsTable";
import { getAdminJobs } from "../services/adminService";
import type { AdminJob } from "../types/admin.types";

const AdminJobsPage = () => {
  const [jobs, setJobs] = useState<AdminJob[]>([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const data = await getAdminJobs();
      setJobs(data);
    };

    fetchJobs();
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-black text-gray-900 mb-2">İlan Yönetimi</h1>
        <p className="text-gray-600 font-medium">Sistem ilanlarını yönetin ve izleyin</p>
      </div>
      <JobsTable jobs={jobs} />
    </div>
  );
};

export default AdminJobsPage;