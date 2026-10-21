// src/Component/FAQ.jsx
import React from 'react';

function FAQ() {
  const faqs = [
    {
      id: 1,
      question: "What is covered in the JavaScript and React Masterclasses?",
      answer: "The Advanced JavaScript Masterclass covers JS engine internals, closures, async/await patterns, and 50+ real-world interview patterns with runnable demo code. The Advanced React Masterclass is a 30-page deep-dive featuring custom hooks, TypeScript patterns, performance optimization, and full source code for two real-world projects: an E-commerce Dashboard and a Real-time Chat App."
    },
    {
      id: 2,
      question: "Is the Premium SEO Strategy Blueprint updated for the 2026 Google Core Algorithm?",
      answer: "Yes, absolutely! The blueprint is built around the 2026 Google Core Algorithm. It includes actionable Technical SEO checklists, AI content optimization hacks, high-authority backlink strategies, Core Web Vitals fixes, an SEO audit template, and a ready-to-execute 30-day ranking roadmap."
    },
    {
      id: 3,
      question: "Who are these guides for, and what experience level is required?",
      answer: "Our resources are tailored for junior to intermediate developers, freelancers, and marketers ready to level up to senior roles. A foundational understanding of web development or digital marketing is recommended, as our guides skip generic theory and focus directly on advanced, production-proven patterns."
    },
    {
      id: 4,
      question: "How does instant delivery work?",
      answer: "Checkout is processed securely via FastSpring. Immediately upon completion, you will receive instant on-screen download links as well as an email confirmation with your PDF files."
    }
  ];

  return (
    <section id="faq" className="py-20 bg-slate-950 transition-colors duration-300 scroll-mt-24 border-t border-slate-900">
      <div className="container mx-auto max-w-4xl px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-950/60 px-3.5 py-1.5 text-xs font-semibold text-indigo-400 border border-indigo-900/50 tracking-wide mb-4">
            💡 Got Questions? We Have Answers
          </span>
          <h2 className="text-3xl font-extrabold text-slate-50 sm:text-4xl">
            Frequently Asked{' '}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="mt-4 text-slate-400 text-sm">
            Everything you need to know about our digital masterclasses, instant delivery, licensing, and payment security.
          </p>
        </div>

        {/* DaisyUI Accordion with Arrow Icon */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={faq.id}
              className="collapse collapse-arrow bg-slate-900/60 border border-slate-800/80 hover:border-slate-700/80 rounded-2xl transition-all duration-200 shadow-md"
            >
              <input
                type="radio"
                name="faq-accordion"
                defaultChecked={index === 0}
              />
              <div className="collapse-title text-base sm:text-lg font-semibold text-slate-100 pr-12">
                {faq.question}
              </div>
              <div className="collapse-content text-sm sm:text-base text-slate-400 leading-relaxed pt-1">
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Still Have Questions CTA */}
        <div className="mt-12 text-center p-6 rounded-2xl bg-slate-900/40 border border-slate-800/60 max-w-xl mx-auto">
          <p className="text-sm text-slate-300 font-medium">
            Have a question that is not answered here?
          </p>
          <p className="text-xs text-slate-500 mt-1">
            Reach out to our support team anytime at{' '}
            <a
              href="mailto:support@devassets.online"
              className="text-indigo-400 hover:text-indigo-300 underline font-semibold transition-colors"
            >
              support@devassets.online
            </a>
          </p>
        </div>

      </div>
    </section>
  );
}

export default FAQ;
