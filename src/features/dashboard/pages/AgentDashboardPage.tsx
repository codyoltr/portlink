import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardLayout from '@/features/dashboard/components/DashboardLayout';
import AgentOverview from './AgentOverview';
import AgentJobs from './AgentJobs';
import AgentAssignedJobs from './AgentAssignedJobs';
import AgentJobDetails from './AgentJobDetails';

const AgentDashboardPage: React.FC = () => {
  return (
    <DashboardLayout role="agent">
      <Routes>
        <Route path="/" element={<AgentOverview />} />
        <Route path="/jobs" element={<AgentJobs />} />
        <Route path="/assigned" element={<AgentAssignedJobs />} />
        <Route path="/jobs/:id" element={<AgentJobDetails />} />
        {/* You can add other routes like /offers here in the future */}
      </Routes>
    </DashboardLayout>
  );
};

export default AgentDashboardPage;

