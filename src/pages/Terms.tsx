import React from 'react';
import { motion } from 'framer-motion';
import { PageTransition } from '../components/PageTransition';

export function Terms() {
    return (
        <PageTransition>
            <div className="bg-[#050505] min-h-screen text-white relative flex flex-col pt-32 pb-24">
                <div className="max-w-3xl mx-auto px-6 relative z-10 w-full">

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="mb-16"
                    >
                        <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-4">Terms of Architecture.</h1>
                        <p className="text-gray-400 text-lg font-mono text-sm tracking-widest uppercase">Effective Date: Q4 2026</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="prose prose-invert prose-lg text-gray-400 font-light leading-relaxed max-w-none"
                    >
                        <h2 className="text-2xl text-white font-medium mb-4 mt-8">1. Structural Agreements</h2>
                        <p className="mb-8">
                            By interfacing with Innoshay Solutions' infrastructure, platforms, or APIs, you agree to these operational parameters. Our services represent highly specialized systemic engineering functions, not general-purpose software. All deployments are subject to definitive Master Services Agreements (MSAs).
                        </p>

                        <h2 className="text-2xl text-white font-medium mb-4 mt-8">2. Intellectual Sandbox</h2>
                        <p className="mb-8">
                            All proprietary algorithms, machine-learning models, and architectural blueprints generated during our consulting engagements are structurally licensed to your enterprise. However, the root generative frameworks and abstract deployment methodologies remain the intellectual property of Innoshay Solutions.
                        </p>

                        <h2 className="text-2xl text-white font-medium mb-4 mt-8">3. System Boundaries & Liability</h2>
                        <p className="mb-8">
                            We architect systems for maximum resilience, deploying multi-region fallback strategies. However, Innoshay Solutions is not legally liable for cascading downstream failures caused by third-party integrations, fundamentally flawed raw data ingestion, or manual overrides executed by unauthorized tenant administrators.
                        </p>

                        <h2 className="text-2xl text-white font-medium mb-4 mt-8">4. Service Degradation Protocols</h2>
                        <p className="mb-8">
                            In the event of a catastrophic regional cloud failure or malicious DDoS assault, our load balancers will enforce strict degradation protocols. Read-access is preserved while write-ingestors may queue temporarily. You agree this orchestrated degradation constitutes a successful architectural defense, not a breach of uptime SLAs.
                        </p>

                        <div className="w-full h-[1px] bg-white/10 my-12" />

                        <p className="text-sm">
                            Any judicial disputes regarding infrastructure deployment or intellectual licensing will be parsed and resolved within the jurisdiction of Delaware, USA.
                        </p>
                    </motion.div>

                </div>
            </div>
        </PageTransition>
    );
}
