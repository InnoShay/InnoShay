import React from 'react';
import { motion } from 'framer-motion';
import { PageTransition } from '../components/PageTransition';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const cases = [
    {
        id: 'ai-automation-platform',
        title: 'AI Automation Platform',
        client: 'Global Logistics Enterprise',
        category: 'Machine Learning Infrastructure',
        description: 'We engineered a sovereign ML pipeline that replaced human dispatchers with a predictive, fault-tolerant routing engine handling 2M+ daily events.',
        imageBg: 'bg-gradient-to-tr from-[#050505] to-[#00f0ff]/10',
        accent: '#00f0ff'
    },
    {
        id: 'enterprise-data-system',
        title: 'Enterprise Data System',
        client: 'Fintech Market Maker',
        category: 'Data Engineering',
        description: 'Architected a distributed, real-time data lake processing 50TB of raw transactional data per minute with single-digit millisecond latency.',
        imageBg: 'bg-gradient-to-br from-[#050505] to-[#8a2be2]/15',
        accent: '#8a2be2'
    },
    {
        id: 'saas-infrastructure-build',
        title: 'SaaS Infrastructure Build',
        client: 'B2B Healthcare Analytics',
        category: 'Cloud Architecture',
        description: 'Migrated a legacy monolith into a highly resilient, zero-downtime microservices structure governed by strict HIPAA compliance protocols.',
        imageBg: 'bg-gradient-to-tr from-[#050505] to-[#2F7EEA]/15',
        accent: '#2F7EEA'
    },
    {
        id: 'intelligent-interface-platform',
        title: 'Intelligent Interface Platform',
        client: 'Autonomous Robotics Core',
        category: 'Advanced UI & 3D',
        description: 'Created a WebGL hardware-accelerated command center interface capable of rendering real-time spatial telemetry across 500+ active drone nodes.',
        imageBg: 'bg-gradient-to-bl from-[#050505] to-cyan-500/15',
        accent: '#06b6d4'
    }
];

export function Work() {
    return (
        <PageTransition>
            <div className="bg-[#050505] min-h-screen pt-32 pb-24 text-white relative">

                <div className="max-w-7xl mx-auto px-6 relative z-10">

                    {/* Hero */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="mb-24 md:mb-32"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
                            <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-pulse" />
                            <span className="text-xs font-mono text-gray-300 uppercase tracking-widest">Selected Work</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-medium tracking-tight leading-[1.1] text-white max-w-4xl">
                            Systems Built.<br />Problems Solved.
                        </h1>
                    </motion.div>

                    {/* Grid Layout */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                        {cases.map((project, i) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                            >
                                <Link to={`/work/${project.id}`} className="group block relative w-full h-full rounded-[32px] overflow-hidden border border-white/5 bg-[#0a0a0ade] backdrop-blur-xl p-2 transition-transform duration-500 hover:scale-[1.02] hover:-translate-y-2 hover:shadow-[0_20px_40px_-20px_rgba(0,0,0,0.5)]">

                                    {/* Dynamic Glow Overlay inside Card */}
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-3xl pointer-events-none" style={{ backgroundColor: project.accent }} />

                                    {/* Abstract Image Block */}
                                    <div className={`w-full aspect-video rounded-[24px] mb-6 border border-white/5 overflow-hidden flex items-center justify-center relative ${project.imageBg}`}>
                                        {/* Minimal Grid Layer */}
                                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.03]" />
                                        {/* Hover reveal icon */}
                                        <div className="w-16 h-16 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 text-white z-10 shadow-2xl">
                                            <ArrowRight className="w-6 h-6 -rotate-45" />
                                        </div>
                                    </div>

                                    {/* Content Container */}
                                    <div className="px-6 pb-8 md:px-8 md:pb-10 flex flex-col gap-4">
                                        <div className="flex flex-wrap items-center justify-between gap-4">
                                            <span className="text-sm font-mono tracking-widest uppercase opacity-60" style={{ color: project.accent }}>
                                                {project.category}
                                            </span>
                                            <span className="px-3 py-1 rounded-full text-xs border border-white/10 bg-white/5 whitespace-nowrap">
                                                {project.client}
                                            </span>
                                        </div>

                                        <h2 className="text-3xl font-medium tracking-tight text-white group-hover:text-white transition-colors">
                                            {project.title}
                                        </h2>

                                        <p className="text-gray-400 text-[15px] leading-relaxed line-clamp-2">
                                            {project.description}
                                        </p>
                                    </div>

                                </Link>
                            </motion.div>
                        ))}
                    </div>

                </div>
            </div>
        </PageTransition>
    );
}
