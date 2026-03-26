"use client";

import { LayoutDashboard, Sparkles, GraduationCap, Terminal, Trophy } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const SIDEBAR_ITEMS = [
  { label: "Dashboard", icon: <LayoutDashboard size={16} />, href: "/" },
  { label: "AI Ethics", icon: <Sparkles size={16} />, href: "/content/ai-ethics" },
  { label: "Modern Web", icon: <GraduationCap size={16} />, href: "/content/modern-web" },
  { label: "Hybrid AI", icon: <Terminal size={16} />, href: "/content/hybrid-ai" },
  { label: "AI Coach", icon: <Trophy size={16} />, href: "/coach" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-[240px] border-r border-[var(--border-subtle)] bg-[var(--bg-base)] flex flex-col shrink-0 z-50 overflow-y-auto h-full hidden lg:flex">
      {/* Sidebar Header Space (matches navbar height) */}
      <div className="h-[56px] flex items-center px-6 border-b border-[var(--border-subtle)]">
        <span className="text-[11px] font-medium text-[var(--text-muted)] uppercase tracking-[0.08em]">Modules</span>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 p-3 space-y-1 mt-4">
        {SIDEBAR_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.href} 
              href={item.href} 
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-[var(--radius-sm)] text-[13px] font-medium transition-all relative group",
                isActive 
                  ? "bg-[var(--bg-elevated)] text-[var(--text-primary)] shadow-sm" 
                  : "text-[var(--text-secondary)] hover:bg-[var(--bg-surface)] hover:text-[var(--text-primary)]"
              )}
            >
              <span className={cn(
                "transition-colors",
                isActive ? "text-[var(--accent)]" : "text-[var(--text-muted)] group-hover:text-[var(--text-secondary)]"
              )}>
                {item.icon}
              </span>
              <span className="flex-1">{item.label}</span>
              {isActive && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute right-3 w-1 h-1 bg-[var(--accent)] rounded-full"
                />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Sidebar Footer User Info */}
      <div className="p-4 border-t border-[var(--border-subtle)] bg-[rgba(255,255,255,0.01)]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-muted)] flex items-center justify-center text-[var(--accent)] text-[10px] font-bold">
            JP
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-[13px] font-medium text-[var(--text-primary)] truncate tracking-tight">John Pana</p>
            <p className="text-[11px] text-[var(--text-muted)] truncate">AI Student</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
