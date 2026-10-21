"use client";

import { useState } from "react";
import type { Product } from "@/data/products";
import CheckoutModal from "@/components/CheckoutModal";

export default function ProductPageClient({ product }: { product: Product }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setShowModal(true)}
        className="block w-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 py-3.5 text-center text-sm font-semibold text-white shadow-[0_0_25px_rgba(99,102,241,0.5)] hover:shadow-[0_0_35px_rgba(99,102,241,0.7)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer relative overflow-hidden before:absolute before:inset-0 before:bg-white/10 before:opacity-0 hover:before:opacity-100 before:transition-opacity"
      >
        Buy Now
      </button>

      {showModal && (
        <CheckoutModal
          product={product}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}
