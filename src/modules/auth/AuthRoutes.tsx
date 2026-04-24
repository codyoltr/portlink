import { Routes, Route } from 'react-router-dom';
import Gatekeeper from '@/components/Gatekeeper';

import Login from './pages/Login';
import Signup from './pages/Signup';
import SignupAgent from './pages/SignupAgent';
import SignupSubcontractor from './pages/SignupSubcontractor';

export default function AuthRoutes() {
  return (
    <Routes>
      <Route path="/login/agent" element={<Login />} />
      <Route path="/login/subcontractor" element={<Login />} />

      <Route element={<Gatekeeper />}>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signup/agent" element={<SignupAgent />} />
        <Route path="/signup/subcontractor" element={<SignupSubcontractor />} />
      </Route>
    </Routes>
  );
}
