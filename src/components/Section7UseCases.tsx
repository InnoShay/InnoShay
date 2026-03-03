import React, { useState } from 'react';
import { motion } from 'motion/react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { GlowingEffect } from './ui/glowing-effect';

const categories = ['All', 'AI', 'Data', 'SaaS', 'Automation'];

const useCases = [
  { label: 'Enterprise AI Deployment', desc: 'Secure, scalable model hosting', category: 'AI', color: 'bg-accent-blue' },
  { label: 'SaaS Platform Architecture', desc: 'Multi-tenant, high-availability systems', category: 'SaaS', color: 'bg-accent-violet' },
  { label: 'Real-Time Data Pipelines', desc: 'Low-latency streaming and processing', category: 'Data', color: 'bg-accent-cyan' },
  { label: 'Internal Intelligence Systems', desc: 'Knowledge graphs and semantic search', category: 'AI', color: 'bg-accent-blue' },
  { label: 'Process Automation at Scale', desc: 'Orchestrated workflows across systems', category: 'Automation', color: 'bg-accent-violet' },
  { label: 'ML Model Infrastructure', desc: 'Training and inference pipelines', category: 'AI', color: 'bg-accent-blue' },
  { label: 'Customer-Facing Analytics', desc: 'Embedded dashboards and reporting', category: 'Data', color: 'bg-accent-cyan' },
  { label: 'Regulatory Reporting Systems', desc: 'Compliant, auditable data trails', category: 'Data', color: 'bg-accent-cyan' },
  { label: 'Digital Transformation Programs', desc: 'Legacy system modernization', category: 'Automation', color: 'bg-accent-violet' },
  { label: 'R&D Technology Platforms', desc: 'Experimental architecture for innovation', category: 'SaaS', color: 'bg-accent-blue' },
];

export function Section7UseCases() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredCases = useCases.filter(
    (uc) => activeCategory === 'All' || uc.category === activeCategory
  );

  return (
    <section className="w-full py-[160px] md:py-[240px] bg-bg-base relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-24"
        >
          <p className="text-[18px] md:text-[22px] text-text-secondary leading-[1.65] max-w-[48ch]">
            Built across industries. Engineered for the ones where failure is not an option.
          </p>
        </motion.div>

        {/* Filter Row (Desktop) */}
        <div className="hidden md:flex gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={twMerge(
                clsx(
                  'px-6 py-2 rounded-full text-[14px] font-medium transition-all duration-200 border',
                  activeCategory === cat
                    ? 'bg-accent-blue/10 text-accent-blue border-accent-blue/30'
                    : 'bg-transparent text-text-muted border-bg-border hover:text-text-primary hover:border-text-muted/30'
                )
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Filter Dropdown (Mobile) */}
        <div className="md:hidden mb-12">
          <select
            value={activeCategory}
            onChange={(e) => setActiveCategory(e.target.value)}
            className="w-full bg-bg-surface border border-bg-border rounded-lg px-4 py-3 text-text-primary text-[15px] focus:outline-none focus:border-accent-blue/50 appearance-none"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16 scale-100">
          {filteredCases.map((uc, index) => (
            <motion.li
              key={uc.label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="list-none min-h-[10rem]"
            >
              <div className="relative h-full rounded-[1.25rem] border-[0.75px] border-white/10 p-2 md:rounded-[1.5rem] md:p-2.5 group hover:border-white/20 transition-colors">
                <GlowingEffect blur={0} borderWidth={1.5} spread={40} glow={true} disabled={false} inactiveZone={0.01} proximity={64} />

                <div className="relative flex h-full flex-col justify-center gap-3 overflow-hidden rounded-xl border-[0.75px] border-white/5 bg-bg-surface/90 backdrop-blur-md p-5 shadow-sm z-10 transition-all duration-300 group-hover:bg-bg-elevated/90">
                  <div className="relative z-10 flex items-center gap-3">
                    <div className={twMerge(clsx('w-2 h-2 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.4)]', uc.color))} />
                    <h4 className="text-[16px] md:text-[18px] font-medium text-text-primary mt-0.5">
                      {uc.label}
                    </h4>
                  </div>
                  <p className="relative z-10 text-[14px] md:text-[15px] text-text-secondary pl-5 leading-relaxed">
                    {uc.desc}
                  </p>
                </div>
              </div>
            </motion.li>
          ))}
        </div>
      </div>
    </section>
  );
}
