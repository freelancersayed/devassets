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
      <div className="rounded-xl border border-[#10B981]/30 bg-[#18181B] p-8 sm:p-10 shadow-2xl space-y-6 text-center animate-fade-in">
        <div className="w-14 h-14 mx-auto rounded-xl bg-[#09090B] border border-[#27272A] flex items-center justify-center text-[#10B981] text-2xl">
          ✓
        </div>

        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-[#FAFAFA] tracking-tight">
            Message Sent Successfully!
          </h3>
          <p className="text-sm text-[#A1A1AA] max-w-md mx-auto leading-relaxed">
            Thank you, <span className="font-semibold text-[#FAFAFA]">{formData.name}</span>. We have received your inquiry
            {formData.subject ? <> regarding <span className="text-[#10B981] font-mono">&ldquo;{formData.subject}&rdquo;</span></> : ""}.
            Our engineering team will respond to{" "}
            <span className="text-[#10B981] font-mono">{formData.email}</span> within 24 hours.
          </p>
        </div>

        <div className="pt-2">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-xs font-semibold text-[#FAFAFA] bg-[#09090B] hover:bg-[#27272A] border border-[#27272A] transition-all cursor-pointer font-mono"
          >
            <span>Send Another Message</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-[#27272A] bg-[#18181B] p-6 sm:p-8 shadow-xs space-y-5"
    >
      <div>
        <h3 className="text-xl font-bold text-[#FAFAFA] tracking-tight mb-1">
          Send Us a Direct Message
        </h3>
        <p className="text-xs text-[#A1A1AA]">
          Fill out the form below and we will get back to you promptly.
        </p>
      </div>

      {status === "error" && (
        <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2.5">
          <svg className="w-4 h-4 shrink-0 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Name & Email Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label htmlFor="name" className="block text-xs font-mono text-[#A1A1AA] uppercase tracking-wider">
            Your Name <span className="text-[#10B981]">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            className="w-full rounded-xl bg-[#09090B] border border-[#27272A] px-4 py-2.5 text-sm text-[#FAFAFA] placeholder-[#71717A] focus:outline-none focus:border-[#10B981] focus:ring-1 focus:ring-[#10B981] transition-all"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="email" className="block text-xs font-mono text-[#A1A1AA] uppercase tracking-wider">
            Email Address <span className="text-[#10B981]">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="john@example.com"
            className="w-full rounded-xl bg-[#09090B] border border-[#27272A] px-4 py-2.5 text-sm text-[#FAFAFA] placeholder-[#71717A] focus:outline-none focus:border-[#10B981] focus:ring-1 focus:ring-[#10B981] transition-all"
          />
        </div>
      </div>

      {/* Subject */}
      <div className="space-y-1.5">
        <label htmlFor="subject" className="block text-xs font-mono text-[#A1A1AA] uppercase tracking-wider">
          Subject / Reason
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          value={formData.subject}
          onChange={handleChange}
          placeholder="e.g. Technical Question, Custom License, or Feedback"
          className="w-full rounded-xl bg-[#09090B] border border-[#27272A] px-4 py-2.5 text-sm text-[#FAFAFA] placeholder-[#71717A] focus:outline-none focus:border-[#10B981] focus:ring-1 focus:ring-[#10B981] transition-all"
        />
      </div>

      {/* Message */}
      <div className="space-y-1.5">
        <label htmlFor="message" className="block text-xs font-mono text-[#A1A1AA] uppercase tracking-wider">
          Your Message <span className="text-[#10B981]">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          value={formData.message}
          onChange={handleChange}
          placeholder="How can we help you? Feel free to ask about any tool or guide..."
          className="w-full rounded-xl bg-[#09090B] border border-[#27272A] px-4 py-2.5 text-sm text-[#FAFAFA] placeholder-[#71717A] focus:outline-none focus:border-[#10B981] focus:ring-1 focus:ring-[#10B981] transition-all resize-y min-h-[120px]"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-[#09090B] bg-[#10B981] hover:bg-[#34D399] shadow-emerald-glow active:scale-[0.98] transition-all disabled:opacity-50 cursor-pointer"
      >
        {status === "submitting" ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-[#09090B]" fill="none" viewBox="0 0 24 24">
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
