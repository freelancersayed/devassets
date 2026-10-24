import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-indigo-400">
        404 Error
      </div>
      <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
        Page Not Found
      </h1>
      <p className="mt-4 max-w-md text-base text-slate-400">
        The page you are looking for doesn't exist or has been moved. Explore our tools or return to the home page.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 transition-all hover:bg-indigo-500 hover:scale-[1.02] active:scale-[0.98]"
        >
          Back to Homepage
        </Link>
        <Link
          href="/#tools"
          className="inline-flex items-center justify-center rounded-xl border border-slate-800 bg-slate-900/80 px-5 py-2.5 text-sm font-semibold text-slate-200 transition-all hover:border-slate-700 hover:bg-slate-850"
        >
          Explore Free Tools
        </Link>
      </div>
    </div>
  );
}
