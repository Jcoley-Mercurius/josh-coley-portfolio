import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
};

// Also answers unknown case-study slugs (app/work/[slug] sets dynamicParams
// false). Wording follows the A1 prototype's missing-project state.
export default function NotFound() {
  return (
    <section
      aria-labelledby="not-found-title"
      className="mx-auto min-h-[80vh] max-w-content px-[6%] py-[45px] tablet:px-[5%] tablet:py-[70px]"
    >
      <h1
        id="not-found-title"
        tabIndex={-1}
        className="my-6 font-display text-[clamp(44px,6vw,76px)] leading-[1.1] font-normal tracking-[-0.05em] focus:outline-none"
      >
        Page not found
      </h1>
      <p className="mb-[30px]">This page or case-study link is unavailable.</p>
      <Link className="a1-btn" href="/#work">
        Return to selected work
      </Link>
    </section>
  );
}
