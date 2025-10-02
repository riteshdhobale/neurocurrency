import { useState } from 'react';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';

function App() {
  const [showDashboard, setShowDashboard] = useState(false);

  return (
    <>
      {!showDashboard ? (
        <LandingPage onGetStarted={() => setShowDashboard(true)} />
      ) : (
        <Dashboard onBack={() => setShowDashboard(false)} />
      )}
    </>
  );
}

export default App;
