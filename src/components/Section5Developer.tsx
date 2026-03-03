import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Code2, Network, Database, LayoutDashboard, X, Minus, Maximize2, Globe, Cpu, Wifi, BatteryFull, Search, SlidersHorizontal } from 'lucide-react';

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
    <div className="w-12 flex-shrink-0 flex flex-col items-end pr-4 py-4 border-r border-[#333] text-[#858585] select-none bg-[#1e1e1e]">
      {Array.from({ length: 15 }).map((_, i) => <div key={i} className="leading-[1.6]">{i + 1}</div>)}
    </div>
    <div className="flex-grow p-4 overflow-y-auto">
      <div className="text-[#6a9955] italic mb-2">// Maintainability</div>
      <div className="mb-4">Every system we deliver includes <span className="text-[#ce9178]">'architectural documentation'</span><br />and onboarding materials for the teams who own it next.</div>
      <div className="text-[#6a9955] italic mb-2">// Performance</div>
      <div className="mb-4">Performance is <span className="text-[#569cd6]">measured</span>, not assumed.<br />We profile, optimize, and benchmark against strict SLAs.</div>
      <div className="text-[#6a9955] italic mb-2">// Integration</div>
      <div>Designed for the teams that <span className="text-[#c586c0]">inherit</span> the system.<br />Clean APIs, predictable behavior, and comprehensive test coverage.</div>
    </div>
  </div>
);

const terminalContent = (
  <div className="h-full bg-[#1c1c1e]/95 backdrop-blur-3xl text-[#33ff00] font-mono text-[13px] p-4 overflow-y-auto shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]">
    <div>$ innoshay deploy --production</div>
    <div className="text-[#cccccc] mt-1">[1/4] Resolving dependencies...</div>
    <div className="text-[#cccccc]">[2/4] Building optimized production build...</div>
    <div className="text-[#cccccc]">[3/4] Running integration tests...</div>
    <div className="text-[#33ff00] mt-1">✓ 142 tests passed (1.2s)</div>
    <div className="text-[#cccccc]">[4/4] Deploying to edge network...</div>
    <div className="text-[#33ff00] mt-2">🚀 Deployment successful!</div>
    <div className="text-[#cccccc] mt-1">URL: https://innoshay.solutions</div>
    <div className="mt-4 flex items-center"><span className="mr-2 text-white">$</span><span className="w-2 h-4 bg-white/70 animate-pulse"></span></div>
  </div>
);

const architectureContent = (
  <div className="h-full bg-[#fafafa] flex items-center justify-center p-8 relative overflow-hidden">
    <div className="absolute inset-0 dot-matrix-bg opacity-10"></div>
    <div className="relative z-10 flex flex-col items-center gap-8">
      <div className="px-6 py-3 bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 font-medium text-gray-800 flex items-center gap-2">
        <Globe className="w-4 h-4 text-blue-500" /> Client Application
      </div>
      <div className="w-[1px] h-8 bg-gray-300"></div>
      <div className="flex gap-8">
        <div className="px-6 py-3 bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 font-medium text-gray-800 flex items-center gap-2">
          <Network className="w-4 h-4 text-purple-500" /> API Gateway
        </div>
      </div>
      <div className="flex gap-16 relative">
        <div className="w-[1px] h-10 bg-gray-300 transform -rotate-[35deg] translate-x-6 origin-bottom"></div>
        <div className="w-[1px] h-10 bg-gray-300 transform rotate-[35deg] -translate-x-6 origin-bottom"></div>
      </div>
      <div className="flex gap-6">
        <div className="px-6 py-3 bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 font-medium text-gray-800 flex items-center gap-2">
          <Cpu className="w-4 h-4 text-emerald-500" /> Microservices
        </div>
        <div className="px-6 py-3 bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 font-medium text-gray-800 flex items-center gap-2">
          <Database className="w-4 h-4 text-orange-500" /> Primary DB
        </div>
      </div>
    </div>
  </div>
);

