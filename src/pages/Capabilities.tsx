import React from 'react';
import { motion } from 'framer-motion';
import { PageTransition } from '../components/PageTransition';
import { Network, Database, Cloud, Blocks, ChevronRight } from 'lucide-react';
import { GlowingEffect } from '../components/ui/glowing-effect';
import { Link } from 'react-router-dom';

const capabilities = [
    {
        id: 'ai-systems',
        title: 'AI Systems & Automation',
        icon: <Network className="w-6 h-6 text-[#00f0ff]" />,
        items: [
            'Custom ML architecture',
            'Model deployment pipelines',
            'Intelligent automation frameworks'
        ],
        description: 'We do not just integrate APIs. We build sovereign, highly specialized machine learning pipelines that operate seamlessly within your existing infrastructure.',
        gradient: 'from-[#00f0ff]/20 to-transparent',
        accent: 'bg-[#00f0ff]'
    },
    {
        id: 'data-intelligence',
        title: 'Data Intelligence',
        icon: <Database className="w-6 h-6 text-[#8a2be2]" />,
        items: [
            'Scalable data pipelines',
            'Real-time analytics',
            'Data reliability systems'
        ],
        description: 'Data is the structural integrity of AI. We engineer fault-tolerant, high-throughput data architectures ensuring clean, actionable intelligence in real-time.',
        gradient: 'from-[#8a2be2]/20 to-transparent',
        accent: 'bg-[#8a2be2]'
    },
    {
        id: 'saas-engineering',
        title: 'SaaS & Platform Engineering',
        icon: <Cloud className="w-6 h-6 text-[#2F7EEA]" />,
        items: [
            'API-first architecture',
            'Cloud-native infrastructure',
            'Modular system design'
        ],
        description: 'Global-scale platforms require ruthless modularity. We architect cloud-native monoliths and microservices designed for zero-downtime scalability.',
        gradient: 'from-[#2F7EEA]/20 to-transparent',
        accent: 'bg-[#2F7EEA]'
    },
    {
        id: 'advanced-ui',
        title: 'Advanced UI & 3D Systems',
        icon: <Blocks className="w-6 h-6 text-[#00f0ff]" />,
        items: [
            'Performance-driven interfaces',
            'Intelligent user systems',
            'Immersive interaction design'
        ],
        description: 'The interface is the system. We build hardware-accelerated, cinematic web platforms that communicate raw technical power through precise, calm design.',
        gradient: 'from-cyan-500/20 to-transparent',
        accent: 'bg-cyan-500'
    }
];

