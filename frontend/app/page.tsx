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
        className="relative z-10 flex flex-col items-center text-center px-6"
      >
        <div className="flex items-center gap-6 mb-16">
          <div className="h-[1px] w-12 bg-accent/20 rounded-full" />
          <div className="flex items-center gap-3">
            <Sparkles size={14} className="text-accent" />
            <span className="text-[10px] font-bold text-accent uppercase tracking-[0.4em]">Phase 04 — Course Companion</span>
          </div>
          <div className="h-[1px] w-12 bg-accent/20 rounded-full" />
        </div>

        <div className="space-y-10 max-w-5xl mx-auto flex flex-col items-center">
          <h1 className="text-6xl md:text-[92px] font-serif font-medium tracking-tight leading-[1.02] text-text-primary">
            Digital Collective 
            <br />
            <span className="text-accent italic">FTE Ecosystem.</span>
          </h1>
          <p className="prose-editorial text-xl md:text-2xl text-text-muted max-w-3xl leading-relaxed">
            Architecting the future of human-machine intelligence through a 
            <span className="text-text-primary font-bold"> high-fidelity educational companion</span> — 
            engineered for extreme reasoning and zero-friction mastery.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-16 w-full">
          <Link
            href="/content/ai-ethics"
            className="btn-tactile px-12 py-5 bg-accent text-white rounded-xl font-bold text-[13px] uppercase tracking-widest flex items-center gap-3 shadow-float shadow-accent/20 group w-full sm:w-auto"
          >
            <span>Initialize Core</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          
          <div className="flex items-center gap-8 px-8 py-4 bg-white/50 backdrop-blur-sm border border-border-fine rounded-xl w-full sm:w-auto overflow-hidden">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-accent-soft flex items-center justify-center text-accent border border-fine">
                <LayoutDashboard size={18} />
              </div>
              <div className="text-left">
                <div className="text-xl font-serif text-text-primary font-bold leading-none">32%</div>
                <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-text-muted mt-1">Accuracy</div>
              </div>
            </div>
            <div className="h-10 w-[1px] bg-border-fine" />
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center text-success border border-fine">
                <Circle size={18} fill="currentColor" opacity={0.2} />
              </div>
              <div className="text-left">
                <div className="text-xl font-serif text-text-primary font-bold leading-none">8</div>
                <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-text-muted mt-1">Agents</div>
              </div>
            </div>
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

