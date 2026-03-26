"use client";

import { Sparkles, LayoutDashboard, Terminal, ArrowRight } from "lucide-react";
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
    <div className="space-y-24 pb-24 relative overflow-hidden">
       {/* Radial Gradients */}
       <div 
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse 900px 600px at 50% -100px, rgba(212,165,116,0.06), transparent 70%),
              var(--bg-base)`
          }}
        />

        {/* Noise Texture */}
        <svg className="fixed inset-0 w-full h-full pointer-events-none z-0 opacity-[0.02]">
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/>
            <feColorMatrix type="saturate" values="0"/>
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)"/>
        </svg>

      {/* Hero Header */}
      <MotionDiv 
        variants={fadeUp}
        initial="initial"
        animate="animate"
        className="relative z-10 pt-16 flex flex-col items-center text-center space-y-10"
      >
        <div className="text-[11px] font-medium tracking-[0.08em] uppercase text-[var(--text-muted)]">
          Panaversity Hackathon IV
        </div>

        <div className="space-y-6 max-w-3xl mx-auto flex flex-col items-center justify-center">
          <h1 className="text-[52px] font-semibold tracking-[-0.03em] leading-[1.1] text-[var(--text-primary)]">
            Your Personalized
            <br />
            <span style={{ color: "var(--accent)" }}>AI Study Companion.</span>
          </h1>
          <p className="text-[17px] text-[var(--text-secondary)] font-medium max-w-xl leading-relaxed">
            Unlock your potential in AI Ethics, Modern Web, and Hybrid Systems with the power of Groq LPU and Llama 3.3.
          </p>
        </div>

        <div className="flex items-center gap-4 justify-center">
          <Link
            href="/learn"
            className="bg-[var(--accent)] text-[#0A0A0A] font-medium text-[13px] px-8 py-3 rounded-[var(--radius-sm)] hover:brightness-110 active:scale-[0.97] transition-all duration-150 flex items-center gap-2 shadow-sm"
          >
            Start Learning <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/curriculum"
            className="bg-transparent border border-[var(--border-muted)] text-[var(--text-primary)] text-[13px] font-medium px-8 py-3 rounded-[var(--radius-sm)] hover:border-[var(--border-active)] hover:bg-[var(--bg-elevated)] transition-all duration-150"
          >
            View Curriculum
          </Link>
        </div>

        {/* Stats row */}
        <div className="flex items-center border border-[var(--border-subtle)] rounded-[var(--radius-md)] bg-[var(--bg-surface)] mt-12 overflow-hidden shadow-[var(--shadow-card)]">
          <div className="px-10 py-6 flex flex-col items-center gap-1 border-r border-[var(--border-subtle)]">
            <span className="text-2xl font-bold text-[var(--text-primary)] tracking-tight">32%</span>
            <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-widest font-bold">Progress</span>
          </div>
          <div className="px-10 py-6 flex flex-col items-center gap-1 border-r border-[var(--border-subtle)]">
            <span className="text-2xl font-bold text-[var(--text-primary)] tracking-tight">3/12</span>
            <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-widest font-bold">Modules</span>
          </div>
          <div className="px-10 py-6 flex flex-col items-center gap-1">
            <span className="text-2xl font-bold text-[var(--text-primary)] tracking-tight">8</span>
            <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-widest font-bold">Sessions</span>
          </div>
        </div>
      </MotionDiv>

      <section className="relative z-10">
        <div className="flex items-center justify-between mb-8">
            <h2 className="text-[11px] font-bold text-[var(--text-muted)] uppercase tracking-[0.15em]">Course Modules</h2>
            <div className="h-px flex-1 bg-[var(--border-subtle)] ml-4" />
        </div>
        
        {/* Main Grid */}
        <MotionDiv 
          variants={stagger}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {TOPICS.map((topic, index) => (
            <MotionDiv
              key={topic.slug}
              variants={fadeUp}
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
