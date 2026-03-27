import { Routes, Route } from 'react-router-dom';

// PAGES
import Welcome from './pages/Welcome';
import Home from './pages/Home';
import HowItWorks from './pages/HowItWorks';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';

export default function HomeRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/home" element={<Home />} />
      <Route path="/how-it-works" element={<HowItWorks />} />
      <Route path="/services" element={<Services />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
}
