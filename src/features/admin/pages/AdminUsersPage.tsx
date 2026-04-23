import { useEffect, useState } from "react";
import UsersTable from "../components/UsersTable";
import { getAdminUsers } from "../services/adminService";
import type { AdminUser } from "../types/admin.types";

const AdminUsersPage = () => {
  const [users, setUsers] = useState<AdminUser[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getAdminUsers();
      setUsers(data);
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-black text-gray-900 mb-2">Kullanıcı Yönetimi</h1>
        <p className="text-gray-600 font-medium">Sistem kullanıcılarını yönetin ve izleyin</p>
      </div>
      <UsersTable users={users} />
    </div>
  );
};

export default AdminUsersPage;