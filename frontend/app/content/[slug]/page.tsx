"use client";

import { motion } from "framer-motion";
import { ArrowLeft, MessageSquare, Sparkles } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import StreamingChat from "@/components/StreamingChat";

export default function ContentPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [showAiChat, setShowAiChat] = useState(false);

  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true);
      try {
        const contents: Record<string, string> = {
          "ai-ethics": `
# AI Ethics: Building Responsible Intelligent Systems

> "With great power comes great responsibility." — Uncle Ben (and every AI ethics board).

In the rapidly evolving landscape of artificial intelligence, ethics is no longer a "nice to have"—it is a foundational requirement. This module explores the critical dimensions of AI ethics that every modern developer must master.

## 1. Bias and Fairness
AI systems are trained on data, and data is a reflection of our world—including its biases. Unchecked bias leads to discriminatory outcomes in lending, hiring, and criminal justice.

### Key Terms
- **Algorithmic Bias**: Systematic errors in an AI system that create unfair outcomes.
- **Data Provenance**: Understanding the origin and history of training data.

## 2. Transparency and Explainability (XAI)
The "Black Box" problem remains one of AI's greatest challenges. If a system makes a life-altering decision, we must be able to explain *why*.

### Case Study: High-Stakes Medicine
In healthcare, an AI that predicts cancer must provide "heatmaps" or feature importance scores so doctors can verify the clinical reasoning.

## 3. Privacy and Data Sovereignty
As AI consumes more personal data, privacy frameworks like GDPR and CCPA are crucial.

### Techniques for Privacy-Preserving AI
1. **Differential Privacy**: Adding "noise" to data so individual records cannot be identified.
2. **Federated Learning**: Training models on edge devices without ever moving raw data to the cloud.

## 4. The Human-in-the-Loop (HITL)
AI should augment human intelligence, not replace it blindly. The HITL pattern ensures critical decisions always have a human safety check.
          `,
          "modern-web": `
# Modern Web Design: Beyond Aesthetics

> "Design is not just what it looks like and feels like. Design is how it works." — Steve Jobs.

In 2026, web design is about performance, accessibility, and high-impact micro-interactions. This module covers the core elements of modern web applications.

## 1. Glassmorphism & High-End Aesthetics
The visual identity of premium web products uses "frosted glass," subtle blurs, and high-contrast typography. 

### Implementation Tip
Using \`backdrop-blur\` with semi-transparent backgrounds:
\`\`\`css
.glass {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}
\`\`\`

## 2. Micro-Animations with Framer Motion
Animations should not be intrusive; they should serve a purpose. Whether it's a "pulse" to indicate loading or a "bounce" on a button click, these micro-interactions create a premium feel.

### The Power of \`layout\` prop
Framer Motion's \`layout\` prop automatically animates elements as they move, resizing them smoothly without complex CSS calculations.
          `,
          "hybrid-ai": `
# Hybrid AI: The Convergence of Local and Cloud Intelligence

> "The true value of AI isn't what it knows; it's how it helps you know." — DeepMind Principle.

Hybrid AI is the future. It's the seamless integration of localized user data with powerful cloud-based LLMs. This module explores the architecture and applications of hybrid AI systems.

## 1. Local-First AI with Edge Devices
Local AI handles sensitive data, personal context, and real-time interactions without latency.

### Benefits of Local AI
- **Privacy**: No user data leaves the device.
- **Latency**: Sub-millisecond response times.
- **Availability**: Works without an internet connection.

## 2. Cloud-LLM Integration (The "Brain" in the Sky)
Cloud LLMs provide the heavy-duty reasoning, multi-language support, and vast knowledge retrieval beyond local capacity.
          `
        };
        
        setContent(contents[slug] || "# Topic Not Found");
      } catch (error) {
        console.error("Failed to fetch content:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [slug]);

  if (loading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 rounded-lg bg-[#1A1A1A] border border-[#1F1F1F] flex items-center justify-center animate-spin text-[#D4A574]" />
          <p className="font-medium text-[#8E8E8E] text-xs uppercase tracking-widest">Loading Module...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full flex relative pb-20">
      {/* Content Area */}
      <div className={`flex-1 transition-all duration-300 ${showAiChat ? 'mr-[400px]' : ''}`}>
        <header className="flex items-center justify-between mb-8 pb-4 border-b border-[#1F1F1F]">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => router.back()} 
              className="p-2 hover:bg-[#111111] rounded-lg border border-transparent hover:border-[#1F1F1F] transition-all text-[#8E8E8E] hover:text-[#EDEDEC]"
            >
              <ArrowLeft size={18} />
            </button>
            <div className="flex items-center gap-3">
              <span className="text-[#8E8E8E] font-medium text-xs uppercase tracking-widest">Panaversity / Modules /</span>
              <span className="font-semibold text-sm tracking-tight text-[#EDEDEC] capitalize">{slug.replace("-", " ")}</span>
            </div>
          </div>
          
          <button 
            onClick={() => setShowAiChat(!showAiChat)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              showAiChat 
                ? 'bg-[#1A1A1A] border-[#1F1F1F] text-[#D4A574] border' 
                : 'btn-secondary border-[#1F1F1F] text-[#8E8E8E] hover:text-[#EDEDEC]'
            }`}
          >
            <MessageSquare size={16} />
            {showAiChat ? 'Close Companion' : 'AI Companion'}
            {!showAiChat && <Sparkles size={14} className="text-[#D4A574]" />}
          </button>
        </header>

        <motion.article 
          initial={{ opacity: 0, scale: 0.99, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="max-w-3xl mx-auto"
        >
          <div className="anthropic-card bg-[#0A0A0A] p-8 md:p-12 relative overflow-hidden">
            <ReactMarkdown className="prose prose-invert max-w-none prose-p:text-[#EDEDEC] prose-p:leading-8 prose-headings:text-[#EDEDEC] prose-headings:font-semibold prose-headings:tracking-tight prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-a:text-[#D4A574] prose-blockquote:border-[#D4A574] prose-blockquote:bg-[#111111] prose-blockquote:p-4 prose-blockquote:not-italic prose-blockquote:rounded-r-lg">
              {content}
            </ReactMarkdown>

            {/* End of Section Divider */}
            <div className="pt-16 pb-8 flex flex-col items-center gap-6">
              <div className="w-16 h-px bg-[#1F1F1F]" />
              <div className="text-center space-y-6">
                 <h3 className="text-xl font-semibold tracking-tight text-[#EDEDEC]">Mastered this Topic?</h3>
                 <div className="flex items-center justify-center gap-4">
                    <Link href="/" className="btn-primary px-6 py-2">
                      Complete Module
                    </Link>
                    <button 
                      onClick={() => setShowAiChat(true)}
                      className="btn-secondary px-6 py-2"
                    >
                      Ask Question
                    </button>
                 </div>
              </div>
            </div>
          </div>
        </motion.article>
      </div>

      {/* Persistent AI Chat Panel */}
      <aside 
        className={`fixed top-14 right-0 bottom-0 w-[400px] border-l border-[#1F1F1F] bg-[#0A0A0A] transform transition-transform duration-300 z-[40] ${showAiChat ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <StreamingChat 
          context={content} 
          onClose={() => setShowAiChat(false)}
        />
      </aside>
    </div>
  );
}
