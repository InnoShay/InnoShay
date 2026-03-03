import React from 'react';
import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { PageTransition } from '../components/PageTransition';
import { ArrowLeft, ExternalLink, Cpu, GitMerge, Activity, Server } from 'lucide-react';

// Shared database logic for the mockup
const casesData: Record<string, any> = {
    'ai-automation-platform': {
        title: 'AI Automation Platform',
        client: 'Global Logistics Enterprise',
        timeline: '14 Months',
        role: 'Lead AI Architects',
        overview: 'A sovereign ML pipeline constructed to replace human dispatchers resulting in a 400% increase in predictive routing accuracy.',
        challenge: 'The client was processing 2 million tracking events daily through a fragile legacy monolith. Human operators were unable to predict supply chain bottlenecks until 4 hours after they occurred, costing millions in SLA penalties.',
        architecture: 'We decoupled the monolithic tracking service into event-driven Rust microservices via Kafka, feeding a real-time TensorFlow inference engine deployed on Kubernetes clusters.',
        stack: ['TensorFlow', 'Rust', 'Kafka', 'Kubernetes', 'PostgreSQL'],
        outcome: 'Human intervention in the dispatch cycle was reduced by 94%. System latency dropped from 4 hours to 150 milliseconds.',
        impact: '$42M Annual Savings',
        accent: '#00f0ff'
    },
    'enterprise-data-system': {
        title: 'Enterprise Data System',
        client: 'Fintech Market Maker',
        timeline: '8 Months',
        role: 'Infrastructure Engineers',
        overview: 'Architected a distributed, real-time data lake processing 50TB of raw transactional data per minute.',
        challenge: 'Existing data warehouses were buckling under hyper-frequency trading volume. Analysts were operating on data that was 15 minutes stale.',
        architecture: 'Implemented a Lambda architecture utilizing Apache Flink for real-time streams and Snowflake for cold storage, unified by a custom GraphQL federation layer.',
        stack: ['Apache Flink', 'Snowflake', 'GraphQL', 'Go', 'Redis'],
        outcome: 'Analysts now query petabyte-scale datasets with sub-second latency, enabling true real-time algorithmic adjustments.',
        impact: '0.04ms Median Latency',
        accent: '#8a2be2'
    },
    'saas-infrastructure-build': {
        title: 'SaaS Infrastructure Build',
        client: 'B2B Healthcare Analytics',
        timeline: '18 Months',
        role: 'Platform Architects',
        overview: 'Migrated a legacy monolith into a resilient, zero-downtime microservices structure governed by strict HIPAA compliance.',
        challenge: 'A fragile monolithic codebase deploying once a month with a high failure rate, risking catastrophic exposure of patient data.',
        architecture: 'Strangler-fig pattern migration to isolated AWS ECS containers. Implemented strict zero-trust networking and cryptographic isolation between tenant databases.',
        stack: ['AWS ECS', 'Terraform', 'Node.js', 'PostgreSQL', 'Datadog'],
        outcome: 'Deployment frequency increased to 50+ times per day. Zero severity-1 incidents in the past 14 months.',
        impact: '99.999% Uptime',
        accent: '#2F7EEA'
    },
    'intelligent-interface-platform': {
        title: 'Intelligent Interface Platform',
        client: 'Autonomous Robotics Core',
        timeline: '6 Months',
        role: 'Interaction Engineers',
        overview: 'A hardware-accelerated command center interface rendering real-time spatial telemetry across 500+ drone nodes.',
        challenge: 'Standard DOM-based dashboards froze when attempting to render more than 50 simultaneous high-frequency telemetry streams.',
        architecture: 'Bypassed the DOM entirely for the main visualization, building a custom WebGL rendering engine with React Three Fiber, synchronized with WebSockets.',
        stack: ['React', 'Three.js', 'WebGL', 'WebSockets', 'C++'],
        outcome: 'The dashboard now renders 500+ nodes at a locked 60fps on standard browser hardware, fundamentally changing operational oversight.',
        impact: 'Locked 60FPS UI',
        accent: '#06b6d4'
    }
};

