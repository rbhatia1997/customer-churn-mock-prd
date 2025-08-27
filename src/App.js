import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import DataExplorer from './pages/DataExplorer';
import RiskDashboard from './pages/RiskDashboard';
import Account360 from './pages/Account360';
import PlaybookBuilder from './pages/PlaybookBuilder';
import OutcomeAnalytics from './pages/OutcomeAnalytics';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navigation />
        <main className="pt-16 flex-grow">
          <Routes>
            <Route path="/" element={<DataExplorer />} />
            <Route path="/risk-dashboard" element={<RiskDashboard />} />
            <Route path="/account-360" element={<Account360 />} />
            <Route path="/playbook-builder" element={<PlaybookBuilder />} />
            <Route path="/outcome-analytics" element={<OutcomeAnalytics />} />
          </Routes>
        </main>
        <footer className="bg-gray-800 text-white py-4 text-center">
          <p className="text-sm text-gray-300">Made by Ronak Bhatia</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
