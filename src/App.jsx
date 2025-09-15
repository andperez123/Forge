import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { LandingPage } from './pages/LandingPage';
import { StrategiesPage } from './pages/StrategiesPage';
import { StrategyBuilderPage } from './pages/StrategyBuilderPage';
import { StrategyDetailPage } from './pages/StrategyDetailPage';
import { StrategyJsonPage } from './pages/StrategyJsonPage';
import { BlogPage } from './pages/BlogPage';
import { BlogDetailPage } from './pages/BlogDetailPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { AdminPage } from './pages/AdminPage';
import { SitemapPage } from './pages/SitemapPage';
import { AiSitemapPage } from './pages/AiSitemapPage';
import { SEOHead } from './components/SEOHead';

import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <main>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/strategies" element={<StrategiesPage />} />
            <Route path="/strategies/:id" element={<StrategyDetailPage />} />
            <Route path="/strategy-builder" element={<StrategyBuilderPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogDetailPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/sitemap.xml" element={<SitemapPage />} />
            
            {/* AI JSON endpoints */}
            <Route path="/ai/:slug.json" element={<StrategyJsonPage />} />
            <Route path="/ai/sitemap.json" element={<AiSitemapPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
