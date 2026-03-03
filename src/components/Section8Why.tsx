import React from 'react';
import { motion } from 'motion/react';
import { Shield, Lock, KeyRound, ServerCrash, FileCheck, ClipboardList, PackageCheck, Activity, ArrowRightLeft } from 'lucide-react';
import { GlowingEffect } from './ui/glowing-effect';

const securityFeatures = [
  {
    icon: Shield,
    title: 'Security-First Design',
    body: 'Architecture that assumes adversarial conditions from the first line',
  },
  {
    icon: Lock,
    title: 'Data Privacy',
    body: 'Your data is yours. We build systems that enforce that structurally.',
  },
  {
    icon: KeyRound,
    title: 'Access Control',
    body: 'Role-based, auditable, and minimal-privilege by default',
  },
  {
    icon: ServerCrash,
    title: 'Resilience at Scale',
    body: 'Systems designed to degrade gracefully, not fail catastrophically',
  },
  {
    icon: FileCheck,
    title: 'Compliance Awareness',
    body: 'SOC 2, GDPR, ISO 27001 — aware, not indifferent',
  },
  {
    icon: ClipboardList,
    title: 'Audit Trails',
    body: 'Every significant action logged, traceable, and exportable',
  },
  {
    icon: PackageCheck,
    title: 'Dependency Management',
    body: 'Third-party risk assessed and documented in every engagement',
  },
  {
    icon: Activity,
    title: 'Incident Response',
    body: 'Clear protocols defined before deployment, not after incidents',
  },
  {
    icon: ArrowRightLeft,
    title: 'Transparent Handoffs',
    body: 'You own the system. We ensure you can actually run it.',
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {securityFeatures.map((feature, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="list-none min-h-[14rem]"
            >
              <div className="relative h-full rounded-[1.25rem] border-[0.75px] border-white/10 p-2 md:rounded-[1.5rem] md:p-3 group">
                <GlowingEffect
                  spread={40}
                  glow={true}
                  disabled={false}
                  proximity={64}
                  inactiveZone={0.01}
                  borderWidth={3}
                />
                <div className="relative flex h-full flex-col justify-start gap-4 overflow-hidden rounded-xl border-[0.75px] border-white/5 bg-bg-base/90 backdrop-blur-md p-6 shadow-sm md:p-6 z-10 transition-colors group-hover:bg-bg-elevated/90">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center mb-2">
                    <feature.icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                  </div>

                  <div>
                    <h3 className="text-[20px] font-medium text-white mb-2">
                      {feature.title}
                    </h3>

                    <p className="text-[15px] text-gray-400 leading-[1.6]">
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
