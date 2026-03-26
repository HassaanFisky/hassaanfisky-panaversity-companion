"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { fadeUp } from "./motion";

interface ContentCardProps {
  title: string;
  description: string;
  slug: string;
  icon: React.ReactNode;
}

export default function ContentCard({ title, description, slug, icon }: ContentCardProps) {
  return (
    <Link href={`/content/${slug}`} className="block group h-full">
      <div className="h-full flex flex-col justify-between rounded-[var(--radius-md)] border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 shadow-[var(--shadow-card)] hover:border-[var(--border-muted)] hover:-translate-y-[1px] transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]">
        <div className="space-y-4">
          <div className="w-10 h-10 rounded-[var(--radius-sm)] flex items-center justify-center bg-[var(--accent-dim)] text-[var(--accent)] border border-[var(--border-muted)]/10">
            {icon}
          </div>
          <div className="space-y-1.5">
            <h3 className="text-[17px] font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors tracking-tight">
              {title}
            </h3>
            <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed line-clamp-2">
              {description}
            </p>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors">
          <span className="text-[10px] uppercase tracking-[0.1em] font-bold">Explore Module</span>
          <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </div>
      </div>
    </Link>
  );
}
