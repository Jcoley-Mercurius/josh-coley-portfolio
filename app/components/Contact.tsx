"use client";

import { useState } from "react";
import AnimateIn from "./AnimateIn";
import { Send, Mail, MapPin } from "lucide-react";
import { toast, Toaster } from "sonner";

// ──────────────────────────────────────────────────────────
// Web3Forms configuration
// Replace this key with your own from https://web3forms.com
// ──────────────────────────────────────────────────────────
const WEB3FORMS_ACCESS_KEY = "6206acf4-0a87-47e5-9631-0bccab7b3a31";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    service: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const payload = new FormData();
      payload.append("access_key", WEB3FORMS_ACCESS_KEY);
      payload.append("subject", `Portfolio Inquiry: ${formData.name}`);
      payload.append("from_name", "Joshua Coley Portfolio");
      payload.append("replyto", formData.email);

      // Anti-spam fields
      payload.append("botcheck", "");

      // Form fields
      Object.entries(formData).forEach(([key, value]) => {
        if (value) payload.append(key, value);
      });

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: payload,
      });
      const data = await response.json();

      if (data.success) {
        toast.success("Message sent! I'll get back to you within 24 hours.");
        setFormData({
          name: "",
          email: "",
          company: "",
          service: "",
          message: "",
        });
      } else {
        toast.error("Something went wrong. Please try again or email me directly.");
      }
    } catch {
      toast.error("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 lg:py-32">
      <Toaster position="top-right" richColors />
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-16 lg:grid-cols-5 lg:gap-20">
          {/* Left — Info */}
          <AnimateIn className="lg:col-span-2">
            <span className="text-sm font-semibold uppercase tracking-widest text-accent">
              Get in Touch
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Let&apos;s build
              <br />
              something great.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              Have a project in mind? Tell me about your business and what
              you&apos;re looking to achieve. I&apos;ll get back to you within
              24 hours with an honest assessment of how I can help.
            </p>

            <div className="mt-10 space-y-5">
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100">
                  <Mail size={16} className="text-slate-500" />
                </div>
                <a
                  href="mailto:jcoley@mercuriusmarketplace.com"
                  className="link-underline transition-colors hover:text-slate-900"
                >
                  jcoley@mercuriusmarketplace.com
                </a>
              </div>

              <div className="flex items-center gap-3 text-sm text-slate-600">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100">
                  <MapPin size={16} className="text-slate-500" />
                </div>
                <span>Cape Coral, Florida</span>
              </div>
            </div>
          </AnimateIn>

          {/* Right — Form */}
          <AnimateIn delay={0.15} className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="space-y-5 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10"
            >
              {/* Anti-spam honeypot — hidden from real users */}
              <div className="absolute" style={{ left: "-9999px" }}>
                <input
                  type="text"
                  name="botcheck_honeypot"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-1.5 block text-sm font-medium text-slate-700"
                  >
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Smith"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-800 transition-all placeholder:text-slate-400 focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-1.5 block text-sm font-medium text-slate-700"
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@company.com"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-800 transition-all placeholder:text-slate-400 focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="company"
                    className="mb-1.5 block text-sm font-medium text-slate-700"
                  >
                    Company / Business
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Your business name"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-800 transition-all placeholder:text-slate-400 focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none"
                  />
                </div>

                <div>
                  <label
                    htmlFor="service"
                    className="mb-1.5 block text-sm font-medium text-slate-700"
                  >
                    Interested In
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 transition-all focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none"
                  >
                    <option value="">Select a service...</option>
                    <option value="Business Launch Page">
                      Business Launch Page
                    </option>
                    <option value="Smart Business Website">
                      Smart Business Website
                    </option>
                    <option value="Business Growth Tools">
                      Business Growth Tools
                    </option>
                    <option value="Other">Something else</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-1.5 block text-sm font-medium text-slate-700"
                >
                  Tell me about your project *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="What does your business do? What are you looking to build? Any specific goals or timeline?"
                  className="w-full resize-y rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-800 transition-all placeholder:text-slate-400 focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-slate-900 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition-all hover:bg-slate-800 hover:shadow-xl active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                {submitting ? (
                  "Sending..."
                ) : (
                  <>
                    Send Message
                    <Send size={14} />
                  </>
                )}
              </button>
            </form>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}
