import React from 'react';
import { motion } from 'motion/react';
import { twMerge } from 'tailwind-merge';
import { Shield, Lock, KeyRound, ServerCrash, FileCheck, ClipboardList, PackageCheck, Activity, ArrowRightLeft } from 'lucide-react';
import { GlowingEffect } from './ui/glowing-effect';

const securityFeatures = [
  {
    icon: Lock,
    title: 'Data Privacy',
    body: 'Your data is yours. We build systems that enforce that structurally.',
    className: 'lg:col-span-1 lg:row-span-2 min-h-[22rem]',
    image: '/feature-security.png',
  },
  {
    icon: Shield,
    title: 'Security-First Design',
    body: 'Architecture that assumes adversarial conditions from the first line.',
    className: 'lg:col-span-1',
  },
  {
    icon: KeyRound,
    title: 'Access Control',
    body: 'Role-based, auditable, and minimal-privilege by default.',
    className: 'lg:col-span-1',
  },
  {
    icon: ServerCrash,
    title: 'Resilience at Scale',
    body: 'Systems designed to degrade gracefully, not fail catastrophically.',
    className: 'lg:col-span-2',
    image: '/feature-servers.png',
  },
  {
    icon: ClipboardList,
    title: 'Audit Trails',
    body: 'Every significant action logged, traceable, and exportable.',
    className: 'lg:col-span-1',
  },
  {
    icon: PackageCheck,
    title: 'Dependency Management',
    body: 'Third-party risk assessed and documented in every engagement.',
    className: 'lg:col-span-1',
  },
  {
    icon: ArrowRightLeft,
    title: 'Transparent Handoffs',
    body: 'You own the system. We ensure you can actually run it.',
    className: 'lg:col-span-1',
  }
];

export function Section8Why() {
  return (
    <section id="approach" className="w-full py-[160px] md:py-[240px] bg-bg-void relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">

        <div className="mb-20">
          <h2 className="text-[32px] md:text-[56px] font-medium tracking-tight text-white mb-4">
            Security, Trust & Reliability
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:grid-flow-row-dense">
          {securityFeatures.map((feature, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className={twMerge("list-none h-full", feature.className)}
            >
              <div className="relative h-full rounded-2xl border-[1px] border-white/5 bg-[#0a0a0a] group hover:border-white/10 transition-colors">
                <GlowingEffect
                  spread={40}
                  glow={true}
                  disabled={false}
                  proximity={64}
                  inactiveZone={0.01}
                  borderWidth={1.5}
                />
                <div className="relative flex h-full flex-col justify-start rounded-2xl border-[0.5px] border-white/5 bg-[#0f0f11] p-6 md:p-7 shadow-sm z-10 overflow-hidden">

                  {/* Optional Image Background */}
                  {feature.image && (
                    <div className="absolute inset-0 z-0 opacity-60">
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f11] via-[#0f0f11]/80 to-transparent z-10" />
                      <img src={feature.image} alt={feature.title} className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-700 ease-out" />
                    </div>
                  )}

                  <div className="relative z-10 w-9 h-9 rounded-lg bg-white/[0.04] border border-white/5 flex items-center justify-center mb-6 shadow-sm">
                    <feature.icon className="w-[18px] h-[18px] text-gray-400 group-hover:text-white transition-colors" />
                  </div>

                  <div className={twMerge("relative z-10 flex flex-col", feature.image ? "mt-auto pt-6" : "")}>
                    <h3 className="text-[16px] md:text-[17px] font-medium text-white/90 mb-1.5 leading-snug">
                      {feature.title}
                    </h3>
                    <p className="text-[13px] md:text-[14px] text-gray-400/80 leading-relaxed font-normal">
                      {feature.body}
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
