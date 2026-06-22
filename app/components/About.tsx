"use client";

import AnimateIn from "./AnimateIn";
import { Briefcase, Rocket, Users } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-16 lg:grid-cols-5 lg:gap-20">
          {/* Left column — Label */}
          <AnimateIn className="lg:col-span-2">
            <span className="text-sm font-semibold uppercase tracking-widest text-accent">
              About Me
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Business first.
              <br />
              Technology second.
            </h2>
          </AnimateIn>

          {/* Right column — Story */}
          <div className="space-y-6 lg:col-span-3">
            <AnimateIn delay={0.1}>
              <p className="text-lg leading-relaxed text-slate-600">
                I spent years in sales and management before I ever touched
                code — closing deals, managing teams, and solving the kinds
                of problems that keep business owners up at night. That
                background isn&apos;t a footnote on my resume. It&apos;s the
                reason my work is different.
              </p>
            </AnimateIn>

            <AnimateIn delay={0.2}>
              <p className="text-lg leading-relaxed text-slate-600">
                I&apos;m the Founder of{" "}
                <strong className="text-slate-800">Mercurius Solutions</strong>,
                an AI-powered marketplace connecting homeowners with trusted
                service providers across Southwest Florida. I set the vision,
                drive the product strategy, and work alongside a development
                team to bring it to life. Building a real company from scratch
                gives me a perspective most freelancers simply don&apos;t
                have.
              </p>
            </AnimateIn>

            <AnimateIn delay={0.3}>
              <p className="text-lg leading-relaxed text-slate-600">
                When I take on a project, I don&apos;t just ask what you want
                built — I ask what problem you&apos;re trying to solve and
                what outcome you need. That&apos;s the difference between a
                developer who writes code and a partner who delivers results.
              </p>
            </AnimateIn>

            {/* Highlights */}
            <AnimateIn delay={0.4}>
              <div className="mt-10 grid gap-6 sm:grid-cols-3">
                <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-5">
                  <Briefcase
                    size={20}
                    className="mb-3 text-accent"
                    strokeWidth={1.5}
                  />
                  <p className="text-sm font-semibold text-slate-900">
                    Sales &amp; Management
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    I know how to close deals and deliver
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-5">
                  <Rocket
                    size={20}
                    className="mb-3 text-accent"
                    strokeWidth={1.5}
                  />
                  <p className="text-sm font-semibold text-slate-900">
                    Startup Founder
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    Building Mercurius Solutions
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50/50 p-5">
                  <Users
                    size={20}
                    className="mb-3 text-accent"
                    strokeWidth={1.5}
                  />
                  <p className="text-sm font-semibold text-slate-900">
                    Client-First Approach
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    Your business goals drive every decision
                  </p>
                </div>
              </div>
            </AnimateIn>
          </div>
        </div>
      </div>
    </section>
  );
}
