"use client";

import { Sparkles, LayoutDashboard, Terminal, ArrowRight, Circle } from "lucide-react";
import ContentCard from "@/components/ContentCard";
import { MotionDiv, fadeUp, stagger } from "@/components/motion";
import Link from "next/link";

const TOPICS = [
  {
    title: "AI Ethics",
    description: "Building responsible and fair intelligent systems in a changing world.",
    slug: "ai-ethics",
    icon: <Sparkles size={20} />,
  },
  {
    title: "Modern Web Design",
    description: "Extreme performance and high-impact micro-interactions for the modern user.",
    slug: "modern-web",
    icon: <LayoutDashboard size={20} />,
  },
  {
    title: "Hybrid AI",
    description: "The convergence of local compute and powerful cloud intelligence.",
    slug: "hybrid-ai",
    icon: <Terminal size={20} />,
  },
];

export default function Home() {
  return (
    <div className="space-y-32 pb-32 pt-16 relative">
      <MotionDiv 
        variants={fadeUp}
        initial="initial"
        animate="animate"
        className="relative z-10 flex flex-col items-center text-center"
      >
        <div className="flex items-center gap-4 mb-12">
          <div className="h-[1px] w-8 bg-accent/30 rounded-full" />
          <span className="text-[10px] font-bold text-accent uppercase tracking-[0.4em]">Panaversity System v4.0</span>
          <div className="h-[1px] w-8 bg-accent/30 rounded-full" />
        </div>

        <div className="space-y-10 max-w-4xl mx-auto flex flex-col items-center">
          <h1 className="text-6xl md:text-[84px] font-serif font-medium tracking-tight leading-[1.05] text-text-primary">
            Refined Learning 
            <br />
            <span className="text-accent italic">Humanist Future.</span>
          </h1>
          <p className="text-xl md:text-2xl text-text-muted font-medium max-w-2xl leading-[1.6]">
            Accelerating your technical mastery in AI Ethics and Modern Architecture through a world-class digital companion.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-6 mt-16">
          <Link
            href="/content/ai-ethics"
            className="btn-tactile btn-accent px-10 py-4 font-bold text-[12px] uppercase tracking-widest flex items-center gap-3 rounded-lg shadow-sm"
          >
            Access Core <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/coach"
            className="btn-tactile border border-fine bg-white text-text-primary px-10 py-4 font-bold text-[12px] uppercase tracking-widest rounded-lg hover:border-accent/40"
          >
            System Map
          </Link>
        </div>

        {/* Stats row - Refined Tactile Version */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-fine rounded-2xl bg-white mt-32 overflow-hidden shadow-card w-full max-w-4xl mx-auto">
          <div className="px-10 py-10 flex flex-col items-center gap-3 border-b md:border-b-0 md:border-r border-fine group hover:bg-bg-surface/50 transition-colors">
            <span className="text-4xl font-serif font-medium text-text-primary tracking-tight">32%</span>
            <span className="text-[10px] text-text-muted uppercase tracking-[0.3em] font-bold">Progress Accuracy</span>
          </div>
          <div className="px-10 py-10 flex flex-col items-center gap-3 border-b md:border-b-0 md:border-r border-fine group hover:bg-bg-surface/50 transition-colors">
            <span className="text-4xl font-serif font-medium text-text-primary tracking-tight">3/12</span>
            <span className="text-[10px] text-text-muted uppercase tracking-[0.3em] font-bold">Validated Nodes</span>
          </div>
          <div className="px-10 py-10 flex flex-col items-center gap-3 group hover:bg-bg-surface/50 transition-colors">
            <span className="text-4xl font-serif font-medium text-text-primary tracking-tight">8</span>
            <span className="text-[10px] text-text-muted uppercase tracking-[0.3em] font-bold">Active Sessions</span>
          </div>
        </div>
      </MotionDiv>

      <section className="relative z-10 pt-20">
        <div className="flex items-center gap-6 mb-16">
            <h2 className="text-[11px] font-bold text-text-muted uppercase tracking-[0.3em]">Module Archive</h2>
            <div className="h-[0.8px] flex-1 bg-border-fine" />
        </div>
        
        <MotionDiv 
          variants={stagger}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {TOPICS.map((topic, index) => (
            <MotionDiv
              key={topic.slug}
              variants={fadeUp}
              className="group"
            >
              <ContentCard 
                title={topic.title}
                description={topic.description}
                slug={topic.slug}
                icon={topic.icon}
              />
            </MotionDiv>
          ))}
        </MotionDiv>
      </section>
    </div>
  );
}

