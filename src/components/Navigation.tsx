import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { GlowingEffect } from './ui/glowing-effect';

const NAV_ITEMS = [
  { name: 'Capabilities', path: '/capabilities' },
  { name: 'Approach', path: '/approach' },
  { name: 'Work', path: '/work' },
  { name: 'Company', path: '/company' }
];

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  // ----- Scroll-Driven Capsule Contraction -----
  // Top of page (y=0) expanded -> Scrolled (y=150) contracted
  const capsuleWidth = useTransform(scrollY, [0, 150], ['100%', '85%']);
  const capsuleMaxWidth = useTransform(scrollY, [0, 150], ['1280px', '900px']);
  const capsulePaddingY = useTransform(scrollY, [0, 150], ['20px', '12px']);
  const capsulePaddingX = useTransform(scrollY, [0, 150], ['32px', '24px']);
  const capsuleY = useTransform(scrollY, [0, 150], ['0px', '16px']);
  const capsuleBgOpacity = useTransform(scrollY, [0, 150], [0.3, 0.65]);
  const capsuleBlur = useTransform(scrollY, [0, 150], ['12px', '24px']);

  // ----- Brand Identity Morph -----
  // The wordmark width collapses down so only the icon is visible
  const wordmarkWidth = useTransform(scrollY, [0, 120], ['160px', '0px']);
  const wordmarkOpacity = useTransform(scrollY, [0, 100], [1, 0]);

  // ----- Intelligent Slider State -----
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const location = useLocation();

  // Find active index based on route, default to -1 if home
  const activeIndex = NAV_ITEMS.findIndex(item => location.pathname === item.path);
  const targetIndex = hoveredIndex !== null ? hoveredIndex : activeIndex;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 z-[100] flex justify-center pointer-events-none"
        style={{
          y: capsuleY,
        }}
      >
        <motion.nav
          className="pointer-events-auto relative rounded-[40px] border-[0.75px] border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-colors duration-300 flex items-center justify-between p-1.5"
          style={{
            width: capsuleWidth,
            maxWidth: capsuleMaxWidth,
            y: capsuleY,
            // backgroundColor: `rgba(7,8,10,${capsuleBgOpacity.get()})`, // Handled by inner div now
          }}
        >
          {/* Aceternity Glowing Border Effect */}
          <GlowingEffect blur={0} borderWidth={1.5} spread={40} glow={true} disabled={false} inactiveZone={0.01} proximity={64} />

          {/* Inner Content Wrapper (Solid Background) */}
          <motion.div
            className="relative flex w-full h-full items-center justify-between rounded-[34px] overflow-hidden z-10"
            style={{
              paddingTop: capsulePaddingY,
              paddingBottom: capsulePaddingY,
              paddingLeft: capsulePaddingX,
              paddingRight: capsulePaddingX,
              backgroundColor: `rgba(7,8,10,${capsuleBgOpacity.get()})`,
              backdropFilter: `blur(${capsuleBlur.get()})`,
            }}
            animate={{
              backgroundColor: `rgba(7,8,10,${capsuleBgOpacity.get()})`,
              backdropFilter: `blur(${capsuleBlur.get()})`
            }}
            transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.1 }}
          >

            {/* Subtle top highlight edge to simulate thick glass */}
            <div className="absolute inset-0 rounded-[40px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] pointer-events-none" />

            {/* Ambient light sweep effect (very slow, luxurious) */}
            <div className="absolute -inset-[100%] z-0 rounded-full bg-gradient-to-r from-transparent via-white/[0.03] to-transparent animate-[spin_8s_linear_infinite] pointer-events-none opacity-50" />

            {/* LEFT: Brand morphing container */}
            <Link to="/" className="flex items-center gap-3 relative z-10 cursor-pointer group">
              {/* Geometric Logo Icon (Visible regardless of scroll) */}
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#2F7EEA] to-[#7B3FE4] flex items-center justify-center shadow-[0_0_12px_rgba(47,126,234,0.4)] group-hover:scale-[1.03] transition-transform duration-300">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 22H22L12 2Z" fill="white" />
                </svg>
              </div>

              {/* Collapsible Wordmark */}
              <motion.div
                style={{
                  width: wordmarkWidth,
                  opacity: wordmarkOpacity,
                }}
                className="overflow-hidden whitespace-nowrap"
              >
                <span className="font-sans font-medium text-[17px] text-white tracking-tight">
                  Innoshay Solutions
                </span>
              </motion.div>
            </Link>

            {/* CENTER: Navigation Links + Liquid Slider (Desktop) */}
            <div
              className="hidden md:flex items-center gap-1 relative z-10"
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {NAV_ITEMS.map((item, i) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onMouseEnter={() => setHoveredIndex(i)}
                  className={({ isActive }) => `relative z-10 px-5 flex items-center justify-center transition-colors duration-300 h-10 rounded-full ${isActive || targetIndex === i ? 'text-white' : 'text-gray-400 hover:text-gray-200'}`}
                >
                  {/* Active Highlight Slider */}
                  {targetIndex === i && (
                    <motion.div
                      layoutId="glass-slider"
                      className="absolute inset-0 rounded-full bg-[#2F7EEA]/15 border border-[#2F7EEA]/30 backdrop-blur-md -z-10 shadow-[inset_0_0_12px_rgba(47,126,234,0.2)]"
                      transition={{
                        type: 'spring',
                        stiffness: 350,
                        damping: 30,
                        mass: 0.8,
                      }}
                    />
                  )}
                  <span className="text-[14px] font-medium tracking-wide relative z-10">
                    {item.name}
                  </span>
                </NavLink>
              ))}
            </div>

            {/* RIGHT: CTA Button (Desktop) */}
            <div className="hidden md:block relative z-10">
              <Link to="/contact" className="inline-block px-5 py-2.5 text-sm font-medium text-white bg-white/5 backdrop-blur-md border border-white/10 rounded-full hover:bg-white/10 hover:border-white/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.2)]">
                Start a Project
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden text-white p-2 relative z-10 rounded-full hover:bg-white/10 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </motion.div>
        </motion.nav>
      </motion.div>

      {/* Mobile Menu Expansion Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.4 }}
            className="fixed top[80px] left-4 right-4 z-[90] mt-[80px] rounded-[32px] bg-[#07080A]/90 backdrop-blur-2xl border border-white/10 shadow-2xl p-6 overflow-hidden pointer-events-auto"
          >
            {/* Ambient light sweep inside mobile menu */}
            <div className="absolute -inset-[100%] z-0 rounded-full bg-gradient-to-r from-transparent via-white/[0.02] to-transparent animate-[spin_8s_linear_infinite] pointer-events-none" />

            <div className="flex flex-col gap-4 relative z-10">
              {NAV_ITEMS.map((item, i) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => `text-2xl font-medium tracking-tight hover:text-[#2F7EEA] transition-colors py-2 border-b border-white/5 ${isActive ? 'text-[#00f0ff]' : 'text-white'}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 + 0.1, duration: 0.4 }}
                  >
                    {item.name}
                  </motion.div>
                </NavLink>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: NAV_ITEMS.length * 0.05 + 0.1, duration: 0.4 }}
              >
                <Link
                  to="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="mt-4 block text-center px-6 py-4 text-base font-medium text-white bg-white/10 border border-white/10 rounded-2xl hover:bg-white/15 transition-colors duration-200"
                >
                  Start a Project
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
