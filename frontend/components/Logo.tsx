import * as React from "react";
import { Binary } from "lucide-react";

export function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-lg bg-bg-surface border border-fine flex items-center justify-center group-hover:bg-accent/10 transition-colors">
        <Binary className="w-4 h-4 text-accent" />
      </div>
      <div className="flex flex-col">
        <span className="text-[11px] font-bold text-text-primary tracking-[0.2em] leading-none uppercase">
          Panaversity
        </span>
        <span className="text-[9px] font-bold text-text-muted uppercase tracking-[0.4em] mt-1">
          Companion
        </span>
      </div>
    </div>
  );
}

