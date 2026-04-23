import { Link } from "react-router-dom";
import { Eye, Mail, User } from "lucide-react";
import type { AdminUser } from "../types/admin.types";

type UsersTableProps = {
  users: AdminUser[];
};

const UsersTable = ({ users }: UsersTableProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                Kullanıcı
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                E-posta
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                Rol
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                Durum
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                Kayıt Tarihi
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                İşlem
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                {/* Kullanıcı */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                      {user.fullName.charAt(0)}
                    </div>
                    <span className="font-medium text-gray-900">{user.fullName}</span>
                  </div>
                </td>

                {/* E-posta */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <Mail size={16} className="text-gray-400" />
                    {user.email}
                  </div>
                </td>

                {/* Rol */}
                <td className="px-6 py-4">
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded-full">
                    {user.role}
                  </span>
                </td>

                {/* Durum */}
                <td className="px-6 py-4">
                  <span
                    className={`inline-block px-3 py-1 text-xs font-bold rounded-full ${
                      user.isActive
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {user.isActive ? "✓ Aktif" : "✕ Pasif"}
                  </span>
                </td>

                {/* Tarih */}
                <td className="px-6 py-4 text-sm text-gray-600">{user.createdAt}</td>

                {/* İşlem */}
                <td className="px-6 py-4">
                  <Link
                    to={`/dashboard/admin/users/${user.id}`}
                    className="inline-flex items-center gap-2 px-3 py-2 text-sm font-bold text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Eye size={16} />
                    Detay
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersTable;