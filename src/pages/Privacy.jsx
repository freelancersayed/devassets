import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../Component/SEO';

export default function Privacy() {
  const privacySchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Privacy Policy | DevAssets",
    "url": "https://devassets.online/privacy",
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://devassets.online/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Privacy Policy",
          "item": "https://devassets.online/privacy"
        }
      ]
    }
  };

  return (
    <article className="min-h-[70vh] bg-slate-950 px-6 py-16 text-slate-300">
      <SEO
        title="Privacy Policy"
        description="Learn how DevAssets protects your personal data, handles digital purchases, and ensures PCI-compliant transaction security via FastSpring."
        canonical="/privacy"
        schema={privacySchema}
      />

      <div className="mx-auto max-w-4xl">
        {/* Semantic Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-slate-400">
          <Link to="/" className="hover:text-indigo-400 transition-colors">Home</Link>
          <span className="text-slate-600">/</span>
          <span className="text-indigo-400 font-medium">Privacy Policy</span>
        </nav>

        <h1 className="mb-4 bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-4xl font-extrabold text-transparent">
          Privacy Policy
        </h1>

        <p className="mb-8 text-xs text-slate-500">
          Last Updated: October 2026
        </p>

        <div className="space-y-8 text-sm leading-7">
          <p>
            Welcome to <strong className="text-slate-100">DevAssets</strong>.
            We respect your privacy and are committed to handling your personal
            information responsibly. This Privacy Policy explains how we
            collect, use, store, and protect information when you visit
            our website or purchase our digital products, including e-books
            and software resources.
          </p>

          <section>
            <h2 className="mb-2 text-lg font-bold text-slate-100">
              1. Information We Collect
            </h2>

            <p>
              Depending on how you interact with our website, we may process
              information such as your name, email address, order details,
              and communications with our support team.
            </p>

            <p className="mt-3">
              Payments are processed by our Merchant of Record, FastSpring.
              FastSpring may collect billing information, payment details,
              country, and other information necessary to process transactions
              and comply with applicable requirements. The information shared
              with DevAssets depends on the purchase and fulfillment process.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-bold text-slate-100">
              2. How We Use Your Information
            </h2>

            <p>We use relevant information for the following purposes:</p>

            <ul className="mt-3 list-disc space-y-2 pl-6 marker:text-indigo-400">
              <li>To deliver purchased digital products and fulfill orders.</li>
              <li>To respond to customer inquiries and provide technical support.</li>
              <li>To communicate about purchases, updates, or important product information.</li>
              <li>To prevent fraud, resolve disputes, and protect our services.</li>
              <li>To comply with applicable legal and regulatory obligations.</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-bold text-slate-100">
              3. Payment Processing and Third Parties
            </h2>

            <p>
              FastSpring handles payment processing in accordance with its
              applicable policies and security practices. We do not store
              customers' full payment card details or PayPal login credentials
              on our own servers.
            </p>

            <p className="mt-3">
              We do not sell personal information to third-party marketers.
              Information may be shared with FastSpring, relevant service
              providers, or authorized parties when necessary to process
              orders, deliver products, provide support, prevent fraud,
              or comply with legal obligations.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-bold text-slate-100">
              4. Data Security and Retention
            </h2>

            <p>
              We take reasonable measures to protect the personal information
              we handle against unauthorized access, disclosure, alteration,
              or loss. However, no method of electronic storage or transmission
              can be guaranteed to be completely secure.
            </p>

            <p className="mt-3">
              We retain personal information only for as long as reasonably
              necessary to fulfill the purposes described in this policy,
              provide customer support, maintain relevant records, and meet
              applicable legal obligations.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-bold text-slate-100">
              5. Cookies and Technical Information
            </h2>

            <p>
              Our website or service providers may use cookies or similar
              technologies where applicable to support website functionality,
              security, and performance. You can manage cookies through your
              browser settings. Disabling certain cookies may affect some
              website features.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-bold text-slate-100">
              6. Your Privacy Rights
            </h2>

            <p>
              Depending on your location and applicable law, you may have
              rights to request access to, correction of, or deletion of
              personal information, or to object to or restrict certain
              processing.
            </p>

            <p className="mt-3">
              To submit a privacy-related request concerning information
              handled by DevAssets, please contact us using the email address
              below. For payment information or data handled directly by
              FastSpring, you may also need to contact FastSpring.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-bold text-slate-100">
              7. Children's Privacy
            </h2>

            <p>
              Our website and digital products are not directed at children
              under the age required to provide valid consent under applicable
              law. We do not knowingly collect children's personal information
              in violation of applicable legal requirements.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-bold text-slate-100">
              8. Changes to This Privacy Policy
            </h2>

            <p>
              We may update this Privacy Policy when our practices or legal
              requirements change. Any updated version will be published on
              this page with a revised Last Updated date.
            </p>
          </section>

          <section className="border-t border-slate-800 pt-6">
            <h2 className="mb-2 text-lg font-bold text-slate-100">
              9. Contact Us
            </h2>

            <p>
              If you have questions about this Privacy Policy or how DevAssets
              handles your personal information, please contact us at:
            </p>

            <a
              href="mailto:support@devassets.online"
              className="mt-2 inline-block break-all text-indigo-400 transition-colors hover:text-cyan-400 hover:underline"
            >
              support@devassets.online
            </a>

            <p className="mt-3">
              Website:{" "}
              <a
                href="https://devassets.online"
                className="text-indigo-400 hover:text-cyan-400 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://devassets.online
              </a>
            </p>
          </section>
        </div>
      </div>
    </article>
  );
}