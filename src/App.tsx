/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Preloader } from './components/Preloader';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';

// Placeholder Pages (To be built iteratively)
// Keeping them inline temporarily to satisfy compilation before we build out the full pages
import { PageTransition } from './components/PageTransition';
import { Capabilities } from './pages/Capabilities';
import { Approach } from './pages/Approach';
import { Work } from './pages/Work';
import { CaseStudy } from './pages/CaseStudy';
import { Company } from './pages/Company';
import { Contact } from './pages/Contact';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { Terms } from './pages/Terms';
import { NotFound } from './pages/NotFound';

// Inner App component to access useLocation hook which requires Router context
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      {/* @ts-ignore - framer-motion requires key for AnimatePresence to detect route changes */}
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="capabilities" element={<Capabilities />} />
          <Route path="approach" element={<Approach />} />
          <Route path="work">
            <Route index element={<Work />} />
            <Route path=":slug" element={<CaseStudy />} />
          </Route>
          <Route path="company" element={<Company />} />
          <Route path="contact" element={<Contact />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="terms" element={<Terms />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  const [bootComplete, setBootComplete] = useState(false);

  return (
    <Router>
      {/* 
        The Preloader mounts immediately and removes itself 
        once the Spline 3D Core hits 100% and triggers onBootComplete
      */}
      {!bootComplete && <Preloader onBootComplete={() => setBootComplete(true)} />}

      <motion.div
        className="min-h-screen bg-bg-void text-text-primary selection:bg-accent-blue/30 selection:text-text-primary"
        initial={{ opacity: 0, filter: 'blur(20px)' }}
        animate={{
          opacity: bootComplete ? 1 : 0,
          filter: bootComplete ? 'blur(0px)' : 'blur(20px)'
        }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        style={{
          // Prevent interaction while the preloader is covering the screen
          pointerEvents: bootComplete ? 'auto' : 'none'
        }}
      >
        <AnimatedRoutes />
      </motion.div>
    </Router>
  );
}
