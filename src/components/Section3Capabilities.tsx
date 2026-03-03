import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Application } from '@splinetool/runtime';
import { BrainCircuit, Database, Layers, Code2 } from 'lucide-react';
import { GlowingEffect } from './ui/glowing-effect';

const capabilities = [
  {
    title: 'AI Systems & Automation',
    description: 'Intelligent systems built for production, not demonstration',
    tags: 'Inference · Pipelines · Decision Systems',
    icon: BrainCircuit,
  },
  {
    title: 'Data Intelligence',
    description: 'From raw signal to organizational insight, reliably',
    tags: 'Ingestion · Transformation · Analytics',
    icon: Database,
  },
  {
    title: 'SaaS Architecture',
    description: 'Products engineered to grow without being re-engineered',
    tags: 'Multi-tenant · Subscriptions · Backends',
    icon: Layers,
  },
  {
    title: 'Software Engineering',
    description: 'Clean code. Clean contracts. Clean handoffs.',
    tags: 'API Design · Integration · Full-stack',
    icon: Code2,
  },
];

export function Section3Capabilities() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const app = new Application(canvasRef.current);
      app.load('https://prod.spline.design/qgF7ZzW5Gp0I6SK2/scene.splinecode');
    }
  }, []);

  return (
    <section id="capabilities" className="w-full py-[160px] md:py-[240px] bg-bg-void relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-12">
          <div className="h-[2px] w-8 bg-accent-blue" />
          <span className="text-[12px] font-medium tracking-[0.08em] text-text-primary uppercase">Capabilities</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Large Left Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden bg-bg-surface border border-bg-border flex flex-col min-h-[600px]"
          >
            <div className="absolute inset-0 z-0">
              <canvas ref={canvasRef} className="w-full h-full" />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-bg-surface/80 via-bg-surface/20 to-transparent z-10 pointer-events-none" />

            <div className="relative z-20 p-10 md:p-12 flex flex-col h-full pointer-events-none">
              <h2 className="text-[36px] md:text-[48px] font-medium tracking-[-0.02em] text-text-primary leading-[1.1] mb-6 max-w-[15ch]">
                Core Capabilities
              </h2>

              <div className="mt-auto pt-12 pointer-events-auto">
                <button className="px-6 py-3 bg-white text-black rounded-full font-medium hover:bg-white/90 transition-colors">
                  View our work
                </button>
              </div>
            </div>
          </motion.div>

          {/* Right Grid */}
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {capabilities.map((cap, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="list-none min-h-[14rem]"
              >
                <div className="relative h-full rounded-[1.5rem] border-[0.75px] border-white/10 p-2 md:p-3 group">
                  <GlowingEffect
                    spread={40}
                    glow={true}
                    disabled={false}
                    proximity={64}
                    inactiveZone={0.01}
                    borderWidth={3}
                  />

                  <div className="relative flex h-full flex-col justify-start rounded-xl border-[0.75px] border-white/5 bg-bg-base/90 backdrop-blur-md p-6 shadow-sm z-10 transition-colors group-hover:bg-bg-elevated/90 overflow-hidden">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-8 group-hover:bg-accent-blue/10 transition-colors">
                      <cap.icon className="w-6 h-6 text-text-primary group-hover:text-accent-blue transition-colors" />
                    </div>
                    <h3 className="text-[20px] font-medium text-text-primary mb-4">{cap.title}</h3>
                    <p className="text-[15px] text-text-secondary leading-[1.6] mb-8 flex-grow">{cap.description}</p>

                    <div className="w-full h-[1px] bg-bg-border mb-6 mt-auto border-t border-bg-border/50"></div>
                    <div className="font-mono text-[10px] text-text-muted uppercase tracking-wider">
                      {cap.tags}
                    </div>
                  </div>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
