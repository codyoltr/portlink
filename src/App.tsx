import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// --- COMPONENTS ---
import ChatBot from './components/ChatBot';
import Gatekeeper from './components/Gatekeeper';

// --- PAGES ---
import HowItWorks from './pages/HowItWorks';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import Welcome from './pages/Welcome';
import Login from './pages/Login';
import Home from './pages/Home';
import StaticLogin from './pages/StaticLogin';

// --- FLOWS ---
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

// --- AUTH ---
import Signup from './pages/Signup';
import SignupAgent from './pages/SignupAgent';
import SignupSubcontractor from './pages/SignupSubcontractor';

// --- DASHBOARD ---
import DashboardLayout from './features/dashboard/components/DashboardLayout';
import AgentDashboardPage from './features/dashboard/pages/AgentDashboardPage';
import SubcontractorDashboardPage from './features/dashboard/pages/SubcontractorDashboardPage';
import CaptainDashboardPage from './features/dashboard/pages/CaptainDashboardPage';

// --- AGENT ---
import TaseronRehberi from './pages/local-agent/TaseronRehberi';
import ArsivFinans from './pages/local-agent/ArsivFinans';
import TaseronEkle from './pages/local-agent/TaseronEkle';
import FinansEkle from './pages/local-agent/FinansEkle';
import AgentJobs from './features/dashboard/pages/AgentJobs';
import AgentAssignedJobs from './features/dashboard/pages/AgentAssignedJobs';
import AgentAssignedJobDetail from './features/dashboard/pages/AgentAssignedJobDetail';
import AgentJobDetails from './features/dashboard/pages/AgentJobDetails';

// --- SUBCONTRACTOR ---
import SubcontractorJobSearchPage from './pages/subcontractor/SubcontractorJobSearchPage';
import SubcontractorOffersPage from './pages/subcontractor/SubcontractorOffersPage';
import SubcontractorWalletPage from './pages/subcontractor/SubcontractorWalletPage';
import SubcontractorJobDetailPage from './pages/subcontractor/SubcontractorJobDetailPage';
import SubcontractorActiveJobsPage from './pages/subcontractor/SubcontractorActiveJobsPage';
import SubcontractorWonJobsPage from './pages/subcontractor/SubcontractorWonJobsPage';
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

          {/* AGENT */}
          <Route path="/dashboard/agent/*" element={
            <DashboardLayout role="agent">
              <Routes>
                <Route path="/" element={<AgentDashboardPage />} />
                <Route path="taseron-rehberi" element={<TaseronRehberi />} />
                <Route path="arsiv-finans" element={<ArsivFinans />} />
                <Route path="taseron-ekle" element={<TaseronEkle />} />
                <Route path="finans-ekle" element={<FinansEkle />} />
                <Route path="jobs" element={<AgentJobs />} />
                <Route path="assigned" element={<AgentAssignedJobs />} />
                <Route path="assigned/:id" element={<AgentAssignedJobDetail />} />
                <Route path="jobs/:id" element={<AgentJobDetails />} />
              </Routes>
            </DashboardLayout>
          } />

          {/* SUBCONTRACTOR */}
          <Route path="/dashboard/subcontractor/*" element={
            <DashboardLayout role="subcontractor">
              <Routes>
                <Route path="/" element={<SubcontractorDashboardPage />} />
                <Route path="jobs" element={<SubcontractorJobSearchPage />} />
                <Route path="offers" element={<SubcontractorOffersPage />} />
                <Route path="wallet" element={<SubcontractorWalletPage />} />
                <Route path="active-jobs" element={<SubcontractorActiveJobsPage />} />
                <Route path="active-jobs/:id" element={<SubcontractorJobDetailPage />} />
                <Route path="won-jobs" element={<SubcontractorWonJobsPage />} />
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