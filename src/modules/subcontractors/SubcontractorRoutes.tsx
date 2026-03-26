import { Routes, Route } from 'react-router-dom';

// FLOWS
import SubcontractorSelection from './pages/SubcontractorSelection';
import SubcontractorJobDetails from './pages/SubcontractorJobDetails';
import SubcontractorResults from './pages/SubcontractorResults';

// DASHBOARD
import DashboardLayout from '@/features/dashboard/components/LocalAgentDashboard/DashboardLayout';
import SubcontractorDashboardPage from './dashboard/SubcontractorDashboardPage';

// SUBCONTRACTOR PAGES
import SubcontractorJobSearchPage from './pages/SubcontractorJobSearchPage';
import SubcontractorOffersPage from './pages/SubcontractorOffersPage';
import SubcontractorWalletPage from './pages/SubcontractorWalletPage';
import SubcontractorActiveJobsPage from './pages/SubcontractorActiveJobsPage';
import SubcontractorJobDetailPage from './pages/SubcontractorJobDetailPage';
import SubcontractorProfileCapacityPage from './pages/SubcontractorProfileCapacityPage';
import SubcontractorProfileEditPage from './pages/SubcontractorProfileEditPage';
import SubcontractorProfilePage from './pages/SubcontractorProfilePage';

import Gatekeeper from '@/components/Gatekeeper';

export default function SubcontractorRoutes() {
  return (
    <Routes>
      <Route path="/subcontractor" element={<SubcontractorSelection />} />
      <Route path="/subcontractor/details" element={<SubcontractorJobDetails />} />
      <Route path="/subcontractor/results" element={<SubcontractorResults />} />

      <Route element={<Gatekeeper />}>
        <Route path="/dashboard/subcontractor/*" element={
          <DashboardLayout role="subcontractor">
            <Routes>
              <Route path="/" element={<SubcontractorDashboardPage />} />
              <Route path="jobs" element={<SubcontractorJobSearchPage />} />
              <Route path="offers" element={<SubcontractorOffersPage />} />
              <Route path="wallet" element={<SubcontractorWalletPage />} />
              <Route path="active-jobs" element={<SubcontractorActiveJobsPage />} />
              <Route path="active-jobs/:id" element={<SubcontractorJobDetailPage />} />
              <Route path="profile-capacity" element={<SubcontractorProfileCapacityPage />} />
              <Route path="profile-edit" element={<SubcontractorProfileEditPage />} />
              <Route path="profile" element={<SubcontractorProfilePage />} />
            </Routes>
          </DashboardLayout>
        } />
      </Route>
    </Routes>
  );
}
