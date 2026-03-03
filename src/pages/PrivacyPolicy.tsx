import React from 'react';
import { motion } from 'framer-motion';
import { PageTransition } from '../components/PageTransition';

export function PrivacyPolicy() {
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
                        <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-4">Privacy Framework.</h1>
                        <p className="text-gray-400 text-lg font-mono text-sm tracking-widest uppercase">Effective Date: Q4 2026</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="prose prose-invert prose-lg text-gray-400 font-light leading-relaxed max-w-none"
                    >
                        <h2 className="text-2xl text-white font-medium mb-4 mt-8">1. Structural Data Isolation</h2>
                        <p className="mb-8">
                            We engineer our systems under the assumption that all data is inherently hostile if mishandled. Innoshay Solutions adheres to a strict zero-trust data architecture. We do not aggregate your operational telemetry for cross-tenant model training. Your data remains cryptographically isolated from the broader network.
                        </p>

                        <h2 className="text-2xl text-white font-medium mb-4 mt-8">2. Telemetry & Analytics</h2>
                        <p className="mb-8">
                            We collect minimal performance telemetry to ensure systemic integrity. This includes latency metrics, edge-node health checks, and architectural bottleneck tracking. This data is strictly anonymous and automatically purged from our ephemeral caches within 72 hours.
                        </p>

                        <h2 className="text-2xl text-white font-medium mb-4 mt-8">3. API & Endpoint Security</h2>
                        <p className="mb-8">
                            Data transmitted via our managed endpoints is secured utilizing quantum-resistant transport layers where applicable. We enforce strict rate-limiting and active anomaly detection at the ingress layer. Any PII inadvertently passed through diagnostic systems is redacted natively before hitting log aggregators.
                        </p>

                        <h2 className="text-2xl text-white font-medium mb-4 mt-8">4. Sovereign Deployments</h2>
                        <p className="mb-8">
                            For enterprise partners utilizing our on-premise or sovereign cloud deployments, we operate entirely outside your data perimeter. You retain absolute root access and govern the encryption keys. We cannot access your underlying data unless explicitly authorized through temporary, hard-capped diagnostic tokens.
                        </p>

                        <div className="w-full h-[1px] bg-white/10 my-12" />

                        <p className="text-sm">
                            For technical inquiries regarding our cryptographic protocols or compliance certifications (SOC2 Type II, ISO 27001), please contact our security engineering team directly.
                        </p>
                    </motion.div>

                </div>
            </div>
        </PageTransition>
    );
}
