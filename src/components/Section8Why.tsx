import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

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
  const containerRef = useRef<HTMLDivElement>(null);

  // Track progress over a tall container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Neon line grows top to bottom
  const lineHeight = useTransform(scrollYProgress, [0.05, 0.9], ['0%', '100%']);

  // Principle 1 mapping (0.05 -> 0.25)
  const p1Opacity = useTransform(scrollYProgress, [0.05, 0.15], [0.3, 1]);
  const p1IndicatorScale = useTransform(scrollYProgress, [0.05, 0.15], [0.5, 1]);
  const p1IndicatorColor = useTransform(scrollYProgress, [0.05, 0.15], ['rgba(255,255,255,0.1)', 'rgba(47,126,234,1)']);
  const p1Glow = useTransform(scrollYProgress, [0.05, 0.15], ['0px 0px 0px rgba(47,126,234,0)', '0px 0px 12px rgba(47,126,234,0.6)']);

  // Principle 2 mapping (0.3 -> 0.5)
  const p2Opacity = useTransform(scrollYProgress, [0.3, 0.4], [0.3, 1]);
  const p2IndicatorScale = useTransform(scrollYProgress, [0.3, 0.4], [0.5, 1]);
  const p2IndicatorColor = useTransform(scrollYProgress, [0.3, 0.4], ['rgba(255,255,255,0.1)', 'rgba(88,96,239,1)']);
  const p2Glow = useTransform(scrollYProgress, [0.3, 0.4], ['0px 0px 0px rgba(88,96,239,0)', '0px 0px 12px rgba(88,96,239,0.6)']);

  // Principle 3 mapping (0.55 -> 0.75)
  const p3Opacity = useTransform(scrollYProgress, [0.55, 0.65], [0.3, 1]);
  const p3IndicatorScale = useTransform(scrollYProgress, [0.55, 0.65], [0.5, 1]);
  const p3IndicatorColor = useTransform(scrollYProgress, [0.55, 0.65], ['rgba(255,255,255,0.1)', 'rgba(123,63,228,1)']);
  const p3Glow = useTransform(scrollYProgress, [0.55, 0.65], ['0px 0px 0px rgba(123,63,228,0)', '0px 0px 12px rgba(123,63,228,0.6)']);

  // Principle 4 mapping (0.8 -> 1.0)
  const p4Opacity = useTransform(scrollYProgress, [0.8, 0.9], [0.3, 1]);
  const p4IndicatorScale = useTransform(scrollYProgress, [0.8, 0.9], [0.5, 1]);
  const p4IndicatorColor = useTransform(scrollYProgress, [0.8, 0.9], ['rgba(255,255,255,0.1)', 'rgba(123,63,228,1)']);
  const p4Glow = useTransform(scrollYProgress, [0.8, 0.9], ['0px 0px 0px rgba(123,63,228,0)', '0px 0px 12px rgba(123,63,228,0.6)']);

  const points = [
    { op: p1Opacity, scale: p1IndicatorScale, color: p1IndicatorColor, glow: p1Glow },
    { op: p2Opacity, scale: p2IndicatorScale, color: p2IndicatorColor, glow: p2Glow },
    { op: p3Opacity, scale: p3IndicatorScale, color: p3IndicatorColor, glow: p3Glow },
    { op: p4Opacity, scale: p4IndicatorScale, color: p4IndicatorColor, glow: p4Glow },
  ];

  return (
    <section
      id="approach"
      ref={containerRef}
      // Expand height to create scroll space
      className="w-full h-[300vh] bg-[#050505] relative"
    >
      <div className="sticky top-0 w-full h-screen overflow-hidden py-16 md:py-24 flex items-center">
        <div className="max-w-7xl mx-auto px-6 w-full h-full flex items-center">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 relative w-full h-full lg:h-auto items-center lg:items-start">

            {/* Left Column - Quote (Sticky in view) */}
            <div className="w-full lg:w-[45%] flex items-start flex-shrink-0 z-10 transition-transform duration-500 pt-8 lg:pt-0">
              <h2 className="text-[36px] md:text-[52px] lg:text-[72px] font-light tracking-[-0.03em] text-white opacity-90 leading-[1.05]">
                "The systems we build are invisible when they're working. That's intentional."
              </h2>
            </div>

            {/* Right Column - Principles Sequence */}
            <div className="w-full lg:w-[55%] flex flex-col relative pb-8">

              {/* The Neon Progression System */}
              <div className="absolute left-[-24px] md:left-0 top-2 bottom-2 w-[2px] bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  className="w-full origin-top relative"
                  style={{ height: lineHeight }}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-[#2F7EEA] to-[#7B3FE4] shadow-[0_0_15px_rgba(47,126,234,0.6)]" />
                </motion.div>
              </div>

              {/* The 4 Principles List */}
              <div className="flex flex-col gap-12 md:gap-16 pl-6 md:pl-16 relative">
                {differentiators.map((diff, index) => {
                  const anim = points[index];
                  return (
                    <motion.div
                      key={diff.numeral}
                      style={{ opacity: anim.op }}
                      className="flex flex-col relative pt-1"
                    >
                      {/* Connection Node */}
                      <motion.div
                        className="absolute left-[-31px] md:left-[-69px] top-[7px] w-2.5 h-2.5 rounded-full border border-black z-10"
                        style={{
                          backgroundColor: anim.color,
                          scale: anim.scale,
                          boxShadow: anim.glow
                        }}
                      />

                      <div className="text-[12px] md:text-[13px] font-mono text-gray-500 mb-2 md:mb-3">
                        {diff.numeral}
                      </div>
                      <h3 className="text-[20px] md:text-[24px] lg:text-[28px] font-medium tracking-[-0.01em] text-white mb-2 md:mb-3 transition-colors">
                        {diff.title}
                      </h3>
                      <p className="text-[15px] md:text-[16px] text-gray-400 leading-[1.65] max-w-[42ch]">
                        {diff.body}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
