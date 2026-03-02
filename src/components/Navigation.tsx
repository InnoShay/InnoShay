import React from 'react';
import { motion } from 'motion/react';
import { Menu, X } from 'lucide-react';

export function Navigation() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          isScrolled
            ? 'bg-[#07080A]/85 backdrop-blur-[20px] border-b border-bg-border'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Left: Wordmark */}
          <div className="font-sans font-medium text-[18px] text-text-primary">
            Innoshay Solutions
          </div>

          {/* Center: Nav links (Desktop) */}
          <div className="hidden md:flex items-center gap-8">
            {['Capabilities', 'Approach', 'Work', 'Company'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-[14px] text-text-secondary hover:text-text-primary transition-colors duration-220 relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-accent-blue transition-all duration-220 group-hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* Right: CTA (Desktop) */}
          <div className="hidden md:block">
            <button className="px-4 py-2 text-sm font-medium text-text-primary bg-bg-elevated border border-bg-border rounded-lg hover:border-accent-blue/40 transition-colors duration-200">
              Start a Project
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-text-primary p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <motion.div
        initial={false}
        animate={{
          opacity: isMobileMenuOpen ? 1 : 0,
          pointerEvents: isMobileMenuOpen ? 'auto' : 'none',
        }}
        className="fixed inset-0 z-[90] bg-bg-void flex flex-col items-center justify-center px-6"
      >
        <div className="flex flex-col items-center gap-8 text-center">
          {['Capabilities', 'Approach', 'Work', 'Company'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-3xl md:text-4xl font-medium text-text-primary hover:text-accent-blue transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item}
            </a>
          ))}
          <button className="mt-8 px-6 py-3 text-lg font-medium text-text-primary bg-bg-elevated border border-bg-border rounded-lg hover:border-accent-blue/40 transition-colors duration-200">
            Start a Project
          </button>
        </div>
      </motion.div>
    </>
  );
}
