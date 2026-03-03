import React, { useEffect, useRef } from 'react';
import { Application } from '@splinetool/runtime';
import { motion } from 'motion/react';
import { Plus } from 'lucide-react';
import { GlowingEffect } from './ui/glowing-effect';

export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const app = new Application(canvasRef.current);
      // Aggressively bypassing Spline's edge caching
      app.load(`https://prod.spline.design/b2TkwV9r1cxKpbgP/scene.splinecode?t=${Date.now()}`);
    }
  }, []);

  return (
    <section className="relative w-full h-screen bg-bg-void overflow-hidden flex items-center pt-24">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <canvas ref={canvasRef} id="canvas3d" className="w-full h-full object-cover opacity-80" />
        {/* Soft radial gradients to blend the 3D scene smoothly into the void */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#07080A_80%)] pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-bg-void to-transparent pointer-events-none" />
      </div>

      {/* Hero Content Overlay */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 h-full flex flex-col justify-end pb-12 sm:pb-24 lg:pb-32 pointer-events-none">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 lg:gap-8">

          {/* Left Column: Big Title */}
          <div className="flex flex-col max-w-4xl">
            <motion.h1
              initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-[48px] sm:text-[64px] md:text-[80px] lg:text-[100px] font-medium tracking-tight text-white leading-[1.05] mb-6 md:mb-8"
            >
              Innoshay Solutions<br />
              <span className="text-white/40">Future-Ready.</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-[10px] sm:text-[12px] md:text-[13px] tracking-[0.25em] font-medium text-white/50 uppercase flex flex-wrap items-center gap-x-4 gap-y-3"
            >
              <span>AI</span> <span className="text-white/20 font-light">\</span>
              <span>Data Intelligence</span> <span className="text-white/20 font-light">\</span>
              <span>Software Engineering</span> <span className="text-white/20 font-light">\</span>
              <span>SAAS</span> <span className="text-white/20 font-light">\</span>
              <span>3D-UI</span>
            </motion.div>
          </div>

          {/* Right Column: Subtitle & Buttons */}
          <div className="flex flex-col items-start lg:items-end text-left lg:text-right max-w-[400px]">
            <motion.p
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="text-[16px] md:text-[18px] text-white/60 leading-[1.6] mb-8 lg:mb-10 font-light"
            >
              We engineer intelligent AI solutions for modern organizations.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-row flex-wrap items-center gap-4 sm:gap-6 pointer-events-auto"
            >
              {/* Contact Us Button with Glowing Effect */}
              <div className="relative rounded-full p-[1.5px] group">
                <GlowingEffect blur={0} borderWidth={1.5} spread={30} glow={true} disabled={false} inactiveZone={0.01} proximity={64} />
                <button className="relative z-10 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-black/80 backdrop-blur-xl text-white/90 text-[14px] font-medium hover:bg-black transition-colors border border-white/5">
                  Contact Us
                </button>
              </div>

              {/* Get Started Button with Glowing Effect */}
              <div className="relative rounded-full p-[1.5px] group">
                <GlowingEffect blur={0} borderWidth={1.5} spread={30} glow={true} disabled={false} inactiveZone={0.01} proximity={64} />
                <button className="relative z-10 pl-6 sm:pl-7 pr-2 py-2 rounded-full bg-black/80 backdrop-blur-xl text-white/90 text-[14px] font-medium hover:bg-black transition-colors flex items-center gap-4 border border-white/5">
                  <span className="mb-0.5">Get Started</span>
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#00A3FF] text-black flex items-center justify-center group-hover:bg-[#33B5FF] group-hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(0,163,255,0.4)]">
                    <Plus className="w-5 h-5" strokeWidth={2.5} />
                  </div>
                </button>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
