import { Routes, Route } from 'react-router-dom';

// FLOWS
import LocalAgentSelection from './pages/LocalAgentSelection';
import LocalAgentDetails from './pages/LocalAgentDetails';
import LocalAgentResults from './pages/LocalAgentResults';
import AgentOfferView from './pages/AgentOfferView';

// DASHBOARD
import DashboardLayout from '@/features/dashboard/components/LocalAgentDashboard/DashboardLayout';
import AgentDashboardPage from './dashboard/AgentDashboardPage';

// AGENT PAGES
import SubcontractorDirectory from './pages/SubcontractorDirectory';
import SubcontractorDirectoryDetail from './pages/SubcontractorDirectoryDetail';
import ArchiveFinance from './pages/ArchiveFinance';
import ArchiveFinanceDetail from './pages/ArchiveFinanceDetail';
import AddFinance from './pages/FinansEkle'; // Was FinansEkle

// AGENT DASHBOARD PAGES
import AgentAssignedJobDetail from './dashboard/AgentAssignedJobDetail';
import AgentJobs from './dashboard/AgentJobs';
import AgentAssignedJobs from './dashboard/AgentAssignedJobs';
import AgentJobDetails from './dashboard/AgentJobDetails';

import Gatekeeper from '@/components/Gatekeeper';

export default function AgentRoutes() {
  return (
    <Routes>
      <Route path="/local-agent" element={<LocalAgentSelection />} />
      <Route path="/local-agent/details" element={<LocalAgentDetails />} />
      <Route path="/local-agent/results" element={<LocalAgentResults />} />
      <Route path="/dashboard/agent/offers" element={<AgentOfferView />} />

      <Route element={<Gatekeeper />}>
        <Route path="/dashboard/agent/*" element={
          <DashboardLayout role="agent">
            <Routes>
              <Route path="/" element={<AgentDashboardPage />} />
              <Route path="subcontractor-directory" element={<SubcontractorDirectory />} />
              <Route path="subcontractor-directory/:id" element={<SubcontractorDirectoryDetail />} />
              <Route path="archive-finance" element={<ArchiveFinance />} />
              <Route path="archive-finance/:id" element={<ArchiveFinanceDetail />} />
              <Route path="add-finance" element={<AddFinance />} />
              <Route path="jobs" element={<AgentJobs />} />
              <Route path="assigned" element={<AgentAssignedJobs />} />
              <Route path="assigned/:id" element={<AgentAssignedJobDetail />} />
              <Route path="jobs/:id" element={<AgentJobDetails />} />
              <Route path="add-subcontractor" element={<SubcontractorDirectory />} />
            </Routes>
          </DashboardLayout>
        } />
      </Route>
    </Routes>
  );
}
