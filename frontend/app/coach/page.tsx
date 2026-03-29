"use client";

import { motion } from "framer-motion";
import { Award, GraduationCap, LayoutDashboard, RefreshCw, Send, Sparkles, Target, Trophy, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";

interface CoachingAdvice {
  content: string;
}

export default function CoachPage() {
  const [messages, setMessages] = useState<Array<{ role: "user" | "assistant", content: string }>>([
    { role: "assistant", content: "Hello! I'm your Panaversity AI Coach. I'm here to help you navigate your career in AI, optimize your learning strategy, and stay grounded in ethical practices. What would you like to discuss?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input;
    const newMessages = [...messages, { role: "user" as const, content: userMessage }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch('/api/agent/coach', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await response.json();
      setMessages([...newMessages, { role: "assistant" as const, content: data.advice }]);
    } catch (error) {
      console.error("Coaching failed:", error);
      setMessages([...newMessages, { role: "assistant" as const, content: "I'm sorry, I'm having trouble providing coaching advice right now. Please try again soon." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col gap-8 pb-8">
      {/* Page Header */}
      <section className="space-y-4 pt-6">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-bg-surface border border-border-fine rounded-lg w-fit">
           <Trophy size={14} className="text-accent" />
           <span className="text-xs uppercase tracking-widest text-accent font-bold">Career Coaching</span>
        </div>
        
        <h1 className="text-3xl font-serif font-medium tracking-tight text-text-primary">
           Level Up Your AI Career
        </h1>
        <p className="text-sm text-text-muted max-w-2xl leading-6 font-medium">
           A dedicated specialist agent focused on your long-term growth as an AI engineer.
        </p>
      </section>

      {/* Main Coaching Interface */}
      <div className="flex-1 grid md:grid-cols-3 gap-8 overflow-hidden">
         {/* Left: Coaching Highlights */}
         <section className="md:col-span-1 space-y-6 flex flex-col pt-4">
            <div className="space-y-4">
               <h3 className="text-[10px] font-bold text-text-muted uppercase tracking-[0.3em]">Key Disciplines</h3>
               <div className="grid gap-3">
                  <DisciplineCard icon={<Target size={16} />} title="Ethical Grounding" desc="Ensure your AI solutions are fair, unbiased, and transparent." />
                  <DisciplineCard icon={<LayoutDashboard size={16} />} title="Portfolio Strategy" desc="Learn how to showcase your Hybrid AI projects effectively." />
                  <DisciplineCard icon={<GraduationCap size={16} />} title="Continuous Mastery" desc="Optimizing your study flow for high-speed retention." />
               </div>
            </div>

            <div className="card-humanist p-6 mt-auto space-y-3">
               <h4 className="text-sm font-medium flex items-center gap-2 text-text-primary">
                  <Award className="text-accent" size={16} /> Certified Coaching
               </h4>
               <p className="text-xs text-text-muted leading-5 font-medium">
                  Our AI Coaches are built on millions of tokens from world-class industry leadership and ethical research.
               </p>
            </div>
         </section>

         {/* Center/Right: Deep Chat Panel */}
         <section className="md:col-span-2 flex flex-col card-humanist overflow-hidden">
            <div className="h-16 flex items-center justify-between px-6 border-b border-border-fine bg-bg-base shrink-0">
               <div className="flex items-center gap-3">
                  <span className="font-serif font-medium text-sm text-text-primary">Active Session</span>
               </div>
               <div className="flex items-center gap-2 text-[10px] font-bold text-text-muted uppercase tracking-[0.2em]">
                  2026-CC-842
               </div>
            </div>

            <div 
              ref={scrollRef} 
              className="flex-1 overflow-y-auto p-6 space-y-6 bg-white scroll-smooth"
            >
               {messages.map((msg, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex items-start gap-4 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                  >
                     <div className={`w-9 h-9 rounded-lg flex items-center justify-center border shrink-0 ${msg.role === "assistant" ? "bg-bg-surface border-border-fine text-accent" : "bg-bg-base border-border-fine text-text-primary"}`}>
                        {msg.role === "assistant" ? <Sparkles size={16} /> : <User size={16} />}
                     </div>
                     <div className={`flex flex-col gap-1 max-w-[80%] ${msg.role === "user" ? "items-end" : "items-start"}`}>
                        <div className={`text-[15px] leading-relaxed font-medium ${msg.role === "user" ? "bg-bg-base text-text-primary border border-border-fine px-5 py-3.5 rounded-2xl rounded-tr-sm" : "text-text-secondary px-2 py-2 prose prose-stone max-w-none prose-p:leading-relaxed prose-a:text-accent font-serif"}`}>
                           {msg.role === "user" ? msg.content : <ReactMarkdown>{msg.content}</ReactMarkdown>}
                        </div>
                     </div>
                  </motion.div>
               ))}
               {loading && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-4">
                     <div className="w-9 h-9 rounded-lg bg-bg-surface border border-border-fine flex items-center justify-center opacity-50 text-accent">
                        <RefreshCw size={16} className="animate-spin" />
                     </div>
                     <div className="flex gap-1 p-2 items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-border-fine animate-bounce" />
                        <span className="w-1.5 h-1.5 rounded-full bg-border-fine animate-bounce delay-150" />
                        <span className="w-1.5 h-1.5 rounded-full bg-border-fine animate-bounce delay-300" />
                     </div>
                  </motion.div>
               )}
            </div>

            <div className="p-5 border-t border-border-fine bg-bg-base shrink-0">
               <div className="relative group">
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                    placeholder="Ask about your AI career trajectory..."
                    className="w-full bg-white border border-border-fine rounded-xl py-4 pl-5 pr-14 h-14 resize-none focus:outline-none focus:border-accent/40 focus:ring-4 focus:ring-accent/[0.03] transition-all text-text-primary font-medium placeholder:text-text-muted/60 shadow-sm"
                  />
                  <button 
                    onClick={handleSend}
                    disabled={!input.trim() || loading}
                    className="absolute right-3 top-2.5 bottom-2.5 w-10 flex items-center justify-center rounded-lg bg-bg-surface text-text-muted hover:text-accent hover:bg-white hover:border border-transparent hover:border-fine disabled:opacity-30 disabled:pointer-events-none transition-all duration-300"
                  >
                    {loading ? <RefreshCw size={18} className="animate-spin" /> : <Send size={18} />}
                  </button>
               </div>
            </div>
         </section>
      </div>
    </div>
  );
}

function DisciplineCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="flex items-start gap-4 p-5 rounded-xl border border-border-fine bg-white shadow-sm hover:shadow-[0_4px_24px_-8px_rgba(56,49,46,0.12)] transition-all duration-500 group cursor-pointer hover:border-accent/30">
      <div className="w-9 h-9 rounded-lg bg-bg-surface border border-border-fine flex items-center justify-center text-accent shrink-0 transition-transform duration-500 group-hover:scale-110">
        {icon}
      </div>
      <div className="space-y-1 mt-0.5">
        <h4 className="font-serif font-medium text-sm text-text-primary group-hover:text-accent transition-colors">{title}</h4>
        <p className="text-xs text-text-muted leading-relaxed font-medium">{desc}</p>
      </div>
    </div>
  );
}

