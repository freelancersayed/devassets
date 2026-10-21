export default function Hero() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center bg-slate-950 px-6 py-16 transition-colors duration-300 overflow-hidden">
      {/* Background Premium Glow */}
      <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="container mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Side */}
        <div className="space-y-6 text-center md:text-left animate-slide-up">
          {/* Tagline */}
          <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-950/60 px-3.5 py-1.5 text-xs font-semibold text-indigo-400 border border-indigo-900/50 tracking-wide">
            🚀 Modern Engineering Resources — Code Kits &amp; Technical
            Documentation
          </span>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-black tracking-tight text-slate-50 leading-[1.15]">
            Production-Ready Code Templates, Architecture Kits &amp;{" "}
            <span className="text-gradient select-none">Developer Guides</span>
          </h1>

          {/* Subheadline */}
          <p className="text-base sm:text-lg text-slate-400 max-w-xl mx-auto md:mx-0 leading-relaxed">
            Accelerate your engineering workflow with production-ready JavaScript
            and React starter kits, reusable code patterns, technical SEO
            auditing tools, and comprehensive implementation manuals.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3.5 justify-center md:justify-start items-center pt-2">
            <a
              href="#products"
              title="Explore DevAssets Developer Toolkits"
              aria-label="Explore DevAssets Developer Toolkits"
              className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white text-center font-semibold rounded-xl shadow-lg shadow-indigo-600/25 transition-all duration-200 active:scale-[0.98]"
            >
              Explore Developer Kits
            </a>

            <a
              href="#products"
              title="View all code kits and guides"
              aria-label="View all code kits and guides"
              className="w-full sm:w-auto px-8 py-3.5 text-center bg-slate-900/80 text-slate-300 font-semibold rounded-xl border border-slate-700/80 hover:bg-slate-800 hover:border-slate-600 transition-all duration-200"
            >
              View All Products
            </a>
          </div>

          {/* Trust Badges */}
          <div className="pt-5 flex flex-wrap items-center justify-center md:justify-start gap-x-6 gap-y-2.5 text-xs font-medium text-slate-500">
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400">🔒</span> 256-Bit SSL Encrypted
              Checkout
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400">⚡</span> Instant Code &amp;
              Documentation Access
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400">🔄</span> Free Minor Version
              Updates
            </div>
          </div>
        </div>

        {/* Right Side - Product Preview Cards */}
        <div className="flex justify-center relative animate-fade-in">
          <div className="relative w-full max-w-[420px] aspect-square bg-gradient-to-br from-slate-900 to-slate-900/40 rounded-3xl p-6 flex flex-col justify-center gap-4 shadow-2xl border border-slate-800/80 overflow-hidden group">
            <div className="absolute -right-10 -bottom-10 h-40 w-40 rounded-full bg-cyan-500/10 blur-2xl" />

            {/* Card 1 */}
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-950 border border-slate-800/60 transform -rotate-2 group-hover:rotate-0 transition-transform duration-300 shadow-xl">
              <span className="text-3xl">💛</span>
              <div>
                <h4 className="font-bold text-sm text-slate-200">
                  JS Patterns Toolkit
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  50+ Utility Patterns &amp; Test Suite
                </p>
              </div>
              <span className="ml-auto text-xs font-bold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded">
                .ZIP
              </span>
            </div>

            {/* Card 2 */}
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-950 border border-slate-800/60 transform rotate-1 group-hover:rotate-0 transition-transform duration-300 shadow-xl">
              <span className="text-3xl">💚</span>
              <div>
                <h4 className="font-bold text-sm text-slate-200">
                  React Enterprise Kit
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  2 Reference Apps &amp; Component Library
                </p>
              </div>
              <span className="ml-auto text-xs font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded">
                .ZIP
              </span>
            </div>

            {/* Card 3 */}
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-950 border border-slate-800/60 transform rotate-3 group-hover:rotate-0 transition-transform duration-300 shadow-xl">
              <span className="text-3xl">💙</span>
              <div>
                <h4 className="font-bold text-sm text-slate-200">
                  SEO &amp; CWV Toolkit
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  JSON-LD Schemas &amp; Lighthouse CI
                </p>
              </div>
              <span className="ml-auto text-xs font-bold text-cyan-400 bg-cyan-400/10 px-2 py-0.5 rounded">
                .ZIP
              </span>
            </div>

            <p className="text-center text-[11px] text-slate-600 mt-2">
              .ZIP archive + PDF manual • Instant access after purchase
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
