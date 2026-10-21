"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: string;
  links?: { label: string; href: string }[];
}

const suggestionChips = [
  "🛠️ How do free tools work?",
  "🤖 What prompts are included?",
  "💳 Is payment one-time?",
  "🔄 What is the refund policy?",
];

// Built-in intelligent response engine
function getAssistantResponse(query: string): { text: string; links?: { label: string; href: string }[] } {
  const lower = query.toLowerCase();

  // 1. Free Web Tools
  if (
    lower.includes("tool") ||
    lower.includes("convert") ||
    lower.includes("ocr") ||
    lower.includes("audio") ||
    lower.includes("image") ||
    lower.includes("private") ||
    lower.includes("privacy")
  ) {
    return {
      text: "Our 4 browser utilities (PDF to Word, Image-to-Text OCR, Video-to-Audio Detacher, and Smart Image Studio) run 100% client-side in your browser using modern Web APIs. No files, documents, or media are ever uploaded to our servers, guaranteeing complete privacy and zero data leakage.",
      links: [
        { label: "Try Free Tools", href: "/#tools" },
        { label: "Pro Utility Suite", href: "/products/pro-utility-suite" },
      ],
    };
  }

  // 2. AI Prompts
  if (lower.includes("prompt") || lower.includes("claude") || lower.includes("gpt") || lower.includes("deepseek")) {
    return {
      text: "We offer 3 curated prompt engineering libraries containing over 470+ structured prompts: Full-Stack Dev & Architecture (200+ prompts), UI/UX & Design Systems (150+ prompts), and Technical SEO & Core Web Vitals (120+ prompts). Delivered instantly in Markdown (.MD), JSON, and printable PDF formats.",
      links: [
        { label: "Browse Prompts", href: "/#products" },
        { label: "Full-Stack Prompts ($19)", href: "/products/fullstack-system-architecture-prompts" },
      ],
    };
  }

  // 3. PDF Guides / Codekits
  if (
    lower.includes("pdf") ||
    lower.includes("guide") ||
    lower.includes("javascript") ||
    lower.includes("react") ||
    lower.includes("starter kit")
  ) {
    return {
      text: "Our technical masterclasses include: 1) Advanced JavaScript Patterns & Engine Toolkit (50+ patterns, Jest test suite, and 85-page PDF manual), 2) React Enterprise Starter Kit (2 full reference apps and 30-page architecture manual), and 3) Technical SEO Blueprint. All packages include unminified source code and a commercial developer license.",
      links: [
        { label: "React Enterprise Kit ($49)", href: "/products/react-enterprise-starter-kit" },
        { label: "JavaScript Toolkit ($29)", href: "/products/javascript-patterns-toolkit" },
      ],
    };
  }

  // 4. Pricing / Passes / Subscriptions
  if (
    lower.includes("price") ||
    lower.includes("cost") ||
    lower.includes("pay") ||
    lower.includes("subscription") ||
    lower.includes("one-time") ||
    lower.includes("pass") ||
    lower.includes("lifetime") ||
    lower.includes("bundle")
  ) {
    return {
      text: "All our plans and individual digital kits are strictly ONE-TIME payments with zero recurring subscription traps! You can choose the Starter Plan ($29/single asset), 30-Day Prepaid All-Access Pass ($29 with unlimited tools + 3 premium downloads), or the All-in-One Lifetime Bundle ($69 for permanent access to all current and future tools).",
      links: [
        { label: "View Pricing Plans", href: "/#products" },
        { label: "Terms of Service", href: "/terms" },
      ],
    };
  }

  // 5. Refund Policy
  if (lower.includes("refund") || lower.includes("guarantee") || lower.includes("return") || lower.includes("money back")) {
    return {
      text: "We offer a transparent 14-day buyer protection policy covering verifiable technical defects, non-delivery of download keys, corrupted archives, or accidental duplicate charges. If an issue cannot be resolved within 48 hours, reach out to our dedicated support team at support@devassets.online.",
      links: [
        { label: "Read Refund Policy", href: "/refund" },
        { label: "Email Support", href: "mailto:support@devassets.online" },
      ],
    };
  }

  // 6. License & Commercial use
  if (lower.includes("license") || lower.includes("commercial") || lower.includes("client")) {
    return {
      text: "Yes, every product comes with a Single-Developer Commercial License. You have complete rights to use, customize, and deploy the code, components, and prompt outputs across unlimited personal, freelance client, or commercial SaaS products.",
      links: [{ label: "License Terms", href: "/terms" }],
    };
  }

  // 7. General Greetings & Help
  if (lower.includes("hi") || lower.includes("hello") || lower.includes("hey") || lower.includes("help")) {
    return {
      text: "Hello! 👋 I can answer any questions about our 100% private browser tools, curated AI prompts, full-stack React/JS kits, or one-time pricing. What are you looking to build or convert today?",
      links: [
        { label: "Explore Store", href: "/#products" },
        { label: "Try Free Tools", href: "/#tools" },
      ],
    };
  }

  // Fallback default
  return {
    text: "DevAssets provides 100% private client-side browser utilities, 470+ battle-tested AI prompt workflows, and full-stack enterprise codekits. You can explore our catalog, choose a one-time pass, or reach our engineering support team directly at support@devassets.online.",
    links: [
      { label: "Explore Products", href: "/#products" },
      { label: "Contact Support", href: "mailto:support@devassets.online" },
    ],
  };
}

