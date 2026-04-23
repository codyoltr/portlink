import { Navigate, Outlet } from "react-router-dom";
import AdminLayout from "./components/AdminLayout";

const AdminPrivateRoute = () => {
  const isAdminLoggedIn = localStorage.getItem("adminToken");

  if (!isAdminLoggedIn) {
    return <Navigate to="/dashboard/admin/login" replace />;
  }

  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  );
};

export default AdminPrivateRoute;
