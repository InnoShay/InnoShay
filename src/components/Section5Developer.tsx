import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Code2, Network, Database, LayoutDashboard, X, Minus, Maximize2 } from 'lucide-react';

type AppId = 'code' | 'terminal' | 'architecture' | 'database' | 'dashboard';

interface AppWindow {
  id: AppId;
  title: string;
  icon: React.ElementType;
  color: string;
  content: React.ReactNode;
}

const codeContent = (
  <div className="flex h-full bg-[#1e1e1e] text-[#d4d4d4] font-mono text-[13px] overflow-hidden">
    <div className="w-12 flex-shrink-0 flex flex-col items-end pr-4 py-4 border-r border-white/10 text-[#858585] select-none bg-[#1e1e1e]">
      {Array.from({ length: 15 }).map((_, i) => <div key={i} className="leading-[1.6]">{i + 1}</div>)}
    </div>
    <div className="flex-grow p-4 overflow-y-auto">
      <div className="text-[#6a9955] italic mb-2">// Maintainability</div>
      <div className="mb-4">Every system we deliver includes <span className="text-[#ce9178]">'architectural documentation'</span><br/>and onboarding materials for the teams who own it next.</div>
      <div className="text-[#6a9955] italic mb-2">// Performance</div>
      <div className="mb-4">Performance is <span className="text-[#569cd6]">measured</span>, not assumed.<br/>We profile, optimize, and benchmark against strict SLAs.</div>
      <div className="text-[#6a9955] italic mb-2">// Integration</div>
      <div>Designed for the teams that <span className="text-[#c586c0]">inherit</span> the system.<br/>Clean APIs, predictable behavior, and comprehensive test coverage.</div>
    </div>
  </div>
);

const terminalContent = (
  <div className="h-full bg-[#000000] text-[#33ff00] font-mono text-[13px] p-4 overflow-y-auto">
    <div>$ innoshay deploy --production</div>
    <div className="text-[#cccccc] mt-1">[1/4] Resolving dependencies...</div>
    <div className="text-[#cccccc]">[2/4] Building optimized production build...</div>
    <div className="text-[#cccccc]">[3/4] Running integration tests...</div>
    <div className="text-[#33ff00] mt-1">✓ 142 tests passed (1.2s)</div>
    <div className="text-[#cccccc]">[4/4] Deploying to edge network...</div>
    <div className="text-[#33ff00] mt-2">🚀 Deployment successful!</div>
    <div className="text-[#cccccc] mt-1">URL: https://innoshay.solutions</div>
    <div className="mt-4 flex items-center"><span className="mr-2">$</span><span className="w-2 h-4 bg-[#33ff00] animate-pulse"></span></div>
  </div>
);

const architectureContent = (
  <div className="h-full bg-[#f0f0f0] flex items-center justify-center p-8 relative overflow-hidden">
    <div className="absolute inset-0 dot-matrix-bg opacity-20"></div>
    <div className="relative z-10 flex flex-col items-center gap-8">
      <div className="px-6 py-3 bg-white rounded-xl shadow-lg border border-gray-200 font-medium text-gray-800 flex items-center gap-2">
        <Globe className="w-4 h-4 text-blue-500" /> Client Application
      </div>
      <div className="w-[2px] h-8 bg-gray-300"></div>
      <div className="flex gap-8">
        <div className="px-6 py-3 bg-white rounded-xl shadow-lg border border-gray-200 font-medium text-gray-800 flex items-center gap-2">
          <Network className="w-4 h-4 text-purple-500" /> API Gateway
        </div>
      </div>
      <div className="flex gap-16">
        <div className="w-[2px] h-8 bg-gray-300 transform -rotate-45 translate-x-4"></div>
        <div className="w-[2px] h-8 bg-gray-300 transform rotate-45 -translate-x-4"></div>
      </div>
      <div className="flex gap-8">
        <div className="px-6 py-3 bg-white rounded-xl shadow-lg border border-gray-200 font-medium text-gray-800 flex items-center gap-2">
          <Cpu className="w-4 h-4 text-green-500" /> Microservices
        </div>
        <div className="px-6 py-3 bg-white rounded-xl shadow-lg border border-gray-200 font-medium text-gray-800 flex items-center gap-2">
          <Database className="w-4 h-4 text-orange-500" /> Primary DB
        </div>
      </div>
    </div>
  </div>
);

