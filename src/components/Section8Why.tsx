import React from 'react';
import { motion } from 'motion/react';

const differentiators = [
  {
    numeral: '01',
    title: 'Engineering-Led Culture',
    body: 'Design here is a function of systems thinking, not decoration',
  },
  {
    numeral: '02',
    title: 'Long-Term Partnership Model',
    body: 'We measure success by what our systems do in year three, not week one',
  },
  {
    numeral: '03',
    title: 'Unified Design + Technology',
    body: 'The same team that architects your system designs the interface that runs it',
  },
  {
    numeral: '04',
    title: 'Future-Proof by Intention',
    body: "Scalability is not a roadmap item. It's a constraint we design against from the start.",
  },
];

export function Section8Why() {
  return (
    <section id="approach" className="w-full py-[160px] md:py-[240px] bg-bg-void relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 relative">
          {/* Left Column (45%) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-[45%] flex items-start"
          >
            <h2 className="text-[44px] md:text-[68px] lg:text-[80px] font-light tracking-[-0.03em] text-text-primary opacity-85 leading-[1.1]">
              "The systems we build are invisible when they're working. That's intentional."
            </h2>
          </motion.div>

          {/* Vertical Rule (Desktop) */}
          <div className="hidden lg:block absolute left-[45%] top-0 bottom-0 w-[1px] bg-bg-border" />

          {/* Right Column (55%) */}
          <div className="w-full lg:w-[55%] flex flex-col gap-16 lg:pl-12">
            {differentiators.map((diff, index) => (
              <motion.div
                key={diff.numeral}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
                className="flex flex-col"
              >
                <div className="text-[12px] md:text-[13px] font-mono text-text-muted mb-4">
                  {diff.numeral}
                </div>
                <h3 className="text-[20px] md:text-[22px] lg:text-[26px] font-medium tracking-[-0.01em] text-text-primary mb-3">
                  {diff.title}
                </h3>
                <p className="text-[15px] md:text-[16px] text-text-secondary leading-[1.65] max-w-[42ch]">
                  {diff.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
