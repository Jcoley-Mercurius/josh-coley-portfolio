import Image from "next/image";
import heroImage from "../_assets/hero-hermes.png";
import HeroDepth from "./HeroDepth";

export default function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="portfolio-opening relative isolate overflow-hidden bg-paper tablet:flex tablet:items-center tablet:bg-marble"
    >
      <div className="a1-reveal portfolio-opening-copy max-w-[810px] px-[6%] tablet:w-[68%] tablet:px-[max(5vw,24px)] desktop:w-[60%]">
        <span className="eyebrow">Web &amp; product development</span>
        <h1
          id="hero-title"
          className="font-display font-normal"
        >
          Ideas shaped into{" "}
          <span className="hero-last">working products.</span>
        </h1>
        <p className="portfolio-opening-services">
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
          Every case study is checked against its project’s source code.
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
