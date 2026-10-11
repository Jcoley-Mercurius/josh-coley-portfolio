import Link from "next/link";
import SiteNav from "./SiteNav";

export default function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-line bg-paper/93 backdrop-blur-md">
      {/* 1380px bar width is the prototype header value; content uses max-w-content. */}
      <div className="site-bar mx-auto flex max-w-[1380px] items-center justify-between gap-6 px-[6%] py-[18px] tablet:px-[5%] tablet:py-[22px]">
        <Link
          href="/"
          aria-label="Mercurius Solutions home"
          className="font-display text-[19px] leading-[1.1] tracking-[0.14em] desktop:text-2xl"
        >
          MERCURIUS
          <small className="mt-[7px] block font-sans text-[10px] tracking-[0.44em]">
            SOLUTIONS
          </small>
        </Link>
        <SiteNav />
      </div>
    </header>
  );
}
