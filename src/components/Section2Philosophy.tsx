import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

const pillars = [
  {
    numeral: '01',
    title: 'Engineering Discipline',
    body: "We design for the system's tenth year, not its first sprint.",
  },
  {
    numeral: '02',
    title: 'Systems Thinking',
    body: 'Every component we build is aware of everything it connects to.',
  },
  {
    numeral: '03',
    title: 'Reliability as Architecture',
    body: "Reliability is not a feature. It's a structural decision made at the start.",
  },
];

export function Section2Philosophy() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="w-full py-[160px] md:py-[240px] bg-bg-base relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="relative flex flex-col gap-24">
          
          {/* Vertical progression line background */}
          <div className="absolute left-[40px] md:left-[60px] top-8 bottom-8 w-[2px] bg-bg-border" />
          
          {/* Vertical progression line fill (Neon) */}
          <motion.div 
            className="absolute left-[40px] md:left-[60px] top-8 w-[2px] bg-accent-blue shadow-[0_0_15px_rgba(47,126,234,0.8)] z-0 origin-top"
            style={{ height: lineHeight }}
          />

          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.numeral}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex flex-row items-center"
            >
              {/* Node / Numeral */}
              <div className="w-[80px] md:w-[120px] flex-shrink-0 flex items-center justify-center bg-bg-base z-10 py-4">
                <span className="text-[32px] md:text-[48px] font-semibold text-text-primary opacity-20 bg-bg-base px-2">
                  {pillar.numeral}
                </span>
              </div>

              {/* Content */}
              <div className="flex-grow pl-8 md:pl-16 flex flex-col justify-center">
                <h2 className="text-[28px] md:text-[38px] lg:text-[46px] font-medium tracking-[-0.02em] text-text-primary leading-[1.15] mb-4">
                  {pillar.title}
                </h2>
                <p className="text-[16px] md:text-[18px] text-text-secondary leading-[1.75] max-w-[50ch]">
                  {pillar.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
