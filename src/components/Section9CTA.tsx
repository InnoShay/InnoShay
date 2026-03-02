import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { Application } from '@splinetool/runtime';

export function Section9CTA() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const app = new Application(canvasRef.current);
      app.load('https://prod.spline.design/LXFrKFSMI6B5doQN/scene.splinecode');
    }
  }, []);

  return (
    <section className="w-full min-h-screen py-[120px] bg-bg-void relative overflow-hidden flex items-center">
      {/* Radial Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <div className="w-[800px] h-[800px] rounded-full bg-accent-blue opacity-5 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full relative z-20">
        <div className="text-left w-full lg:w-[55%] pt-20 lg:pt-0">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-[44px] md:text-[68px] lg:text-[80px] font-semibold tracking-[-0.03em] text-text-primary leading-[1.1] mb-8 drop-shadow-2xl relative z-20"
          >
            If you're building something that needs to last — let's talk.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="text-[16px] md:text-[18px] text-text-secondary leading-[1.75] max-w-[40ch] mb-12 drop-shadow-md relative z-20"
          >
            We take on a limited number of engagements each quarter, chosen for fit.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-8 relative z-30"
          >
            <button className="group flex items-center gap-3 px-8 py-4 bg-bg-elevated/80 backdrop-blur-md border border-accent-blue/40 rounded-xl hover:border-accent-blue/80 hover:bg-bg-elevated transition-all duration-180 cursor-pointer">
              <span className="text-[16px] font-medium text-text-primary">Begin a Conversation</span>
              <ArrowRight className="w-5 h-5 text-text-primary group-hover:translate-x-1 transition-transform duration-180" />
            </button>

            <a
              href="#capabilities"
              className="group flex items-center gap-2 text-[14px] text-text-muted hover:text-text-primary transition-colors duration-180"
            >
              <span>View our capabilities</span>
              <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform duration-180" />
            </a>
          </motion.div>
        </div>
      </div>

      {/* Spline Canvas - Absolute positioned on the right, higher z-index so hands overlap text */}
      <div className="absolute right-0 top-0 bottom-0 w-full lg:w-[60%] z-30 pointer-events-none lg:pointer-events-auto flex items-center justify-center opacity-50 lg:opacity-100">
        <canvas ref={canvasRef} id="canvas3d-cta" className="w-full h-full object-contain cursor-grab active:cursor-grabbing" />
      </div>
    </section>
  );
}
