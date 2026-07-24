"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative flex items-center overflow-hidden pb-20 pt-28 sm:pb-24 sm:pt-32 lg:pb-28 lg:pt-32">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-warm-50" />

      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Left: Copy */}
          <div>
            <motion.div
              initial={
                shouldReduceMotion
                  ? false
                  : { opacity: 0, y: 16, filter: "blur(5px)" }
              }
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            >
              <span className="inline-flex items-center gap-2.5 rounded-full border border-emerald-200/80 bg-emerald-50/80 px-4 py-2 text-xs font-semibold tracking-wide text-emerald-800 shadow-sm shadow-emerald-900/5 ring-1 ring-inset ring-white/70">
                <span className="relative flex h-2 w-2">
                  <span className="availability-dot-glow absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-50" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                Available for new projects
              </span>
            </motion.div>

            <motion.h1
              initial={
                shouldReduceMotion
                  ? false
                  : { opacity: 0, y: 22, filter: "blur(8px)" }
              }
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                duration: 0.65,
                delay: 0.1,
                ease: [0.4, 0, 0.2, 1],
              }}
              className="mt-5 text-4xl font-bold leading-[1.08] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl"
            >
              I build websites
              <br />
              <span className="text-balance">
                that{" "}
                <span className="font-display italic text-accent">
                  grow businesses.
                </span>
              </span>
            </motion.h1>

            <motion.p
              initial={
                shouldReduceMotion
                  ? false
                  : { opacity: 0, y: 18, filter: "blur(6px)" }
              }
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                duration: 0.6,
                delay: 0.22,
                ease: [0.4, 0, 0.2, 1],
              }}
              className="mt-5 max-w-lg text-lg leading-relaxed text-slate-600"
            >
              AI-powered websites and business tools for small businesses and
              service companies. I combine real business experience with modern
              development to deliver solutions that actually drive results.
            </motion.p>

            <motion.div
              initial={
                shouldReduceMotion
                  ? false
                  : { opacity: 0, y: 14, filter: "blur(4px)" }
              }
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                duration: 0.55,
                delay: 0.34,
                ease: [0.4, 0, 0.2, 1],
              }}
              className="mt-7 flex flex-wrap items-center gap-3"
            >
              <a
                href="#contact"
                className="btn-primary rounded-full bg-slate-900 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/10 transition-all hover:bg-slate-800 hover:shadow-xl hover:shadow-slate-900/15 active:scale-[0.98]"
              >
                Start a Project
              </a>
              <a
                href="#work"
                className="rounded-full border border-slate-300 bg-white px-7 py-3 text-sm font-semibold text-slate-700 transition-all hover:border-slate-400 hover:bg-slate-50 active:scale-[0.98]"
              >
                View My Work
              </a>
            </motion.div>
          </div>

          {/* Right: Professional headshot */}
          <motion.div
            initial={
              shouldReduceMotion ? false : { opacity: 0, y: 16, scale: 0.98 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.7,
              delay: 0.2,
              ease: [0.4, 0, 0.2, 1],
            }}
            className="relative mx-auto w-full max-w-md lg:mx-0"
          >
            <div className="aspect-[4/5] overflow-hidden rounded-3xl bg-gradient-to-br from-slate-200 to-slate-300 shadow-2xl shadow-slate-900/10 ring-1 ring-slate-900/5">
              <Image
                src="/headshot.jpg"
                alt="Joshua Coley — Founder of Mercurius Solutions"
                width={800}
                height={1000}
                className="h-full w-full object-cover"
                priority
              />
            </div>

            {/* Decorative element */}
            <div className="absolute -bottom-4 -right-4 -z-10 h-full w-full rounded-3xl border-2 border-slate-200" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
