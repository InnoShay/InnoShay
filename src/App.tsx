/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Section1Transition } from './components/Section1Transition';
import { Section2Philosophy } from './components/Section2Philosophy';
import { Section3Capabilities } from './components/Section3Capabilities';
import { Section4Technology } from './components/Section4Technology';
import { Section5Developer } from './components/Section5Developer';
import { Section6Security } from './components/Section6Security';
import { Section7UseCases } from './components/Section7UseCases';
import { Section8Why } from './components/Section8Why';
import { Section9CTA } from './components/Section9CTA';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-bg-void text-text-primary selection:bg-accent-blue/30 selection:text-text-primary">
      <Navigation />
      <main>
        <Hero />
        <Section1Transition />
        <Section2Philosophy />
        <Section3Capabilities />
        <Section4Technology />
        <Section5Developer />
        <Section6Security />
        <Section7UseCases />
        <Section8Why />
        <Section9CTA />
      </main>
      <Footer />
    </div>
  );
}

