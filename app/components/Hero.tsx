import Image from "next/image";
import heroImage from "../_assets/hero-hermes.png";
import HeroDepth from "./HeroDepth";

export default function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden bg-paper tablet:flex tablet:min-h-[600px] tablet:items-center tablet:bg-marble desktop:min-h-[max(720px,min(50vw,calc(100svh-6rem)))]"
    >
      <div className="a1-reveal max-w-[810px] px-[6%] pb-5 pt-[45px] tablet:w-[68%] tablet:px-[max(5vw,24px)] tablet:py-[70px] desktop:w-[60%]">
        <span className="eyebrow">Mercurius Solutions</span>
        <h1
          id="hero-title"
          className="my-6 font-display text-[clamp(44px,6.8vw,98px)] leading-[1.1] font-normal tracking-[-0.05em]"
        >
          Ideas shaped
          <br />
          into working
          <br />
          products.
        </h1>
        <p className="max-w-[440px] text-[17px] tablet:text-xl">
          Websites, booking experiences, SaaS portals, and marketplaces.
        </p>
        <div className="my-[30px] flex flex-wrap gap-3">
          <a
            className="a1-btn a1-btn-primary flex-auto whitespace-nowrap text-center max-tablet:px-3 tablet:flex-none"
            href="#work"
          >
            Explore the work <span aria-hidden="true">↗</span>
          </a>
          <a className="a1-btn flex-auto whitespace-nowrap text-center max-tablet:px-3 tablet:flex-none" href="#services">
            View services
          </a>
        </div>
        <p className="max-w-[450px] text-xs text-muted">
          Project evidence is provisional.
        </p>
      </div>
      <div className="hero-art">
        <HeroDepth>
          <Image
            src={heroImage}
            alt="Marble Hermes sculpture on a luminous Greek terrace overlooking the sea"
            fill
            sizes="100vw"
            placeholder="blur"
            loading="eager"
            fetchPriority="high"
            className="object-cover"
          />
        </HeroDepth>
      </div>
    </section>
  );
}
