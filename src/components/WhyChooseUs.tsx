"use client";

import {
  FadeInView,
  StaggerContainer,
  StaggerItem,
} from "@/components/motion/MotionContainers";

export default function WhyChooseUs() {
  const features = [
    {
      title: "Zero-Knowledge Client Privacy",
      description:
        "Files processed in our tools never leave your device memory. Conversions, audio extractions, and OCR run directly via client-side Web APIs with zero network telemetry.",
      badge: "In-Memory",
      icon: (
        <svg className="w-5 h-5 text-[#10B981]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
    },
    {
      title: "Instant Deterministic Delivery",
      description:
        "Direct download access and license key verification provided immediately upon checkout. No delayed verification emails, waiting queues, or token throttles.",
      badge: "0ms Queue",
      icon: (
        <svg className="w-5 h-5 text-[#10B981]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      title: "Production-Tested TypeScript Standards",
      description:
        "Every code pattern and architecture toolkit is written in strict TypeScript 5.8+, tested against modern Web Vitals, and designed to drop cleanly into production repositories.",
      badge: "Type-Safe",
      icon: (
        <svg className="w-5 h-5 text-[#10B981]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
    },
    {
      title: "14-Day Buyer Protection & Direct Support",
      description:
        "Clear, transparent refund terms covering corrupted downloads or technical defects, backed by responsive engineering support directly from the maintainer.",
      badge: "Commercial Grant",
      icon: (
        <svg className="w-5 h-5 text-[#10B981]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
  ];

  return (
    <section
      id="features"
      aria-labelledby="features-heading"
      className="py-20 sm:py-24 bg-[#09090B] border-b border-[#27272A] scroll-mt-20 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* SECTION HEADER */}
        <FadeInView y={16} className="max-w-3xl mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-[#27272A] bg-[#18181B] px-3 py-1 text-xs font-mono text-[#10B981]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]"></span>
            <span>engineering standards</span>
          </div>

          <h2
            id="features-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-[-0.03em] text-[#FAFAFA] leading-tight"
          >
            Built on Core Engineering Principles
          </h2>
          <p className="text-sm sm:text-base text-[#A1A1AA] leading-relaxed max-w-2xl">
            Everything we build is engineered with strict attention to client-side privacy, deterministic execution, and clean developer ergonomics.
          </p>
        </FadeInView>

        {/* 4 FEATURE CARDS */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {features.map((feature, i) => (
            <StaggerItem key={i} className="h-full">
              <div className="rounded-xl border border-[#27272A] bg-[#18181B] p-6 sm:p-7 flex flex-col justify-between h-full shadow-xs hover:border-[#10B981]/50 transition-all duration-200">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-lg bg-[#09090B] border border-[#27272A] flex items-center justify-center shadow-xs">
                      {feature.icon}
                    </div>
                    <span className="font-mono text-[11px] text-[#10B981] bg-[#10B981]/10 px-2 py-0.5 rounded border border-[#10B981]/20">
                      {feature.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-semibold text-[#FAFAFA] tracking-[-0.015em]">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-[#A1A1AA] leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
