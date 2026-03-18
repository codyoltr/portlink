import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// COMPONENTS
import ChatBot from './components/ChatBot';
import Gatekeeper from './components/Gatekeeper';

// GENERAL
import Welcome from './pages/Welcome';
import Login from './pages/Login';
import Home from './pages/Home';

// FLOWS
import LocalAgentSelection from './pages/local-agent/LocalAgentSelection';
import LocalAgentDetails from './pages/local-agent/LocalAgentDetails';
import LocalAgentResults from './pages/local-agent/LocalAgentResults';
import AgentOfferView from './pages/local-agent/AgentOfferView';

import SubcontractorSelection from './pages/subcontractor/SubcontractorSelection';
import SubcontractorJobDetails from './pages/subcontractor/SubcontractorJobDetails';
import SubcontractorResults from './pages/subcontractor/SubcontractorResults';

import TechnicalExpertSelection from './pages/technical-expert/TechnicalExpertSelection';
import TechnicalExpertJobDetails from './pages/technical-expert/TechnicalExpertJobDetails';
import TechnicalExpertResults from './pages/technical-expert/TechnicalExpertResults';

// AUTH
import Signup from './pages/Signup';
import SignupAgent from './pages/SignupAgent';
import SignupSubcontractor from './pages/SignupSubcontractor';

// DASHBOARD
import DashboardLayout from './features/dashboard/components/LocalAgentDashboard/DashboardLayout';
import AgentDashboardPage from './features/dashboard/pages/AgentDashboardPage';
import SubcontractorDashboardPage from './features/dashboard/pages/SubcontractorDashboardPage';
import CaptainDashboardPage from './features/dashboard/pages/CaptainDashboardPage';

// AGENT
import SubcontractorDirectory from './pages/local-agent/SubcontractorDirectory';
import SubcontractorDirectoryDetail from './pages/local-agent/SubcontractorDirectoryDetail';
import ArchiveFinance from './pages/local-agent/ArchiveFinance';
import ArchiveFinanceDetail from './pages/local-agent/ArchiveFinanceDetail';
import AddFinance from './pages/local-agent/FinansEkle';

import AgentJobs from './features/dashboard/pages/AgentJobs';
import AgentAssignedJobs from './features/dashboard/pages/AgentAssignedJobs';
import AgentJobDetails from './features/dashboard/pages/AgentJobDetails';

// SUBCONTRACTOR
import SubcontractorJobSearchPage from './pages/subcontractor/SubcontractorJobSearchPage';
import SubcontractorOffersPage from './pages/subcontractor/SubcontractorOffersPage';
import SubcontractorWalletPage from './pages/subcontractor/SubcontractorWalletPage';
import SubcontractorActiveJobsPage from './pages/subcontractor/SubcontractorActiveJobsPage';
import SubcontractorJobDetailPage from './pages/subcontractor/SubcontractorJobDetailPage';
import SubcontractorProfileCapacityPage from './pages/subcontractor/SubcontractorProfileCapacityPage';
import SubcontractorProfileEditPage from './pages/subcontractor/SubcontractorProfileEditPage';

function App() {
  return (
    <Router>
      <ChatBot />

      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />

        {/* FLOWS */}
        <Route path="/local-agent" element={<LocalAgentSelection />} />
        <Route path="/local-agent/details" element={<LocalAgentDetails />} />
        <Route path="/local-agent/results" element={<LocalAgentResults />} />
        <Route path="/dashboard/agent/offers" element={<AgentOfferView />} />

        <Route path="/subcontractor" element={<SubcontractorSelection />} />
        <Route path="/subcontractor/details" element={<SubcontractorJobDetails />} />
        <Route path="/subcontractor/results" element={<SubcontractorResults />} />

        <Route path="/technical-expert" element={<TechnicalExpertSelection />} />
        <Route path="/technical-expert/details" element={<TechnicalExpertJobDetails />} />
        <Route path="/technical-expert/results" element={<TechnicalExpertResults />} />

        {/* PROTECTED */}
        <Route element={<Gatekeeper />}>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signup/agent" element={<SignupAgent />} />
          <Route path="/signup/subcontractor" element={<SignupSubcontractor />} />

          {/* AGENT DASHBOARD */}
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
                <Route path="jobs/:id" element={<AgentJobDetails />} />

                <Route path="add-subcontractor" element={<SubcontractorDirectory />} />
              </Routes>
            </DashboardLayout>
          } />

          {/* SUBCONTRACTOR DASHBOARD */}
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
              </Routes>
            </DashboardLayout>
          } />

          {/* CAPTAIN */}
          <Route path="/dashboard/captain/*" element={
            <DashboardLayout role="captain">
              <Routes>
                <Route path="/" element={<CaptainDashboardPage />} />
              </Routes>
            </DashboardLayout>
          } />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;