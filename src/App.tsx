import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ApplicationPage from './pages/ApplicationPage';
import MatchingPage from './pages/MatchingPage';
import ResultsPage from './pages/ResultsPage';
import ConfirmationPage from './pages/ConfirmationPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/apply" element={<ApplicationPage />} />
        <Route path="/matching" element={<MatchingPage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
      </Routes>
    </BrowserRouter>
  );
}
