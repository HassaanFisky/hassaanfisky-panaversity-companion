"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ChevronRight, Search, Bell } from "lucide-react";

const NAV_LINKS = [
  { href: "https://panaversity-h1-robotics.vercel.app", label: "Textbook (H1)" },
  { href: "https://hackathon-2-todo-iota.vercel.app", label: "Todo Engine (H2)" },
  { href: "https://hassaanfisky-panaversity-learnflow.vercel.app", label: "LearnFlow (H3)" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="glass-nav flex items-center shadow-sm">
      <div className="max-w-7xl mx-auto px-10 w-full flex items-center justify-between">
        <div className="flex items-center gap-12">
          {/* Breadcrumb style navigation for a premium feel */}
          <div className="flex items-center gap-4 text-[11px] font-bold text-text-muted uppercase tracking-[0.4em]">
            <Link href="/" className="hover:text-accent transition-colors">System</Link>
            <ChevronRight size={12} className="opacity-30" />
            <span className="text-text-primary tracking-[0.2em]">{pathname === "/" ? "Dashboard" : "Interface"}</span>
          </div>

          <div className="h-6 w-[1px] bg-border-fine mx-2 hidden md:block" />

          <div className="hidden lg:flex items-center gap-10">
            {NAV_LINKS.map((link) => (
              <Link 
                key={link.href}
                href={link.href} 
                className={cn(
                  "text-[10px] font-bold uppercase tracking-[0.3em] transition-all duration-300 relative group py-2",
                  pathname === link.href 
                    ? "text-accent" 
                    : "text-text-muted hover:text-text-primary"
                )}
              >
                {link.label}
                <span className={cn(
                  "absolute bottom-0 left-0 w-full h-[1.5px] bg-accent transition-transform duration-500 scale-x-0 group-hover:scale-x-100 origin-left",
                  pathname === link.href && "scale-x-100"
                )} />
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-8">
          <div className="hidden sm:flex items-center gap-6">
            <button className="text-text-muted hover:text-accent transition-editorial">
              <Search size={18} strokeWidth={2.5} />
            </button>
            <button className="text-text-muted hover:text-accent transition-editorial relative">
              <Bell size={18} strokeWidth={2.5} />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full border-2 border-white" />
            </button>
          </div>
          <button className="btn-tactile px-6 py-2.5 bg-text-primary text-white text-[10px] font-bold uppercase tracking-[0.3em] rounded-xl shadow-lg shadow-text-primary/10">
            Initialize Core
          </button>
        </div>
      </div>
    </nav>
  );
}


