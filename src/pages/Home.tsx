import React from 'react';
import { PageTransition } from '../components/PageTransition';
import { Hero } from '../components/Hero';
import { Section1Transition } from '../components/Section1Transition';
import { Section2Philosophy } from '../components/Section2Philosophy';
import { Section3Capabilities } from '../components/Section3Capabilities';
import { Section5Developer } from '../components/Section5Developer';
import { Section7UseCases } from '../components/Section7UseCases';
import { Section8Why } from '../components/Section8Why';
import { Section9CTA } from '../components/Section9CTA';

export function Home() {
    return (
        <PageTransition>
            <div className="flex flex-col">
                <Hero />
                <Section1Transition />
                <Section2Philosophy />
                <Section3Capabilities />
                <Section5Developer />
                <Section7UseCases />
                <Section8Why />
                <Section9CTA />
            </div>
        </PageTransition>
    );
}
