"use client";

import { motion } from "framer-motion";
import {
  FadeInView,
  StaggerContainer,
  StaggerItem,
  InteractiveCard,
} from "@/components/motion/MotionContainers";

export default function WhyChooseUs() {
  const features = [
    {
      title: "Zero-Knowledge Client Privacy",
      description:
        "Files processed in our tools never leave your device. All conversions, audio extractions, and OCR run directly in client-side memory using Web APIs.",
      badge: "100% Private",
      icon: (
        <svg className="w-6 h-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
    },
    {
      title: "Instant Digital Delivery",
      description:
        "Direct download links and PDF/Prompt access provided immediately after checkout. No wait times, delayed emails, or hidden download barriers.",
      badge: "Zero Latency",
      icon: (
        <svg className="w-6 h-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      title: "Production-Tested Standards",
      description:
        "All code templates, prompts, and architectures are tested against real-world projects, enterprise requirements, and modern Web Vitals benchmarks.",
      badge: "Industry Grade",
      icon: (
        <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      title: "14-Day Buyer Protection",
      description:
        "Transparent refund policy covering corrupted downloads, non-delivery, and technical defects with dedicated support via support@devassets.online.",
      badge: "Risk-Free",
      icon: (
        <svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
  ];

  return (
    <section id="features" className="py-24 bg-slate-950 border-t border-slate-900 scroll-mt-20">
      <div className="container mx-auto max-w-6xl px-6">
        {/* Section Header */}
        <FadeInView y={20} className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-950/80 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-indigo-400 border border-indigo-900/60 shadow-inner">
            🛡️ Engineered for Developers
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-50 tracking-tight">
            Why Choose DevAssets
          </h2>
          <p className="text-base text-slate-400 leading-relaxed">
            Everything we build is engineered with strict attention to privacy, performance, and real-world developer productivity.
          </p>
        </FadeInView>

        {/* 4 Feature Cards with Staggered Scroll-In & Hover Lift */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, i) => (
            <StaggerItem key={i}>
              <InteractiveCard className="h-full">
                <div className="group relative rounded-2xl border border-slate-800 bg-slate-900/60 p-8 hover:border-indigo-500/50 hover:bg-slate-900/90 transition-colors duration-300 shadow-xl backdrop-blur-sm h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <motion.div
                        whileHover={{ scale: 1.15, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-950 border border-slate-800 group-hover:border-indigo-500/40 transition-colors shadow-inner"
                      >
                        {feature.icon}
                      </motion.div>
                      <span className="rounded-full bg-slate-800/80 border border-slate-700/60 px-3 py-1 text-xs font-semibold text-slate-300">
                        {feature.badge}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-slate-100 group-hover:text-indigo-300 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="mt-3 text-sm text-slate-400 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </InteractiveCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
