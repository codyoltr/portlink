import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './pages/Welcome';
import Login from './pages/Login';
import Home from './pages/Home';
import LocalAgentSelection from './pages/local-agent/LocalAgentSelection';
import LocalAgentDetails from './pages/local-agent/LocalAgentDetails';
import LocalAgentResults from './pages/local-agent/LocalAgentResults';
import SubcontractorSelection from './pages/subcontractor/SubcontractorSelection';
import SubcontractorJobDetails from './pages/subcontractor/SubcontractorJobDetails';
import SubcontractorResults from './pages/subcontractor/SubcontractorResults';
import TechnicalExpertSelection from './pages/technical-expert/TechnicalExpertSelection';
import TechnicalExpertJobDetails from './pages/technical-expert/TechnicalExpertJobDetails';
import TechnicalExpertResults from './pages/technical-expert/TechnicalExpertResults';
import PartnershipSelection from './pages/partnership/PartnershipSelection';
import Signup from './pages/Signup';
import SignupAgent from './pages/SignupAgent';
import SignupSubcontractor from './pages/SignupSubcontractor';

import DashboardLayout from '@/features/dashboard/components/LocalAgentDashboard/DashboardLayout';
import AgentDashboardPage from '@/features/dashboard/pages/AgentDashboardPage';
import SubcontractorDashboardPage from '@/features/dashboard/pages/SubcontractorDashboardPage';
import CaptainDashboardPage from '@/features/dashboard/pages/CaptainDashboardPage';

// --- YENİ SAYFALAR ---
import TaseronRehberi from './pages/local-agent/TaseronRehberi'; 
import ArsivFinans from './pages/local-agent/ArsivFinans';
import TaseronEkle from './pages/local-agent/TaseronEkle'; 
import FinansEkle from './pages/local-agent/FinansEkle'; // <-- Burayı kontrol et
import AgentJobs from '@/features/dashboard/pages/AgentJobs';
import AgentAssignedJobs from '@/features/dashboard/pages/AgentAssignedJobs';
import AgentJobDetails from '@/features/dashboard/pages/AgentJobDetails';

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

        {/* --- ACENTE DASHBOARD --- */}
        <Route path="/dashboard/agent/*" element={
          <DashboardLayout role="agent">
            <Routes>
              <Route path="/" element={<AgentDashboardPage />} />
              <Route path="taseron-rehberi" element={<TaseronRehberi />} />
              <Route path="arsiv-finans" element={<ArsivFinans />} />
              <Route path="taseron-ekle" element={<TaseronEkle />} /> 
              {/* ARŞİV'DEKİ BUTONUN GİDECEĞİ YER: */}
              <Route path="finans-ekle" element={<FinansEkle />} /> 
              <Route path="jobs" element={<AgentJobs />} />
              <Route path="assigned" element={<AgentAssignedJobs />} />
              <Route path="jobs/:id" element={<AgentJobDetails />} />
            </Routes>
          </DashboardLayout>
        } />

        {/* --- DİĞER ROLLER --- */}
        <Route path="/dashboard/subcontractor/*" element={
          <DashboardLayout role="subcontractor">
             <Routes>
               <Route path="/" element={<SubcontractorDashboardPage />} />
               <Route path="jobs" element={<SubcontractorJobSearchPage />} />
               <Route path="offers" element={<SubcontractorOffersPage />} />
               <Route path="won-jobs" element={<SubcontractorWonJobsPage />} />
               <Route path="wallet" element={<SubcontractorWalletPage />} />
               <Route path="active-jobs/:id" element={<SubcontractorJobDetailPage />} />
               <Route path="active-jobs" element={<SubcontractorActiveJobsPage />} />
               <Route path="profile-capacity" element={<SubcontractorProfileCapacityPage />} />
               <Route path="profile-edit" element={<SubcontractorProfileEditPage />} />
             </Routes>
          </DashboardLayout>
        } />
      </Routes>
    </Router>
  );
}

export default App;