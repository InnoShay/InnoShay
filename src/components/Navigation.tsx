import React, { useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { GlowingEffect } from './ui/glowing-effect';

const NAV_ITEMS = [
  { name: 'Capabilities', path: '/capabilities' },
  { name: 'Approach', path: '/approach' },
  { name: 'Work', path: '/work' },
  { name: 'Company', path: '/company' },
  { name: 'Privacy Policy', path: '/privacy-policy' }
];

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  // ----- Scroll-Driven Capsule Contraction -----
  const capsuleWidth = useTransform(scrollY, [0, 80], ['100%', '90%']); // Keeping it wider so it doesn't squish out of view.
  const capsuleMaxWidth = useTransform(scrollY, [0, 80], ['1280px', '1100px']);
  const capsulePaddingY = useTransform(scrollY, [0, 80], ['20px', '14px']);
  const capsulePaddingX = useTransform(scrollY, [0, 80], ['32px', '28px']);
  const capsuleY = useTransform(scrollY, [0, 80], ['0px', '16px']);
  const capsuleBgOpacity = useTransform(scrollY, [0, 80], [0.1, 0.85]); 
  const capsuleBlur = useTransform(scrollY, [0, 80], ['12px', '32px']); 
  const capsuleBorderOpacity = useTransform(scrollY, [0, 80], [0.05, 0.2]); 

  // ----- Brand Identity Morph -----
  const wordmarkWidth = useTransform(scrollY, [0, 120], ['160px', '0px']);
  const wordmarkOpacity = useTransform(scrollY, [0, 100], [1, 0]);

  // ----- Intelligent Slider State -----
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const location = useLocation();

  const activeIndex = NAV_ITEMS.findIndex(item => location.pathname === item.path);
  const targetIndex = hoveredIndex !== null ? hoveredIndex : activeIndex;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 z-[9999] flex justify-center pointer-events-none px-4 md:px-6"
        style={{ y: capsuleY }}
      >
        <motion.nav
          className="pointer-events-auto relative rounded-[40px] shadow-[0_8px_40px_rgba(0,0,0,0.6)] transition-colors duration-300 flex items-center justify-between p-1.5"
          style={{ width: capsuleWidth, maxWidth: capsuleMaxWidth, y: capsuleY }}
        >
          <GlowingEffect blur={0} borderWidth={1.5} spread={40} glow={true} disabled={false} inactiveZone={0.01} proximity={64} />

          <motion.div
            className="relative flex w-full h-full items-center justify-between rounded-[34px] overflow-hidden z-10 box-border"
            style={{
              paddingTop: capsulePaddingY,
              paddingBottom: capsulePaddingY,
              paddingLeft: capsulePaddingX,
              paddingRight: capsulePaddingX,
              backgroundColor: `rgba(10,12,16,${capsuleBgOpacity.get()})`,
              backdropFilter: `blur(${capsuleBlur.get()})`,
              WebkitBackdropFilter: `blur(${capsuleBlur.get()})`,
              border: `1px solid rgba(255,255,255,${capsuleBorderOpacity.get()})`,
            }}
            animate={{
              backgroundColor: `rgba(10,12,16,${capsuleBgOpacity.get()})`,
              backdropFilter: `blur(${capsuleBlur.get()})`,
              WebkitBackdropFilter: `blur(${capsuleBlur.get()})`,
              border: `1px solid rgba(255,255,255,${capsuleBorderOpacity.get()})`,
            }}
            transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.1 }}
          >
            <div className="absolute inset-0 rounded-[40px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] pointer-events-none" />
            <div className="absolute -inset-[100%] z-0 rounded-full bg-gradient-to-r from-transparent via-white/[0.03] to-transparent animate-[spin_8s_linear_infinite] pointer-events-none opacity-50" />

            <Link to="/" className="flex items-center gap-3 relative z-10 cursor-pointer group">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#2F7EEA] to-[#7B3FE4] flex items-center justify-center shadow-[0_0_12px_rgba(47,126,234,0.4)] group-hover:scale-[1.03] transition-transform duration-300">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 22H22L12 2Z" fill="white" />
                </svg>
              </div>
              <motion.div
                style={{ width: wordmarkWidth, opacity: wordmarkOpacity }}
                className="overflow-hidden whitespace-nowrap"
              >
                <span className="font-sans font-medium text-[17px] text-white tracking-tight">Innoshay Solutions</span>
              </motion.div>
            </Link>

            <div className="hidden lg:flex items-center gap-1 relative z-10" onMouseLeave={() => setHoveredIndex(null)}>
              {NAV_ITEMS.map((item, i) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onMouseEnter={() => setHoveredIndex(i)}
                  className={({ isActive }) => `relative z-10 px-5 flex items-center justify-center transition-colors duration-300 h-10 rounded-full ${isActive || targetIndex === i ? 'text-white' : 'text-gray-400 hover:text-gray-200'}`}
                >
                  {targetIndex === i && (
                    <motion.div
                      layoutId="glass-slider"
                      className="absolute inset-0 rounded-full bg-[#2F7EEA]/15 border border-[#2F7EEA]/30 backdrop-blur-md -z-10 shadow-[inset_0_0_12px_rgba(47,126,234,0.2)]"
                      transition={{ type: 'spring', stiffness: 350, damping: 30, mass: 0.8 }}
                    />
                  )}
                  <span className="text-[14px] font-medium tracking-wide relative z-10">{item.name}</span>
                </NavLink>
              ))}
            </div>

            <div className="hidden lg:block relative z-10">
              <Link to="/contact" className="inline-block px-5 py-2.5 text-sm font-medium text-white bg-white/5 backdrop-blur-md border border-white/10 rounded-full hover:bg-white/10 hover:border-white/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.2)]">
                Start a Project
              </Link>
            </div>

            <button
              className="lg:hidden text-white p-2 relative z-10 rounded-full hover:bg-white/10 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </motion.div>
        </motion.nav>
      </motion.div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.4 }}
            className="fixed top[80px] left-4 right-4 z-[90] mt-[80px] rounded-[32px] bg-[#07080A]/90 backdrop-blur-2xl border border-white/10 shadow-2xl p-6 overflow-hidden pointer-events-auto"
          >
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
