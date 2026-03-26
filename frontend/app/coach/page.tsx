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
      const response = await fetch(`${process.env.NEXT_PUBLIC_COMPANION_BACKEND_URL}/agent/coach`, {
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
        <div className="flex items-center gap-2 px-3 py-1.5 bg-[#111111] border border-[#1F1F1F] rounded-lg w-fit">
           <Trophy size={14} className="text-[#D4A574]" />
           <span className="text-xs uppercase tracking-widest text-[#D4A574] font-medium">Career Coaching</span>
        </div>
        
        <h1 className="text-2xl font-semibold tracking-tight text-[#EDEDEC]">
           Level Up Your AI Career
        </h1>
        <p className="text-sm text-[#8E8E8E] max-w-2xl leading-6">
           A dedicated specialist agent focused on your long-term growth as an AI engineer.
        </p>
      </section>

      {/* Main Coaching Interface */}
      <div className="flex-1 grid md:grid-cols-3 gap-8 overflow-hidden">
         {/* Left: Coaching Highlights */}
         <section className="md:col-span-1 space-y-6 flex flex-col pt-4">
            <div className="space-y-4">
               <h3 className="text-sm font-medium text-[#8E8E8E] uppercase tracking-widest">Key Disciplines</h3>
               <div className="grid gap-3">
                  <DisciplineCard icon={<Target size={16} />} title="Ethical Grounding" desc="Ensure your AI solutions are fair, unbiased, and transparent." />
                  <DisciplineCard icon={<LayoutDashboard size={16} />} title="Portfolio Strategy" desc="Learn how to showcase your Hybrid AI projects effectively." />
                  <DisciplineCard icon={<GraduationCap size={16} />} title="Continuous Mastery" desc="Optimizing your study flow for high-speed retention." />
               </div>
            </div>

            <div className="anthropic-card mt-auto space-y-3">
               <h4 className="text-sm font-medium flex items-center gap-2 text-[#EDEDEC]">
                  <Award className="text-[#D4A574]" size={16} /> Certified Coaching
               </h4>
               <p className="text-xs text-[#8E8E8E] leading-5">
                  Our AI Coaches are built on millions of tokens from world-class industry leadership and ethical research.
               </p>
            </div>
         </section>

         {/* Center/Right: Deep Chat Panel */}
         <section className="md:col-span-2 flex flex-col anthropic-card !p-0 overflow-hidden">
            <div className="h-14 flex items-center justify-between px-6 border-b border-[#1F1F1F] bg-[#0A0A0A] shrink-0">
               <div className="flex items-center gap-3">
                  <span className="font-semibold text-sm text-[#EDEDEC]">Active Session</span>
               </div>
               <div className="flex items-center gap-2 text-xs font-medium text-[#8E8E8E]">
                  2026-CC-842
               </div>
            </div>

            <div 
              ref={scrollRef} 
              className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#0A0A0A] scroll-smooth"
            >
               {messages.map((msg, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex items-start gap-4 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                  >
                     <div className={`w-8 h-8 rounded-lg flex items-center justify-center border shrink-0 ${msg.role === "assistant" ? "bg-[#1A1A1A] border-[#1F1F1F] text-[#D4A574]" : "bg-[#2A2A2A] border-transparent text-[#EDEDEC]"}`}>
                        {msg.role === "assistant" ? <Sparkles size={16} /> : <User size={16} />}
                     </div>
                     <div className={`flex flex-col gap-1 max-w-[80%] ${msg.role === "user" ? "items-end" : "items-start"}`}>
                        <div className={`text-sm leading-6 ${msg.role === "user" ? "bg-[#1A1A1A] text-[#EDEDEC] border border-[#1F1F1F] px-4 py-3 rounded-xl rounded-tr-sm" : "text-[#EDEDEC] px-indigo py-2 prose prose-invert max-w-none prose-p:leading-6 prose-a:text-[#D4A574]"}`}>
                           {msg.role === "user" ? msg.content : <ReactMarkdown>{msg.content}</ReactMarkdown>}
                        </div>
                     </div>
                  </motion.div>
               ))}
               {loading && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-4">
                     <div className="w-8 h-8 rounded-lg bg-[#1A1A1A] border border-[#1F1F1F] flex items-center justify-center opacity-50 text-[#D4A574]">
                        <RefreshCw size={16} className="animate-spin" />
                     </div>
                     <div className="flex gap-1 p-2 items-center">
                        <span className="w-1 h-1 rounded-full bg-[#8E8E8E] animate-bounce" />
                        <span className="w-1 h-1 rounded-full bg-[#8E8E8E] animate-bounce delay-150" />
                        <span className="w-1 h-1 rounded-full bg-[#8E8E8E] animate-bounce delay-300" />
                     </div>
                  </motion.div>
               )}
            </div>

            <div className="p-4 border-t border-[#1F1F1F] bg-[#0A0A0A] shrink-0">
               <div className="relative">
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                    placeholder="Ask about your AI career trajectory..."
                    className="w-full anthropic-input py-3 pl-4 pr-12 h-14 resize-none"
                  />
                  <button 
                    onClick={handleSend}
                    disabled={!input.trim() || loading}
                    className="absolute right-2 top-2 bottom-2 w-10 flex items-center justify-center text-[#8E8E8E] hover:text-[#D4A574] disabled:opacity-50 disabled:hover:text-[#8E8E8E] transition-colors"
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
    <div className="flex items-start gap-4 p-4 rounded-xl border border-[#1F1F1F] bg-[#111111] card-hover-border transition-colors group">
      <div className="w-8 h-8 rounded-lg bg-[#1A1A1A] border border-[#1F1F1F] flex items-center justify-center text-[#D4A574] shrink-0">
        {icon}
      </div>
      <div className="space-y-1 mt-1">
        <h4 className="font-medium text-sm text-[#EDEDEC] group-hover:text-[#D4A574] transition-colors">{title}</h4>
        <p className="text-xs text-[#8E8E8E] leading-5">{desc}</p>
      </div>
    </div>
  );
}
