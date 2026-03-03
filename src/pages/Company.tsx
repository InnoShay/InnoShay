import React from 'react';
import { motion } from 'framer-motion';
import { PageTransition } from '../components/PageTransition';

export function Company() {
    return (
        <PageTransition>
            <div className="bg-[#050505] min-h-screen text-white relative">

                {/* Editorial Noise & Gradient Overlay */}
                <div className="fixed inset-0 z-0 pointer-events-none opacity-20" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")', opacity: 0.04 }} />
                <div className="absolute top-0 right-0 w-[80vw] h-[80vw] max-w-[800px] bg-gradient-to-bl from-[#2F7EEA]/10 to-transparent blur-[120px] rounded-full pointer-events-none" />

                <div className="max-w-4xl mx-auto px-6 relative z-10 pt-40 pb-40 flex flex-col gap-32">

                    {/* Hero Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
                            <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-pulse" />
                            <span className="text-xs font-mono text-gray-300 uppercase tracking-widest">Innoshay Solutions</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl lg:text-[80px] font-medium tracking-tight leading-[1.05] text-white">
                            Engineering the<br />Future, Intentionally.
                        </h1>
                    </motion.div>

                    {/* Section: Mission & Vision */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-10%" }}
                            transition={{ duration: 0.8 }}
                            className="flex flex-col gap-6"
                        >
                            <h2 className="text-sm font-mono tracking-widest uppercase text-[#00f0ff] border-b border-white/10 pb-4">Mission</h2>
                            <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed">
                                To engineer sovereign, scalable artificial intelligence architectures that grant enterprises absolute control over their operational destiny.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-10%" }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="flex flex-col gap-6"
                        >
                            <h2 className="text-sm font-mono tracking-widest uppercase text-[#8a2be2] border-b border-white/10 pb-4">Vision</h2>
                            <p className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed">
                                A digitally native economy where massive computational complexity is hidden beneath invisible, infinitely reliable infrastructure.
                            </p>
                        </motion.div>
                    </div>

                    {/* Large Editorial Statement */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5 }}
                        className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent my-12"
                    />

                    {/* Section: Philosophy & Engineering Culture */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{ duration: 1 }}
                        className="flex flex-col gap-12"
                    >
                        <h2 className="text-3xl md:text-4xl font-medium text-white max-w-2xl">
                            "We do not build minimum viable products. We build maximum viable infrastructure. There is no such thing as a temporary hack when dealing with autonomous agents."
                        </h2>

                        <div className="prose prose-invert prose-lg text-gray-400 max-w-none grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 font-light leading-relaxed">
                            <div>
                                <h3 className="text-white font-medium text-xl mb-4">The Philosophy</h3>
                                <p>
                                    Innoshay Solutions was founded on a singular premise: the bottleneck to the AI revolution isn't intelligence—it's infrastructure. While others race to integrate the latest third-party API, we saw a critical vulnerability in the lack of underlying architectural discipline.
                                </p>
                                <p>
                                    Our philosophy is deeply rooted in systems engineering. We believe that an AI model is conceptually identical to a heavy industrial machine; it requires a structurally sound environment to operate without collapsing under its own rotational variance. We provide that structure.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-white font-medium text-xl mb-4">Engineering Culture</h3>
                                <p>
                                    Our culture is deliberately calm. We reject the chaotic "hustle" of traditional startups in favor of deep, sustained focus. Our engineers are given the supreme luxury of time—time to think, time to design, and time to refactor until a component is unbreakably perfect.
                                </p>
                                <p>
                                    We are polyglots, mathematicians, and systems architects. We value raw competence over performative velocity. When you operate at the bleeding edge of computational possibility, patience is not a luxury; it is a strict operational requirement.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5 }}
                        className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent my-12"
                    />

                    {/* Section: Future Outlook */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-10%" }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col md:flex-row items-start gap-12 md:gap-24"
                    >
                        <div className="w-full md:w-1/3">
                            <h2 className="text-sm font-mono tracking-widest uppercase text-gray-500">Future Outlook</h2>
                        </div>
                        <div className="w-full md:w-2/3 prose prose-invert prose-lg text-gray-400 font-light leading-relaxed">
                            <p>
                                We are rapidly approaching a threshold where software development abstracts from writing logic to defining constraints. As autonomous reasoning systems take over tactical execution, the role of human engineers elevates to pure orchestration and systems design.
                            </p>
                            <p>
                                Innoshay is positioned to construct the scaffolding for this new reality. We are actively researching distributed multi-agent consensus protocols, continuous verification environments, and sovereign data silos. The future belongs to those who control the underlying physics of digital interaction. We are building the engine room.
                            </p>
                        </div>
                    </motion.div>

                </div>
            </div>
        </PageTransition>
    );
}
