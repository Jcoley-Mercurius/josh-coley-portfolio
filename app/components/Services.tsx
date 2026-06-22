"use client";

import AnimateIn from "./AnimateIn";
import { Check, ArrowRight, RefreshCw } from "lucide-react";

interface ServicePackage {
  name: string;
  price: string;
  turnaround: string;
  description: string;
  features: string[];
  featured?: boolean;
}

const packages: ServicePackage[] = [
  {
    name: "Business Launch Page",
    price: "$600 – $950",
    turnaround: "5–7 business days",
    description:
      "A polished, mobile-first landing page that makes your business look professional and converts visitors into leads.",
    features: [
      "Custom responsive design",
      "Mobile-optimized and fast-loading",
      "Contact form with email notifications",
      "Basic SEO setup",
      "Deployed with your domain",
      "1 round of revisions",
    ],
  },
  {
    name: "Smart Business Website",
    price: "$1,200 – $1,800",
    turnaround: "10–14 business days",
    description:
      "A complete multi-page website with AI-enhanced forms, analytics, and everything a modern business needs to grow online.",
    features: [
      "3–5 page custom website",
      "AI-enhanced contact or intake form",
      "Google Business integration guidance",
      "Analytics and performance tracking",
      "Social media integration",
      "2 rounds of revisions",
    ],
    featured: true,
  },
  {
    name: "Business Growth Tools",
    price: "$1,800 – $2,800",
    turnaround: "2–3 weeks",
    description:
      "Custom tools and automations that save time, increase efficiency, and help your business scale — built specifically for how you work.",
    features: [
      "Custom quote calculator or intake tool",
      "AI chatbot or smart form integration",
      "Database setup and management",
      "Email automation workflows",
      "Training session included",
      "Ongoing support options",
    ],
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <AnimateIn className="text-center">
          <span className="text-sm font-semibold uppercase tracking-widest text-accent">
            Services
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Clear packages. Honest pricing.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            Fixed-price packages so you know exactly what you&apos;re getting and
            what you&apos;re paying. No hourly surprises. 50% upfront, 50% on
            delivery.
          </p>
        </AnimateIn>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {packages.map((pkg, index) => (
            <AnimateIn key={pkg.name} delay={index * 0.12}>
              <div
                className={`relative flex h-full flex-col rounded-2xl border p-8 transition-all duration-300 hover:shadow-lg ${
                  pkg.featured
                    ? "border-accent bg-white shadow-md shadow-accent/5"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                {pkg.featured && (
                  <span className="absolute -top-3 right-6 rounded-full bg-accent px-4 py-1 text-xs font-semibold text-white">
                    Most Popular
                  </span>
                )}

                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {pkg.name}
                  </h3>
                  <p className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
                    {pkg.price}
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    {pkg.turnaround}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-slate-600">
                    {pkg.description}
                  </p>
                </div>

                <ul className="mt-8 flex-1 space-y-3">
                  {pkg.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2.5 text-sm text-slate-700"
                    >
                      <Check
                        size={16}
                        className="mt-0.5 flex-shrink-0 text-accent"
                        strokeWidth={2}
                      />
                      {feature}
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className={`mt-8 flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all active:scale-[0.98] ${
                    pkg.featured
                      ? "bg-slate-900 text-white hover:bg-slate-800 shadow-lg shadow-slate-900/10"
                      : "border border-slate-300 bg-white text-slate-700 hover:border-slate-400 hover:bg-slate-50"
                  }`}
                >
                  Get Started
                  <ArrowRight size={14} />
                </a>
              </div>
            </AnimateIn>
          ))}
        </div>

        {/* Retainer — separate full-width card */}
        <AnimateIn delay={0.4}>
          <div className="mt-12 rounded-2xl border border-slate-200 bg-gradient-to-r from-slate-50 to-white p-8 transition-all duration-300 hover:shadow-lg sm:p-10">
            <div className="grid items-center gap-8 lg:grid-cols-5 lg:gap-12">
              <div className="lg:col-span-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10">
                    <RefreshCw size={18} className="text-accent" strokeWidth={2} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Monthly Retainer &amp; Ongoing Support
                  </h3>
                </div>
                <p className="mt-4 leading-relaxed text-slate-600">
                  For businesses that need a reliable partner on call — not just
                  a one-time build. I stay involved after launch to keep things
                  running, improving, and growing with your business.
                </p>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {[
                    "Priority support & fast response times",
                    "Small updates, tweaks & improvements",
                    "Monthly strategy check-in call",
                    "Help implementing tools into daily workflows",
                    "Performance monitoring & recommendations",
                    "Discounted rates on larger add-on projects",
                  ].map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2.5 text-sm text-slate-700"
                    >
                      <Check
                        size={16}
                        className="mt-0.5 flex-shrink-0 text-accent"
                        strokeWidth={2}
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col items-start lg:col-span-2 lg:items-center lg:text-center">
                <p className="text-3xl font-bold tracking-tight text-slate-900">
                  $250 – $450
                </p>
                <p className="mt-1 text-sm text-slate-500">per month</p>
                <a
                  href="#contact"
                  className="mt-6 flex items-center gap-2 rounded-full bg-slate-900 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition-all hover:bg-slate-800 hover:shadow-xl active:scale-[0.98]"
                >
                  Discuss a Retainer
                  <ArrowRight size={14} />
                </a>
              </div>
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
