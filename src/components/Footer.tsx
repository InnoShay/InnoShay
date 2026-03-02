import React from 'react';
import { Twitter, Linkedin, Github } from 'lucide-react';

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
              <a href="#" className="text-text-muted hover:text-text-primary transition-colors duration-180">
                <Twitter className="w-[18px] h-[18px]" strokeWidth={1.5} />
              </a>
              <a href="#" className="text-text-muted hover:text-text-primary transition-colors duration-180">
                <Linkedin className="w-[18px] h-[18px]" strokeWidth={1.5} />
              </a>
              <a href="#" className="text-text-muted hover:text-text-primary transition-colors duration-180">
                <Github className="w-[18px] h-[18px]" strokeWidth={1.5} />
              </a>
            </div>
          </div>

          {/* Column 2: Capabilities */}
          <div className="flex flex-col gap-4">
            <h4 className="text-[14px] font-medium text-text-primary mb-2">Capabilities</h4>
            <a href="#" className="text-[14px] text-text-muted hover:text-text-secondary transition-colors duration-180">AI Systems & Automation</a>
            <a href="#" className="text-[14px] text-text-muted hover:text-text-secondary transition-colors duration-180">Data Intelligence</a>
            <a href="#" className="text-[14px] text-text-muted hover:text-text-secondary transition-colors duration-180">SaaS Architecture</a>
            <a href="#" className="text-[14px] text-text-muted hover:text-text-secondary transition-colors duration-180">Software Engineering</a>
            <a href="#" className="text-[14px] text-text-muted hover:text-text-secondary transition-colors duration-180">Advanced UI & 3D Interfaces</a>
          </div>

          {/* Column 3: Company */}
          <div className="flex flex-col gap-4">
            <h4 className="text-[14px] font-medium text-text-primary mb-2">Company</h4>
            <a href="#" className="text-[14px] text-text-muted hover:text-text-secondary transition-colors duration-180">About</a>
            <a href="#approach" className="text-[14px] text-text-muted hover:text-text-secondary transition-colors duration-180">Approach</a>
            <a href="#" className="text-[14px] text-text-muted hover:text-text-secondary transition-colors duration-180">Careers</a>
            <a href="#" className="text-[14px] text-text-muted hover:text-text-secondary transition-colors duration-180">Contact</a>
          </div>

          {/* Column 4: Contact */}
          <div className="flex flex-col gap-4">
            <h4 className="text-[14px] font-medium text-text-primary mb-2">Contact</h4>
            <a href="mailto:hello@innoshay.com" className="text-[14px] text-text-muted hover:text-text-secondary transition-colors duration-180">hello@innoshay.com</a>
            <a href="#" className="text-[14px] text-text-muted hover:text-text-secondary transition-colors duration-180">LinkedIn</a>
            <div className="text-[14px] text-text-muted mt-2">San Francisco, CA</div>
          </div>
        </div>

        {/* Legal Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-bg-border">
          <div className="text-[12px] text-text-disabled">
            Copyright © 2025 Innoshay Solutions. All rights reserved.
          </div>
          <a href="#" className="text-[12px] text-text-disabled hover:text-text-muted transition-colors duration-180">
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
}
