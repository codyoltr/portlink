import { Routes, Route } from 'react-router-dom';

// PAGES
import Welcome from './pages/Welcome';
import Home from './pages/Home';

export default function HomeRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}
