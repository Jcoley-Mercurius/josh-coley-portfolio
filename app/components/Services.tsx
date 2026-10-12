import type { InquiryService } from "../_lib/inquiry";

interface Service {
  service: InquiryService;
  title: string;
  description: string;
  cta: string;
}

// A1 "What we build" copy. Each link jumps to the inquiry form and, with
// JavaScript, preselects the matching project type (see ContactForm).
const services: Service[] = [
  {
    service: "website",
    title: "Business websites",
    description: "Brand expression, service discovery, landing pages, and a clear next step.",
    cta: "Discuss a website",
  },
  {
    service: "booking",
    title: "Booking experiences",
    description: "Help visitors choose a service and reach the business’s scheduling system.",
    cta: "Discuss a booking project",
  },
  {
    service: "saas",
    title: "SaaS & portals",
    description: "Product interfaces that organize information and support repeatable workflows.",
    cta: "Discuss a SaaS or portal",
  },
  {
    service: "marketplace",
    title: "Marketplaces",
    description: "Experiences that connect different users through a coherent product journey.",
    cta: "Discuss a marketplace",
  },
];

export default function Services() {
  return (
    <section
      id="services"
      aria-labelledby="services-title"
      className="border-y border-line bg-[#eee8dd]"
    >
      <div className="mx-auto max-w-content px-[6%] py-[45px] tablet:px-[5%] tablet:py-[70px]">
        <span className="eyebrow">What we build</span>
        <h2
          id="services-title"
          className="mt-4 font-display text-[clamp(34px,4vw,56px)] leading-[1.1] font-normal tracking-[-0.03em]"
        >
          From first impression
          <br />
          to everyday operation.
        </h2>
        <p className="mt-4 max-w-[650px]">
          Every project is quoted from its brief, not from a package.
        </p>
        <ul className="mt-[30px] grid gap-[30px] tablet:grid-cols-2 desktop:grid-cols-4">
          {services.map((item) => (
            <li key={item.service} className="flex flex-col border-t border-line pt-5">
              <h3 className="font-display text-[23px] leading-[1.1] font-normal">{item.title}</h3>
              <p className="mt-4 flex-1 text-sm">{item.description}</p>
              <a
                href="#contact"
                data-inquiry-service={item.service}
                className="mt-5 self-start text-sm text-bronze"
              >
                {item.cta} <span aria-hidden="true">↗</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
