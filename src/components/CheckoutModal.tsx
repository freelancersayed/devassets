"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import type { Product } from "@/data/products";

interface CheckoutModalProps {
  product: Product;
  onClose: () => void;
}

export default function CheckoutModal({ product, onClose }: CheckoutModalProps) {
  const [agreed, setAgreed] = useState(false);

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
    if (!agreed) return;
    // Configurable checkout action — replace with your payment processor integration
    alert(
      `Checkout initiated for "${product.title}" at $${product.price} USD.\n\nIntegrate your payment processor (e.g., FastSpring, Paddle, or Lemon Squeezy) here.`
    );
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
          Review your order before proceeding to checkout.
        </p>

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
          disabled={!agreed}
          className={`w-full py-3.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 shadow-lg ${
            agreed
              ? "bg-indigo-600 hover:bg-indigo-500 shadow-indigo-600/25 active:scale-[0.98] cursor-pointer"
              : "bg-slate-700 text-slate-400 cursor-not-allowed shadow-none"
          }`}
        >
          Proceed to Checkout
        </button>

        <p className="text-center text-[10px] text-slate-600 mt-3">
          🔒 256-bit SSL encrypted • Secure payment processing
        </p>
      </div>
    </div>
  );
}
