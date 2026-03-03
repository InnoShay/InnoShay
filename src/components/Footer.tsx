import React from 'react';
import { Instagram, Linkedin, Github } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="w-full bg-bg-void border-t border-bg-border pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-8 mb-24">
          {/* Column 1: Brand */}
          <div className="flex flex-col gap-6">
            <div className="font-sans font-medium text-[18px] text-text-primary">
              Innoshay Solutions
            </div>
            <p className="text-[14px] text-text-secondary leading-[1.65] max-w-[32ch]">
              We build the intelligent, scalable systems that serious organizations run on.
            </p>
            <div className="flex items-center gap-4 mt-2">
              <a href="https://www.instagram.com/innoshaysolutions/" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-text-primary transition-colors duration-180">
                <Instagram className="w-[18px] h-[18px]" strokeWidth={1.5} />
              </a>
              <a href="https://www.linkedin.com/in/innoshay/" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-text-primary transition-colors duration-180">
                <Linkedin className="w-[18px] h-[18px]" strokeWidth={1.5} />
              </a>
              <a href="https://github.com/InnoShay" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-text-primary transition-colors duration-180">
                <Github className="w-[18px] h-[18px]" strokeWidth={1.5} />
              </a>
            </div>
          </div>

          {/* Column 2: Capabilities */}
          <div className="flex flex-col gap-4">
            <h4 className="text-[14px] font-medium text-text-primary mb-2">Capabilities</h4>
            <Link to="/capabilities" className="text-[14px] text-text-muted hover:text-text-secondary transition-colors duration-180">AI Systems & Automation</Link>
            <Link to="/capabilities" className="text-[14px] text-text-muted hover:text-text-secondary transition-colors duration-180">Data Intelligence</Link>
            <Link to="/capabilities" className="text-[14px] text-text-muted hover:text-text-secondary transition-colors duration-180">SaaS Architecture</Link>
            <Link to="/capabilities" className="text-[14px] text-text-muted hover:text-text-secondary transition-colors duration-180">Software Engineering</Link>
            <Link to="/capabilities" className="text-[14px] text-text-muted hover:text-text-secondary transition-colors duration-180">Advanced UI & 3D Interfaces</Link>
          </div>

          {/* Column 3: Company */}
          <div className="flex flex-col gap-4">
            <h4 className="text-[14px] font-medium text-text-primary mb-2">Company</h4>
            <Link to="/company" className="text-[14px] text-text-muted hover:text-text-secondary transition-colors duration-180">About</Link>
            <Link to="/approach" className="text-[14px] text-text-muted hover:text-text-secondary transition-colors duration-180">Approach</Link>
            <Link to="/work" className="text-[14px] text-text-muted hover:text-text-secondary transition-colors duration-180">Careers</Link>
            <Link to="/contact" className="text-[14px] text-text-muted hover:text-text-secondary transition-colors duration-180">Contact</Link>
          </div>

          {/* Column 4: Contact */}
          <div className="flex flex-col gap-4">
            <h4 className="text-[14px] font-medium text-text-primary mb-2">Contact</h4>
            <a href="mailto:luckyjournals@gmail.com" className="text-[14px] text-text-muted hover:text-text-secondary transition-colors duration-180">luckyjournals@gmail.com</a>
            <a href="https://www.linkedin.com/in/innoshay/" target="_blank" rel="noopener noreferrer" className="text-[14px] text-text-muted hover:text-text-secondary transition-colors duration-180">LinkedIn</a>
            <div className="text-[14px] text-text-muted mt-2">Delhi, IND</div>
          </div>
        </div>

        {/* Legal Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-bg-border">
          <div className="text-[12px] text-text-disabled">
            Copyright © 2025 Innoshay Solutions. All rights reserved.
          </div>
          <Link to="/privacy-policy" className="text-[12px] px-4 py-2 rounded-full border border-white/5 bg-white/5 text-text-disabled hover:text-text-white hover:bg-white/10 transition-colors duration-180">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
