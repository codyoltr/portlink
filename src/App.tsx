import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// --- General Pages ---
import Welcome from './pages/Welcome';
import Login from './pages/Login';
import Home from './pages/Home';

// --- Local Agent Selection Flow ---
import LocalAgentSelection from './pages/local-agent/LocalAgentSelection';
import LocalAgentDetails from './pages/local-agent/LocalAgentDetails';
import LocalAgentResults from './pages/local-agent/LocalAgentResults';

// --- Subcontractor Selection Flow ---
import SubcontractorSelection from './pages/subcontractor/SubcontractorSelection';
import SubcontractorJobDetails from './pages/subcontractor/SubcontractorJobDetails';
import SubcontractorResults from './pages/subcontractor/SubcontractorResults';

// --- Technical Expert Flow ---
import TechnicalExpertSelection from './pages/technical-expert/TechnicalExpertSelection';
import TechnicalExpertJobDetails from './pages/technical-expert/TechnicalExpertJobDetails';
import TechnicalExpertResults from './pages/technical-expert/TechnicalExpertResults';

// --- Partnership ---
import PartnershipSelection from './pages/partnership/PartnershipSelection';

// --- Layouts & Dashboards ---
import DashboardLayout from '@/features/dashboard/components/DashboardLayout';
import AgentDashboardPage from '@/features/dashboard/pages/AgentDashboardPage';
import SubcontractorDashboardPage from '@/features/dashboard/pages/SubcontractorDashboardPage';
import CaptainDashboardPage from '@/features/dashboard/pages/CaptainDashboardPage';

// --- Subcontractor Dashboard Pages ---
import SubcontractorJobSearchPage from '@/pages/subcontractor/SubcontractorJobSearchPage';
import SubcontractorWonJobsPage from '@/pages/subcontractor/SubcontractorWonJobsPage';
import SubcontractorOffersPage from '@/pages/subcontractor/SubcontractorOffersPage';
import SubcontractorWalletPage from '@/pages/subcontractor/SubcontractorWalletPage';
import SubcontractorActiveJobsPage from '@/pages/subcontractor/SubcontractorActiveJobsPage';
import SubcontractorJobDetailPage from "@/pages/subcontractor/SubcontractorJobDetailPage";
import SubcontractorProfileCapacityPage from '@/pages/subcontractor/SubcontractorProfileCapacityPage';
import SubcontractorProfileEditPage from '@/pages/subcontractor/SubcontractorProfileEditPage';

// --- Agent Dashboard Pages ---
import SubcontractorDirectory from './pages/local-agent/SubcontractorDirectory'; 
import SubcontractorDirectoryDetail from './pages/local-agent/SubcontractorDirectoryDetail';
import ArchiveFinance from './pages/local-agent/ArchiveFinance'; 
import ArchiveFinanceDetail from './pages/local-agent/ArchiveFinanceDetail'; // Yeni Eklenen Detay Sayfası
import AddFinance from './pages/local-agent/FinansEkle'; 

import AgentJobs from '@/features/dashboard/pages/AgentJobs';
import AgentAssignedJobs from '@/features/dashboard/pages/AgentAssignedJobs';
import AgentJobDetails from '@/features/dashboard/pages/AgentJobDetails';

function App() {
  return (
    <Router>
      <Routes>
        {/* --- Public Routes --- */}
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

        {/* --- AGENT DASHBOARD --- */}
        <Route path="/dashboard/agent/*" element={
          <DashboardLayout role="agent">
            <Routes>
              <Route path="/" element={<AgentDashboardPage />} />
              
              {/* Taşeron Rehberi Yolları */}
              <Route path="subcontractor-directory" element={<SubcontractorDirectory />} />
              <Route path="subcontractor-directory/:id" element={<SubcontractorDirectoryDetail />} />
              
              {/* Arşiv & Finans Yolları */}
              <Route path="archive-finance" element={<ArchiveFinance />} />
              <Route path="archive-finance/:id" element={<ArchiveFinanceDetail />} />
              
              {/* Diğer Acente İşlemleri */}
              <Route path="add-finance" element={<AddFinance />} /> 
              <Route path="jobs" element={<AgentJobs />} />
              <Route path="assigned" element={<AgentAssignedJobs />} />
              <Route path="jobs/:id" element={<AgentJobDetails />} />
              
              {/* Not: TaseronEkle.tsx olmadığı için Directory'ye yönlendiriyoruz */}
              <Route path="add-subcontractor" element={<SubcontractorDirectory />} /> 
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
               <Route path="won-jobs" element={<SubcontractorWonJobsPage />} />
               <Route path="wallet" element={<SubcontractorWalletPage />} />
               <Route path="active-jobs/:id" element={<SubcontractorJobDetailPage />} />
               <Route path="active-jobs" element={<SubcontractorActiveJobsPage />} />
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