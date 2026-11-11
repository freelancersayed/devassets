"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FadeInView,
  StaggerContainer,
  StaggerItem,
} from "@/components/motion/MotionContainers";

export default function FAQ() {
  const [openIds, setOpenIds] = useState<number[]>([1]);

  const toggleFaq = (id: number) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const faqs = [
    {
      id: 1,
      question: "Are the web utilities really free and executed in-browser?",
      answer:
        "Yes, 100%. Our web tools execute entirely on your device using client-side Web APIs (such as Web Audio API, Canvas 2D, and WebAssembly). Your files, images, videos, and PDFs are processed strictly within your browser's local memory and are never uploaded or transmitted to our servers.",
    },
    {
      id: 2,
      question: "In what formats are the AI Prompts and Architecture Guides delivered?",
      answer:
        "Immediately upon checkout, you receive direct on-screen download links. Prompt packages are provided in structured JSON, clean Markdown (.md), and printable reference sheets. Architecture starter kits are packaged as clean, unminified .zip archives with full TypeScript configurations.",
    },
    {
      id: 3,
      question: "How does the 30-Day All-Access Pass work?",
      answer:
        "The 30-Day All-Access Pass is a strictly prepaid, one-time purchase. It grants you 30 days of unlimited client-side processing across all tools plus tokens to download any 3 premium digital packages. It does NOT automatically renew or charge your card again—there are zero subscription traps.",
    },
    {
      id: 4,
      question: "Can I use the included code and prompts in commercial client projects?",
      answer:
        "Absolutely. All standalone products and bundles include a commercial developer license. You have perpetual rights to integrate, adapt, and deploy the code, components, and prompt outputs across unlimited client or enterprise applications.",
    },
    {
      id: 5,
      question: "What is your refund policy?",
      answer:
        "We offer a 14-day refund policy for verifiable technical defects, non-delivery of download archives, corrupted files, or accidental duplicate charges that our engineering support team cannot resolve within 48 hours.",
    },
  ];

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="py-20 sm:py-24 bg-[#09090B] transition-colors scroll-mt-20 border-b border-[#27272A]"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* SECTION HEADER */}
        <FadeInView y={16} className="max-w-2xl mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-[#27272A] bg-[#18181B] px-3 py-1 text-xs font-mono text-[#10B981]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></span>
            <span>frequently asked questions</span>
          </div>

          <h2
            id="faq-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-[-0.03em] text-[#FAFAFA] leading-tight"
          >
            Answers &amp; Technical Details
          </h2>
          <p className="text-sm sm:text-base text-[#A1A1AA] leading-relaxed">
            Direct details regarding client-side runtime execution, prompt delivery, commercial licensing, and refunds.
          </p>
        </FadeInView>

        {/* ACCORDION */}
        <StaggerContainer className="space-y-3">
          {faqs.map((faq) => {
            const isOpen = openIds.includes(faq.id);
            return (
              <StaggerItem key={faq.id}>
                <div className="rounded-xl bg-[#18181B] border border-[#27272A] overflow-hidden shadow-xs transition-colors hover:border-[#27272A]/80">
                  <button
                    type="button"
                    onClick={() => toggleFaq(faq.id)}
                    aria-expanded={isOpen}
                    className="w-full text-left px-5 sm:px-6 py-4 sm:py-5 text-sm sm:text-base font-semibold text-[#FAFAFA] flex items-center justify-between gap-4 cursor-pointer select-none"
                  >
                    <span>{faq.question}</span>
                    <span
                      className={`flex h-6 w-6 items-center justify-center rounded-md text-xs font-mono transition-transform duration-200 shrink-0 ${
                        isOpen
                          ? "bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20"
                          : "text-[#A1A1AA] bg-[#09090B] border border-[#27272A]"
                      }`}
                    >
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 sm:px-6 pb-5 text-xs sm:text-sm text-[#A1A1AA] leading-relaxed border-t border-[#27272A] pt-3.5">
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

        {/* DIRECT HELP BOX */}
        <FadeInView y={16} delay={0.15} className="mt-12 text-center p-6 rounded-xl bg-[#18181B] border border-[#27272A] shadow-xs">
          <p className="text-xs text-[#A1A1AA]">
            Have a custom engineering question or enterprise license inquiry?
          </p>
          <a
            href="mailto:support@devassets.online"
            className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-[#10B981] hover:text-[#34D399] transition-colors"
          >
            <span>support@devassets.online</span>
            <span aria-hidden="true">&rarr;</span>
          </a>
        </FadeInView>
      </div>
    </section>
  );
}
