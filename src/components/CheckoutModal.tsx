"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import type { Product } from "@/data/products";
import { useSession } from "@/lib/auth-client";

interface CheckoutModalProps {
  product: Product;
  onClose: () => void;
}

/**
 * Maps catalog product slugs/identifiers to FastSpring product paths
 */
function getFastSpringProductId(product: Product): string {
  if (
    product.slug === "fullstack-system-architecture-prompts" ||
    product.id === 201
  ) {
    return "prod_fullstack_arch_prompts";
  }
  return product.slug;
}

/**
 * Retrieves the current session user ID or initializes a persistent guest ID
 */
function getEffectiveSessionId(authenticatedUserId?: string | null): string {
  if (authenticatedUserId) {
    return authenticatedUserId;
  }

  if (typeof window !== "undefined") {
    let guestSessionId = localStorage.getItem("devassets_session_id");
    if (!guestSessionId) {
      guestSessionId =
        "usr_" +
        (typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID().replace(/-/g, "").slice(0, 24)
          : Date.now().toString(16) + Math.random().toString(16).slice(2, 10));
      localStorage.setItem("devassets_session_id", guestSessionId);
    }
    return guestSessionId;
  }

  return "guest_session_id";
}

export default function CheckoutModal({ product, onClose }: CheckoutModalProps) {
  const [agreed, setAgreed] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { data: session } = useSession();

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  const handleCheckout = () => {
    if (!agreed || isProcessing) return;

    setIsProcessing(true);
    const currentSessionId = getEffectiveSessionId(session?.user?.id);
    const fastspringProductId = getFastSpringProductId(product);

    // FastSpring Popup Storefront JavaScript SDK integration
    if (typeof window !== "undefined" && window.fastspring?.builder) {
      try {
        // Push user's session ID into checkout tags
        window.fastspring.builder.tag({
          referrerAccountId: currentSessionId,
        });

        // Clear previous state and launch checkout popup
        window.fastspring.builder.reset();
        window.fastspring.builder.push({
          products: [
            {
              path: fastspringProductId,
              quantity: 1,
            },
          ],
          tags: {
            referrerAccountId: currentSessionId,
          },
          checkout: true,
        });

        // Close local modal once FastSpring overlay takes over
        setTimeout(() => {
          setIsProcessing(false);
          onClose();
        }, 800);
      } catch (err) {
        console.error("[FastSpring] Checkout initiation error:", err);
        setIsProcessing(false);
      }
    } else {
      // Fallback: Direct redirect if Popup SDK script hasn't completed loading
      const storefrontDomain =
        process.env.NEXT_PUBLIC_FASTSPRING_STOREFRONT ||
        "devassets.test.onfastspring.com";

      const checkoutUrl = `https://${storefrontDomain.replace(
        /\/$/,
        ""
      )}/${encodeURIComponent(
        fastspringProductId
      )}?tags[referrerAccountId]=${encodeURIComponent(currentSessionId)}`;

      window.open(checkoutUrl, "_blank", "noopener,noreferrer");
      setIsProcessing(false);
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Checkout for ${product.title}`}
    >
      <div
        className="relative w-full max-w-lg bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-8 animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close checkout modal"
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Header */}
        <h2 className="text-xl font-bold text-slate-50 mb-1">
          Order Summary
        </h2>
        <p className="text-xs text-slate-500 mb-6">
          Review your order before proceeding to secure checkout.
        </p>

        {/* Account Association Indicator */}
        <div className="mb-4 flex items-center justify-between rounded-lg bg-slate-950/80 px-3.5 py-2.5 border border-slate-800 text-xs">
          <span className="text-slate-400">Account:</span>
          {session?.user ? (
            <span className="font-medium text-emerald-400 flex items-center gap-1.5 truncate max-w-[240px]">
              <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
              {session.user.email}
            </span>
          ) : (
            <span className="text-indigo-400 flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-indigo-400"></span>
              Guest Session (Instant License Allocation)
            </span>
          )}
        </div>

        {/* Product details */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 mb-6">
          <div className="flex items-start gap-4">
            <span className="text-3xl">{product.emoji}</span>
            <div className="flex-1">
              <h3 className="font-bold text-slate-100 text-sm">
                {product.title}
              </h3>
              <p className="text-xs text-slate-500 mt-1">{product.categoryLabel || product.category}</p>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-800">
            <p className="text-xs font-semibold text-slate-400 mb-2">
              Included in this package:
            </p>
            <ul className="space-y-1.5">
              {product.deliverables.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-xs text-slate-300"
                >
                  <svg
                    className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-baseline justify-between mb-6">
          <span className="text-sm text-slate-400">Total</span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-50">
              ${product.price}
            </span>
            <span className="text-xs font-semibold text-indigo-400">USD</span>
          </div>
        </div>

        {/* Terms agreement checkbox */}
        <label className="flex items-start gap-3 mb-6 cursor-pointer group">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-1 h-4 w-4 rounded border-slate-600 bg-slate-800 text-indigo-500 focus:ring-indigo-500 focus:ring-offset-slate-900 cursor-pointer accent-indigo-500"
          />
          <span className="text-xs text-slate-400 leading-relaxed">
            I have read and agree to the{" "}
            <Link
              href="/terms"
              target="_blank"
              className="text-indigo-400 underline hover:text-indigo-300"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/refund"
              target="_blank"
              className="text-indigo-400 underline hover:text-indigo-300"
            >
              Refund Policy
            </Link>
            .
          </span>
        </label>

        {/* Checkout button */}
        <button
          type="button"
          onClick={handleCheckout}
          disabled={!agreed || isProcessing}
          className={`w-full py-3.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 shadow-lg flex items-center justify-center gap-2 ${
            agreed && !isProcessing
              ? "bg-indigo-600 hover:bg-indigo-500 shadow-indigo-600/25 active:scale-[0.98] cursor-pointer"
              : "bg-slate-700 text-slate-400 cursor-not-allowed shadow-none"
          }`}
        >
          {isProcessing ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
              Connecting to FastSpring...
            </>
          ) : (
            "Proceed to Checkout"
          )}
        </button>

        <p className="text-center text-[10px] text-slate-600 mt-3">
          🔒 256-bit SSL encrypted • FastSpring Global Merchant of Record
        </p>
      </div>
    </div>
  );
}
