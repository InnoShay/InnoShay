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
const PlaceholderPage = ({ title }: { title: string }) => (
  <PageTransition>
    <div className="min-h-screen flex items-center justify-center pt-20">
      <h1 className="text-4xl font-mono text-[#00f0ff]">{title}</h1>
    </div>
  </PageTransition>
);

// Inner App component to access useLocation hook which requires Router context
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      {/* @ts-ignore - framer-motion requires key for AnimatePresence to detect route changes */}
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="capabilities" element={<PlaceholderPage title="CAPABILITIES_SYS" />} />
          <Route path="approach" element={<PlaceholderPage title="APPROACH_SYS" />} />
          <Route path="work" element={<PlaceholderPage title="WORK_SYS" />} />
          <Route path="company" element={<PlaceholderPage title="COMPANY_SYS" />} />
          <Route path="contact" element={<PlaceholderPage title="CONTACT_SYS" />} />
          <Route path="privacy-policy" element={<PlaceholderPage title="PRIVACY_SYS" />} />
          <Route path="terms" element={<PlaceholderPage title="TERMS_SYS" />} />
          <Route path="*" element={<PlaceholderPage title="ERROR_404_NOT_FOUND" />} />
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
