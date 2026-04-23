import { Route, Routes } from "react-router-dom";
import AdminPrivateRoute from "./AdminPrivateRoute";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import AdminUsersPage from "./pages/AdminUsersPage";
import AdminUserDetailPage from "./pages/AdminUserDetailPage";
import AdminJobsPage from "./pages/AdminJobsPage";
import AdminJobDetailPage from "./pages/AdminJobDetailPage";
import AdminApplicationsPage from "./pages/AdminApplicationsPage";
import AdminReportsPage from "./pages/AdminReportsPage";
import AdminSettingsPage from "./pages/AdminSettingsPage";

const AdminRoutes = () => {
  return (
    <Routes>
      {/* Login Sayfası - Korumasız */}
      <Route path="/dashboard/admin/login" element={<AdminLoginPage />} />

      {/* Admin Routes - Korumalı */}
      <Route element={<AdminPrivateRoute />}>
        <Route path="/dashboard/admin" element={<AdminDashboardPage />} />
        <Route path="/dashboard/admin/users" element={<AdminUsersPage />} />
        <Route path="/dashboard/admin/users/:id" element={<AdminUserDetailPage />} />
        <Route path="/dashboard/admin/jobs" element={<AdminJobsPage />} />
        <Route path="/dashboard/admin/jobs/:id" element={<AdminJobDetailPage />} />
        <Route path="/dashboard/admin/applications" element={<AdminApplicationsPage />} />
        <Route path="/dashboard/admin/reports" element={<AdminReportsPage />} />
        <Route path="/dashboard/admin/settings" element={<AdminSettingsPage />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;