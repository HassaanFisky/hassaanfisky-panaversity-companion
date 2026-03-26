"use client";

import { motion } from "framer-motion";
import { Bot, RefreshCw, Send, Sparkles, User, X } from "lucide-react";
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
      const response = await fetch(`${process.env.NEXT_PUBLIC_COMPANION_BACKEND_URL}/chat/stream`, {
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
    <div className="flex flex-col h-full bg-[#111111]/90 backdrop-blur-xl border-l border-[#1F1F1F] relative z-[60] shadow-2xl">
      {/* Chat Header */}
      <div className="h-14 border-b border-[#1F1F1F] flex items-center justify-between px-6 bg-[#0A0A0A] shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#1A1A1A] border border-[#1F1F1F] flex items-center justify-center text-[#D4A574]">
            <Bot size={18} />
          </div>
          <div>
            <h3 className="font-semibold text-sm text-[#EDEDEC]">AI Companion</h3>
            <div className="flex items-center gap-1.5">
               <span className="w-1.5 h-1.5 rounded-full bg-[#3DD68C]" />
               <span className="text-[10px] font-medium uppercase tracking-widest text-[#8E8E8E]">Streaming</span>
            </div>
          </div>
        </div>
        {onClose && (
          <button onClick={onClose} className="p-2 hover:bg-[#1A1A1A] rounded-lg transition-colors group text-[#8E8E8E] hover:text-[#EDEDEC]">
            <X size={18} />
          </button>
        )}
      </div>

      {/* Messages Area */}
      <div 
        ref={scrollRef} 
        className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth"
      >
        {messages.map((msg, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex items-start gap-4 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
          >
            <div className={`w-8 h-8 shrink-0 rounded-lg flex items-center justify-center border  ${msg.role === "assistant" ? "bg-[#1A1A1A] text-[#D4A574] border-[#1F1F1F]" : "bg-[#2A2A2A] text-[#EDEDEC] border-transparent"}`}>
               {msg.role === "assistant" ? <Bot size={16} /> : <User size={16} />}
            </div>
            <div className={`flex flex-col gap-1 max-w-[80%] ${msg.role === "user" ? "items-end" : "items-start"}`}>
               <div className={`text-sm leading-6 ${msg.role === "user" ? "text-[#EDEDEC] bg-[#1A1A1A] border border-[#1F1F1F] px-4 py-3 rounded-xl rounded-tr-sm" : "text-[#EDEDEC] px-1 py-2 prose prose-invert max-w-none prose-p:leading-6 prose-a:text-[#D4A574]"}`}>
                  {msg.role === "user" ? msg.content : <ReactMarkdown>{msg.content}</ReactMarkdown>}
               </div>
            </div>
          </motion.div>
        ))}
        {loading && !messages[messages.length - 1].content && (
           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-lg bg-[#1A1A1A] border border-[#1F1F1F] flex items-center justify-center text-[#D4A574] opacity-50">
                 <Bot size={16} />
              </div>
              <div className="flex gap-1 p-2 items-center">
                 <span className="w-1 h-1 rounded-full bg-[#8E8E8E] animate-bounce" />
                 <span className="w-1 h-1 rounded-full bg-[#8E8E8E] animate-bounce delay-150" />
                 <span className="w-1 h-1 rounded-full bg-[#8E8E8E] animate-bounce delay-300" />
              </div>
           </motion.div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-[#1F1F1F] bg-[#0A0A0A] shrink-0">
        <div className="relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
            placeholder="Ask AI Companion..."
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
    </div>
  );
}
