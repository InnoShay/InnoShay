import React from 'react';
import { motion } from 'motion/react';
import { Shield, Key, Lock, Server, FileCheck, ClipboardList, PackageCheck, Activity, ArrowRightLeft } from 'lucide-react';

const signals = [
  {
    title: 'Security-First Design',
    statement: 'Architecture that assumes adversarial conditions from the first line',
    icon: Shield,
  },
  {
    title: 'Data Privacy',
    statement: 'Your data is yours. We build systems that enforce that structurally.',
    icon: Lock,
  },
  {
    title: 'Access Control',
    statement: 'Role-based, auditable, and minimal-privilege by default',
    icon: Key,
  },
  {
    title: 'Resilience at Scale',
    statement: 'Systems designed to degrade gracefully, not fail catastrophically',
    icon: Server,
  },
  {
    title: 'Compliance Awareness',
    statement: 'SOC 2, GDPR, ISO 27001 — aware, not indifferent',
    icon: FileCheck,
  },
  {
    title: 'Audit Trails',
    statement: 'Every significant action logged, traceable, and exportable',
    icon: ClipboardList,
  },
  {
    title: 'Dependency Management',
    statement: 'Third-party risk assessed and documented in every engagement',
    icon: PackageCheck,
  },
  {
    title: 'Incident Response',
    statement: 'Clear protocols defined before deployment, not after incidents',
    icon: Activity,
  },
  {
    title: 'Transparent Handoffs',
    statement: 'You own the system. We ensure you can actually run it.',
    icon: ArrowRightLeft,
  },
];

export function Section6Security() {
  return (
    <section className="w-full py-[160px] md:py-[240px] bg-bg-void relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-24"
        >
          <h2 className="text-[28px] md:text-[38px] lg:text-[46px] font-medium tracking-[-0.02em] text-text-primary leading-[1.15]">
            Security, Trust & Reliability
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-16">
          {signals.map((signal, index) => (
            <motion.div
              key={signal.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: index * 0.05 }}
              className="flex flex-col"
            >
              <signal.icon className="w-[22px] h-[22px] text-text-muted mb-6" strokeWidth={1.5} />
              <h3 className="text-[20px] md:text-[22px] lg:text-[26px] font-medium tracking-[-0.01em] text-text-primary mb-3">
                {signal.title}
              </h3>
              <p className="text-[15px] md:text-[16px] text-text-secondary leading-[1.65] max-w-[32ch]">
                {signal.statement}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