export function CaseStudy() {
    const { slug } = useParams<{ slug: string }>();
    // Mock 404 handling if not found
    const project = slug ? casesData[slug] : undefined;

    if (!project) {
        return (
            <PageTransition>
                <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center text-white">
                    <h1 className="text-4xl font-mono text-red-500 mb-4">404_CASE_NOT_FOUND</h1>
                    <Link to="/work" className="text-gray-400 hover:text-white underline">Return to Grid</Link>
                </div>
            </PageTransition>
        );
    }

    return (
        <PageTransition>
            <div className="bg-[#050505] min-h-screen text-white relative">

                {/* Abstract Top Gradient */}
                <div
                    className="absolute top-0 left-0 right-0 h-[60vh] opacity-[0.15] blur-[150px] pointer-events-none z-0"
                    style={{ background: `radial-gradient(circle at top, ${project.accent}, transparent 70%)` }}
                />

                <div className="max-w-4xl mx-auto px-6 relative z-10 pt-32 pb-40 flex flex-col gap-16 md:gap-24">

                    {/* Back Navigation */}
                    <Link to="/work" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-medium tracking-wide w-fit border border-transparent hover:border-white/10 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm -ml-4">
                        <ArrowLeft className="w-4 h-4" />
                        Back to All Systems
                    </Link>

                    {/* Hero Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col gap-8"
                    >
                        <div className="flex flex-wrap items-center gap-4 text-xs font-mono uppercase tracking-widest text-gray-400">
                            <span className="px-3 py-1 border border-white/10 rounded-max bg-white/5">{project.client}</span>
                            <span className="px-3 py-1 border border-white/10 rounded-max bg-white/5">{project.timeline}</span>
                            <span className="px-3 py-1 border border-white/10 rounded-max bg-white/5">{project.role}</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-medium tracking-tight leading-[1.1] text-white">
                            {project.title}
                        </h1>

                        <p className="text-2xl text-gray-300 font-light leading-relaxed max-w-3xl">
                            {project.overview}
                        </p>
                    </motion.div>

                    {/* Key Metric Banner */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="w-full rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8"
                    >
                        <div className="flex flex-col gap-2">
                            <span className="text-gray-400 text-sm font-mono tracking-widest uppercase">Quantified Impact</span>
                            <span className="text-4xl md:text-5xl font-medium" style={{ color: project.accent }}>
                                {project.impact}
                            </span>
                        </div>
                        {/* Minimal abstract technical animation */}
                        <div className="hidden md:flex items-center gap-2 w-48 h-12 bg-black/40 rounded-full border border-white/5 px-2 relative overflow-hidden">
                            <div className="w-1 h-full bg-white/10" />
                            <motion.div
                                initial={{ x: -100 }}
                                animate={{ x: 200 }}
                                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                                className="w-1/2 h-[1px]"
                                style={{ backgroundColor: project.accent, boxShadow: `0 0 10px ${project.accent}` }}
                            />
                        </div>
                    </motion.div>

                    {/* Deep Content Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12 md:gap-24">

                        {/* Tech Stack Sidebar */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="flex flex-col gap-8 md:sticky top-32"
                        >
                            <div className="flex items-center gap-3 text-white">
                                <Server className="w-5 h-5 text-gray-400" />
                                <h3 className="font-mono uppercase tracking-widest text-sm text-gray-400">Tech Stack</h3>
                            </div>
                            <ul className="flex flex-col gap-4 border-l border-white/10 pl-6">
                                {project.stack.map((tech: string, i: number) => (
                                    <li key={tech} className="text-lg font-medium text-gray-200 flex items-center gap-3">
                                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: project.accent }} />
                                        {tech}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* Narrative Body */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="prose prose-invert prose-lg md:prose-xl text-gray-400 font-light leading-relaxed max-w-none"
                        >
                            <h2 className="text-3xl font-medium text-white mb-6">The Challenge</h2>
                            <p className="mb-12">{project.challenge}</p>

                            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent mb-12" />

                            <h2 className="text-3xl font-medium text-white mb-6">Architectural Strategy</h2>
                            <p className="mb-12">{project.architecture}</p>

                            <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent mb-12" />

                            <h2 className="text-3xl font-medium text-white mb-6">Structural Outcome</h2>
                            <p>{project.outcome}</p>
                        </motion.div>

                    </div>
                </div>
            </div>
        </PageTransition>
    );
}
