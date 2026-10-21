
import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../Component/SEO';

export default function Terms() {
  const termsSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Terms of Service | DevAssets",
    "url": "https://devassets.online/terms",
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
          "name": "Terms of Service",
          "item": "https://devassets.online/terms"
        }
      ]
    }
  };

  return (
    <article className="min-h-[70vh] bg-slate-950 px-6 py-16 text-slate-300">
      <SEO
        title="Terms of Service"
        description="DevAssets Terms of Service: rules and licensing terms regarding our digital e-books, commercial code licenses, and FastSpring payment processing."
        canonical="/terms"
        schema={termsSchema}
      />

      <div className="mx-auto max-w-4xl">
        {/* Semantic Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-slate-400">
          <Link to="/" className="hover:text-indigo-400 transition-colors">Home</Link>
          <span className="text-slate-600">/</span>
          <span className="text-indigo-400 font-medium">Terms of Service</span>
        </nav>

        <h1 className="mb-4 bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-4xl font-extrabold text-transparent">
          Terms of Service
        </h1>

        <p className="mb-8 text-xs text-slate-500">
          Last Updated: October 2026
        </p>

        <div className="space-y-8 text-sm leading-7">
          <p>
            Welcome to <strong className="text-slate-100">DevAssets</strong>.
            These Terms of Service govern your access to and use of
            our website and digital products, including e-books,
            software resources, templates, and other digital assets.
            By accessing our website or purchasing a product, you agree
            to these terms.
          </p>

          <section>
            <h2 className="mb-2 text-lg font-bold text-slate-100">
              1. Digital Products and License
            </h2>

            <p>
              Upon successful purchase, DevAssets grants you a
              non-exclusive, non-transferable license to use the
              purchased digital product in accordance with its
              description and any product-specific license terms.
              The license is perpetual where specified in the
              product listing and subject to these Terms.
            </p>

            <p className="mt-3">
              Unless a product listing or separate license states
              otherwise, products are intended for personal use or
              use within a single business. Please review the
              individual product description for any additional
              usage restrictions.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-bold text-slate-100">
              2. Acceptable Use and Restrictions
            </h2>

            <p>
              Unless expressly permitted by the applicable license
              or by law, you may not:
            </p>

            <ul className="mt-3 list-disc space-y-2 pl-6 marker:text-indigo-400">
              <li>Resell, redistribute, sublicense, or publicly share purchased files as standalone products.</li>
              <li>Share download links or source files with unauthorized users.</li>
              <li>Claim ownership of work created by DevAssets or its original contributors.</li>
              <li>Use our products for unlawful purposes or in ways that infringe third-party rights.</li>
              <li>Reverse-engineer proprietary software where such activity is not permitted by law or the applicable license.</li>
            </ul>

            <p className="mt-3">
              If we identify a material violation, we may take
              appropriate action, including suspending the relevant
              license where permitted by its terms and applicable law.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-bold text-slate-100">
              3. Orders and Payments
            </h2>

            <p>
              Payments for products offered through our store are
              processed by FastSpring, our Merchant of Record.
              Purchases are subject to the applicable payment,
              transaction, and checkout terms presented during
              the purchase process.
            </p>

            <p className="mt-3">
              Customers are responsible for providing accurate
              information necessary to complete their orders.
              Product prices and relevant purchase details should
              be reviewed before completing a transaction.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-bold text-slate-100">
              4. Refunds and Technical Support
            </h2>

            <p>
              Our digital products are subject to the DevAssets
              Refund Policy, available on this website. If a
              purchased file is defective, inaccessible, or
              materially different from its description, please
              contact our support team for assistance.
            </p>

            <p className="mt-3">
              Refund requests are handled in accordance with our
              Refund Policy, applicable payment-provider procedures,
              and any consumer rights that cannot lawfully be
              excluded or restricted.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-bold text-slate-100">
              5. Intellectual Property
            </h2>

            <p>
              Unless otherwise stated, DevAssets and its respective
              licensors retain ownership of the intellectual
              property rights in the original content and materials
              offered through our website. Purchasing a product
              grants the applicable usage license, not ownership
              of the underlying intellectual property.
            </p>

            <p className="mt-3">
              Third-party components, libraries, or assets included
              with a product may be subject to separate licenses.
              Customers are responsible for complying with those
              applicable license terms.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-bold text-slate-100">
              6. Disclaimer of Warranties
            </h2>

            <p>
              To the extent permitted by applicable law, our digital
              products are provided on an "as available" basis.
              We make reasonable efforts to provide accurate product
              descriptions and functional downloads, but we do not
              guarantee that every product will be uninterrupted,
              error-free, or compatible with every environment.
            </p>

            <p className="mt-3">
              Nothing in these Terms excludes any warranty or
              protection that cannot lawfully be excluded under
              applicable law.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-bold text-slate-100">
              7. Limitation of Liability
            </h2>

            <p>
              To the maximum extent permitted by applicable law,
              DevAssets will not be liable for indirect, incidental,
              special, or consequential losses arising from the use
              of our website or digital products.
            </p>

            <p className="mt-3">
              Nothing in these Terms limits liability where such
              limitation is prohibited by law, including liability
              that cannot legally be excluded or restricted.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-bold text-slate-100">
              8. Changes to These Terms
            </h2>

            <p>
              We may update these Terms from time to time to reflect
              changes to our services or legal requirements. Updated
              terms will be published on this page with a revised
              Last Updated date. Changes will apply as permitted
              by applicable law.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-bold text-slate-100">
              9. Contact Us
            </h2>

            <p>
              If you have questions about these Terms, digital
              product licenses, or our services, please contact us:
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
            These Terms should be read together with our Privacy
            Policy and Refund Policy. Applicable consumer protection
            laws and mandatory legal rights remain unaffected.
          </p>
        </div>
      </div>
    </article>
  );
}
