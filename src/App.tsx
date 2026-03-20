import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Welcome from './pages/Welcome';
import Login from './pages/Login';
import Home from './pages/Home';

// --- Local Agent Selection Flow ---
import LocalAgentSelection from './pages/local-agent/LocalAgentSelection';
import LocalAgentDetails from './pages/local-agent/LocalAgentDetails';
import LocalAgentResults from './pages/local-agent/LocalAgentResults';
import SubcontractorSelection from './pages/subcontractor/SubcontractorSelection';
import SubcontractorJobDetails from './pages/subcontractor/SubcontractorJobDetails';
import SubcontractorResults from './pages/subcontractor/SubcontractorResults';

// --- Technical Expert Flow ---
import TechnicalExpertSelection from './pages/technical-expert/TechnicalExpertSelection';
import TechnicalExpertJobDetails from './pages/technical-expert/TechnicalExpertJobDetails';
import TechnicalExpertResults from './pages/technical-expert/TechnicalExpertResults';

// --- Partnership ---
import PartnershipSelection from './pages/partnership/PartnershipSelection';
import Signup from './pages/Signup';
import SignupAgent from './pages/SignupAgent';
import SignupSubcontractor from './pages/SignupSubcontractor';

import DashboardLayout from './features/dashboard/components/LocalAgentDashboard/DashboardLayout';
import AgentDashboardPage from './features/dashboard/pages/AgentDashboardPage';
import SubcontractorDashboardPage from './features/dashboard/pages/SubcontractorDashboardPage';
import ArchiveFinance from './pages/local-agent/ArsivFinans';
import FinansEkle from './pages/local-agent/FinansEkle';
import TaseronEkle from './pages/local-agent/TaseronEkle';
import AgentJobs from './features/dashboard/pages/AgentJobs';
import AgentAssignedJobs from './features/dashboard/pages/AgentAssignedJobs';
import AgentJobDetails from './features/dashboard/pages/AgentJobDetails';
import SubcontractorJobSearchPage from './pages/subcontractor/SubcontractorJobSearchPage';
import SubcontractorOffersPage from './pages/subcontractor/SubcontractorOffersPage';
import SubcontractorWalletPage from './pages/subcontractor/SubcontractorWalletPage';
import SubcontractorJobDetailPage from './pages/subcontractor/SubcontractorJobDetailPage';
import SubcontractorActiveJobsPage from './pages/subcontractor/SubcontractorActiveJobsPage';
import SubcontractorProfileCapacityPage from './pages/subcontractor/SubcontractorProfileCapacityPage';
import SubcontractorProfileEditPage from './pages/subcontractor/SubcontractorProfileEditPage';
import SubcontractorWonJobsPage from './pages/subcontractor/SubcontractorWonJobsPage';
import CaptainDashboardPage from './features/dashboard/pages/CaptainDashboardPage';

function App() {
  return (
    <Router>

      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/local-agent" element={<LocalAgentSelection />} />
        <Route path="/local-agent/details" element={<LocalAgentDetails />} />
        <Route path="/local-agent/results" element={<LocalAgentResults />} />
        <Route path="/subcontractor" element={<SubcontractorSelection />} />
        <Route path="/subcontractor/details" element={<SubcontractorJobDetails />} />
        <Route path="/subcontractor/results" element={<SubcontractorResults />} />
        <Route path="/technical-expert" element={<TechnicalExpertSelection />} />
        <Route path="/technical-expert/details" element={<TechnicalExpertJobDetails />} />
        <Route path="/technical-expert/results" element={<TechnicalExpertResults />} />
        <Route path="/partnership" element={<PartnershipSelection />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signup/agent" element={<SignupAgent />} />
        <Route path="/signup/subcontractor" element={<SignupSubcontractor />} />

        {/* --- AGENT DASHBOARD --- */}
        <Route path="/dashboard/agent/*" element={
          <DashboardLayout role="agent">
            <Routes>
              <Route path="/" element={<AgentDashboardPage />} />
              <Route path="arsiv-finans" element={<ArchiveFinance />} />
              <Route path="taseron-ekle" element={<TaseronEkle />} />
              <Route path="finans-ekle" element={<FinansEkle />} />
              <Route path="jobs" element={<AgentJobs />} />
              <Route path="assigned" element={<AgentAssignedJobs />} />
              <Route path="jobs/:id" element={<AgentJobDetails />} />
              <Route path="add-subcontractor" element={<TaseronEkle />} />
            </Routes>
          </DashboardLayout>
        } />

        {/* --- SUBCONTRACTOR DASHBOARD --- */}
        <Route path="/dashboard/subcontractor/*" element={
          <DashboardLayout role="subcontractor">
             <Routes>
               <Route path="/" element={<SubcontractorDashboardPage />} />
               <Route path="jobs" element={<SubcontractorJobSearchPage />} />
               <Route path="offers" element={<SubcontractorOffersPage />} />
               <Route path="wallet" element={<SubcontractorWalletPage />} />
               <Route path="active-jobs/:id" element={<SubcontractorJobDetailPage />} />
               <Route path="active-jobs" element={<SubcontractorActiveJobsPage />} />
               <Route path="won-jobs" element={<SubcontractorWonJobsPage />} />
               <Route path="profile-capacity" element={<SubcontractorProfileCapacityPage />} />
               <Route path="profile-edit" element={<SubcontractorProfileEditPage />} />
             </Routes>
          </DashboardLayout>
        } />

        {/* --- CAPTAIN DASHBOARD --- */}
        <Route path="/dashboard/captain/*" element={
          <DashboardLayout role="captain">
             <Routes>
               <Route path="/" element={<CaptainDashboardPage />} />
             </Routes>
          </DashboardLayout>
        } />
      </Routes>
    </Router>
  );
}

export default App;