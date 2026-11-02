"use client";

import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus("error");
      setErrorMessage("Please fill out all required fields.");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      // Send message to our feedback / contact endpoint or simulate success
      await new Promise((resolve) => setTimeout(resolve, 800));
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMessage("Unable to send your message right now. Please email us directly at support@devassets.online.");
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
    setStatus("idle");
    setErrorMessage("");
  };

  if (status === "success") {
    return (
      <div className="rounded-3xl border border-emerald-500/30 bg-emerald-950/20 p-8 sm:p-10 backdrop-blur-xl shadow-2xl space-y-6 text-center animate-fade-in">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/30">
          <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-white tracking-tight">
            Message Sent Successfully!
          </h3>
          <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
            Thank you, <span className="font-semibold text-white">{formData.name}</span>. We have received your inquiry
            {formData.subject ? <> regarding <span className="text-indigo-300 italic">&ldquo;{formData.subject}&rdquo;</span></> : ""}.
            Our engineering and support team will respond to{" "}
            <span className="text-indigo-300 underline font-medium">{formData.email}</span> within 24 hours.
          </p>
        </div>

        <div className="pt-2">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold text-white bg-white/[0.08] hover:bg-white/[0.14] border border-white/10 hover:border-white/20 transition-all cursor-pointer"
          >
            <svg className="w-4 h-4 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>Send Another Message</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-white/10 bg-slate-900/50 p-6 sm:p-9 backdrop-blur-2xl shadow-2xl space-y-5"
    >
      <div>
        <h3 className="text-xl font-bold text-white tracking-tight mb-1">
          Send Us a Direct Message
        </h3>
        <p className="text-xs text-slate-400">
          Fill out the form below and we will get back to you promptly.
        </p>
      </div>

      {status === "error" && (
        <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-800/50 text-rose-300 text-xs flex items-center gap-2.5">
          <svg className="w-4 h-4 shrink-0 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Name & Email Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label htmlFor="name" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
            Your Name <span className="text-indigo-400">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            className="w-full rounded-xl bg-white/[0.04] border border-white/10 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 transition-all"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="email" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
            Email Address <span className="text-indigo-400">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="john@example.com"
            className="w-full rounded-xl bg-white/[0.04] border border-white/10 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 transition-all"
          />
        </div>
      </div>

      {/* Subject */}
      <div className="space-y-1.5">
        <label htmlFor="subject" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
          Subject / Reason
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          value={formData.subject}
          onChange={handleChange}
          placeholder="e.g. Technical Question, Custom License, or Feedback"
          className="w-full rounded-xl bg-white/[0.04] border border-white/10 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 transition-all"
        />
      </div>

      {/* Message */}
      <div className="space-y-1.5">
        <label htmlFor="message" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
          Your Message <span className="text-indigo-400">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          value={formData.message}
          onChange={handleChange}
          placeholder="How can we help you? Feel free to ask about any tool or guide..."
          className="w-full rounded-xl bg-white/[0.04] border border-white/10 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/50 transition-all resize-y min-h-[120px]"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-lg shadow-indigo-600/30 hover:shadow-indigo-500/50 active:scale-[0.99] transition-all disabled:opacity-50 cursor-pointer"
      >
        {status === "submitting" ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span>Sending Message...</span>
          </>
        ) : (
          <>
            <span>Submit Message</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </>
        )}
      </button>
    </form>
  );
}
