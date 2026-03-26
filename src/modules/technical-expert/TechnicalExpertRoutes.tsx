import { Routes, Route } from 'react-router-dom';

import TechnicalExpertSelection from './pages/TechnicalExpertSelection';
import TechnicalExpertJobDetails from './pages/TechnicalExpertJobDetails';
import TechnicalExpertResults from './pages/TechnicalExpertResults';

export default function TechnicalExpertRoutes() {
  return (
    <Routes>
      <Route path="/technical-expert" element={<TechnicalExpertSelection />} />
      <Route path="/technical-expert/details" element={<TechnicalExpertJobDetails />} />
      <Route path="/technical-expert/results" element={<TechnicalExpertResults />} />
    </Routes>
  );
}
