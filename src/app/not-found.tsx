import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <div className="inline-flex items-center gap-2 rounded-full border border-[#10B981]/30 bg-[#10B981]/10 px-3.5 py-1 text-xs font-mono font-semibold uppercase tracking-wider text-[#10B981]">
        404 Error
      </div>
      <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-[#FAFAFA] sm:text-5xl">
        Page Not Found
      </h1>
      <p className="mt-4 max-w-md text-base text-[#A1A1AA]">
        The page you are looking for doesn't exist or has been moved. Explore our tools or return to the home page.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-xl bg-[#10B981] px-5 py-2.5 text-sm font-semibold text-[#09090B] shadow-lg shadow-[#10B981]/20 transition-all hover:bg-[#34D399] hover:scale-[1.02] active:scale-[0.98]"
        >
          Back to Homepage
        </Link>
        <Link
          href="/#tools"
          className="inline-flex items-center justify-center rounded-xl border border-[#27272A] bg-[#18181B] px-5 py-2.5 text-sm font-semibold text-[#FAFAFA] transition-all hover:border-[#10B981]/50"
        >
          Explore Free Tools
        </Link>
      </div>
    </div>
  );
}
