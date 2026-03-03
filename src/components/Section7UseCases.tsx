import React, { useState } from 'react';
import { motion } from 'motion/react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { BrainCircuit, Cloud, Activity, Search, RefreshCw, Cpu, BarChart3, ShieldCheck, ArrowRightLeft, FlaskConical } from 'lucide-react';
import { GlowingEffect } from './ui/glowing-effect';

const categories = ['All', 'AI', 'Data', 'SaaS', 'Automation'];

const useCases = [
  { icon: BrainCircuit, label: 'Enterprise AI Deployment', desc: 'Secure, scalable model hosting', category: 'AI', color: 'bg-accent-blue', className: 'lg:col-span-1 lg:row-span-3', image: '/usecase-ai.png' },
  { icon: Cloud, label: 'SaaS Platform Architecture', desc: 'Multi-tenant, high-availability systems', category: 'SaaS', color: 'bg-accent-violet', className: 'lg:col-span-1 lg:row-span-1' },
  { icon: Activity, label: 'Real-Time Data Pipelines', desc: 'Low-latency streaming and processing', category: 'Data', color: 'bg-accent-cyan', className: 'lg:col-span-1 lg:row-span-1' },
  { icon: Search, label: 'Internal Intelligence Systems', desc: 'Knowledge graphs and semantic search', category: 'AI', color: 'bg-accent-blue', className: 'lg:col-span-2 lg:row-span-1' },
  { icon: RefreshCw, label: 'Process Automation at Scale', desc: 'Orchestrated workflows across systems', category: 'Automation', color: 'bg-accent-violet', className: 'lg:col-span-1 lg:row-span-1' },
  { icon: Cpu, label: 'ML Model Infrastructure', desc: 'Training and inference pipelines', category: 'AI', color: 'bg-accent-blue', className: 'lg:col-span-1 lg:row-span-1' },
  { icon: BarChart3, label: 'Customer-Facing Analytics', desc: 'Embedded dashboards and reporting', category: 'Data', color: 'bg-accent-cyan', className: 'lg:col-span-1 lg:row-span-2', image: '/usecase-analytics.png' },
  { icon: ShieldCheck, label: 'Regulatory Reporting Systems', desc: 'Compliant, auditable data trails', category: 'Data', color: 'bg-accent-cyan', className: 'lg:col-span-1 lg:row-span-1' },
  { icon: ArrowRightLeft, label: 'Digital Transformation Programs', desc: 'Legacy system modernization', category: 'Automation', color: 'bg-accent-violet', className: 'lg:col-span-1 lg:row-span-1' },
  { icon: FlaskConical, label: 'R&D Technology Platforms', desc: 'Experimental architecture for innovation', category: 'SaaS', color: 'bg-accent-blue', className: 'lg:col-span-2 lg:row-span-1' },
];

export function Section7UseCases() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredCases = useCases.filter(
    (uc) => activeCategory === 'All' || uc.category === activeCategory
  );

  return (
    <section className="w-full pt-[80px] pb-[160px] md:pt-[100px] md:pb-[240px] bg-bg-base relative border-t border-white/[0.03]">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16 md:grid-flow-row-dense">
          {filteredCases.map((uc, index) => (
            <motion.li
              key={uc.label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className={twMerge("list-none h-full", uc.className)}
            >
              <div className="relative h-full rounded-2xl border-[1px] border-white/5 bg-[#0a0a0a] group hover:border-white/10 transition-colors">
                <GlowingEffect blur={0} borderWidth={1.5} spread={40} glow={true} disabled={false} inactiveZone={0.01} proximity={64} />

                <div className="relative flex h-full flex-col justify-start rounded-2xl border-[0.5px] border-white/5 bg-[#0f0f11] p-6 md:p-7 shadow-sm z-10 overflow-hidden">

                  {/* Optional Image Background */}
                  {(uc as any).image && (
                    <div className="absolute inset-0 z-0 opacity-60">
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f11] via-[#0f0f11]/80 to-transparent z-10" />
                      <img src={(uc as any).image} alt={uc.label} className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-700 ease-out" />
                    </div>
                  )}

                  <div className="relative z-10 w-9 h-9 rounded-lg bg-white/[0.04] border border-white/5 flex items-center justify-center mb-6">
                    <uc.icon className="w-[18px] h-[18px] text-gray-400 group-hover:text-white transition-colors" />
                  </div>

                  <div className={twMerge("relative z-10 flex flex-col", (uc as any).image ? "mt-auto pt-6" : "")}>
                    <h3 className="text-[16px] md:text-[17px] font-medium text-white/90 mb-1.5 leading-snug">
                      {uc.label}
                    </h3>
                    <p className="text-[13px] md:text-[14px] text-gray-400/80 leading-relaxed font-normal">
                      {uc.desc}
                    </p>
                  </div>
                </div>
              </div>
            </motion.li>
          ))}
        </div>
      </div>
    </section>
  );
}
