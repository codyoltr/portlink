import { Link } from "react-router-dom";
import { Eye, Briefcase } from "lucide-react";
import type { AdminJob } from "../types/admin.types";

type JobsTableProps = {
  jobs: AdminJob[];
};

const JobsTable = ({ jobs }: JobsTableProps) => {
  const getStatusColor = (status: string) => {
    const statusMap: Record<string, { bg: string; text: string }> = {
      active: { bg: "bg-green-100", text: "text-green-800" },
      inactive: { bg: "bg-gray-100", text: "text-gray-800" },
      pending: { bg: "bg-yellow-100", text: "text-yellow-800" },
      closed: { bg: "bg-red-100", text: "text-red-800" },
    };
    return statusMap[status.toLowerCase()] || { bg: "bg-gray-100", text: "text-gray-800" };
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                İlan
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                Kategori
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                İlan Sahibi
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                Durum
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                Tarih
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                İşlem
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {jobs.map((job) => {
              const statusColor = getStatusColor(job.status);
              return (
                <tr key={job.id} className="hover:bg-gray-50 transition-colors">
                  {/* İlan */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                        <Briefcase size={20} />
                      </div>
                      <span className="font-medium text-gray-900">{job.title}</span>
                    </div>
                  </td>

                  {/* Kategori */}
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">{job.category}</span>
                  </td>

                  {/* İlan Sahibi */}
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">{job.ownerName}</span>
                  </td>

                  {/* Durum */}
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block px-3 py-1 text-xs font-bold rounded-full ${statusColor.bg} ${statusColor.text}`}
                    >
                      {job.status}
                    </span>
                  </td>

                  {/* Tarih */}
                  <td className="px-6 py-4 text-sm text-gray-600">{job.createdAt}</td>

                  {/* İşlem */}
                  <td className="px-6 py-4">
                    <Link
                      to={`/dashboard/admin/jobs/${job.id}`}
                      className="inline-flex items-center gap-2 px-3 py-2 text-sm font-bold text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Eye size={16} />
                      Detay
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default JobsTable;