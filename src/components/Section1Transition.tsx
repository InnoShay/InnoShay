import React from 'react';
import { motion } from 'motion/react';

export function Section1Transition() {
  return (
    <section className="w-full py-[240px] flex flex-col items-center justify-center bg-bg-void relative z-10">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-[36px] md:text-[56px] lg:text-[68px] leading-[1.1] font-semibold tracking-[-0.025em] text-text-primary"
        >
          We build the systems that serious organizations depend on.
        </motion.h1>
      </div>

      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className="mt-16 h-[1px] w-full max-w-[480px] mx-auto origin-left"
        style={{
          background: 'linear-gradient(90deg, transparent, #2F7EEA, #7C5CFC, transparent)',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="mt-24 w-[70vw] max-w-5xl overflow-hidden relative group rounded-full border border-bg-border bg-bg-surface/30 backdrop-blur-sm py-4"
      >
        {/* Gradient masks for smooth fade at edges */}
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-bg-void to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-bg-void to-transparent z-10 pointer-events-none" />
        
        <div className="flex whitespace-nowrap animate-marquee group-hover:[animation-play-state:paused]">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="flex items-center mx-8 text-text-secondary text-[16px] tracking-wide">
              Trusted by <span className="font-bold text-text-primary mx-2">DEVS</span> worldwide
              <span className="mx-12 text-accent-blue/50">•</span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
