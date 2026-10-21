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
        className="block w-full rounded-xl bg-indigo-600 hover:bg-indigo-500 py-3.5 text-center text-sm font-semibold text-white shadow-lg shadow-indigo-600/25 transition-all duration-200 active:scale-[0.98] cursor-pointer"
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
