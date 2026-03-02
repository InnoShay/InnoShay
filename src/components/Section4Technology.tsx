import React from 'react';
import { motion } from 'motion/react';
import { Blocks, Network, ShieldCheck, Cloud } from 'lucide-react';

const principles = [
  {
    title: 'Modular by Default',
    description: 'Systems built as composable units, not monolithic blocks',
    icon: Blocks,
  },
  {
    title: 'API-First Architecture',
    description: 'Clean contracts between every layer, versioned from day one',
    icon: Network,
  },
  {
    title: 'Security at the Foundation',
    description: 'Not bolted on. Designed in from the first schema.',
    icon: ShieldCheck,
  },
  {
    title: 'Cloud-Native & Portable',
    description: 'Infrastructure-agnostic. Runs where your organization needs it.',
    icon: Cloud,
  },
];

export function Section4Technology() {
  return (
    <section className="w-full py-[160px] md:py-[240px] bg-bg-void relative overflow-hidden">
      {/* Background SVG pipeline diagram */}
      <div className="absolute inset-0 opacity-6 pointer-events-none flex items-center justify-center">
        <svg width="100%" height="100%" viewBox="0 0 1440 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 200 H1440" stroke="currentColor" strokeWidth="1" />
          <path d="M0 100 H1440" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
          <path d="M0 300 H1440" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
          <circle cx="360" cy="200" r="6" fill="currentColor" />
          <circle cx="720" cy="200" r="6" fill="currentColor" />
          <circle cx="1080" cy="200" r="6" fill="currentColor" />
          <circle cx="360" cy="100" r="4" fill="currentColor" />
          <circle cx="720" cy="300" r="4" fill="currentColor" />
          <path d="M360 100 V200" stroke="currentColor" strokeWidth="1" />
          <path d="M720 200 V300" stroke="currentColor" strokeWidth="1" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-24 text-center"
        >
          <div className="text-[12px] md:text-[13px] font-medium tracking-[0.08em] text-accent-blue uppercase mb-6">
            Technical Architecture
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-0 relative">
          {principles.map((principle, index) => (
            <React.Fragment key={principle.title}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
                className="flex flex-col items-center text-center px-4"
              >
                <principle.icon className="w-6 h-6 text-text-muted mb-6" strokeWidth={1.5} />
                <h3 className="text-[20px] md:text-[22px] lg:text-[26px] font-medium tracking-[-0.01em] text-text-primary mb-4">
                  {principle.title}
                </h3>
                <p className="text-[15px] md:text-[16px] text-text-secondary leading-[1.65] max-w-[32ch]">
                  {principle.description}
                </p>
              </motion.div>

              {/* Separators */}
              {index < principles.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -translate-y-1/2 w-[1px] h-10 bg-bg-border" style={{ left: `${(index + 1) * 25}%` }} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