export function Capabilities() {
    return (
        <PageTransition>
            <div className="bg-[#050505] min-h-screen pt-32 pb-24 text-white relative overflow-hidden">

                {/* Abstract Grid Overlay */}
                <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.03]">
                    <div className="w-full h-full" style={{ backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
                </div>

                <div className="max-w-7xl mx-auto px-6 relative z-10">

                    {/* Hero Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="max-w-3xl mb-32"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
                            <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-pulse" />
                            <span className="text-xs font-mono text-gray-300 uppercase tracking-widest">System Capabilities</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-medium tracking-tight mb-8 leading-[1.1] text-white">
                            Engineering Intelligent Systems at Scale.
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed">
                            We build AI-native architectures designed for longevity.
                        </p>
                    </motion.div>

                    {/* Capability Breakdown List */}
                    <div className="grid grid-cols-1 gap-12 lg:gap-24">
                        {capabilities.map((cap, index) => (
                            <motion.div
                                key={cap.id}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                className="relative group"
                            >
                                {/* Connector Line (Desktop) */}
                                {index !== capabilities.length - 1 && (
                                    <div className="hidden lg:block absolute left-12 top-24 bottom-[-96px] w-[1px] bg-gradient-to-b from-white/10 to-transparent z-0" />
                                )}

                                <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-8 lg:gap-16 items-start relative z-10">

                                    {/* Left Column: Title & Abstract Visual */}
                                    <div className="flex flex-col gap-6 sticky top-32">
                                        <div className="flex items-center gap-4">
                                            <div className="w-16 h-16 rounded-2xl bg-[#0a0a0a] border border-white/10 flex items-center justify-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] relative overflow-hidden group-hover:border-white/20 transition-colors duration-500">
                                                <div className={`absolute inset-0 bg-gradient-to-br ${cap.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                                                {cap.icon}
                                            </div>
                                            <h2 className="text-3xl md:text-4xl font-medium tracking-tight">{cap.title}</h2>
                                        </div>

                                        {/* Abstract Technical Diagram / Visual Representation */}
                                        <div className="w-full h-48 rounded-2xl bg-[#0a0a0a] border border-white/5 overflow-hidden relative group-hover:border-white/10 transition-colors duration-500 flex items-center justify-center">
                                            {/* Subtle animated abstract elements based on index */}
                                            {index === 0 && <div className="w-3/4 border-t border-dashed border-[#00f0ff]/30 relative"><div className="absolute w-2 h-2 bg-[#00f0ff] rounded-full top-1/2 -translate-y-1/2 shadow-[0_0_10px_#00f0ff] left-0 animate-[ping_3s_infinite]" /></div>}
                                            {index === 1 && <div className="flex gap-4"><div className="w-4 h-16 bg-[#8a2be2]/20 rounded-t-sm" /><div className="w-4 h-24 bg-[#8a2be2]/40 rounded-t-sm" /><div className="w-4 h-12 bg-[#8a2be2]/20 rounded-t-sm" /></div>}
                                            {index === 2 && <div className="w-24 h-24 border border-[#2F7EEA]/30 rounded-full flex items-center justify-center"><div className="w-12 h-12 border border-[#2F7EEA]/50 rounded-full animate-spin-slow" /></div>}
                                            {index === 3 && <div className="grid grid-cols-3 gap-2"><div className="w-8 h-8 rounded-md bg-cyan-500/20" /><div className="w-8 h-8 rounded-md bg-cyan-500/40" /><div className="w-8 h-8 rounded-md bg-cyan-500/20" /><div className="w-8 h-8 rounded-md bg-cyan-500/10" /><div className="w-8 h-8 rounded-md bg-cyan-500/30" /><div className="w-8 h-8 rounded-md bg-cyan-500/50" /></div>}
                                        </div>
                                    </div>

                                    {/* Right Column: Details & Items */}
                                    <div className="flex flex-col gap-8 pt-2">
                                        <p className="text-lg md:text-xl text-gray-400 leading-relaxed">
                                            {cap.description}
                                        </p>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {cap.items.map((item, i) => (
                                                <div key={i} className="relative rounded-2xl border border-white/5 bg-[#0a0a0a]/50 backdrop-blur-sm p-6 overflow-hidden group/item hover:border-white/10 transition-colors duration-300">
                                                    <GlowingEffect blur={0} borderWidth={1} spread={10} glow={true} disabled={false} inactiveZone={0.1} proximity={64} />
                                                    <div className="relative z-10 flex flex-col gap-2">
                                                        <span className={`w-1.5 h-1.5 rounded-full ${cap.accent}`} />
                                                        <span className="text-gray-200 font-medium tracking-wide">{item}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* CTA Section */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="mt-32 w-full rounded-[40px] border border-white/10 bg-[#0a0a0a] relative overflow-hidden flex flex-col items-center justify-center py-24 px-6 text-center"
                    >
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(47,126,234,0.1)_0%,transparent_70%)] pointer-events-none" />
                        <h2 className="text-4xl md:text-6xl font-medium tracking-tight mb-6">Ready to architect the future?</h2>
                        <p className="text-xl text-gray-400 mb-10 max-w-2xl">Stop patching. Start engineering. Let's design a system built to last.</p>
                        <Link to="/contact" className="inline-flex flex-row items-center gap-3 px-8 py-4 bg-white text-black font-medium rounded-full hover:scale-[1.02] active:scale-[0.98] transition-transform duration-300">
                            Start a Project
                            <ChevronRight className="w-4 h-4" />
                        </Link>
                    </motion.div>

                </div>
            </div>
        </PageTransition>
    );
}
