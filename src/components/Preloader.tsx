import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Application } from '@splinetool/runtime';

interface PreloaderProps {
    onBootComplete: () => void;
}

export function Preloader({ onBootComplete }: PreloaderProps) {
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [splineLoaded, setSplineLoaded] = useState(false);
    const [transitioning, setTransitioning] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const splineAppRef = useRef<Application | null>(null);

    useEffect(() => {
        if (!canvasRef.current) return;

        // Initialize the Spline Application
        const app = new Application(canvasRef.current);
        splineAppRef.current = app;

        // Artificial initial progress for visual feedback while Spline downloads
        let progressInterval: number;
        let currentProgress = 0;

        // We want the counter to crawl up to ~80% artificially, then snap to 100% when Spline actually finishes
        progressInterval = window.setInterval(() => {
            if (currentProgress < 85 && !splineLoaded) {
                // Slow down as it gets higher
                const increment = currentProgress > 60 ? 1 : 2;
                currentProgress += increment;
                setLoadingProgress(currentProgress);
            }
        }, 60);

        // The provided Spline URL with cache-busting
        const splineUrl = `https://prod.spline.design/0Z4lHQ0ZUBSKSWLa/scene.splinecode?t=${Date.now()}`;

        app.load(splineUrl).then(() => {
            // Spline is fully loaded and ready
            setSplineLoaded(true);
            clearInterval(progressInterval);

            // Fast forward the remaining progress natively
            let finalizeInterval = window.setInterval(() => {
                currentProgress += 3;
                if (currentProgress >= 100) {
                    currentProgress = 100;
                    setLoadingProgress(100);
                    clearInterval(finalizeInterval);

                    // Trigger the cinematic transition outwards
                    setTimeout(() => {
                        setTransitioning(true);
                        setTimeout(() => {
                            onBootComplete();
                        }, 800); // 0.8s dissolve transition
                    }, 600); // Brief pause at 100% to let the glow sink in
                } else {
                    setLoadingProgress(currentProgress);
                }
            }, 16);
        });

        return () => {
            clearInterval(progressInterval);
            if (splineAppRef.current) {
                splineAppRef.current.dispose();
            }
        };
    }, []);

    return (
        <AnimatePresence>
            {!transitioning && (
                <motion.div
                    className="fixed inset-0 z-[9999] bg-[#020202] text-white flex items-center justify-center overflow-hidden"
                    exit={{ opacity: 0, filter: 'blur(10px)', scale: 1.05 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} // smooth cinematic out
                >

                    {/* Subtle Back Grid */}
                    <motion.div
                        className="absolute inset-0 opacity-20 pointer-events-none"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.15 }}
                        transition={{ duration: 2 }}
                        style={{
                            backgroundImage: `linear-gradient(rgba(0, 255, 255, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 255, 0.15) 1px, transparent 1px)`,
                            backgroundSize: '40px 40px',
                            backgroundPosition: 'center center'
                        }}
                    />

                    {/* Border Glow framing */}
                    <div className="absolute inset-6 md:inset-10 border border-[#00f0ff]/10 rounded-sm pointer-events-none">
                        {/* Top Line */}
                        <motion.div
                            className="absolute top-0 left-0 h-[1px] bg-gradient-to-r from-transparent via-[#00f0ff] to-transparent"
                            initial={{ width: 0, opacity: 0, left: '50%', x: '-50%' }}
                            animate={{ width: '100%', opacity: 1 }}
                            transition={{ duration: 1.5, ease: "circOut" }}
                        />
                        {/* Bottom Line */}
                        <motion.div
                            className="absolute bottom-0 left-0 h-[1px] bg-gradient-to-r from-transparent via-[#8a2be2] to-transparent"
                            initial={{ width: 0, opacity: 0, left: '50%', x: '-50%' }}
                            animate={{ width: '100%', opacity: 1 }}
                            transition={{ duration: 1.5, ease: "circOut", delay: 0.2 }}
                        />

                        {/* Corner Accents */}
                        <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[#00f0ff] opacity-50" />
                        <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-[#00f0ff] opacity-50" />
                        <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-[#8a2be2] opacity-50" />
                        <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[#8a2be2] opacity-50" />
                    </div>

                    {/* Micro text corner indicators */}
                    <div className="absolute top-12 left-12 hidden md:block text-[10px] font-mono text-[#00f0ff]/40 tracking-widest uppercase pointer-events-none">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>SYS.BOOT_SEQ_01</motion.div>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>SECURE_CHANNEL_ESTABLISHED</motion.div>
                    </div>
                    <div className="absolute top-12 right-12 hidden md:block text-[10px] font-mono text-[#8a2be2]/40 tracking-widest uppercase text-right pointer-events-none">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>NEURAL_ENGINE: STANDBY</motion.div>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>CORE_TEMP: OPTIMAL</motion.div>
                    </div>

                    {/* Spline 3D Core */}
                    <motion.div
                        className="absolute inset-0 flex items-center justify-center mix-blend-screen pointer-events-none"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{
                            opacity: loadingProgress >= 100 ? 1 : 0.8,
                            scale: loadingProgress >= 100 ? 1.05 : 1
                        }}
                        transition={{ duration: 2, ease: "easeOut" }}
                    >
                        <canvas ref={canvasRef} id="preloader-spline" className="w-[100vw] h-[100vh] outline-none" />
                        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#020202]/50 to-[#020202] z-10 pointer-events-none" />
                    </motion.div>

                    {/* Counter Overlay */}
                    <motion.div
                        className="absolute bottom-16 md:bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none z-20"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <motion.div
                            className={`text-[12px] md:text-[14px] font-mono tracking-[0.2em] mb-3 transition-colors duration-500 ${loadingProgress >= 100 ? 'text-[#00f0ff]' : 'text-gray-400'}`}
                            animate={{ opacity: loadingProgress >= 100 ? [1, 0.4, 1] : 1 }}
                            transition={{ repeat: loadingProgress >= 100 ? Infinity : 0, duration: 2 }}
                        >
                            {loadingProgress === 100 ? 'SYSTEM INITIALIZED' : 'BOOT SEQUENCE ACTIVE'}
                        </motion.div>

                        <div className={`text-[48px] md:text-[64px] font-mono tracking-tighter leading-none transition-all duration-700 ${loadingProgress === 100 ? 'text-white drop-shadow-[0_0_15px_rgba(0,240,255,0.5)] scale-105' : 'text-white/80 scale-100'}`}>
                            {loadingProgress.toString().padStart(3, '0')}<span className="text-[24px] md:text-[32px] text-white/40 ml-1">%</span>
                        </div>

                        {/* Progress Bar under counter */}
                        <div className="w-[200px] h-[1px] bg-white/10 mt-6 overflow-hidden">
                            <motion.div
                                className="h-full bg-gradient-to-r from-[#8a2be2] to-[#00f0ff]"
                                style={{ width: `${loadingProgress}%` }}
                                layout
                            />
                        </div>
                    </motion.div>

                </motion.div>
            )}
        </AnimatePresence>
    );
}
