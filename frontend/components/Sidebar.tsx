"use client";

import { LayoutDashboard, Sparkles, GraduationCap, Terminal, Trophy } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const SIDEBAR_ITEMS = [
  { label: "System Central", icon: <LayoutDashboard size={14} />, href: "/" },
  { label: "Ethics Engine", icon: <Sparkles size={14} />, href: "/content/ai-ethics" },
  { label: "Design Laboratory", icon: <GraduationCap size={14} />, href: "/content/modern-web" },
  { label: "Hybrid Architect", icon: <Terminal size={14} />, href: "/content/hybrid-ai" },
  { label: "Mastery Mentor", icon: <Trophy size={14} />, href: "/coach" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-[300px] border-r border-border-fine bg-white flex flex-col shrink-0 z-50 h-full hidden lg:flex transition-editorial">
      {/* Sidebar Header */}
      <div className="h-20 flex items-center px-10 border-b border-border-fine">
        <span className="text-[10px] font-bold text-text-muted uppercase tracking-[0.4em]">Curriculum Archive</span>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 p-6 space-y-2 mt-8">
        <div className="mb-8 px-4">
          <h2 className="text-[9px] font-bold text-accent uppercase tracking-[0.4em] mb-6">Core Protocols</h2>
        </div>
        {SIDEBAR_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.href} 
              href={item.href} 
              className={cn(
                "btn-tactile flex items-center gap-4 px-5 py-3.5 rounded-xl transition-all relative group",
                isActive 
                  ? "bg-bg-base text-accent" 
                  : "text-text-muted hover:text-text-primary hover:bg-bg-base/40"
              )}
            >
              <span className={cn(
                "transition-editorial",
                isActive ? "text-accent scale-110" : "text-text-muted group-hover:text-accent/60"
              )}>
                {item.icon}
              </span>
              <span className="flex-1 uppercase tracking-[0.2em] text-[10px] font-bold">{item.label}</span>
              {isActive && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute left-0 w-1.5 h-5 bg-accent rounded-r-full shadow-[2px_0_10px_rgba(146,64,14,0.2)]"
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* User Info / Identity Profile */}
      <div className="p-8 border-t border-border-fine bg-bg-base/30">
        <div className="flex items-center gap-5">
          <div className="w-11 h-11 rounded-xl bg-white border border-border-fine flex items-center justify-center text-accent text-[11px] font-bold shadow-sm transition-editorial hover:rotate-6">
            HA
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-[15px] font-serif font-bold text-text-primary truncate">Hassaan Aslam</p>
            <p className="text-[9px] font-bold text-text-muted uppercase tracking-[0.25em] mt-0.5">Systems Architect</p>
          </div>
        </div>
      </div>
    </aside>
  );
}


