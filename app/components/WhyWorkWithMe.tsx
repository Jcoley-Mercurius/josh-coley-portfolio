"use client";

import AnimateIn from "./AnimateIn";
import {
  TrendingUp,
  MessageSquare,
  Cpu,
  Package,
} from "lucide-react";

const differentiators = [
  {
    icon: TrendingUp,
    title: "I Think Like a Business Owner",
    description:
      "Years of sales and management experience mean I don't just build what you ask for — I help you figure out what actually moves the needle for your business.",
  },
  {
    icon: MessageSquare,
    title: "You'll Actually Understand Me",
    description:
      "I speak business, not jargon. You'll get clear communication, honest timelines, and no surprises. I treat every project like a partnership, not a transaction.",
  },
  {
    icon: Cpu,
    title: "AI-Enhanced, Not AI-Gimmick",
    description:
      "I use AI tools to build smarter, faster solutions — intelligent forms, automated workflows, and features that genuinely save you time and money.",
  },
  {
    icon: Package,
    title: "End-to-End Delivery",
    description:
      "From strategy and design through development and deployment — one person who owns the whole process. No handoffs, no miscommunication, no dropped balls.",
  },
];

export default function WhyWorkWithMe() {
  return (
    <section className="bg-slate-900 py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <AnimateIn>
          <span className="text-sm font-semibold uppercase tracking-widest text-accent-light">
            Why Work With Me
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Not your typical developer.
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-slate-400">
            Most developers can write code. I bring something different to the
            table.
          </p>
        </AnimateIn>

        <div className="mt-16 grid gap-8 sm:grid-cols-2">
          {differentiators.map((item, index) => (
            <AnimateIn key={item.title} delay={index * 0.1}>
              <div className="rounded-2xl border border-slate-800 bg-slate-800/50 p-8 transition-all duration-300 hover:border-slate-700 hover:bg-slate-800/80">
                <item.icon
                  size={24}
                  className="text-accent-light"
                  strokeWidth={1.5}
                />
                <h3 className="mt-4 text-lg font-bold text-white">
                  {item.title}
                </h3>
                <p className="mt-3 leading-relaxed text-slate-400">
                  {item.description}
                </p>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
