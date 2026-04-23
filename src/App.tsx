import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// COMPONENTS
import ChatBot from './components/ChatBot';
import Gatekeeper from './components/Gatekeeper';

// DASHBOARD
import DashboardLayout from './features/dashboard/components/LocalAgentDashboard/DashboardLayout';
import CaptainDashboardPage from './features/dashboard/pages/CaptainDashboardPage';
import AdminRoutes from "./features/admin/AdminRoutes";
// MODULES
import HomeRoutes from './modules/home/HomeRoutes';
import AgentRoutes from './modules/agents/AgentRoutes';
import SubcontractorRoutes from './modules/subcontractors/SubcontractorRoutes';
import AuthRoutes from './modules/auth/AuthRoutes';
import TechnicalExpertRoutes from './modules/technical-expert/TechnicalExpertRoutes';
import PartnershipRoutes from './modules/partnership/PartnershipRoutes';
import UnderConstruction from './pages/UnderConstruction';

function App() {
  return (
    <Router>
      <ChatBot />

      <HomeRoutes />
      <AgentRoutes />
      <SubcontractorRoutes />
      <AuthRoutes />
      <TechnicalExpertRoutes />
      <PartnershipRoutes />
      <AdminRoutes />

      <Routes>
        <Route path="/under-construction" element={<UnderConstruction />} />
        {/* PROTECTED */}
        <Route element={<Gatekeeper />}>
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