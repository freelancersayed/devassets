import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Refund Policy",
  description:
    "DevAssets Refund Policy: Learn our 14-day refund terms for digital code kits, technical defects, corrupted archives, duplicate charges, and non-delivery.",
  alternates: {
    canonical: "https://devassets.online/refund",
  },
};

export default function RefundPage() {
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
          <span className="text-indigo-400 font-medium">Refund Policy</span>
        </nav>

        <h1 className="mb-4 text-gradient text-4xl font-extrabold">
          Refund Policy
        </h1>

        <p className="mb-8 text-xs text-slate-500">
          Last Updated: October 2026
        </p>

        <div className="space-y-8 text-sm leading-7">
          <p>
            At <strong className="text-slate-100">DevAssets</strong> (operated
            by Md Sayed), we aim to provide quality digital products, including
            code kits, starter templates, and technical documentation. This
            Refund Policy explains how refund requests are handled for purchases
            made through our website.
          </p>

          <section>
            <h2 className="mb-2 text-lg font-bold text-slate-100">
              1. 14-Day Refund Window
            </h2>
            <p>
              We offer a{" "}
              <strong className="text-slate-100">14-day refund window</strong>{" "}
              from the date of purchase. You may request a refund within this
              period if any of the following conditions apply:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-6 marker:text-indigo-400">
              <li>
                <strong className="text-slate-200">Technical Defects:</strong>{" "}
                The delivered file is corrupted, inaccessible, or has a
                technical defect that prevents its intended use.
              </li>
              <li>
                <strong className="text-slate-200">Corrupted Archives:</strong>{" "}
                The .ZIP archive cannot be extracted or the PDF files are
                unreadable.
              </li>
              <li>
                <strong className="text-slate-200">Duplicate Charges:</strong>{" "}
                You were charged more than once for the same purchase.
              </li>
              <li>
                <strong className="text-slate-200">Non-Delivery:</strong> You
                did not receive your purchased product after successful payment.
              </li>
              <li>
                <strong className="text-slate-200">
                  Materially Different Product:
                </strong>{" "}
                The delivered product is materially different from its published
                description.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-bold text-slate-100">
              2. How to Request a Refund
            </h2>
            <p>
              To request a refund, please contact our support team at{" "}
              <a
                href="mailto:support@devassets.online"
                className="text-indigo-400 underline hover:text-indigo-300"
              >
                support@devassets.online
              </a>{" "}
              within 14 days of your purchase. Include the following information:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-6 marker:text-indigo-400">
              <li>Your order number or payment confirmation email.</li>
              <li>The product name and date of purchase.</li>
              <li>
                A clear description of the issue (with screenshots if
                applicable).
              </li>
            </ul>
            <p className="mt-3">
              Our support team will make reasonable efforts to investigate the
              issue and provide a replacement file, correction, or other
              appropriate solution. If the issue cannot be resolved within 5
              business days, we will review the refund request and, where
              approved, arrange the refund through the applicable payment
              provider.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-bold text-slate-100">
              3. Non-Refundable Situations
            </h2>
            <p>
              Due to the digital nature of our products, refunds are generally
              not available in the following situations:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-6 marker:text-indigo-400">
              <li>
                Change of mind after the product has been accessed or
                downloaded.
              </li>
              <li>
                The customer did not read the product description before
                purchasing.
              </li>
              <li>
                Incompatibility with the customer&apos;s environment that is not
                related to a product defect.
              </li>
              <li>Requests made after the 14-day refund window.</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-bold text-slate-100">
              4. Refund Processing
            </h2>
            <p>
              Approved refunds are handled through the applicable payment
              provider. The time required for the refunded amount to appear in
              your account may vary depending on the payment method and
              financial institution (typically 5–10 business days).
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-bold text-slate-100">
              5. Payment Disputes
            </h2>
            <p>
              We encourage customers to contact our support team if they
              experience a problem with a purchase. We will review requests
              fairly and respond in accordance with this policy and applicable
              requirements.
            </p>
            <p className="mt-3">
              Nothing in this policy prevents customers from exercising their
              applicable legal rights or using the dispute resolution procedures
              available through their payment provider.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-lg font-bold text-slate-100">
              6. Contact Us
            </h2>
            <p>
              For technical assistance, billing questions, or refund requests,
              please contact our support team:
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
            </div>
          </section>

          <p className="border-t border-slate-800 pt-5 text-xs text-slate-500">
            This policy does not limit any consumer rights that cannot lawfully
            be excluded or restricted under applicable law.
          </p>
        </div>
      </div>
    </article>
  );
}
