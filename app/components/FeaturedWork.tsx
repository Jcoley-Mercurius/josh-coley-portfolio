"use client";

import AnimateIn from "./AnimateIn";
import { ArrowUpRight } from "lucide-react";

interface ComingSoonFeature {
  name: string;
  description: string;
}

interface Project {
  title: string;
  subtitle: string;
  role: string;
  roleNote?: string;
  description: string;
  technologies: string[];
  status: "Live" | "In Progress";
  link?: string;
  highlights: string[];
  myRole?: string[];
  whatBuilt?: { name: string; description: string }[];
  whatComing?: ComingSoonFeature[];
  vision?: string;
}

const projects: Project[] = [
  {
    title: "Mercurius Solutions",
    subtitle: "AI-Powered Home Services Marketplace",
    role: "Founder / Product Strategy / UX Direction",
    roleNote: "Built in collaboration with a development partner.",
    description:
      "Mercurius is an AI-powered marketplace connecting homeowners, HOAs, and property managers with vetted local service providers. I founded the company to solve a real fragmentation problem in the home services industry — consumers have no single trusted place to discover, compare, and book, and vendors have no smart tooling to manage and grow their business. Phase 1 is actively being built, targeting the Southwest Florida market as the proving ground before a national rollout.",
    technologies: [
      "Product Strategy",
      "Next.js",
      "TypeScript",
      "Supabase",
      "AI/ML",
      "Vercel",
    ],
    status: "In Progress",
    link: "https://mercuriusmarketplace.com",
    highlights: [],
    myRole: [
      "Define the product roadmap and decide what gets built and when",
      "Design the consumer and vendor experience end-to-end",
      "Conduct market research and validate use cases with real service providers",
      "Manage a development partner handling the technical implementation",
      "Guide the business model, pricing structure, and go-to-market strategy",
    ],
    whatBuilt: [
      {
        name: "Professional Vendor Intake Form",
        description:
          "Rebuilt the vendor onboarding experience from a basic HTML form into a polished 5-step wizard built with Next.js, TypeScript, Tailwind CSS, and Framer Motion. Vendors are guided through Business Basics, Contact Info, Service Area, Credentials, and a full Review step — with inline education, smart quick-pick service chips, validation, and a branded success screen. Ready to deploy at applymercurius.com.",
      },
      {
        name: "Consumer-Facing Marketplace",
        description:
          "Homeowners can browse and connect with vetted local vendors through the live marketplace at mercuriusmarketplace.com.",
      },
    ],
    whatComing: [
      {
        name: "Quote Request Tool",
        description:
          "A structured intake flow allowing consumers to describe their project and receive quotes directly from matched vendors.",
      },
      {
        name: "Service Bundles",
        description:
          "Packaged service offerings that let vendors increase average order value and give consumers a simpler booking experience.",
      },
      {
        name: "B2B Property Manager Dashboard",
        description:
          "A dedicated portal for HOAs and property managers to submit, track, and manage service requests across multiple properties.",
      },
      {
        name: "Re-imagine™",
        description:
          "A visualization tool that lets homeowners upload a photo of their home and preview design or renovation ideas before committing to a project — reducing friction in the decision-making process.",
      },
      {
        name: "Route Optimizer",
        description:
          "An AI scheduling assistant for vendors that suggests optimized daily routes and appointment windows, reducing drive time and increasing job capacity.",
      },
    ],
    vision:
      "Phase 1 is the proof of concept. SWFL is the launchpad. The long-term vision is a multi-sector national marketplace — a trusted, AI-assisted platform connecting consumers with quality service providers across categories.",
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
                  {/* Header */}
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
                          {project.status === "In Progress" && project.whatBuilt
                            ? "In Active Development — Phase 1"
                            : project.status}
                        </span>
                      </div>
                      <p className="mt-1 text-sm font-medium text-slate-500">
                        {project.subtitle}
                      </p>
                      <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-accent">
                        {project.role}
                      </p>
                      {project.roleNote && (
                        <p className="mt-0.5 text-xs italic text-slate-400">
                          {project.roleNote}
                        </p>
                      )}
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

                  {/* Overview */}
                  <p className="mt-5 max-w-3xl leading-relaxed text-slate-600">
                    {project.description}
                  </p>

                  {/* My Role — only shown when myRole is present */}
                  {project.myRole && project.myRole.length > 0 && (
                    <div className="mt-8">
                      <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-900">
                        My Role
                      </h4>
                      <ul className="mt-3 space-y-2">
                        {project.myRole.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2.5 text-sm text-slate-600"
                          >
                            <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* What's Been Built — only shown when whatBuilt is present */}
                  {project.whatBuilt && project.whatBuilt.length > 0 && (
                    <div className="mt-8">
                      <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-900">
                        What&apos;s Been Built
                      </h4>
                      <div className="mt-3 grid gap-3 sm:grid-cols-2">
                        {project.whatBuilt.map((item) => (
                          <div
                            key={item.name}
                            className="rounded-xl border border-slate-100 bg-slate-50 p-4"
                          >
                            <p className="text-sm font-semibold text-slate-800">
                              {item.name}
                            </p>
                            <p className="mt-1 text-xs leading-relaxed text-slate-500">
                              {item.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* What's Coming — only shown when whatComing is present */}
                  {project.whatComing && project.whatComing.length > 0 && (
                    <div className="mt-8">
                      <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-900">
                        What&apos;s Coming
                      </h4>
                      <div className="mt-3 grid gap-3 sm:grid-cols-2">
                        {project.whatComing.map((item) => (
                          <div
                            key={item.name}
                            className="rounded-xl border border-amber-100 bg-amber-50/60 p-4"
                          >
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-semibold text-slate-800">
                                {item.name}
                              </p>
                              <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700">
                                Planned
                              </span>
                            </div>
                            <p className="mt-1 text-xs leading-relaxed text-slate-500">
                              {item.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Vision statement — only shown when vision is present */}
                  {project.vision && (
                    <blockquote className="mt-8 border-l-2 border-accent pl-4 text-sm italic leading-relaxed text-slate-500">
                      {project.vision}
                    </blockquote>
                  )}

                  {/* Standard highlights — only shown when no rich sections are present */}
                  {project.highlights.length > 0 && (
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
                  )}

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
