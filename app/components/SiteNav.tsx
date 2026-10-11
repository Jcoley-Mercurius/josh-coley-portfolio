"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";

const navLinks = [
  { label: "Work", href: "/#work" },
  { label: "Services", href: "/#services" },
  { label: "About", href: "/#about" },
];

// Basic disclosure for the mobile menu. S4 owns the hardened, motion-aware menu.
export default function SiteNav() {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const wide = window.matchMedia("(min-width: 651px)");
    const onWide = () => wide.matches && setOpen(false);

    window.addEventListener("keydown", onKeyDown);
    wide.addEventListener("change", onWide);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      wide.removeEventListener("change", onWide);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        className="a1-btn inline-flex items-center gap-2 tablet:hidden"
        aria-expanded={open}
        aria-controls="primary-navigation"
        onClick={() => setOpen((value) => !value)}
      >
        Menu <Menu aria-hidden="true" size={18} strokeWidth={1.5} />
      </button>
      <nav
        id="primary-navigation"
        aria-label="Primary"
        className={`${open ? "flex" : "hidden"} absolute inset-x-0 top-full flex-col items-stretch gap-4 bg-paper p-6 shadow-[0_15px_20px_#0001] tablet:static tablet:flex tablet:flex-row tablet:items-center tablet:bg-transparent tablet:p-0 tablet:shadow-none desktop:gap-[30px]`}
      >
        {navLinks.map((link) => (
          <Link key={link.href} href={link.href} onClick={close}>
            {link.label}
          </Link>
        ))}
        <Link className="a1-btn" href="/#contact" onClick={close}>
          Discuss a project <span aria-hidden="true">↗</span>
        </Link>
      </nav>
    </>
  );
}
