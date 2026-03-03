/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Preloader } from './components/Preloader';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Section1Transition } from './components/Section1Transition';
import { Section2Philosophy } from './components/Section2Philosophy';
import { Section3Capabilities } from './components/Section3Capabilities';
import { Section5Developer } from './components/Section5Developer';
import { Section7UseCases } from './components/Section7UseCases';
import { Section8Why } from './components/Section8Why';
import { Section9CTA } from './components/Section9CTA';
import { Footer } from './components/Footer';

export default function App() {
  const [bootComplete, setBootComplete] = useState(false);

  return (
    <>
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
        <Navigation />
        <main>
          <Hero />
          <Section1Transition />
          <Section2Philosophy />
          <Section3Capabilities />
          <Section5Developer />
          <Section7UseCases />
          <Section8Why />
          <Section9CTA />
        </main>
        <Footer />
      </motion.div>
    </>
  );
}

