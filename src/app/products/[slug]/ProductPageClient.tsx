"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { Product } from "@/data/products";
import CheckoutModal from "@/components/CheckoutModal";
import { useSession } from "@/lib/auth-client";

export default function ProductPageClient({ product }: { product: Product }) {
  const [showModal, setShowModal] = useState(false);
  const [showLicenseInput, setShowLicenseInput] = useState(false);
  const [licenseKey, setLicenseKey] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [licenseError, setLicenseError] = useState<string | null>(null);
  const [unlockedLicense, setUnlockedLicense] = useState<any>(null);
  const { data: session } = useSession();

  const DEMO_KEY = "DEVASSETS-DEMO-2026";

  useEffect(() => {
    // Check saved license
    const saved = localStorage.getItem("devassets_active_license");
    if (saved) {
      verifyKey(saved, false);
    }
  }, []);

  const verifyKey = async (keyToVerify: string, showError = true) => {
    const key = keyToVerify.trim();
    if (!key) return;

    setIsVerifying(true);
    setLicenseError(null);

    try {
      const res = await fetch("/api/license/redeem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          licenseKey: key,
          userId: session?.user?.id,
        }),
      });

      const data = await res.json();
      if (data.success && data.license) {
        setUnlockedLicense(data.license);
        localStorage.setItem("devassets_active_license", data.license.key);
        setShowLicenseInput(false);
      } else if (showError) {
        setLicenseError(data.message || "Invalid license key.");
      }
    } catch (err: any) {
      if (showError) setLicenseError("Verification failed. Please retry.");
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* If product is unlocked */}
      {unlockedLicense ? (
        <div className="space-y-3 p-4 rounded-xl bg-emerald-950/40 border border-emerald-800/80 animate-fade-in">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
              License Unlocked
            </span>
            <span className="text-[10px] font-mono text-emerald-300/80 bg-emerald-900/50 px-2 py-0.5 rounded">
              {unlockedLicense.key}
            </span>
          </div>

          <a
            href={unlockedLicense.downloadUrl}
            className="block w-full rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 py-3 text-center text-xs sm:text-sm font-bold text-slate-950 shadow-[0_0_25px_rgba(16,185,129,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            📥 Download Full Package (.ZIP)
          </a>

          <Link
            href="/access"
            className="block w-full rounded-xl bg-slate-950 border border-slate-700 py-2.5 text-center text-xs font-semibold text-slate-300 hover:text-white hover:border-slate-500 transition-colors"
          >
            ⚡ Open Live Prompt Playbook & Explorer
          </Link>
        </div>
      ) : (
        /* Standard Purchase CTA */
        <div className="space-y-3">
          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="block w-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 py-3.5 text-center text-sm font-semibold text-white shadow-[0_0_25px_rgba(99,102,241,0.5)] hover:shadow-[0_0_35px_rgba(99,102,241,0.7)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer relative overflow-hidden before:absolute before:inset-0 before:bg-white/10 before:opacity-0 hover:before:opacity-100 before:transition-opacity"
          >
            Buy Now
          </button>

          {/* License Key Quick Unlock */}
          {!showLicenseInput ? (
            <button
              type="button"
              onClick={() => setShowLicenseInput(true)}
              className="w-full text-center text-xs text-indigo-400 hover:text-indigo-300 font-medium py-1 transition-colors cursor-pointer"
            >
              Already have a license key? <span className="underline">Unlock here</span>
            </button>
          ) : (
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2.5 animate-fade-in text-left">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-300">Enter License Key</span>
                <button
                  type="button"
                  onClick={() => setShowLicenseInput(false)}
                  className="text-slate-500 hover:text-slate-300"
                >
                  ✕
                </button>
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={licenseKey}
                  onChange={(e) => setLicenseKey(e.target.value)}
                  placeholder="e.g. DEVASSETS-DEMO-2026"
                  className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs font-mono text-indigo-300 placeholder-slate-600 focus:outline-none focus:border-indigo-500 uppercase"
                />
                <button
                  type="button"
                  onClick={() => verifyKey(licenseKey, true)}
                  disabled={isVerifying}
                  className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all disabled:opacity-50 cursor-pointer"
                >
                  {isVerifying ? "..." : "Unlock"}
                </button>
              </div>

              {/* Demo Key Pill */}
              <button
                type="button"
                onClick={() => {
                  setLicenseKey(DEMO_KEY);
                  verifyKey(DEMO_KEY, true);
                }}
                className="text-[11px] text-amber-300/90 hover:text-amber-200 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <span>⚡ Use Demo Key:</span>
                <code className="bg-amber-950/60 border border-amber-800/60 px-1.5 py-0.2 rounded font-mono text-[10px]">
                  {DEMO_KEY}
                </code>
              </button>

              {licenseError && (
                <p className="text-[11px] text-rose-400">{licenseError}</p>
              )}
            </div>
          )}
        </div>
      )}

      {showModal && (
        <CheckoutModal
          product={product}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
