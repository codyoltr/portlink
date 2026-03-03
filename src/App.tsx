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
import AgentDashboard from './pages/dashboard/AgentDashboard';
import SubcontractorDashboard from './pages/dashboard/SubcontractorDashboard';
import CaptainDashboard from './pages/dashboard/CaptainDashboard';
import './App.css';

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

        {/* Dashboards */}
        <Route path="/dashboard/agent/*" element={<AgentDashboard />} />
        <Route path="/dashboard/subcontractor/*" element={<SubcontractorDashboard />} />
        <Route path="/dashboard/captain/*" element={<CaptainDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
