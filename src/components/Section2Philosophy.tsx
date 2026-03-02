import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Application } from '@splinetool/runtime';

/**
 * Philosophy Section Redesigned for cinematic scroll-driven storytelling.
 * Features a central 3D Spline object, sequential content points, and an animated neon thread.
 */

const pillars = [
  {
    id: 'point-1',
    numeral: '01',
    title: 'Engineering Discipline',
    body: "We design for the system's tenth year, not its first sprint.",
  },
  {
    id: 'point-2',
    numeral: '02',
    title: 'Systems Thinking',
    body: 'Every component we build is aware of everything it connects to.',
  },
  {
    id: 'point-3',
    numeral: '03',
    title: 'Reliability as Architecture',
    body: "Reliability is not a feature. It's a structural decision made at the start.",
  },
];

export function Section2Philosophy() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Initialize Spline Application
  useEffect(() => {
    if (canvasRef.current) {
      const app = new Application(canvasRef.current);
      app.load('https://prod.spline.design/iOY-MkonfZeA7x81/scene.splinecode');
    }
  }, []);

  // Track scroll progress against the tall container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Smoothing the scroll progress to avoid jitter
  // easing: cubic-bezier-like (e.g. standard ease)
  // useTransform provides linear mapping. We rely on the natural scroll momentum, 
  // but we can map the values carefully.

  // The total scroll is divided roughly into 3 phases:
  // Phase 1: 0.0 -> 0.33 (Point 01 appears)
  // Phase 2: 0.33 -> 0.66 (Point 02 appears)
  // Phase 3: 0.66 -> 1.0 (Point 03 appears)

  // -- Point 01 Animations --
  const point1Opacity = useTransform(scrollYProgress, [0.05, 0.15], [0, 1]);
  const point1Y = useTransform(scrollYProgress, [0.05, 0.2], [40, 0]);

  // -- Point 02 Animations --
  const point2Opacity = useTransform(scrollYProgress, [0.4, 0.5], [0, 1]);
  const point2Y = useTransform(scrollYProgress, [0.4, 0.55], [40, 0]);

  // -- Point 03 Animations --
  const point3Opacity = useTransform(scrollYProgress, [0.75, 0.85], [0, 1]);
  const point3Y = useTransform(scrollYProgress, [0.75, 0.9], [40, 0]);

  // -- Neon Thread SVG Animation --
  // We draw a single path that loops from center -> top-left -> center-right -> bottom-left.
  // The path length is approximately 1.
  const threadProgress = useTransform(scrollYProgress, [0.05, 0.95], [0, 1]);

  return (
    <section
      ref={containerRef}
      // h-[400vh] creates the scroll timeline distance
      className="relative w-full h-[400vh] bg-[#050505] text-white overflow-clip"
    >
      {/* Sticky Inner Container */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center justify-center">

        {/* Background Depth / Noise (Optional subtle texture) */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}>
        </div>

        {/* 3D Centerpiece */}
        <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-auto">
          {/* Sized to allow the 3D object to breathe without overpowering the text */}
          <div className="w-[600px] h-[600px] md:w-[800px] md:h-[800px] max-w-[100vw] max-h-[100vh]">
            <canvas ref={canvasRef} id="canvas3d" className="w-full h-full outline-none" />
          </div>
        </div>

        {/* SVG Neon Thread Layer */}
        {/* Z-index positions it behind text but potentially in front of or behind the Spline based on visual preference */}
        <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center">
          <svg
            className="w-full h-full max-w-[1400px] mx-auto opacity-80"
            viewBox="0 0 1400 900"
            preserveAspectRatio="xMidYMid slice"
            fill="none"
          >
            <defs>
              <linearGradient id="neonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2F7EEA" />     {/* Electric Blue */}
                <stop offset="50%" stopColor="#7B3FE4" />    {/* Violet */}
                <stop offset="100%" stopColor="#2F7EEA" />   {/* Back to Blue for loop */}
              </linearGradient>
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/*
              Path conceptually walks from:
              Center (700, 450) -> Top Left (Point 01) -> Mid Right (Point 02) -> Bottom Left (Point 03)
              Using cubic bezier curves for smooth, engineered routing.
              Responsive coordinates are tricky in SVG absolute space, so we use a relatively fixed aspect ratio and center it.
            */}
            <motion.path
              d="M 700 450 
                 C 700 300, 400 200, 300 200 
                 C 200 200, 200 400, 600 450 
                 C 900 500, 1100 350, 1100 450
                 C 1100 550, 600 650, 300 700"
              stroke="url(#neonGradient)"
              strokeWidth="3"
              strokeLinecap="round"
              filter="url(#glow)"
              style={{
                pathLength: threadProgress
              }}
            />
          </svg>
        </div>

        {/* Content Points Container */}
        {/* We use a max-w layout to bound the absolute positions nicely on large screens */}
        <div className="absolute inset-0 z-20 pointer-events-none max-w-[1400px] mx-auto w-full h-full relative">

          {/* Point 01: Top Left */}
          <motion.div
            style={{ opacity: point1Opacity, y: point1Y }}
            className="absolute top-[10%] left-[5%] md:top-[15%] md:left-[10%] lg:left-[15%] max-w-[280px] md:max-w-[320px] pointer-events-auto"
          >
            <div className="flex flex-col gap-2 p-4 md:p-0 bg-black/40 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none rounded-2xl md:rounded-none border border-white/5 md:border-none">
              <span className="text-[#2F7EEA] text-lg md:text-xl font-mono tracking-widest opacity-80">{pillars[0].numeral}</span>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium tracking-tight text-white mb-1">
                {pillars[0].title}
              </h2>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                {pillars[0].body}
              </p>
            </div>
          </motion.div>

          {/* Point 02: Mid Right */}
          <motion.div
            style={{ opacity: point2Opacity, y: point2Y }}
            className="absolute top-[40%] right-[5%] md:right-[10%] lg:right-[15%] max-w-[280px] md:max-w-[320px] pointer-events-auto text-left md:text-right"
          >
            <div className="flex flex-col gap-2 md:items-end items-start p-4 md:p-0 bg-black/40 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none rounded-2xl md:rounded-none border border-white/5 md:border-none">
              <span className="text-[#7B3FE4] text-lg md:text-xl font-mono tracking-widest opacity-80">{pillars[1].numeral}</span>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium tracking-tight text-white mb-1">
                {pillars[1].title}
              </h2>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed text-left md:text-right">
                {pillars[1].body}
              </p>
            </div>
          </motion.div>

          {/* Point 03: Bottom Left */}
          <motion.div
            style={{ opacity: point3Opacity, y: point3Y }}
            className="absolute bottom-[10%] left-[5%] md:bottom-[15%] md:left-[10%] lg:left-[15%] max-w-[280px] md:max-w-[320px] pointer-events-auto"
          >
            <div className="flex flex-col gap-2 p-4 md:p-0 bg-black/40 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none rounded-2xl md:rounded-none border border-white/5 md:border-none">
              <span className="text-[#2F7EEA] text-lg md:text-xl font-mono tracking-widest opacity-80">{pillars[2].numeral}</span>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium tracking-tight text-white mb-1">
                {pillars[2].title}
              </h2>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                {pillars[2].body}
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
