import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { PageTransition } from '../components/PageTransition';

const approachSections = [
    {
        id: '01',
        title: 'Engineering Discipline',
        content: (
            <>
                <p className="mb-6">
                    We do not build software to survive the next quarter. We architect systems designed to operate flawlessly in their tenth year. This requires a fundamental rejection of "move fast and break things." In enterprise AI infrastructure, breaking things is catastrophic.
                </p>
                <p>
                    Our discipline is rooted in rigorous type safety, exhaustive test coverage, and a refusal to accumulate technical debt for the sake of speed. We write code that is boring because the systems it powers must be incredibly stable.
                </p>
            </>
        )
    },
    {
        id: '02',
        title: 'Systems Thinking',
        content: (
            <>
                <p className="mb-6">
                    An AI model is useless in a vacuum. Its true value is realized only when it is deeply integrated into the surrounding data pipelines, user interfaces, and business logic.
                </p>
                <p>
                    We do not build isolated features. We engineer holistic ecosystems. Every component is designed with full awareness of the upstream data it consumes and the downstream systems it feeds. This prevents the compounding entropy that destroys scaling architectures.
                </p>
            </>
        )
    },
    {
        id: '03',
        title: 'Reliability as Architecture',
        content: (
            <>
                <p className="mb-6">
                    Reliability is not a post-launch phase. It is not a feature you can bolt onto an inherently fragile foundation. It must be a structural decision made at the very inception of the project.
                </p>
                <p>
                    We employ stateless microservices, distributed consensus algorithms, and rigorous fallback caching. When a third-party LLM provider goes down, your system shouldn't. We engineer graceful degradation paths so your users never see a stack trace.
                </p>
            </>
        )
    },
    {
        id: '04',
        title: 'Long-Term Partnership Model',
        content: (
            <>
                <p className="mb-6">
                    System design is an ongoing conversation. We do not toss zip files over the wall and disappear. An intelligent platform requires continuous tuning, monitoring, and adaptation as underlying models evolve.
                </p>
                <p>
                    We operate as your specialized engineering arm. We embed our architects with your stakeholders to ensure the technical trajectory perfectly aligns with your macro-economic goals. Calm, measured, and ruthlessly effective.
                </p>
            </>
        )
    }
];

export function Approach() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start center', 'end center']
    });

    // Smooth out the scroll physically
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Map progress to the height of the SVG line (0 to 100%)
    const lineHeight = useTransform(smoothProgress, [0, 1], ['0%', '100%']);

    return (
        <PageTransition>
            <div className="bg-[#050505] min-h-screen text-white relative">

                {/* Subtle Background Glow */}
                <div className="fixed inset-0 z-0 pointer-events-none flex items-center justify-center overflow-hidden">
                    <div className="w-[80vw] h-[80vw] max-w-[1000px] bg-[#8a2be2] opacity-[0.02] blur-[120px] rounded-full" />
                </div>

                <div className="max-w-7xl mx-auto px-6 relative z-10 pt-40 pb-32">

                    {/* Hero Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="max-w-4xl mb-32 md:mb-48"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
                            <span className="w-2 h-2 rounded-full bg-[#8a2be2] animate-pulse" />
                            <span className="text-xs font-mono text-gray-300 uppercase tracking-widest">Architectural Approach</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-medium tracking-tight mb-8 leading-[1.1] text-white">
                            We design for the system's tenth year, not its first sprint.
                        </h1>
                    </motion.div>

                    {/* Core Content Layout with Scroll Tracker */}
                    <div ref={containerRef} className="relative grid grid-cols-1 md:grid-cols-[120px_1fr] lg:grid-cols-[200px_1fr] gap-12 lg:gap-24">

                        {/* Left Column: Fixed Progress Tracker (Hidden on Mobile) */}
                        <div className="hidden md:block relative">
                            <div className="sticky top-1/3 h-[50vh] flex justify-center">

                                {/* The background track */}
                                <div className="absolute top-0 bottom-0 w-[2px] bg-white/5 rounded-full" />

                                {/* The neon thread that draws down */}
                                <motion.div
                                    className="absolute top-0 w-[2px] rounded-full"
                                    style={{
                                        height: lineHeight,
                                        background: 'linear-gradient(to bottom, #00f0ff, #8a2be2)',
                                        boxShadow: '0 0 20px 2px rgba(138, 43, 226, 0.4)'
                                    }}
                                />

                                {/* Tracking Node at the bottom of the line */}
                                <motion.div
                                    className="absolute w-4 h-4 rounded-full border-2 border-[#8a2be2] bg-[#050505] shadow-[0_0_15px_#8a2be2]"
                                    style={{
                                        top: lineHeight,
                                        translateY: '-50%'
                                    }}
                                />
                            </div>
                        </div>

                        {/* Right Column: Narrative Sections */}
                        <div className="flex flex-col gap-32 pb-40">
                            {approachSections.map((section, idx) => (
                                <motion.div
                                    key={section.id}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-20%" }}
                                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                    className="flex flex-col gap-8 group"
                                >
                                    <div className="flex flex-col gap-2">
                                        <span className="font-mono text-[#8a2be2] text-xl tracking-widest opacity-80 group-hover:opacity-100 transition-opacity">
                                            {section.id}
                                        </span>
                                        <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-white/90">
                                            {section.title}
                                        </h2>
                                    </div>

                                    <div className="prose prose-invert prose-lg md:prose-xl text-gray-400 max-w-3xl leading-relaxed font-light">
                                        {section.content}
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                    </div>
                </div>
            </div>
        </PageTransition>
    );
}
