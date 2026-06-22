"use client";

import AnimateIn from "./AnimateIn";
import { ArrowUpRight } from "lucide-react";

interface Project {
  title: string;
  subtitle: string;
  role: string;
  description: string;
  technologies: string[];
  status: "Live" | "In Progress";
  link?: string;
  highlights: string[];
}

const projects: Project[] = [
  {
    title: "Mercurius Solutions",
    subtitle: "AI-Powered Home Services Marketplace",
    role: "Founder & Product Strategist",
    description:
      "I founded Mercurius Solutions to build Southwest Florida's first AI-powered marketplace connecting homeowners with trusted local service providers. I drive the product vision, business strategy, and go-to-market plan while collaborating with a development team on the technical build.",
    technologies: [
      "Product Strategy",
      "Next.js",
      "Supabase",
      "AI/ML",
      "Vercel",
    ],
    status: "In Progress",
    link: "https://mercuriusmarketplace.com",
    highlights: [
      "Defined product vision and marketplace business model",
      "Designed the vendor onboarding flow and consumer experience",
      "Leading go-to-market strategy for Cape Coral & Fort Myers launch",
    ],
  },
  {
    title: "Vendor Application Portal",
    subtitle: "Smart Intake Form with Anti-Spam Protection",
    role: "Developer",
    description:
      "A polished, multi-step vendor application form with intelligent validation, file uploads, and Web3Forms integration for reliable email delivery. Built to convert — not just collect data.",
    technologies: [
      "HTML5",
      "Tailwind CSS",
      "JavaScript",
      "Web3Forms",
      "Vercel",
    ],
    status: "Live",
    link: "https://applymercurius.com",
    highlights: [
      "5-step guided application with real-time validation",
      "Anti-spam honeypot and bot detection",
      "Mobile-first responsive design",
    ],
  },
  {
    title: "Smart Quote Tool",
    subtitle: "AI-Enhanced Service Pricing Calculator",
    role: "Developer",
    description:
      "An intelligent quoting tool that helps service providers generate accurate, professional quotes for homeowners. Integrates with the Mercurius platform to streamline the booking process.",
    technologies: [
      "Next.js",
      "TypeScript",
      "Supabase",
      "AI Integration",
    ],
    status: "In Progress",
    highlights: [
      "Dynamic pricing based on service type and scope",
      "Professional PDF quote generation",
      "Database-backed for analytics and follow-up",
    ],
  },
];

export default function FeaturedWork() {
  return (
    <section id="work" className="bg-slate-50/70 py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <AnimateIn>
          <span className="text-sm font-semibold uppercase tracking-widest text-accent">
            Featured Work
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Projects I&apos;m building
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-slate-600">
            Real solutions for real businesses — not just code exercises.
            Every project is designed to solve a genuine business problem.
          </p>
        </AnimateIn>

        <div className="mt-16 space-y-12">
          {projects.map((project, index) => (
            <AnimateIn key={project.title} delay={index * 0.15}>
              <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md">
                <div className="p-8 sm:p-10">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3">
                        <h3 className="text-xl font-bold text-slate-900 sm:text-2xl">
                          {project.title}
                        </h3>
                        <span
                          className={`rounded-full px-3 py-0.5 text-xs font-medium ${
                            project.status === "Live"
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-amber-50 text-amber-700"
                          }`}
                        >
                          {project.status}
                        </span>
                      </div>
                      <p className="mt-1 text-sm font-medium text-slate-500">
                        {project.subtitle}
                      </p>
                      <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-accent">
                        {project.role}
                      </p>
                    </div>

                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition-all hover:border-slate-300 hover:bg-slate-50"
                      >
                        Visit Site
                        <ArrowUpRight
                          size={14}
                          className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                      </a>
                    )}
                  </div>

                  <p className="mt-5 max-w-3xl leading-relaxed text-slate-600">
                    {project.description}
                  </p>

                  {/* Highlights */}
                  <ul className="mt-6 space-y-2">
                    {project.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="flex items-start gap-2.5 text-sm text-slate-600"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                        {highlight}
                      </li>
                    ))}
                  </ul>

                  {/* Tech stack */}
                  <div className="mt-8 flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