const databaseContent = (
  <div className="h-full bg-[#1e293b] text-slate-300 font-mono text-[12px] flex flex-col">
    <div className="flex border-b border-slate-700 bg-slate-800 p-2 gap-2">
      <div className="px-3 py-1 bg-slate-700 rounded text-slate-200">users</div>
      <div className="px-3 py-1 hover:bg-slate-700 rounded cursor-pointer">organizations</div>
      <div className="px-3 py-1 hover:bg-slate-700 rounded cursor-pointer">deployments</div>
    </div>
    <div className="p-4 overflow-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-slate-700 text-slate-400">
            <th className="pb-2 font-normal">id</th>
            <th className="pb-2 font-normal">name</th>
            <th className="pb-2 font-normal">role</th>
            <th className="pb-2 font-normal">status</th>
            <th className="pb-2 font-normal">last_active</th>
          </tr>
        </thead>
        <tbody>
          {[
            ['uuid-1', 'Alice Chen', 'admin', 'active', '2 mins ago'],
            ['uuid-2', 'Bob Smith', 'developer', 'active', '1 hr ago'],
            ['uuid-3', 'Charlie Davis', 'viewer', 'offline', '2 days ago'],
            ['uuid-4', 'Diana Prince', 'developer', 'active', 'Just now'],
          ].map((row, i) => (
            <tr key={i} className="border-b border-slate-700/50 hover:bg-slate-800/50">
              {row.map((cell, j) => (
                <td key={j} className="py-2">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const dashboardContent = (
  <div className="h-full bg-white text-slate-800 p-6 overflow-y-auto">
    <h2 className="text-2xl font-semibold mb-6">System Overview</h2>
    <div className="grid grid-cols-3 gap-4 mb-8">
      <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
        <div className="text-sm text-slate-500 mb-1">Uptime</div>
        <div className="text-2xl font-semibold text-emerald-600">99.99%</div>
      </div>
      <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
        <div className="text-sm text-slate-500 mb-1">Active Users</div>
        <div className="text-2xl font-semibold text-blue-600">12,450</div>
      </div>
      <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
        <div className="text-sm text-slate-500 mb-1">Avg Latency</div>
        <div className="text-2xl font-semibold text-purple-600">42ms</div>
      </div>
    </div>
    <div className="h-32 rounded-xl border border-slate-200 bg-slate-50 flex items-end p-4 gap-2">
      {/* Fake chart bars */}
      {Array.from({ length: 20 }).map((_, i) => (
        <div key={i} className="flex-1 bg-blue-500/20 rounded-t-sm" style={{ height: `${Math.random() * 80 + 20}%` }}>
          <div className="w-full bg-blue-500 rounded-t-sm" style={{ height: '4px' }}></div>
        </div>
      ))}
    </div>
  </div>
);

const apps: AppWindow[] = [
  { id: 'code', title: 'VS Code - developer_experience.ts', icon: Code2, color: 'bg-blue-500', content: codeContent },
  { id: 'terminal', title: 'Terminal - zsh', icon: Terminal, color: 'bg-gray-800', content: terminalContent },
  { id: 'architecture', title: 'Architecture - System Design', icon: Network, color: 'bg-purple-500', content: architectureContent },
  { id: 'database', title: 'DataGrip - Production DB', icon: Database, color: 'bg-orange-500', content: databaseContent },
  { id: 'dashboard', title: 'Dashboard - Metrics', icon: LayoutDashboard, color: 'bg-emerald-500', content: dashboardContent },
];

// Need to import Globe and Cpu for the architecture content
import { Globe, Cpu } from 'lucide-react';

export function Section5Developer() {
  const [activeApp, setActiveApp] = useState<AppId>('code');
  const [openApps, setOpenApps] = useState<AppId[]>(['code']);

  const handleAppClick = (id: AppId) => {
    if (!openApps.includes(id)) {
      setOpenApps([...openApps, id]);
    }
    setActiveApp(id);
  };

  const handleClose = (id: AppId, e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenApps(openApps.filter(appId => appId !== id));
    if (activeApp === id) {
      setActiveApp(openApps.length > 1 ? openApps[openApps.length - 2] : 'code');
    }
  };

  return (
    <section className="w-full py-[160px] md:py-[240px] bg-bg-base relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center h-[800px] relative">
        
        <div className="absolute top-0 text-center mb-12 z-0">
          <h2 className="text-[32px] md:text-[48px] font-medium tracking-tight text-text-primary mb-4">
            The Developer Experience
          </h2>
          <p className="text-text-secondary text-[18px]">
            Interact with the dock below to explore our workflow.
          </p>
        </div>

        {/* Desktop Area */}
        <div className="relative w-full h-[600px] mt-32 perspective-1000">
          <AnimatePresence>
            {openApps.map((appId) => {
              const app = apps.find(a => a.id === appId)!;
              const isActive = activeApp === appId;
              
              return (
                <motion.div
                  key={appId}
                  initial={{ opacity: 0, scale: 0.9, y: 40 }}
                  animate={{ 
                    opacity: isActive ? 1 : 0.6, 
                    scale: isActive ? 1 : 0.95,
                    y: isActive ? 0 : 20,
                    zIndex: isActive ? 50 : 10
                  }}
                  exit={{ opacity: 0, scale: 0.9, y: 40 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="absolute inset-0 mx-auto w-full lg:max-w-[80%] h-[500px] rounded-xl overflow-hidden shadow-2xl shadow-black/50 border border-white/10 flex flex-col bg-[#1e1e1e]"
                  onClick={() => setActiveApp(appId)}
                >
                  {/* Window Header */}
                  <div className="h-12 flex-shrink-0 border-b border-white/10 flex items-center px-4 gap-2 bg-[#2d2d2d] select-none cursor-default">
                    <div className="flex gap-2 group">
                      <button onClick={(e) => handleClose(appId, e)} className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E] flex items-center justify-center">
                        <X className="w-2 h-2 text-black opacity-0 group-hover:opacity-100" />
                      </button>
                      <button className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123] flex items-center justify-center">
                        <Minus className="w-2 h-2 text-black opacity-0 group-hover:opacity-100" />
                      </button>
                      <button className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29] flex items-center justify-center">
                        <Maximize2 className="w-2 h-2 text-black opacity-0 group-hover:opacity-100" />
                      </button>
                    </div>
                    <div className="flex-1 text-center font-sans text-[13px] text-[#a0a0a0] font-medium mr-12">
                      {app.title}
                    </div>
                  </div>

                  {/* Window Content */}
                  <div className="flex-grow overflow-hidden relative">
                    {isActive && <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)] z-50 rounded-b-xl" />}
                    {app.content}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Mac Dock */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 mb-12 z-50">
          <div className="flex items-end gap-2 px-3 py-2 bg-white/10 border border-white/20 rounded-2xl backdrop-blur-2xl shadow-2xl">
            {apps.map((app) => {
              const isOpen = openApps.includes(app.id);
              const isActive = activeApp === app.id;
              
              return (
                <div key={app.id} className="relative flex flex-col items-center group">
                  {/* Tooltip */}
                  <div className="absolute -top-10 px-3 py-1 bg-black/80 text-white text-[12px] rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    {app.title.split(' - ')[0]}
                  </div>
                  
                  {/* Icon */}
                  <button 
                    onClick={() => handleAppClick(app.id)}
                    className={`relative flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-200 origin-bottom hover:w-16 hover:h-16 hover:-translate-y-2 ${app.color} shadow-lg`}
                  >
                    <app.icon className="w-6 h-6 text-white" />
                    {/* Glass reflection */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/40 to-transparent opacity-50 pointer-events-none" />
                  </button>
                  
                  {/* Active Indicator */}
                  <div className={`w-1 h-1 rounded-full bg-white/80 mt-1 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0'}`} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