const databaseContent = (
  <div className="h-full bg-[#1e293b] text-slate-300 font-mono text-[12px] flex flex-col">
    <div className="flex border-b border-slate-700 bg-slate-800 py-2 px-4 gap-2 shadow-sm z-10">
      <div className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-md border border-blue-500/30 font-medium">users</div>
      <div className="px-3 py-1 hover:bg-slate-700 rounded-md cursor-pointer transition-colors">organizations</div>
      <div className="px-3 py-1 hover:bg-slate-700 rounded-md cursor-pointer transition-colors">deployments</div>
    </div>
    <div className="p-0 overflow-auto flex-grow bg-[#0f172a]">
      <table className="w-full text-left border-collapse">
        <thead className="bg-[#1e293b] sticky top-0 shadow-sm">
          <tr className="border-b border-slate-700/80 text-slate-400">
            <th className="px-4 py-3 font-medium">id</th>
            <th className="px-4 py-3 font-medium">name</th>
            <th className="px-4 py-3 font-medium">role</th>
            <th className="px-4 py-3 font-medium">status</th>
            <th className="px-4 py-3 font-medium text-right">last_active</th>
          </tr>
        </thead>
        <tbody className="text-[13px]">
          {[
            ['uuid-1', 'Alice Chen', 'admin', 'active', '2 mins ago'],
            ['uuid-2', 'Bob Smith', 'developer', 'active', '1 hr ago'],
            ['uuid-3', 'Charlie Davis', 'viewer', 'offline', '2 days ago'],
            ['uuid-4', 'Diana Prince', 'developer', 'active', 'Just now'],
            ['uuid-5', 'Evan Wright', 'editor', 'offline', '5 days ago'],
          ].map((row, i) => (
            <tr key={i} className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors">
              <td className="px-4 py-3 text-slate-500">{row[0]}</td>
              <td className="px-4 py-3 text-slate-200">{row[1]}</td>
              <td className="px-4 py-3"><span className="px-2 py-0.5 rounded-full bg-slate-700/50 text-slate-300 text-[11px] border border-slate-600/50">{row[2]}</span></td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-1.5">
                  <div className={`w-2 h-2 rounded-full ${row[3] === 'active' ? 'bg-emerald-500' : 'bg-slate-500'}`}></div>
                  <span className="capitalize">{row[3]}</span>
                </div>
              </td>
              <td className="px-4 py-3 text-right text-slate-500">{row[4]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const dashboardContent = (
  <div className="h-full bg-[#f8fafc] text-slate-800 p-6 overflow-y-auto">
    <h2 className="text-[20px] tracking-tight font-semibold mb-6 flex items-center gap-2">
      <LayoutDashboard className="w-5 h-5 text-indigo-500" /> System Overview
    </h2>
    <div className="grid grid-cols-3 gap-4 mb-6">
      <div className="p-5 rounded-2xl border border-slate-200/60 bg-white shadow-sm hover:shadow-md transition-shadow">
        <div className="text-[13px] font-medium text-slate-500 mb-2">Uptime</div>
        <div className="text-3xl font-semibold text-emerald-600 tracking-tight">99.99%</div>
      </div>
      <div className="p-5 rounded-2xl border border-slate-200/60 bg-white shadow-sm hover:shadow-md transition-shadow">
        <div className="text-[13px] font-medium text-slate-500 mb-2">Active Users</div>
        <div className="text-3xl font-semibold text-blue-600 tracking-tight">12,450</div>
      </div>
      <div className="p-5 rounded-2xl border border-slate-200/60 bg-white shadow-sm hover:shadow-md transition-shadow">
        <div className="text-[13px] font-medium text-slate-500 mb-2">Avg Latency</div>
        <div className="text-3xl font-semibold text-purple-600 tracking-tight">42<span className="text-xl text-purple-400">ms</span></div>
      </div>
    </div>
    <div className="h-40 rounded-2xl border border-slate-200/60 bg-white shadow-sm flex items-end p-5 gap-2 group cursor-crosshair relative overflow-hidden">
      <div className="absolute top-4 left-4 text-[13px] font-medium text-slate-400">Requests / min</div>
      {/* Fake chart bars */}
      {Array.from({ length: 24 }).map((_, i) => (
        <div key={i} className="flex-1 bg-indigo-50 hover:bg-indigo-100 transition-colors rounded-t-sm relative group-hover:opacity-70 hover:!opacity-100" style={{ height: `${Math.random() * 70 + 30}%` }}>
          <div className="absolute top-0 left-0 right-0 bg-indigo-500 rounded-t-sm opacity-80" style={{ height: '3px' }}></div>
        </div>
      ))}
    </div>
  </div>
);

const apps: AppWindow[] = [
  { id: 'code', title: 'VS Code - developer_experience.ts', icon: Code2, color: 'bg-[#007ACC]', content: codeContent },
  { id: 'terminal', title: 'Terminal - zsh', icon: Terminal, color: 'bg-black/90', content: terminalContent },
  { id: 'architecture', title: 'Architecture - System Design', icon: Network, color: 'bg-gradient-to-br from-purple-500 to-indigo-600', content: architectureContent },
  { id: 'database', title: 'DataGrip - Production DB', icon: Database, color: 'bg-gradient-to-br from-slate-700 to-slate-900', content: databaseContent },
  { id: 'dashboard', title: 'Dashboard - Metrics', icon: LayoutDashboard, color: 'bg-gradient-to-br from-emerald-400 to-teal-500', content: dashboardContent },
];

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
    <section className="w-full py-[120px] md:py-[200px] bg-bg-base relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">

        {/* Section Headings — OUTSIDE the macOS frame */}
        <div className="text-center mb-20 z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.03] mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(34,211,238,0.6)]" />
            <span className="text-[13px] font-medium text-white/50 tracking-widest uppercase">Developer Workflow</span>
          </div>
          <h2 className="text-[36px] md:text-[56px] font-medium tracking-tight text-text-primary whitespace-nowrap leading-none">
            The Developer Experience
          </h2>
        </div>

        {/* macOS Desktop Frame with neon glow */}
        <div className="relative w-full max-w-[1100px]">
          {/* Neon glow layers behind the frame */}
          <div className="absolute -inset-4 rounded-3xl opacity-60 blur-3xl pointer-events-none" style={{ background: "radial-gradient(ellipse at 30% 50%, rgba(236,72,153,0.25), transparent 60%), radial-gradient(ellipse at 70% 40%, rgba(59,130,246,0.25), transparent 60%), radial-gradient(ellipse at 50% 80%, rgba(168,85,247,0.2), transparent 50%)" }} />
          <div className="absolute -inset-1 rounded-[18px] opacity-40 pointer-events-none" style={{ background: "linear-gradient(135deg, rgba(236,72,153,0.15), rgba(59,130,246,0.15), rgba(168,85,247,0.15))", filter: "blur(8px)" }} />

          <div
            className="relative h-[700px] md:h-[750px] rounded-2xl overflow-hidden border border-white/15 flex flex-col z-10"
            style={{
              backgroundImage: "url('/macos-wallpaper.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              boxShadow: "0 40px 80px -10px rgba(0,0,0,0.7), 0 0 60px -15px rgba(168,85,247,0.15), 0 0 120px -30px rgba(59,130,246,0.1), 0 0 0 1px rgba(255,255,255,0.08)"
            }}
          >

            {/* macOS Top Menu Bar */}
            <div className="h-[28px] w-full backdrop-blur-2xl bg-black/25 border-b border-white/10 flex flex-shrink-0 items-center justify-between px-4 z-[100] text-[13px] font-[500] text-white/90 select-none">
              <div className="flex items-center gap-4">
                <svg viewBox="0 0 384 512" width="12" height="12" fill="currentColor" className="opacity-90">
                  <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
                </svg>
                <span className="font-semibold text-[13px] tracking-tight">Innoshay Solutions</span>
                <div className="hidden md:flex items-center gap-[16px] text-[13px] opacity-90">
                  {['File', 'Edit', 'Selection', 'View', 'Go', 'Run', 'Terminal', 'Window', 'Help'].map(item => (
                    <span key={item} className="cursor-default hover:text-white transition-colors">{item}</span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-3 text-[12px] opacity-85">
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <Search className="w-3.5 h-3.5" />
                <Wifi className="w-[14px] h-[14px]" />
                <div className="flex items-center gap-1">
                  <span className="text-[11px]">100%</span>
                  <BatteryFull className="w-[15px] h-[15px]" />
                </div>
                <span>Tue Mar 3 7:16 AM</span>
              </div>
            </div>

            {/* Desktop Area (windows render here) */}
            <div className="relative flex-grow">
              <AnimatePresence>
                {openApps.map((appId) => {
                  const app = apps.find(a => a.id === appId)!;
                  const isActive = activeApp === appId;

                  return (
                    <motion.div
                      key={appId}
                      initial={{ opacity: 0, scale: 0.9, y: 40 }}
                      animate={{
                        opacity: isActive ? 1 : 0.5,
                        scale: isActive ? 1 : 0.96,
                        y: isActive ? 0 : 15,
                        zIndex: isActive ? 50 : 10,
                        filter: isActive ? 'blur(0px)' : 'blur(1.5px) brightness(75%)'
                      }}
                      exit={{ opacity: 0, scale: 0.95, y: 20 }}
                      transition={{ type: "spring", stiffness: 350, damping: 30, mass: 0.5 }}
                      className={`absolute top-[5%] left-1/2 -translate-x-1/2 w-[88%] lg:w-[78%] h-[82%] rounded-xl overflow-hidden flex flex-col bg-[#1e1e1e] ring-1 ring-black/30 ${isActive ? 'shadow-[0_25px_60px_rgba(0,0,0,0.5)]' : 'shadow-lg'}`}
                      onClick={() => setActiveApp(appId)}
                    >
                      {/* Window Header */}
                      <div className="h-11 flex-shrink-0 bg-[#2d2d2d] border-b border-[#1a1a1a] flex items-center px-4 gap-2 select-none">
                        <div className="flex gap-2 group mr-3">
                          <button onClick={(e) => handleClose(appId, e)} className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]/50 flex items-center justify-center">
                            <X className="w-[7px] h-[7px] text-black/70 opacity-0 group-hover:opacity-100 transition-opacity" strokeWidth={3} />
                          </button>
                          <button className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]/50 flex items-center justify-center">
                            <Minus className="w-[7px] h-[7px] text-black/70 opacity-0 group-hover:opacity-100 transition-opacity" strokeWidth={3} />
                          </button>
                          <button className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]/50 flex items-center justify-center">
                            <Maximize2 className="w-[7px] h-[7px] text-black/60 opacity-0 group-hover:opacity-100 transition-opacity" strokeWidth={3} />
                          </button>
                        </div>
                        <div className="flex-1 text-center text-[13px] text-[#a0a0a0] font-medium mr-[48px]">
                          {app.title}
                        </div>
                      </div>

                      {/* Window Content */}
                      <div className="flex-grow overflow-hidden relative">
                        {app.content}
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* macOS Dock */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-[100] px-3 py-2 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.4)] flex items-end gap-2">
              {apps.map((app) => {
                const isOpen = openApps.includes(app.id);

                return (
                  <div key={app.id} className="relative flex flex-col items-center group cursor-pointer" onClick={() => handleAppClick(app.id)}>
                    {/* Tooltip */}
                    <div className="absolute -top-10 px-3 py-1 bg-black/70 backdrop-blur-xl text-white text-[12px] font-medium rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                      {app.title.split(' - ')[0]}
                    </div>

                    {/* Icon */}
                    <div
                      className={`relative flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-200 ease-out origin-bottom ${app.color} shadow-lg ring-1 ring-white/20 group-hover:w-16 group-hover:h-16 group-hover:-translate-y-2`}
                    >
                      <app.icon className="w-6 h-6 text-white transition-all duration-200 group-hover:w-8 group-hover:h-8" />
                      {/* Glass reflection */}
                      <div className="absolute inset-x-0 top-0 h-1/2 rounded-t-xl bg-gradient-to-b from-white/35 to-transparent pointer-events-none" />
                    </div>

                    {/* Active indicator */}
                    <div className={`w-1 h-1 rounded-full bg-white/80 mt-1 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0'}`} />
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
