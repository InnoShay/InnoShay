import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion'; // Changed from 'motion/react' to 'framer-motion'
import { Application } from '@splinetool/runtime';

/**
 * Philosophy Section Redesigned for cinematic scroll-driven storytelling.
 * Features a central 3D Spline object scaling down, sequential content points, and an animated neon thread.
 */

const pillars = [
  {
    id: 'point-1',
    numeral: '01',
    title: 'Engineering Discipline',
    body: "We design for the system's tenth year, not its first sprint.",
    align: 'left'
  },
  {
    id: 'point-2',
    numeral: '02',
    title: 'Systems Thinking',
    body: 'Every component we build is aware of everything it connects to.',
    align: 'right'
  },
  {
    id: 'point-3',
    numeral: '03',
    title: 'Reliability as Architecture',
    body: "Reliability is not a feature. It's a structural decision made at the start.",
    align: 'left'
  },
];

export function Section2Philosophy() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const app = new Application(canvasRef.current);
      app.load(`https://prod.spline.design/iOY-MkonfZeA7x81/scene.splinecode?t=${Date.now()}`);
    }
  }, []);

  // Track the raw 400vh scroll progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Scale down the 3D element smoothly from 1.1x to 0.5x
  // Removed scale per user request.

  // Opacities and Y positions for the 3 sequential pillars fading in and out over the 4 sections
  const point1Opacity = useTransform(scrollYProgress, [0.05, 0.15, 0.3, 0.4], [0, 1, 1, 0]);
  const point1Y = useTransform(scrollYProgress, [0.05, 0.2], [40, 0]);

  const point2Opacity = useTransform(scrollYProgress, [0.4, 0.5, 0.65, 0.75], [0, 1, 1, 0]);
  const point2Y = useTransform(scrollYProgress, [0.4, 0.55], [40, 0]);

  // Point 3 stays visible through the end of the 400vh section to act as an anchor
  const point3Opacity = useTransform(scrollYProgress, [0.75, 0.85, 0.95, 1], [0, 1, 1, 1]);
  const point3Y = useTransform(scrollYProgress, [0.75, 0.9], [40, 0]);

  // The glowing neon thread draw progress
  const threadProgress = useTransform(scrollYProgress, [0.05, 0.95], [0, 1]);

  return (
    <section ref={containerRef} className="relative w-full h-[400vh] bg-[#050505] text-white">
      {/* Sticky Background Box mapping purely to the screen viewport bounds */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center pointer-events-none">

        {/* Anti-Watermark Mask (Bottom Right gradient) and Dense Vignette */}
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_center,transparent_0%,rgba(5,5,5,0.8)_60%,#050505_100%)] z-10 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-full md:w-1/2 h-48 bg-gradient-to-tl from-[#050505] via-[#050505]/90 to-transparent z-20 pointer-events-none" />

        {/* 3D Model Center Fixed */}
        <div className="absolute inset-0 z-0 flex items-center justify-center opacity-80 md:opacity-100 pointer-events-auto">
          <canvas ref={canvasRef} id="philosophy-canvas" className="w-[800px] h-[800px] max-w-[100vw] max-h-[100vh] outline-none" />
        </div>

        {/* Neon Thread SVG Container mapped to screen center */}
        <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center hidden md:flex">
          <svg className="w-full h-full max-w-[1400px] mx-auto opacity-70" viewBox="0 0 1400 900" preserveAspectRatio="xMidYMid slice" fill="none">
            <defs>
              <linearGradient id="neonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00f0ff" />
                <stop offset="50%" stopColor="#8a2be2" />
                <stop offset="100%" stopColor="#00f0ff" />
              </linearGradient>
              <filter id="glowThread" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            <motion.path
              d="M 700 450 
                 C 700 300, 400 200, 300 200 
                 C 200 200, 200 400, 600 450 
                 C 900 500, 1100 350, 1100 450
                 C 1100 550, 600 650, 300 700"
              stroke="url(#neonGradient)"
              strokeWidth="2"
              strokeLinecap="round"
              filter="url(#glowThread)"
              style={{ pathLength: threadProgress }}
            />
          </svg>
        </div>

        {/* 3 Foreground Cards Absolute Positioned */}
        <div className="absolute inset-0 z-30 pointer-events-none max-w-[1400px] mx-auto w-full h-full relative">

          {/* Point 1 */}
          <motion.div style={{ opacity: point1Opacity, y: point1Y }} className="absolute top-[10%] left-[5%] md:top-[15%] md:left-[10%] lg:left-[15%] max-w-[280px] md:max-w-[340px] pointer-events-auto">
            <div className="flex flex-col gap-3 md:gap-4 p-6 md:p-8 rounded-2xl md:rounded-3xl border border-[#00f0ff]/20 md:border-white/5 bg-[#050505]/90 md:bg-[#0a0a0ade] backdrop-blur-xl shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00f0ff]/50 to-transparent opacity-100" />
              <div className="absolute top-0 right-0 w-[50px] h-[50px] bg-[#00f0ff] opacity-10 blur-3xl" />
              <span className="text-[#00f0ff] text-lg md:text-xl font-mono tracking-widest">{pillars[0].numeral}</span>
              <h2 className="text-2xl md:text-4xl font-medium tracking-tight text-white/90 leading-[1.1]">{pillars[0].title}</h2>
              <p className="text-gray-400 text-sm md:text-[15px] leading-relaxed mt-1 md:mt-2">{pillars[0].body}</p>
            </div>
          </motion.div>

          {/* Point 2 */}
          <motion.div style={{ opacity: point2Opacity, y: point2Y }} className="absolute top-[40%] right-[5%] md:right-[10%] lg:right-[15%] max-w-[280px] md:max-w-[340px] pointer-events-auto">
            <div className="flex flex-col items-start md:items-end gap-3 md:gap-4 p-6 md:p-8 rounded-2xl md:rounded-3xl border border-[#8a2be2]/20 md:border-white/5 bg-[#050505]/90 md:bg-[#0a0a0ade] backdrop-blur-xl shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#8a2be2]/50 to-transparent opacity-100" />
              <div className="absolute top-0 left-0 w-[50px] h-[50px] bg-[#8a2be2] opacity-10 blur-3xl md:left-auto md:right-0" />
              <span className="text-[#8a2be2] text-lg md:text-xl font-mono tracking-widest">{pillars[1].numeral}</span>
              <h2 className="text-2xl md:text-4xl font-medium tracking-tight text-white/90 leading-[1.1] text-left md:text-right">{pillars[1].title}</h2>
              <p className="text-gray-400 text-sm md:text-[15px] leading-relaxed mt-1 md:mt-2 text-left md:text-right">{pillars[1].body}</p>
            </div>
          </motion.div>

          {/* Point 3 */}
          <motion.div style={{ opacity: point3Opacity, y: point3Y }} className="absolute bottom-[10%] left-[5%] md:bottom-[15%] md:left-[10%] lg:left-[15%] max-w-[280px] md:max-w-[340px] pointer-events-auto">
            <div className="flex flex-col gap-3 md:gap-4 p-6 md:p-8 rounded-2xl md:rounded-3xl border border-[#00f0ff]/20 md:border-white/5 bg-[#050505]/90 md:bg-[#0a0a0ade] backdrop-blur-xl shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00f0ff]/50 to-transparent opacity-100" />
              <div className="absolute bottom-0 right-0 w-[50px] h-[50px] bg-[#00f0ff] opacity-10 blur-3xl" />
              <span className="text-[#00f0ff] text-lg md:text-xl font-mono tracking-widest">{pillars[2].numeral}</span>
              <h2 className="text-2xl md:text-4xl font-medium tracking-tight text-white/90 leading-[1.1]">{pillars[2].title}</h2>
              <p className="text-gray-400 text-sm md:text-[15px] leading-relaxed mt-1 md:mt-2">{pillars[2].body}</p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
