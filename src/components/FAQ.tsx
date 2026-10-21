export default function FAQ() {
  const faqs = [
    {
      id: 1,
      question:
        "What is included in the JavaScript and React toolkits?",
      answer:
        "The Advanced JavaScript Patterns & Engine Toolkit includes 50+ modular JS/TS utility and pattern files, a complete Jest test suite with benchmarks, and an 85-page technical reference manual. The React Enterprise Starter Kit includes 2 complete reference app codebases (E-Commerce Admin Dashboard & Real-Time Chat), a reusable custom hooks & TypeScript component library, performance profiling setup, and a 30-page architecture manual.",
    },
    {
      id: 2,
      question:
        "What does the Technical SEO & Core Web Vitals Audit Toolkit cover?",
      answer:
        "The toolkit includes copy-paste JSON-LD structured data schemas, Lighthouse CI configs, Core Web Vitals (LCP, INP, CLS) debugging workflows, and a comprehensive 30-day technical SEO audit template with a step-by-step guide in PDF format.",
    },
    {
      id: 3,
      question:
        "Who are these toolkits for, and what experience level is required?",
      answer:
        "Our toolkits are designed for junior to intermediate developers, freelancers, and technical marketers ready to level up their workflow. A foundational understanding of web development is recommended, as our resources focus on advanced, production-ready patterns rather than introductory theory.",
    },
    {
      id: 4,
      question: "How does instant delivery work?",
      answer:
        "After your payment is securely processed, you receive instant on-screen download links as well as an email confirmation with your .ZIP archive and PDF files. No delays — access your code and documentation immediately.",
    },
    {
      id: 5,
      question:
        "Can I use the included source code in commercial projects?",
      answer:
        "Yes. All toolkits include a Single-Developer Commercial & Personal Use license. You can use, modify, and deploy the code in your personal projects, client work, or commercial SaaS applications.",
    },
  ];

  return (
    <section
      id="faq"
      className="py-20 bg-slate-950 transition-colors duration-300 scroll-mt-24 border-t border-slate-900"
    >
      <div className="container mx-auto max-w-4xl px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-950/60 px-3.5 py-1.5 text-xs font-semibold text-indigo-400 border border-indigo-900/50 tracking-wide mb-4">
            💡 Got Questions? We Have Answers
          </span>
          <h2 className="text-3xl font-extrabold text-slate-50 sm:text-4xl">
            Frequently Asked{" "}
            <span className="text-gradient">Questions</span>
          </h2>
          <p className="mt-4 text-slate-400 text-sm">
            Everything you need to know about our developer toolkits, instant
            delivery, licensing, and payment security.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {faqs.map((faq) => (
            <details
              key={faq.id}
              className="group rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700/80 transition-all duration-200 shadow-md"
            >
              <summary className="cursor-pointer list-none px-6 py-5 text-base sm:text-lg font-semibold text-slate-100 flex items-center justify-between gap-4">
                {faq.question}
                <svg
                  className="h-5 w-5 text-slate-500 shrink-0 transition-transform duration-200 group-open:rotate-180"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </summary>
              <div className="px-6 pb-5 text-sm sm:text-base text-slate-400 leading-relaxed">
                <p>{faq.answer}</p>
              </div>
            </details>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center p-6 rounded-2xl bg-slate-900/40 border border-slate-800/60 max-w-xl mx-auto">
          <p className="text-sm text-slate-300 font-medium">
            Have a question that is not answered here?
          </p>
          <p className="text-xs text-slate-500 mt-1">
            Reach out to our support team anytime at{" "}
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
