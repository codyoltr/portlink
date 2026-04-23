import { useEffect, useState } from "react";
import { getAdminApplications } from "../services/adminService";
import { CheckCircle, Clock, XCircle } from "lucide-react";
import type { AdminApplication } from "../types/admin.types";

const AdminApplicationsPage = () => {
  const [applications, setApplications] = useState<AdminApplication[]>([]);

  useEffect(() => {
    const fetchApplications = async () => {
      const data = await getAdminApplications();
      setApplications(data);
    };

    fetchApplications();
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved":
      case "kabul":
        return <CheckCircle size={18} className="text-green-600" />;
      case "pending":
      case "beklemede":
        return <Clock size={18} className="text-yellow-600" />;
      case "rejected":
      case "reddedildi":
        return <XCircle size={18} className="text-red-600" />;
      default:
        return <Clock size={18} className="text-gray-600" />;
    }
  };

  const getStatusBg = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved":
      case "kabul":
        return "bg-green-100 text-green-800";
      case "pending":
      case "beklemede":
        return "bg-yellow-100 text-yellow-800";
      case "rejected":
      case "reddedildi":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-black text-gray-900 mb-2">Başvurular</h1>
        <p className="text-gray-600 font-medium">İlan başvurularını inceleyin ve yönetin</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Başvuran
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  İlan
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Durum
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Başvuru Tarihi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {applications.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center">
                    <p className="text-gray-500 font-medium">Henüz başvuru yok</p>
                  </td>
                </tr>
              ) : (
                applications.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="font-medium text-gray-900">{item.applicantName}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">{item.jobTitle}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-2 px-3 py-1 text-xs font-bold rounded-full ${getStatusBg(item.status)}`}>
                        {getStatusIcon(item.status)}
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{item.createdAt}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminApplicationsPage;