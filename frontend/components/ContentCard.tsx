"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

interface ContentCardProps {
  title: string;
  description: string;
  slug: string;
  icon: React.ReactNode;
}

export default function ContentCard({ title, description, slug, icon }: ContentCardProps) {
  return (
    <Link href={`/content/${slug}`} className="block group h-full transition-transform active:scale-[0.98]">
      <div className="h-full flex flex-col justify-between rounded-2xl border-fine bg-white p-8 shadow-card hover:border-accent/30 hover:shadow-lg transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden relative">
        <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity">
          <ArrowUpRight className="w-5 h-5 text-accent" />
        </div>
        
        <div className="space-y-6">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-bg-surface text-accent border border-fine group-hover:bg-accent/10 transition-colors">
            {icon}
          </div>
          <div className="space-y-3">
            <h3 className="text-2xl font-serif font-medium text-text-primary group-hover:text-accent transition-colors tracking-tight">
              {title}
            </h3>
            <p className="text-[14px] text-text-muted leading-relaxed font-medium">
              {description}
            </p>
          </div>
        </div>

        <div className="mt-12 flex items-center gap-4 text-text-muted group-hover:text-accent transition-colors">
          <div className="h-[1px] w-6 bg-border-fine group-hover:bg-accent/40" />
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Node Details</span>
        </div>
      </div>
    </Link>
  );
}

