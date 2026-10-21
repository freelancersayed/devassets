import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Learn how DevAssets protects your personal data, handles digital purchases, and ensures PCI-compliant transaction security.",
  alternates: {
    canonical: "https://devassets.online/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <article className="min-h-[70vh] bg-slate-950 px-6 py-16 text-slate-300">
      <div className="mx-auto max-w-4xl">
        <nav
          aria-label="Breadcrumb"
          className="mb-6 flex items-center gap-2 text-xs text-slate-400"
        >
          <Link href="/" className="hover:text-indigo-400 transition-colors">
            Home
          </Link>
          <span className="text-slate-600">/</span>
          <span className="text-indigo-400 font-medium">Privacy Policy</span>
        </nav>

        <h1 className="mb-4 text-gradient text-4xl font-extrabold">
          Privacy Policy
        </h1>

        <p className="mb-8 text-xs text-slate-500">
          Last Updated: October 2026
        </p>

        <div className="space-y-8 text-sm leading-7">
          <p>
            Welcome to{" "}
            <strong className="text-slate-100">DevAssets</strong> (operated by
            Md Sayed). We respect your privacy and are committed to handling
            your personal information responsibly. This Privacy Policy explains
            how we collect, use, store, and protect information when you visit
            our website or purchase our digital products, including code kits and
            documentation.
          </p>

          <section>
            <h2 className="mb-2 text-lg font-bold text-slate-100">
              1. Information We Collect
            </h2>
            <p>
              Depending on how you interact with our website, we may process
              information such as your name, email address, order details, and
              communications with our support team.
            </p>
            <p className="mt-3">
              Payments are processed by our authorized payment processor. The
              payment processor may collect billing information, payment details,
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
              <li>
                To deliver purchased digital products and fulfill orders.
              </li>
              <li>
                To respond to customer inquiries and provide technical support.
              </li>
              <li>
                To communicate about purchases, updates, or important product
                information.
              </li>
              <li>
                To prevent fraud, resolve disputes, and protect our services.
              </li>
              <li>
                To comply with applicable legal and regulatory obligations.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-bold text-slate-100">
              3. Payment Processing and Third Parties
            </h2>
            <p>
              Our authorized payment processor handles payment processing in
              accordance with its applicable policies and security practices. We
              do not store customers&apos; full payment card details or payment
              login credentials on our own servers.
            </p>
            <p className="mt-3">
              We do not sell personal information to third-party marketers.
              Information may be shared with the payment processor, relevant
              service providers, or authorized parties when necessary to process
              orders, deliver products, provide support, prevent fraud, or comply
              with legal obligations.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-bold text-slate-100">
              4. Data Security and Retention
            </h2>
            <p>
              We take reasonable measures to protect the personal information we
              handle against unauthorized access, disclosure, alteration, or
              loss. However, no method of electronic storage or transmission can
              be guaranteed to be completely secure.
            </p>
            <p className="mt-3">
              We retain personal information only for as long as reasonably
              necessary to fulfill the purposes described in this policy, provide
              customer support, maintain relevant records, and meet applicable
              legal obligations.
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
              browser settings. Disabling certain cookies may affect some website
              features.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-bold text-slate-100">
              6. Your Privacy Rights
            </h2>
            <p>
              Depending on your location and applicable law, you may have rights
              to request access to, correction of, or deletion of personal
              information, or to object to or restrict certain processing.
            </p>
            <p className="mt-3">
              To submit a privacy-related request concerning information handled
              by DevAssets, please contact us using the email address below. For
              payment information or data handled directly by the payment
              processor, you may also need to contact them directly.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-bold text-slate-100">
              7. Children&apos;s Privacy
            </h2>
            <p>
              Our website and digital products are not directed at children under
              the age required to provide valid consent under applicable law. We
              do not knowingly collect children&apos;s personal information in
              violation of applicable legal requirements.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-bold text-slate-100">
              8. Changes to This Privacy Policy
            </h2>
            <p>
              We may update this Privacy Policy when our practices or legal
              requirements change. Any updated version will be published on this
              page with a revised Last Updated date.
            </p>
          </section>

          <section className="border-t border-slate-800 pt-6">
            <h2 className="mb-2 text-lg font-bold text-slate-100">
              9. Contact Us
            </h2>
            <p>
              If you have questions about this Privacy Policy or how DevAssets
              handles your personal information, please contact us:
            </p>
            <div className="mt-3 space-y-1 text-sm text-slate-400">
              <p>
                <span className="text-slate-500">Brand / Business Name:</span>{" "}
                DevAssets (Operated by Md Sayed)
              </p>
              <p>
                <span className="text-slate-500">Address:</span>{" "}
                Satkhira-9450, Khulna, Bangladesh
              </p>
              <p>
                <span className="text-slate-500">Email:</span>{" "}
                <a
                  href="mailto:support@devassets.online"
                  className="text-indigo-400 hover:underline"
                >
                  support@devassets.online
                </a>
              </p>
              <p>
                <span className="text-slate-500">Business Hours:</span> Monday
                – Friday, 9:00 AM – 5:00 PM (UTC+6)
              </p>
              <p>
                <span className="text-slate-500">Website:</span>{" "}
                <a
                  href="https://devassets.online"
                  className="text-indigo-400 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://devassets.online
                </a>
              </p>
            </div>
          </section>
        </div>
      </div>
    </article>
  );
}
