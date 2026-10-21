"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FadeInView,
  StaggerContainer,
  StaggerItem,
  MagneticButton,
} from "@/components/motion/MotionContainers";

export default function FAQ() {
  const [openIds, setOpenIds] = useState<number[]>([1]); // First FAQ open by default for immediate preview

  const toggleFaq = (id: number) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const faqs = [
    {
      id: 1,
      question: "Are the web utilities really free and private?",
      answer:
        "Yes, 100%. Our web tools execute entirely on your device using client-side Web APIs (such as Web Audio API, Canvas 2D, and WebAssembly). Your files, images, videos, and PDFs are processed strictly within your browser's local memory and are never uploaded or transmitted to our servers.",
    },
    {
      id: 2,
      question: "In what formats are the AI Prompts and PDF Guides delivered?",
      answer:
        "Immediately upon successful checkout, you will receive instant on-screen access and a download link. AI Prompt packages are delivered in structured JSON, clean Markdown (.MD), and printable PDF formats. Codekits and starter kits are provided in clean, unminified .ZIP archives along with comprehensive PDF manuals.",
    },
    {
      id: 3,
      question: "How does the 30-Day All-Access Pass work?",
      answer:
        "The 30-Day All-Access Pass is a strictly prepaid, one-time purchase. It grants you 30 days of unlimited client-side processing across all tools plus tokens to download any 3 premium digital packages. It does NOT automatically renew or charge your payment method again—there are zero hidden subscription traps.",
    },
    {
      id: 4,
      question: "Can I use the included code and prompts in commercial client projects?",
      answer:
        "Absolutely. All of our standalone products and bundles come with a commercial developer license. You have full rights to adapt, integrate, and deploy the code, components, and prompt outputs across unlimited personal, client, or enterprise SaaS products.",
    },
    {
      id: 5,
      question: "What is your refund policy?",
      answer:
        "We offer a 14-day refund policy for verifiable technical defects, non-delivery of download links, corrupted archive files, or accidental duplicate charges that our support team cannot resolve within 48 hours. Please review our full Refund Policy page for complete terms.",
    },
  ];

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="py-24 bg-slate-950 transition-colors duration-300 scroll-mt-20 border-t border-slate-900"
    >
      <div className="container mx-auto max-w-4xl px-6">
        {/* Section Header */}
        <FadeInView y={20} className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-950/80 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-indigo-400 border border-indigo-900/60 shadow-inner">
            💡 Got Questions? We Have Answers
          </span>
          <h2
            id="faq-heading"
            className="text-3xl sm:text-4xl font-extrabold text-slate-50 tracking-tight"
          >
            Frequently Asked Questions
          </h2>
          <p className="text-base text-slate-400 leading-relaxed">
            Everything you need to know about our free client-side tools, prompt systems, digital kits, and buyer protection.
          </p>
        </FadeInView>

        {/* Accordion with Framer Motion AnimatePresence */}
        <StaggerContainer className="space-y-4">
          {faqs.map((faq) => {
            const isOpen = openIds.includes(faq.id);
            return (
              <StaggerItem key={faq.id}>
                <div className="rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-indigo-500/40 transition-colors duration-200 shadow-lg backdrop-blur-sm overflow-hidden">
                  <button
                    type="button"
                    onClick={() => toggleFaq(faq.id)}
                    aria-expanded={isOpen}
                    className="w-full text-left px-6 py-5 text-base sm:text-lg font-semibold text-slate-100 flex items-center justify-between gap-4 cursor-pointer select-none"
                  >
                    <span>{faq.question}</span>
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className={`flex h-7 w-7 items-center justify-center rounded-lg transition-colors shrink-0 ${
                        isOpen
                          ? "bg-indigo-600 text-white"
                          : "bg-slate-800 text-slate-400"
                      }`}
                    >
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 pt-4">
                          <p>{faq.answer}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* Help Box */}
        <FadeInView y={20} delay={0.2} className="mt-14 text-center p-8 rounded-2xl bg-gradient-to-b from-slate-900/80 to-slate-900/40 border border-slate-800/80 max-w-xl mx-auto shadow-xl">
          <div className="w-10 h-10 rounded-full bg-indigo-950 border border-indigo-800/60 flex items-center justify-center text-indigo-400 mx-auto mb-3">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <p className="text-base text-slate-200 font-bold">
            Have a question that is not answered here?
          </p>
          <p className="text-xs text-slate-400 mt-2 mb-4">
            Reach out to our support team anytime at{" "}
            <a
              href="mailto:support@devassets.online"
              className="text-indigo-400 hover:text-indigo-300 underline font-semibold transition-colors"
            >
              support@devassets.online
            </a>
          </p>
          <MagneticButton>
            <a
              href="mailto:support@devassets.online"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-semibold border border-slate-700 transition-colors shadow-sm"
            >
              <span>Contact Support</span>
              <span>→</span>
            </a>
          </MagneticButton>
        </FadeInView>
      </div>
    </section>
  );
}
