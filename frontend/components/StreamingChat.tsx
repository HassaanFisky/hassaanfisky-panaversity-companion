"use client";

import { motion } from "framer-motion";
import { Bot, RefreshCw, Send, Sparkles, User, X, Binary } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface StreamingChatProps {
  context?: string;
  onClose?: () => void;
}

export default function StreamingChat({ context, onClose }: StreamingChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hello! I'm your AI Companion. I can help you summarize this module, explain complex concepts, or discuss the ethical implications of AI. What's on your mind?" }
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
    const newMessages: Message[] = [...messages, { role: "user", content: userMessage }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch('/api/chat/stream', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          message: userMessage, 
          context: context || "",
          history: messages.slice(-5)
        }),
      });

      if (!response.ok) throw new Error("Failed to connect to AI server");

      const reader = response.body?.getReader();
      if (!reader) throw new Error("No reader available");

      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);
      
      let assistantContent = "";
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n\n");
        
        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = JSON.parse(line.slice(6));
            if (data.content) {
              assistantContent += data.content;
              setMessages((prev) => {
                const next = [...prev];
                next[next.length - 1].content = assistantContent;
                return next;
              });
            }
          }
        }
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [...prev, { role: "assistant", content: "I'm sorry, I'm having trouble connecting right now. Please check your connection and try again." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white border-l border-fine relative z-[60] shadow-2xl">
      {/* Chat Header */}
      <div className="h-16 border-b border-fine flex items-center justify-between px-8 bg-bg-base shrink-0">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-white border border-fine flex items-center justify-center text-accent shadow-sm">
            <Binary size={18} />
          </div>
          <div>
            <h3 className="font-serif font-medium text-text-primary text-sm leading-none">AI Companion</h3>
            <div className="flex items-center gap-1.5 mt-1.5">
               <span className="w-1.5 h-1.5 rounded-full bg-success/60 animate-pulse" />
               <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-text-muted">Node Active</span>
            </div>
          </div>
        </div>
        {onClose && (
          <button onClick={onClose} className="btn-tactile p-2 hover:bg-bg-surface rounded-lg transition-colors group text-text-muted hover:text-text-primary">
            <X size={18} />
          </button>
        )}
      </div>

      {/* Messages Area */}
      <div 
        ref={scrollRef} 
        className="flex-1 overflow-y-auto p-8 space-y-10 scroll-smooth selection:bg-accent/10"
      >
        {messages.map((msg, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex items-start gap-5 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
          >
            <div className={`w-9 h-9 shrink-0 rounded-lg flex items-center justify-center border shadow-sm ${msg.role === "assistant" ? "bg-white text-accent border-fine" : "bg-bg-surface text-text-primary border-transparent"}`}>
               {msg.role === "assistant" ? <Bot size={16} /> : <User size={16} />}
            </div>
            <div className={`flex flex-col gap-1.5 max-w-[85%] ${msg.role === "user" ? "items-end" : "items-start"}`}>
               <div className={`
                 text-[15px] leading-relaxed
                 ${msg.role === "user" 
                   ? "text-text-primary bg-bg-surface/50 border border-fine px-5 py-3.5 rounded-2xl rounded-tr-sm font-medium" 
                   : "text-text-secondary font-serif px-1 py-1 prose prose-stone max-w-none prose-p:leading-relaxed prose-a:text-accent font-medium"}
               `}>
                  {msg.role === "user" ? msg.content : <ReactMarkdown>{msg.content}</ReactMarkdown>}
               </div>
            </div>
          </motion.div>
        ))}
        {loading && !messages[messages.length - 1].content && (
           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-5">
              <div className="w-9 h-9 rounded-lg bg-white border border-fine flex items-center justify-center text-accent opacity-40 shadow-sm">
                 <Bot size={16} />
              </div>
              <div className="flex gap-1.5 p-3 items-center bg-bg-surface/30 rounded-xl px-4 border border-fine/30">
                 <span className="w-1 h-1 rounded-full bg-accent/40 animate-bounce" />
                 <span className="w-1 h-1 rounded-full bg-accent/40 animate-bounce delay-150" />
                 <span className="w-1 h-1 rounded-full bg-accent/40 animate-bounce delay-300" />
              </div>
           </motion.div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-6 border-t border-fine bg-bg-base shrink-0">
        <div className="relative group">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
            placeholder="Ask AI Companion..."
            className="w-full bg-white border border-fine rounded-xl py-4 pl-5 pr-14 h-16 resize-none focus:outline-none focus:border-accent/40 focus:ring-4 focus:ring-accent/[0.03] transition-all text-text-primary font-medium placeholder:text-text-muted/60 shadow-sm"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || loading}
            className="absolute right-3 top-3 bottom-3 w-10 flex items-center justify-center rounded-lg bg-bg-surface text-text-muted hover:text-accent hover:bg-white hover:border border-transparent hover:border-fine disabled:opacity-30 disabled:pointer-events-none transition-all duration-300"
          >
            {loading ? <RefreshCw size={18} className="animate-spin" /> : <Send size={18} />}
          </button>
        </div>
        <p className="text-[9px] font-bold text-text-muted uppercase tracking-[0.3em] mt-4 text-center">
          Panaversity AI Engine Node
        </p>
      </div>
    </div>
  );
}

