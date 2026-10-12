import Link from "next/link";
import { projects } from "../_lib/project-records";
import type { InquiryService } from "../_lib/inquiry";

// Site footer: brand block, three link columns and a bottom bar. Every entry
// points at content the site already has; there are no policy pages, social
// profiles or public email address to link yet, so none are listed.

const services: { service: InquiryService; label: string }[] = [
  { service: "website", label: "Business websites" },
  { service: "booking", label: "Booking experiences" },
  { service: "saas", label: "SaaS & portals" },
  { service: "marketplace", label: "Marketplaces" },
];

const studio = [
  { label: "Selected work", href: "/#work" },
  { label: "What we build", href: "/#services" },
  { label: "Approach", href: "/#approach" },
  { label: "About", href: "/#about" },
  { label: "Start a project", href: "/#contact" },
];

const columnTitle = "eyebrow block";
const columnList = "mt-5 grid gap-3 text-sm";
const columnLink = "text-ink/80 hover:text-bronze";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-paper">
      <div className="mx-auto max-w-content px-[6%] pt-[45px] pb-[30px] tablet:px-[5%] tablet:pt-[70px]">
        <div className="grid gap-10 tablet:grid-cols-2 desktop:grid-cols-[1.4fr_1fr_1fr_1fr] desktop:gap-[30px]">
          <div className="max-w-[340px]">
            <Link
              href="/"
              aria-label="Mercurius Solutions home"
              className="inline-block font-display text-[19px] leading-[1.1] tracking-[0.14em] desktop:text-2xl"
            >
              MERCURIUS
              <small className="mt-[7px] block font-sans text-[10px] tracking-[0.44em]">
                SOLUTIONS
              </small>
            </Link>
            <p className="mt-5 text-sm">
              Websites, booking experiences, SaaS portals, and marketplaces. Web and product
              development by Josh Coley.
            </p>
            <Link href="/#contact" className="a1-btn mt-6 inline-block text-sm">
              Discuss a project <span aria-hidden="true">↗</span>
            </Link>
          </div>

          <nav aria-labelledby="footer-work">
            <span id="footer-work" className={columnTitle}>
              Case studies
            </span>
            <ul className={columnList}>
              {projects.map((project) => (
                <li key={project.id}>
                  <Link href={`/work/${project.id}`} className={columnLink}>
                    {project.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-services">
            <span id="footer-services" className={columnTitle}>
              What we build
            </span>
            <ul className={columnList}>
              {services.map((item) => (
                <li key={item.service}>
                  {/* On the home page, ContactForm preselects this project type. */}
                  <Link
                    href="/#contact"
                    data-inquiry-service={item.service}
                    className={columnLink}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-studio">
            <span id="footer-studio" className={columnTitle}>
              Studio
            </span>
            <ul className={columnList}>
              {studio.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={columnLink}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-[45px] flex flex-col gap-3 border-t border-line pt-6 text-xs text-muted tablet:flex-row tablet:items-center tablet:justify-between">
          <span>© {year} Mercurius Solutions. All rights reserved.</span>
          <span>Every case study is checked against its project’s source code.</span>
        </div>
      </div>
    </footer>
  );
}
