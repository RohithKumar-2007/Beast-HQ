import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ContentPage } from './pages/ContentPage';
import { JourneyPage } from './pages/JourneyPage';
import { CommunityPage } from './pages/CommunityPage';
import { NotFoundPage } from './pages/NotFoundPage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="app-layout">
        {/* Accessible Skip Link */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>

        {/* Global Navbar Header */}
        <Navbar />

        {/* Main Route Content Container */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/content" element={<ContentPage />} />
          <Route path="/journey" element={<JourneyPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>

        {/* Global Footer */}
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
