import { Routes, Route } from 'react-router-dom';

import PartnershipSelection from './pages/PartnershipSelection';

export default function PartnershipRoutes() {
  return (
    <Routes>
      <Route path="/partnership" element={<PartnershipSelection />} />
    </Routes>
  );
}
