import {
  FadeInView,
  FloatingElement,
  MagneticButton,
} from "@/components/motion/MotionContainers";

export default function Hero() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center bg-slate-950 px-6 py-20 transition-colors duration-300 overflow-hidden">
      {/* Background Radial Glow Gradients - using will-change and transform3d for GPU acceleration */}
      <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-indigo-500/15 blur-3xl pointer-events-none transform-gpu" />
      <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-purple-500/15 blur-3xl pointer-events-none transform-gpu" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-cyan-500/5 blur-3xl pointer-events-none transform-gpu" />

      <div className="container mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Left Column (Headline + Subheading + CTAs + Badges) */}
        <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
          {/* Tagline Badge */}
          <FadeInView delay={0} duration={0.3} y={10}>
            <div className="inline-flex items-center gap-2 rounded-full bg-indigo-950/70 px-4 py-1.5 text-xs font-semibold text-indigo-300 border border-indigo-800/60 shadow-inner">
              <span className="flex h-2 w-2 rounded-full bg-indigo-400 animate-pulse" />
              <span>🚀 All-in-One Digital Hub — Web Tools, AI Prompts &amp; Engineering Guides</span>
            </div>
          </FadeInView>

          {/* Main Headline */}
          <FadeInView delay={0.05} duration={0.35} y={12}>
            <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-black tracking-tight text-slate-50 leading-[1.12]">
              Free Browser Utilities, Curated AI Prompts &amp;{" "}
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Developer Guides
              </span>
            </h1>
          </FadeInView>

          {/* Subheadline */}
          <FadeInView delay={0.08} duration={0.35} y={10}>
            <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Convert files securely in your browser with zero server uploads, 10x your development speed with structured AI prompt systems, and master modern web engineering with in-depth technical manuals.
            </p>
          </FadeInView>

          {/* CTAs */}
          <FadeInView delay={0.1} duration={0.35} y={10}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center pt-2">
              <MagneticButton className="w-full sm:w-auto">
                <a
                  href="#tools"
                  className="w-full sm:w-auto block px-8 py-3.5 bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold rounded-xl shadow-lg shadow-indigo-600/30 transition-all duration-200 text-center"
                >
                  Try Free Tools
                </a>
              </MagneticButton>
              <MagneticButton className="w-full sm:w-auto">
                <a
                  href="#products"
                  className="w-full sm:w-auto block px-8 py-3.5 bg-slate-900/80 hover:bg-slate-800 text-slate-200 font-semibold rounded-xl border border-slate-700/80 hover:border-slate-600 shadow-md transition-all duration-200 text-center"
                >
                  Browse All Products
                </a>
              </MagneticButton>
            </div>
          </FadeInView>

          {/* Trust Badges Row */}
          <FadeInView delay={0.12} duration={0.35} y={8}>
            <div className="pt-4 grid grid-cols-2 sm:flex sm:flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-medium text-slate-400">
              <div className="flex items-center gap-1.5 bg-slate-900/60 px-3 py-1.5 rounded-lg border border-slate-800/60">
                <span className="text-emerald-400">🔒</span>
                <span>256-Bit SSL Encrypted Checkout</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-900/60 px-3 py-1.5 rounded-lg border border-slate-800/60">
                <span className="text-indigo-400">⚡</span>
                <span>100% Client-Side Privacy</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-900/60 px-3 py-1.5 rounded-lg border border-slate-800/60">
                <span className="text-cyan-400">📦</span>
                <span>Instant Digital &amp; Tool Access</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-900/60 px-3 py-1.5 rounded-lg border border-slate-800/60">
                <span className="text-purple-400">🔄</span>
                <span>Lifetime Updates Included</span>
              </div>
            </div>
          </FadeInView>
        </div>

        {/* Right Column (Visual Preview Container) */}
        <div className="lg:col-span-5 flex justify-center relative">
          <FadeInView delay={0.1} scale={0.97} y={0} duration={0.4} className="w-full max-w-[440px]">
            <FloatingElement duration={6} yOffset={6}>
              <div className="relative w-full bg-gradient-to-br from-slate-900/90 to-slate-950 rounded-3xl p-6 sm:p-7 shadow-2xl border border-slate-800/90 space-y-4 backdrop-blur-xl">
                {/* Top Bar Indicator */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-slate-300 font-semibold font-mono">DevAssets Live Hub</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-md bg-indigo-950/80 border border-indigo-800/50 text-[10px] text-indigo-300 font-semibold">
                    Client-Native
                  </span>
                </div>

                {/* Mock Visual Content */}
                <div className="space-y-3 font-mono text-xs">
                  <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-indigo-400">📄</span>
                      <span className="text-slate-300">PDF to Word Engine</span>
                    </div>
                    <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
                      Active
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-purple-400">🤖</span>
                      <span className="text-slate-300">System Architecture Prompts</span>
                    </div>
                    <span className="text-[10px] text-indigo-400 bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-800/40">
                      200+ Prompts
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-cyan-400">⚡</span>
                      <span className="text-slate-300">Client-Side WASM OCR</span>
                    </div>
                    <span className="text-[10px] text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40">
                      0 ms Server
                    </span>
                  </div>
                </div>

                {/* Bottom Stats Row */}
                <div className="pt-2 grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2 rounded-lg bg-slate-950/50 border border-slate-800/60">
                    <span className="block font-bold text-slate-200">100%</span>
                    <span className="text-[10px] text-slate-500">Private</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-950/50 border border-slate-800/60">
                    <span className="block font-bold text-emerald-400">&lt; 10ms</span>
                    <span className="text-[10px] text-slate-500">Latency</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-950/50 border border-slate-800/60">
                    <span className="block font-bold text-indigo-400">0 KB</span>
                    <span className="text-[10px] text-slate-500">Uploads</span>
                  </div>
                </div>
              </div>
            </FloatingElement>
          </FadeInView>
        </div>
      </div>
    </section>
  );
}