export default function AiChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "initial-greeting",
      sender: "bot",
      text: "Hi there! 👋 I am the DevAssets AI Assistant. How can I help you today? Ask me about our free web tools, AI prompt packs, technical PDF masterclasses, or pricing!",
      timestamp: "Just now",
      links: [
        { label: "Explore Store", href: "/#products" },
        { label: "Try Free Tools", href: "/#tools" },
      ],
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      inputRef.current?.focus();
      setHasUnread(false);
    }
  }, [isOpen, messages, isTyping]);

  const handleSendMessage = (textToSend?: string) => {
    const query = (textToSend || inputValue).trim();
    if (!query) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    // Simulate intelligent streaming response delay
    setTimeout(() => {
      const response = getAssistantResponse(query);
      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: response.text,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        links: response.links,
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 600);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <aside aria-label="DevAssets AI Assistant" className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
      {/* ─── Chat Window (When Open) ─── */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="DevAssets AI Assistant Chat"
          className="relative w-[calc(100vw-2rem)] sm:w-[400px] h-[520px] max-h-[85vh] rounded-3xl flex flex-col overflow-hidden backdrop-blur-2xl bg-slate-900/85 border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),0_25px_50px_rgba(0,0,0,0.8)] animate-slide-up mb-4 before:absolute before:inset-x-0 before:top-0 before:h-24 before:bg-gradient-to-b before:from-indigo-500/15 before:to-transparent before:pointer-events-none"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-slate-950/60 backdrop-blur-md relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-[0_0_15px_rgba(99,102,241,0.5)]">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693l-1.57-.393m15.6 0l1.24 3.72a2.25 2.25 0 01-2.134 2.98H4.724a2.25 2.25 0 01-2.134-2.98l1.24-3.72" />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm flex items-center gap-1.5">
                  <span>DevAssets AI Assistant</span>
                  <span className="text-[10px] bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-1.5 py-0.2 rounded font-mono">
                    v2.4
                  </span>
                </h3>
                <p className="text-emerald-400 text-xs flex items-center gap-1.5 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Instant answers &bull; 24/7 online</span>
                </p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Minimize Chat Window"
                className="p-1.5 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Message Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 scroll-smooth">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
              >
                <div
                  className={
                    msg.sender === "user"
                      ? "ml-auto bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl rounded-tr-sm px-4 py-2.5 text-sm max-w-[82%] shadow-md leading-relaxed"
                      : "mr-auto bg-white/[0.06] border border-white/10 text-slate-200 rounded-2xl rounded-tl-sm px-4 py-2.5 text-sm max-w-[88%] backdrop-blur-md shadow-sm leading-relaxed"
                  }
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>

                  {/* Attached quick links */}
                  {msg.links && msg.links.length > 0 && (
                    <div className="mt-2.5 pt-2 border-t border-white/10 flex flex-wrap gap-2">
                      {msg.links.map((link, idx) => (
                        <Link
                          key={idx}
                          href={link.href}
                          onClick={() => {
                            if (link.href.startsWith("/#")) setIsOpen(false);
                          }}
                          className="inline-flex items-center gap-1 text-[11px] font-semibold text-indigo-300 hover:text-white bg-indigo-950/70 border border-indigo-800/60 px-2.5 py-1 rounded-full transition-colors"
                        >
                          <span>{link.label}</span>
                          <span>→</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
                <span className="text-[10px] text-slate-500 px-2 mt-1 font-mono">
                  {msg.timestamp}
                </span>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="mr-auto flex items-center gap-1.5 bg-white/[0.06] border border-white/10 rounded-2xl rounded-tl-sm px-4 py-3 backdrop-blur-md text-slate-400">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-bounce [animation-delay:0.4s]" />
                <span className="text-xs text-slate-400 ml-1">AI Assistant is thinking...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick-Prompt Suggestion Chips */}
          <div className="px-3 py-2 border-t border-white/[0.06] bg-slate-950/40 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {suggestionChips.map((chip, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSendMessage(chip)}
                className="whitespace-nowrap px-3 py-1 rounded-full text-[11px] font-medium bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 border border-white/10 transition-colors shrink-0 cursor-pointer active:scale-95"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-3 border-t border-white/10 bg-slate-950/70 backdrop-blur-md flex items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything about tools, pricing, prompts..."
              aria-label="Ask DevAssets AI Assistant"
              className="bg-white/[0.05] border border-white/10 rounded-full px-4 py-2.5 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-indigo-400/60 focus:ring-1 focus:ring-indigo-400/30 flex-1"
            />
            <button
              type="button"
              onClick={() => handleSendMessage()}
              disabled={!inputValue.trim() || isTyping}
              aria-label="Send message"
              className="w-9 h-9 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white flex items-center justify-center hover:opacity-90 disabled:opacity-40 transition-all cursor-pointer shrink-0 shadow-md shadow-indigo-600/30 active:scale-95"
            >
              <svg className="w-4 h-4 transform rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 19V5m0 0l-7 7m7-7l7 7" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* ─── Floating Launcher Button (Bottom-Right) ─── */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close AI Assistant" : "Open DevAssets AI Assistant"}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 text-white shadow-[0_0_25px_rgba(99,102,241,0.5)] hover:shadow-[0_0_35px_rgba(99,102,241,0.7)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center cursor-pointer relative"
        >
          {isOpen ? (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          )}

          {/* Glowing Status Dot */}
          {!isOpen && (
            <span
              className="absolute top-0 right-0 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-[#070B14] animate-pulse"
              title="Online Assistant"
            />
          )}
        </button>
      </div>
    </aside>
  );
}
