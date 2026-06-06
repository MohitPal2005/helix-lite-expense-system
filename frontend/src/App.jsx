import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import LandingPage from './pages/LandingPage';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import SubmitClaim from './pages/SubmitClaim';
import ReviewQueue from './pages/ReviewQueue';
import AuthModal from './components/AuthModal';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        {/* Render the modal floating over the entire app */}
        <AuthModal />
        
        <Routes>
          <Route path="/" element={<LandingPage />} />
          {/* Removed the <Route path="/auth" /> because it is now a popup */}
          
          <Route path="/app" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="submit" element={<SubmitClaim />} />
            <Route path="review" element={<ReviewQueue />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;