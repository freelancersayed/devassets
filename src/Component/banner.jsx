import React from 'react';

function Banners() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center bg-slate-950 px-6 py-16 transition-colors duration-300 overflow-hidden">
      {/* Background Premium Glow */}
      <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl"></div>

      <div className="container mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* Left Side */}
        <div className="space-y-6 text-center md:text-left">
          
          {/* Tagline */}
          <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-950/60 px-3.5 py-1.5 text-xs font-semibold text-indigo-400 border border-indigo-900/50 tracking-wide">
            🚀 Accelerate Your Skills — Premium Digital Resources
          </span>
          
          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-black tracking-tight text-slate-50 leading-[1.15]">
            Master Modern Tech & <br />
            <span className="bg-gradient-to-r select-none from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Rank #1 on Google
            </span>
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg text-slate-400 max-w-xl mx-auto md:mx-0 leading-relaxed">
            Expert-crafted digital resources for developers and marketers. 
            From advanced JavaScript & React patterns to 2026 SEO strategies — 
            everything you need to level up, in high-quality PDF format.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3.5 justify-center md:justify-start items-center pt-2">
            <a
              href="#products"
              title="Explore DevAssets Premium E-Books and Masterclasses"
              aria-label="Explore DevAssets Premium E-Books and Masterclasses"
              className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white text-center font-semibold rounded-xl shadow-lg shadow-indigo-600/25 transition-all duration-200 active:scale-[0.98]"
            >
              Explore Premium Resources
            </a>
            
            <a
              href="#products"
              title="View all digital courses and ebooks"
              aria-label="View all digital courses and ebooks"
              className="w-full sm:w-auto px-8 py-3.5 text-center bg-slate-900/80 text-slate-300 font-semibold rounded-xl border border-slate-700/80 hover:bg-slate-800 hover:border-slate-600 transition-all duration-200"
            >
              View All Products
            </a>
          </div>

          {/* Trust Badges */}
          <div className="pt-5 flex flex-wrap items-center justify-center md:justify-start gap-x-6 gap-y-2.5 text-xs font-medium text-slate-500">
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400">🔒</span> Secure FastSpring Checkout
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400">⚡</span> Instant PDF Delivery
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400">🔄</span> 2026 Updated Content
            </div>
          </div>
        </div>

        {/* Right Side - Product Cards */}
        <div className="flex justify-center relative">
          <div className="relative w-full max-w-[420px] aspect-square bg-gradient-to-br from-slate-900 to-slate-900/40 rounded-3xl p-6 flex flex-col justify-center gap-4 shadow-2xl border border-slate-800/80 overflow-hidden group">
            
            {/* Background Decoration */}
            <div className="absolute -right-10 -bottom-10 h-40 w-40 rounded-full bg-cyan-500/10 blur-2xl"></div>

            {/* Card 1: Advanced JavaScript */}
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-950 border border-slate-800/60 transform -rotate-2 group-hover:rotate-0 transition-transform duration-300 shadow-xl">
              <span className="text-3xl">💛</span>
              <div>
                <h4 className="font-bold text-sm text-slate-200">Advanced JavaScript</h4>
                <p className="text-xs text-slate-500 mt-0.5">Master Engines, Closures & Async Patterns</p>
              </div>
              <span className="ml-auto text-xs font-bold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded">PDF</span>
            </div>

            {/* Card 2: Advanced React */}
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-950 border border-slate-800/60 transform rotate-1 group-hover:rotate-0 transition-transform duration-300 shadow-xl">
              <span className="text-3xl">💚</span>
              <div>
                <h4 className="font-bold text-sm text-slate-200">Advanced React</h4>
                <p className="text-xs text-slate-500 mt-0.5">Production Patterns, Hooks & Real Projects</p>
              </div>
              <span className="ml-auto text-xs font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded">PDF</span>
            </div>

            {/* Card 3: Premium SEO Blueprint */}
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-950 border border-slate-800/60 transform rotate-3 group-hover:rotate-0 transition-transform duration-300 shadow-xl">
              <span className="text-3xl">💙</span>
              <div>
                <h4 className="font-bold text-sm text-slate-200">Premium SEO Blueprint</h4>
                <p className="text-xs text-slate-500 mt-0.5">Rank #1 with 2026 Core Algorithm Hacks</p>
              </div>
              <span className="ml-auto text-xs font-bold text-cyan-400 bg-cyan-400/10 px-2 py-0.5 rounded">GUIDE</span>
            </div>

            {/* Small Info */}
            <p className="text-center text-[11px] text-slate-600 mt-2">
              High-quality PDF format • Instant download after purchase
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Banners;