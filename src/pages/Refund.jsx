
import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../Component/SEO';

export default function Refund() {
  const refundSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Refund Policy | DevAssets",
    "url": "https://devassets.online/refund",
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
          "name": "Refund Policy",
          "item": "https://devassets.online/refund"
        }
      ]
    }
  };

  return (
    <article className="min-h-[70vh] bg-slate-950 px-6 py-16 text-slate-300">
      <SEO
        title="Refund Policy"
        description="DevAssets Refund Policy: Learn our terms on digital masterclass downloads, license delivery, and refund eligibility processed via FastSpring."
        canonical="/refund"
        schema={refundSchema}
      />

      <div className="mx-auto max-w-4xl">
        {/* Semantic Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-slate-400">
          <Link to="/" className="hover:text-indigo-400 transition-colors">Home</Link>
          <span className="text-slate-600">/</span>
          <span className="text-indigo-400 font-medium">Refund Policy</span>
        </nav>

        <h1 className="mb-4 bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-4xl font-extrabold text-transparent">
          Refund Policy
        </h1>

        <p className="mb-8 text-xs text-slate-500">
          Last Updated: October 2026
        </p>

        <div className="space-y-8 text-sm leading-7">
          <p>
            At <strong className="text-slate-100">DevAssets</strong>,
            we aim to provide quality digital products, including e-books,
            software resources, and digital assets. This Refund Policy
            explains how refund requests are handled for purchases made
            through our website.
          </p>

          <section>
            <h2 className="mb-2 text-lg font-bold text-slate-100">
              1. General Refund Policy
            </h2>

            <p>
              Due to the digital nature of our products, refunds are generally
              not available after a product has been successfully delivered
              and accessed or downloaded, except where required by applicable
              law or where a refund is warranted under this policy.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-bold text-slate-100">
              2. Defective or Incorrect Products
            </h2>

            <p>
              If a purchased product is corrupted, inaccessible, materially
              different from its description, or affected by a technical
              defect that prevents its intended use, please contact us within
              <strong className="text-slate-100"> 7 days of purchase</strong>.
            </p>

            <p className="mt-3">
              Our support team will make reasonable efforts to investigate
              the issue and provide a replacement file, correction, or other
              appropriate solution. If the issue cannot be resolved within
              5 business days, we will review the refund request and, where
              approved, arrange the refund through the applicable payment
              provider.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-bold text-slate-100">
              3. Duplicate Charges and Billing Issues
            </h2>

            <p>
              If you believe you were charged more than once for the same
              purchase, were charged incorrectly, or did not receive your
              purchased product, please contact us so we can investigate
              and help resolve the issue.
            </p>

            <p className="mt-3">
              FastSpring processes payments for our store. Depending on the
              transaction and the applicable process, you may be directed
              to FastSpring for assistance with billing or refund requests.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-bold text-slate-100">
              4. Refund Requests and Payment Disputes
            </h2>

            <p>
              We encourage customers to contact our support team if they
              experience a problem with a purchase. We will review requests
              fairly and respond in accordance with this policy and
              applicable requirements.
            </p>

            <p className="mt-3">
              Nothing in this policy prevents customers from exercising
              their applicable legal rights or using the dispute resolution
              procedures available through their payment provider.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-bold text-slate-100">
              5. Refund Processing
            </h2>

            <p>
              Approved refunds are handled through the applicable payment
              provider. The time required for the refunded amount to appear
              in your account may vary depending on the payment method
              and financial institution.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-bold text-slate-100">
              6. Contact Us
            </h2>

            <p>
              For technical assistance, billing questions, or refund
              requests, please contact our support team at:
            </p>

            <a
              href="mailto:support@devassets.online"
              className="mt-2 inline-block break-all font-semibold text-indigo-400 transition-colors hover:text-cyan-400 hover:underline"
            >
              support@devassets.online
            </a>

            <p className="mt-3">
              Website:{" "}
              <a
                href="https://devassets.online"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-400 hover:text-cyan-400 hover:underline"
              >
                https://devassets.online
              </a>
            </p>
          </section>

          <p className="border-t border-slate-800 pt-5 text-xs text-slate-500">
            This policy does not limit any consumer rights that cannot
            lawfully be excluded or restricted under applicable law.
          </p>
        </div>
      </div>
    </article>
  );
}
